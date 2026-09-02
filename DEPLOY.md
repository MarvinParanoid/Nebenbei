# Deploy

Test deployment: **https://nebenbei.duckdns.org**

## Shape

The image is a static build served by nginx: `Dockerfile` runs `npm run build`
(so a type error fails the image) and copies `dist/` into `nginx:1.27-alpine`
with [`nginx.conf`](nginx.conf). Nothing is rendered server-side, there is no
runtime configuration and no state on the server — all user state (looked-up
phrases, finished conversations) lives in the visitor's `localStorage`. A new
build means a new image; redeploying loses nothing and there is nothing to back
up.

On the VPS the container is bound to `127.0.0.1:8001` and Caddy terminates TLS
in front of it. Ports 8000 and 8080 on that host belong to sparschwein and
openvpn-ui.

```
CI: docker build → smoke test → push ghcr.io/marvinparanoid/nebenbei:{latest,<sha12>}
                                 └→ ssh root@vps "deploy <sha12>"
VPS: /root/deploy-nebenbei.sh → git reset --hard origin/main
                              → docker compose pull && up -d   (127.0.0.1:8001)
Caddy: nebenbei.duckdns.org → 127.0.0.1:8001
```

## What is already set up on the VPS

- `/root/nebenbei` — checkout + `docker-compose.yml`, container `nebenbei-app-1`
  running on `127.0.0.1:8001`. The image there was built on the server from a
  tarball of the working tree (first deploy, before the repo was pushed).
- `/root/deploy-nebenbei.sh` — the deploy target, printed in full below.
- `/root/.ssh/nebenbei_deploy{,.pub}` — the CI key. The public half is in
  `authorized_keys` as
  `restrict,command="/root/deploy-nebenbei.sh" … github-actions-deploy@nebenbei`,
  so that key can do exactly one thing: no shell, no file access, no forwarding.
- `/etc/caddy/Caddyfile` — a `nebenbei.duckdns.org` block (reverse proxy, gzip,
  HSTS, `nosniff`, `no-referrer`, journal access log), modelled on the existing
  gutschwein block. Backup: `/etc/caddy/Caddyfile.bak-<date>`.

## What is still needed

1. **Push the repo.** GitHub is still empty; the remote is already
   `git@github.com:MarvinParanoid/Nebenbei.git`:

   ```bash
   git push -u origin main
   ```

2. **Make the GHCR package public** (Package settings → Change visibility).
   The VPS has no `~/.docker/config.json` — gutschwein is pulled anonymously, and
   nebenbei has to work the same way. Otherwise log in on the server with a token
   that has `read:packages`.

3. **Repository secrets** for the deploy job:

   | Secret | Value |
   | --- | --- |
   | `DEPLOY_HOST` | the same value as in the Gutschwein repo — the pinned host key in `.github/ssh_known_hosts` was hashed for that exact hostname |
   | `DEPLOY_SSH_KEY` | `ssh tw-vps cat /root/.ssh/nebenbei_deploy` |

   If `DEPLOY_HOST` differs, regenerate the pin:
   `ssh-keyscan -H <host> > .github/ssh_known_hosts`.

After that, every push to `main` builds the image, smoke-tests it, publishes
`:latest` and `:<sha12>`, and deploys that exact sha.

## Deploying and rolling back by hand

```bash
ssh tw-vps 'ssh -i /root/.ssh/nebenbei_deploy root@127.0.0.1 "dry-run"'   # state, changes nothing
ssh tw-vps '/root/deploy-nebenbei.sh'                                     # :latest
SSH_ORIGINAL_COMMAND="deploy 1a2b3c4d5e6f" ssh tw-vps '/root/deploy-nebenbei.sh'
```

The last form is the rollback: sha tags are kept on the server (three of them —
the running one and two to go back to), so returning to a previous release is a
tag, not a rebuild.

Deploying work that is not pushed yet — the compose file also carries `build: .`:

