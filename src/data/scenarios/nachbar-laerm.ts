import type { Scenario } from '../../types'

/**
 * 22:15, the drill is still running, and Herr Brandt from downstairs starts
 * getting up at five. Cross-references Frau Kessler from `muell-nachbar`:
 * the house is the same house.
 */
export const nachbarLaerm: Scenario = {
  id: 'nachbar-laerm',
  title: '22 Uhr ist 22 Uhr',
  context: 'Herr Brandt von unten schreibt. Deine Bohrmaschine läuft noch.',
  contextLine: 'Dienstag, 22:15 · Nachbar von unten',
  duration: '3 min',
  level: 'B1',
  icon: 'door',
  character: { name: 'Herr Brandt', status: 'Erdgeschoss' },
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        { text: 'Guten Abend, Brandt hier, von unten.', ru: 'Добрый вечер, это Брандт, снизу.' },
        {
          text: 'Ich weiß, es ist spät — aber es ist auch nach zehn, und bei Ihnen läuft noch die Bohrmaschine.',
          ru: 'Я знаю, что поздно — но уже больше десяти, а у вас всё ещё работает перфоратор.',
        },
      ],
      responses: [
        {
          id: 'sorry',
          text: 'Oh nein. Tut mir leid, ich höre sofort auf.',
          ru: 'О нет. Извините, сейчас же прекращу.',
          next: 'entschuldigen',
        },
        {
          id: 'schrauben',
          text: 'Zwei Schrauben noch, dann bin ich fertig.',
          ru: 'Ещё два шурупа, и я закончил.',
          next: 'schrauben',
        },
        {
          id: 'nichtich',
          text: 'Das war nicht ich, ich hab nichts gebohrt.',
          ru: 'Это был не я, я ничего не сверлил.',
          next: 'nicht-ich',
        },
      ],
    },

    entschuldigen: {
      id: 'entschuldigen',
      messages: [
        { text: 'Danke.', ru: 'Спасибо.' },
        {
          text: 'Ich bin nicht der Typ, der wegen jedem Geräusch schreibt. Aber ich steh um fünf auf.',
          ru: 'Я не из тех, кто пишет из-за каждого шороха. Но я встаю в пять.',
        },
      ],
      responses: [
        { id: 'fuenf', text: 'Um fünf? Respekt.', ru: 'В пять? Уважение.', next: 'fuenf' },
        {
          id: 'verstehe',
          text: 'Verstehe ich total. Kommt nicht wieder vor.',
          ru: 'Полностью понимаю. Больше не повторится.',
          next: 'geraeusche',
        },
        {
          id: 'wann',
          text: 'Wann darf man hier überhaupt bohren?',
          ru: 'А когда здесь вообще можно сверлить?',
          next: 'geraeusche',
        },
      ],
    },

    fuenf: {
      id: 'fuenf',
      messages: [
        { text: 'Bäckerei. Seit sechzehn Jahren 🥖', ru: 'Пекарня. Уже шестнадцать лет 🥖' },
        {
          text: 'Deshalb bin ich um zehn im Bett und höre jede Schraube.',
          ru: 'Поэтому в десять я уже в постели и слышу каждый шуруп.',
        },
      ],
      responses: [
        {
          id: 'absolut',
          text: 'Dann verstehe ich das absolut.',
          ru: 'Тогда я понимаю абсолютно.',
          next: 'geraeusche',
        },
        {
          id: 'wow',
          text: 'Sechzehn Jahre? Respekt.',
          ru: 'Шестнадцать лет? Уважение.',
          next: 'geraeusche',
        },
        {
          id: 'broetchen',
          text: 'Bringen Sie manchmal Brötchen mit? 😄',
          ru: 'Вы иногда приносите булочки? 😄',
          next: 'broetchen',
        },
      ],
    },

    broetchen: {
      id: 'broetchen',
      messages: [
        {
          text: 'Freitags stell ich welche vor die Tür von Frau Kessler 😄',
          ru: 'По пятницам я ставлю их под дверь фрау Кесслер 😄',
        },
        {
          text: 'Sagen Sie ihr das nicht, sie denkt, das ist der Hausmeister.',
          ru: 'Только ей не говорите, она думает, что это домоуправ.',
        },
      ],
      responses: [
        {
          id: 'geheim',
          text: 'Ihr Geheimnis ist sicher.',
          ru: 'Ваш секрет в безопасности.',
          next: 'geraeusche',
        },
        {
          id: 'warum',
          text: 'Warum ausgerechnet Frau Kessler?',
          ru: 'А почему именно фрау Кесслер?',
          next: 'geraeusche',
        },
      ],
    },

    schrauben: {
      id: 'schrauben',
      messages: [
        {
          text: 'Zwei Schrauben sind bei Ihnen immer zwanzig Minuten 😄',
          ru: 'Два шурупа у вас — это всегда двадцать минут 😄',
        },
        {
          text: 'Ich [mein das nicht böse](nicht-boese-meinen). Aber machen Sie den Rest morgen, ja?',
          ru: 'Я не в обиду. Но остальное сделайте завтра, хорошо?',
        },
      ],
      responses: [
        {
          id: 'morgen',
          text: 'Ok, morgen. Versprochen.',
          ru: 'Хорошо, завтра. Обещаю.',
          next: 'geraeusche',
        },
        {
          id: 'kennen',
          text: 'Sie kennen mich zu gut 😅',
          ru: 'Вы меня слишком хорошо знаете 😅',
          next: 'geraeusche',
        },
        { id: 'sonntag', text: 'Morgen ist Sonntag.', ru: 'Завтра воскресенье.', next: 'sonntag' },
      ],
    },

    'nicht-ich': {
      id: 'nicht-ich',
      messages: [
        {
          text: 'Doch, aus dem dritten. Ich hör das durch die Decke, das ist eindeutig.',
          ru: 'Нет, из третьего. Я слышу это через потолок, тут без вариантов.',
        },
        {
          text: 'Frau Kessler hat auch schon gefragt, was da los ist.',
          ru: 'Фрау Кесслер тоже уже спрашивала, что там происходит.',
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Ok, war ich. Ich hör auf.',
          ru: 'Ладно, это был я. Прекращаю.',
          next: 'entschuldigen',
        },
        {
          id: 'decke',
          text: 'Vielleicht war es der Nachbar über mir?',
          ru: 'Может, это сосед сверху?',
          next: 'decke',
        },
        {
          id: 'kessler',
          text: 'Frau Kessler fragt immer 😄',
          ru: 'Фрау Кесслер всегда спрашивает 😄',
          next: 'geraeusche',
        },
      ],
    },

    decke: {
      id: 'decke',
      messages: [
        { text: 'Über Ihnen ist der Dachboden 😄', ru: 'Над вами чердак 😄' },
        {
          text: 'Aber gut, lassen wir das. Machen Sie einfach Schluss für heute, ja?',
          ru: 'Но ладно, оставим это. Просто закончите на сегодня, хорошо?',
        },
      ],
      responses: [
        {
          id: 'erwischt',
          text: 'Erwischt. Ich hör auf 😅',
          ru: 'Попался. Прекращаю 😅',
          next: 'geraeusche',
        },
        {
          id: 'fair',
          text: 'Fair. Gute Nacht.',
          ru: 'Справедливо. Доброй ночи.',
          next: 'geraeusche',
        },
      ],
    },

    geraeusche: {
      id: 'geraeusche',
      messages: [
        {
          text: 'Waschmaschine hör ich übrigens gar nicht.',
          ru: 'Стиральную машину я, между прочим, вообще не слышу.',
        },
        {
          text: 'Aber Bohren geht durchs ganze Haus — das ist der Beton. Deswegen fällt das immer auf.',
          ru: 'А сверление идёт через весь дом — это бетон. Поэтому его всегда замечают.',
        },
      ],
      responses: [
        {
          id: 'gut',
          text: 'Gut zu wissen, wirklich.',
          ru: 'Правда полезно знать.',
          next: 'ruhezeiten',
        },
        {
          id: 'oefter',
          text: 'Dann war ich wohl schon öfter der Bohrer 😅',
          ru: 'Значит, я уже не раз был тем самым сверлящим 😅',
          next: 'ruhezeiten',
        },
        {
          id: 'musik',
          text: 'Und wie ist es mit Musik?',
          ru: 'А как насчёт музыки?',
          next: 'ruhezeiten',
        },
      ],
    },

    ruhezeiten: {
      id: 'ruhezeiten',
      messages: [
        {
          text: 'Kurz, damit es geklärt ist: [Ruhezeit](ruhezeit) ist ab 22 Uhr, und mittags von eins bis drei.',
          ru: 'Коротко, чтобы было ясно: часы тишины с 22, и днём с одного до трёх.',
        },
        {
          text: 'Sonntags gar nicht. [Das ist hier heilig](ist-heilig).',
          ru: 'По воскресеньям вообще нельзя. Здесь это святое.',
        },
      ],
      responses: [
        {
          id: 'danke',
          text: 'Gut zu wissen, danke.',
          ru: 'Хорошо, буду знать, спасибо.',
          next: 'kessler-schild',
        },
        {
          id: 'sonntag',
          text: 'Und wenn ich am Sonntag unbedingt muss?',
          ru: 'А если мне в воскресенье очень надо?',
          next: 'sonntag',
        },
        {
          id: 'samstag',
          text: 'Also Samstagvormittag geht?',
          ru: 'То есть в субботу утром можно?',
          next: 'wochenende',
        },
      ],
    },

    sonntag: {
      id: 'sonntag',
      messages: [
        { text: 'Am Sonntag bohrt hier niemand.', ru: 'В воскресенье здесь никто не сверлит.' },
        {
          text: 'Nicht weil ich das so will — die Verwaltung schreibt [Abmahnungen](abmahnung), wenn sich einer [beschwert](sich-beschweren). Und einer beschwert sich immer.',
          ru: 'И не потому, что я так хочу — управляющая компания выносит предупреждения, если кто-то жалуется. А кто-то жалуется всегда.',
        },
      ],
      responses: [
        {
          id: 'verstanden',
          text: 'Verstanden, kein Sonntag.',
          ru: 'Понял, никаких воскресений.',
          next: 'kessler-schild',
        },
        {
          id: 'raten',
          text: 'Lassen Sie mich raten, wer 😄',
          ru: 'Дайте угадаю, кто 😄',
          next: 'kessler-schild',
        },
        {
          id: 'passiert',
          text: 'Ist das schon mal passiert?',
          ru: 'Такое уже было?',
          next: 'aquarium',
        },
      ],
    },

    aquarium: {
      id: 'aquarium',
      messages: [
        {
          text: 'Im Erdgeschoss, letztes Jahr. Aquarium-Pumpe, die ganze Nacht.',
          ru: 'На первом этаже, в прошлом году. Аквариумный насос, всю ночь.',
        },
        {
          text: 'Zwei Briefe von der Verwaltung, dann war Ruhe. Wegen einer Pumpe 🐠',
          ru: 'Два письма из управляющей компании — и стало тихо. Из-за насоса 🐠',
        },
      ],
      responses: [
        { id: 'absurd', text: 'Das ist absurd 😄', ru: 'Это абсурд 😄', next: 'wochenende' },
        {
          id: 'haus',
          text: 'Ok, ich glaub, ich versteh das Haus jetzt.',
          ru: 'Ладно, кажется, теперь я понимаю этот дом.',
          next: 'wochenende',
        },
      ],
    },

    'kessler-schild': {
      id: 'kessler-schild',
      messages: [
        { text: 'Und weil wir schon schreiben:', ru: 'И раз уж мы пишем:' },
        {
          text: 'Frau Kessler sammelt Unterschriften für ein Schild im Hof. „Ruhe ab 20 Uhr." Ich unterschreibe nicht — nur damit Sie es wissen 😄',
          ru: 'Фрау Кесслер собирает подписи за табличку во дворе. «Тишина с 20 часов». Я не подписываю — просто чтобы вы знали 😄',
        },
      ],
      responses: [
        { id: 'ichauch', text: 'Ich auch nicht 😄', ru: 'Я тоже не буду 😄', next: 'wochenende' },
        {
          id: 'uebertrieben',
          text: 'Ab 20 Uhr? Das ist übertrieben.',
          ru: 'С двадцати? Это перебор.',
          next: 'wochenende',
        },
        {
          id: 'biotonne',
          text: 'Sie hat mich gestern wegen der Biotonne angeschrieben.',
          ru: 'Она мне вчера написала из-за биоконтейнера.',
          next: 'biotonne',
        },
      ],
    },

    biotonne: {
      id: 'biotonne',
      messages: [
        { text: 'Willkommen im Haus 😄', ru: 'Добро пожаловать в дом 😄' },
        {
          text: 'Sie meint es nicht böse. Nach zwei Wochen sortiert man automatisch richtig, das geht allen so.',
          ru: 'Она не со зла. Через две недели человек начинает сортировать правильно автоматически, так у всех.',
        },
      ],
      responses: [
        {
          id: 'tabelle',
          text: 'Sie hat mir eine laminierte Tabelle versprochen.',
          ru: 'Она обещала мне заламинированную табличку.',
          next: 'werkzeug',
        },
        {
          id: 'nett',
          text: 'Sie ist eigentlich ganz nett.',
          ru: 'Она, вообще-то, вполне милая.',
          next: 'werkzeug',
        },
      ],
    },

    wochenende: {
      id: 'wochenende',
      messages: [
        {
          text: 'Samstag von neun bis abends um acht ist völlig ok.',
          ru: 'В субботу с девяти до восьми вечера совершенно нормально.',
        },
        {
          text: 'Und wenn Sie mal richtig laut werden — Küche einbauen oder so — [sagen Sie es mir vorher](bescheid-sagen). Dann fahr ich raus.',
          ru: 'А если будет реально громко — кухню ставить или что-то такое — скажите мне заранее. Тогда я уеду.',
        },
      ],
      responses: [
        {
          id: 'deal',
          text: 'Das ist ein Deal. Danke!',
          ru: 'Договорились. Спасибо!',
          next: 'werkzeug',
        },
        {
          id: 'kueche',
          text: 'Nächsten Samstag kommt tatsächlich eine Küche 😅',
          ru: 'В следующую субботу действительно приезжает кухня 😅',
          next: 'kueche',
        },
        {
          id: 'entspannt',
          text: 'Sehr entspannt von Ihnen.',
          ru: 'Очень спокойно с вашей стороны.',
          next: 'werkzeug',
        },
      ],
    },

    kueche: {
      id: 'kueche',
      messages: [
        {
          text: 'Dann bin ich Samstag bei meiner Tochter 😄',
          ru: 'Тогда в субботу я буду у дочери 😄',
        },
        {
          text: 'Sagen Sie Bescheid, wenn Sie jemanden brauchen, der die Schränke hält.',
          ru: 'Дайте знать, если нужен кто-то, чтобы придержать шкафы.',
        },
      ],
      responses: [
        { id: 'wort', text: 'Das nehm ich beim Wort.', ru: 'Ловлю на слове.', next: 'werkzeug' },
        {
          id: 'gern',
          text: 'Sehr gern, danke!',
          ru: 'С удовольствием, спасибо!',
          next: 'werkzeug',
        },
      ],
    },

    werkzeug: {
      id: 'werkzeug',
      messages: [
        {
          text: 'Falls Ihnen Werkzeug fehlt: ich hab unten im Keller alles.',
          ru: 'Если не хватает инструмента: у меня внизу в подвале всё есть.',
        },
        {
          text: 'Auch eine Bohrmaschine, die leiser ist als Ihre 😄',
          ru: 'И перфоратор, который тише вашего 😄',
        },
      ],
      responses: [
        {
          id: 'spaet',
          text: 'Der Hinweis kommt jetzt etwas spät 😄',
          ru: 'Подсказка пришла немного поздно 😄',
          next: 'ende',
        },
        {
          id: 'danke',
          text: 'Danke, echt nett. Gute Nacht!',
          ru: 'Спасибо, правда мило. Доброй ночи!',
          next: 'ende',
        },
        {
          id: 'verkauf',
          text: 'Also war das doch ein Verkaufsgespräch 😄',
          ru: 'Так это всё-таки был рекламный разговор 😄',
          next: 'ende',
        },
      ],
    },

    ende: {
      id: 'ende',
      messages: [
        {
          text: 'Gute Nacht! Und jetzt Schluss mit Bohren 😄',
          ru: 'Доброй ночи! А теперь хватит сверлить 😄',
        },
      ],
      responses: [],
    },
  },
}
