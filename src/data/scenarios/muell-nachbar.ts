import type { Scenario } from '../../types'

/**
 * The classic: a neighbour saw which bin your pizza box went into. Formal
 * "Sie" throughout — this is exactly the register the situation comes in.
 * Frau Kessler is nosy but not a villain, and the chat ends with cherries.
 */
export const muellNachbar: Scenario = {
  id: 'muell-nachbar',
  title: 'Das war die falsche Tonne',
  context: 'Frau Kessler hat gesehen, was du in die Biotonne geworfen hast.',
  contextLine: 'Abends · Nachbarin aus dem 2. OG',
  duration: '3 min',
  level: 'B1',
  character: { name: 'Frau Kessler', status: 'Nachbarin' },
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        { text: 'Guten Abend!', ru: 'Добрый вечер!' },
        {
          text: 'Ich wollte Sie nur kurz [drauf hinweisen](hinweisen): die Pizzaschachtel in der Biotonne — war die von Ihnen?',
          ru: 'Хотела просто обратить ваше внимание: коробка от пиццы в биоконтейнере — это ваша?',
        },
      ],
      responses: [
        {
          id: 'ja',
          text: 'Oh, ja. Sorry, wusste ich nicht.',
          ru: 'О, да. Извините, я не знал.',
          next: 'gestehen',
        },
        {
          id: 'nein',
          text: 'Pizzaschachtel? Ich hab gestern nichts rausgebracht.',
          ru: 'Коробка от пиццы? Я вчера ничего не выносил.',
          next: 'leugnen',
        },
        {
          id: 'wo',
          text: 'Kann sein 😅 Wo hätte die denn hingehört?',
          ru: 'Может быть 😅 А куда её надо было?',
          next: 'belehrung',
        },
      ],
    },

    gestehen: {
      id: 'gestehen',
      messages: [
        { text: '[Das kann passieren](das-kann-passieren).', ru: 'Бывает.' },
        {
          text: 'Nur: Karton [gehört](gehoert-in) ins Altpapier. Und wenn Fett dran ist, in den Restmüll.',
          ru: 'Только: картон идёт в бумагу. А если на нём жир — в остаточный мусор.',
        },
      ],
      responses: [
        {
          id: 'fett',
          text: 'Fettiger Karton in den Restmüll? Gut zu wissen.',
          ru: 'Жирный картон в остаточный? Хорошо, буду знать.',
          next: 'belehrung',
        },
        {
          id: 'system',
          text: 'Ehrlich gesagt hab ich das System nie ganz verstanden.',
          ru: 'Честно говоря, я никогда до конца не понимал эту систему.',
          next: 'system',
        },
        {
          id: 'deckel',
          text: 'Und wenn ich den Deckel abreiße?',
          ru: 'А если я отрежу крышку?',
          next: 'deckel',
        },
      ],
    },

    deckel: {
      id: 'deckel',
      messages: [
        { text: 'Genau so macht man das 🙂', ru: 'Именно так и надо 🙂' },
        {
          text: 'Der saubere Teil ins Papier, der fettige in den Rest. Sie lernen schnell.',
          ru: 'Чистую часть — в бумагу, жирную — в остаточный. Вы быстро учитесь.',
        },
      ],
      responses: [
        {
          id: 'lehrerin',
          text: 'Ich hab eine gute Lehrerin.',
          ru: 'У меня хорошая учительница.',
          next: 'system',
        },
        {
          id: 'witz',
          text: 'Das war ein Witz, aber ok 😄',
          ru: 'Это была шутка, но ладно 😄',
          next: 'system',
        },
      ],
    },

    leugnen: {
      id: 'leugnen',
      messages: [
        {
          text: 'Ich hab Sie gesehen. Halb neun, blaue Jacke.',
          ru: 'Я вас видела. Полдевятого, синяя куртка.',
        },
        {
          text: 'Ich will keinen [Ärger machen](aerger-machen), ich sag es Ihnen nur.',
          ru: 'Я не хочу устраивать проблемы, я просто говорю вам.',
        },
      ],
      responses: [
        {
          id: 'erwischt',
          text: 'Ok, erwischt 😅 Tut mir leid.',
          ru: 'Ладно, попался 😅 Извините.',
          next: 'gestehen',
        },
        {
          id: 'alibi',
          text: 'Halb neun war ich noch auf der Arbeit.',
          ru: 'В полдевятого я ещё был на работе.',
          next: 'alibi',
        },
        { id: 'hof', text: 'Sie beobachten den Hof?', ru: 'Вы следите за двором?', next: 'hof' },
      ],
    },

    alibi: {
      id: 'alibi',
      messages: [
        { text: 'Dann war es Viertel vor zehn.', ru: 'Тогда это было без четверти десять.' },
        { text: 'Bei der Jacke bin ich mir aber sicher.', ru: 'Но насчёт куртки я уверена.' },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Ok, ok. Es war meine Schachtel.',
          ru: 'Ладно, ладно. Это была моя коробка.',
          next: 'gestehen',
        },
        {
          id: 'jacke',
          text: 'Die Jacke haben drei Leute im Haus.',
          ru: 'Такая куртка есть у трёх человек в доме.',
          next: 'hof',
        },
      ],
    },

    hof: {
      id: 'hof',
      messages: [
        {
          text: 'Ich sitze abends auf dem Balkon, das ist alles 😄',
          ru: 'Я вечером сижу на балконе, вот и всё 😄',
        },
        {
          text: 'Und ich hol die Tonnen morgens rein, weil das sonst keiner macht. Da sieht man eben, was drin ist.',
          ru: 'И я утром завожу контейнеры обратно, потому что больше никто этого не делает. Вот и видно, что внутри.',
        },
      ],
      responses: [
        {
          id: 'danke',
          text: 'Das stimmt, danke dafür.',
          ru: 'Это правда, спасибо вам за это.',
          next: 'system',
        },
        { id: 'fair', text: 'Ok, das ist fair.', ru: 'Ладно, справедливо.', next: 'system' },
        {
          id: 'polizei',
          text: 'Sie sind also die Müll-Polizei des Hauses 😄',
          ru: 'То есть вы мусорная полиция этого дома 😄',
          next: 'polizei',
        },
      ],
    },

    polizei: {
      id: 'polizei',
      messages: [
        { text: 'Müll-Polizei 😄 Das schreib ich mir auf.', ru: 'Мусорная полиция 😄 Запишу себе.' },
        {
          text: 'Nein, ich hab nur keine Lust, dass die Biotonne wieder nicht geleert wird und das eine Woche im Hof steht.',
          ru: 'Нет, мне просто не хочется, чтобы биоконтейнер снова не вывезли и он неделю стоял во дворе.',
        },
      ],
      responses: [
        { id: 'verstehe', text: 'Verstehe ich.', ru: 'Понимаю.', next: 'system' },
        { id: 'passiert', text: 'Ist das mal passiert?', ru: 'Такое уже было?', next: 'system' },
      ],
    },

    belehrung: {
      id: 'belehrung',
      messages: [
        {
          text: 'Ganz kurz: Gelber Sack ist Verpackung, Blau ist Papier, Braun ist Bio, Grau ist Rest.',
          ru: 'Совсем коротко: жёлтый мешок — упаковка, синий — бумага, коричневый — органика, серый — остальное.',
        },
        {
          text: 'Glas gar nicht in die Tonne, das bringen Sie zum Container an der Ecke. Aber nicht nach 20 Uhr, wegen dem Lärm.',
          ru: 'Стекло вообще не в контейнер, его несут к бакам на углу. Но не после 20 часов, из-за шума.',
        },
      ],
      responses: [
        {
          id: 'zwanzig',
          text: 'Nicht nach 20 Uhr? Ok.',
          ru: 'Не после двадцати? Ок.',
          next: 'system',
        },
        {
          id: 'regeln',
          text: 'Das sind mehr Regeln als bei meiner Steuererklärung 😄',
          ru: 'Правил больше, чем в моей налоговой декларации 😄',
          next: 'system',
        },
        { id: 'pfand', text: 'Und Pfandflaschen?', ru: 'А бутылки с залогом?', next: 'pfand' },
      ],
    },

    pfand: {
      id: 'pfand',
      messages: [
        {
          text: 'In den Laden, da kriegen Sie das [Pfand](pfand) zurück.',
          ru: 'В магазин, там вам вернут залог.',
        },
        {
          text: 'Oder Sie stellen sie neben die Tonne, dann holt sie jemand. Machen hier viele.',
          ru: 'Или поставьте их рядом с контейнером, тогда кто-нибудь заберёт. Здесь многие так делают.',
        },
      ],
      responses: [
        {
          id: 'nett',
          text: 'Das ist eigentlich nett.',
          ru: 'Это, вообще-то, мило.',
          next: 'system',
        },
        {
          id: 'deshalb',
          text: 'Ah, deshalb stehen da immer Flaschen.',
          ru: 'А, вот почему там всегда стоят бутылки.',
          next: 'system',
        },
      ],
    },

    system: {
      id: 'system',
      messages: [
        {
          text: 'Ich hab mir eine Tabelle laminiert und innen an die Tür geklebt.',
          ru: 'Я себе заламинировала табличку и приклеила с внутренней стороны двери.',
        },
        { text: 'Soll ich Ihnen eine ausdrucken?', ru: 'Хотите, я вам распечатаю?' },
      ],
      responses: [
        {
          id: 'ja',
          text: 'Ja, gern eigentlich.',
          ru: 'Да, вообще-то с удовольствием.',
          next: 'tabelle',
        },
        {
          id: 'online',
          text: 'Danke, ich schau kurz online.',
          ru: 'Спасибо, я лучше посмотрю в интернете.',
          next: 'tabelle',
        },
        {
          id: 'laminiert',
          text: 'Laminiert. Sie sind gründlich 🙂',
          ru: 'Заламинировали. Вы основательная 🙂',
          next: 'gruendlich',
        },
      ],
    },

    gruendlich: {
      id: 'gruendlich',
      messages: [
        {
          text: 'Vierzig Jahre Buchhaltung — da wird man [gründlich](gruendlich) 😄',
          ru: 'Сорок лет в бухгалтерии — тут станешь основательной 😄',
        },
        {
          text: 'Ich druck Ihnen eine aus, das dauert zwei Minuten.',
          ru: 'Я вам распечатаю, это две минуты.',
        },
      ],
      responses: [
        { id: 'danke', text: 'Danke, sehr nett.', ru: 'Спасибо, очень мило.', next: 'tabelle' },
        {
          id: 'erklaert',
          text: 'Buchhaltung erklärt einiges 🙂',
          ru: 'Бухгалтерия многое объясняет 🙂',
          next: 'tabelle',
        },
      ],
    },

    tabelle: {
      id: 'tabelle',
      messages: [
        { text: 'Ich leg sie Ihnen in den Briefkasten.', ru: 'Положу вам в почтовый ящик.' },
        {
          text: 'Steht übrigens alles in der [Hausordnung](hausordnung), Punkt sieben. Liest natürlich keiner.',
          ru: 'Кстати, всё это есть в правилах дома, пункт семь. Который, конечно, никто не читает.',
        },
      ],
      responses: [
        {
          id: 'lesen',
          text: 'Ich lese sie heute Abend, versprochen.',
          ru: 'Прочитаю сегодня вечером, обещаю.',
          next: 'gebuehren',
        },
        {
          id: 'wusstenicht',
          text: 'Ich wusste nicht, dass wir eine haben 😅',
          ru: 'Я и не знал, что у нас они есть 😅',
          next: 'gebuehren',
        },
        {
          id: 'punkte',
          text: 'Punkt sieben von wie vielen?',
          ru: 'Пункт семь из скольких?',
          next: 'punkte',
        },
      ],
    },

    punkte: {
      id: 'punkte',
      messages: [
        { text: 'Vierzehn.', ru: 'Из четырнадцати.' },
        {
          text: 'Punkt neun ist mein Favorit: „Das Treppenhaus ist kein Abstellraum." Sagen Sie das mal dem Kinderwagen im zweiten Stock.',
          ru: 'Пункт девять — мой любимый: «Лестничная площадка — не кладовка». Скажите это коляске на втором этаже.',
        },
      ],
      responses: [
        {
          id: 'wagen',
          text: 'Der steht da wirklich immer 😄',
          ru: 'Она там правда всегда стоит 😄',
          next: 'gebuehren',
        },
        {
          id: 'auswendig',
          text: 'Sie kennen die Nummern auswendig?',
          ru: 'Вы помните номера наизусть?',
          next: 'gebuehren',
        },
      ],
    },

    gebuehren: {
      id: 'gebuehren',
      messages: [
        {
          text: 'Und ich [meckere](meckern) nicht zum Spaß:',
          ru: 'И я ворчу не ради удовольствия:',
        },
        {
          text: 'Letztes Jahr hat die Verwaltung die Müllgebühren erhöht, weil die Tonnen dauernd falsch befüllt waren. Das zahlen wir alle mit.',
          ru: 'В прошлом году управляющая компания подняла плату за мусор, потому что контейнеры постоянно наполняли неправильно. Платим за это мы все.',
        },
      ],
      responses: [
        {
          id: 'achso',
          text: 'Ach so, das wusste ich nicht.',
          ru: 'Вот как, этого я не знал.',
          next: 'versoehnung',
        },
        {
          id: 'argument',
          text: 'Ok, das ist ein gutes Argument.',
          ru: 'Ладно, это хороший аргумент.',
          next: 'versoehnung',
        },
        {
          id: 'wieviel',
          text: 'Wie viel war das?',
          ru: 'И насколько подняли?',
          next: 'versoehnung',
        },
      ],
    },

    versoehnung: {
      id: 'versoehnung',
      messages: [
        { text: 'So, jetzt hab ich genug gemeckert 😄', ru: 'Так, ну всё, поворчала достаточно 😄' },
        {
          text: 'Ich hab Kirschen vom Balkon, viel zu viele. Wenn Sie mögen, klingeln Sie einfach.',
          ru: 'У меня черешня с балкона, её слишком много. Если хотите — просто позвоните в дверь.',
        },
      ],
      responses: [
        { id: 'gern', text: 'Sehr gern, danke!', ru: 'С удовольствием, спасибо!', next: 'ende' },
        {
          id: 'wendung',
          text: 'Das ist jetzt eine überraschende Wendung 😄',
          ru: 'Вот это неожиданный поворот 😄',
          next: 'ende',
        },
        {
          id: 'revanche',
          text: 'Ich revanchiere mich mit perfekt sortiertem Müll.',
          ru: 'Отблагодарю идеально рассортированным мусором.',
          next: 'ende',
        },
      ],
    },

    ende: {
      id: 'ende',
      messages: [
        { text: '[Abgemacht](abgemacht) 😄 Gute Nacht!', ru: 'Договорились 😄 Доброй ночи!' },
      ],
      responses: [],
    },
  },
}
