import type { Scenario } from '../../types'

/**
 * Elif again, six weeks after the dinner she cancelled — and this time she is
 * the one asking. She wants to quit.
 *
 * This is the scenario the revelation layer exists for. If you got to the real
 * reason in `elif-sagt-ab`, she does not perform for you here: she says out
 * loud that she cannot afford to quit, and one reply lets you quote her own
 * twelve euros back at her. If you never found out, she keeps that part in her
 * pocket and the whole conversation is one register more polite — which is
 * exactly what happens with people who have not told you the hard thing yet.
 *
 * She is right about something: her boss really did change in March, and you
 * have never worked a fifty-hour week.
 */
export const elifKuendigung: Scenario = {
  id: 'elif-kuendigung',
  title: 'Kann ich dich was fragen?',
  context: 'Sie will kündigen. Heute Abend, glaubt sie.',
  situation:
    'Elif schreibt zuerst „Kann ich dich was fragen?“ und dann zwei Minuten nichts. Sie will den Job hinwerfen — ohne etwas Neues, ohne Plan, seit dem neuen Chef im März. Sie fragt dich, weil du der Erste bist, dem sie es sagt.',
  situationRu:
    'Элиф пишет сначала «Можно у тебя кое-что спросить?» — и потом две минуты ничего. Она хочет бросить работу: без новой, без плана, с тех пор как в марте сменился начальник. Она спрашивает тебя, потому что ты первый, кому она об этом говорит.',
  contextLine: 'WhatsApp',
  duration: '4 min',
  level: 'B1',
  icon: 'stamp',
  startTime: '22:05',
  character: { name: 'Elif', status: 'zuletzt online: gerade' },
  experience: 'elif-kuendigung-gespraech',
  after: ['elif-hat-abgesagt'],
  meters: { anger: 6, respect: 62, patience: 45, guilt: 5 },

  objectives: [
    {
      id: 'zuhoeren',
      title: 'Einfach zuhören',
      hint: 'Keinen Rat, keine Lösung. Schwerer als es klingt.',
      ru: 'Просто выслушать',
      cta: 'diesmal nur zuhören?',
      contrast: 'abhalten',
    },
    {
      id: 'abhalten',
      title: 'Ihr das ausreden',
      hint: 'Ohne Job, ohne Plan, mitten im Jahr.',
      ru: 'Отговорить',
      cta: 'diesmal davon abbringen?',
      contrast: 'zuhoeren',
    },
    {
      id: 'mut-machen',
      title: 'Sie darin bestärken',
      hint: 'Manchmal braucht ein Mensch nur einen, der ja sagt.',
      ru: 'Поддержать в этом',
      cta: 'diesmal Rückenwind geben?',
      contrast: 'drama',
    },
    {
      id: 'drama',
      title: 'Sie soll es ihm ins Gesicht sagen',
      hint: 'Nicht per Mail. Morgen um neun, im Büro.',
      ru: 'Чтобы она сказала это ему в лицо',
      cta: 'diesmal morgen um neun, im Büro?',
      contrast: 'mut-machen',
    },
  ],

  outcomes: [
    {
      id: 'grund',
      // Only reachable with `erinnert`, and that reply only exists for someone
      // who heard the twelve euros the first time. Warm on top of it: quoting
      // her own bad month back at her can also go very wrong.
      requiresFlags: ['erinnert'],
      requires: { respect: ['>=', 74], anger: ['<=', 14] },
      achieved: [],
      secret: true,
      quoteLabel: 'Damit war es zum ersten Mal gesagt',
      name: 'Der eigentliche Grund',
      nameRu: 'Настоящая причина',
      title: 'Sie kündigt nicht. Sie sagt zum ersten Mal laut, warum sie nicht kann.',
      titleRu: 'Она не увольняется. Она впервые говорит вслух, почему не может.',
      consequences: [
        {
          de: 'Nicht der Chef. Das Konto.',
          ru: 'Не начальник. Счёт в банке.',
        },
        {
          de: 'Sie sucht jetzt was Neues, während sie noch da ist.',
          ru: 'Теперь она ищет новое, пока ещё работает там.',
        },
        {
          de: 'Und sie schreibt dir am nächsten Tag von selbst.',
          ru: 'И на следующий день она пишет тебе сама.',
        },
      ],
      reveals: ['elif-hat-sich-geoeffnet'],
    },
    {
      id: 'neun-uhr',
      requiresFlags: ['persoenlich'],
      achieved: ['drama'],
      quoteLabel: 'Das hat sie überzeugt',
      name: 'Morgen um neun',
      nameRu: 'Завтра в девять',
      title: 'Sie sagt es ihm persönlich — und legt das Schreiben daneben.',
      titleRu: 'Она говорит ему лично — и кладёт рядом письменное заявление.',
      consequences: [
        { de: 'Um 9:20 kommt ein Foto vom leeren Schreibtisch.', ru: 'В 9:20 приходит фото пустого стола.' },
        { de: 'Er hat „schade“ gesagt und nichts weiter.', ru: 'Он сказал «жаль» — и больше ничего.' },
        {
          de: 'Am Wochenende ist sie euphorisch und am Montag still.',
          ru: 'На выходных она в эйфории, а в понедельник молчит.',
        },
      ],
    },
    {
      id: 'gekuendigt',
      requiresFlags: ['abgeschickt'],
      achieved: ['mut-machen'],
      quoteLabel: 'Danach hat sie auf Senden gedrückt',
      name: 'Abgeschickt',
      nameRu: 'Отправлено',
      title: 'Die Kündigung ist raus. Am nächsten Morgen, per Mail, vor dem Kaffee.',
      titleRu: 'Заявление ушло. На следующее утро, письмом, до кофе.',
      consequences: [
        { de: 'Kein neuer Job, kein Plan, Ende des Monats.', ru: 'Ни новой работы, ни плана, к концу месяца.' },
        { de: 'Sie hat vorher noch eine Nacht drüber geschlafen.', ru: 'Перед этим она всё-таки переспала с этой мыслью.' },
        { de: 'Und du bist der, der ja gesagt hat.', ru: 'И это ты сказал «да».' },
      ],
    },
    {
      id: 'bleibt',
      requiresFlags: ['bleibt-vorerst'],
      achieved: ['abhalten'],
      quoteLabel: 'Das hat sie umgestimmt',
      name: 'Erst mal nichts',
      nameRu: 'Пока ничего',
      title: 'Sie bleibt. Vorerst, wie sie sagt, und sucht nebenbei.',
      titleRu: 'Она остаётся. Пока, как она говорит, и параллельно ищет.',
      consequences: [
        { de: 'Vernünftig. Sie sagt es auch so.', ru: 'Разумно. Она сама так и говорит.' },
        { de: 'Zweimal die Woche schreibt sie „ich hasse das hier“.', ru: 'Дважды в неделю она пишет «я это ненавижу».' },
        {
          de: 'Im Herbst redet ihr wieder darüber.',
          ru: 'Осенью вы снова об этом поговорите.',
        },
      ],
    },
    {
      id: 'zugehoert',
      requiresFlags: ['zugehoert'],
      requires: { anger: ['<=', 30] },
      achieved: ['zuhoeren'],
      quoteLabel: 'Der Satz, nach dem sie geredet hat',
      name: 'Du hast nichts geraten',
      nameRu: 'Ты не дал ни одного совета',
      title: 'Sie hat vierzig Minuten geredet und du hast nichts vorgeschlagen.',
      titleRu: 'Она говорила сорок минут, а ты ничего не предложил.',
      consequences: [
        { de: 'Entschieden ist nichts.', ru: 'Ничего не решено.' },
        { de: 'Sie sagt, es war das erste Mal seit Wochen ruhig.', ru: 'Она говорит, впервые за недели стало спокойно.' },
        {
          de: 'Und dass sie es allein hinkriegt, wenn sie es allein hinkriegen muss.',
          ru: 'И что она справится сама, если придётся справляться самой.',
        },
      ],
    },
    {
      id: 'kalt',
      requires: { anger: ['>=', 46] },
      achieved: [],
      quoteLabel: 'Ab da war es kein Gespräch mehr',
      name: 'Sie fragt nicht nochmal',
      nameRu: 'Больше она не спросит',
      title: 'Du hattest recht. Gefragt hat sie trotzdem nicht wieder.',
      titleRu: 'Ты был прав. Но спрашивать она больше не стала.',
      consequences: [
        { de: 'Sie schreibt: „Vergiss es, war blöd von mir.“', ru: 'Она пишет: «Забудь, глупо получилось».' },
        { de: 'Der Job bleibt, das Thema nicht.', ru: 'Работа остаётся, тема — нет.' },
        {
          de: 'Beim nächsten Mal fragt sie jemand anderen.',
          ru: 'В следующий раз она спросит кого-нибудь другого.',
        },
      ],
    },
    {
      id: 'unentschieden',
      achieved: [],
      quoteLabel: 'Und dabei ist es geblieben',
      name: 'Sie schläft drüber',
      nameRu: 'Она это переспит',
      title: 'Sie will drüber schlafen. Das sagt sie seit März.',
      titleRu: 'Она хочет с этим поспать. Она говорит это с марта.',
      consequences: [
        { de: 'Nichts abgeschickt, nichts entschieden.', ru: 'Ничего не отправлено, ничего не решено.' },
        { de: 'Morgen ist wieder Dienstag.', ru: 'Завтра снова вторник.' },
        { de: 'Ihr habt aber lange geredet.', ru: 'Зато вы долго говорили.' },
      ],
    },
  ],

  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        { text: 'Kann ich dich was fragen?', ru: 'Можно у тебя кое-что спросить?' },
        {
          text: 'Ich glaub, ich [kündige](kuendigen). Heute Abend.',
          ru: 'Кажется, я уволюсь. Сегодня вечером.',
        },
        // The same beat, two histories: with the money out in the open she
        // does not bother with the polite version.
        {
          text: 'Und bevor du fragst: nein, ich hab nichts anderes. Du weißt ja, wie es bei mir steht.',
          ru: 'И, пока ты не спросил: нет, ничего другого у меня нет. Ты же знаешь, как у меня дела.',
          after: ['elif-geldsorgen'],
        },
        {
          text: 'Es läuft eigentlich alles gut, es ist nur... schwer zu erklären.',
          ru: 'Вообще-то всё нормально, просто… сложно объяснить.',
          unless: ['elif-geldsorgen'],
        },
      ],
      responses: [
        {
          id: 'erzaehl',
          text: 'Erzähl. Ich sag erst mal gar nichts dazu.',
          ru: 'Рассказывай. Я пока вообще ничего не буду говорить.',
          effects: { respect: 12, patience: 8, anger: -4 },
          next: 'grund',
        },
        {
          id: 'warum',
          text: 'Wieso denn? Der Job war doch immer okay.',
          ru: 'А почему? Работа же всегда была нормальной.',
          effects: { respect: 6, anger: 8, patience: -6 },
          next: 'verteidigt',
        },
        {
          id: 'mach-es',
          text: 'Dann mach es.',
          ru: 'Тогда делай.',
          effects: { respect: 8, anger: -6, patience: 4 },
          next: 'bestaerkt',
        },
        {
          id: 'wovon',
          text: 'Und wovon lebst du dann?',
          ru: 'А на что ты тогда будешь жить?',
          effects: { respect: 6, anger: 10, patience: -8 },
          next: 'geld',
        },
      ],
    },

    grund: {
      id: 'grund',
      messages: [
        {
          text: 'Seit März hab ich einen neuen Chef. Seitdem ist alles Deadline.',
          ru: 'С марта у меня новый начальник. С тех пор всё — сплошные дедлайны.',
        },
        {
          text: 'Ich [steh](unter-druck-stehen) seit Wochen unter Druck und komm nicht mal zum Essen.',
          ru: 'Я уже недели под давлением и даже поесть не успеваю.',
        },
        {
          text: 'Und ich könnte es mir eigentlich gar nicht leisten. Das ist ja das Absurde.',
          ru: 'И я вообще-то не могу себе этого позволить. Это и есть самое абсурдное.',
          after: ['elif-geldsorgen'],
        },
      ],
      responses: [
        {
          id: 'zuhoeren',
          text: 'Klingt, als würdest du das schon länger mit dir rumtragen.',
          ru: 'Похоже, ты носишь это в себе уже давно.',
          flag: 'zugehoert',
          effects: { respect: 12, patience: 8, anger: -6 },
          next: 'offen',
        },
        {
          id: 'geld-frage',
          text: 'Und wovon lebst du dann, ehrlich gefragt?',
          ru: 'И на что ты будешь жить, если честно?',
          effects: { respect: 8, anger: 6, patience: -4 },
          next: 'geld',
        },
        {
          id: 'raten',
          text: 'An deiner Stelle würde ich erst was Neues suchen.',
          ru: 'На твоём месте я бы сначала нашёл новое.',
          effects: { respect: 6, anger: 10, patience: -8 },
          next: 'verteidigt',
        },
      ],
    },

    verteidigt: {
      id: 'verteidigt',
      messages: [
        { text: 'Das sagen alle.', ru: 'Все так говорят.' },
        {
          text: 'Du hast noch nie eine Woche mit fünfzig Stunden gehabt.',
          ru: 'У тебя ни разу не было недели по пятьдесят часов.',
        },
        {
          text: 'Manchmal will ich einfach alles [hinwerfen](hinwerfen) und gut ist.',
          ru: 'Иногда мне хочется просто всё бросить — и всё.',
        },
        {
          text: 'Und ich hab nicht gefragt, was ich machen soll.',
          ru: 'И я не спрашивала, что мне делать.',
          when: { anger: ['>=', 14] },
        },
      ],
      responses: [
        {
          id: 'stimmt',
          text: 'Stimmt. Ich hab auch nicht zugehört, sondern geredet.',
          ru: 'Верно. Я и не слушал, а говорил.',
          flag: 'zugehoert',
          effects: { anger: -14, respect: 12, guilt: 10 },
          next: 'offen',
        },
        {
          id: 'trotzdem',
          text: 'Trotzdem: mitten im Jahr ohne was Neues ist riskant.',
          ru: 'И всё же: посреди года без новой работы — это риск.',
          effects: { anger: 12, respect: 6, patience: -10 },
          next: 'gereizt',
        },
        {
          id: 'dann-mach',
          text: 'Dann sag ich das Gegenteil: wirf den Job hin.',
          ru: 'Тогда скажу обратное: бросай эту работу.',
          effects: { respect: 8, anger: -8 },
          next: 'bestaerkt',
        },
      ],
    },

    geld: {
      id: 'geld',
      messages: [
        { text: 'Zwei Monate hab ich noch.', ru: 'На два месяца мне хватит.' },
        {
          text: 'Danach... weiß ich nicht. Arbeitslosengeld, glaub ich.',
          ru: 'А потом… не знаю. Пособие, наверное.',
        },
        {
          text: 'Frag nicht so genau, ja? Ich hab die Zahlen selbst nicht angeschaut.',
          ru: 'Не спрашивай так подробно, ладно? Я сама на цифры не смотрела.',
          when: { anger: ['>=', 14] },
        },
      ],
      responses: [
        {
          id: 'erinnert',
          // Exists only if she told you about the twelve euros the first time.
          text: 'Elif. Im Mai hattest du bis Freitag zwölf Euro.',
          ru: 'Элиф. В мае у тебя до пятницы было двенадцать евро.',
          after: ['elif-geldsorgen'],
          callback: true,
          flag: 'erinnert',
          effects: { respect: 14, anger: 4, patience: 6 },
          next: 'offen',
        },
        {
          id: 'rechnen',
          text: 'Dann rechnen wir es einmal zusammen durch. Jetzt.',
          ru: 'Тогда давай один раз посчитаем вместе. Сейчас.',
          effects: { respect: 10, patience: 4 },
          next: 'planen',
        },
        {
          id: 'unvernuenftig',
          text: 'Zwei Monate sind kein Plan, das ist eine Frist.',
          ru: 'Два месяца — это не план, это срок.',
          effects: { anger: 14, respect: 8, patience: -10 },
          next: 'gereizt',
        },
      ],
    },

    offen: {
      id: 'offen',
      messages: [
        { text: 'Puh.', ru: 'Ох.' },
        {
          text: 'Ich hab mir das selbst noch nie so gesagt.',
          ru: 'Я даже себе самой так это ещё не говорила.',
        },
        {
          text: 'Und ehrlich: ich will gar nicht weg. Ich will nur, dass es aufhört.',
          ru: 'И честно: я вообще не хочу уходить. Я хочу, чтобы это закончилось.',
          when: { respect: ['>=', 74] },
        },
      ],
      responses: [
        {
          id: 'da',
          text: 'Dann lass es heute Abend einfach sein. Ich bin eh wach.',
          ru: 'Тогда просто оставь это на сегодня. Я всё равно не сплю.',
          effects: { respect: 10, anger: -8, patience: 6 },
          next: 'entschluss',
        },
        {
          id: 'plan',
          text: 'Machen wir es konkret: was müsste passieren, damit du bleibst?',
          ru: 'Давай конкретно: что должно измениться, чтобы ты осталась?',
          effects: { respect: 10, patience: 4 },
          next: 'planen',
        },
        {
          id: 'druck',
          text: 'Dann kündige und gut ist.',
          ru: 'Тогда увольняйся, и всё.',
          effects: { anger: 12, respect: -4, patience: -8 },
          next: 'gereizt',
        },
      ],
    },

    bestaerkt: {
      id: 'bestaerkt',
      messages: [
        { text: 'Echt?', ru: 'Правда?' },
        {
          text: 'Ok. Das hätte ich jetzt nicht gedacht.',
          ru: 'Ладно. Вот этого я сейчас не ожидала.',
        },
        {
          text: 'Ich hab die Mail schon geschrieben. Sie ist im Entwurf.',
          ru: 'Письмо я уже написала. Оно в черновиках.',
        },
      ],
      responses: [
        {
          id: 'persoenlich',
          text: 'Nicht per Mail. Sag es ihm morgen um neun, im Büro.',
          ru: 'Не письмом. Скажи ему завтра в девять, в офисе.',
          effects: { respect: 12, anger: 4, patience: -4 },
          next: 'drama',
        },
        {
          id: 'plan',
          text: 'Dann schick sie ab. Aber sag mir vorher, wie der Monat aussieht.',
          ru: 'Тогда отправляй. Но сначала скажи, как выглядит этот месяц.',
          effects: { respect: 10, patience: 6 },
          next: 'planen',
        },
        {
          id: 'sofort',
          text: 'Heute noch. Und nicht per Mail — ruf ihn an.',
          ru: 'Прямо сегодня. И не письмом — позвони ему.',
          effects: { respect: 8, anger: -4, patience: -4 },
          next: 'drama',
        },
      ],
    },

    planen: {
      id: 'planen',
      messages: [
        { text: 'Ok. Warte, ich hol was zu schreiben.', ru: 'Ладно. Погоди, возьму чем записать.' },
        {
          text: 'Miete 480, Handy, Bahn... und im Juli die Nachzahlung.',
          ru: 'Аренда 480, телефон, транспорт… и в июле доплата.',
        },
        {
          text: 'Wenn ich [auf eigene Faust](auf-eigene-faust) suche, brauch ich drei Monate. Realistisch vier.',
          ru: 'Если искать самой, мне нужно три месяца. Реалистично — четыре.',
          when: { patience: ['>=', 48] },
        },
      ],
      responses: [
        {
          id: 'vier-monate',
          text: 'Vier Monate. Dann kündigst du, sobald du Geld für drei davon zurückgelegt hast.',
          ru: 'Четыре месяца. Значит, увольняешься, как только отложишь деньги на три.',
          effects: { respect: 12, anger: -6, patience: 6 },
          next: 'entschluss',
        },
        {
          id: 'trotzdem-jetzt',
          text: 'Oder du gehst jetzt. Aber dann sag es ihm selbst, nicht per Mail.',
          ru: 'Или уходишь сейчас. Но тогда скажи ему сама, не письмом.',
          effects: { respect: 8, anger: 4, patience: -6 },
          next: 'drama',
        },
        {
          id: 'nichts-sagen',
          text: 'Ich sag jetzt nichts dazu. Das ist deine Rechnung.',
          ru: 'Я ничего не буду говорить. Это твой расчёт.',
          flag: 'zugehoert',
          effects: { respect: 8, patience: 8, anger: -4 },
          next: 'entschluss',
        },
      ],
    },

    drama: {
      id: 'drama',
      messages: [
        { text: 'Oh Gott. Ins Gesicht.', ru: 'О господи. В лицо.' },
        {
          text: 'Weißt du was? Ja. Morgen um neun steht er eh am Kaffee.',
          ru: 'Знаешь что? Да. В девять он всё равно стоит у кофемашины.',
        },
        {
          text: 'Ich schreib dir direkt danach, versprochen.',
          ru: 'Напишу тебе сразу после, обещаю.',
          when: { respect: ['>=', 70] },
        },
      ],
      responses: [
        {
          id: 'persoenlich',
          text: 'Neun Uhr. Und du schreibst mir um fünf nach.',
          ru: 'Девять. И в пять минут десятого ты мне пишешь.',
          flag: 'persoenlich',
          effects: { respect: 10, anger: -4 },
          next: 'was-sagen',
        },
        {
          id: 'doch-mail',
          text: 'Oder du schickst die Mail und schläfst endlich.',
          ru: 'Или отправляешь письмо и наконец спишь.',
          effects: { respect: 6, patience: -4 },
          next: 'entschluss',
        },
      ],
    },

    gereizt: {
      id: 'gereizt',
      messages: [
        { text: 'Weißt du was, vergiss es.', ru: 'Знаешь что, забудь.' },
        {
          text: 'Ich wollte nicht, dass mir jemand erklärt, wie Geld funktioniert.',
          ru: 'Я не хотела, чтобы мне объясняли, как работают деньги.',
        },
        {
          text: 'Ich wollte, dass einer sagt: klingt heftig.',
          ru: 'Я хотела, чтобы кто-нибудь сказал: звучит тяжело.',
          when: { anger: ['>=', 26] },
        },
      ],
      responses: [
        {
          id: 'zurueck',
          text: 'Dann sag ich es jetzt: klingt heftig. Und ich hör auf zu raten.',
          ru: 'Тогда говорю сейчас: звучит тяжело. И я перестаю советовать.',
          flag: 'zugehoert',
          effects: { anger: -18, respect: 12, guilt: 12 },
          next: 'entschluss',
        },
        {
          id: 'dabei',
          text: 'Ich bleib dabei. Kündigen ohne Plan macht es nicht besser.',
          ru: 'Я остаюсь при своём. Уволиться без плана лучше не сделает.',
          effects: { anger: 18, patience: -12 },
          next: 'stille',
        },
      ],
    },

    entschluss: {
      id: 'entschluss',
      messages: [
        { text: 'Ok.', ru: 'Ладно.' },
        {
          text: 'Ich mach heute nichts mehr. Der Entwurf bleibt Entwurf.',
          ru: 'Сегодня я больше ничего не делаю. Черновик останется черновиком.',
        },
        {
          text: 'Danke, dass du nicht sofort eine Lösung gehabt hast.',
          ru: 'Спасибо, что у тебя не сразу нашлось решение.',
          when: { respect: ['>=', 76] },
        },
      ],
      responses: [
        {
          id: 'senden',
          text: 'Wenn du morgen noch so denkst, schick sie ab.',
          ru: 'Если завтра будешь думать так же — отправляй.',
          flag: 'abgeschickt',
          effects: { respect: 8, anger: -4 },
          next: 'abgeschickt',
        },
        {
          id: 'bleiben',
          text: 'Bleib erst mal. Suchen kannst du nebenbei.',
          ru: 'Пока останься. Искать можно параллельно.',
          flag: 'bleibt-vorerst',
          effects: { respect: 8, anger: -6, patience: 4 },
          next: 'bleibt',
        },
        {
          id: 'offen-lassen',
          text: 'Schlaf drüber. Ich frag dich Donnerstag nochmal.',
          ru: 'Поспи с этим. Я спрошу тебя ещё раз в четверг.',
          effects: { respect: 10, patience: 8, anger: -4 },
          next: 'unklar',
        },
      ],
    },

    'was-sagen': {
      id: 'was-sagen',
      messages: [
        { text: 'Und was sag ich ihm genau?', ru: 'И что именно я ему скажу?' },
        {
          text: 'Und die [Frist](frist)? Drei Monate zum Quartalsende, glaub ich.',
          ru: 'А срок? Три месяца до конца квартала, кажется.',
        },
        {
          text: 'Schriftlich muss es eh sein, das hab ich nachgelesen. Aber sagen will ich es ihm selbst.',
          ru: 'Письменно всё равно нужно, я прочитала. Но сказать я хочу сама.',
        },
        {
          text: 'Sag mir einen Satz. Ich lern den auswendig, ich mein es ernst.',
          ru: 'Скажи мне одну фразу. Я её выучу наизусть, я серьёзно.',
          when: { respect: ['>=', 72] },
        },
      ],
      responses: [
        {
          id: 'formell',
          text: 'Ich möchte mein Arbeitsverhältnis zum Quartalsende kündigen. Punkt, nichts weiter.',
          ru: '«Я хочу расторгнуть трудовой договор с конца квартала». Точка, и всё.',
          effects: { respect: 12, patience: 4 },
          next: 'neun-uhr',
        },
        {
          id: 'einfach',
          text: 'Sag einfach: Ich hör auf. Den Rest macht die Personalabteilung.',
          ru: 'Просто скажи: «Я ухожу». Остальное сделает отдел кадров.',
          effects: { respect: 10, anger: -4 },
          next: 'neun-uhr',
        },
        {
          id: 'wahrheit',
          text: 'Und dann sag ihm, warum. Einmal, ruhig.',
          ru: 'А потом скажи ему почему. Один раз, спокойно.',
          effects: { respect: 8, anger: 6, patience: -4 },
          next: 'neun-uhr',
        },
      ],
    },

    'neun-uhr': {
      id: 'neun-uhr',
      messages: [
        {
          kind: 'system',
          text: 'Am nächsten Morgen um 9:06 kommt ein Foto von einem leeren Schreibtisch.',
          ru: 'На следующее утро в 9:06 приходит фото пустого стола.',
        },
        { text: 'Gesagt. Er hat nur „schade“ gesagt.', ru: 'Сказала. Он только сказал «жаль».' },
        {
          text: 'Der Brief lag unterschrieben daneben. Ohne den gilt es ja nicht.',
          ru: 'Рядом лежало подписанное заявление. Без него это ведь не считается.',
        },
      ],
      responses: [],
    },

    abgeschickt: {
      id: 'abgeschickt',
      messages: [
        {
          kind: 'system',
          text: 'Am nächsten Morgen um 8:20, noch vor dem ersten Kaffee:',
          ru: 'На следующее утро в 8:20, ещё до первого кофе:',
        },
        {
          text: 'Sie ist raus. Mir ist ein bisschen schlecht und ein bisschen leicht.',
          ru: 'Отправила. Мне немного плохо и немного легко.',
        },
        {
          text: 'Ich [sag dir Bescheid](bescheid-sagen), wenn er antwortet.',
          ru: 'Напишу тебе, когда он ответит.',
          when: { respect: ['>=', 70] },
        },
      ],
      responses: [],
    },

    bleibt: {
      id: 'bleibt',
      messages: [
        { text: 'Vernünftig. Ich weiß.', ru: 'Разумно. Я знаю.' },
        {
          text: 'Ich mach den Entwurf nicht weg. Nur damit du das weißt 🙂',
          ru: 'Черновик я не удалю. Просто чтобы ты знал 🙂',
        },
      ],
      responses: [],
    },

    unklar: {
      id: 'unklar',
      messages: [
        { text: 'Donnerstag. Ok.', ru: 'В четверг. Хорошо.' },
        {
          kind: 'system',
          text: 'Am Donnerstag steht in ihrem Status: zuletzt online 01:40.',
          ru: 'В четверг в её статусе: последний раз в сети 01:40.',
        },
      ],
      responses: [],
    },

    stille: {
      id: 'stille',
      messages: [
        { text: 'Vergiss es, war blöd von mir.', ru: 'Забудь, глупо получилось.' },
        {
          text: 'Ich geh schlafen. Morgen ist eh wieder Deadline.',
          ru: 'Пойду спать. Завтра всё равно снова дедлайн.',
        },
        {
          text: 'Und nein, ich bin nicht sauer. Nur müde.',
          ru: 'И нет, я не злюсь. Просто устала.',
          when: { anger: ['<=', 40] },
        },
      ],
      responses: [
        {
          id: 'zurueckrudern',
          text: 'Warte. Das war nicht mein Punkt. Erzähl es mir morgen nochmal.',
          ru: 'Погоди. Я не это имел в виду. Расскажи мне ещё раз завтра.',
          effects: { anger: -10, respect: 8, guilt: 12 },
          next: 'spaeter',
        },
        {
          id: 'stehen-lassen',
          text: 'Schlaf gut.',
          ru: 'Спокойной ночи.',
          action: {
            done: 'Du schreibst nur „Schlaf gut“ und legst das Handy weg.',
            doneRu: 'Ты пишешь только «спокойной ночи» и убираешь телефон.',
          },
          effects: { anger: 6, patience: -6 },
          next: 'spaeter',
        },
      ],
    },

    spaeter: {
      id: 'spaeter',
      messages: [
        {
          kind: 'system',
          text: 'Am nächsten Tag nichts. Am Donnerstag ein Bild von ihrem Schreibtisch, ohne Text.',
          ru: 'На следующий день ничего. В четверг — фото её рабочего стола, без подписи.',
        },
        {
          text: 'Alles gut. Ich hab es erst mal gelassen.',
          ru: 'Всё нормально. Я это пока оставила.',
          when: { anger: ['<=', 44] },
        },
      ],
      responses: [],
    },
  },
}
