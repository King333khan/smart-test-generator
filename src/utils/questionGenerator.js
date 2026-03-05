import { CHAPTERS } from '../data/mockSyllabus';
import { QUESTION_BANK } from '../data/questionBank';

export const getSelectedTopicNames = (cls, subject, selectedChapterIds) => {
    if (!cls || !subject || !selectedChapterIds || selectedChapterIds.length === 0) return [];
    const syllabus = CHAPTERS[`${cls}_${subject}`] || [];
    let names = [];

    syllabus.forEach(ch => {
        if (selectedChapterIds.includes(ch.id)) {
            names.push(ch.name);
        }
        if (ch.topics) {
            ch.topics.forEach(t => {
                if (selectedChapterIds.includes(t.id)) {
                    names.push(t.name);
                }
            });
        }
    });

    // Remove numbers from start like "1 Letters" -> "Letters", also "UNIT X:"
    return names.map(n => n.replace(/^(UNIT\s\d+:|[0-9\.]+)\s*/i, '').trim());
};

const grammarTemplates = {
    'Letters': [
        "Write a letter to your father asking about his health.",
        "Write a letter to your friend congratulating him on his success.",
        "Write a letter to your mother regarding your upcoming exams.",
        "Write a letter to your brother advising him to take steps to improve his health."
    ],
    'Stories': [
        "Write a story with the moral: Haste makes waste.",
        "Write a story with the moral: A friend in need is a friend indeed.",
        "Write a story based on the title 'The Thirsty Crow'.",
        "Write a story with the moral: Honesty is the best policy."
    ],
    'Essays': [
        "Write an essay on 'My Best Friend'.",
        "Write an essay on 'Quaid-e-Azam'.",
        "Write an essay on 'Sports and Games'.",
        "Write an essay on 'A Rainy Day'."
    ],
    'Dialogues': [
        "Write a dialogue between a teacher and a student on lateness.",
        "Write a dialogue between two friends discussing a recent cricket match.",
        "Write a dialogue between a doctor and a patient."
    ],
    'Comprehension Paragraphs': [
        "Read the paragraph carefully and answer the questions given at the end."
    ],
    'Idioms': [
        "Use the following idioms in sentences of your own: (1) To nip in the bud (2) A piece of cake"
    ],
    'Tenses': [
        "Translate the following present continuous tense sentences into English.",
        "Translate the following future indefinite tense sentences into English.",
        "Change the voice of the following sentences.",
        "Translate the following present perfect tense sentences into English."
    ]
};

const generalTemplatesMCQ = [
    "Which of the following best describes the key concept in {topic}?",
    "A main characteristic of {topic} is:",
    "Identify the correct option regarding {topic}:",
    "What is the most important element of {topic}?",
    "{topic} is best defined by which of the following?"
];

const generalTemplatesShort = [
    "Define and explain the main idea of {topic}.",
    "What are the key points to remember about {topic}?",
    "Briefly describe the significance of {topic}.",
    "Give two examples related to {topic}.",
    "Write a short note on {topic}."
];

const generalTemplatesLong = [
    "Describe in detail the core concepts of {topic}.",
    "Explain the various aspects and applications of {topic}.",
    "Discuss the complete background of {topic}.",
    "Provide a comprehensive analysis of {topic}."
];

const urduTemplatesMCQ = [
    "درج ذیل میں سے کون سا {topic} کے کلیدی تصور کو بیان کرتا ہے؟",
    "{topic} کی ایک اہم خصوصیت ہے:",
    "{topic} کے حوالے سے درست آپشن کی شناخت کریں:",
    "{topic} کا سب سے اہم عنصر کیا ہے؟"
];

const urduTemplatesShort = [
    "{topic} کے مرکزی خیال کی تعریف اور وضاحت کریں۔",
    "{topic} کے بارے میں یاد رکھنے کے لیے اہم نکات کیا ہیں؟",
    "{topic} کی اہمیت مختصر بیان کریں۔",
    "{topic} پر ایک مختصر نوٹ لکھیں۔"
];

const urduTemplatesLong = [
    "{topic} کے رجحان اور اصولوں کو تفصیل سے بیان کریں۔",
    "{topic} کے مختلف پہلوؤں اور اطلاقات کی وضاحت کریں۔",
    "{topic} کی جامع وضاحت پیش کریں۔"
];

