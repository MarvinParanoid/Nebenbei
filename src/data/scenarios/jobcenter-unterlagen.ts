import type { Scenario } from '../../types'

/**
 * Amtsdeutsch, but with a human on the other end: Frau Wolf needs two
 * documents and would rather extend the deadline than start a Rückforderung.
 * The vocabulary here (Unterlagen, Frist, Bescheid, nachreichen) is the part
 * that actually decides how a real appointment goes.
 */
export const jobcenterUnterlagen: Scenario = {
  id: 'jobcenter-unterlagen',
  title: 'Es fehlen noch Unterlagen',
  context: 'Frau Wolf vom Jobcenter, zwei Wochen vor deinem Termin.',
  contextLine: 'Jobcenter · Sachbearbeiterin',
  duration: '4 min',
  level: 'B2',
  icon: 'form',
  character: { name: 'Frau Wolf', status: 'Jobcenter' },
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        {
          text: 'Guten Tag, hier ist Frau Wolf vom Jobcenter.',
          ru: 'Добрый день, это фрау Вольф из Jobcenter.',
        },
        {
          text: 'Es geht um Ihren Antrag. Uns fehlen noch [Unterlagen](unterlagen): die Anlage EK und Ihre letzten drei Kontoauszüge.',
          ru: 'Речь о вашем заявлении. От вас не хватает документов: Anlage EK и трёх последних выписок со счёта.',
        },
      ],
      responses: [
        {
          id: 'upload',
          text: 'Die hab ich letzte Woche hochgeladen.',
          ru: 'Я их загрузил на прошлой неделе.',
          next: 'hochgeladen',
        },
        {
          id: 'anlage',
          text: 'Anlage EK? Was ist das genau?',
          ru: 'Anlage EK? Что это именно?',
          next: 'anlage',
        },
        {
          id: 'termin',
          text: 'Ich bringe alles beim Termin mit.',
          ru: 'Я принесу всё на приём.',
          next: 'mitbringen',
        },
      ],
    },

    hochgeladen: {
      id: 'hochgeladen',
      messages: [
        {
          text: 'Im Portal sehe ich nur den Mietvertrag.',
          ru: 'В портале я вижу только договор аренды.',
        },
        {
          text: 'Manchmal kommt der Upload nicht an. Ich sag das nicht gern, aber schicken Sie es bitte nochmal — oder werfen Sie es unten in den Briefkasten.',
          ru: 'Иногда загрузка не доходит. Мне неприятно это говорить, но пришлите, пожалуйста, ещё раз — или бросьте внизу в почтовый ящик.',
        },
      ],
      responses: [
        {
          id: 'post',
          text: 'Per Post, im Jahr 2026? 😄',
          ru: 'По почте, в 2026 году? 😄',
          next: 'post',
        },
        {
          id: 'nochmal',
          text: 'Ok, ich lade es nochmal hoch.',
          ru: 'Ок, загружу ещё раз.',
          next: 'nochmal',
        },
        {
          id: 'wieder',
          text: 'Und wenn es wieder nicht ankommt?',
          ru: 'А если снова не дойдёт?',
          next: 'nochmal',
        },
      ],
    },

    post: {
      id: 'post',
      messages: [
        { text: 'Ich weiß 😄', ru: 'Знаю 😄' },
        {
          text: 'Das Portal ist neu, der Briefkasten funktioniert seit vierzig Jahren. Nehmen Sie, was schneller geht.',
          ru: 'Портал новый, а почтовый ящик работает сорок лет. Берите то, что быстрее.',
        },
      ],
      responses: [
        {
          id: 'briefkasten',
          text: 'Dann komm ich morgen vorbei und werfe es ein.',
          ru: 'Тогда зайду завтра и брошу в ящик.',
          next: 'nochmal',
        },
        {
          id: 'beides',
          text: 'Ich mach beides, sicherheitshalber.',
          ru: 'Сделаю и то, и другое, для надёжности.',
          next: 'nochmal',
        },
      ],
    },

    nochmal: {
      id: 'nochmal',
      messages: [
        {
          text: 'Gut. Schreiben Sie Ihre Nummer mit drauf, dann findet es zu mir.',
          ru: 'Хорошо. Напишите сверху свой номер, тогда оно дойдёт до меня.',
        },
        {
          text: 'Ich schau am Freitag nach und melde mich, wenn wieder was fehlt.',
          ru: 'Я посмотрю в пятницу и напишу, если снова чего-то не хватает.',
        },
      ],
      responses: [
        { id: 'danke', text: 'Danke, das ist nett.', ru: 'Спасибо, это мило.', next: 'einkommen' },
        {
          id: 'nummer',
          text: 'Meine Nummer — die vom Bescheid oben rechts?',
          ru: 'Мой номер — тот, что в решении сверху справа?',
          next: 'einkommen',
        },
      ],
    },

    anlage: {
      id: 'anlage',
      messages: [
        { text: 'Die Anlage EK ist für Einkommen.', ru: 'Anlage EK — это про доходы.' },
        {
          text: 'Sie haben nebenbei ein paar Stunden gearbeitet, richtig? Dann brauchen wir die Bescheinigung vom Arbeitgeber.',
          ru: 'Вы подрабатывали несколько часов, верно? Тогда нам нужна справка от работодателя.',
        },
      ],
      responses: [
        {
          id: 'stunden',
          text: 'Ja, zwölf Stunden im Monat.',
          ru: 'Да, двенадцать часов в месяц.',
          next: 'einkommen',
        },
        {
          id: 'aushilfe',
          text: 'Das waren zwei Wochen Aushilfe im Café.',
          ru: 'Это были две недели подработки в кофейне.',
          next: 'einkommen',
        },
        {
          id: 'wenig',
          text: 'Muss ich das angeben? Es sind 200 Euro.',
          ru: 'Мне это нужно указывать? Там 200 евро.',
          next: 'angeben',
        },
      ],
    },

    angeben: {
      id: 'angeben',
      messages: [
        {
          text: 'Ja, [angeben](angeben) müssen Sie alles — auch 20 Euro.',
          ru: 'Да, указывать нужно всё — даже 20 евро.',
        },
        {
          text: 'Wenn es später auffällt, wird eine [Rückforderung](rueckforderung) daraus — und das will keiner, ich am wenigsten.',
          ru: 'Если это выяснится позже, выйдет требование вернуть деньги — а этого никто не хочет, я меньше всех.',
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Verstanden, dann gebe ich alles an.',
          ru: 'Понятно, тогда укажу всё.',
          next: 'einkommen',
        },
        {
          id: 'wieoft',
          text: 'Und wenn sich das jeden Monat ändert?',
          ru: 'А если это каждый месяц меняется?',
          next: 'einkommen',
        },
      ],
    },

    mitbringen: {
      id: 'mitbringen',
      messages: [
        { text: 'Das können Sie machen.', ru: 'Так можно.' },
        {
          text: 'Nur: dann liegt der Antrag bis zum 24. — und die Zahlung auch. Vorher [bewilligen](bewilligen) kann ich nichts.',
          ru: 'Только: тогда заявление лежит до 24-го — и выплата тоже. Раньше я ничего одобрить не могу.',
        },
      ],
      responses: [
        {
          id: 'vorher',
          text: 'Ach so. Dann schicke ich es vorher.',
          ru: 'Вот как. Тогда пришлю заранее.',
          next: 'einkommen',
        },
        {
          id: 'egal',
          text: 'Wie lange dauert es danach?',
          ru: 'А сколько это потом занимает?',
          next: 'einkommen',
        },
        {
          id: 'geld',
          text: 'Ich brauche das Geld eher, ehrlich gesagt.',
          ru: 'Мне деньги нужны раньше, честно говоря.',
          next: 'einkommen',
        },
      ],
    },

    einkommen: {
      id: 'einkommen',
      messages: [
        {
          text: 'Dann also: die Bescheinigung und die Kontoauszüge.',
          ru: 'Тогда так: справка и выписки со счёта.',
        },
        {
          text: '[Frist](frist) ist der 15. Wenn Sie das nicht schaffen, sagen Sie mir Bescheid — dann verlängere ich.',
          ru: 'Срок — 15-е. Если не успеваете, дайте знать — тогда я продлю.',
        },
      ],
      responses: [
        {
          id: 'schaffe',
          text: 'Bis zum 15. schaff ich das.',
          ru: 'До 15-го я успею.',
          next: 'frist',
        },
        {
          id: 'arbeitgeber',
          text: 'Mein Arbeitgeber antwortet nie schnell.',
          ru: 'Мой работодатель никогда быстро не отвечает.',
          next: 'arbeitgeber',
        },
        {
          id: 'sicher',
          text: 'Können Sie sicherheitshalber gleich verlängern?',
          ru: 'Может, продлите сразу, для надёжности?',
          next: 'frist',
        },
      ],
    },

    arbeitgeber: {
      id: 'arbeitgeber',
      messages: [
        { text: 'Das kenne ich.', ru: 'Это мне знакомо.' },
        {
          text: 'Schicken Sie erst mal, was Sie haben, und schreiben dazu, dass der Rest [nachkommt](nachreichen). Dann ist die Frist gewahrt.',
          ru: 'Пришлите сначала то, что есть, и припишите, что остальное дошлёте. Тогда срок будет соблюдён.',
        },
      ],
      responses: [
        { id: 'gut', text: 'Das mache ich so.', ru: 'Так и сделаю.', next: 'frist' },
        {
          id: 'formlos',
          text: 'Einfach ein normaler Satz, kein Formular?',
          ru: 'Просто обычной фразой, без формуляра?',
          next: 'frist',
        },
      ],
    },

    frist: {
      id: 'frist',
      messages: [
        { text: 'Notiert.', ru: 'Записала.' },
        {
          text: 'Und Ihr Termin am 24. um 9:15 — passt der noch?',
          ru: 'И ваш приём 24-го в 9:15 — он ещё подходит?',
        },
      ],
      responses: [
        { id: 'passt', text: 'Ja, 9:15 passt.', ru: 'Да, 9:15 подходит.', next: 'termin-ok' },
        {
          id: 'kita',
          text: 'Um 9:15 bringe ich mein Kind in die Kita.',
          ru: 'В 9:15 я вожу ребёнка в садик.',
          next: 'termin-neu',
        },
        {
          id: 'telefon',
          text: 'Geht das auch telefonisch?',
          ru: 'А можно по телефону?',
          next: 'telefon',
        },
      ],
    },

    telefon: {
      id: 'telefon',
      messages: [
        {
          text: 'Beim ersten Termin leider nicht, da muss ich Sie einmal sehen.',
          ru: 'На первом приёме, к сожалению, нет — вас нужно один раз увидеть.',
        },
        {
          text: 'Danach gern telefonisch, dann sparen Sie sich den Weg.',
          ru: 'Дальше охотно по телефону, тогда не придётся ехать.',
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Alles klar, dann komme ich.',
          ru: 'Всё ясно, тогда приду.',
          next: 'termin-ok',
        },
        {
          id: 'andere',
          text: 'Dann bitte einen anderen Tag.',
          ru: 'Тогда, пожалуйста, другой день.',
          next: 'termin-neu',
        },
      ],
    },

    'termin-neu': {
      id: 'termin-neu',
      messages: [
        { text: 'Ich hab den 26. um 11 Uhr frei.', ru: 'У меня свободно 26-го в 11 часов.' },
        {
          text: 'Oder Anfang nächsten Monats — dann aber erst der 8.',
          ru: 'Или в начале следующего месяца — но тогда только 8-го.',
        },
      ],
      responses: [
        {
          id: 'elf',
          text: 'Der 26. um 11 ist perfekt.',
          ru: '26-го в 11 — идеально.',
          next: 'termin-ok',
        },
        {
          id: 'achter',
          text: 'Lieber der 8., dann hab ich alle Papiere.',
          ru: 'Лучше 8-го, тогда у меня будут все бумаги.',
          next: 'termin-ok',
        },
        {
          id: 'egal',
          text: 'Nehmen Sie den früheren.',
          ru: 'Давайте тот, что раньше.',
          next: 'termin-ok',
        },
      ],
    },

    'termin-ok': {
      id: 'termin-ok',
      messages: [
        { text: 'Sehr gut, ich trage das ein.', ru: 'Очень хорошо, вношу.' },
        {
          text: 'Bringen Sie den Ausweis mit. Und wenn Sie Fragen zum [Bescheid](der-bescheid) haben, schreiben Sie vorher — dann gehen wir das im Termin durch.',
          ru: 'Возьмите с собой удостоверение. И если будут вопросы по решению — напишите заранее, тогда разберём их на приёме.',
        },
      ],
      responses: [
        { id: 'danke', text: 'Danke, mache ich.', ru: 'Спасибо, так и сделаю.', next: 'abschied' },
        {
          id: 'frage',
          text: 'Eine Frage jetzt: was steht da eigentlich drin?',
          ru: 'Один вопрос сейчас: что там вообще написано?',
          next: 'bescheid',
        },
        {
          id: 'netter',
          text: 'Sie sind netter als der Bescheid klingt 😄',
          ru: 'Вы приятнее, чем звучит это решение 😄',
          next: 'nett',
        },
      ],
    },

    bescheid: {
      id: 'bescheid',
      messages: [
        {
          text: 'Kurz gesagt: die Leistung ist bewilligt, aber vorläufig.',
          ru: 'Коротко: выплата одобрена, но предварительно.',
        },
        {
          text: 'Weil das Einkommen schwankt, rechnen wir am Ende ab. Kann sein, dass Sie was zurückzahlen — kann aber auch sein, dass Sie was bekommen.',
          ru: 'Так как доход меняется, в конце мы всё пересчитаем. Может выйти, что вы что-то вернёте — а может и так, что вы что-то получите.',
        },
      ],
      responses: [
        { id: 'ok', text: 'Ok, das klingt fair.', ru: 'Ок, звучит справедливо.', next: 'abschied' },
        {
          id: 'sparen',
          text: 'Dann leg ich jeden Monat was zur Seite.',
          ru: 'Тогда буду каждый месяц откладывать.',
          next: 'abschied',
        },
      ],
    },

    nett: {
      id: 'nett',
      messages: [
        {
          text: 'Die Bescheide schreibe nicht ich, die schreibt das System 😄',
          ru: 'Решения пишу не я, их пишет система 😄',
        },
        {
          text: 'Wenn ein Satz unverständlich ist, fragen Sie einfach. Dafür bin ich da.',
          ru: 'Если какая-то фраза непонятна, просто спрашивайте. Я для этого и есть.',
        },
      ],
      responses: [
        {
          id: 'danke',
          text: 'Das nehme ich beim Wort. Danke!',
          ru: 'Ловлю на слове. Спасибо!',
          next: 'abschied',
        },
        {
          id: 'alle',
          text: 'Das sollten mehr Leute wissen.',
          ru: 'Это стоило бы знать большему числу людей.',
          next: 'abschied',
        },
      ],
    },

    abschied: {
      id: 'abschied',
      messages: [
        {
          text: 'Ich schicke Ihnen die Liste nochmal per Post, dann haben Sie es schwarz auf weiß.',
          ru: 'Я пришлю вам список ещё раз по почте, тогда он будет у вас на бумаге.',
        },
        {
          text: 'Und wenn etwas unklar ist: anrufen ist schneller als schreiben.',
          ru: 'И если что-то непонятно: позвонить быстрее, чем написать.',
        },
      ],
      responses: [
        {
          id: 'gut',
          text: 'Gut zu wissen, danke.',
          ru: 'Хорошо, буду знать, спасибо.',
          next: 'ende',
        },
        {
          id: 'anrufen',
          text: 'Dann rufe ich lieber an 🙂',
          ru: 'Тогда я лучше позвоню 🙂',
          next: 'ende',
        },
      ],
    },

    ende: {
      id: 'ende',
      messages: [
        {
          text: 'Dann bis zum Termin. Und schicken Sie die Unterlagen, ja? Auf Wiederhören!',
          ru: 'Тогда до приёма. И пришлите документы, хорошо? До свидания!',
        },
      ],
      responses: [],
    },
  },
}
