import type { Scenario } from '../../types'

/**
 * A stranger offers a third of your asking price and wants to collect today.
 * Nobody is wrong here: he is haggling, which is what the platform is for, and
 * the bike really has been in the cellar for two years.
 *
 * The listing card is the hook — the numbers on it are what the whole
 * conversation argues about.
 */
export const kleinanzeigenFahrrad: Scenario = {
  id: 'kleinanzeigen-fahrrad',
  title: '40 Euro, mehr nicht',
  context: 'Bietet 40 € für dein Fahrrad. Drin steht es für 120.',
  situation:
    'Zwei Sätze, kein Hallo, und ein Angebot über ein Drittel vom Preis. Abholen will er heute noch. Das Rad steht seit zwei Jahren im Keller.',
  situationRu:
    'Два предложения, без «здравствуйте», и цена втрое ниже. Забрать хочет сегодня же. Велосипед два года стоит в подвале.',
  contextLine: 'Kleinanzeigen · Chat',
  duration: '3 min',
  level: 'B1',
  icon: 'tag',
  startTime: '20:15',
  character: { name: 'Tarek', status: 'Kleinanzeigen' },
  meters: { anger: 0, respect: 45, patience: 55, guilt: 0 },

  objectives: [
    {
      id: 'preis',
      title: 'Deinen Preis halten',
      hint: 'Hundertzwanzig. Oder er fährt ohne Rad nach Hause.',
      ru: 'Не уступить в цене',
      cta: 'diesmal hart bleiben?',
      contrast: 'loswerden',
    },
    {
      id: 'loswerden',
      title: 'Das Rad heute loswerden',
      hint: 'Fast egal für wie viel. Es muss aus dem Keller.',
      ru: 'Избавиться от велосипеда сегодня же',
      cta: 'diesmal einfach loswerden?',
      contrast: 'preis',
    },
    {
      id: 'aufgeben',
      title: 'Er soll von selbst aufgeben',
      hint: 'Ohne dass du unhöflich wirst.',
      ru: 'Чтобы он сам отказался',
      cta: 'diesmal soll er aufgeben?',
      contrast: 'mehr',
    },
    {
      id: 'mehr',
      title: 'Mehr als 120 bekommen',
      hint: 'Es gibt ja noch andere Interessenten. Angeblich.',
      ru: 'Получить больше 120',
      cta: 'diesmal mehr als 120?',
      contrast: 'aufgeben',
    },
  ],

  outcomes: [
    {
      id: 'bruder',
      // Warm, patient *and* you held the bike for him — a mix neither the
      // hard line nor the fire sale produces.
      requires: { respect: ['>=', 72], anger: ['<=', 12] },
      requiresFlags: ['samstag'],
      achieved: [],
      secret: true,
      quoteLabel: 'Damit hast du ihn gewonnen',
      name: 'Der Bruder',
      nameRu: 'Брат',
      title: 'Tarek kommt Samstag — und bringt seinen Bruder mit.',
      titleRu: 'Тарек приедет в субботу — и привезёт брата.',
      consequences: [
        { de: '120 in bar, ohne Diskussion.', ru: '120 наличными, без разговоров.' },
        { de: 'Der Bruder nimmt den alten Helm für 10 mit.', ru: 'Брат берёт старый шлем за 10.' },
        { de: 'Der Keller ist leer.', ru: 'Подвал пустой.' },
      ],
    },
    {
      id: 'hundertdreissig',
      requiresFlags: ['auktion'],
      achieved: ['mehr'],
      quoteLabel: 'Das hat den Preis gemacht',
      name: 'Hundertdreißig',
      nameRu: 'Сто тридцать',
      title: 'Tarek hat 130 geboten, damit der andere es nicht bekommt.',
      titleRu: 'Тарек предложил 130, чтобы велосипед не достался другому.',
      consequences: [
        { de: 'Zehn Euro über deinem Preis.', ru: 'На десять евро выше твоей цены.' },
        { de: 'Einen zweiten Interessenten gab es nie.', ru: 'Второго покупателя не существовало.' },
        { de: 'Er fragt, ob du noch was verkaufst.', ru: 'Он спрашивает, не продаёшь ли ты ещё что-нибудь.' },
      ],
    },
    {
      id: 'siebzig',
      requiresFlags: ['deal-70'],
      achieved: ['loswerden'],
      quoteLabel: 'Da war es entschieden',
      name: 'Weg für siebzig',
      nameRu: 'Ушёл за семьдесят',
      title: 'Er hat es abgeholt. Für siebzig.',
      titleRu: 'Он его забрал. За семьдесят.',
      consequences: [
        { de: 'Fünfzig unter deinem Preis.', ru: 'На пятьдесят ниже твоей цены.' },
        { de: 'Dafür ist der Keller heute leer.', ru: 'Зато подвал сегодня пустой.' },
        { de: 'Er war in zwanzig Minuten da.', ru: 'Он приехал через двадцать минут.' },
      ],
    },
    {
      id: 'aufgegeben',
      requires: { patience: ['<=', 18] },
      achieved: ['aufgeben'],
      quoteLabel: 'Danach hat er es gelassen',
      name: 'Er hat aufgegeben',
      nameRu: 'Он сдался',
      title: 'Tarek hat aufgehört zu schreiben.',
      titleRu: 'Тарек перестал писать.',
      consequences: [
        { de: 'Kein böses Wort, keine Einigung.', ru: 'Ни одного грубого слова, никакой сделки.' },
        { de: 'Das Rad steht weiter im Keller.', ru: 'Велосипед так и стоит в подвале.' },
        { de: 'Die Anzeige läuft noch 26 Tage.', ru: 'Объявление висит ещё 26 дней.' },
      ],
    },
    {
      id: 'hundertzwanzig',
      requires: { respect: ['>=', 55], anger: ['<=', 45] },
      achieved: ['preis'],
      quoteLabel: 'Das hat ihn überzeugt',
      name: 'Hundertzwanzig',
      nameRu: 'Сто двадцать',
      title: 'Er zahlt deinen Preis. Am Samstag.',
      titleRu: 'Он платит твою цену. В субботу.',
      consequences: [
        { de: 'Kein Cent Rabatt.', ru: 'Ни цента скидки.' },
        { de: 'Er wollte trotzdem noch die Luftpumpe.', ru: 'Насос он всё равно попросил.' },
        { de: 'Die hat er bekommen.', ru: 'И получил.' },
      ],
    },
    {
      id: 'kein-deal',
      achieved: [],
      quoteLabel: 'Der Satz, nach dem es kippte',
      name: 'Kein Deal',
      nameRu: 'Сделки нет',
      title: 'Er hat zuletzt „ok" geschrieben. Mehr nicht.',
      titleRu: 'Последнее, что он написал, — «ок». И всё.',
      consequences: [
        { de: 'Kein Preis, kein Termin, keine Absage.', ru: 'Ни цены, ни времени, ни отказа.' },
        { de: 'Das Rad bleibt, wo es ist.', ru: 'Велосипед остаётся там, где стоит.' },
      ],
    },
  ],

  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        {
          kind: 'card',
          ru: 'Твоё объявление: городской велосипед, 28 дюймов, 120 € без торга, самовывоз.',
          card: {
            label: 'Deine Anzeige · seit 4 Tagen',
            rows: [
              { left: 'Cityrad 28 Zoll, Damen', right: '' },
              { left: 'Zustand: gebraucht, fährt', right: '' },
              { left: 'Nur Abholung', right: '' },
            ],
            total: { left: 'Festpreis', right: '120 €' },
          },
        },
        {
          text: 'Hallo, 40 und ich [hol es](abholen) heute ab.',
          ru: 'Здравствуйте, 40 — и я забираю сегодня.',
        },
        {
          text: 'Bin sowieso in der Nähe.',
          ru: 'Я всё равно рядом.',
        },
      ],
      responses: [
        {
          id: 'hart',
          text: 'Da steht Festpreis. 120.',
          ru: 'Там написано: фиксированная цена. 120.',
          effects: { respect: 6, patience: -6 },
          next: 'zustand',
        },
        {
          id: 'freundlich',
          text: '40 ist zu wenig, ehrlich gesagt. Bei 100 wären wir im Gespräch.',
          ru: 'Честно говоря, 40 — это мало. При 100 можно было бы поговорить.',
          effects: { respect: 10, anger: -4 },
          next: 'gegenangebot',
        },
        {
          id: 'warum',
          text: 'Wie kommst du auf 40?',
          ru: 'Откуда взялись 40?',
          effects: { patience: -4, respect: 4 },
          next: 'zustand',
        },
        {
          id: 'sofort',
          text: 'Für 40 kannst du es sofort holen.',
          ru: 'За 40 можешь забирать прямо сейчас.',
          flag: 'deal-70',
          effects: { respect: -6 },
          next: 'ueberrascht',
        },
      ],
    },

    ueberrascht: {
      id: 'ueberrascht',
      messages: [
        { text: 'Echt? 😅', ru: 'Серьёзно? 😅' },
        {
          text: 'Ok, dann sag ich nichts mehr. Ich bin in zwanzig Minuten da.',
          ru: 'Ладно, тогда молчу. Буду через двадцать минут.',
        },
        {
          text: 'Ehrlich gesagt hätte ich auch 70 gezahlt.',
          ru: 'Честно говоря, я бы и 70 заплатил.',
          when: { respect: ['<=', 45] },
        },
      ],
      responses: [
        {
          id: 'egal',
          text: 'Zu spät 😄 Klingel unten zweimal.',
          ru: 'Слишком поздно 😄 Позвони внизу дважды.',
          effects: { respect: 8 },
          next: 'keller',
        },
        {
          id: 'nachfordern',
          text: 'Dann sind es doch 70.',
          ru: 'Тогда всё-таки 70.',
          effects: { anger: 14, respect: -8 },
          next: 'genervt',
        },
      ],
    },

    keller: {
      id: 'keller',
      messages: [
        { text: 'Eine Frage noch:', ru: 'Ещё вопрос:' },
        {
          text: 'Steht es im Keller? Ich frag nur wegen der Treppe.',
          ru: 'Он в подвале? Спрашиваю из-за лестницы.',
        },
        {
          text: 'Ich hab mir letzte Woche schon einen Rahmen ins Schienbein gehauen 😅',
          ru: 'На прошлой неделе я себе уже раму об голень приложил 😅',
          when: { respect: ['>=', 45] },
        },
      ],
      responses: [
        {
          id: 'trage',
          text: 'Ich trag es dir hoch, kein Problem.',
          ru: 'Я тебе его вынесу, без проблем.',
          effects: { respect: 12, anger: -4 },
          next: 'abholung',
        },
        {
          id: 'selber',
          text: 'Zweiter Kellergang, links. Tragen musst du selbst 🙂',
          ru: 'Второй подвальный коридор, налево. Нести придётся самому 🙂',
          effects: { respect: 4, patience: -6 },
          next: 'abholung',
        },
        {
          id: 'kalt',
          text: 'Bei dem Preis trag ich nichts 😄',
          ru: 'За такую цену я ничего не понесу 😄',
          effects: { anger: 10, respect: 4, patience: -8 },
          next: 'abholung',
        },
      ],
    },

    zustand: {
      id: 'zustand',
      messages: [
        {
          text: 'Das Rad steht seit zwei Jahren, das sieht man auf den Fotos.',
          ru: 'Велосипед стоит уже два года, это видно по фотографиям.',
        },
        {
          text: 'Reifen platt, Kette trocken. Da geht noch was am Preis.',
          ru: 'Шины спущены, цепь сухая. По цене ещё есть куда двигаться.',
        },
        {
          text: 'Und [handeln](handeln) gehört doch dazu 🙂',
          ru: 'И поторговаться же положено 🙂',
          when: { respect: ['>=', 50] },
        },
      ],
      responses: [
        {
          id: 'fair',
          text: 'Die Reifen sind wirklich platt. 100 und ich pump sie dir auf.',
          ru: 'Шины действительно спущены. 100 — и я их тебе накачаю.',
          effects: { respect: 10, anger: -4 },
          next: 'gegenangebot',
        },
        {
          id: 'kalt',
          text: 'Ein Cityrad für 120 findest du sonst nirgendwo. Auch nicht platt.',
          ru: 'Городской велосипед за 120 ты больше нигде не найдёшь. Даже спущенный.',
          effects: { anger: 8, respect: 8, patience: -10 },
          next: 'druck',
        },
        {
          id: 'auktion',
          text: 'Es hat gestern jemand 110 geboten. Ich warte einfach ab.',
          ru: 'Вчера кто-то предложил 110. Я просто подожду.',
          flag: 'auktion',
          effects: { respect: 4, patience: -8 },
          next: 'auktion',
        },
        {
          id: 'frech',
          text: 'Dann kauf halt ein neues für 400.',
          ru: 'Тогда купи новый за 400.',
          effects: { anger: 22, respect: -12, patience: -14 },
          next: 'genervt',
        },
      ],
    },

    auktion: {
      id: 'auktion',
      messages: [
        {
          kind: 'system',
          text: 'Tarek schreibt. Dann nicht mehr. Dann wieder.',
          ru: 'Тарек печатает. Потом перестаёт. Потом снова.',
        },
        { text: 'Hat der schon gezahlt? [Festpreis](festpreis) heißt ja auch nicht immer Festpreis 🙂', ru: 'Он уже заплатил? «Фиксированная цена» ведь тоже не всегда фиксированная 🙂' },
        {
          text: 'Ich geb dir 130, wenn du es mir bis Samstag hinstellst.',
          ru: 'Дам 130, если отложишь его для меня до субботы.',
        },
      ],
      responses: [
        {
          id: 'ja',
          text: 'Bis Samstag ist es deins. Abgemacht.',
          ru: 'До субботы он твой. Договорились.',
          flag: 'samstag',
          effects: { respect: 12, anger: -6 },
          next: 'abholung',
        },
        {
          id: 'druck',
          text: 'Bis morgen Abend. Länger halte ich es nicht.',
          ru: 'До завтрашнего вечера. Дольше держать не буду.',
          effects: { respect: 6, patience: -6 },
          next: 'abholung',
        },
        {
          id: 'gierig',
          text: 'Der andere hat gerade 140 geschrieben 🙂',
          ru: 'Тот только что написал 140 🙂',
          effects: { anger: 20, respect: -14, patience: -16 },
          next: 'genervt',
        },
      ],
    },

    gegenangebot: {
      id: 'gegenangebot',
      messages: [
        { text: 'Ok, ich verstehe.', ru: 'Ладно, понимаю.' },
        {
          text: '70 und ich bin in zwanzig Minuten da. [Mein letztes Angebot](letztes-angebot).',
          ru: '70 — и я через двадцать минут у тебя. Моё последнее предложение.',
        },
      ],
      responses: [
        {
          id: 'annehmen',
          text: 'Für 70 heute noch: nimm es mit.',
          ru: 'За 70, но сегодня: забирай.',
          flag: 'deal-70',
          effects: { respect: 8, anger: -4 },
          next: 'keller',
        },
        {
          id: 'mitte',
          text: '90 und die Luftpumpe ist dabei.',
          ru: '90 — и насос в комплекте.',
          effects: { respect: 10, patience: -6 },
          next: 'mitte',
        },
        {
          id: 'hart',
          text: 'Letztes Angebot ist bei mir 120. Steht ja auch so drin.',
          ru: 'Моё последнее предложение — 120. Так и написано.',
          effects: { respect: 8, patience: -10 },
          next: 'druck',
        },
        {
          id: 'frech',
          text: '70? Das ist nicht mal die Hälfte. Viel Erfolg 🙂',
          ru: '70? Это даже не половина. Удачи 🙂',
          effects: { anger: 20, respect: -10, patience: -14 },
          next: 'genervt',
        },
      ],
    },

    mitte: {
      id: 'mitte',
      messages: [
        { text: 'Luftpumpe hab ich 😄', ru: 'Насос у меня есть 😄' },
        {
          text: '90 ist mir zu viel für ein Rad, das ich erst herrichten muss.',
          ru: '90 — это много за велосипед, который ещё придётся приводить в порядок.',
        },
        {
          text: 'Aber ich denk drüber nach, wenn du es mir bis Samstag hinstellst.',
          ru: 'Но я подумаю, если отложишь его до субботы.',
        },
      ],
      responses: [
        {
          id: 'samstag',
          text: 'Bis Samstag steht es für dich da.',
          ru: 'До субботы он твой.',
          flag: 'samstag',
          effects: { respect: 12, anger: -8 },
          next: 'abholung',
        },
        {
          id: 'heute',
          text: 'Heute 90, morgen wieder 120.',
          ru: 'Сегодня 90, завтра снова 120.',
          effects: { respect: 6, patience: -8 },
          next: 'druck',
        },
        {
          id: 'siebzig',
          text: 'Ach, nimm es für 70 mit. Dann ist es raus.',
          ru: 'Ладно, забирай за 70. Зато освободится место.',
          flag: 'deal-70',
          effects: { respect: 4 },
          next: 'abholung',
        },
      ],
    },

    druck: {
      id: 'druck',
      messages: [
        { text: 'Ich bin ehrlich: ich sitz schon im Auto.', ru: 'Скажу честно: я уже в машине.' },
        {
          text: 'Sag einen Preis, dann komm ich vorbei. Oder ich fahr weiter.',
          ru: 'Назови цену, и я подъеду. Или я поеду дальше.',
        },
        {
          text: 'Ich hab heute noch zwei andere Räder auf der Liste.',
          ru: 'У меня на сегодня в списке ещё два велосипеда.',
          when: { patience: ['<=', 35] },
        },
      ],
      responses: [
        {
          id: 'halten',
          text: '120. Ich hab Zeit, das Rad läuft mir nicht weg.',
          ru: '120. Я не спешу, велосипед от меня не убежит.',
          effects: { respect: 10, patience: -12 },
          next: 'entscheidung',
        },
        {
          id: 'hundert',
          text: '100, und du bist in zwanzig Minuten hier.',
          ru: '100 — и ты здесь через двадцать минут.',
          effects: { respect: 8, anger: -4 },
          next: 'entscheidung',
        },
        {
          id: 'siebzig',
          text: 'Ok, 70. Aber dann wirklich heute.',
          ru: 'Ладно, 70. Но тогда правда сегодня.',
          flag: 'deal-70',
          effects: { respect: 6 },
          next: 'abholung',
        },
        {
          id: 'kalt',
          text: 'Dann fahr weiter. Kein Problem 🙂',
          ru: 'Тогда поезжай дальше. Без проблем 🙂',
          effects: { anger: 12, respect: 8, patience: -18 },
          next: 'entscheidung',
        },
      ],
    },

    entscheidung: {
      id: 'entscheidung',
      messages: [
        {
          kind: 'system',
          text: 'Tarek hat deine Nachricht gelesen.',
          ru: 'Тарек прочитал сообщение.',
        },
        { text: 'Puh.', ru: 'Ммм.' },
        {
          text: 'Sagen wir 110 und ich bring dir eine neue Kette mit. Die hab ich eh da.',
          ru: 'Скажем, 110 — и я привезу тебе новую цепь. Она у меня всё равно есть.',
        },
      ],
      responses: [
        {
          id: 'ja',
          text: '110 mit Kette: passt mir gut.',
          ru: '110 с цепью — меня устраивает.',
          effects: { respect: 10, anger: -6 },
          next: 'abholung',
        },
        {
          id: 'samstag',
          text: 'Mach 120 und stell es dir bis Samstag hin.',
          ru: 'Давай 120, и я отложу его для тебя до субботы.',
          flag: 'samstag',
          effects: { respect: 10, patience: -6 },
          next: 'abholung',
        },
        {
          id: 'kalt',
          text: 'Die Kette brauch ich nicht. 120 brauch ich schon.',
          ru: 'Цепь мне не нужна. А 120 — нужны.',
          effects: { anger: 10, respect: 8, patience: -14 },
          next: 'abholung',
        },
      ],
    },

    genervt: {
      id: 'genervt',
      messages: [
        { kind: 'reaction', emoji: '👍' },
        { text: 'Alles klar.', ru: 'Ну ладно.' },
        {
          text: 'Dann viel Erfolg mit dem Rad. Steht ja schon vier Tage drin.',
          ru: 'Тогда удачи с велосипедом. Он же уже четыре дня висит.',
        },
      ],
      responses: [
        {
          id: 'ruhig',
          text: 'Kein Stress. Wenn du es doch willst: schreib einfach.',
          ru: 'Без напряга. Если всё-таки захочешь — просто напиши.',
          effects: { respect: 10, anger: -12 },
          next: 'abschied',
        },
        {
          id: 'kalt',
          text: 'Vier Tage sind kürzer als der Winter im Keller 🙂',
          ru: 'Четыре дня — это меньше, чем зима в подвале 🙂',
          effects: { anger: 10, respect: 6, patience: -12 },
          next: 'abschied',
        },
        {
          id: 'frech',
          text: 'Und du fährst weiter 40-Euro-Angebote raus. Passt ja.',
          ru: 'А ты продолжай рассылать предложения по 40. Отличная пара.',
          effects: { anger: 24, respect: -14, patience: -14 },
          next: 'abschied',
        },
        {
          id: 'nichts',
          text: 'Nicht antworten',
          ru: 'Не отвечать',
          action: {
            done: 'Du hast nicht geantwortet.',
            doneRu: 'Ты не ответил.',
          },
          effects: { anger: 6, patience: -14 },
          next: 'abschied',
        },
      ],
    },

    abschied: {
      id: 'abschied',
      messages: [
        { text: 'Ok.', ru: 'Ок.' },
        {
          text: 'Wenn es nächste Woche noch da ist, schreib mir.',
          ru: 'Если он на следующей неделе ещё будет, напиши мне.',
          when: { anger: ['<=', 30] },
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Mach ich. Bis dann.',
          ru: 'Напишу. До связи.',
          effects: { respect: 8, anger: -6 },
          next: 'ende-weg',
        },
        {
          id: 'kalt',
          text: 'Nächste Woche kostet es 130 🙂',
          ru: 'На следующей неделе он будет стоить 130 🙂',
          effects: { anger: 10, respect: 4, patience: -8 },
          next: 'ende-weg',
        },
      ],
    },

    'ende-weg': {
      id: 'ende-weg',
      messages: [{ text: 'Alles gut. Ciao.', ru: 'Всё хорошо. Пока.' }],
      responses: [],
    },

    abholung: {
      id: 'abholung',
      messages: [
        { text: 'Super, danke dir.', ru: 'Супер, спасибо.' },
        {
          text: 'Ich komm mit dem Auto von meinem Bruder, dann passt es rein.',
          ru: 'Приеду на машине брата, тогда он влезет.',
        },
        {
          text: 'Bring [gleich](gleich) passend mit, damit du nicht wechseln musst.',
          ru: 'Захвати сразу без сдачи, чтобы не пришлось менять.',
          when: { respect: ['>=', 60] },
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Alles klar. Klingel unten zweimal, dann komm ich runter.',
          ru: 'Хорошо. Позвони внизу дважды, я спущусь.',
          effects: { respect: 8, anger: -4 },
          next: 'ende',
        },
        {
          id: 'bar',
          text: 'Bar, ja? Ich hab kein Kartenlesegerät im Keller 😄',
          ru: 'Наличными, да? У меня в подвале нет терминала 😄',
          effects: { respect: 6 },
          next: 'ende',
        },
        {
          id: 'kalt',
          text: 'Und komm bitte wirklich. Ich hab schon zwei Mal umsonst gewartet.',
          ru: 'И, пожалуйста, приезжай правда. Я уже два раза ждал напрасно.',
          effects: { anger: 8, respect: 6, patience: -8 },
          next: 'ende',
        },
      ],
    },

    ende: {
      id: 'ende',
      messages: [{ text: 'Bis dann 👍', ru: 'До встречи 👍' }],
      responses: [],
    },
  },
}
