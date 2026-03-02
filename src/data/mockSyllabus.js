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
    '9_phy': [
        { id: 'ch1', name: '1. Physical Quantities and Measurement' },
        { id: 'ch2', name: '2. Kinematics' },
        { id: 'ch3', name: '3. Dynamics' },
        { id: 'ch4', name: '4. Turning Effect of Forces' }
    ],
    '9_bio': [
        { id: 'ch1', name: '1. Introduction to Biology' },
        { id: 'ch2', name: '2. Solving a Biological Problem' },
        { id: 'ch3', name: '3. Biodiversity' }
    ],
    '10_math': [
        { id: 'ch1', name: '1. Quadratic Equations' },
        { id: 'ch2', name: '2. Theory of Quadratic Equations' },
        { id: 'ch3', name: '3. Variations' }
    ]
    // Add more as needed or dynamically handle empty state
};
