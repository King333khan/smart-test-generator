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
