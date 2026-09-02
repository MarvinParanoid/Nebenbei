import type { Scenario } from '../../types'

/**
 * The landlord sends the yearly service-charge statement: 640 € to pay by the
 * end of the month. He is not a villain — the gas price really did double and
 * he sent the statement inside the deadline. But one line on it does not
 * belong there, and nobody read your meter because you were away.
 *
 * The statement is a card, and reading it *is* the language task: the whole
 * argument is about which of its rows you name out loud.
 */
export const nebenkostenNachzahlung: Scenario = {
  id: 'nebenkosten-nachzahlung',
  title: 'Sechshundertvierzig Euro',
  context: 'Die Abrechnung ist da. Nachzahlung bis Ende September.',
  situation:
    'Herr Adler ist Vermieter von drei Wohnungen und schreibt selbst, abends, aus dem Wohnzimmer. Die Abrechnung ist fristgerecht, das Gas ist wirklich teurer geworden — und ein Posten darauf darf da gar nicht stehen.',
  situationRu:
    'Герр Адлер сдаёт три квартиры и пишет сам, вечером, из гостиной. Расчёт пришёл в срок, газ действительно подорожал — и одной статьи в этом расчёте быть вообще не должно.',
  contextLine: 'WhatsApp',
  duration: '4 min',
  level: 'B2',
  icon: 'form',
  startTime: '19:05',
  character: { name: 'Herr Adler', status: 'Vermieter' },
  meters: { anger: 10, respect: 50, patience: 50, guilt: 5 },

  objectives: [
    {
      id: 'pruefen',
      title: 'Die Belege sehen wollen',
      hint: 'Erst schauen, dann zahlen. Das ist dein Recht.',
      ru: 'Добиться, чтобы показали документы',
      cta: 'diesmal erst die Belege?',
      contrast: 'runter',
    },
    {
      id: 'raten',
      title: 'In Raten zahlen',
      hint: 'Der Betrag bleibt. Nur nicht alles auf einmal.',
      ru: 'Договориться о рассрочке',
      cta: 'diesmal in Raten?',
      contrast: 'frech',
    },
    {
      id: 'runter',
      title: 'Den Betrag drücken',
      hint: 'Ein Posten auf der Abrechnung hält keine Prüfung aus.',
      ru: 'Сбить сумму',
      cta: 'diesmal den Betrag drücken?',
      contrast: 'pruefen',
    },
    {
      id: 'frech',
      title: 'Ihn überzeugen, dass er dir Geld schuldet',
      hint: 'Bei dir hat nie jemand den Zähler abgelesen. Nie.',
      ru: 'Убедить его, что он должен тебе',
      cta: 'diesmal schuldet er dir was?',
      contrast: 'raten',
    },
  ],

  outcomes: [
    {
      id: 'fehler',
      // Only a polite reader who asked for the receipts *and* named a line
      // gets him to re-check his own arithmetic.
      requiresFlags: ['fehler'],
      requires: { respect: ['>=', 70], anger: ['<=', 26] },
      achieved: [],
      secret: true,
      quoteLabel: 'Das hat ihn nachrechnen lassen',
      name: 'Der doppelte Hausmeister',
      nameRu: 'Дважды посчитанный дворник',
      title: 'Die Hausmeister-Rechnung stand zweimal drin. Die Nachzahlung sind jetzt 180.',
      titleRu: 'Счёт за дворника попал в расчёт дважды. Доплата теперь 180.',
      consequences: [
        { de: 'Vierhundertsechzig Euro weniger.', ru: 'На четыреста шестьдесят евро меньше.' },
        { de: 'Er hat den Fehler selbst gefunden.', ru: 'Ошибку он нашёл сам.' },
        {
          de: 'Und er entschuldigt sich zweimal, was ihm sichtlich schwerfällt.',
          ru: 'И извиняется дважды, что даётся ему заметно тяжело.',
        },
      ],
    },
    {
      id: 'gutschrift',
      requiresFlags: ['gutschrift'],
      achieved: ['frech'],
      quoteLabel: 'Damit hat er nachgegeben',
      name: 'Die Gutschrift',
      nameRu: 'Зачёт в твою пользу',
      title: 'Der geschätzte Zählerstand wird korrigiert. Du bekommst 40 gut.',
      titleRu: 'Оценочные показания счётчика исправляют. Тебе зачитывают 40.',
      consequences: [
        { de: 'Aus 640 werden 600.', ru: 'Из 640 получается 600.' },
        {
          de: 'Nächstes Jahr klingelt er bei dir persönlich zum Ablesen.',
          ru: 'В следующем году он придёт снимать показания к тебе лично.',
        },
        { de: 'Zweimal, wenn nötig.', ru: 'Дважды, если понадобится.' },
      ],
    },
    {
      id: 'minus',
      requiresFlags: ['korrektur'],
      achieved: ['runter'],
      quoteLabel: 'Der Satz, der den Posten gestrichen hat',
      name: 'Neunzig weniger',
      nameRu: 'На девяносто меньше',
      title: 'Die Verwaltungskosten fliegen raus. Es bleiben 550.',
      titleRu: 'Расходы на управление вылетают. Остаётся 550.',
      consequences: [
        { de: 'Neunzig Euro, weil du einen Posten benannt hast.', ru: 'Девяносто евро — за то, что ты назвал конкретную статью.' },
        { de: 'Er schickt eine korrigierte Abrechnung.', ru: 'Он присылает исправленный расчёт.' },
        { de: 'Und liest sie nächstes Jahr zweimal.', ru: 'И в следующем году перечитает его дважды.' },
      ],
    },
    {
      id: 'termin',
      requiresFlags: ['termin'],
      achieved: ['pruefen'],
      quoteLabel: 'Damit stand der Termin',
      name: 'Donnerstag, 17 Uhr',
      nameRu: 'Четверг, 17:00',
      title: 'Er kommt mit dem Ordner vorbei. Alle Rechnungen, keine Kopien.',
      titleRu: 'Он придёт с папкой. Все счета, без копий.',
      consequences: [
        { de: 'Gezahlt ist noch nichts.', ru: 'Пока не заплачено ничего.' },
        { de: 'Die Frist läuft erst, wenn du geprüft hast.', ru: 'Срок пойдёт только после того, как ты всё проверишь.' },
        { de: 'Er bringt Kaffee mit. Ungefragt.', ru: 'Он принесёт кофе. Без всякой просьбы.' },
      ],
    },
    {
      id: 'raten',
      requiresFlags: ['raten'],
      achieved: ['raten'],
      quoteLabel: 'Da war die Rate ausgehandelt',
      name: 'Vier mal hundertsechzig',
      nameRu: 'Четыре раза по сто шестьдесят',
      title: 'Vier Monatsraten, zinsfrei, per Dauerauftrag.',
      titleRu: 'Четыре месячных платежа, без процентов, автоплатежом.',
      consequences: [
        { de: 'Der Betrag bleibt bei 640.', ru: 'Сумма остаётся 640.' },
        { de: 'Bis Januar ist jeden Monat etwas weg.', ru: 'До января каждый месяц уходит часть.' },
        { de: 'Dafür war es in vier Nachrichten geregelt.', ru: 'Зато всё решилось за четыре сообщения.' },
      ],
    },
    {
      id: 'formell',
      requires: { anger: ['>=', 55] },
      achieved: [],
      quoteLabel: 'Ab da wurde es formell',
      name: 'Der Mieterverein',
      nameRu: 'Союз квартиросъёмщиков',
      title: 'Ihr schreibt sich jetzt nur noch schriftlich. Beide mit Beratung.',
      titleRu: 'Теперь вы общаетесь только письменно. Оба — с консультантами.',
      consequences: [
        { de: 'Recht hast du wahrscheinlich.', ru: 'Прав ты, вероятно.' },
        { de: 'Gezahlt wird trotzdem erst im Dezember.', ru: 'Заплатить всё равно придётся не раньше декабря.' },
        {
          de: 'Und im Treppenhaus grüßt jetzt keiner mehr zuerst.',
          ru: 'И в подъезде теперь никто не здоровается первым.',
        },
      ],
    },
    {
      id: 'voll',
      achieved: [],
      quoteLabel: 'Danach war es beschlossen',
      name: 'Sechshundertvierzig',
      nameRu: 'Шестьсот сорок',
      title: 'Du zahlst die Nachzahlung, wie sie da steht.',
      titleRu: 'Ты платишь доплату так, как она написана.',
      consequences: [
        { de: 'Überwiesen am nächsten Morgen.', ru: 'Перевод на следующее утро.' },
        { de: 'Die Verwaltungskosten hat nie jemand angeschaut.', ru: 'Расходы на управление так никто и не посмотрел.' },
        { de: 'Nächstes Jahr kommt die nächste Abrechnung.', ru: 'В следующем году придёт следующий расчёт.' },
      ],
    },
  ],

  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        {
          text: 'Guten Abend! Die Abrechnung für 2024 ist fertig, ich schick sie Ihnen hier.',
          ru: 'Добрый вечер! Расчёт за 2024 готов, отправляю вам его здесь.',
        },
        {
          kind: 'card',
          card: {
            label: 'Betriebskostenabrechnung 2024',
            rows: [
              { left: 'Heizung und Warmwasser', right: '1.480,00' },
              { left: 'Wasser, Abwasser', right: '210,00' },
              { left: 'Müllabfuhr', right: '96,00' },
              { left: 'Hausmeister', right: '240,00' },
              { left: 'Verwaltungskosten', right: '90,00' },
              { left: 'Ihre Vorauszahlungen', right: '− 1.476,00' },
            ],
            total: { left: 'Nachzahlung', right: '640,00 €' },
          },
          ru: 'Расчёт коммунальных расходов за 2024 год',
        },
        {
          text: 'Die [Nachzahlung](die-nachzahlung) wäre bis zum 30.09. fällig.',
          ru: 'Доплату нужно внести до 30.09.',
        },
      ],
      responses: [
        {
          id: 'hoch',
          text: 'Sechshundertvierzig? Das kann so nicht stimmen.',
          ru: 'Шестьсот сорок? Так быть не может.',
          effects: { anger: 8, patience: -6 },
          next: 'erklaerung',
        },
        {
          id: 'belege-bitten',
          text: 'Bevor ich zahle, würde ich mir gern die Belege ansehen.',
          ru: 'Прежде чем платить, я хотел бы посмотреть документы.',
          flag: 'belege',
          effects: { respect: 10, patience: 4 },
          next: 'belege',
        },
        {
          id: 'raten-fragen',
          text: 'Das ist viel auf einmal. Ginge das auch in Raten?',
          ru: 'Это много сразу. Можно частями?',
          effects: { respect: 6, guilt: 10, anger: -4 },
          next: 'raten',
        },
        {
          id: 'ablesung',
          text: 'Bei mir hat nie jemand den Zähler abgelesen.',
          ru: 'У меня никто ни разу не снимал показания счётчика.',
          effects: { respect: 6, anger: 6, patience: -4 },
          next: 'ablesung',
        },
      ],
    },

    erklaerung: {
      id: 'erklaerung',
      messages: [
        {
          text: 'Das Gas hat sich verdoppelt. Das trifft alle vier Wohnungen, nicht nur Sie.',
          ru: 'Газ подорожал вдвое. Это касается всех четырёх квартир, не только вас.',
        },
        {
          text: 'Ich hab die Abrechnung nicht gemacht, um Ihnen den Abend zu verderben.',
          ru: 'Я делал этот расчёт не для того, чтобы испортить вам вечер.',
          when: { anger: ['>=', 16] },
        },
        {
          text: 'Aber schauen Sie gern rein, das ist Ihr Recht.',
          ru: 'Но посмотрите, конечно, это ваше право.',
        },
      ],
      responses: [
        {
          id: 'posten-frage',
          text: 'Was sind denn diese Verwaltungskosten?',
          ru: 'А что такое эти расходы на управление?',
          flag: 'posten',
          effects: { respect: 10, patience: 4 },
          next: 'posten',
        },
        {
          id: 'raten',
          text: 'Gut. Dann bitte in vier Raten.',
          ru: 'Хорошо. Тогда, пожалуйста, четырьмя платежами.',
          effects: { respect: 4, guilt: 8, anger: -6 },
          next: 'raten',
        },
        {
          id: 'belege-bitten',
          text: 'Dann will ich erst die Belege sehen.',
          ru: 'Тогда я сначала хочу посмотреть документы.',
          flag: 'belege',
          effects: { respect: 10, patience: 4 },
          next: 'belege',
        },
        {
          id: 'frech',
          text: 'Kann es sein, dass ich letztes Jahr zu viel gezahlt hab?',
          ru: 'А может быть, я в прошлом году переплатил?',
          effects: { anger: 8, respect: 6, patience: -8 },
          next: 'frech',
        },
      ],
    },

    belege: {
      id: 'belege',
      messages: [
        {
          text: '[Belegeinsicht](belegeinsicht) ist Ihr Recht, natürlich.',
          ru: 'Право посмотреть документы у вас, разумеется, есть.',
        },
        {
          text: 'Ich hab den Ordner hier. Donnerstag zwischen 17 und 19 könnten Sie [vorbeikommen](vorbeikommen).',
          ru: 'Папка у меня здесь. В четверг между 17 и 19 вы могли бы зайти.',
        },
        {
          text: 'Kopien mach ich nicht, das dürfen Sie mir glauben oder nachlesen.',
          ru: 'Копий я не делаю — можете мне поверить или прочитать сами.',
          when: { patience: ['<=', 48] },
        },
      ],
      responses: [
        {
          id: 'termin',
          text: 'Donnerstag 17 Uhr passt mir gut.',
          ru: 'Четверг, 17:00, мне подходит.',
          effects: { respect: 8, anger: -4 },
          next: 'ordner',
        },
        {
          id: 'scan',
          text: 'Ich komm vor 19 Uhr nicht weg. Können Sie sie einscannen?',
          ru: 'Я до 19 не освобожусь. Вы можете их отсканировать?',
          effects: { respect: 4, patience: -8, anger: 4 },
          next: 'ordner',
        },
        {
          id: 'posten-frage',
          text: 'Eine Zeile kann ich schon jetzt nicht nachvollziehen.',
          ru: 'Одну строку я не понимаю уже сейчас.',
          flag: 'posten',
          effects: { respect: 10, patience: 4 },
          next: 'posten',
        },
      ],
    },

    raten: {
      id: 'raten',
      messages: [
        { text: 'Das lässt sich machen.', ru: 'Это можно устроить.' },
        {
          text: 'Vier mal 160, ab Oktober. [In Raten zahlen](in-raten-zahlen) ist kein Problem, sagen Sie es nur vorher.',
          ru: 'Четыре раза по 160, с октября. Платить частями — не проблема, только скажите заранее.',
        },
        {
          text: 'Beim letzten Mieter hab ich das auch so gemacht.',
          ru: 'С прошлым квартиросъёмщиком я так же и делал.',
          when: { respect: ['>=', 54] },
        },
      ],
      responses: [
        {
          id: 'annehmen',
          text: 'Vier mal 160 ist in Ordnung.',
          ru: 'Четыре раза по 160 — нормально.',
          effects: { respect: 8, anger: -6 },
          next: 'erste-rate',
        },
        {
          id: 'spaeter',
          text: 'Vier ist okay, wenn die erste erst im November kommt.',
          ru: 'Четыре нормально, если первый — только в ноябре.',
          effects: { respect: 4, patience: -6, guilt: 6 },
          next: 'erste-rate',
        },
        {
          id: 'posten-frage',
          text: 'Einverstanden. Und die neunzig Euro Verwaltungskosten — was ist das?',
          ru: 'Согласен. А девяносто евро расходов на управление — это что?',
          flag: 'posten',
          effects: { respect: 8, anger: 4, patience: -4 },
          next: 'posten',
        },
      ],
    },

    ablesung: {
      id: 'ablesung',
      messages: [
        {
          text: 'Der [Zählerstand](der-zaehlerstand) wurde geschätzt, das steht auch so drin.',
          ru: 'Показания счётчика были оценочные, это там и написано.',
        },
        {
          text: 'Ich stand im Januar zweimal vor Ihrer Tür. Einmal mit dem Ableser.',
          ru: 'В январе я дважды стоял у вашей двери. Один раз со специалистом.',
        },
        {
          text: 'Einen Zettel hab ich Ihnen auch in den Kasten gelegt.',
          ru: 'Записку я вам тоже в ящик положил.',
          when: { anger: ['>=', 16] },
        },
      ],
      responses: [
        {
          id: 'foto',
          text: 'Ich schick Ihnen jetzt ein Foto vom Zähler. Dann rechnen wir das zurück.',
          ru: 'Сейчас пришлю вам фото счётчика. И пересчитаем назад.',
          flag: 'abgelesen',
          effects: { respect: 12, patience: 6 },
          next: 'schaetzung',
        },
        {
          id: 'zu-hoch',
          text: 'Geschätzt heißt geschätzt. Zu meinen Lasten, wie ich sehe.',
          ru: 'Оценочные — значит оценочные. И, как я вижу, не в мою пользу.',
          effects: { anger: 10, respect: 6, patience: -10 },
          next: 'schaetzung',
        },
        {
          id: 'egal',
          text: 'Gut, dann lassen wir den Zähler. Was ist mit Raten?',
          ru: 'Ладно, оставим счётчик. Что насчёт рассрочки?',
          effects: { respect: 4, guilt: 8, anger: -6 },
          next: 'raten',
        },
      ],
    },

    posten: {
      id: 'posten',
      messages: [
        {
          text: 'Verwaltungskosten. Neunzig Euro im Jahr, für Post, Kontoführung, meine Zeit.',
          ru: 'Расходы на управление. Девяносто евро в год: почта, ведение счёта, моё время.',
        },
        {
          text: 'Das steht so in jeder Abrechnung, die ich je geschrieben hab.',
          ru: 'Так написано в каждом расчёте, который я когда-либо составлял.',
          when: { anger: ['>=', 14] },
        },
        {
          text: 'Wieso, was ist damit?',
          ru: 'А что с этим не так?',
          when: { anger: ['<=', 13] },
        },
      ],
      responses: [
        {
          id: 'streichen',
          text: 'Verwaltungskosten darf ein Mieter nicht tragen. Die gehören nicht auf die Abrechnung.',
          ru: 'Расходы на управление квартиросъёмщик оплачивать не должен. Им в расчёте не место.',
          effects: { respect: 12, anger: 8, patience: -4 },
          next: 'streichen',
        },
        {
          id: 'weich',
          text: 'Verstehe. Dann wird das schon so passen.',
          ru: 'Понимаю. Тогда, наверное, всё так и есть.',
          effects: { respect: -4, guilt: 12, anger: -8 },
          next: 'weich',
        },
        {
          id: 'hausmeister',
          text: 'Und der Hausmeister? Den hab ich zweimal gesehen. Insgesamt.',
          ru: 'А дворник? Я его видел два раза. Всего.',
          effects: { anger: 10, respect: 8, patience: -8 },
          next: 'frech',
        },
      ],
    },

    ordner: {
      id: 'ordner',
      messages: [
        { text: 'Gut. Dann bring ich den Ordner mit.', ru: 'Хорошо. Тогда я принесу папку.' },
        {
          text: 'Einscannen mach ich nicht, das hab ich in zwanzig Jahren nie gemacht.',
          ru: 'Сканировать я не буду, я этого за двадцать лет ни разу не делал.',
          when: { patience: ['<=', 46] },
        },
        {
          kind: 'card',
          card: {
            label: 'Im Ordner',
            rows: [
              { left: 'Gasrechnung Stadtwerke', right: '12 Seiten' },
              { left: 'Wasser, Abwasser' },
              { left: 'Hausmeister — Rechnungen' },
              { left: 'Müllgebührenbescheid' },
            ],
            total: { left: 'Verwaltungskosten', right: 'kein Beleg' },
          },
          ru: 'Что лежит в папке — и чего в ней нет',
        },
        {
          text: 'Ich sag Ihnen gleich: für einen Posten hab ich keinen Beleg. Das ist eine Pauschale.',
          ru: 'Сразу скажу: по одной статье у меня документа нет. Это фиксированная сумма.',
        },
      ],
      responses: [
        {
          id: 'nachfassen',
          text: 'Eine Pauschale ohne Beleg zahle ich nicht mit.',
          ru: 'Фиксированную сумму без подтверждения я оплачивать не буду.',
          effects: { respect: 12, anger: 6, patience: -4 },
          next: 'streichen',
        },
        {
          id: 'danke',
          text: 'Danke, dass Sie das gleich sagen. Dann bis Donnerstag.',
          ru: 'Спасибо, что сразу сказали. Тогда до четверга.',
          effects: { respect: 10, anger: -8, patience: 6 },
          next: 'frist',
        },
        {
          id: 'misstrauen',
          text: 'Und woher weiß ich, dass da alles drin ist?',
          ru: 'А откуда мне знать, что там всё?',
          effects: { anger: 14, respect: -6, patience: -8 },
          next: 'gereizt',
        },
      ],
    },

    frech: {
      id: 'frech',
      messages: [
        { text: 'Wie kommen Sie darauf?', ru: 'С чего вы это взяли?' },
        {
          text: 'Sie haben zwölf Monate Zeit, die Abrechnung zu [beanstanden](beanstanden). Aber mit Begründung.',
          ru: 'У вас есть двенадцать месяцев, чтобы оспорить расчёт. Но с обоснованием.',
        },
        {
          text: 'Und langsam klingt das hier nach Sport.',
          ru: 'И это уже потихоньку звучит как спорт.',
          when: { anger: ['>=', 24] },
        },
      ],
      responses: [
        {
          id: 'begruenden',
          text: 'Die Begründung ist einfach: bei mir wurde geschätzt, nicht abgelesen.',
          ru: 'Обоснование простое: у меня оценили, а не сняли показания.',
          effects: { respect: 12, patience: 4, anger: -4 },
          next: 'schaetzung',
        },
        {
          id: 'aufgeben',
          text: 'War ein Versuch 🙂 Machen wir es in Raten.',
          ru: 'Попытка не пытка 🙂 Давайте частями.',
          effects: { respect: 6, anger: -8, guilt: 6 },
          next: 'erste-rate',
        },
        {
          id: 'draufhauen',
          text: 'Meine Begründung ist, dass diese Abrechnung geschätzt, gerundet und erfunden ist.',
          ru: 'Моё обоснование — что этот расчёт оценён, округлён и выдуман.',
          effects: { anger: 26, respect: -10, patience: -14 },
          next: 'gereizt',
        },
      ],
    },

    streichen: {
      id: 'streichen',
      messages: [
        { text: 'Moment.', ru: 'Минуту.' },
        {
          text: 'Das mit den Verwaltungskosten muss ich nachlesen. Ich schau mir das nachher an.',
          ru: 'Насчёт этих расходов на управление мне надо перечитать. Посмотрю это позже.',
        },
        {
          text: 'Sie haben da wahrscheinlich recht, das gefällt mir nur nicht.',
          ru: 'Вы, скорее всего, правы, просто мне это не нравится.',
          when: { respect: ['>=', 66] },
        },
      ],
      responses: [
        {
          id: 'warten',
          text: 'Lassen Sie sich Zeit. Ich warte auf die korrigierte Abrechnung.',
          ru: 'Не торопитесь. Я подожду исправленный расчёт.',
          effects: { respect: 10, anger: -8, patience: 8 },
          next: 'nachgerechnet',
        },
        {
          id: 'frist',
          text: 'Bis Ende der Woche. Danach schreibt mir der Mieterverein.',
          ru: 'До конца недели. Потом вам напишет союз квартиросъёмщиков.',
          effects: { anger: 20, respect: 6, patience: -12 },
          next: 'gereizt',
        },
        {
          id: 'kompromiss',
          text: 'Streichen Sie die Neunzig und ich zahle den Rest diese Woche.',
          ru: 'Уберите девяносто — и остальное я заплачу на этой неделе.',
          effects: { respect: 8, anger: -4, patience: 4 },
          next: 'korrigiert',
        },
      ],
    },

    weich: {
      id: 'weich',
      messages: [
        { text: 'Sehen Sie, das ist mir auch lieber.', ru: 'Вот видите, мне так тоже приятнее.' },
        {
          text: 'Sagen Sie mir einfach, wie Sie zahlen wollen.',
          ru: 'Просто скажите, как вы хотите заплатить.',
        },
        {
          text: 'Und wenn es knapp ist, sagen Sie es. Ich bin kein Konzern.',
          ru: 'И если туго — скажите. Я не концерн.',
          when: { guilt: ['>=', 16] },
        },
      ],
      responses: [
        {
          id: 'raten',
          text: 'Dann doch lieber in vier Raten.',
          ru: 'Тогда всё-таки четырьмя платежами.',
          effects: { respect: 4, guilt: 6, anger: -4 },
          next: 'aufstellung',
        },
        {
          id: 'ganz',
          text: 'Ich überweise das morgen komplett.',
          ru: 'Переведу завтра всё целиком.',
          effects: { respect: 8, anger: -8, guilt: 8 },
          next: 'ueberwiesen',
        },
      ],
    },

    schaetzung: {
      id: 'schaetzung',
      messages: [
        {
          text: 'Ihr Stand passt tatsächlich nicht zu meiner Schätzung.',
          ru: 'Ваши показания действительно не сходятся с моей оценкой.',
        },
        {
          text: 'Ich kann Ihnen vierzig gutschreiben. Mehr gibt der Verteiler nicht her.',
          ru: 'Я могу зачесть вам сорок. Больше распределение не даёт.',
        },
        {
          text: 'Und im Januar klingle ich, bis jemand aufmacht.',
          ru: 'А в январе я буду звонить, пока кто-нибудь не откроет.',
          when: { anger: ['>=', 18] },
        },
      ],
      responses: [
        {
          id: 'annehmen',
          text: 'Vierzig sind vierzig. Einverstanden.',
          ru: 'Сорок — это сорок. Согласен.',
          flag: 'gutschrift',
          effects: { respect: 10, anger: -8 },
          next: 'korrektur',
        },
        {
          id: 'mehr',
          text: 'Vierzig für zwölf Monate geschätzt? Da fehlt eine Null.',
          ru: 'Сорок за двенадцать месяцев оценки? Тут не хватает нуля.',
          effects: { anger: 16, respect: 6, patience: -12 },
          next: 'gereizt',
        },
        {
          id: 'posten-frage',
          text: 'Gut. Und was sind die neunzig Euro Verwaltungskosten?',
          ru: 'Хорошо. А что за девяносто евро расходов на управление?',
          flag: 'posten',
          effects: { respect: 8, patience: 4 },
          next: 'streichen',
        },
      ],
    },

    aufstellung: {
      id: 'aufstellung',
      messages: [
        { text: 'Gut. Dann halten wir das fest.', ru: 'Хорошо. Тогда зафиксируем.' },
        {
          kind: 'card',
          card: {
            label: 'Ratenplan',
            rows: [
              { left: '01.10.', right: '160,00' },
              { left: '01.11.', right: '160,00' },
              { left: '01.12.', right: '160,00' },
              { left: '01.01.', right: '160,00' },
            ],
            total: { left: 'Gesamt', right: '640,00 €' },
          },
          ru: 'План платежей по частям',
        },
        {
          text: 'Zinsen nehm ich keine, dafür halten Sie die Termine.',
          ru: 'Проценты я не беру — а вы соблюдаете сроки.',
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Steht. Ich richte einen Dauerauftrag ein.',
          ru: 'Договорились. Настрою автоплатёж.',
          flag: 'raten',
          effects: { respect: 10, anger: -6 },
          next: 'geregelt',
        },
        {
          id: 'kurz',
          text: 'Passt.',
          ru: 'Ок.',
          flag: 'raten',
          effects: { respect: 4, patience: -4 },
          next: 'geregelt',
        },
      ],
    },

    'erste-rate': {
      id: 'erste-rate',
      messages: [
        { text: 'Ab wann? Oktober oder November?', ru: 'С какого месяца? С октября или с ноября?' },
        {
          text: 'Bei November wird die letzte Rate im Februar fällig, nur damit Sie es wissen.',
          ru: 'Если с ноября, последний платёж придётся на февраль — просто чтобы вы знали.',
        },
        {
          text: 'Und schreiben Sie es sich auf. Ich mahne nicht gern.',
          ru: 'И запишите себе. Я не люблю напоминать.',
          when: { patience: ['<=', 46] },
        },
      ],
      responses: [
        {
          id: 'oktober',
          text: 'Oktober. Dann ist es im Januar durch.',
          ru: 'С октября. Тогда в январе всё закончится.',
          effects: { respect: 8, anger: -4 },
          next: 'aufstellung',
        },
        {
          id: 'november',
          text: 'November wäre mir lieber, im Oktober ist die Steuer fällig.',
          ru: 'С ноября было бы удобнее, в октябре налог.',
          effects: { respect: 6, guilt: 6, patience: -4 },
          next: 'aufstellung',
        },
      ],
    },

    korrektur: {
      id: 'korrektur',
      messages: [
        { text: 'Dann halten wir das so fest.', ru: 'Тогда так и зафиксируем.' },
        {
          kind: 'card',
          card: {
            label: 'Korrektur zur Abrechnung 2024',
            rows: [
              { left: 'Heizung, geschätzter Stand', right: '− 40,00' },
              { left: 'Alle anderen Posten', right: 'unverändert' },
            ],
            total: { left: 'Neue Nachzahlung', right: '600,00 €' },
          },
          ru: 'Исправление к расчёту: минус 40 евро',
        },
        {
          text: 'Und im Januar les ich bei Ihnen selbst ab. Zweimal, wenn nötig.',
          ru: 'А в январе я сам сниму у вас показания. Дважды, если понадобится.',
          when: { respect: ['>=', 62] },
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Passt so. Ich überweise bis Freitag.',
          ru: 'Так подходит. Переведу до пятницы.',
          effects: { respect: 8, anger: -6 },
          next: 'korrigiert',
        },
        {
          id: 'trocken',
          text: 'Vierzig sind besser als nichts.',
          ru: 'Сорок лучше, чем ничего.',
          effects: { anger: 6, patience: -6 },
          next: 'korrigiert',
        },
      ],
    },

    frist: {
      id: 'frist',
      messages: [
        { text: 'Eine Frage noch.', ru: 'Ещё вопрос.' },
        {
          text: 'Zahlen Sie jetzt schon oder erst, wenn Sie die Belege gesehen haben?',
          ru: 'Вы заплатите уже сейчас или только после того, как посмотрите документы?',
        },
        {
          text: 'Beides ist in Ordnung, ich frag nur wegen meiner eigenen Rechnungen.',
          ru: 'И то и другое нормально, спрашиваю только из-за своих собственных счетов.',
          when: { respect: ['>=', 60] },
        },
      ],
      responses: [
        {
          id: 'erst-danach',
          text: 'Erst danach. Donnerstag wissen wir beide mehr.',
          ru: 'Только после. В четверг мы оба будем знать больше.',
          effects: { respect: 8, patience: 4 },
          next: 'belegtermin',
        },
        {
          id: 'jetzt',
          text: 'Ich überweise es vorher. Sie sind ja nicht die Bank.',
          ru: 'Переведу заранее. Вы же не банк.',
          effects: { respect: 10, anger: -8, guilt: 10 },
          next: 'ueberwiesen',
        },
        {
          id: 'gegenfrage',
          text: 'Erst danach. Und die neunzig Euro schauen Sie sich bis dahin an?',
          ru: 'Только после. И девяносто евро вы к тому времени посмотрите?',
          flag: 'posten',
          effects: { respect: 10, anger: 6, patience: -4 },
          next: 'streichen',
        },
      ],
    },

    gereizt: {
      id: 'gereizt',
      messages: [
        { text: 'Wissen Sie was?', ru: 'Знаете что?' },
        {
          text: 'Schreiben Sie mir das schriftlich. Dann antworte ich schriftlich.',
          ru: 'Напишите мне это письменно. Тогда я отвечу письменно.',
        },
        {
          text: 'Ich mach das seit achtzehn Jahren und hatte noch keinen Streit im Haus.',
          ru: 'Я занимаюсь этим восемнадцать лет и ни разу не ссорился с жильцами.',
          when: { anger: ['>=', 40] },
        },
      ],
      responses: [
        {
          id: 'zurueck',
          text: 'Warten Sie. So war das nicht gemeint.',
          ru: 'Погодите. Я не это имел в виду.',
          effects: { anger: -14, respect: 8, guilt: 14 },
          next: 'weich',
        },
        {
          id: 'formell',
          text: 'Gut. Dann schriftlich.',
          ru: 'Хорошо. Тогда письменно.',
          effects: { anger: 10, patience: -8 },
          next: 'schriftlich',
        },
      ],
    },

    nachgerechnet: {
      id: 'nachgerechnet',
      messages: [
        {
          kind: 'system',
          text: 'Zwei Stunden nichts. Dann drei Nachrichten hintereinander.',
          ru: 'Два часа ничего. Потом три сообщения подряд.',
        },
        {
          text: 'Die Verwaltungskosten fliegen raus, da hatten Sie recht.',
          ru: 'Расходы на управление вылетают, тут вы были правы.',
        },
        {
          text: 'Und die Hausmeister-Rechnung steht zweimal drin. Zweimal 240.',
          ru: 'А счёт за дворника попал в расчёт дважды. Дважды по 240.',
          when: { respect: ['>=', 68] },
        },
      ],
      responses: [
        {
          id: 'danke',
          text: 'Danke, dass Sie nachgerechnet haben.',
          ru: 'Спасибо, что пересчитали.',
          effects: { respect: 10, anger: -8 },
          next: 'entdeckt',
        },
        {
          id: 'sachlich',
          text: 'Dann schicken Sie mir die neue Abrechnung.',
          ru: 'Тогда пришлите мне новый расчёт.',
          effects: { respect: 4, patience: 4 },
          next: 'entdeckt',
        },
      ],
    },

    korrigiert: {
      id: 'korrigiert',
      flag: 'korrektur',
      messages: [
        { text: 'Einverstanden.', ru: 'Согласен.' },
        {
          text: 'Ich schick Ihnen morgen die korrigierte Abrechnung. Den Rest bitte bis Freitag.',
          ru: 'Завтра пришлю вам исправленный расчёт. Остальное, пожалуйста, до пятницы.',
        },
        {
          text: 'War trotzdem ein anstrengender Abend, ehrlich gesagt.',
          ru: 'Вечер всё равно вышел утомительный, честно говоря.',
          when: { anger: ['>=', 14] },
        },
      ],
      responses: [],
    },

    entdeckt: {
      id: 'entdeckt',
      flag: 'fehler',
      messages: [
        {
          text: 'Aus 640 werden 180. Das ist mir jetzt wirklich unangenehm.',
          ru: 'Из 640 получается 180. Мне сейчас правда неловко.',
        },
        {
          text: 'Die neue Abrechnung kommt morgen. Mit Entschuldigung.',
          ru: 'Новый расчёт придёт завтра. С извинениями.',
        },
      ],
      responses: [],
    },

    belegtermin: {
      id: 'belegtermin',
      flag: 'termin',
      messages: [
        {
          text: 'Donnerstag 17 Uhr, dann sehen Sie alles.',
          ru: 'Четверг, 17:00 — тогда всё и посмотрите.',
        },
        {
          text: 'Und die Frist läuft erst, wenn Sie [nachvollziehen](nachvollziehen) konnten, wofür Sie zahlen.',
          ru: 'А срок пойдёт только тогда, когда вы сможете понять, за что платите.',
        },
      ],
      responses: [],
    },

    geregelt: {
      id: 'geregelt',
      messages: [
        { kind: 'reaction', emoji: '👍' },
        {
          text: 'Dann sind wir durch. Guten Abend noch.',
          ru: 'Тогда закончили. Хорошего вечера.',
        },
      ],
      responses: [],
    },

    ueberwiesen: {
      id: 'ueberwiesen',
      messages: [
        { text: 'Danke, das ist unkompliziert.', ru: 'Спасибо, это по-простому.' },
        {
          text: 'Nächstes Jahr sag ich Ihnen vorher, wenn es teuer wird.',
          ru: 'В следующем году я скажу вам заранее, если будет дорого.',
          when: { guilt: ['>=', 20] },
        },
        { text: 'Guten Abend.', ru: 'Хорошего вечера.' },
      ],
      responses: [],
    },

    schriftlich: {
      id: 'schriftlich',
      messages: [
        {
          kind: 'system',
          text: 'Herr Adler schreibt nichts mehr. Zwei Tage später kommt ein Brief.',
          ru: 'Герр Адлер больше не пишет. Через два дня приходит письмо.',
        },
        {
          text: 'Sie hören von meinem Anwalt. Der ist übrigens mein Bruder.',
          ru: 'С вами свяжется мой адвокат. Он, между прочим, мой брат.',
          when: { anger: ['>=', 58] },
        },
        {
          text: 'Alles Weitere per Post.',
          ru: 'Всё остальное — по почте.',
        },
      ],
      responses: [],
    },
  },
}
