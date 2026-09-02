import type { Scenario } from '../../types'

/**
 * "Der nächste freie Termin ist im März." Herr Ziegler knows exactly how
 * absurd that is and hands over the insider tricks — the 7 a.m. refresh, all
 * districts at once, the walk-in Notfall-Termin.
 */
export const buergeramtTermin: Scenario = {
  id: 'buergeramt-termin',
  title: 'Kein Termin frei',
  context: 'Du brauchst eine Anmeldung. Das Bürgeramt hat andere Pläne.',
  contextLine: 'Bürgeramt · Terminvergabe',
  duration: '3 min',
  level: 'B2',
  hue: 208,
  character: { name: 'Herr Ziegler', status: 'Bürgeramt Mitte' },
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        {
          text: 'Bürgeramt Mitte, Ziegler, guten Tag.',
          ru: 'Bürgeramt Mitte, Циглер, добрый день.',
        },
        {
          text: 'Sie wollten einen Termin zur [Anmeldung](anmeldung)? Der nächste freie ist am 12. März.',
          ru: 'Вы хотели талон на прописку? Ближайший свободный — 12 марта.',
        },
      ],
      responses: [
        { id: 'maerz', text: 'März? Es ist Oktober.', ru: 'Март? Сейчас октябрь.', next: 'maerz' },
        {
          id: 'frist',
          text: 'Ich muss mich innerhalb von zwei Wochen anmelden.',
          ru: 'Я должен прописаться в течение двух недель.',
          next: 'frist',
        },
        {
          id: 'anders',
          text: 'Gibt es keine andere Möglichkeit?',
          ru: 'А другого варианта нет?',
          next: 'maerz',
        },
      ],
    },

    maerz: {
      id: 'maerz',
      messages: [
        { text: 'Ich weiß.', ru: 'Я знаю.' },
        {
          text: 'Zwei Kolleginnen sind krank, und die Termine gehen morgens um sieben online rein. Um 7:02 sind sie weg.',
          ru: 'Две коллеги на больничном, а талоны выкладывают онлайн утром в семь. К 7:02 их уже нет.',
        },
      ],
      responses: [
        {
          id: 'sieben',
          text: 'Also muss ich um sieben am Rechner sitzen?',
          ru: 'То есть мне нужно в семь сидеть у компьютера?',
          next: 'online',
        },
        {
          id: 'vorbei',
          text: 'Und wenn ich einfach vorbeikomme?',
          ru: 'А если я просто зайду?',
          next: 'notfall',
        },
        { id: 'absurd', text: 'Das ist doch absurd.', ru: 'Это же абсурд.', next: 'absurd' },
      ],
    },

    frist: {
      id: 'frist',
      messages: [
        { text: 'Formal ja, zwei Wochen.', ru: 'Формально да, две недели.' },
        {
          text: 'Praktisch zählt, dass Sie es versucht haben. Machen Sie Screenshots von der Terminsuche, das reicht als [Nachweis](nachweis), wenn jemand fragt.',
          ru: 'Практически важно, что вы пытались. Делайте скриншоты поиска талонов — этого хватит как подтверждение, если кто-то спросит.',
        },
      ],
      responses: [
        {
          id: 'screenshots',
          text: 'Screenshots, gut. Und dann?',
          ru: 'Скриншоты, хорошо. А дальше?',
          next: 'online',
        },
        {
          id: 'bussgeld',
          text: 'Also kein Bußgeld?',
          ru: 'То есть штрафа не будет?',
          next: 'absurd',
        },
        {
          id: 'schneller',
          text: 'Trotzdem: geht es irgendwie schneller?',
          ru: 'И всё же: как-то быстрее можно?',
          next: 'online',
        },
      ],
    },

    absurd: {
      id: 'absurd',
      messages: [
        { text: 'Da widerspreche ich Ihnen nicht 😄', ru: 'Тут я вам не возражу 😄' },
        {
          text: 'Ich sitze hier und sage den ganzen Tag „März". Also hören Sie kurz zu, dann klappt es vielleicht diese Woche.',
          ru: 'Я сижу здесь и целый день говорю «март». Так что послушайте минутку — может, получится уже на этой неделе.',
        },
      ],
      responses: [
        { id: 'ohr', text: 'Ich bin ganz Ohr.', ru: 'Я весь внимание.', next: 'online' },
        { id: 'gern', text: 'Sehr gern, danke.', ru: 'Очень охотно, спасибо.', next: 'online' },
      ],
    },

    online: {
      id: 'online',
      messages: [
        {
          text: 'Sieben Uhr, Seite neu laden, schnell klicken.',
          ru: 'Семь утра, обновить страницу, быстро кликать.',
        },
        {
          text: 'Und wählen Sie nicht nur Mitte aus — machen Sie alle Bezirke an, dann sehen Sie viel mehr.',
          ru: 'И выбирайте не только Mitte — отметьте все районы, тогда увидите намного больше.',
        },
      ],
      responses: [
        { id: 'alle', text: 'Alle Bezirke, notiert.', ru: 'Все районы, записал.', next: 'bezirke' },
        {
          id: 'egal',
          text: 'Mir ist egal, wohin ich fahre.',
          ru: 'Мне всё равно, куда ехать.',
          next: 'bezirke',
        },
        {
          id: 'warum',
          text: 'Warum steht das nirgendwo?',
          ru: 'А почему об этом нигде не написано?',
          next: 'bezirke',
        },
      ],
    },

    bezirke: {
      id: 'bezirke',
      messages: [
        { text: 'Weil es dann alle machen würden 😄', ru: 'Потому что тогда так делали бы все 😄' },
        {
          text: 'Offiziell sage ich Ihnen das natürlich nicht.',
          ru: 'Официально я вам этого, конечно, не говорил.',
        },
      ],
      responses: [
        {
          id: 'gehoert',
          text: 'Ich hab nichts gehört 🙂',
          ru: 'Я ничего не слышал 🙂',
          next: 'notfall',
        },
        { id: 'danke', text: 'Danke, ehrlich.', ru: 'Спасибо, честно.', next: 'notfall' },
        {
          id: 'trotzdem',
          text: 'Und wenn trotzdem nichts frei ist?',
          ru: 'А если всё равно ничего не будет свободно?',
          next: 'notfall',
        },
      ],
    },

    notfall: {
      id: 'notfall',
      messages: [
        {
          text: 'Dann kommen Sie morgens ohne Termin [vorbei](vorbeikommen) und fragen nach einem Notfall-Termin.',
          ru: 'Тогда приходите утром без талона и спрашивайте про Notfall-Termin.',
        },
        {
          text: 'Wenn Sie zeigen können, dass es dringend ist — Arbeitsvertrag, Kita, Krankenkasse — geht meistens was.',
          ru: 'Если сможете показать, что срочно — трудовой договор, садик, страховая — обычно что-то находится.',
        },
      ],
      responses: [
        {
          id: 'vertrag',
          text: 'Arbeitsvertrag hab ich. Wie früh muss ich da sein?',
          ru: 'Трудовой договор есть. Насколько рано нужно прийти?',
          next: 'frueh',
        },
        {
          id: 'frueh',
          text: 'Wie früh ist „morgens"?',
          ru: 'А насколько рано это «утром»?',
          next: 'frueh',
        },
        {
          id: 'dringend',
          text: 'Was gilt denn als dringend?',
          ru: 'А что считается срочным?',
          next: 'dringend',
        },
      ],
    },

    dringend: {
      id: 'dringend',
      messages: [
        {
          text: 'Alles, wo Ihnen sonst Geld oder ein Platz wegläuft.',
          ru: 'Всё, из-за чего иначе уплывут деньги или место.',
        },
        {
          text: 'Arbeitsvertrag mit Startdatum, Kita-Zusage, Krankenkasse, Elterngeld. „Ich möchte das erledigen" reicht nicht 😄',
          ru: 'Трудовой договор с датой начала, подтверждение садика, страховая, Elterngeld. «Я хотел бы это сделать» не подходит 😄',
        },
      ],
      responses: [
        {
          id: 'vertrag',
          text: 'Arbeitsvertrag hab ich, mit Startdatum.',
          ru: 'Трудовой договор есть, с датой начала.',
          next: 'frueh',
        },
        {
          id: 'kita',
          text: 'Kita-Zusage liegt hier auch.',
          ru: 'Подтверждение из садика тоже здесь.',
          next: 'frueh',
        },
        {
          id: 'nichts',
          text: 'Und wenn ich nichts davon habe?',
          ru: 'А если у меня ничего из этого нет?',
          next: 'frueh',
        },
      ],
    },

    frueh: {
      id: 'frueh',
      messages: [
        { text: 'Halb acht ist realistisch.', ru: 'Полвосьмого — реалистично.' },
        {
          text: 'Um acht [stehen](schlange-stehen) schon zwanzig Leute vor der Tür. Nehmen Sie einen Kaffee mit.',
          ru: 'В восемь перед дверью уже стоят двадцать человек. Возьмите с собой кофе.',
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Halb acht. Ok, das mache ich.',
          ru: 'Полвосьмого. Ок, так и сделаю.',
          next: 'nachweise',
        },
        {
          id: 'kaffee',
          text: 'Kaffee ist eingeplant 😄',
          ru: 'Кофе запланирован 😄',
          next: 'nachweise',
        },
      ],
    },

    nachweise: {
      id: 'nachweise',
      messages: [
        {
          text: 'Bringen Sie alles mit: Pass, Mietvertrag, Wohnungsgeberbestätigung.',
          ru: 'Возьмите с собой всё: паспорт, договор аренды, Wohnungsgeberbestätigung.',
        },
        {
          text: 'Ohne die [Wohnungsgeberbestätigung](wohnungsgeberbestaetigung) geht gar nichts. Das vergessen fast alle.',
          ru: 'Без Wohnungsgeberbestätigung вообще ничего не выйдет. Об этом забывают почти все.',
        },
      ],
      responses: [
        {
          id: 'habe',
          text: 'Die hab ich vom Vermieter, gut.',
          ru: 'Она у меня от арендодателя, хорошо.',
          next: 'abschluss',
        },
        { id: 'was', text: 'Wohnungsgeber-was?', ru: 'Wohnungsgeber-что?', next: 'wgb' },
        {
          id: 'vermieter',
          text: 'Mein Vermieter antwortet seit drei Wochen nicht.',
          ru: 'Мой арендодатель не отвечает уже три недели.',
          next: 'vermieter',
        },
      ],
    },

    wgb: {
      id: 'wgb',
      messages: [
        {
          text: 'Ein Blatt Papier vom Vermieter: dass Sie da wirklich wohnen, seit wann, mit Adresse.',
          ru: 'Один лист от арендодателя: что вы там действительно живёте, с какого числа, с адресом.',
        },
        {
          text: 'Es gibt ein Formular auf unserer Seite. Zwei Minuten, wenn er es ausfüllt.',
          ru: 'На нашем сайте есть формуляр. Две минуты, если он его заполнит.',
        },
      ],
      responses: [
        {
          id: 'schicke',
          text: 'Das schicke ich ihm heute.',
          ru: 'Отправлю ему сегодня.',
          next: 'abschluss',
        },
        {
          id: 'selbst',
          text: 'Kann ich das selbst ausfüllen?',
          ru: 'А я могу заполнить сам?',
          next: 'zustaendig',
        },
      ],
    },

    vermieter: {
      id: 'vermieter',
      messages: [
        {
          text: 'Er muss unterschreiben, das kann Ihnen niemand abnehmen.',
          ru: 'Он должен подписать, это за вас никто не сделает.',
        },
        {
          text: 'Schreiben Sie ihm, dass er dazu verpflichtet ist — zwei Wochen, sonst Bußgeld. Das wirkt meistens sofort 😄',
          ru: 'Напишите ему, что он обязан это сделать — две недели, иначе штраф. Обычно действует сразу 😄',
        },
      ],
      responses: [
        { id: 'wirkt', text: 'Das probier ich aus.', ru: 'Попробую.', next: 'abschluss' },
        {
          id: 'streng',
          text: 'Klingt streng, aber gut.',
          ru: 'Звучит строго, но хорошо.',
          next: 'abschluss',
        },
        {
          id: 'zustaendig',
          text: 'Sind Sie dafür überhaupt zuständig?',
          ru: 'А вы вообще этим занимаетесь?',
          next: 'zustaendig',
        },
      ],
    },

    zustaendig: {
      id: 'zustaendig',
      messages: [
        {
          text: 'Streng genommen bin ich dafür nicht [zuständig](zustaendig) 😄',
          ru: 'Строго говоря, это не моя компетенция 😄',
        },
        {
          text: 'Aber Sie stehen sonst im März wieder hier. Dann sagen wir mal: heute schon.',
          ru: 'Но иначе вы в марте опять будете стоять здесь. Так что скажем так: сегодня — моя.',
        },
      ],
      responses: [
        {
          id: 'danke',
          text: 'Dafür ein großes Danke.',
          ru: 'За это большое спасибо.',
          next: 'abschluss',
        },
        {
          id: 'beste',
          text: 'Sie sind der beste Beamte, mit dem ich geredet hab.',
          ru: 'Вы лучший чиновник, с которым я разговаривал.',
          next: 'abschluss',
        },
      ],
    },

    abschluss: {
      id: 'abschluss',
      messages: [
        {
          text: 'Eins noch: nehmen Sie die Bestätigung im Original mit, keine Kopie.',
          ru: 'Ещё одно: возьмите подтверждение в оригинале, не копию.',
        },
        {
          text: 'Und die Meldebescheinigung gleich mit beantragen — die brauchen Sie danach überall.',
          ru: 'И сразу закажите Meldebescheinigung — она понадобится вам потом везде.',
        },
      ],
      responses: [
        {
          id: 'original',
          text: 'Original, notiert. Danke!',
          ru: 'Оригинал, записал. Спасибо!',
          next: 'ende',
        },
        {
          id: 'wozu',
          text: 'Wozu braucht man die Meldebescheinigung?',
          ru: 'А зачем нужна Meldebescheinigung?',
          next: 'ende',
        },
        {
          id: 'zwei',
          text: 'Kann ich zwei Exemplare bekommen?',
          ru: 'А можно два экземпляра?',
          next: 'ende',
        },
      ],
    },

    ende: {
      id: 'ende',
      messages: [
        {
          text: 'Dann viel Erfolg. Und wirklich: sieben Uhr 😄 Auf Wiederhören!',
          ru: 'Тогда удачи. И правда: семь утра 😄 До свидания!',
        },
      ],
      responses: [],
    },
  },
}
