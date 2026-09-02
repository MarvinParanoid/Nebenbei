import type { GlossaryEntry, GlossaryId } from '../types'

/**
 * Shared chunk dictionary. Messages reference these by id via inline
 * annotations: `[so gegen 8](so-gegen-acht)`.
 *
 * The bias here is towards conversational chunks rather than single words —
 * things you can drop into a real chat unchanged.
 */
export const glossary: Record<GlossaryId, GlossaryEntry> = {
  'dabei-sein': {
    phrase: 'dabei sein',
    translation: 'быть с нами / присоединиться, участвовать',
    example: 'Wir gehen morgen ins Kino — bist du dabei?',
    exampleTranslation: 'Мы завтра идём в кино — ты с нами?',
  },
  'so-gegen-acht': {
    phrase: 'so gegen acht',
    translation: 'где-то около восьми',
    example: 'Ich komme so gegen acht, ok?',
    exampleTranslation: 'Я приду где-то около восьми, ок?',
  },
  'mal-schauen': {
    phrase: 'mal schauen',
    translation: 'посмотрим / там видно будет',
    example: 'Vielleicht komme ich mit, mal schauen.',
    exampleTranslation: 'Может, пойду с вами, посмотрим.',
  },
  'kein-stress': {
    phrase: 'kein Stress',
    translation: 'без напряга / да ничего страшного',
    example: 'Wenn du später kommst, kein Stress.',
    exampleTranslation: 'Если придёшь позже — ничего страшного.',
  },
  'wie-siehts-bei-dir-aus': {
    phrase: "wie sieht's bei dir aus?",
    translation: 'как у тебя дела / как насчёт тебя?',
    example: "Ich hab am Samstag Zeit. Wie sieht's bei dir aus?",
    exampleTranslation: 'У меня в субботу есть время. А у тебя как?',
  },
  'passt-mir-gut': {
    phrase: 'passt mir gut',
    translation: 'мне подходит / меня устраивает',
    example: 'Freitag um sieben passt mir gut.',
    exampleTranslation: 'Пятница в семь мне подходит.',
  },
  'lust-haben': {
    phrase: 'Lust haben',
    translation: 'иметь желание, хотеть (что-то делать)',
    example: 'Hast du Lust, morgen spazieren zu gehen?',
    exampleTranslation: 'Не хочешь завтра прогуляться?',
  },
  'bescheid-sagen': {
    phrase: 'Bescheid sagen',
    translation: 'дать знать, сообщить',
    example: 'Sag mir Bescheid, wenn du losfährst.',
    exampleTranslation: 'Дай знать, когда поедешь.',
  },
  'ehrlich-gesagt': {
    phrase: 'ehrlich gesagt',
    translation: 'честно говоря',
    example: 'Ehrlich gesagt hab ich keine Lust mehr.',
    exampleTranslation: 'Честно говоря, мне уже не хочется.',
  },
  'platt-sein': {
    phrase: 'platt sein',
    translation: 'быть вымотанным, без сил',
    example: 'Nach der Arbeit bin ich immer total platt.',
    exampleTranslation: 'После работы я всегда совершенно вымотан.',
  },
  rumsitzen: {
    phrase: 'rumsitzen',
    translation: 'сидеть без дела, просто сидеть',
    example: 'Wir sitzen nur rum und reden.',
    exampleTranslation: 'Мы просто сидим и болтаем.',
  },
  'was-ohne': {
    phrase: 'was ohne',
    translation: 'что-нибудь безалкогольное (букв. «что-то без»)',
    example: 'Für mich bitte was ohne, ich fahre noch.',
    exampleTranslation: 'Мне что-нибудь без алкоголя, я ещё за рулём.',
  },
  'drin-sein': {
    phrase: 'da ist was drin',
    translation: 'это возможно / это реально устроить',
    example: 'Am Sonntag ist vielleicht was drin.',
    exampleTranslation: 'В воскресенье, может, получится.',
  },
  'auf-jeden-fall': {
    phrase: 'auf jeden Fall',
    translation: 'точно, обязательно, в любом случае',
    example: 'Ich komme auf jeden Fall.',
    exampleTranslation: 'Я точно приду.',
  },
  gleich: {
    phrase: 'gleich',
    translation: 'сейчас, через минуту (о ближайшем будущем)',
    example: 'Ich bin gleich da.',
    exampleTranslation: 'Я сейчас буду.',
  },
  'keine-ahnung': {
    phrase: 'keine Ahnung',
    translation: 'без понятия, не знаю',
    example: 'Keine Ahnung, wann er kommt.',
    exampleTranslation: 'Без понятия, когда он придёт.',
  },
  'macht-nichts': {
    phrase: 'macht nichts',
    translation: 'ничего страшного',
    example: 'Du hast es vergessen? Macht nichts.',
    exampleTranslation: 'Ты забыл? Ничего страшного.',
  },
  'kommt-drauf-an': {
    phrase: 'kommt drauf an',
    translation: 'смотря как / зависит от обстоятельств',
    example: 'Kommt drauf an, wie teuer es ist.',
    exampleTranslation: 'Смотря насколько это дорого.',
  },
  'hier-oder-zum-mitnehmen': {
    phrase: 'hier oder zum Mitnehmen?',
    translation: 'здесь или с собой?',
    example: 'Zwei Croissants — hier oder zum Mitnehmen?',
    exampleTranslation: 'Два круассана — здесь или с собой?',
  },
  'ach-so': {
    phrase: 'ach so',
    translation: 'а, вот как / понятно',
    example: 'Ach so, dann hab ich dich falsch verstanden.',
    exampleTranslation: 'А, вот как — значит, я тебя неправильно понял.',
  },
  'klingt-gut': {
    phrase: 'klingt gut',
    translation: 'звучит хорошо, годится',
    example: 'Pizza und Film? Klingt gut.',
    exampleTranslation: 'Пицца и фильм? Звучит хорошо.',
  },
  feierabend: {
    phrase: 'Feierabend',
    translation: 'конец рабочего дня',
    example: 'Ich mach jetzt Feierabend.',
    exampleTranslation: 'Я на сегодня заканчиваю работу.',
  },
  'im-stress-sein': {
    phrase: 'im Stress sein',
    translation: 'быть в запаре, зашиваться',
    example: 'Frag ihn später, er ist total im Stress.',
    exampleTranslation: 'Спроси его позже, он совсем в запаре.',
  },
  'sich-melden': {
    phrase: 'sich melden',
    translation: 'выйти на связь, написать/позвонить',
    example: 'Ich melde mich morgen bei dir.',
    exampleTranslation: 'Я напишу тебе завтра.',
  },
  spontan: {
    phrase: 'spontan',
    translation: 'спонтанно, без плана, в последний момент',
    example: 'Wir machen das ganz spontan.',
    exampleTranslation: 'Мы сделаем это совсем спонтанно.',
  },
  'unter-der-woche': {
    phrase: 'unter der Woche',
    translation: 'в будни, на неделе',
    example: 'Unter der Woche schaff ich das nicht.',
    exampleTranslation: 'В будни я это не успеваю.',
  },
  'bock-haben': {
    phrase: 'Bock haben',
    translation: 'хотеть, быть в настроении (разг.)',
    example: 'Ich hab richtig Bock auf Kino.',
    exampleTranslation: 'Мне очень хочется в кино.',
  },
  'was-vorhaben': {
    phrase: 'was vorhaben',
    translation: 'иметь планы, что-то планировать',
    example: 'Hast du am Wochenende schon was vor?',
    exampleTranslation: 'У тебя на выходные уже есть планы?',
  },
  'alles-gut': {
    phrase: 'alles gut',
    translation: 'всё нормально / всё в порядке',
    example: 'Alles gut bei dir?',
    exampleTranslation: 'У тебя всё нормально?',
  },
  'sich-lohnen': {
    phrase: 'sich lohnen',
    translation: 'стоить того, быть стоящим',
    example: 'Der Umweg lohnt sich, glaub mir.',
    exampleTranslation: 'Этот крюк того стоит, поверь.',
  },
  'sag-mal': {
    phrase: 'sag mal',
    translation: 'слушай, скажи-ка (начало вопроса)',
    example: 'Sag mal, hast du morgen Zeit?',
    exampleTranslation: 'Слушай, у тебя завтра есть время?',
  },
  'was-schnelles': {
    phrase: 'was Schnelles',
    translation: 'что-нибудь быстрое (перекусить)',
    example: 'Ich hol mir nur was Schnelles.',
    exampleTranslation: 'Я просто возьму что-нибудь быстрое.',
  },
  'wie-findest-du': {
    phrase: 'wie findest du …?',
    translation: 'как тебе …? что ты думаешь о …?',
    example: 'Wie findest du die neue Wohnung?',
    exampleTranslation: 'Как тебе новая квартира?',
  },
  'wie-heisst-das-nochmal': {
    phrase: 'wie heißt das nochmal?',
    translation: 'как это называется? (когда забыл слово)',
    example: 'Wie heißt das nochmal — dieses Ding für den Kaffee?',
    exampleTranslation: 'Как это называется — эта штука для кофе?',
  },
  'war-nett': {
    phrase: 'war echt nett',
    translation: 'было очень приятно (при прощании)',
    example: 'War echt nett, dich kennenzulernen.',
    exampleTranslation: 'Было очень приятно познакомиться.',
  },
  halt: {
    phrase: 'halt',
    translation: 'просто, ну (частица: «ну так уж есть»)',
    example: 'Das ist halt so.',
    exampleTranslation: 'Ну вот так уж оно есть.',
  },
  'was-darfs-sein': {
    phrase: "was darf's sein?",
    translation: 'что желаете? (в кафе, магазине)',
    example: "Guten Tag! Was darf's sein?",
    exampleTranslation: 'Добрый день! Что желаете?',
  },
  'sonst-noch-was': {
    phrase: 'sonst noch was?',
    translation: 'что-нибудь ещё?',
    example: 'Ein Brot und Milch. Sonst noch was?',
    exampleTranslation: 'Хлеб и молоко. Что-нибудь ещё?',
  },
  moin: {
    phrase: 'Moin',
    translation: 'привет (на севере Германии — в любое время дня)',
    example: 'Moin! Schon lange da?',
    exampleTranslation: 'Привет! Давно здесь?',
  },
  'das-kriegen-wir-hin': {
    phrase: 'das kriegen wir hin',
    translation: 'мы это уладим, справимся',
    example: 'Mach dir keine Sorgen, das kriegen wir hin.',
    exampleTranslation: 'Не переживай, мы это уладим.',
  },
  'im-bild-sein': {
    phrase: 'im Bild sein',
    translation: 'быть в курсе',
    example: 'Lies die Mail, dann bist du im Bild.',
    exampleTranslation: 'Прочитай письмо, тогда будешь в курсе.',
  },
  nebenbei: {
    phrase: 'nebenbei',
    translation: 'попутно, между делом',
    example: 'Das hab ich so nebenbei gelernt.',
    exampleTranslation: 'Я это выучил как-то между делом.',
  },
  kaum: {
    phrase: 'kaum',
    translation: 'почти не, едва',
    example: 'Ich kenne ihn kaum.',
    exampleTranslation: 'Я его почти не знаю.',
  },
  'drauf-kommen': {
    phrase: 'ich komm nicht drauf',
    translation: 'никак не вспомню / не могу догадаться',
    example: 'Wie heißt der Film? Ich komm nicht drauf.',
    exampleTranslation: 'Как называется этот фильм? Никак не вспомню.',
  },
  'wenn-das-wetter-haelt': {
    phrase: 'wenn das Wetter hält',
    translation: 'если погода не испортится',
    example: 'Wir grillen morgen, wenn das Wetter hält.',
    exampleTranslation: 'Завтра пожарим шашлык, если погода не испортится.',
  },
  'hoert-sich-gut-an': {
    phrase: 'das hört sich gut an',
    translation: 'звучит хорошо',
    example: 'Ein Picknick? Das hört sich gut an.',
    exampleTranslation: 'Пикник? Звучит хорошо.',
  },
  'ein-bisschen': {
    phrase: 'ein bisschen',
    translation: 'немного, чуть-чуть',
    example: 'Ich bin ein bisschen müde.',
    exampleTranslation: 'Я немного устал.',
  },
}