export const generateMockQuestion = (type, cls, subject, selectedChapterIds, index) => {
    const clsSubj = `${cls}_${subject}`;

    // Pool all available real questions for the selected chapters
    let realQuestions = [];

    // Custom from UI
    try {
        const customBank = JSON.parse(localStorage.getItem('customQuestionBank') || '{}');
        if (customBank[clsSubj]) {
            selectedChapterIds.forEach(chId => {
                if (customBank[clsSubj][chId] && customBank[clsSubj][chId][type]) {
                    realQuestions.push(...customBank[clsSubj][chId][type]);
                }
            });
        }
    } catch (e) { }

    // Hardcoded from file
    if (QUESTION_BANK[clsSubj]) {
        selectedChapterIds.forEach(chId => {
            if (QUESTION_BANK[clsSubj][chId] && QUESTION_BANK[clsSubj][chId][type]) {
                realQuestions.push(...QUESTION_BANK[clsSubj][chId][type]);
            }
        });
    }

    // If we have a real question at this index, return it
    if (index < realQuestions.length) {
        const q = realQuestions[index];
        // Ensure format is consistent { en: '', ur: '', options: [], urOptions: [] }
        return {
            en: q.en || '',
            ur: q.ur || '',
            options: q.options || ['', '', '', ''],
            urOptions: q.urOptions || ['', '', '', '']
        };
    }

    const topics = getSelectedTopicNames(cls, subject, selectedChapterIds);

    // Choose a topic to base the question on (rotate through topics based on index)
    let selectedTopic = topics.length > 0 ? topics[index % topics.length] : "selected topic";

    let isGrammar = false;
    let baseGrammarTopic = "";

    // Check if it's English grammar
    if (subject === 'eng' && typeof selectedTopic === 'string') {
        const lowerTopic = selectedTopic.toLowerCase();
        for (const key of Object.keys(grammarTemplates)) {
            if (lowerTopic.includes(key.toLowerCase()) ||
                (key.toLowerCase() === 'tenses' && lowerTopic.includes('use of'))) {
                isGrammar = true;
                baseGrammarTopic = key;
                break;
            }
        }
        if (lowerTopic.includes('tense')) {
            isGrammar = true;
            baseGrammarTopic = 'Tenses';
        }
    }

    let enText = "";
    let urText = "";

    if (isGrammar) {
        const templates = grammarTemplates[baseGrammarTopic];
        let t = templates[index % templates.length];

        // Custom formatting for specific tense subtopics
        if (baseGrammarTopic === 'Tenses' && selectedTopic !== 'Tenses') {
            t = `Translate the following ${selectedTopic.toLowerCase()} sentences into English.`;
        }

        switch (type) {
            case 'mcq':
                enText = `Which grammar rule applies to ${baseGrammarTopic}?`;
                urText = `کس گرامر کے اصول کا اطلاق ${baseGrammarTopic} پر ہوتا ہے؟`;
                break;
            case 'short':
                enText = t;
                urText = `دی گئی ہدایات کے مطابق انگریزی میں جواب دیں۔`; // Generic instruction in Urdu
                break;
            case 'long':
                enText = t;
                urText = `دی گئی ہدایات کے مطابق انگریزی میں تفصیلی جواب دیں۔`;
                break;
            default:
                enText = t;
                urText = '';
        }
    } else {
        // General questions
        let topicText = selectedTopic;

        switch (type) {
            case 'mcq':
                enText = generalTemplatesMCQ[index % generalTemplatesMCQ.length].replace(/{topic}/g, topicText);
                urText = urduTemplatesMCQ[index % urduTemplatesMCQ.length].replace(/{topic}/g, "اس موضوع");
                if (topics.length > 0) {
                    urText = `یہ ${topicText} سے متعلق ایک معروضی سوال ہے۔`;
                }
                break;
            case 'short':
                enText = generalTemplatesShort[index % generalTemplatesShort.length].replace(/{topic}/g, topicText);
                urText = urduTemplatesShort[index % urduTemplatesShort.length].replace(/{topic}/g, "اس موضوع");
                if (topics.length > 0) {
                    urText = `${topicText} سے متعلق تصور کی تعریف اور وضاحت کریں۔`;
                }
                break;
            case 'long':
                enText = generalTemplatesLong[index % generalTemplatesLong.length].replace(/{topic}/g, topicText);
                urText = urduTemplatesLong[index % urduTemplatesLong.length].replace(/{topic}/g, "اس موضوع");
                if (topics.length > 0) {
                    urText = `${topicText} کے رجحان کو تفصیل سے بیان کریں۔`;
                }
                break;
            default:
                enText = "";
                urText = "";
        }
    }

    return { en: enText, ur: urText };
};
