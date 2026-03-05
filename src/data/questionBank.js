// src/data/questionBank.js

// Structure: QUESTION_BANK['classes_subject']['chapter_id'] = { mcq: [], short: [], long: [] }
export const QUESTION_BANK = {
    '9_phy': {
        'ch1': {
            mcq: [
                { en: "What is the SI unit of length?", ur: "لمبائی کی ایس آئی (SI) اکائی کیا ہے؟", options: ["Meter", "Kilogram", "Second", "Ampere"], correct: 0 },
                { en: "Which of the following is a derived quantity?", ur: "درج ذیل میں سے کون سی ماخوذ مقدار ہے؟", options: ["Length", "Mass", "Time", "Velocity"], correct: 3 },
                { en: "The least count of vernier callipers is:", ur: "ورنیئر کیلیپرز کا لیسٹ کاؤنٹ کیا ہے؟", options: ["0.1 mm", "0.01 mm", "0.001 mm", "1 mm"], correct: 0 }
            ],
            short: [
                { en: "Define physical quantities and give two examples.", ur: "طبیعی مقداروں کی تعریف کریں اور دو مثالیں دیں۔" },
                { en: "What is the difference between base and derived quantities?", ur: "بنیادی اور ماخوذ مقداروں میں کیا فرق ہے؟" },
                { en: "What do you mean by scientific notation?", ur: "سائنسی ترقیم سے کیا مراد ہے؟" }
            ],
            long: [
                { en: "Explain the construction and working of Vernier Callipers in detail.", ur: "ورنیئر کیلیپرز کی ساخت اور کام کرنے کا طریقہ تفصیل سے بیان کریں۔" },
                { en: "What are significant figures? Write down the rules to find the significant figures in a measurement.", ur: "اہم ہندسے کیا ہیں؟ پیمائش میں اہم ہندسے معلوم کرنے کے اصول لکھیں۔" }
            ]
        },
        'ch2': {
            mcq: [
                { en: "A car is moving with uniform velocity. Its acceleration will be:", ur: "ایک کار یکساں ولاسٹی سے حرکت کر رہی ہے، اس کا ایکسلریشن ہو گا:", options: ["Positive", "Negative", "Zero", "Constant"], correct: 2 }
            ],
            short: [
                { en: "Define rest and motion.", ur: "ریسٹ اور موشن کی تعریف کریں۔" }
            ],
            long: [
                { en: "Derive the second equation of motion graphically.", ur: "گراف کی مدد سے حرکت کی دوسری مساوات اخذ کریں۔" }
            ]
        }
    },
    '9_eng': {
        'ch1': {
            mcq: [
                { en: "Where is Makkah situated?", options: ["In Pakistan", "In Saudi Arabia", "In UAE", "In Egypt"], correct: 1 }
            ],
            short: [
                { en: "What type of land Arabia is?" },
                { en: "Why was the Holy Quran sent in Arabic?" }
            ],
            long: [
                { en: "Write the summary of the lesson 'The Saviour of Mankind'." }
            ]
        }
    }
};

/**
 * Helper to add questions via code dynamically if needed in the future
 */
export const addQuestionsToBank = (clsSubj, chapterId, type, questions) => {
    if (!QUESTION_BANK[clsSubj]) QUESTION_BANK[clsSubj] = {};
    if (!QUESTION_BANK[clsSubj][chapterId]) QUESTION_BANK[clsSubj][chapterId] = { mcq: [], short: [], long: [] };

    QUESTION_BANK[clsSubj][chapterId][type].push(...questions);
};
