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
VPS: /root/deploy-nebenbei.sh → docker-compose.yml from raw.githubusercontent
                              → docker compose pull && up -d   (127.0.0.1:8001)
Caddy: nebenbei.duckdns.org → 127.0.0.1:8001
```

### Two things this host does that a normal server does not

Both were found by running the deploy, not by reading it:

- **git cannot fetch here.** An anonymous `GET /info/refs` returns 200, but the
  `POST /git-upload-pack` that any real fetch follows up with gets
  `401 www-authenticate: Basic realm="GitHub"` — on a public repository, from
  this address, with no credential helper in sight. `ls-remote` works (it only
  does the GET), which is what makes the failure look like a mystery. So the
  script does not use git at all: it downloads the one file it needs
  (`docker-compose.yml`) over plain HTTPS and validates it before replacing the
  copy that currently works.
- **docker is a snap, and a snap cannot read the host's `/tmp`.** So
  `docker compose -f "$(mktemp)" config` fails with
  `open /tmp/tmp.XXXX: no such file or directory` on a file that is plainly
  there. The temp file therefore lives next to the compose file it replaces.

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

2. **Make the GHCR package public** (Package settings → Change visibility) —
   *already done*: an anonymous pull of
   `ghcr.io/marvinparanoid/nebenbei` works, which is what the VPS does. It has
   no `~/.docker/config.json`, so if the package ever goes private again, log in
   on the server with a token that has `read:packages`.

3. **Repository secrets** for the deploy job:

   | Secret | Value |
   | --- | --- |
   | `DEPLOY_HOST` | `185.142.99.209` — the host key in `.github/ssh_known_hosts` is pinned for that exact string, so a hostname (`nebenbei.duckdns.org`) would fail the check |
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

SLUG=MarvinParanoid/Nebenbei
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
    echo "compose: обновлён $(stat -c %y docker-compose.yml | cut -c1-16)"
    echo "запрошенный тег: $NEBENBEI_TAG"
    echo "образ: $(docker inspect --format '{{.Config.Image}}' nebenbei-app-1 2>/dev/null || echo нет)"
    echo "digest: $(docker inspect --format '{{index .RepoDigests 0}}' "$IMAGE:latest" 2>/dev/null | cut -d@ -f2 | cut -c1-19 || echo -)"
    docker compose ps --format '{{.Service}} {{.Status}}'
    exit 0
fi

# Из репозитория этой машине нужен ровно один файл — compose. И git его взять
# не может: анонимный `POST /git-upload-pack` с этого адреса GitHub отдаёт 401,
# поэтому любой fetch падает, а обычный GET проходит. Значит — скачиваем, и
# только после проверки подменяем тот compose, который сейчас работает.
# Not in /tmp: docker here is a snap, and a snap cannot read the host's /tmp,
# so `docker compose -f /tmp/...` fails on a file that is plainly there.
tmp=$DIR/.compose.new
trap 'rm -f "$tmp"' EXIT
if curl -fsS --max-time 30 -o "$tmp" \
    "https://raw.githubusercontent.com/$SLUG/main/docker-compose.yml" &&
    [ -s "$tmp" ] &&
    docker compose -f "$tmp" config -q; then
    cp "$tmp" docker-compose.yml
    sha=$(curl -fsS --max-time 15 "https://api.github.com/repos/$SLUG/commits/main" |
        sed -n 's/^  "sha": "\(.\{12\}\).*/\1/p' | head -1)
    echo "compose с main${sha:+, коммит }$sha"
else
    echo "compose не скачался — остаётся тот, что лежит на диске"
fi

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
