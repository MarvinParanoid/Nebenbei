import type { Scenario } from '../../types'

/**
 * Freitagabend. Lisa asks whether you're joining for drinks.
 * Branches on "yes / maybe / not today" and converges again at the end.
 */
export const lisaDrinks: Scenario = {
  id: 'lisa-drinks',
  title: 'Kurz was trinken?',
  context: 'Lisa fragt, ob du heute Abend mitkommst.',
  contextLine: 'Freitagabend · Freunde treffen',
  duration: '2 min',
  level: 'B1',
  hue: 268,
  character: { name: 'Lisa', avatar: '🌿', status: 'Freitag, 18:12' },
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        { text: 'Hey 😊', ru: 'Привет 😊' },
        {
          text: 'Bist du heute Abend [dabei](dabei-sein)? Wir wollten [so gegen 8](so-gegen-acht) noch was trinken gehen.',
          ru: 'Ты сегодня вечером с нами? Мы хотели где-то около восьми пойти выпить.',
        },
      ],
      responses: [
        {
          id: 'ja',
          text: 'Klar, bin dabei! Wo trefft ihr euch?',
          ru: 'Конечно, я с вами! Где встречаетесь?',
          next: 'ort',
        },
        {
          id: 'nein',
          text: "Heute schaff ich's leider nicht. Morgen vielleicht?",
          ru: 'Сегодня, к сожалению, не получится. Может, завтра?',
          next: 'nein',
        },
        {
          id: 'wer',
          text: 'Kommt drauf an 😄 Wer kommt denn alles?',
          ru: 'Смотря как 😄 А кто вообще идёт?',
          next: 'wer',
        },
      ],
    },

    wer: {
      id: 'wer',
      messages: [
        {
          text: '[Keine Ahnung](keine-ahnung), ob Tim kommt. Ich, Jonas und Mira auf jeden Fall.',
          ru: 'Без понятия, придёт ли Тим. Я, Йонас и Мира — точно.',
        },
        {
          text: 'Nichts Großes, wir wollen einfach [ein bisschen](ein-bisschen) quatschen.',
          ru: 'Ничего особенного, просто хотим немного поболтать.',
        },
      ],
      responses: [
        {
          id: 'gut',
          text: 'Klingt gut, dann bin ich dabei.',
          ru: 'Звучит хорошо, тогда я с вами.',
          next: 'ort',
        },
        {
          id: 'mira',
          text: 'Ah, Mira ist auch da? Dann komm ich 🙂',
          ru: 'А, Мира тоже там? Тогда приду 🙂',
          next: 'ort',
        },
        {
          id: 'raus',
          text: 'Ich glaub, ich lass es heute. Bin echt müde.',
          ru: 'Думаю, сегодня пропущу. Совсем нет сил.',
          next: 'nein',
        },
      ],
    },

    ort: {
      id: 'ort',
      messages: [
        { text: 'Super 🙌', ru: 'Супер 🙌' },
        {
          text: "Wir sind im Kaverne, das kleine Café in der Wagnerstraße. Kennst du's?",
          ru: 'Мы в «Kaverne», маленькой кофейне на Вагнерштрассе. Знаешь её?',
        },
      ],
      responses: [
        {
          id: 'nie',
          text: "Noch nie gehört, aber ich find's schon.",
          ru: 'Первый раз слышу, но найду.',
          next: 'hinkommen',
        },
        {
          id: 'kenne',
          text: 'Ja klar, war letzte Woche da. Ist echt nett.',
          ru: 'Да, знаю это место, был там на прошлой неделе. Правда славное.',
          next: 'kennt',
        },
        {
          id: 'standort',
          text: 'Schick mir am besten den Standort, ich bin schlecht mit Straßennamen 😅',
          ru: 'Лучше пришли мне геолокацию, я плохо запоминаю названия улиц 😅',
          next: 'hinkommen',
        },
      ],
    },

    kennt: {
      id: 'kennt',
      messages: [
        {
          text: 'Dann weißt du ja, wie gut die Limo da ist ☺️',
          ru: 'Тогда ты знаешь, какой там хороший лимонад ☺️',
        },
        {
          text: 'Ich reserviere was draußen, ist ja noch warm. Oder lieber drinnen?',
          ru: 'Я забронирую что-нибудь на улице, ещё тепло. Или лучше внутри?',
        },
      ],
      responses: [
        { id: 'draussen', text: 'Draußen ist perfekt.', ru: 'На улице — идеально.', next: 'zeit' },
        {
          id: 'drinnen',
          text: 'Lieber drinnen, mir wird abends immer kalt.',
          ru: 'Лучше внутри, вечером мне всегда холодно.',
          next: 'zeit',
        },
        {
          id: 'egal',
          text: 'Mir egal, ich setz mich einfach dazu 😄',
          ru: 'Мне всё равно, просто сяду к вам 😄',
          next: 'zeit',
        },
      ],
    },

    hinkommen: {
      id: 'hinkommen',
      messages: [
        { text: 'Mach ich, schick ich dir [gleich](gleich) 👍', ru: 'Сделаю, сейчас пришлю 👍' },
        {
          text: 'Kommst du mit dem Rad oder mit der Bahn?',
          ru: 'Ты на велосипеде или на электричке?',
        },
      ],
      responses: [
        {
          id: 'rad',
          text: 'Mit dem Rad, sind ja nur zehn Minuten.',
          ru: 'На велосипеде, тут всего десять минут.',
          next: 'zeit',
        },
        {
          id: 'bahn',
          text: "Bahn. Kann also sein, dass ich fünf Minuten später bin.",
          ru: 'На электричке. Так что могу опоздать минут на пять.',
          next: 'spaeter',
        },
        {
          id: 'weissnicht',
          text: "Weiß ich noch nicht, ich schau wie's Wetter wird.",
          ru: 'Ещё не знаю, посмотрю по погоде.',
          next: 'zeit',
        },
      ],
    },

    zeit: {
      id: 'zeit',
      messages: [
        { text: 'Alles klar.', ru: 'Всё понятно.' },
        {
          text: '[Passt dir](passt-mir-gut) acht, oder ist das zu früh nach der Arbeit?',
          ru: 'Тебе подходит восемь, или это слишком рано после работы?',
        },
      ],
      responses: [
        { id: 'acht', text: 'Acht passt mir gut.', ru: 'Восемь мне подходит.', next: 'wer-noch' },
        {
          id: 'halbneun',
          text: 'Mach lieber halb neun, dann komm ich in Ruhe hin.',
          ru: 'Давай лучше полдевятого, тогда доеду спокойно.',
          next: 'spaeter',
        },
        {
          id: 'knapp',
          text: "Ich versuch's um acht, kann aber knapp werden.",
          ru: 'Попробую к восьми, но может выйти в притык.',
          next: 'spaeter',
        },
      ],
    },

    spaeter: {
      id: 'spaeter',
      messages: [
        {
          text: '[Kein Stress](kein-stress), wir [sitzen](rumsitzen) eh erst mal nur rum.',
          ru: 'Без напряга, мы всё равно сначала просто сидим.',
        },
        {
          text: 'Sollen wir vorher noch was essen, oder hast du schon?',
          ru: 'Поедим перед этим или ты уже?',
        },
      ],
      responses: [
        {
          id: 'schon',
          text: 'Hab schon gegessen, aber danke!',
          ru: 'Уже поел, но спасибо!',
          next: 'wer-noch',
        },
        {
          id: 'kleines',
          text: 'Auf was Kleines hätt ich schon Lust.',
          ru: 'На что-нибудь небольшое я бы не отказался.',
          next: 'essen',
        },
        {
          id: 'hunger',
          text: 'Ehrlich gesagt hab ich richtig Hunger 😄',
          ru: 'Честно говоря, я реально голодный 😄',
          next: 'essen',
        },
      ],
    },

    'wer-noch': {
      id: 'wer-noch',
      messages: [
        {
          text: 'Ach, Jonas bringt vielleicht seinen Mitbewohner mit — [mal schauen](mal-schauen).',
          ru: 'Ах да, Йонас, возможно, приведёт своего соседа по квартире — посмотрим.',
        },
        {
          text: 'Der ist ganz nett, redet [halt](halt) viel 😄',
          ru: 'Он вполне приятный, просто много говорит 😄',
        },
      ],
      responses: [
        {
          id: 'zuhoeren',
          text: 'Kein Problem, ich hör gern zu.',
          ru: 'Не проблема, я люблю слушать.',
          next: 'essen',
        },
        {
          id: 'arbeit',
          text: 'Solange er nicht die ganze Zeit über Arbeit redet 😄',
          ru: 'Если только он не будет всё время про работу 😄',
          next: 'essen',
        },
        {
          id: 'wer',
          text: 'Keine Ahnung, wen du meinst — aber ok!',
          ru: 'Без понятия, о ком ты — но ладно!',
          next: 'essen',
        },
      ],
    },

    essen: {
      id: 'essen',
      messages: [
        {
          text: 'Die haben da so Bowls und ziemlich gute Sandwiches.',
          ru: 'У них там всякие боулы и довольно хорошие сэндвичи.',
        },
        {
          text: 'Ich nehm [auf jeden Fall](auf-jeden-fall) was. Und trinken? Wein, Bier, oder [was ohne](was-ohne)?',
          ru: 'Я точно что-нибудь возьму. А пить? Вино, пиво или что-нибудь без алкоголя?',
        },
      ],
      responses: [
        {
          id: 'bier',
          text: 'Ein Bier klingt gut nach der Woche.',
          ru: 'Пиво звучит хорошо после такой недели.',
          next: 'getraenk',
        },
        {
          id: 'ohne',
          text: 'Für mich was ohne, ich fahr noch.',
          ru: 'Мне что-нибудь без алкоголя, я ещё за рулём.',
          next: 'getraenk',
        },
        {
          id: 'vorort',
          text: 'Mal schauen, ich entscheide vor Ort 😄',
          ru: 'Посмотрим, решу на месте 😄',
          next: 'getraenk',
        },
      ],
    },

    getraenk: {
      id: 'getraenk',
      messages: [
        { text: 'Perfekt.', ru: 'Отлично.' },
        {
          text: 'Dann bis nachher! Ich bin ab acht da — [sag einfach Bescheid](bescheid-sagen), wenn du davor stehst.',
          ru: 'Тогда до вечера! Я там с восьми — просто дай знать, когда будешь у входа.',
        },
      ],
      responses: [
        { id: 'bis', text: 'Bis nachher! 👋', ru: 'До вечера! 👋', next: 'ende' },
        {
          id: 'freu',
          text: 'Alles klar, bis dann. Freu mich!',
          ru: 'Хорошо, тогда до встречи. Жду!',
          next: 'ende',
        },
        {
          id: 'duschen',
          text: 'Bin gleich da, muss nur noch duschen 😄',
          ru: 'Сейчас буду, только душ приму 😄',
          next: 'ende',
        },
      ],
    },

    ende: {
      id: 'ende',
      messages: [
        { text: 'Bis später ✌️', ru: 'До скорого ✌️' },
      ],
      responses: [],
    },

    // ——— "heute nicht" ———

    nein: {
      id: 'nein',
      messages: [
        { text: 'Schade! Aber [kein Stress](kein-stress).', ru: 'Жаль! Но ничего страшного.' },
        {
          text: 'Morgen wär auch noch [was drin](drin-sein). [Wie sieht\'s bei dir aus?](wie-siehts-bei-dir-aus)',
          ru: 'Завтра тоже вполне реально. А у тебя как?',
        },
      ],
      responses: [
        {
          id: 'morgen',
          text: 'Morgen könnte klappen, eher abends.',
          ru: 'Завтра может получиться, скорее вечером.',
          next: 'morgen',
        },
        {
          id: 'woche',
          text: 'Morgen bin ich verplant. Nächste Woche?',
          ru: 'Завтра у меня всё занято. На следующей неделе?',
          next: 'naechste-woche',
        },
        {
          id: 'spontan',
          text: 'Schreib mir einfach spontan, mal schauen.',
          ru: 'Напиши мне спонтанно, там посмотрим.',
          next: 'spontan',
        },
      ],
    },

    morgen: {
      id: 'morgen',
      messages: [
        { text: 'Ok, dann sag ich Jonas Bescheid.', ru: 'Ок, тогда я скажу Йонасу.' },
        {
          text: 'Wollen wir dann was essen, oder wieder nur was trinken?',
          ru: 'Тогда поедим или снова просто выпьем?',
        },
      ],
      responses: [
        {
          id: 'essen',
          text: 'Essen wär schön, ich koch die ganze Woche selbst 😄',
          ru: 'Поесть было бы здорово, я всю неделю готовлю сам 😄',
          next: 'morgen-plan',
        },
        {
          id: 'trinken',
          text: 'Nur was trinken, das reicht mir völlig.',
          ru: 'Просто выпить, мне этого вполне хватит.',
          next: 'morgen-plan',
        },
        {
          id: 'preis',
          text: "Kommt drauf an, wie teuer's wird, ehrlich gesagt.",
          ru: 'Смотря насколько дорого выйдет, честно говоря.',
          next: 'morgen-plan',
        },
      ],
    },

    'morgen-plan': {
      id: 'morgen-plan',
      messages: [
        {
          text: 'Passt. Ich such was raus und schick es dir.',
          ru: 'Идёт. Поищу что-нибудь и пришлю тебе.',
        },
        {
          text: 'Irgendwas in der Nähe, damit du nicht durch die halbe Stadt musst.',
          ru: 'Что-нибудь рядом, чтобы тебе не тащиться через полгорода.',
        },
      ],
      responses: [
        { id: 'danke', text: 'Perfekt, danke dir!', ru: 'Отлично, спасибо!', next: 'heute-abend' },
        {
          id: 'weiter',
          text: 'Mir egal, ich fahr auch mal weiter.',
          ru: 'Мне всё равно, я и подальше съезжу.',
          next: 'heute-abend',
        },
        {
          id: 'laden',
          text: 'Hauptsache nicht wieder der Laden vom letzten Mal 😄',
          ru: 'Главное — не снова то заведение, что в прошлый раз 😄',
          next: 'heute-abend',
        },
      ],
    },

    'heute-abend': {
      id: 'heute-abend',
      messages: [
        {
          text: 'Und heute Abend? [Hast du noch was vor](was-vorhaben), oder wird es einfach Couch?',
          ru: 'А сегодня вечером? У тебя есть планы, или будет просто диван?',
        },
      ],
      responses: [
        { id: 'couch', text: 'Couch, ganz klar 😌', ru: 'Диван, однозначно 😌', next: 'couch' },
        {
          id: 'arbeit',
          text: 'Ich muss noch was fertig machen für die Arbeit.',
          ru: 'Мне надо ещё кое-что дозакончить для работы.',
          next: 'couch',
        },
        {
          id: 'sport',
          text: 'Sport, dann Couch. So der Plan.',
          ru: 'Спорт, потом диван. Такой план.',
          next: 'couch',
        },
      ],
    },

    couch: {
      id: 'couch',
      messages: [
        {
          text: '[Ehrlich gesagt](ehrlich-gesagt) klingt das nach einem guten Freitag.',
          ru: 'Честно говоря, звучит как хорошая пятница.',
        },
        {
          text: 'Ich hab die Woche kaum geschlafen, bin auch echt [platt](platt-sein).',
          ru: 'Я на этой неделе почти не спала, тоже совсем без сил.',
        },
      ],
      responses: [
        {
          id: 'eins',
          text: 'Dann trink halt nur eins 😄',
          ru: 'Тогда выпей всего один 😄',
          next: 'tail',
        },
        {
          id: 'warum',
          text: 'Warum gehst du dann überhaupt raus?',
          ru: 'А зачем ты тогда вообще идёшь?',
          next: 'warum',
        },
        {
          id: 'genauso',
          text: 'Geht mir genauso. Nächste Woche wird besser.',
          ru: 'У меня то же самое. На следующей неделе будет лучше.',
          next: 'tail',
        },
      ],
    },

    warum: {
      id: 'warum',
      messages: [
        { text: 'Gute Frage 😅', ru: 'Хороший вопрос 😅' },
        {
          text: 'Weil ich Jonas seit drei Wochen nicht gesehen hab. Und weil ich zu Hause eh nur Serien schau.',
          ru: 'Потому что я три недели не видела Йонаса. И потому что дома я всё равно только сериалы смотрю.',
        },
      ],
      responses: [
        { id: 'vernuenftig', text: 'Sehr vernünftig 😄', ru: 'Очень разумно 😄', next: 'tail' },
        {
          id: 'auchwas',
          text: 'Serien sind doch auch was.',
          ru: 'Сериалы — тоже дело.',
          next: 'tail',
        },
      ],
    },

    'naechste-woche': {
      id: 'naechste-woche',
      messages: [
        { text: 'Klar, nächste Woche geht auch.', ru: 'Конечно, на следующей неделе тоже можно.' },
        {
          text: 'Ich schreib in die Gruppe, dann finden wir was. [Unter der Woche](unter-der-woche) ist es eh ruhiger.',
          ru: 'Напишу в группу, тогда что-нибудь придумаем. В будни всё равно спокойнее.',
        },
      ],
      responses: [
        { id: 'danke', text: 'Super, danke dir!', ru: 'Супер, спасибо тебе!', next: 'heute-abend' },
        {
          id: 'dienstag',
          text: 'Am besten Dienstag oder Mittwoch.',
          ru: 'Лучше всего вторник или среда.',
          next: 'heute-abend',
        },
        {
          id: 'montag',
          text: 'Nur nicht Montag 😅',
          ru: 'Только не понедельник 😅',
          next: 'heute-abend',
        },
      ],
    },

    spontan: {
      id: 'spontan',
      messages: [
        { text: 'Mach ich 👍', ru: 'Сделаю 👍' },
        {
          text: 'Aber [sag Bescheid](bescheid-sagen), ja? Sonst denk ich wieder, du hast keine [Lust](lust-haben) auf uns 😄',
          ru: 'Но дай знать, ладно? Иначе я снова подумаю, что тебе с нами не хочется 😄',
        },
      ],
      responses: [
        {
          id: 'quatsch',
          text: 'Quatsch, klar hab ich Lust. Ich sag Bescheid.',
          ru: 'Да брось, конечно хочется. Дам знать.',
          next: 'heute-abend',
        },
        {
          id: 'morgenfrueh',
          text: 'Ich schreib dir morgen früh, versprochen.',
          ru: 'Напишу тебе завтра утром, обещаю.',
          next: 'heute-abend',
        },
        {
          id: 'zeit',
          text: 'Ich hab immer Lust, nur nie Zeit 😅',
          ru: 'Хотеть-то я всегда хочу, только времени нет 😅',
          next: 'heute-abend',
        },
      ],
    },

    tail: {
      id: 'tail',
      messages: [
        { text: 'Alles gut, wir kriegen das hin.', ru: 'Всё хорошо, мы это уладим.' },
        { text: 'Dann erhol dich mal. Bis bald!', ru: 'Тогда отдохни. До скорого!' },
      ],
      responses: [
        {
          id: 'spass',
          text: 'Danke, dir viel Spaß nachher! 👋',
          ru: 'Спасибо, а тебе хорошего вечера! 👋',
          next: 'ende-nein',
        },
        {
          id: 'gruesse',
          text: 'Bis bald! Grüß die anderen von mir.',
          ru: 'До скорого! Передай привет остальным.',
          next: 'ende-nein',
        },
        {
          id: 'mittrinken',
          text: 'Ja, bis bald. Und trinkt einen für mich mit 😄',
          ru: 'Да, до скорого. И выпейте один за меня 😄',
          next: 'ende-nein',
        },
      ],
    },

    'ende-nein': {
      id: 'ende-nein',
      messages: [
        { text: 'Mach ich 😄 Bis dann!', ru: 'Сделаю 😄 До встречи!' },
      ],
      responses: [],
    },
  },
}
