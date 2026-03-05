import physics9thCover from '../assets/covers/physics-9th.jpg';
import biology9thCover from '../assets/covers/biology-9th.jpg';
import math9thCover from '../assets/covers/math-9th.jpg';
import chemistry9thCover from '../assets/covers/chemistry-9th.jpg';
import cs9thCover from '../assets/covers/cs-9th.jpg';
import english9thCover from '../assets/covers/english-9th.jpg';
import urdu9thCover from '../assets/covers/urdu-9th.jpg';
import islamiat9thCover from '../assets/covers/islamiat-9th.jpg';
import tarjama9thCover from '../assets/covers/tarjama-9th.jpg';
import physics10thCover from '../assets/covers/physics-10th.jpg';
import chemistry10thCover from '../assets/covers/chemistry-10th.jpg';
import math10thCover from '../assets/covers/math-10th.jpg';
import biology10thCover from '../assets/covers/biology-10th.jpg';

export const CLASSES = [
    { id: '9', name: '9th Class' },
    { id: '10', name: '10th Class' },
    { id: '11', name: '11th Class (FSc Part 1)' },
    { id: '12', name: '12th Class (FSc Part 2)' }
];

export const SUBJECTS = {
    '9': [
        { id: 'phy', name: 'Physics', cover: physics9thCover },
        { id: 'che', name: 'Chemistry', cover: chemistry9thCover },
        { id: 'math', name: 'Mathematics', cover: math9thCover },
        { id: 'bio', name: 'Biology', cover: biology9thCover },
        { id: 'cs', name: 'Computer Science', cover: cs9thCover },
        { id: 'eng', name: 'English', cover: english9thCover },
        { id: 'urd', name: 'Urdu', cover: urdu9thCover },
        { id: 'isl', name: 'Islamiat (Compulsory)', cover: islamiat9thCover },
        { id: 'tar', name: 'Tarjama tul Quran', cover: tarjama9thCover }
    ],
    '10': [
        { id: 'phy', name: 'Physics', cover: physics10thCover },
        { id: 'che', name: 'Chemistry', cover: chemistry10thCover },
        { id: 'math', name: 'Mathematics', cover: math10thCover },
        { id: 'bio', name: 'Biology', cover: biology10thCover },
        { id: 'cs', name: 'Computer Science' },
        { id: 'eng', name: 'English' },
        { id: 'urd', name: 'Urdu' },
        { id: 'isl', name: 'Islamiat (Compulsory)' },
        { id: 'tar', name: 'Tarjama tul Quran' }
    ],
    '11': [
        { id: 'phy', name: 'Physics (Part 1)' },
        { id: 'che', name: 'Chemistry (Part 1)' },
        { id: 'math', name: 'Mathematics (Part 1)' },
        { id: 'bio', name: 'Biology (Part 1)' }
    ],
    '12': [
        { id: 'phy', name: 'Physics (Part 2)' },
        { id: 'che', name: 'Chemistry (Part 2)' },
        { id: 'math', name: 'Mathematics (Part 2)' },
        { id: 'bio', name: 'Biology (Part 2)' }
    ]
};

