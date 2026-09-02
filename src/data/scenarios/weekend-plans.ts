import type { Scenario } from '../../types'

/** Making a weekend plan with a friend: where, weather, when, what to bring. */
export const weekendPlans: Scenario = {
  id: 'weekend-plans',
  title: 'Wochenende?',
  context: 'Nina hat eine Idee für Sonntag.',
  contextLine: 'Donnerstagabend · Pläne machen',
  duration: '3 min',
  level: 'B1',
  icon: 'bike',
  character: { name: 'Nina', status: 'Donnerstag, 21:04' },
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        { text: 'Hey du 👋', ru: 'Привет 👋' },
        {
          text: '[Hast du am Wochenende schon was vor?](was-vorhaben)',
          ru: 'У тебя на выходные уже есть планы?',
        },
      ],
      responses: [
        {
          id: 'nichts',
          text: 'Noch nichts. Was schwebt dir vor?',
          ru: 'Пока ничего. А что ты предлагаешь?',
          next: 'idee',
        },
        {
          id: 'sonntag',
          text: 'Samstag bin ich verplant, Sonntag frei.',
          ru: 'В субботу я занят, в воскресенье свободен.',
          next: 'sonntag',
        },
        {
          id: 'faul',
          text: 'Ich wollte eigentlich gar nichts machen 😄',
          ru: 'Я вообще-то не собирался ничего делать 😄',
          next: 'faul',
        },
      ],
    },

    idee: {
      id: 'idee',
      messages: [
        {
          text: 'Ich hätte [Bock](bock-haben) auf Fahrrad und See.',
          ru: 'Мне бы хотелось на велосипеде к озеру.',
        },
        {
          text: '[Wenn das Wetter hält](wenn-das-wetter-haelt), natürlich.',
          ru: 'Если погода не испортится, конечно.',
        },
      ],
      responses: [
        {
          id: 'see',
          text: 'Klingt super. Wie weit ist der See?',
          ru: 'Звучит здорово. А далеко до озера?',
          next: 'see',
        },
        {
          id: 'park',
          text: 'Fahrrad ja, See nein. Ich schwimm nicht gern.',
          ru: 'Велосипед — да, озеро — нет. Я не люблю плавать.',
          next: 'park',
        },
        {
          id: 'rad',
          text: 'Mein Rad steht seit Wochen platt im Keller 😅',
          ru: 'Мой велосипед уже недели стоит в подвале со спущенным колесом 😅',
          next: 'rad',
        },
      ],
    },

    sonntag: {
      id: 'sonntag',
      messages: [
        {
          text: 'Sonntag [passt mir](passt-mir-gut) sogar besser.',
          ru: 'Воскресенье мне даже больше подходит.',
        },
        {
          text: 'Wollen wir zum See? Mit dem Rad sind es vierzig Minuten.',
          ru: 'Поедем к озеру? На велосипеде это сорок минут.',
        },
      ],
      responses: [
        {
          id: 'see',
          text: 'Vierzig Minuten geht klar. Erzähl.',
          ru: 'Сорок минут — нормально. Рассказывай.',
          next: 'see',
        },
        {
          id: 'park',
          text: 'Bisschen weit. Gibt es was Näheres?',
          ru: 'Далековато. Есть что-нибудь поближе?',
          next: 'park',
        },
        {
          id: 'rad',
          text: 'Ich hab gar kein Rad.',
          ru: 'У меня вообще нет велосипеда.',
          next: 'rad',
        },
      ],
    },

    faul: {
      id: 'faul',
      messages: [
        {
          text: 'Verstehe 😄 Nichts machen ist auch ein Plan.',
          ru: 'Понимаю 😄 Ничего не делать — тоже план.',
        },
        {
          text: 'Aber wenn du doch [Lust hast](lust-haben): Fahrrad und See, Sonntag?',
          ru: 'Но если всё-таки захочешь: велосипед и озеро, в воскресенье?',
        },
      ],
      responses: [
        {
          id: 'see',
          text: 'Ok, überredet. Wo ist der See?',
          ru: 'Ладно, убедила. Где это озеро?',
          next: 'see',
        },
        {
          id: 'park',
          text: 'Fahrrad ist mir zu viel. Park?',
          ru: 'Велосипед для меня слишком. Может, парк?',
          next: 'park',
        },
        {
          id: 'rad',
          text: 'Mein Rad hat einen Platten.',
          ru: 'У меня колесо спущено.',
          next: 'rad',
        },
      ],
    },

    see: {
      id: 'see',
      messages: [
        {
          text: 'Einmal raus aus der Stadt, dann nur noch Wiese und Wasser.',
          ru: 'Только выехать из города — и дальше только луг и вода.',
        },
        {
          text: 'Ich war letztes Jahr da — [lohnt sich](sich-lohnen) echt.',
          ru: 'Я была там в прошлом году — правда того стоит.',
        },
      ],
      responses: [
        { id: 'gut', text: 'Dann machen wir das.', ru: 'Тогда так и сделаем.', next: 'wetter' },
        {
          id: 'baden',
          text: 'Kann man da auch baden, oder nur Füße rein?',
          ru: 'А там можно купаться или только ноги опустить?',
          next: 'wetter',
        },
        {
          id: 'weg',
          text: 'Ist der Weg dahin okay? Ich fahr nicht gern an Autos vorbei.',
          ru: 'А дорога туда нормальная? Я не люблю ехать вдоль машин.',
          next: 'wetter',
        },
      ],
    },

    park: {
      id: 'park',
      messages: [
        {
          text: 'Dann Stadtpark — zehn Minuten von dir.',
          ru: 'Тогда городской парк — десять минут от тебя.',
        },
        {
          text: 'Decke, was zu trinken, fertig. [Hört sich doch gut an?](hoert-sich-gut-an)',
          ru: 'Покрывало, что-нибудь попить — и готово. Звучит же хорошо?',
        },
      ],
      responses: [
        {
          id: 'ja',
          text: 'Ja, das reicht mir völlig.',
          ru: 'Да, мне этого вполне достаточно.',
          next: 'wetter',
        },
        {
          id: 'essen',
          text: 'Ich bring was zu essen mit.',
          ru: 'Я принесу что-нибудь поесть.',
          next: 'wetter',
        },
        { id: 'wer', text: 'Kommt noch jemand mit?', ru: 'С нами кто-то ещё пойдёт?', next: 'wer' },
      ],
    },

    wer: {
      id: 'wer',
      messages: [
        {
          text: 'Ich frag Jule, aber die sagt meistens [spontan](spontan) ab 😄',
          ru: 'Спрошу Юле, но она обычно отказывается в последний момент 😄',
        },
        { text: 'Ansonsten nur wir zwei.', ru: 'А так — только мы вдвоём.' },
      ],
      responses: [
        { id: 'gut', text: 'Passt mir gut so.', ru: 'Меня так вполне устраивает.', next: 'wetter' },
        {
          id: 'frag',
          text: 'Frag sie trotzdem, ich mag sie.',
          ru: 'Всё равно спроси её, она мне нравится.',
          next: 'wetter',
        },
      ],
    },

    rad: {
      id: 'rad',
      messages: [
        {
          text: 'Kein Problem, du kannst das von meiner Mitbewohnerin nehmen.',
          ru: 'Не проблема, можешь взять велосипед моей соседки.',
        },
        { text: 'Sie fährt es eh [kaum](kaum).', ru: 'Она на нём всё равно почти не катается.' },
      ],
      responses: [
        { id: 'danke', text: 'Perfekt, danke!', ru: 'Идеально, спасибо!', next: 'wetter' },
        {
          id: 'park',
          text: 'Dann doch lieber Park, das ist mir sicherer.',
          ru: 'Тогда всё-таки парк, так мне спокойнее.',
          next: 'park',
        },
        {
          id: 'damenrad',
          text: 'Ist das so ein Rad mit Blumenkorb? 😄',
          ru: 'Это такой велосипед с корзинкой для цветов? 😄',
          next: 'rad-zwei',
        },
      ],
    },

    'rad-zwei': {
      id: 'rad-zwei',
      messages: [
        { text: 'Ja 🌸', ru: 'Да 🌸' },
        { text: 'Macht doch nichts, es fährt.', ru: 'Ничего страшного, он едет.' },
      ],
      responses: [
        { id: 'nehm', text: 'Stimmt. Ich nehm es.', ru: 'И правда. Беру.', next: 'wetter' },
        { id: 'probier', text: "Ok, ich probier's 😄", ru: 'Ок, попробую 😄', next: 'wetter' },
      ],
    },

    wetter: {
      id: 'wetter',
      messages: [
        {
          text: 'Laut App: Samstag Regen, Sonntag Sonne.',
          ru: 'По приложению: в субботу дождь, в воскресенье солнце.',
        },
        {
          text: '[Kommt drauf an](kommt-drauf-an), welcher App man glaubt 😄 Aber: Sonntag, oder?',
          ru: 'Смотря какому приложению верить 😄 Но всё же: воскресенье?',
        },
      ],
      responses: [
        { id: 'sonntag', text: 'Sonntag dann.', ru: 'Тогда воскресенье.', next: 'wann' },
        {
          id: 'apps',
          text: 'Apps lügen 😄 Aber ok, Sonntag.',
          ru: 'Приложения врут 😄 Но ладно, воскресенье.',
          next: 'wann',
        },
        {
          id: 'spontan',
          text: 'Ich sag dir Samstagabend Bescheid.',
          ru: 'Я скажу тебе в субботу вечером.',
          next: 'spontan',
        },
      ],
    },

    spontan: {
      id: 'spontan',
      messages: [
        { text: 'Ok, aber sag wirklich Bescheid 🙂', ru: 'Ок, но правда скажи 🙂' },
        {
          text: 'Ich plan Sonntag dann erst mal mit dir. Vormittags ist es noch leer draußen.',
          ru: 'Тогда я пока планирую воскресенье с тобой. Утром там ещё пусто.',
        },
      ],
      responses: [
        {
          id: 'ja',
          text: 'Mach ich. Vormittags klingt gut.',
          ru: 'Скажу. Утром — хорошо.',
          next: 'wann',
        },
        {
          id: 'nachmittag',
          text: 'Vormittags schaff ich nicht, sorry.',
          ru: 'Утром не успею, извини.',
          next: 'wann',
        },
      ],
    },

    wann: {
      id: 'wann',
      messages: [
        { text: 'Wann passt dir? Ich bin flexibel.', ru: 'Когда тебе удобно? Я гибкая.' },
      ],
      responses: [
        { id: 'elf', text: 'Elf wär gut.', ru: 'Одиннадцать было бы хорошо.', next: 'mitbringen' },
        {
          id: 'nachmittag',
          text: 'Lieber nach dem Mittagessen.',
          ru: 'Лучше после обеда.',
          next: 'mitbringen',
        },
        {
          id: 'egal',
          text: 'Ist mir egal, sag du.',
          ru: 'Мне всё равно, реши ты.',
          next: 'mitbringen',
        },
      ],
    },

    mitbringen: {
      id: 'mitbringen',
      messages: [
        { text: 'Ich bring Brot, Käse und Tomaten mit.', ru: 'Я принесу хлеб, сыр и помидоры.' },
        { text: 'Bringst du was zu trinken?', ru: 'Принесёшь что-нибудь попить?' },
      ],
      responses: [
        {
          id: 'trinken',
          text: 'Klar, Wasser und Limo.',
          ru: 'Конечно, воду и лимонад.',
          next: 'treffen',
        },
        {
          id: 'kuchen',
          text: 'Ich bring lieber Kuchen, trinken hab ich nichts da.',
          ru: 'Лучше принесу пирог, попить у меня ничего нет.',
          next: 'treffen',
        },
        {
          id: 'unterwegs',
          text: 'Ich kauf unterwegs was. Passt das?',
          ru: 'Куплю что-нибудь по дороге. Так нормально?',
          next: 'treffen',
        },
      ],
    },

    treffen: {
      id: 'treffen',
      messages: [
        { text: '[Klingt gut](klingt-gut).', ru: 'Звучит хорошо.' },
        { text: 'Dann treffen wir uns am Brunnen.', ru: 'Тогда встречаемся у фонтана.' },
        {
          text: 'Und wenn es doch regnet, gehen wir einfach Kaffee trinken ☕',
          ru: 'А если всё-таки будет дождь, просто пойдём пить кофе ☕',
        },
      ],
      responses: [
        { id: 'deal', text: 'Deal 🙂', ru: 'Договорились 🙂', next: 'ende' },
        {
          id: 'kekse',
          text: 'Und ich bring Kekse mit, für alle Fälle.',
          ru: 'А я принесу печенье, на всякий случай.',
          next: 'ende',
        },
        {
          id: 'schreib',
          text: 'Schreib mir vorher, ja?',
          ru: 'Напиши мне заранее, ладно?',
          next: 'ende',
        },
      ],
    },

    ende: {
      id: 'ende',
      messages: [
        { text: 'Mach ich! Bis Sonntag ☀️', ru: 'Напишу! До воскресенья ☀️' },
      ],
      responses: [],
    },
  },
}
