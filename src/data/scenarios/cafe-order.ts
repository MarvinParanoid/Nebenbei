import type { Scenario } from '../../types'

/** At the counter of a small café. Short turns, service German. */
export const cafeOrder: Scenario = {
  id: 'cafe-order',
  title: 'Kaffee holen',
  context: 'Mia nimmt am Tresen die Bestellung auf.',
  contextLine: 'Vormittags · Café Nord',
  duration: '2 min',
  level: 'A2',
  icon: 'cup',
  character: { name: 'Mia', status: 'Café Nord' },
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        { text: 'Hallo!', ru: 'Привет!' },
        { text: "[Was darf's sein?](was-darfs-sein)", ru: 'Что будешь?' },
      ],
      responses: [
        {
          id: 'cappu',
          text: 'Einen Cappuccino, bitte.',
          ru: 'Один капучино, пожалуйста.',
          next: 'milch',
        },
        {
          id: 'tipp',
          text: 'Was könnt ihr denn empfehlen?',
          ru: 'А что посоветуете?',
          next: 'empfehlung',
        },
        {
          id: 'filter',
          text: 'Einen Filterkaffee. Zum Mitnehmen, bitte.',
          ru: 'Фильтр-кофе. С собой, пожалуйста.',
          next: 'dazu',
        },
      ],
    },

    empfehlung: {
      id: 'empfehlung',
      messages: [
        { text: 'Der Flat White läuft heute gut.', ru: 'Флэт уайт сегодня идёт хорошо.' },
        {
          text: 'Und die Zimtschnecken sind gerade frisch aus dem Ofen 😌',
          ru: 'И булочки с корицей только что из печи 😌',
        },
      ],
      responses: [
        {
          id: 'flat',
          text: 'Dann einen Flat White, bitte.',
          ru: 'Тогда флэт уайт, пожалуйста.',
          next: 'milch',
        },
        {
          id: 'tee',
          text: 'Für mich was ohne Kaffee — habt ihr Tee?',
          ru: 'Мне что-нибудь без кофе — чай есть?',
          next: 'tee',
        },
        {
          id: 'schnecke',
          text: 'Zimtschnecke auf jeden Fall. Und einen Espresso.',
          ru: 'Булочку с корицей точно. И эспрессо.',
          next: 'dazu',
        },
      ],
    },

    tee: {
      id: 'tee',
      messages: [
        {
          text: 'Klar: Pfefferminz, Ingwer oder Chai.',
          ru: 'Конечно: мята, имбирь или чай масала.',
        },
      ],
      responses: [
        { id: 'ingwer', text: 'Ingwer, bitte.', ru: 'Имбирный, пожалуйста.', next: 'dazu' },
        {
          id: 'chai',
          text: "Chai. Mit Hafermilch, wenn's geht.",
          ru: 'Чай масала. С овсяным молоком, если можно.',
          next: 'milch',
        },
        { id: 'du', text: 'Nimm du für mich 😄', ru: 'Выбери за меня 😄', next: 'dazu' },
      ],
    },

    milch: {
      id: 'milch',
      messages: [
        { text: 'Gerne.', ru: 'С удовольствием.' },
        { text: 'Normale Milch oder Hafer?', ru: 'Обычное молоко или овсяное?' },
      ],
      responses: [
        { id: 'hafer', text: 'Hafer, bitte.', ru: 'Овсяное, пожалуйста.', next: 'dazu' },
        { id: 'normal', text: 'Normal ist gut.', ru: 'Обычное — хорошо.', next: 'dazu' },
        { id: 'preis', text: 'Ist Hafer extra?', ru: 'Овсяное за доплату?', next: 'hafer-preis' },
      ],
    },

    'hafer-preis': {
      id: 'hafer-preis',
      messages: [
        { text: 'Fünfzig Cent.', ru: 'Пятьдесят центов.' },
        {
          text: "Wenn's dir zu viel ist: [macht nichts](macht-nichts), dann nehmen wir normale.",
          ru: 'Если тебе это дорого — ничего страшного, возьмём обычное.',
        },
      ],
      responses: [
        {
          id: 'trotzdem',
          text: 'Dann nehm ich Hafer trotzdem.',
          ru: 'Тогда всё равно овсяное.',
          next: 'dazu',
        },
        {
          id: 'normal',
          text: 'Ach, dann lieber normal.',
          ru: 'А, тогда лучше обычное.',
          next: 'dazu',
        },
      ],
    },

    dazu: {
      id: 'dazu',
      messages: [
        {
          text: '[Sonst noch was?](sonst-noch-was) Wir hätten Zimtschnecken, Bananenbrot und belegte Brötchen.',
          ru: 'Что-нибудь ещё? Есть булочки с корицей, банановый хлеб и бутерброды.',
        },
      ],
      responses: [
        {
          id: 'schnecke',
          text: 'Eine Zimtschnecke, bitte.',
          ru: 'Одну булочку с корицей, пожалуйста.',
          next: 'hier-oder',
        },
        {
          id: 'nur',
          text: 'Danke, nur den Kaffee.',
          ru: 'Спасибо, только кофе.',
          next: 'hier-oder',
        },
        {
          id: 'was',
          text: 'Was ist auf den Brötchen drauf?',
          ru: 'А что в бутербродах?',
          next: 'broetchen',
        },
      ],
    },

    broetchen: {
      id: 'broetchen',
      messages: [
        { text: 'Käse, oder Hummus mit Gurke.', ru: 'Сыр или хумус с огурцом.' },
        {
          text: '[Ehrlich gesagt](ehrlich-gesagt) ist das mit Hummus besser 😄',
          ru: 'Честно говоря, с хумусом лучше 😄',
        },
      ],
      responses: [
        {
          id: 'hummus',
          text: 'Dann Hummus, bitte.',
          ru: 'Тогда хумус, пожалуйста.',
          next: 'hier-oder',
        },
        { id: 'kaese', text: 'Käse ist auch ok.', ru: 'Сыр тоже нормально.', next: 'hier-oder' },
        {
          id: 'nix',
          text: 'Nächstes Mal. Heute nur Kaffee.',
          ru: 'В следующий раз. Сегодня только кофе.',
          next: 'hier-oder',
        },
      ],
    },

    'hier-oder': {
      id: 'hier-oder',
      messages: [
        { text: '[Hier oder zum Mitnehmen?](hier-oder-zum-mitnehmen)', ru: 'Здесь или с собой?' },
      ],
      responses: [
        { id: 'mit', text: 'Zum Mitnehmen, bitte.', ru: 'С собой, пожалуйста.', next: 'zahlen' },
        {
          id: 'hier',
          text: 'Ich bleib hier, ich hab Zeit.',
          ru: 'Останусь здесь, время есть.',
          next: 'zahlen',
        },
        {
          id: 'platz',
          text: 'Kommt drauf an — ist noch ein Platz frei?',
          ru: 'Смотря как — есть свободное место?',
          next: 'platz',
        },
      ],
    },

    platz: {
      id: 'platz',
      messages: [
        {
          text: 'Da hinten am Fenster wird gerade einer frei 🙂',
          ru: 'Вон там у окна как раз освобождается 🙂',
        },
      ],
      responses: [
        { id: 'perfekt', text: 'Perfekt, danke.', ru: 'Идеально, спасибо.', next: 'zahlen' },
        {
          id: 'doch',
          text: 'Dann doch zum Mitnehmen, ich muss weiter.',
          ru: 'Тогда всё-таки с собой, мне надо идти.',
          next: 'zahlen',
        },
      ],
    },

    zahlen: {
      id: 'zahlen',
      messages: [
        { text: 'Macht vier achtzig.', ru: 'С тебя четыре восемьдесят.' },
        { text: 'Karte oder bar?', ru: 'Картой или наличными?' },
      ],
      responses: [
        { id: 'karte', text: 'Karte, bitte.', ru: 'Картой, пожалуйста.', next: 'karte' },
        {
          id: 'bar',
          text: "Bar. Moment, ich hab's passend.",
          ru: 'Наличными. Секунду, у меня есть без сдачи.',
          next: 'bar',
        },
        {
          id: 'handy',
          text: 'Geht auch mit dem Handy?',
          ru: 'Телефоном тоже можно?',
          next: 'karte',
        },
      ],
    },

    karte: {
      id: 'karte',
      messages: [
        { text: 'Klar, einmal auflegen.', ru: 'Конечно, приложи.' },
        {
          text: "Danke! Ich [sag Bescheid](bescheid-sagen), wenn's fertig ist — zwei Minuten.",
          ru: 'Спасибо! Я скажу, когда будет готово — две минуты.',
        },
      ],
      responses: [
        { id: 'gut', text: 'Alles gut, danke!', ru: 'Всё хорошо, спасибо!', next: 'fertig' },
        {
          id: 'warte',
          text: 'Kein Stress, ich warte hier.',
          ru: 'Без спешки, я тут подожду.',
          next: 'fertig',
        },
        {
          id: 'hinten',
          text: 'Ich sitz da hinten am Fenster.',
          ru: 'Я сяду вон там у окна.',
          next: 'fertig',
        },
      ],
    },

    bar: {
      id: 'bar',
      messages: [
        { text: 'Danke dir.', ru: 'Спасибо тебе.' },
        { text: 'Und zwanzig Cent zurück.', ru: 'И двадцать центов сдачи.' },
      ],
      responses: [
        { id: 'stimmt', text: 'Stimmt so 🙂', ru: 'Сдачи не надо 🙂', next: 'fertig' },
        { id: 'danke', text: 'Danke!', ru: 'Спасибо!', next: 'fertig' },
      ],
    },

    fertig: {
      id: 'fertig',
      messages: [
        { text: 'Deiner ist fertig ☕', ru: 'Твой готов ☕' },
        { text: 'Schönen Tag noch!', ru: 'Хорошего дня!' },
      ],
      responses: [
        { id: 'gleichfalls', text: 'Danke, gleichfalls!', ru: 'Спасибо, и тебе!', next: 'ende' },
        {
          id: 'bis',
          text: 'Danke dir! Bis nächste Woche 👋',
          ru: 'Спасибо! До следующей недели 👋',
          next: 'ende',
        },
      ],
    },

    ende: {
      id: 'ende',
      messages: [
        { text: 'Bis dann 😊', ru: 'До встречи 😊' },
      ],
      responses: [],
    },
  },
}
