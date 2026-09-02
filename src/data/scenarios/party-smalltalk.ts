import type { Scenario } from '../../types'

/** Small talk with a stranger at a party: who do you know, where are you from. */
export const partySmalltalk: Scenario = {
  id: 'party-smalltalk',
  title: 'Neben dem Kühlschrank',
  context: 'Sami spricht dich auf einer Party an.',
  contextLine: 'Samstagnacht · Neue Leute',
  duration: '4 min',
  level: 'B2',
  icon: 'glasses',
  character: { name: 'Sami', status: 'auf der Party' },
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        { text: 'Hey, ich bin Sami.', ru: 'Привет, я Сами.' },
        { text: 'Bist du auch über Lena hier?', ru: 'Ты тоже здесь через Лену?' },
      ],
      responses: [
        {
          id: 'arbeit',
          text: 'Ja, wir arbeiten zusammen.',
          ru: 'Да, мы вместе работаем.',
          next: 'arbeit',
        },
        {
          id: 'marc',
          text: 'Nee, ich kenne eigentlich nur den Gastgeber.',
          ru: 'Нет, я вообще знаю только хозяина.',
          next: 'gastgeber',
        },
        {
          id: 'keineahnung',
          text: 'Ehrlich gesagt weiß ich nicht, wessen Party das ist 😄',
          ru: 'Честно говоря, я не знаю, чья это вечеринка 😄',
          next: 'wessen',
        },
      ],
    },

    arbeit: {
      id: 'arbeit',
      messages: [
        {
          text: '[Ach so](ach-so), dann bist du in dem Architekturbüro?',
          ru: 'А, вот как — значит, ты в том архитектурном бюро?',
        },
        { text: 'Lena erzählt viel davon.', ru: 'Лена много про него рассказывает.' },
      ],
      responses: [
        {
          id: 'genau',
          text: 'Genau. Seit anderthalb Jahren.',
          ru: 'Именно. Уже полтора года.',
          next: 'woher',
        },
        {
          id: 'nebenan',
          text: 'Nicht ganz — ich bin in der Firma nebenan 😄',
          ru: 'Не совсем — я в фирме по соседству 😄',
          next: 'woher',
        },
        {
          id: 'anderes',
          text: 'Ja, aber lass uns über was anderes reden 😄',
          ru: 'Да, но давай о чём-нибудь другом 😄',
          next: 'woher',
        },
      ],
    },

    gastgeber: {
      id: 'gastgeber',
      messages: [
        { text: 'Ah, den Marc kenn ich auch [kaum](kaum).', ru: 'А, Марка я тоже почти не знаю.' },
        {
          text: 'Ich bin eigentlich nur wegen der Musik hier, ehrlich gesagt.',
          ru: 'Я, честно говоря, здесь вообще только из-за музыки.',
        },
      ],
      responses: [
        {
          id: 'musik',
          text: 'Die ist wirklich gut. Wer legt auf?',
          ru: 'Она правда хорошая. Кто ставит?',
          next: 'musik',
        },
        {
          id: 'ich-auch',
          text: 'Bei mir ist es das Essen 😄',
          ru: 'А у меня — из-за еды 😄',
          next: 'woher',
        },
        {
          id: 'kennen',
          text: 'Und woher kennst du Marc dann?',
          ru: 'А откуда ты тогда знаешь Марка?',
          next: 'woher',
        },
      ],
    },

    wessen: {
      id: 'wessen',
      messages: [
        { text: 'Willkommen im Club 😄', ru: 'Добро пожаловать в клуб 😄' },
        {
          text: 'Ich glaub, es ist Marcs Geburtstag. Oder Einzug. Irgendwas mit M.',
          ru: 'Кажется, у Марка день рождения. Или новоселье. Что-то на «М».',
        },
      ],
      responses: [
        {
          id: 'lustig',
          text: 'Dann trinken wir einfach auf M 🥂',
          ru: 'Тогда просто выпьем за «М» 🥂',
          next: 'woher',
        },
        {
          id: 'fragen',
          text: 'Sollten wir vielleicht mal fragen?',
          ru: 'Может, всё-таки спросим?',
          next: 'woher',
        },
        {
          id: 'musik',
          text: 'Solange die Musik gut ist, egal.',
          ru: 'Пока музыка хорошая — всё равно.',
          next: 'musik',
        },
      ],
    },

    musik: {
      id: 'musik',
      messages: [
        {
          text: 'Marcs Bruder. Der macht das auch auf Hochzeiten 😄',
          ru: 'Брат Марка. Он этим и на свадьбах занимается 😄',
        },
        { text: 'Aber gute Playlist, muss man sagen.', ru: 'Но плейлист хороший, надо признать.' },
      ],
      responses: [
        {
          id: 'ja',
          text: 'Wirklich gut. Ich hab schon zwei Songs gesucht.',
          ru: 'Правда хорошая. Я уже два трека искал.',
          next: 'woher',
        },
        {
          id: 'hochzeit',
          text: 'Deshalb kam vorhin dieser Schlager 😅',
          ru: 'Вот почему недавно заиграл этот шлягер 😅',
          next: 'woher',
        },
      ],
    },

    woher: {
      id: 'woher',
      messages: [
        { text: 'Sag mal, wo kommst du eigentlich her?', ru: 'Слушай, а откуда ты вообще?' },
        {
          text: 'Ich hör einen Akzent, aber [ich komm nicht drauf](drauf-kommen) 😄',
          ru: 'Я слышу акцент, но никак не угадаю 😄',
        },
      ],
      responses: [
        {
          id: 'russland',
          text: 'Aus Russland. Seit zwei Jahren hier.',
          ru: 'Из России. Здесь два года.',
          next: 'wie-lange',
        },
        { id: 'raten', text: 'Rate mal 😄', ru: 'Угадай 😄', next: 'raten' },
        {
          id: 'nichtvonhier',
          text: 'Von hier definitiv nicht 😄',
          ru: 'Точно не отсюда 😄',
          next: 'wie-lange',
        },
      ],
    },

    raten: {
      id: 'raten',
      messages: [
        { text: 'Polen? Nein… Tschechien?', ru: 'Польша? Нет… Чехия?' },
        { text: 'Ok, ich hör auf. Sag es mir 😄', ru: 'Ладно, сдаюсь. Скажи сам 😄' },
      ],
      responses: [
        {
          id: 'russland',
          text: 'Russland. Aber knapp dran.',
          ru: 'Россия. Но ты был близко.',
          next: 'wie-lange',
        },
        {
          id: 'spaeter',
          text: 'Später, wenn du mir was zu trinken holst 😄',
          ru: 'Позже, если принесёшь мне что-нибудь выпить 😄',
          next: 'wie-lange',
        },
      ],
    },

    'wie-lange': {
      id: 'wie-lange',
      messages: [
        { text: 'Und dein Deutsch ist schon so gut.', ru: 'А твой немецкий уже такой хороший.' },
        {
          text: 'Wie hast du das gemacht — Kurs, oder einfach so [nebenbei](nebenbei)?',
          ru: 'Как ты этого добился — курсы или просто между делом?',
        },
      ],
      responses: [
        {
          id: 'kurs',
          text: 'Kurs am Anfang, dann einfach viel geredet.',
          ru: 'Сначала курсы, потом просто много разговоров.',
          next: 'reden',
        },
        {
          id: 'serien',
          text: 'Serien, Kollegen und viele Fehler 😄',
          ru: 'Сериалы, коллеги и много ошибок 😄',
          next: 'fehler',
        },
        {
          id: 'passiv',
          text: 'Ich versteh mehr, als ich sagen kann. Wie alle 😄',
          ru: 'Я понимаю больше, чем могу сказать. Как все 😄',
          next: 'verstehen',
        },
      ],
    },

    reden: {
      id: 'reden',
      messages: [
        { text: 'Reden ist echt der Trick.', ru: 'Разговоры — вот что реально работает.' },
        {
          text: 'Ich hab in England gewohnt und drei Monate nur genickt 😄',
          ru: 'Я жил в Англии и три месяца только кивал 😄',
        },
      ],
      responses: [
        {
          id: 'kenne',
          text: 'Das Nicken kenn ich sehr gut.',
          ru: 'Это киванье мне очень знакомо.',
          next: 'stadt',
        },
        {
          id: 'wielange',
          text: 'Und wann hat es geklickt?',
          ru: 'А когда щёлкнуло?',
          next: 'stadt',
        },
      ],
    },

    fehler: {
      id: 'fehler',
      messages: [
        { text: 'Fehler sind das Beste, ehrlich.', ru: 'Ошибки — это самое лучшее, честно.' },
        {
          text: 'Ich hab mal in einer Bäckerei nach einem Brief statt einem Brot gefragt 😅',
          ru: 'Я однажды в булочной попросил письмо вместо хлеба 😅',
        },
      ],
      responses: [
        {
          id: 'gut',
          text: 'Solche Fehler merkt man sich wenigstens.',
          ru: 'Такие ошибки хотя бы запоминаются.',
          next: 'stadt',
        },
        {
          id: 'meins',
          text: 'Ich hab mal „Rathaus" und „Nachhaus" verwechselt.',
          ru: 'А я однажды перепутал «Rathaus» и «nach Haus».',
          next: 'stadt',
        },
      ],
    },

    verstehen: {
      id: 'verstehen',
      messages: [
        { text: 'Das ist doch normal.', ru: 'Это же нормально.' },
        {
          text: 'Und wenn du nicht weiterkommst, sagst du einfach „[wie heißt das nochmal](wie-heisst-das-nochmal)" — machen wir alle.',
          ru: 'А если не получается дальше — просто скажи «как это называется», так делают все.',
        },
      ],
      responses: [
        {
          id: 'stimmt',
          text: 'Stimmt, das mach ich zu selten.',
          ru: 'Верно, я так делаю слишком редко.',
          next: 'stadt',
        },
        {
          id: 'peinlich',
          text: 'Ist mir immer ein bisschen peinlich.',
          ru: 'Мне всегда немного неловко.',
          next: 'stadt',
        },
      ],
    },

    stadt: {
      id: 'stadt',
      messages: [
        {
          text: 'Und [wie findest du](wie-findest-du) die Stadt so? Ehrlich.',
          ru: 'А как тебе город? Честно.',
        },
      ],
      responses: [
        {
          id: 'winter',
          text: 'Gut. Nur der Winter ist hart.',
          ru: 'Хорошо. Только зима тяжёлая.',
          next: 'winter',
        },
        {
          id: 'leute',
          text: 'Die Leute brauchen lange, aber dann ist es echt.',
          ru: 'Людям нужно много времени, но потом это по-настоящему.',
          next: 'leute',
        },
        {
          id: 'spaeter',
          text: 'Frag mich im Februar nochmal 😄',
          ru: 'Спроси меня ещё раз в феврале 😄',
          next: 'winter',
        },
      ],
    },

    winter: {
      id: 'winter',
      messages: [
        { text: 'Der Winter hier ist auch für uns hart 😄', ru: 'Зима здесь и для нас тяжёлая 😄' },
        {
          text: 'Zwei Monate grau, dann tun alle so, als wäre nichts gewesen.',
          ru: 'Два месяца серости, а потом все делают вид, что ничего не было.',
        },
      ],
      responses: [
        {
          id: 'genau',
          text: 'Genau das meine ich.',
          ru: 'Именно это я и имею в виду.',
          next: 'weiter',
        },
        {
          id: 'sport',
          text: 'Ich hab angefangen zu schwimmen, das hilft.',
          ru: 'Я начал плавать, это помогает.',
          next: 'weiter',
        },
      ],
    },

    leute: {
      id: 'leute',
      messages: [
        { text: 'Das trifft es ziemlich gut.', ru: 'Это довольно точно сказано.' },
        {
          text: 'Dafür sagt hier keiner „wir müssen mal", wenn er es nicht meint.',
          ru: 'Зато здесь никто не говорит «надо бы как-нибудь встретиться», если не имеет этого в виду.',
        },
      ],
      responses: [
        {
          id: 'stimmt',
          text: 'Das mag ich tatsächlich.',
          ru: 'Вот это мне действительно нравится.',
          next: 'weiter',
        },
        {
          id: 'anfang',
          text: 'Am Anfang war es trotzdem einsam.',
          ru: 'И всё же поначалу было одиноко.',
          next: 'weiter',
        },
      ],
    },

    weiter: {
      id: 'weiter',
      messages: [
        {
          text: 'Sag mal, wir stehen hier seit zwanzig Minuten neben dem Kühlschrank 😄',
          ru: 'Слушай, мы тут уже двадцать минут стоим рядом с холодильником 😄',
        },
        {
          text: 'Willst du was trinken? Ich hol mir was.',
          ru: 'Хочешь что-нибудь выпить? Я себе иду брать.',
        },
      ],
      responses: [
        {
          id: 'ja',
          text: 'Gerne. Was ohne Alkohol, wenn es was gibt.',
          ru: 'С удовольствием. Что-нибудь без алкоголя, если есть.',
          next: 'trinken',
        },
        {
          id: 'mit',
          text: 'Ich komm mit, dann seh ich, was da ist.',
          ru: 'Я пойду с тобой, посмотрю, что там есть.',
          next: 'trinken',
        },
        {
          id: 'los',
          text: 'Ich muss eigentlich gleich los, ehrlich gesagt.',
          ru: 'Мне, честно говоря, скоро надо идти.',
          next: 'los',
        },
      ],
    },

    trinken: {
      id: 'trinken',
      messages: [
        { text: 'Perfekt.', ru: 'Отлично.' },
        {
          text: 'Und danach stell ich dich Marc vor — dann weißt du auch, wessen Party das ist 😄',
          ru: 'А потом познакомлю тебя с Марком — тогда узнаешь, чья это вечеринка 😄',
        },
      ],
      responses: [
        { id: 'endlich', text: 'Endlich 😄', ru: 'Наконец-то 😄', next: 'ende' },
        { id: 'gerne', text: 'Sehr gerne.', ru: 'С удовольствием.', next: 'ende' },
      ],
    },

    los: {
      id: 'los',
      messages: [
        { text: 'Schade! Aber ich versteh das.', ru: 'Жаль! Но я понимаю.' },
        {
          text: 'Wir sehen uns bestimmt nochmal — [war echt nett](war-nett).',
          ru: 'Мы наверняка ещё увидимся — было очень приятно.',
        },
      ],
      responses: [
        { id: 'auch', text: 'Fand ich auch. Bis dann!', ru: 'Мне тоже. До встречи!', next: 'ende' },
        { id: 'lena', text: 'Grüß Lena von mir 👋', ru: 'Передай Лене привет 👋', next: 'ende' },
      ],
    },

    ende: {
      id: 'ende',
      messages: [
        { text: 'Bis dann! 👋', ru: 'До встречи! 👋' },
      ],
      responses: [],
    },
  },
}
