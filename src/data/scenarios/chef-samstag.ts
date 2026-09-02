import type { Scenario } from '../../types'

/**
 * Friday, 17:42. Sandra called in sick and the boss needs someone for
 * Saturday. He is not a villain: he gave you a Tuesday off last month without
 * asking why, and he writes himself instead of sending the group chat. He is
 * also asking you fourth, after three people already said no, and he will
 * admit that if you ask.
 *
 * The shift plan is a card, and it is the only thing in the thread that can
 * prove you have done three Saturdays in a row.
 */
export const chefSamstag: Scenario = {
  id: 'chef-samstag',
  title: 'Kannst du morgen einspringen?',
  context: 'Kurz vor Feierabend. Sandra ist krank.',
  situation:
    'Marco führt das Café und schreibt selbst, nicht in die Gruppe. Er hat dir letzten Monat einen Dienstag freigegeben, ohne zu fragen, warum. Er fragt dich auch als vierten — das steht nur nicht in der Nachricht.',
  situationRu:
    'Марко управляет кафе и пишет сам, не в общий чат. В прошлом месяце он без вопросов отпустил тебя во вторник. Он спрашивает тебя четвёртым — просто в сообщении этого не написано.',
  contextLine: 'WhatsApp',
  duration: '3 min',
  level: 'B1',
  icon: 'laptop',
  startTime: '17:42',
  character: { name: 'Marco', status: 'Chef' },
  experience: 'marco-hat-gefragt',
  meters: { anger: 12, respect: 55, patience: 45, guilt: 8 },

  objectives: [
    {
      id: 'nein',
      title: 'Nein sagen, ohne es zu verderben',
      hint: 'Morgen ist morgen. Montag arbeitet ihr weiter zusammen.',
      ru: 'Отказаться, не испортив отношения',
      cta: 'diesmal einfach nein?',
      contrast: 'gegenleistung',
    },
    {
      id: 'gegenleistung',
      title: 'Ja sagen, aber nicht umsonst',
      hint: 'Zuschlag, Freizeitausgleich, irgendwas.',
      ru: 'Согласиться, но не бесплатно',
      cta: 'diesmal nicht umsonst?',
      contrast: 'nein',
    },
    {
      id: 'abschieben',
      title: 'Dass er jemand anderen fragt',
      hint: 'Es gibt einen Dienstplan. Da stehen auch andere Namen drin.',
      ru: 'Чтобы он попросил кого-то другого',
      cta: 'diesmal soll er Kevin fragen?',
      contrast: 'ausrede',
    },
    {
      id: 'ausrede',
      title: 'Ihn überzeugen, dass du verreist bist',
      hint: 'Bist du nicht. Am Samstag ist Wäsche und Sofa.',
      ru: 'Убедить его, что ты уезжаешь',
      cta: 'diesmal verreist?',
      contrast: 'abschieben',
    },
  ],

  outcomes: [
    {
      id: 'dienstplan',
      // Only the reader who asked for the plan *and* stayed friendly gets him
      // to look at it himself.
      requiresFlags: ['plan', 'anderer'],
      requires: { respect: ['>=', 70], anger: ['<=', 20] },
      achieved: [],
      secret: true,
      quoteLabel: 'Das hat ihn in den Plan schauen lassen',
      reveals: ['marco-fragt-dich-zuletzt'],
      name: 'Der Dienstplan',
      nameRu: 'График смен',
      title: 'Marco rechnet nach: drei Samstage bei dir, keiner bei Kevin.',
      titleRu: 'Марко пересчитывает: три субботы у тебя, ни одной у Кевина.',
      consequences: [
        { de: 'Kevin macht morgen. Zum ersten Mal seit Mai.', ru: 'Завтра выходит Кевин. Впервые с мая.' },
        {
          de: 'Der Plan wird ab nächstem Monat vier Wochen vorher geschrieben.',
          ru: 'График теперь составляют за четыре недели.',
        },
        { de: 'Dein Samstag bleibt dein Samstag.', ru: 'Твоя суббота остаётся твоей.' },
      ],
    },
    {
      id: 'anderer',
      requiresFlags: ['anderer'],
      achieved: ['abschieben'],
      quoteLabel: 'Danach hat er weitergefragt',
      name: 'Er fragt weiter',
      nameRu: 'Он спрашивает дальше',
      title: 'Marco sucht jemand anderen. Gefunden hat er noch niemanden.',
      titleRu: 'Марко ищет кого-то другого. Пока никого не нашёл.',
      consequences: [
        { de: 'Dein Samstag ist frei.', ru: 'Твоя суббота свободна.' },
        { de: 'Um 21 Uhr schreibt er nochmal in die Gruppe.', ru: 'В 21:00 он снова пишет в общий чат.' },
        { de: 'Montag ist es kein Thema mehr.', ru: 'В понедельник это уже не тема.' },
      ],
    },
    {
      id: 'hamburg',
      requiresFlags: ['luege'],
      forbidsFlags: ['gestanden'],
      achieved: ['ausrede'],
      quoteLabel: 'Damit war die Geschichte gebaut',
      name: 'Das Wochenende in Hamburg',
      nameRu: 'Выходные в Гамбурге',
      title: 'Er glaubt dir. Du liegst morgen um zehn noch im Bett.',
      titleRu: 'Он тебе верит. Завтра в десять ты всё ещё в постели.',
      consequences: [
        { de: 'Der Samstag ist gerettet.', ru: 'Суббота спасена.' },
        { de: 'Am Montag fragt er, wie Hamburg war.', ru: 'В понедельник он спросит, как Гамбург.' },
        {
          de: 'Und Kevin war letztes Wochenende wirklich dort.',
          ru: 'А Кевин на прошлых выходных правда там был.',
        },
      ],
    },
    {
      id: 'zuschlag',
      requiresFlags: ['deal'],
      achieved: ['gegenleistung'],
      quoteLabel: 'Da war es ausgehandelt',
      name: 'Nicht umsonst',
      nameRu: 'Не бесплатно',
      title: 'Du machst es — aber nicht für ein Danke.',
      titleRu: 'Ты выходишь — но не за «спасибо».',
      consequences: [
        { de: 'Fünfundzwanzig Prozent Zuschlag auf die Stunden.', ru: 'Надбавка двадцать пять процентов к часам.' },
        { de: 'Und es steht schriftlich, nicht nur im Kopf.', ru: 'И это записано, а не только на словах.' },
        {
          de: 'Und er fragt dich das nächste Mal wieder zuerst.',
          ru: 'И в следующий раз он снова спросит тебя первым.',
        },
      ],
    },
    {
      id: 'nein-sauber',
      requiresFlags: ['nein'],
      requires: { anger: ['<=', 40] },
      achieved: ['nein'],
      quoteLabel: 'Das war das Nein',
      name: 'Ein sauberes Nein',
      nameRu: 'Чистое «нет»',
      title: 'Du hast abgelehnt und es ist nichts kaputtgegangen.',
      titleRu: 'Ты отказался, и ничего не сломалось.',
      consequences: [
        { de: 'Kein Grund genannt, keiner verlangt.', ru: 'Причину ты не назвал, её и не потребовали.' },
        { de: 'Montag begrüßt er dich wie immer.', ru: 'В понедельник он здоровается как обычно.' },
        { de: 'Sandra ist übrigens wirklich krank.', ru: 'Сандра, между прочим, правда болеет.' },
      ],
    },
    {
      id: 'kalt',
      requires: { anger: ['>=', 55] },
      achieved: [],
      quoteLabel: 'Ab da war der Ton anders',
      name: 'Alles klar.',
      nameRu: '«Ясно.»',
      title: 'Zwei Wörter, ein Punkt. Mehr schreibt er nicht.',
      titleRu: 'Два слова и точка. Больше он ничего не пишет.',
      consequences: [
        { de: 'Der Samstag ist frei.', ru: 'Суббота свободна.' },
        { de: 'Der Dienstplan für Dezember auch.', ru: 'График на декабрь тоже.' },
        { de: 'Montag ist er sehr höflich.', ru: 'В понедельник он очень вежлив.' },
      ],
    },
    {
      id: 'umsonst',
      achieved: [],
      quoteLabel: 'Damit war es abgemacht',
      name: 'Samstag, neun Uhr',
      nameRu: 'Суббота, девять утра',
      title: 'Du machst es. Umsonst, freiwillig, ohne Gegenfrage.',
      titleRu: 'Ты выходишь. Бесплатно, добровольно, без встречных вопросов.',
      consequences: [
        { de: 'Neun statt zehn, weil die Lieferung kommt.', ru: 'В девять, а не в десять — привезут поставку.' },
        { de: 'Der Zuschlag steht in keiner Nachricht.', ru: 'Про надбавку нет ни в одном сообщении.' },
        {
          de: 'Beim nächsten Ausfall fragt er wieder dich zuerst.',
          ru: 'При следующем прогуле он снова спросит тебя первым.',
        },
      ],
    },
  ],

  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        { text: 'Hey, kurze Frage 🙈', ru: 'Привет, короткий вопрос 🙈' },
        {
          text: 'Sandra hat sich krankgemeldet. Kannst du morgen [einspringen](einspringen)? 10 bis 18.',
          ru: 'Сандра на больничном. Можешь завтра выйти вместо неё? С 10 до 18.',
        },
        {
          text: 'Ich weiß, das ist [kurzfristig](kurzfristig).',
          ru: 'Я знаю, что это в последний момент.',
        },
      ],
      responses: [
        {
          id: 'ja-sofort',
          text: 'Ja, mach ich.',
          ru: 'Да, выйду.',
          effects: { respect: 8, anger: -8, guilt: 8 },
          next: 'gerettet',
        },
        {
          id: 'plan',
          text: 'Schick mir mal den Dienstplan, ich schau kurz.',
          ru: 'Пришли мне график, я быстро посмотрю.',
          flag: 'plan',
          effects: { respect: 10, patience: 4 },
          next: 'dienstplan',
        },
        {
          id: 'nein-direkt',
          text: 'Morgen wird bei mir schwierig.',
          ru: 'Завтра у меня будет сложно.',
          effects: { anger: 6, respect: 6, patience: -6 },
          next: 'druck',
        },
        {
          id: 'warum-ich',
          text: 'Warum fragst du eigentlich mich?',
          ru: 'А почему ты вообще спрашиваешь меня?',
          effects: { anger: 8, respect: 8, patience: -8 },
          next: 'druck',
        },
      ],
    },

    gerettet: {
      id: 'gerettet',
      messages: [
        { text: 'Du rettest mir das Wochenende.', ru: 'Ты спасаешь мне выходные.' },
        {
          text: 'Ich schreib dich in den Plan. [Kein Problem](kein-problem) also?',
          ru: 'Вписываю тебя в график. Значит, без проблем?',
        },
        {
          text: 'Ehrlich, ich hatte schon mit einem Nein gerechnet.',
          ru: 'Честно, я уже рассчитывал на «нет».',
          when: { guilt: ['>=', 14] },
        },
      ],
      responses: [
        {
          id: 'nichts',
          text: 'Passt. Bis morgen um zehn.',
          ru: 'Нормально. До завтра, к десяти.',
          effects: { respect: 6, anger: -6, guilt: 6 },
          next: 'uhrzeit',
        },
        {
          id: 'zuschlag',
          text: 'Kein Problem — kriege ich den Samstagszuschlag?',
          ru: 'Без проблем — субботнюю надбавку получу?',
          effects: { respect: 10, patience: 4 },
          next: 'verhandeln',
        },
        {
          id: 'ausgleich',
          text: 'Ich mach es, wenn ich nächsten Freitag frei hab.',
          ru: 'Выйду, если в следующую пятницу буду свободен.',
          effects: { respect: 10, anger: 4, patience: -4 },
          next: 'verhandeln',
        },
      ],
    },

    uhrzeit: {
      id: 'uhrzeit',
      messages: [
        { text: 'Super. Eine Sache noch:', ru: 'Отлично. Ещё одно:' },
        {
          text: 'Kannst du schon um neun da sein? Die Lieferung kommt um 9:15.',
          ru: 'Можешь быть уже к девяти? Поставку привезут в 9:15.',
        },
        {
          text: 'Wenn nicht, stell ich den Wecker und komm selbst kurz vorbei.',
          ru: 'Если нет, поставлю будильник и заеду сам на пару минут.',
          when: { respect: ['>=', 60] },
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Neun geht. Sag mir nur, wo der Schlüssel ist.',
          ru: 'В девять смогу. Только скажи, где ключ.',
          effects: { respect: 8, anger: -6, guilt: 4 },
          next: 'einweisung',
        },
        {
          id: 'dann-zuschlag',
          text: 'Neun statt zehn? Dann reden wir über den Zuschlag.',
          ru: 'В девять вместо десяти? Тогда давай поговорим о надбавке.',
          effects: { respect: 10, anger: 6, patience: -4 },
          next: 'verhandeln',
        },
        {
          id: 'genervt',
          text: 'Erst zehn, jetzt neun. Kommt um elf noch die Inventur?',
          ru: 'Сначала десять, теперь девять. В одиннадцать ещё инвентаризация?',
          effects: { anger: 22, respect: 6, patience: -12 },
          next: 'gereizt',
        },
      ],
    },

    einweisung: {
      id: 'einweisung',
      messages: [
        {
          text: 'Schlüssel liegt bei Yusuf im Kiosk, der hat ab acht offen.',
          ru: 'Ключ у Юсуфа в киоске, он открывается с восьми.',
        },
        {
          text: 'Kasse machst du wie immer, die Lieferung einfach hinten stapeln.',
          ru: 'Касса как всегда, поставку просто складывай в подсобке.',
        },
        {
          text: 'Und danke. Wirklich.',
          ru: 'И спасибо. Правда.',
          when: { guilt: ['>=', 18] },
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Alles klar, kriegen wir hin.',
          ru: 'Ясно, справимся.',
          effects: { respect: 6, anger: -4 },
          next: 'samstag-acht',
        },
        {
          id: 'knapp',
          text: 'Ok.',
          ru: 'Ок.',
          effects: { patience: -4, anger: 4 },
          next: 'samstag-acht',
        },
      ],
    },

    dienstplan: {
      id: 'dienstplan',
      messages: [
        { text: 'Klar, hier.', ru: 'Конечно, вот.' },
        {
          kind: 'card',
          card: {
            label: 'Dienstplan · Samstage',
            rows: [
              { left: '01.11.', right: 'du' },
              { left: '08.11.', right: 'du' },
              { left: '15.11.', right: 'du' },
              { left: '22.11.', right: 'Sandra — krank' },
              { left: 'Kevin', right: '—' },
            ],
            total: { left: 'Morgen', right: 'offen' },
          },
          ru: 'График смен по субботам',
        },
        {
          text: 'Den [Dienstplan](der-dienstplan) hab ich ehrlich gesagt nicht mehr angeschaut, seit ich ihn geschrieben hab.',
          ru: 'В график я, честно говоря, не смотрел с тех пор, как его составил.',
        },
      ],
      responses: [
        {
          id: 'kevin',
          text: 'Bei Kevin steht bei den Samstagen ein Strich.',
          ru: 'У Кевина в субботах стоит прочерк.',
          effects: { respect: 12, patience: 4 },
          next: 'zugegeben',
        },
        {
          id: 'dritter',
          text: 'Das wäre mein vierter Samstag am Stück.',
          ru: 'Это была бы моя четвёртая суббота подряд.',
          effects: { respect: 10, anger: 6, patience: -4 },
          next: 'zugegeben',
        },
        {
          id: 'ja-trotzdem',
          text: 'Steht ja alles da. Ich mach es, aber nicht umsonst.',
          ru: 'Там же всё видно. Выйду, но не бесплатно.',
          effects: { respect: 10, anger: 4 },
          next: 'verhandeln',
        },
      ],
    },

    druck: {
      id: 'druck',
      messages: [
        {
          text: 'Ich frag dich, weil du der Einzige bist, der allein mit der Kasse klarkommt.',
          ru: 'Спрашиваю тебя, потому что ты единственный, кто один справляется с кассой.',
        },
        {
          text: 'Und weil ich dir letzten Monat den Dienstag freigegeben hab, ohne zu fragen, warum.',
          ru: 'И потому что в прошлом месяце я отпустил тебя во вторник, не спрашивая зачем.',
        },
        {
          text: 'Das ist kein Vorwurf. Nur damit du weißt, wo ich stehe.',
          ru: 'Это не упрёк. Просто чтобы ты понимал, где я.',
          when: { anger: ['>=', 18] },
        },
      ],
      responses: [
        {
          id: 'verreist',
          text: 'Ich bin morgen nicht in der Stadt, sonst gern.',
          ru: 'Меня завтра нет в городе, иначе бы с радостью.',
          flag: 'luege',
          effects: { respect: 6, anger: -4, guilt: 12 },
          next: 'luege',
        },
        {
          id: 'nein-klar',
          text: 'Ich versteh das. Morgen geht trotzdem nicht.',
          ru: 'Я понимаю. Завтра всё равно не смогу.',
          effects: { respect: 10, anger: 6, patience: -4 },
          next: 'nein-node',
        },
        {
          id: 'wen-noch',
          text: 'Wen hast du vor mir gefragt?',
          ru: 'Кого ты спрашивал до меня?',
          effects: { respect: 8, anger: 8, patience: -8 },
          next: 'zugegeben',
        },
      ],
    },

    luege: {
      id: 'luege',
      messages: [
        { text: 'Ach schade.', ru: 'Ах, жаль.' },
        {
          text: 'Wo fährst du denn hin?',
          ru: 'А куда ты едешь?',
        },
        {
          text: 'Frag ich nur, weil ich Sonntag auch noch jemanden bräuchte.',
          ru: 'Спрашиваю только потому, что на воскресенье мне тоже кто-то нужен.',
          when: { patience: ['<=', 42] },
        },
      ],
      responses: [
        {
          id: 'hamburg',
          text: 'Hamburg, zu meiner Schwester. Der Zug ist schon gebucht.',
          ru: 'В Гамбург, к сестре. Билет уже куплен.',
          effects: { respect: 6, anger: -6, guilt: 8 },
          next: 'nachfrage',
        },
        {
          id: 'vage',
          text: 'Familie. Ist schon länger geplant.',
          ru: 'Семья. Уже давно запланировано.',
          effects: { respect: 4, patience: -4, guilt: 6 },
          next: 'nachfrage',
        },
        {
          id: 'einknicken',
          text: 'Ehrlich? Ich bin da. Ich hab nur keine Lust.',
          ru: 'Честно? Я здесь. Просто не хочу.',
          flag: 'gestanden',
          effects: { anger: 24, respect: 8, patience: -14, guilt: -8 },
          next: 'gereizt',
        },
      ],
    },

    nachfrage: {
      id: 'nachfrage',
      messages: [
        { text: 'Und wann bist du zurück?', ru: 'А когда вернёшься?' },
        {
          text: 'Wenn du Sonntagabend da bist, wäre Montagfrüh super.',
          ru: 'Если в воскресенье вечером будешь на месте, было бы отлично в понедельник с утра.',
        },
        {
          text: 'Aber [sag Bescheid](bescheid-sagen), ich will dich nicht löchern.',
          ru: 'Но дай знать, не хочу тебя доставать.',
          when: { respect: ['>=', 60] },
        },
      ],
      responses: [
        {
          id: 'montag',
          text: 'Montagfrüh bin ich da, das geht klar.',
          ru: 'В понедельник с утра буду, это точно.',
          effects: { respect: 10, anger: -8, guilt: 6 },
          next: 'hamburg-ende',
        },
        {
          id: 'offen',
          text: 'Sonntag spät. Ich sag dir Bescheid, wenn ich im Zug sitze.',
          ru: 'Поздно в воскресенье. Напишу, когда буду в поезде.',
          effects: { respect: 6, patience: -4, guilt: 10 },
          next: 'hamburg-ende',
        },
      ],
    },

    zugegeben: {
      id: 'zugegeben',
      messages: [
        { text: 'Ehrlich?', ru: 'Честно?' },
        {
          text: 'Du bist der vierte, den ich frage. Kevin, Timo und Lena haben schon abgesagt.',
          ru: 'Ты четвёртый, кого я спрашиваю. Кевин, Тимо и Лена уже отказались.',
        },
        {
          text: 'Und jetzt sitz ich hier und überlege, wer mir noch übrig bleibt.',
          ru: 'И теперь я тут сижу и думаю, кто у меня ещё остался.',
          when: { respect: ['>=', 66] },
        },
      ],
      responses: [
        {
          id: 'ruhig',
          text: 'Dann schau nochmal in den Plan. Bei mir stehen drei Samstage, bei Kevin keiner.',
          ru: 'Тогда посмотри ещё раз в график. У меня три субботы, у Кевина — ни одной.',
          effects: { respect: 12, anger: -8, patience: 8 },
          next: 'warten',
        },
        {
          id: 'ja-aber',
          text: 'Vier Absagen an einem Freitag. Ich mach es, aber wir reden über die Bezahlung.',
          ru: 'Четыре отказа в одну пятницу. Я выйду, но поговорим об оплате.',
          effects: { respect: 10, anger: 4 },
          next: 'verhandeln',
        },
        {
          id: 'nein',
          text: 'Dann bin ich die vierte Absage. Tut mir leid.',
          ru: 'Тогда я четвёртый отказ. Извини.',
          effects: { respect: 8, anger: 10, patience: -6 },
          next: 'nein-node',
        },
      ],
    },

    verhandeln: {
      id: 'verhandeln',
      messages: [
        {
          text: '[Zuschlag](der-zuschlag) kann ich machen, 25 Prozent.',
          ru: 'Надбавку могу дать, двадцать пять процентов.',
        },
        {
          text: 'Oder [Freizeitausgleich](freizeitausgleich), dann nimm dir nächste Woche einen Tag.',
          ru: 'Или отгул — тогда возьми день на следующей неделе.',
        },
        {
          text: 'Beides wird knapp, ehrlich gesagt.',
          ru: 'И то и другое вместе — впритык, честно говоря.',
          when: { anger: ['>=', 20] },
        },
      ],
      responses: [
        {
          id: 'beides',
          text: 'Zuschlag und den Freitag frei. Dann bin ich morgen um neun da.',
          ru: 'Надбавку и свободную пятницу. Тогда завтра в девять я на месте.',
          effects: { respect: 10, anger: 6, patience: -4 },
          next: 'deal',
        },
        {
          id: 'eins',
          text: 'Ich nehm den Zuschlag, der freie Freitag bringt mir nichts.',
          ru: 'Я возьму надбавку, свободная пятница мне ничего не даёт.',
          effects: { respect: 10, anger: -6 },
          next: 'deal',
        },
        {
          id: 'doch-nein',
          text: 'Dann lass es. Ich sag lieber ehrlich nein.',
          ru: 'Тогда не надо. Лучше я честно откажусь.',
          effects: { respect: 8, anger: 10, patience: -6 },
          next: 'nein-node',
        },
      ],
    },

    'nein-node': {
      id: 'nein-node',
      messages: [
        { text: 'Okay.', ru: 'Ладно.' },
        {
          text: 'Und Sonntag? Vier Stunden, mittags, dann hab ich zumindest die Spitze abgedeckt.',
          ru: 'А в воскресенье? Четыре часа, в обед — тогда я хотя бы пик закрою.',
        },
        {
          text: 'Danach frag ich nicht mehr, versprochen.',
          ru: 'Больше просить не буду, обещаю.',
          when: { anger: ['>=', 24] },
        },
      ],
      responses: [
        {
          id: 'auch-nein',
          text: 'Sonntag auch nicht. Aber frag mich nächste Woche wieder.',
          ru: 'В воскресенье тоже нет. Но спроси меня снова на следующей неделе.',
          flag: 'nein',
          effects: { respect: 10, anger: -6, patience: 6 },
          next: 'kevin-anrufen',
        },
        {
          id: 'sonntag-deal',
          text: 'Sonntag vier Stunden gehen. Mit Zuschlag.',
          ru: 'Воскресенье, четыре часа — можно. С надбавкой.',
          effects: { respect: 10, anger: -4 },
          next: 'deal',
        },
        {
          id: 'kurz',
          text: 'Nein heißt nein, Marco.',
          ru: 'Нет значит нет, Марко.',
          flag: 'nein',
          effects: { anger: 16, respect: 4, patience: -10 },
          next: 'kevin-anrufen',
        },
      ],
    },

    'kevin-anrufen': {
      id: 'kevin-anrufen',
      messages: [
        { text: 'Eine Sache noch.', ru: 'Ещё одно.' },
        {
          text: 'Kevin geht bei mir nicht ans Telefon. Bei dir vielleicht schon.',
          ru: 'Кевин мне не берёт трубку. Тебе, может, возьмёт.',
        },
        {
          text: 'Du musst nicht. Ich frag nur.',
          ru: 'Ты не обязан. Я просто спрашиваю.',
          when: { respect: ['>=', 64] },
        },
      ],
      responses: [
        {
          id: 'anrufen',
          text: 'Ich schreib ihm. Versprechen kann ich nichts.',
          ru: 'Напишу ему. Обещать ничего не могу.',
          effects: { respect: 12, anger: -8 },
          next: 'anderer-macht',
        },
        {
          id: 'nein-danke',
          text: 'Lieber nicht. Aber viel Erfolg.',
          ru: 'Лучше нет. Но удачи.',
          effects: { respect: 4, anger: 6, patience: -4 },
          next: 'nein-ende',
        },
        {
          id: 'nicht-mein-job',
          text: 'Marco. Das ist dein Job.',
          ru: 'Марко. Это твоя работа.',
          effects: { anger: 16, respect: -4, patience: -10 },
          next: 'nein-ende',
        },
      ],
    },

    gereizt: {
      id: 'gereizt',
      messages: [
        { text: 'Weißt du was?', ru: 'Знаешь что?' },
        {
          text: 'Langsam [reicht es mir](mir-reichts) mit diesem Freitagabend.',
          ru: 'Меня этот вечер пятницы уже понемногу достал.',
        },
        {
          text: 'Ich hab vier Leute gefragt und schreib jetzt seit einer Stunde nur Entschuldigungen.',
          ru: 'Я спросил четверых и уже час пишу одни извинения.',
          when: { anger: ['>=', 32] },
        },
      ],
      responses: [
        {
          id: 'zurueck',
          text: 'Sorry. Das war unnötig von mir.',
          ru: 'Извини. Это было лишнее с моей стороны.',
          effects: { anger: -16, respect: 10, guilt: 16 },
          next: 'nein-node',
        },
        {
          id: 'patzig',
          text: 'Dann schreib halt in die Gruppe wie alle anderen Chefs.',
          ru: 'Ну так напиши в общий чат, как все остальные начальники.',
          effects: { anger: 20, respect: -8, patience: -10 },
          next: 'kalt-ende',
        },
      ],
    },

    warten: {
      id: 'warten',
      messages: [
        {
          kind: 'system',
          text: 'Marco schreibt nichts. Zwanzig Minuten später ist er wieder da.',
          ru: 'Марко не пишет. Через двадцать минут он снова здесь.',
        },
        {
          text: 'Du hast recht. Drei Samstage, und bei Kevin steht nichts.',
          ru: 'Ты прав. Три субботы, а у Кевина ничего не стоит.',
        },
        {
          text: 'Das ist mir peinlich, ehrlich gesagt.',
          ru: 'Мне, честно говоря, неловко.',
          when: { respect: ['>=', 70] },
        },
      ],
      responses: [
        {
          id: 'freundlich',
          text: 'Passiert. Ruf ihn an, der schläft noch nicht.',
          ru: 'Бывает. Позвони ему, он ещё не спит.',
          effects: { respect: 10, anger: -8 },
          next: 'anderer-macht',
        },
        {
          id: 'sachlich',
          text: 'Dann schreib den Plan nächsten Monat früher.',
          ru: 'Тогда составляй график на следующий месяц раньше.',
          effects: { respect: 6, anger: 4, patience: -4 },
          next: 'anderer-macht',
        },
      ],
    },

    deal: {
      id: 'deal',
      messages: [
        { text: 'Machen wir so.', ru: 'Так и сделаем.' },
        {
          text: 'Ich schreib es gleich in den Plan, damit es nicht untergeht.',
          ru: 'Сразу впишу в график, чтобы не потерялось.',
        },
        {
          text: 'Und ich frag dich das nächste Mal wieder als ersten. Ist das ein Lob oder eine Drohung?',
          ru: 'И в следующий раз опять спрошу тебя первым. Это похвала или угроза?',
          when: { respect: ['>=', 68] },
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Beides. Bis morgen.',
          ru: 'И то и другое. До завтра.',
          flag: 'deal',
          effects: { respect: 8, anger: -6 },
          next: 'abgemacht',
        },
        {
          id: 'schriftlich',
          text: 'Schreib den Zuschlag bitte kurz hier rein, dann hab ich es.',
          ru: 'Напиши, пожалуйста, про надбавку здесь коротко, чтобы у меня было.',
          flag: 'deal',
          effects: { respect: 10, anger: 6, patience: -4 },
          next: 'abgemacht',
        },
      ],
    },

    'anderer-macht': {
      id: 'anderer-macht',
      flag: 'anderer',
      messages: [
        {
          text: 'Wenn Kevin morgen kann, ist alles gut. Und Sandra soll sich auskurieren.',
          ru: 'Если Кевин сможет завтра — всё в порядке. А Сандра пусть выздоравливает.',
        },
        {
          text: 'Schönes Wochenende. Wirklich.',
          ru: 'Хороших выходных. Правда.',
        },
      ],
      responses: [],
    },

    'samstag-acht': {
      id: 'samstag-acht',
      messages: [
        { kind: 'reaction', emoji: '🙏' },
        {
          text: 'Dann bis morgen um neun. Ich bring Franzbrötchen mit.',
          ru: 'Тогда до завтра, к девяти. Привезу булочек.',
        },
      ],
      responses: [],
    },

    abgemacht: {
      id: 'abgemacht',
      messages: [
        {
          text: 'Steht mit Zuschlag im Plan. [Abgemacht](abgemacht).',
          ru: 'В графике с надбавкой. Договорились.',
        },
        {
          text: 'Steht jetzt schriftlich, du Verhandlungsprofi 🙂',
          ru: 'Теперь есть письменно, ты профессиональный переговорщик 🙂',
          when: { respect: ['>=', 66] },
        },
      ],
      responses: [],
    },

    'nein-ende': {
      id: 'nein-ende',
      messages: [
        { text: 'Okay. Dann muss ich weiter telefonieren.', ru: 'Ладно. Тогда придётся звонить дальше.' },
        {
          text: 'Ist in Ordnung. Bis Montag.',
          ru: 'Ничего страшного. До понедельника.',
          when: { anger: ['<=', 30] },
        },
        {
          text: 'Bis Montag.',
          ru: 'До понедельника.',
          when: { anger: ['>=', 31] },
        },
      ],
      responses: [],
    },

    'hamburg-ende': {
      id: 'hamburg-ende',
      messages: [
        { text: 'Alles gut, fahr mal weg. Grüß deine Schwester.', ru: 'Всё нормально, съезди отдохни. Передай привет сестре.' },
        {
          kind: 'system',
          text: 'Am Montag fragt er, wie Hamburg war.',
          ru: 'В понедельник он спросит, как Гамбург.',
        },
      ],
      responses: [],
    },

    'kalt-ende': {
      id: 'kalt-ende',
      messages: [
        { text: 'Alles klar.', ru: 'Ясно.' },
        {
          kind: 'system',
          text: 'Marco war um 18:02 online. Danach nicht mehr.',
          ru: 'Марко был в сети в 18:02. Больше — нет.',
        },
      ],
      responses: [],
    },
  },
}