// Mock chapters based on typical PCTB syllabus
export const CHAPTERS = {
    '9_eng': [
        {
            id: 'ch1',
            name: 'UNIT 1: The Saviour of Mankind',
            topics: [
                { id: 'ch1_t1', name: 'The Saviour of Mankind' }
            ]
        },
        {
            id: 'ch2',
            name: 'UNIT 2: Patriotism',
            topics: [
                { id: 'ch2_t1', name: 'Patriotism' }
            ]
        },
        {
            id: 'ch3',
            name: 'UNIT 3: Daffodils',
            topics: [
                { id: 'ch3_t1', name: 'Daffodils' }
            ]
        },
        {
            id: 'ch4',
            name: 'UNIT 4: Hazrat Asma (رضي الله عنها)',
            topics: [
                { id: 'ch4_t1', name: 'Hazrat Asma (رضي الله عنها)' }
            ]
        },
        {
            id: 'ch5',
            name: 'UNIT 5: Women Empowerment through Entrepreneurship',
            topics: [
                { id: 'ch5_t1', name: 'Women Empowerment through Entrepreneurship' }
            ]
        },
        {
            id: 'ch6',
            name: 'UNIT 6: The Value of Time',
            topics: [
                { id: 'ch6_t1', name: 'The Value of Time' }
            ]
        },
        {
            id: 'ch7',
            name: 'UNIT 7: If',
            topics: [
                { id: 'ch7_t1', name: 'If' }
            ]
        },
        {
            id: 'ch8',
            name: 'UNIT 8: Globalisation\'s Impact on Culture and Economy',
            topics: [
                { id: 'ch8_t1', name: 'Globalisation\'s Impact on Culture and Economy' }
            ]
        },
        {
            id: 'ch9',
            name: 'UNIT 9: Quality Education A Key to Success',
            topics: [
                { id: 'ch9_t1', name: 'Quality Education A Key to Success' }
            ]
        },
        {
            id: 'ch10',
            name: 'UNIT 10: The Silent Predator and the Majestic Prey-Snow Leopard and Markhor',
            topics: [
                { id: 'ch10_t1', name: 'Wildlife Vignettes Fascinating Nature' }
            ]
        },
        {
            id: 'ch11',
            name: 'UNIT 11: The Dear Departed (One-Act Play) Stanley Houghton',
            topics: [
                { id: 'ch11_t1', name: 'The Dear Departed (One-Act Play) Stanley Houghton' }
            ]
        },
        {
            id: 'ch12',
            name: 'English B',
            topics: [
                { id: 'ch12_t1', name: '1 Letters' },
                { id: 'ch12_t2', name: '2 Stories' },
                { id: 'ch12_t3', name: '3 Dialogues' },
                { id: 'ch12_t4', name: '4 Comprehension Paragraphs' },
                { id: 'ch12_t5', name: '5 Idioms' }
            ]
        },
        {
            id: 'ch13',
            name: 'TENSES',
            topics: [
                { id: 'ch13_t1', name: '1 Use of \'is\', \'am\', \'are\' and \'was\', were' },
                { id: 'ch13_t2', name: '2 Use of \'has\' and \'have\'' },
                { id: 'ch13_t3', name: '3 Use of \'had\'' },
                { id: 'ch13_t4', name: '4 Present Indefinite Tense' },
                { id: 'ch13_t5', name: '5 Present Continuous Tense' },
                { id: 'ch13_t6', name: '6 Present Perfect Tense' },
                { id: 'ch13_t7', name: '7 Present Perfect Continuous Tense' },
                { id: 'ch13_t8', name: '8 Past Indefinite Tense' },
                { id: 'ch13_t9', name: '9 Past Continuous Tense' },
                { id: 'ch13_t10', name: '10 Past Perfect Tense' },
                { id: 'ch13_t11', name: '11 Past Perfect Continuous Tense' },
                { id: 'ch13_t12', name: '12 Future Indefinite Tense' },
                { id: 'ch13_t13', name: '13 Future Continuous Tense' },
                { id: 'ch13_t14', name: '14 Future Perfect Tense' },
                { id: 'ch13_t15', name: '15 Future Perfect Continuous Tense' }
            ]
        }
    ],
    '9_isl': [
        {
            id: 'ch1',
            name: 'باب اول: قرآن مجید اور حدیث نبوی خاتم النبین ﷺ',
            topics: [
                { id: 'ch1_t1', name: '1.1 قرآن مجید کی تدوین اور اس کی حفاظت' },
                { id: 'ch1_t2', name: '1.2 حفاظت و تدوین حدیث (دوراول)' },
                { id: 'ch1_t3', name: '1.3 احادیثِ نبویہ (خاتم النبین ﷺ)' }
            ]
        },
        {
            id: 'ch2',
            name: 'باب دوم: ایمانیات و عبادات',
            topics: [
                { id: 'ch2_t1', name: '2.1 عقیدہ توحید' },
                { id: 'ch2_t2', name: '2.2 عقیدہ رسالت' },
                { id: 'ch2_t3', name: '2.3 ملائکہ (فرشتے)' },
                { id: 'ch2_t4', name: '2.4 کُتب سماویہ (آسمانی کتابیں)' },
                { id: 'ch2_t5', name: '2.5 عقیدہ آخرت' },
                { id: 'ch2_t6', name: '2.6 نماز' },
                { id: 'ch2_t7', name: '2.7 روزہ' },
                { id: 'ch2_t8', name: '2.8 زکوۃ' },
                { id: 'ch2_t9', name: '2.9 حج اور قربانی' }
            ]
        },
        {
            id: 'ch3',
            name: 'باب سوم: سیرت نبوی خاتم النبین ﷺ',
            topics: [
                { id: 'ch3_t1', name: '3.1 فتح مکہ' },
                { id: 'ch3_t2', name: '3.2 غزوہ حنین' },
                { id: 'ch3_t3', name: '3.3 عامُ الوفود (9 ہجری)' },
                { id: 'ch3_t4', name: '3.4 غزوہ تبوک' },
                { id: 'ch3_t5', name: '3.5 حجۃ الوداع' },
                { id: 'ch3_t6', name: '3.6 وصال نبوی (خاتم النبینﷺ)' },
                { id: 'ch3_t7', name: '3.7 حضرت محمد مصطفی خاتم النبین ﷺ کا بچپن اور جوانی' },
                { id: 'ch3_t8', name: '3.8 حضرت محمد مصطفی ﷺ کا ذوق عبادت' },
                { id: 'ch3_t9', name: '3.9 حضرت محمد مصطفی ﷺ کی سخاوت و ایثار' },
                { id: 'ch3_t10', name: '3.10 صلہ رحمی' },
                { id: 'ch3_t11', name: '3.11 خواتین کے ساتھ حسن سلوک' },
                { id: 'ch3_t12', name: '3.12 انداز تربیت' }
            ]
        },
        {
            id: 'ch4',
            name: 'باب چہارم: اخلاق و آداب',
            topics: [
                { id: 'ch4_t1', name: '4.1 شکروقناعت' },
                { id: 'ch4_t2', name: '4.2 امانت و دیانت' },
                { id: 'ch4_t3', name: '4.3 اخلاص و تقوی' },
                { id: 'ch4_t4', name: '4.4 پردہ پوشی' },
                { id: 'ch4_t5', name: '4.5 تکبر' },
                { id: 'ch4_t6', name: '4.6 حسد' },
                { id: 'ch4_t7', name: '4.7 جھوٹ' },
                { id: 'ch4_t8', name: '4.8 غیبت اور بہتان' },
                { id: 'ch4_t9', name: '4.9 جادو،فال اور توہم پرستی' }
            ]
        },
        {
            id: 'ch5',
            name: 'باب پنجم: حسن معاملات و معاشرت',
            topics: [
                { id: 'ch5_t1', name: '5.1 قسم کے احکام و مسائل' },
                { id: 'ch5_t2', name: '5.2 گواہی کے احکام و مسائل' },
                { id: 'ch5_t3', name: '5.3 حقوق العباد (ہمسایوں کے حقوق)' },
                { id: 'ch5_t4', name: '5.4 سود کی حرمت' },
                { id: 'ch5_t5', name: '5.5 اسلامی ریاست' },
                { id: 'ch5_t6', name: '5.6 جہاد فی سبیل اللہ' }
            ]
        },
        {
            id: 'ch6',
            name: 'باب ششم: ہدایت کے سرچشمے اور مشاہیر اسلام',
            topics: [
                { id: 'ch6_t1', name: '6.1 حضرت امام زین العابدین رحمۃ اللہ علیہ' },
                { id: 'ch6_t2', name: '6.2 حضرت امام زید بن علی رحمۃ اللہ علیہ' },
                { id: 'ch6_t3', name: '6.3 حضرت ابو موسی اشعری رضی اللہ تعالیٰ عنہ' },
                { id: 'ch6_t4', name: '6.4 حضرت عبداللہ بن عمروبن العاص رضی اللہ تعالیٰ عنھما' },
                { id: 'ch6_t5', name: '6.5 حضرت عمرو بن امیہ رضی اللہ تعالیٰ عنہ' },
                { id: 'ch6_t6', name: '6.6 حضرت عمرو بن العاص رضی اللہ تعالیٰ عنہ' },
                { id: 'ch6_t7', name: '6.7 حضرت جابر بن عبداللہ رضی اللہ تعالیٰ عنہ' },
                { id: 'ch6_t8', name: '6.8 حضرت انس بن مالک رضی اللہ تعالیٰ عنہ' },
                { id: 'ch6_t9', name: '6.9 صحابیات رضی اللہ تعالی عنھن' },
                { id: 'ch6_t10', name: '6.10 صوفیہ کرام رحمۃ اللہ علیہھم' },
                { id: 'ch6_t11', name: '6.11 علماومفکرین رحمۃ اللہ علیہھم' }
            ]
        },
        {
            id: 'ch7',
            name: 'باب ہفتم: اسلامی تعلیمات اور عصر حاضر کے تقاضے',
            topics: [
                { id: 'ch7_t1', name: '7.1 خود اعتمادی و خود انحصاری' },
                { id: 'ch7_t2', name: '7.2 جسمانی و ذہنی صحت اور جسمانی ریاضت' },
                { id: 'ch7_t3', name: '7.3 اسلام میں مستقبل کی منصوبہ بندی کی اہمیت' },
                { id: 'ch7_t4', name: '7.4 اسلامی تہذیب کے امتیازات' }
            ]
        }
    ],
    '9_urd': [
        {
            id: 'ch1',
            name: 'نثر نمبر1: اخلاق حسنہ',
            topics: [
                { id: 'ch1_t1', name: 'اخلاق حسنہ' }
            ]
        },
        {
            id: 'ch2',
            name: 'نثر نمبر 2: اپنی مدد آپ',
            topics: [
                { id: 'ch2_t1', name: 'اپنی مدد آپ' }
            ]
        },
        {
            id: 'ch3',
            name: 'نثر نمبر 3: کلیم اور مرزا ظاہر دار بیگ',
            topics: [
                { id: 'ch3_t1', name: 'کلیم اور مرزا ظاہر دار بیگ' }
            ]
        },
        {
            id: 'ch4',
            name: 'نثر نمبر 4: نام دیو-مالی',
            topics: [
                { id: 'ch4_t1', name: 'نام دیو-مالی' }
            ]
        },
        {
            id: 'ch5',
            name: 'نثر نمبر 5: آرام و سکون',
            topics: [
                { id: 'ch5_t1', name: 'آرام و سکون' }
            ]
        },
        {
            id: 'ch6',
            name: 'نثر نمبر 6: کتبہ',
            topics: [
                { id: 'ch6_t1', name: 'کتبہ' }
            ]
        },
        {
            id: 'ch7',
            name: 'نثر نمبر 7: ابتدائی حساب',
            topics: [
                { id: 'ch7_t1', name: 'ابتدائی حساب' }
            ]
        },
        {
            id: 'ch8',
            name: 'نثر نمبر 8: لڑی میں پروے ہوئے منظر',
            topics: [
                { id: 'ch8_t1', name: 'لڑی میں پروے ہوئے منظر' }
            ]
        },
        {
            id: 'ch9',
            name: 'نثر نمبر 9: بھیڑیا',
            topics: [
                { id: 'ch9_t1', name: 'بھیڑیا' }
            ]
        },
        {
            id: 'ch10',
            name: 'نثر نمبر 10: حوصلہ نہ ہارو آگے بڑھو منزل اب کے دور نہیں',
            topics: [
                { id: 'ch10_t1', name: 'حوصلہ نہ ہارو آگے بڑھو منزل اب کے دور نہیں' }
            ]
        },
        {
            id: 'ch11',
            name: 'نظم نمبر 1: حمد',
            topics: [
                { id: 'ch11_t1', name: 'حمد' }
            ]
        },
        {
            id: 'ch12',
            name: 'نظم نمبر 2: نعت',
            topics: [
                { id: 'ch12_t1', name: 'نعت' }
            ]
        },
        {
            id: 'ch13',
            name: 'نظم نمبر 3: محنت کی برکت',
            topics: [
                { id: 'ch13_t1', name: 'محنت کی برکت' }
            ]
        },
        {
            id: 'ch14',
            name: 'نظم نمبر 4: جاوید کے نام',
            topics: [
                { id: 'ch14_t1', name: 'جاوید کے نام' }
            ]
        },
        {
            id: 'ch15',
            name: 'نظم نمبر 5: پیام لطیف',
            topics: [
                { id: 'ch15_t1', name: 'پیام لطیف' }
            ]
        },
        {
            id: 'ch16',
            name: 'نظم نمبر 6: کرکٹ اور مشاعرہ',
            topics: [
                { id: 'ch16_t1', name: 'کرکٹ اور مشاعرہ' }
            ]
        },
        {
            id: 'ch17',
            name: 'غزل نمبر 1: فقیرا نہ آئے صدا کرچل',
            topics: [
                { id: 'ch17_t1', name: 'فقیرا نہ آئے صدا کر چلے' }
            ]
        },
        {
            id: 'ch18',
            name: 'غزل نمبر 2: سن تو سہی جہاں میں ہے تیرا افسانہ کیا',
            topics: [
                { id: 'ch18_t1', name: 'سن تو سہی جہاں میں ہے تیرا افسانہ کیا' }
            ]
        },
        {
            id: 'ch19',
            name: 'غزل نمبر 3: غم ہے یا خوشی ہے تو',
            topics: [
                { id: 'ch19_t1', name: 'غم ہے یا خوشی ہے تو' }
            ]
        },
        {
            id: 'ch20',
            name: 'غزل نمبر 4: کاش طوفاں میں سفینے کو اتارا ہو',
            topics: [
                { id: 'ch20_t1', name: 'کاش طوفاں میں سفینے کو اتارا ہو' }
            ]
        },
        {
            id: 'ch21',
            name: 'اُردو (ب)',
            topics: [
                { id: 'ch21_t1', name: 'واحد / جمع' },
                { id: 'ch21_t2', name: 'مذکر / مونث' },
                { id: 'ch21_t3', name: 'الفاظ / متضاد' },
                { id: 'ch21_t4', name: 'الفاظ / مترادف' },
                { id: 'ch21_t5', name: 'غلط محاورات / جملوں کی درستگی' },
                { id: 'ch21_t6', name: 'محاورات کی تکمیل' },
                { id: 'ch21_t7', name: 'خطوط' },
                { id: 'ch21_t8', name: 'درخواستیں' },
                { id: 'ch21_t9', name: 'کہانیاں' },
                { id: 'ch21_t10', name: 'مکالمے' }
            ]
        }
    ],
    '9_cs': [
        {
            id: 'ch1',
            name: 'UNIT 1: Introduction to Systems',
            topics: [
                { id: 'ch1_t1', name: '1.1 Theory of Systems' },
                { id: 'ch1_t2', name: '1.2 Types of Systems' },
                { id: 'ch1_t3', name: '1.3 System and Science' },
                { id: 'ch1_t4', name: '1.4 Computer as System' },
                { id: 'ch1_t5', name: '1.5 The Architecture of von Neumann Computers' },
                { id: 'ch1_t6', name: '1.6 Computing Systems' },
                { id: 'ch1_ex', name: 'Exercise' }
            ]
        },
        {
            id: 'ch2',
            name: 'UNIT 2: Number Systems',
            topics: [
                { id: 'ch2_t1', name: '2.1 Numbering Systems' },
                { id: 'ch2_t2', name: '2.2 Data Representation in Computing Systems' },
                { id: 'ch2_t3', name: '2.3 Storing Real Values in Computer Memory' },
                { id: 'ch2_t4', name: '2.4 Binary Arithmetic Operations' },
                { id: 'ch2_t5', name: '2.5 Common Text Encoding Schemes' },
                { id: 'ch2_t6', name: '2.6 Storing Images, Audio, and Video in Computers' }
            ]
        },
        {
            id: 'ch3',
            name: 'UNIT 3: Digital Systems and Logic Design',
            topics: [
                { id: 'ch3_t1', name: '3.1 Basics of Digital Systems' },
                { id: 'ch3_t2', name: '3.1.1 What is an Analog Signal' },
                { id: 'ch3_t3', name: '3.1.2 Fundamentals of Digital Logic' },
                { id: 'ch3_t4', name: '3.2 Boolean Algebra and Logic Gates' },
                { id: 'ch3_t5', name: '3. 2.1 Boolean Functions and Expressions' },
                { id: 'ch3_t6', name: '3.2.2 Logic Gates and their Functions' },
                { id: 'ch3_t7', name: '3.3 Simplification of Boolean Functions' },
                { id: 'ch3_t8', name: '3.4. Creating Logic Diagrams' },
                { id: 'ch3_t9', name: '3.5. Application of Digital Logic' },
                { id: 'ch3_t10', name: '3.5.1 Half-adder and Full-adder Circuits' },
                { id: 'ch3_t11', name: '3.5.2 Karnaugh Map( K-Map)' }
            ]
        },
        {
            id: 'ch4',
            name: 'UNIT 4: System Troubleshooting',
            topics: [
                { id: 'ch4_t1', name: '4.1 System Troubleshooting' },
                { id: 'ch4_t2', name: '4.1.1 Systematic Process of Troubleshooting' },
                { id: 'ch4_t3', name: '4.1.2 Importance of Troubleshooting in Computing Systems' },
                { id: 'ch4_t4', name: '4.2 Troubleshooting Strategies' },
                { id: 'ch4_t5', name: '4.2.1 Basic Software-Related Issues' },
                { id: 'ch4_t6', name: '4.2.2 Basic Hardware-Related Issues' },
                { id: 'ch4_t7', name: '4.2.3 Hardware Diagnosis and Maintenance' },
                { id: 'ch4_t8', name: '4.2.4 Security and Maintenance' },
                { id: 'ch4_t9', name: '4.2.5 Data Management and Backups' },
                { id: 'ch4_t10', name: '4.2.6 Using Resources for Troubleshooting' },
                { id: 'ch4_ex', name: 'Exercise' }
            ]
        },
        {
            id: 'ch5',
            name: 'UNIT 5: Software System',
            topics: [
                { id: 'ch5_t1', name: '5.1 Software' },
                { id: 'ch5_t2', name: '5.2 Introduction to System Software' },
                { id: 'ch5_t3', name: '5.2.1 Operating System' },
                { id: 'ch5_t4', name: '5.2.2 Utility Programs' },
                { id: 'ch5_t5', name: '5.2.3 Device Drivers' },
                { id: 'ch5_t6', name: '5.3 Application Software' },
                { id: 'ch5_t7', name: '5.3.1 Commonly used application software' }
            ]
        },
        {
            id: 'ch6',
            name: 'UNIT 6: Introduction to Computer Networks',
            topics: [
                { id: 'ch6_t1', name: '6.1 Network as a System' },
                { id: 'ch6_t2', name: '6.2 Fundamental Concepts in Data Communication' },
                { id: 'ch6_t3', name: '6.3 Networking Devices' },
                { id: 'ch6_t4', name: '6.4 Network Topologies' },
                { id: 'ch6_t5', name: '6.5 Transmission Modes' },
                { id: 'ch6_t6', name: '6.6 The OSI Networking Model' },
                { id: 'ch6_t7', name: '6.7 Ipv4 and Ipv6' },
                { id: 'ch6_t8', name: '6.8 Protocols and Network Services' },
                { id: 'ch6_t9', name: '6.9 Network Security' },
                { id: 'ch6_t10', name: '6.10 Types of Networks' },
                { id: 'ch6_t11', name: '6.11 Real-World Applications of Computer Networks' },
                { id: 'ch6_t12', name: '6.12. Standard Protocols in TCP/IP Communications' },
                { id: 'ch6_t13', name: '6.13 Network Security Methods' },
                { id: 'ch6_t14', name: '6.14 Exercise Mcqs' }
            ]
        },
        {
            id: 'ch7',
            name: 'UNIT 7: Computational Thinking',
            topics: [
                { id: 'ch7_t1', name: '7.0 Introduction' },
                { id: 'ch7_t2', name: '7.1 Definition.of Computational Thinking' },
                { id: 'ch7_t3', name: '7.2 Principles of Computational Thinking' },
                { id: 'ch7_t4', name: '7.3 Algorithm Design Methods' },
                { id: 'ch7_t5', name: '7.4 Algorithmic Activities' },
                { id: 'ch7_t6', name: '7.5 Dry Run' },
                { id: 'ch7_t7', name: '7.6 Introduction to LARP' },
                { id: 'ch7_t8', name: '7.7 Error ldentification and Debugging' },
                { id: 'ch7_t9', name: '7.8 Exercise Mcqs' }
            ]
        },
        {
            id: 'ch8',
            name: 'UNIT 8: Web Development with HTML, CSS and JavaScript',
            topics: [
                { id: 'ch8_t1', name: '8.1 Web Development' },
                { id: 'ch8_t2', name: '8.2 Basic Components of Web Development' },
                { id: 'ch8_t3', name: '8.3 Getting Started with HTML' },
                { id: 'ch8_t4', name: '8.4 HTML Basic Structure' },
                { id: 'ch8_t5', name: '8.5 Creating Content with HTML' },
                { id: 'ch8_t6', name: '8.6 Styling with CSS' },
                { id: 'ch8_t7', name: '8.7 Introduction to JavaScript' },
                { id: 'ch8_t8', name: '8.8 Developing and Debugging' },
                { id: 'ch8_t9', name: '8.9 Exercise Mcqs' }
            ]
        },
        {
            id: 'ch9',
            name: 'UNIT 9: Data Science and Data Gathering',
            topics: [
                { id: 'ch9_t1', name: '9.1 Data' },
                { id: 'ch9_t2', name: '9.2 Data Types' },
                { id: 'ch9_t3', name: '9.3 Organising and Analysing Data' },
                { id: 'ch9_t4', name: '9.4 Data Types' },
                { id: 'ch9_t5', name: '9.5 Data Storage Techniques' },
                { id: 'ch9_t6', name: '9.6 Data Visualization' },
                { id: 'ch9_t7', name: '9.7 Data Pre-Processing and Analysis' },
                { id: 'ch9_t8', name: '9.8 Collaborative Tools and Cloud Storage' },
                { id: 'ch9_t9', name: '9.9 Introduction to Data Science' },
                { id: 'ch9_t10', name: '9.10 Big Data and its Applications' }
            ]
        },
        {
            id: 'ch10',
            name: 'UNIT 10: Emerging Technologies in Computer Science',
            topics: [
                { id: 'ch10_t1', name: '10.1 Introduction to Artificial Intelligence (Al)' },
                { id: 'ch10_t2', name: '10.2 Al Algorithms and Techniques' },
                { id: 'ch10_t3', name: '10.3 Introduction to Internet of Things (loT)' },
                { id: 'ch10_t4', name: '10.4 Implications and Future of Emerging Technologies' }
            ]
        },
        {
            id: 'ch11',
            name: 'UNIT 11: Ethical, Social, and Legal Concerns in Computer Usage',
            topics: [
                { id: 'ch11_t1', name: '11.1 Responsible Computer Usage' },
                { id: 'ch11_t2', name: '11.2 Safe and Secure Operation of Digital Platforms' },
                { id: 'ch11_t3', name: '11.3 Best Practices in Online Behavior' },
                { id: 'ch11_t4', name: '11.4 Legal and Ethical Frameworks' },
                { id: 'ch11_t5', name: '11.5 Intellectual Property Rights' },
                { id: 'ch11_t6', name: '11.6 Responsible Internet Use' },
                { id: 'ch11_t7', name: '11.7 Impact of Computing on Society' }
            ]
        },
        {
            id: 'ch12',
            name: 'UNIT 12: Entrepreneurship in Digital Age',
            topics: [
                { id: 'ch12_t1', name: '12.1 Entrepreneurship' },
                { id: 'ch12_t2', name: '12.2 Entrepreneurship in the Digital Landscape' },
                { id: 'ch12_t3', name: '12.3 Digital Tools and Platforms' },
                { id: 'ch12_t4', name: '12.4 Business Idea Generation' },
                { id: 'ch12_t5', name: '12.5 Developing Business Plans' },
                { id: 'ch12_t6', name: '12.6 Ethical and Sustainable Entrepreneurship' },
                { id: 'ch12_ex', name: 'Exercise' }
            ]
        }
    ],
    '9_phy': [
        {
            id: 'ch1',
            name: '1. Physical Quantities and Measurements',
            topics: [
                { id: 'ch1_t1', name: '1.1 Physical and Non-Physical Quantities' },
                { id: 'ch1_t2', name: '1.2 Base and Derived Physical Quantities' },
                { id: 'ch1_t3', name: '1.3 International System of Units' },
                { id: 'ch1_t4', name: '1.4 Scientific Notation' },
                { id: 'ch1_t5', name: '1.5 Length Measuring Instruments' },
                { id: 'ch1_t6', name: '1.6 Mass Measuring Instruments' },
                { id: 'ch1_t7', name: '1.7 Time Measuring Instruments' },
                { id: 'ch1_t8', name: '1.8 Volume Measuring Instruments' },
                { id: 'ch1_t9', name: '1.9 Errors in Measurements' },
                { id: 'ch1_t10', name: '1.10 Uncertainity in a Measurement' },
                { id: 'ch1_t11', name: '1.11 Significant Figures' },
                { id: 'ch1_t12', name: '1.12 Precision and Accuracy' },
                { id: 'ch1_t13', name: '1.13 Rounding off the digits' },
                { id: 'ch1_ex', name: 'Exercise' }
            ]
        },
        {
            id: 'ch2',
            name: '2. Kinematics',
            topics: [
                { id: 'ch2_t1', name: '2.1 Scalars and Vectors' },
                { id: 'ch2_t2', name: '2.2 Rest and Motion' },
                { id: 'ch2_t3', name: '2.3 Types of Motion' },
                { id: 'ch2_t4', name: '2.4 Distance and Displacement' },
                { id: 'ch2_t5', name: '2.5 Speed and Velocity' },
                { id: 'ch2_t6', name: '2.6 Acceleration' },
                { id: 'ch2_t7', name: '2.7 Graphical Analysis of Motion' },
                { id: 'ch2_t8', name: '2.8 Gradient of a Distance-Time Graph' },
                { id: 'ch2_t9', name: '2.9 Speed-Time Graph' },
                { id: 'ch2_t10', name: '2.10 Gradient of a Speed-Time Graph' },
                { id: 'ch2_t11', name: '2.11 Area Under Speed-Time Graph' },
                { id: 'ch2_t12', name: '2.12 Solving Problems for Motion Under Gravity' },
                { id: 'ch2_t13', name: '2.13 Free Fall Acceleration' },
                { id: 'ch2_ex', name: 'Exercise' }
            ]
        },
        {
            id: 'ch3',
            name: '3. Dynamics',
            topics: [
                { id: 'ch3_t1', name: '3.1 Concept of Force' },
                { id: 'ch3_t2', name: '3.2 Fundamental Forces' },
                { id: 'ch3_t3', name: '3.3 Forces in a Free- Body Diagram' },
                { id: 'ch3_t4', name: '3.4 Newton’s Laws of Motion' },
                { id: 'ch3_t5', name: '3.5 Limitations of Newton’s Laws of Motion' },
                { id: 'ch3_t6', name: '3.6 Mass and Weight' },
                { id: 'ch3_t7', name: '3.7 Mechanical and Electronic Balances' },
                { id: 'ch3_t8', name: '3.8 Friction' },
                { id: 'ch3_t9', name: '3.9 Momentum and Impulse' },
                { id: 'ch3_t10', name: '3.10 Principle of Conservation of Momentum' }
            ]
        },
        {
            id: 'ch4',
            name: '4. Turning Effects of Forces',
            topics: [
                { id: 'ch4_t1', name: '4.1 Like and Unlike Parallel Forces' },
                { id: 'ch4_t2', name: '4.2 Addition of Forces' },
                { id: 'ch4_t3', name: '4.3 Turning Effect of a Force' },
                { id: 'ch4_t4', name: '4.4 Resolution of Vectors' },
                { id: 'ch4_t5', name: '4.5 Determination of a Force from its Prependicular Components' },
                { id: 'ch4_t6', name: '4.6 Principle of Moments' },
                { id: 'ch4_t7', name: '4.7 Centre of Gravity and Centre of Mass' },
                { id: 'ch4_t8', name: '4.8 Equilibrium' },
                { id: 'ch4_t9', name: '4.9 Conditions of Equilibrium' },
                { id: 'ch4_t10', name: '4.10 States of Equilibrium' },
                { id: 'ch4_t11', name: '4.11 Improvement of Stability' },
                { id: 'ch4_t12', name: '4.12 Application of Stability in Real Life' },
                { id: 'ch4_t13', name: '4.13 Centripetal Force' },
                { id: 'ch4_cr', name: 'Constructed Response' }
            ]
        },
        {
            id: 'ch5',
            name: '5. Work, Energy and Power',
            topics: [
                { id: 'ch5_t1', name: '5.1 Work' },
                { id: 'ch5_t2', name: '5.2 Energy' },
                { id: 'ch5_t3', name: '5.3 Conservation of Energy' },
                { id: 'ch5_t4', name: '5.4 Sources of Energy' },
                { id: 'ch5_t5', name: '5.5 Renewable and Non-Renewable Sources' },
                { id: 'ch5_t6', name: '5.6 The Advantages and Disadvantages of methods of Energy production' },
                { id: 'ch5_t7', name: '5.7 Power' },
                { id: 'ch5_t8', name: '5.8 Efficiency' },
                { id: 'ch5_cr', name: 'Constructed Response' }
            ]
        },
        {
            id: 'ch6',
            name: '6. Mechanical Properties of Matter',
            topics: [
                { id: 'ch6_t1', name: '6.1 Deformation of solids' },
                { id: 'ch6_t2', name: '6.2 Hooke’s law' },
                { id: 'ch6_t3', name: '6.3 Density' },
                { id: 'ch6_t4', name: '6.4 Pressure' },
                { id: 'ch6_t5', name: '6.5 Pressure in Liquids' },
                { id: 'ch6_t6', name: '6.6 Atmospheric Pressure' },
                { id: 'ch6_t7', name: '6.7 Measurement of Atmospheric Pressure' },
                { id: 'ch6_t8', name: '6.8 Measurement of Pressure by Manometer' },
                { id: 'ch6_t9', name: '6.9 Pascal’s Law' },
                { id: 'ch6_cr', name: 'Constructed Response' }
            ]
        },
        {
            id: 'ch7',
            name: '7. Thermal Properties of Matter',
            topics: [
                { id: 'ch7_t1', name: '7.1 Kinetic Molecular Theory of Matter' },
                { id: 'ch7_t2', name: '7.2 Temperature and Heat' },
                { id: 'ch7_t3', name: '7.3 Thermometers' },
                { id: 'ch7_t4', name: '7.4 Sensitivity, Range and Linearity of Thermometers' },
                { id: 'ch7_t5', name: '7.5 Structure of A Liquid-in-Glass Thermometer' },
                { id: 'ch7_cr', name: 'Constructed Response' }
            ]
        },
        {
            id: 'ch8',
            name: '8. Magnetism',
            topics: [
                { id: 'ch8_t1', name: '8.1 Magnetic Materials' },
                { id: 'ch8_t2', name: '8.2 Properties of Magnets' },
                { id: 'ch8_t3', name: '8.3 Induced Magnetism' },
                { id: 'ch8_t4', name: '8.4 Temporary and Permanent Magnets' },
                { id: 'ch8_t5', name: '8.5 Magnetic Fields' },
                { id: 'ch8_t6', name: '8.6 Uses of Permanent Magnets' },
                { id: 'ch8_t7', name: '8.7 Electromagnets' },
                { id: 'ch8_t8', name: '8.8 Domain Theory of Magnetism' },
                { id: 'ch8_t9', name: '8.9 Magnetization and Demagnetization' },
                { id: 'ch8_t10', name: '8.10 Applications of Magnets in Recording Technology' },
                { id: 'ch8_t11', name: '8.11 Soft Iron as Magnetic Shield' },
                { id: 'ch8_ex', name: 'Exercise' },
                { id: 'ch8_cr', name: 'Constructed Response' }
            ]
        },
        {
            id: 'ch9',
            name: '9. Nature of Science',
            topics: [
                { id: 'ch9_t1', name: '9.1 Scope of Physics' },
                { id: 'ch9_t2', name: '9.2 Branches of Physics' },
                { id: 'ch9_t3', name: '9.3 Interdisciplinary Nature of Physics' },
                { id: 'ch9_t4', name: '9.4 Interdisciplinary Research' },
                { id: 'ch9_t5', name: '9.5 Scientific Method' },
                { id: 'ch9_t6', name: '9.6 Scientific Base of Technology and Engineering' },
                { id: 'ch9_ex', name: 'Exercise' },
                { id: 'ch9_cr', name: 'Constructed Response' }
            ]
        }
    ],
    '9_che': [
        {
            id: 'ch1',
            name: 'CHAP 1: States of Matter and Phase Changes',
            topics: [
                { id: 'ch1_t1', name: '1.1 What is Chemistry?' },
                { id: 'ch1_t2', name: '1.2 States of Matter' },
                { id: 'ch1_t3', name: '1.3 Element, Compound and Mixture' },
                { id: 'ch1_t4', name: '1.6 Solution, Colloidal Solutionsand Suspension' },
                { id: 'ch1_t5', name: '1.4 Allotropic Forms of Substances' },
                { id: 'ch1_t6', name: '1.5 Differences between Elements, Compounds and Mixtures' },
                { id: 'ch1_t7', name: '1.7 Formation of Unsaturated and Saturated Solutions' },
                { id: 'ch1_t8', name: '1.8 Effect of Temperature on the Solubility of Solutes' },
                { id: 'ch1_t9', name: '1.9 Exercise' }
            ]
        },
        {
            id: 'ch2',
            name: 'CHAP 2: Atomic Structure',
            topics: [
                { id: 'ch2_t1', name: '2.1 Structure of Atom' },
                { id: 'ch2_t2', name: '2.1.1 Discovery of Electrons' },
                { id: 'ch2_t3', name: '2.1.2 Discovery of Protons' },
                { id: 'ch2_t4', name: '2.1.3 Origin of Cathode and Anode Rays' },
                { id: 'ch2_t5', name: '2.1.4 Discovery of Neutron' },
                { id: 'ch2_t6', name: '2.2 Atomic Number and Mass Number' },
                { id: 'ch2_t7', name: '2.3 Isotopes and their Masses' },
                { id: 'ch2_t8', name: '2.3.1 Radioactive Isotopes' },
                { id: 'ch2_t9', name: '2.3.2 Applications of Radioactive Isotopes' },
                { id: 'ch2_t10', name: '2.3.3 Ionization of Atom By a Radioactive Source' },
                { id: 'ch2_t11', name: '2.4 Relative Atomic Mass' },
                { id: 'ch2_t12', name: '2.4.1 Calculation of Relative Atomic Mass From Isotopic Abundancec' }
            ]
        },
        {
            id: 'ch3',
            name: 'CHAP 3: Chemical Bonding',
            topics: [
                { id: 'ch3_t1', name: '3.1: Why do atoms form chemical bonds?' },
                { id: 'ch3_t2', name: '3.2 Chemical Bond' },
                { id: 'ch3_t3', name: '3.2.1 Ionic Bond' },
                { id: 'ch3_t4', name: '3.2.2 Covalent Bond' },
                { id: 'ch3_t5', name: '3.2.3 Coordinate Covalent Bond' },
                { id: 'ch3_t6', name: '3.3 Metallic Bond' },
                { id: 'ch3_t7', name: '3.4 Electropositive Character of Metals' },
                { id: 'ch3_t8', name: '3.5 Electronegative character of Non-metals' },
                { id: 'ch3_t9', name: '3.6 Compare the properties of ionic and covalent compounds' },
                { id: 'ch3_t10', name: '3.7 Intermolecular Forces of Attraction' },
                { id: 'ch3_t11', name: '3.8 Nature of Bonding and Properties' }
            ]
        },
        {
            id: 'ch4',
            name: 'CHAP 4: Stoichiometry',
            topics: [
                { id: 'ch4_t1', name: '4.1 Chemical formula' },
                { id: 'ch4_t2', name: '4.2 Empirical Formula' },
                { id: 'ch4_t3', name: '4.3 Chemical Formula of Binary lonic Compounds' },
                { id: 'ch4_t4', name: '4.4 Chemical Formula of Compounds' },
                { id: 'ch4_t5', name: '4.5 Deduce the molecular formula from the structural formula' },
                { id: 'ch4_t6', name: '4.6 Avogadro\'s Number' },
                { id: 'ch4_t7', name: '4.7 The Mole and Molar Mass' },
                { id: 'ch4_t8', name: '4.8 Chemical Equations and Chemical Reactions' },
                { id: 'ch4_t9', name: '4.9 Calculations Based on Chemical Equation' },
                { id: 'ch4_t10', name: '4.0 Introduction' }
            ]
        },
        {
            id: 'ch5',
            name: 'CHAP 5: Energetics',
            topics: [
                { id: 'ch5_t1', name: 'Introduction' },
                { id: 'ch5_t2', name: '5.1 System and Surounding' },
                { id: 'ch5_t3', name: '5.2 Enthalpy' },
                { id: 'ch5_t4', name: '5.3 Exothermic and Endothermic Reactions' },
                { id: 'ch5_t5', name: '5.4. Plow does a Reaction take place?' },
                { id: 'ch5_t6', name: '5.5 Aerobic and Anaerobic Respiration' }
            ]
        },
        {
            id: 'ch6',
            name: 'CHAP 6: Equilibria',
            topics: [
                { id: 'ch6_t1', name: '6.1 Reversible and Irreversible Changes' },
                { id: 'ch6_t2', name: '6.2 Dynamic Equilibrium' },
                { id: 'ch6_t3', name: '6.3 Changes the Physical Conditions of a Chemical Reaction' }
            ]
        },
        {
            id: 'ch7',
            name: 'CHAP 7: Acid Base Chemistry',
            topics: [
                { id: 'ch7_t1', name: '7.1 Acids.and Bases' },
                { id: 'ch7_t2', name: '7.2 DIFFERENT CONCEPTS OF ACIDS AND BASES' },
                { id: 'ch7_t3', name: '7.3 Bronsted ~ Lowry concepts of Acicis and Bases' },
                { id: 'ch7_t4', name: '7.4 Properties of Acids and Bases' },
                { id: 'ch7_t5', name: '7.5 Acid Rain and its Effects' }
            ]
        },
        {
            id: 'ch8',
            name: 'CHAP 8: Periodic Table and Periodicity',
            topics: [
                { id: 'ch8_t1', name: '8.1 Modern Periodic Table' },
                { id: 'ch8_t2', name: '8.2 Salient Features of Modern Periodic Table' },
                { id: 'ch8_t3', name: '8.3 Similarities in the Chemical Properties of Elements in the Same Group' },
                { id: 'ch8_t4', name: '8.4 Variation of Periodic Properties in Periods and Groups' },
                { id: 'ch8_t5', name: '8.5 Metallic Character and Reactivity' }
            ]
        },
        {
            id: 'ch9',
            name: 'CHAP 9: Group Properties and Elements',
            topics: [
                { id: 'ch9_t1', name: '9.1 Properties of Group 1 Elements' },
                { id: 'ch9_t2', name: '9.2 Properties of Group 17 Elements' },
                { id: 'ch9_t3', name: '9.3 Group Properties of Transition elements' },
                { id: 'ch9_t4', name: '9.4 Properties of Noble Gases' },
                { id: 'ch9_t5', name: '9.5 Physical Properties of Metals and Non-metals' },
                { id: 'ch9_ex', name: 'Exercise' }
            ]
        },
        {
            id: 'ch10',
            name: 'CHAP 10: Environmental Chemistry',
            topics: [
                { id: 'ch10_t1', name: 'Introduction' },
                { id: 'ch10_t2', name: '10.1 Composition Of Atmosphere' },
                { id: 'ch10_t3', name: '10.2 Air Pollutants' },
                { id: 'ch10_t4', name: '10.3 Acid Rain' },
                { id: 'ch10_t5', name: '10.4 Global Warming (Greenhouse Effect)' },
                { id: 'ch10_t6', name: '10.5 Strategies to Reduce Environmental Issues' },
                { id: 'ch10_ex', name: 'Exercise' }
            ]
        },
        {
            id: 'ch11',
            name: 'CHAP 11: Hydrocarbons',
            topics: [
                { id: 'ch11_t1', name: 'Introduction' },
                { id: 'ch11_t2', name: '11.1 Hyrocarbons' },
                { id: 'ch11_t3', name: '11.2 Alkanes' },
                { id: 'ch11_t4', name: '11.3 Preparation' },
                { id: 'ch11_t5', name: '11.4 Important Reactions' },
                { id: 'ch11_ex', name: 'Exercise' }
            ]
        },
        {
            id: 'ch12',
            name: 'CHAP 12: Empirical Data Collection and Analysis',
            topics: [
                { id: 'ch12_t1', name: 'Introduction' },
                { id: 'ch12_t2', name: '12.1 SI Units in Chemistry' },
                { id: 'ch12_t3', name: '12.2 Tools and Techniques to Manage Accuracy and Precision' },
                { id: 'ch12_t4', name: '12.3 Accuracy and Precision' }
            ]
        },
        {
            id: 'ch13',
            name: 'CHAP 13: Laboratory and Practical Skills',
            topics: [
                { id: 'ch13_t1', name: 'Introduction' },
                { id: 'ch13_t2', name: '13.1 Chemical Hazards in the Laboratory' },
                { id: 'ch13_t3', name: '13.2 Hazard Signs' },
                { id: 'ch13_t4', name: '13.3 Personal Protective Equipment (PPE) in the Laboratory' },
                { id: 'ch13_t5', name: '13.4 Location of Fire Extinguisher' },
                { id: 'ch13_t6', name: '13.5 Emergency Situation in the Lab' },
                { id: 'ch13_ex', name: 'Exercise' }
            ]
        }
    ],
    '9_bio': [
        {
            id: 'ch1',
            name: 'CHAP 1: The Science of Biology',
            topics: [
                { id: 'ch1_t1', name: '1.1 Biology and its Branches' },
                { id: 'ch1_t2', name: '1.2 Relation of Biology With Other Sciences' },
                { id: 'ch1_t3', name: '1.3 Careers in Biology' },
                { id: 'ch1_t4', name: '1.4 Quranic Instructions to Reveal the Study of Life' },
                { id: 'ch1_t5', name: '1.5 Science as a Collaborative Field' },
                { id: 'ch1_t6', name: '1.6 Scientific Method' },
                { id: 'ch1_t7', name: '1.7 Theory and Law/Principle' },
                { id: 'ch1_t8', name: '1.8 Malaria-An Example of Biological Method' },
                { id: 'ch1_ex', name: 'Exercise' }
            ]
        },
        {
            id: 'ch2',
            name: 'CHAP 2: Biodiversity',
            topics: [
                { id: 'ch2_t1', name: '2.1 Biodiversity' },
                { id: 'ch2_t2', name: '2.2 Classification' },
                { id: 'ch2_t3', name: '2.3 Taxonomic Ranks' },
                { id: 'ch2_t4', name: '2.4 History of Classification' },
                { id: 'ch2_t5', name: '2.5 Domains of Living Organisms' },
                { id: 'ch2_t6', name: '2.6 Classification of Domain Eukarya' },
                { id: 'ch2_t7', name: '2.7 Status of Virus in Classification' },
                { id: 'ch2_t8', name: '2.8 Binomial Nomenclature' }
            ]
        },
        {
            id: 'ch3',
            name: 'CHAP 3: The Cell',
            topics: [
                { id: 'ch3_t1', name: '3.1 Cell' },
                { id: 'ch3_t2', name: '3.2 Structure of Cell' },
                { id: 'ch3_t3', name: '3.2.1 Cell Wall' },
                { id: 'ch3_t4', name: '3.2.2 Cell Membrane' },
                { id: 'ch3_t5', name: '3.2.3 Cytoplasm' },
                { id: 'ch3_t6', name: '3.2.4 Nucleus' },
                { id: 'ch3_t7', name: '3.2.5 Cytoskeleton' },
                { id: 'ch3_t8', name: '3.2.6 Ribosome' },
                { id: 'ch3_t9', name: '3.2.7 Endoplasmic Reticulum' },
                { id: 'ch3_t10', name: '3.2.8 Golgi Apparatus' },
                { id: 'ch3_t11', name: '3.2.9 Lysosomes' },
                { id: 'ch3_t12', name: '3.2.10 Mitochondria' },
                { id: 'ch3_t13', name: '3.2.11 Plasitids' },
                { id: 'ch3_t14', name: '3.2.12 Vacuoles' },
                { id: 'ch3_t15', name: '3.2.13 Centrioles' },
                { id: 'ch3_t16', name: '3.3 STRUCTURAL ADVANTAGES OF PLANT AND ANIMAL CELLS' },
                { id: 'ch3_t17', name: '3.4 CELL SPECIALIZATION' },
                { id: 'ch3_t18', name: '5.5 Stem Cells' }
            ]
        },
        {
            id: 'ch4',
            name: 'CHAP 4: Cell Cycle',
            topics: [
                { id: 'ch4_t1', name: '4.1 Cell Cycle' },
                { id: 'ch4_t2', name: '4.2 Mitosis' },
                { id: 'ch4_t3', name: '4.2.1 Phases Of Mitosis' },
                { id: 'ch4_t4', name: '4.2.2 Significance Of Mitosis' },
                { id: 'ch4_t5', name: '4.3 Meiosis' },
                { id: 'ch4_t6', name: '4.3.1 Phases Of Meiosis' },
                { id: 'ch4_t7', name: '4.3.2 Significance Of Meiosis' },
                { id: 'ch4_t8', name: '4.4 Comparison between Meiosis and Mitosis' }
            ]
        },
        {
            id: 'ch5',
            name: 'CHAP 5: Tissues, Organs, And Organ System',
            topics: [
                { id: 'ch5_t1', name: '5.1 Levels of Organization' },
                { id: 'ch5_t2', name: '5.2 Organs and Organ system in Plants' },
                { id: 'ch5_t3', name: '5.3 Organs and Organ system in Humans' },
                { id: 'ch5_t4', name: '5.4 Homeostasis' }
            ]
        },
        {
            id: 'ch6',
            name: 'CHAP 6: Biomolecules',
            topics: [
                { id: 'ch6_t1', name: '6.1 Biomolecules' },
                { id: 'ch6_t2', name: '6.2 Carbohydrates' },
                { id: 'ch6_t3', name: '6.3 Proteins' },
                { id: 'ch6_t4', name: '6.4 Lipids' },
                { id: 'ch6_t5', name: '6.5 Nucleic Acids' },
                { id: 'ch6_t6', name: '6.6 The Working of DNA and RNA' }
            ]
        },
        {
            id: 'ch7',
            name: 'CHAP 7: Enzymes',
            topics: [
                { id: 'ch7_t1', name: '7.1 Metabolism' },
                { id: 'ch7_t2', name: '7.2 Enzymes' },
                { id: 'ch7_t3', name: '7.3 Mechanism of Enzyme Action' },
                { id: 'ch7_t4', name: '7.4 Factors that Affect the Activity of Enzymes' },
                { id: 'ch7_t5', name: '7.5 Enzyme Inhibition' }
            ]
        },
        {
            id: 'ch8',
            name: 'CHAP 8: Bioenergetics',
            topics: [
                { id: 'ch8_t1', name: '8.1 ATP: The Cell\'s Energy Currency' },
                { id: 'ch8_t2', name: '8.2 Photosynthesis' },
                { id: 'ch8_t3', name: '8.3 Cellular Respiration' },
                { id: 'ch8_ex', name: 'Exercise' }
            ]
        },
        {
            id: 'ch9',
            name: 'CHAP 9: Plant Physiology',
            topics: [
                { id: 'ch9_t1', name: '9.1 Nutrition in Plants' },
                { id: 'ch9_t2', name: '9.2 Transport in Plants' },
                { id: 'ch9_t3', name: '9.3 Transpiration' },
                { id: 'ch9_t4', name: '9.4 Transport of Water and salts in Plants' },
                { id: 'ch9_t5', name: '9.5 Translocation of Food in Plants' },
                { id: 'ch9_t6', name: '9.6 Gaseous Exchange in Plants' },
                { id: 'ch9_t7', name: '9.7 Mechanisms for Excretion in Plants' },
                { id: 'ch9_t8', name: '9.8 Osmotic Adjustments in Plants' },
                { id: 'ch9_ex', name: 'Exercise' }
            ]
        },
        {
            id: 'ch10',
            name: 'CHAP 10: Reproduction In Plants',
            topics: [
                { id: 'ch10_t1', name: '10.1 Types of Asexual Reproduction' },
                { id: 'ch10_t2', name: '10.2 Artificial Propagation' },
                { id: 'ch10_t3', name: '10.3 Sexual Reproduction in Plants' },
                { id: 'ch10_ex', name: 'Exercise' }
            ]
        },
        {
            id: 'ch11',
            name: 'CHAP 11: Biostatistics',
            topics: [
                { id: 'ch11_t1', name: '11.1 Introduction of Biostatistics' },
                { id: 'ch11_t2', name: '11.2 Mean, Median, and Mode' },
                { id: 'ch11_t3', name: '11.3 Bar Chart' },
                { id: 'ch11_ex', name: 'Exercise' }
            ]
        }
    ],
    '9_math': [
        {
            id: 'ch1',
            name: 'UNIT 1: Real Numbers',
            topics: [
                { id: 'ch1_t1', name: 'Exercise 1.1' },
                { id: 'ch1_t2', name: 'Exercise 1.2' },
                { id: 'ch1_t3', name: 'Exercise 1.3' },
                { id: 'ch1_rev', name: 'Review Exercise 1' }
            ]
        },
        {
            id: 'ch2',
            name: 'UNIT 2: Logarithms',
            topics: [
                { id: 'ch2_t1', name: 'Exercise 2.1' },
                { id: 'ch2_t2', name: 'Exercise 2.2' },
                { id: 'ch2_t3', name: 'Exercise 2.3' },
                { id: 'ch2_t4', name: 'Exercise 2.4' },
                { id: 'ch2_rev', name: 'Review Exercise 2' }
            ]
        },
        {
            id: 'ch3',
            name: 'UNIT 3: Set and Functions',
            topics: [
                { id: 'ch3_t1', name: 'Exercise 3.1' },
                { id: 'ch3_t2', name: 'Exercise 3.2' },
                { id: 'ch3_t3', name: 'Exercise 3.3' },
                { id: 'ch3_rev', name: 'Review Exercise 3' }
            ]
        },
        {
            id: 'ch4',
            name: 'UNIT 4: Factorization and Algebraic Manipulation',
            topics: [
                { id: 'ch4_t1', name: 'Exercise 4.1' },
                { id: 'ch4_t2', name: 'Exercise 4.2' },
                { id: 'ch4_t3', name: 'Exercise 4.3' },
                { id: 'ch4_t4', name: 'Exercise 4.4' },
                { id: 'ch4_rev', name: 'Review Exercise 4' }
            ]
        },
        {
            id: 'ch5',
            name: 'UNIT 5: Linear Equations and Inequalities',
            topics: [
                { id: 'ch5_t1', name: 'Exercise 5.1' },
                { id: 'ch5_t2', name: 'Exercise 5.2' },
                { id: 'ch5_rev', name: 'Review Exercise 5' }
            ]
        },
        {
            id: 'ch6',
            name: 'UNIT 6: Trigonometry',
            topics: [
                { id: 'ch6_t1', name: 'Exercise 6.1' },
                { id: 'ch6_t2', name: 'Exercise 6.2' },
                { id: 'ch6_t3', name: 'Exercise 6.3' },
                { id: 'ch6_t4', name: 'Exercise 6.4' },
                { id: 'ch6_t5', name: 'Exercise 6.5' },
                { id: 'ch6_t6', name: 'Exercise 6.6' },
                { id: 'ch6_rev', name: 'Review Exercise 6' }
            ]
        },
        {
            id: 'ch7',
            name: 'UNIT 7: Coordinate Geometry',
            topics: [
                { id: 'ch7_t1', name: 'Exercise 7.1' },
                { id: 'ch7_t2', name: 'Exercise 7.2' },
                { id: 'ch7_t3', name: 'Exercise 7.3' },
                { id: 'ch7_rev', name: 'Review Exercise 7' }
            ]
        },
        {
            id: 'ch8',
            name: 'UNIT 8: Logic',
            topics: [
                { id: 'ch8_t1', name: 'Exercise 8.1' }
            ]
        },
        {
            id: 'ch9',
            name: 'UNIT 9: Similar Figures',
            topics: [
                { id: 'ch9_t1', name: 'Exercise 9.1' },
                { id: 'ch9_t2', name: 'Exercise 9.2' },
                { id: 'ch9_t3', name: 'Exercise 9.3' },
                { id: 'ch9_t4', name: 'Exercise 9.4' },
                { id: 'ch9_rev', name: 'Review Exercise 9' }
            ]
        },
        {
            id: 'ch10',
            name: 'UNIT 10: Graphs of Functions',
            topics: [
                { id: 'ch10_t1', name: 'Exercise 10.1' },
                { id: 'ch10_t2', name: 'Exercise 10.2' },
                { id: 'ch10_rev', name: 'Review Exercise 10' }
            ]
        },
        {
            id: 'ch11',
            name: 'UNIT 11: Loci and Construction',
            topics: [
                { id: 'ch11_t1', name: 'Exercise 11.1' },
                { id: 'ch11_t2', name: 'Exercise 11.2' },
                { id: 'ch11_rev', name: 'Review Exercise 11' }
            ]
        },
        {
            id: 'ch12',
            name: 'UNIT 12: Information Handling',
            topics: [
                { id: 'ch12_t1', name: 'Exercise 12.1' },
                { id: 'ch12_t2', name: 'Exercise 12.2' },
                { id: 'ch12_rev', name: 'Review Exercise 12' }
            ]
        },
        {
            id: 'ch13',
            name: 'UNIT 13: Probability',
            topics: [
                { id: 'ch13_t1', name: 'Exercise 13.1' },
                { id: 'ch13_t2', name: 'Exercise 13.2' },
                { id: 'ch13_rev', name: 'Review Exercise 13' }
            ]
        }
    ],
    '10_math': [
        { id: 'ch1', name: '1. Quadratic Equations' },
        { id: 'ch2', name: '2. Theory of Quadratic Equations' },
        { id: 'ch3', name: '3. Variations' }
    ]
    // Add more as needed or dynamically handle empty state
};
