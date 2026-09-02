#!/usr/bin/env node
/**
 * Pull every German line out of the scenarios for review, and put corrections
 * back in.
 *
 *   node scripts/german.mjs export            → review/<scenario>.md + review/lines.tsv
 *   node scripts/german.mjs apply fixed.tsv   → rewrites the sources
 *
 * The scenario files only ever `import type`, which type stripping erases, so
 * Node can import them directly — no build step, and the data is the single
 * source of truth rather than a parser guessing at it.
 */
import { readdir, mkdir, writeFile, readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'src/data/scenarios')

async function load() {
  const files = (await readdir(dir)).filter((f) => f.endsWith('.ts') && f !== 'index.ts')
  const out = []
  for (const file of files.sort()) {
    const module = await import(join(dir, file))
    const scenario = Object.values(module).find((v) => v && typeof v === 'object' && 'nodes' in v)
    if (scenario) out.push({ file, scenario })
  }
  return out
}

/** Every reviewable German string, with an id that survives a round trip. */
function lines({ scenario }) {
  const rows = []
  const add = (id, text) => text && rows.push({ id, text })
  const s = scenario.id

  add(`${s}/title`, scenario.title)
  add(`${s}/context`, scenario.context)
  add(`${s}/situation`, scenario.situation)

  for (const objective of scenario.objectives ?? []) {
    add(`${s}/goal/${objective.id}/title`, objective.title)
    add(`${s}/goal/${objective.id}/hint`, objective.hint)
    add(`${s}/goal/${objective.id}/cta`, objective.cta)
  }

  for (const [nodeId, node] of Object.entries(scenario.nodes)) {
    node.messages.forEach((block, index) => {
      if (block.kind === 'reaction') return
      if (block.kind === 'card') {
        add(`${s}/${nodeId}/card${index}/label`, block.card.label)
        block.card.rows.forEach((row, r) => {
          add(`${s}/${nodeId}/card${index}/row${r}`, row.left)
        })
        return
      }
      add(`${s}/${nodeId}/m${index}`, block.text)
    })
    for (const response of node.responses) {
      add(`${s}/${nodeId}/r/${response.id}`, response.text)
      if (response.action) add(`${s}/${nodeId}/r/${response.id}/done`, response.action.done)
    }
  }

  for (const outcome of scenario.outcomes ?? []) {
    add(`${s}/end/${outcome.id}/name`, outcome.name)
    add(`${s}/end/${outcome.id}/title`, outcome.title)
    add(`${s}/end/${outcome.id}/quote`, outcome.quoteLabel)
    outcome.consequences.forEach((c, i) => add(`${s}/end/${outcome.id}/c${i}`, c.de))
  }
  return rows
}