```bash
tar czf - --exclude=node_modules --exclude=dist --exclude=.git . \
  | ssh tw-vps 'tar xzf - -C /root/nebenbei && chown -R root:root /root/nebenbei'
ssh tw-vps 'cd /root/nebenbei && docker compose up -d --build'
```

`chown` matters: tar preserves the local uid, and git refuses to work in a
directory it considers foreign ("dubious ownership").

## /root/deploy-nebenbei.sh

Kept on the server rather than in the repo, like `/root/deploy.sh` for
sparschwein — the forced command has to exist independently of any checkout.

```sh
#!/bin/sh
# Deploy target for the GitHub Actions key. Forced via authorized_keys, so this is
# the only thing that key can do — no shell, no file access, no port forwarding.
#
# "dry-run" as the ssh command reports state and changes nothing.
set -eu

REPO=https://github.com/MarvinParanoid/Nebenbei.git
DIR=/root/nebenbei
IMAGE=ghcr.io/marvinparanoid/nebenbei
PORT=8001
cd "$DIR"

# "deploy <sha>" pins the image; plain "deploy" takes :latest. The command
# arrives from the forced key, so this is the only place it can be chosen.
ACTION=$(printf %s "${SSH_ORIGINAL_COMMAND:-deploy}" | cut -d" " -f1)
TAG=$(printf %s "${SSH_ORIGINAL_COMMAND:-}" | cut -d" " -s -f2)
export NEBENBEI_TAG="${TAG:-latest}"

if [ "$ACTION" = "dry-run" ]; then
    echo "dry-run: каталог $DIR"
    if [ -d .git ]; then
        echo "git: $(git rev-parse --short HEAD 2>/dev/null || echo нет коммитов)"
    else
        echo "git: не репозиторий — первый деплой сделает bootstrap"
    fi
    echo "запрошенный тег: $NEBENBEI_TAG"
    echo "образ: $(docker inspect --format '{{.Config.Image}}' nebenbei-app-1 2>/dev/null || echo нет)"
    echo "digest: $(docker inspect --format '{{index .RepoDigests 0}}' "$IMAGE:latest" 2>/dev/null | cut -d@ -f2 | cut -c1-19 || echo -)"
    docker compose ps --format '{{.Service}} {{.Status}}'
    exit 0
fi

# One-time bootstrap: the directory was populated by tar before CI existed.
# Written step by step rather than as one branch, so a half-finished bootstrap
# (an interrupted first run) is repaired on the next deploy instead of failing.
[ -d .git ] || { echo "bootstrap: превращаю $DIR в git-checkout"; git init -q -b main; }
git remote get-url origin >/dev/null 2>&1 || git remote add origin "$REPO"

git fetch -q --depth 1 origin main
# Untracked files are left alone by reset.
git reset -q --hard FETCH_HEAD
echo "развёрнут коммит $(git rev-parse --short HEAD)"

docker compose pull -q app
docker compose up -d

# Pulled images keep their sha tag, so prune leaves them alone and the disk fills
# up one release at a time. Three are kept: the running one and two to roll back to.
docker images --format '{{.Tag}} {{.CreatedAt}}' "$IMAGE" |
    grep -v '^latest ' | sort -k2 -r | tail -n +4 | cut -d' ' -f1 |
    while read -r old; do
        [ -n "$old" ] && docker rmi "$IMAGE:$old" >/dev/null 2>&1 || true
    done

i=0
while [ $i -lt 30 ]; do
    if curl -fsS "http://127.0.0.1:$PORT/healthz"; then
        echo " — поднялся"
        exit 0
    fi
    i=$((i + 1))
    sleep 2
done
echo "healthcheck не прошёл"
docker compose logs --tail=50 app
exit 1
```

## Notes

- Served from the domain root. For a subpath (`/nebenbei/`) set `base` in
  `vite.config.ts` and use `handle_path` in Caddy — the hash router itself is
  path-agnostic.
- Caching lives inside the container: `/assets/*` is content-hashed and cached
  for a year, `index.html` is `no-cache`. Caddy needs no cache rules.
- The container answers `/healthz`; the deploy script polls it for 60 s and dumps
  container logs if it never comes up.