function markdown({ scenario }) {
  const out = []
  const who = scenario.character.name
  out.push(`# ${scenario.title}`)
  out.push('')
  out.push(`${who} · ${scenario.contextLine} · ${scenario.level} · ${scenario.duration}`)
  out.push('')
  out.push('> Bitte nur das Deutsche ändern. Eckige Klammern wie')
  out.push('> `[ehrlich gesagt](ehrlich-gesagt)` sind markierte Wendungen — Text darin darf sich')
  out.push('> ändern, die Klammern und die id müssen bleiben. Die id in `[…]` vor jeder Zeile ist')
  out.push('> für den Rückweg und gehört nicht zum Text.')
  out.push('')
  out.push(`## Situation`)
  out.push('')
  out.push(scenario.situation ?? scenario.context)
  out.push('')

  if (scenario.objectives?.length) {
    out.push('## Ziele')
    out.push('')
    for (const o of scenario.objectives) {
      out.push(`- **${o.title}** — ${o.hint}  \`${scenario.id}/goal/${o.id}\``)
    }
    out.push('')
  }

  out.push('## Gespräch')
  out.push('')
  for (const [nodeId, node] of Object.entries(scenario.nodes)) {
    out.push(`### ${nodeId}`)
    out.push('')
    node.messages.forEach((block, index) => {
      const id = `${scenario.id}/${nodeId}/m${index}`
      const cond = block.when ? ` _(nur wenn ${JSON.stringify(block.when)})_` : ''
      if (block.kind === 'reaction') {
        out.push(`- ${who} reagiert mit ${block.emoji}${cond}`)
      } else if (block.kind === 'card') {
        const rows = block.card.rows.map((r) => [r.left, r.right].filter(Boolean).join('  ')).join(' / ')
        out.push(`- **${block.card.label}:** ${rows}${cond}  \`${scenario.id}/${nodeId}/card${index}\``)
      } else if (block.kind === 'system') {
        out.push(`- _${block.text}_${cond}  \`${id}\``)
      } else {
        out.push(`- **${who}:** ${block.text}${cond}  \`${id}\``)
      }
    })
    if (node.responses.length) out.push('')
    for (const r of node.responses) {
      const arrow = r.action ? `[ ${r.text} ] → ${r.action.done}` : r.text
      out.push(`  - → ${arrow}  \`${scenario.id}/${nodeId}/r/${r.id}\` → \`${r.next ?? 'ende'}\``)
    }
    out.push('')
  }

  if (scenario.outcomes?.length) {
    out.push('## Enden')
    out.push('')
    for (const o of scenario.outcomes) {
      out.push(`### ${o.name}${o.secret ? ' _(geheim)_' : ''}  \`${scenario.id}/end/${o.id}\``)
      out.push('')
      out.push(o.title)
      out.push('')
      for (const c of o.consequences) out.push(`- ${c.de}`)
      if (o.quoteLabel) out.push(`- _Überschrift über dem Zitat:_ ${o.quoteLabel}`)
      out.push('')
    }
  }
  return out.join('\n')
}

async function main() {
  const [command, arg] = process.argv.slice(2)
  const all = await load()

  if (command === 'export') {
    const target = join(root, 'review')
    await mkdir(target, { recursive: true })
    const tsv = []
    for (const entry of all) {
      await writeFile(join(target, `${entry.scenario.id}.md`), markdown(entry) + '\n')
      for (const { id, text } of lines(entry)) tsv.push(`${id}\t${text}`)
    }
    await writeFile(join(target, 'lines.tsv'), tsv.join('\n') + '\n')
    console.log(`${all.length} Szenarien → review/  (${tsv.length} Zeilen in lines.tsv)`)
    return
  }

  if (command === 'apply') {
    if (!arg) throw new Error('usage: apply <file.tsv>')
    const current = new Map()
    const where = new Map()
    for (const entry of all) {
      for (const { id, text } of lines(entry)) {
        current.set(id, text)
        where.set(id, join(dir, entry.file))
      }
    }
    const edits = new Map()
    for (const line of (await readFile(arg, 'utf8')).split('\n')) {
      if (!line.trim()) continue
      const tab = line.indexOf('\t')
      if (tab === -1) continue
      const [id, text] = [line.slice(0, tab).trim(), line.slice(tab + 1)]
      if (!current.has(id)) {
        console.warn(`unbekannte id, übersprungen: ${id}`)
        continue
      }
      if (current.get(id) !== text) edits.set(id, text)
    }
    if (!edits.size) {
      console.log('keine Änderungen')
      return
    }
    const files = new Map()
    let applied = 0
    for (const [id, text] of edits) {
      const file = where.get(id)
      const source = files.get(file) ?? (await readFile(file, 'utf8'))
      const before = current.get(id)
      // Match the literal as it is written in the source, both quote styles.
      const candidates = [`'${before}'`, `"${before}"`].filter((q) => source.includes(q))
      if (candidates.length !== 1 || source.split(candidates[0]).length !== 2) {
        console.warn(`nicht eindeutig, übersprungen: ${id}`)
        continue
      }
      const quote = candidates[0][0]
      const safe = quote === "'" && text.includes("'") ? `"${text}"` : `${quote}${text}${quote}`
      files.set(file, source.replace(candidates[0], safe))
      applied += 1
    }
    for (const [file, source] of files) await writeFile(file, source)
    console.log(`${applied} Zeilen ersetzt in ${files.size} Datei(en) — jetzt npm test`)
    return
  }

  console.log('usage: node scripts/german.mjs export | apply <file.tsv>')
}

await main()
