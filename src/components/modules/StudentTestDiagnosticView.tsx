import React, { useState, useRef } from 'react';
import {
  Upload,
  Camera,
  ScanLine,
  Sparkles,
  Brain,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  BookOpen,
  FileText,
  RefreshCw,
  Download,
  Send,
  Lightbulb,
  Target,
  GraduationCap,
  TrendingDown,
  Layers,
  Info,
  HelpCircle,
  Maximize2,
  ZoomIn,
  Check,
  ChevronRight,
  User,
  Calendar,
  ChevronDown,
  Printer,
  Eye,
  X,
  FileCheck2,
  Sliders,
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export interface StudentTestDiagnosticViewProps {
  onSyncScore?: (studentId: string, subject: string, classScore: number) => void;
  studentsList?: {
    id: string;
    name: string;
    roll: string;
    gender: string;
    classScore: number;
    examScore: number;
  }[];
  defaultSubject?: string;
  onBackToMarks?: () => void;
}

interface QuestionErrorDetail {
  qNumber: string;
  topic: string;
  maxScore: number;
  scored: number;
  pupilAnswer: string;
  expectedAnswer: string;
  errorClassification: 'Conceptual Misunderstanding' | 'Symbol/Sign Inversion' | 'Omission/Incomplete' | 'Process/Algorithmic Flaw';
  severity: 'critical' | 'moderate' | 'minor';
  diagnosticExplanation: string;
}

interface DiagnosticReportData {
  studentId: string;
  studentName: string;
  studentRoll: string;
  className: string;
  subject: string;
  testTitle: string;
  testDate: string;
  totalMarks: number;
  scoredMarks: number;
  gradeEquivalent: string;
  gradeDescription: string;
  subjectConfidence: number; // percentage
  coreBottleneckTitle: string;
  coreBottleneckNarrative: string;
  psychologicalBehavior: string;
  curriculumDeficiency: string;
  demonstratedStrengths: string[];
  criticalGaps: string[];
  questions: QuestionErrorDetail[];
  remediationPlan: {
    phase1: string;
    phase2: string;
    phase3: string;
    customPracticeProblems: string[];
    teachingAidTip: string;
    parentGuidanceAdvice: string;
  };
}

export const StudentTestDiagnosticView: React.FC<StudentTestDiagnosticViewProps> = ({
  onSyncScore,
  studentsList = [],
  defaultSubject = 'Mathematics',
  onBackToMarks,
}) => {
  // Built-in Roster fallback if not provided
  const availableStudents = studentsList.length > 0 ? studentsList : [
    { id: 'std_03', name: 'Kwame Osei', roll: 'BFA-2024-003', gender: 'Male', classScore: 22, examScore: 54 },
    { id: 'std_05', name: 'Yaw Adjei', roll: 'BFA-2024-005', gender: 'Male', classScore: 19, examScore: 48 },
    { id: 'std_01', name: 'Kofi Mensah', roll: 'BFA-2024-001', gender: 'Male', classScore: 26, examScore: 64 },
    { id: 'std_02', name: 'Ama Boateng', roll: 'BFA-2024-002', gender: 'Female', classScore: 28, examScore: 68 },
    { id: 'std_06', name: 'Esi Frimpong', roll: 'BFA-2024-006', gender: 'Female', classScore: 25, examScore: 60 },
  ];

  // Selection state
  const [selectedClass, setSelectedClass] = useState('JHS 2A');
  const [selectedStudentId, setSelectedStudentId] = useState('std_03');
  const [selectedSubject, setSelectedSubject] = useState(defaultSubject);
  const [testTitle, setTestTitle] = useState('Mid-Term Assessment: Algebraic Expressions & Linear Equations');

  // Test Paper Shoot / Upload State
  const [uploadedImage, setUploadedImage] = useState<string>('/assets/math_test_shoot.jpg');
  const [uploadedFileName, setUploadedFileName] = useState<string>('kwame_osei_math_test_shoot.jpg');
  const [isSampleLoaded, setIsSampleLoaded] = useState<boolean>(true);
  const [activeSampleId, setActiveSampleId] = useState<'math' | 'science' | 'custom'>('math');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Analysis Lifecycle States
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [analysisStepText, setAnalysisStepText] = useState<string>('');
  const [activeReport, setActiveReport] = useState<DiagnosticReportData | null>(null);

  // UI Interactive States
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'weaknesses' | 'remediation' | 'paper'>('diagnosis');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'moderate'>('all');
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSynced, setIsSynced] = useState<boolean>(false);
  const [isParentNotified, setIsParentNotified] = useState<boolean>(false);

  const currentStudent = availableStudents.find((s) => s.id === selectedStudentId) || availableStudents[0];

  // Rich Presets Data
  const sampleMathReport: DiagnosticReportData = {
    studentId: 'std_03',
    studentName: 'Kwame Osei',
    studentRoll: 'BFA-2024-003',
    className: 'JHS 2A',
    subject: 'Mathematics',
    testTitle: 'Mid-Term Assessment: Algebraic Expressions & Linear Equations',
    testDate: '12 Oct 2024',
    totalMarks: 30,
    scoredMarks: 14,
    gradeEquivalent: 'Grade 6',
    gradeDescription: 'Low Average (Pass) — Urgent Diagnostics Required',
    subjectConfidence: 36,
    coreBottleneckTitle: 'Sign-Inversion Dyscalculia during Equation Transposition & Bracket Expansion',
    coreBottleneckNarrative:
      "Kwame demonstrates solid raw arithmetic capabilities (he can add, multiply, and divide standard integers accurately without hesitation). However, when moving algebraic terms across an equality sign ('='), his working reveals a severe cognitive misconception: he treats the negative sign as a permanent prefix attached to the number, rather than an inverse operation being executed across the equation balance. In Question 5 ('6x - 9 = 2x + 15'), instead of adding 9 to both sides, he wrote '6x = 2x + 15 - 9', carrying the minus sign across untouched. Furthermore, in Question 4, he bypassed distributing the multiplier across parentheses containing negative terms ('4(x - 3)' became '2x - 3'), indicating an anxiety-driven tendency to rush and guess rather than systematically expanding algebraic factors.",
    psychologicalBehavior:
      "Avoids multi-step scratchwork. Exhibits 'hurry-up-and-finish' behavior when faced with brackets or fraction denominators, leading to algorithmic skipping.",
    curriculumDeficiency:
      "Ghana Education Service (GES) JHS 2 Mathematics Syllabus: B8.2.1.1 (Apply distributive law) & B8.2.1.2 (Solving single variable linear equations using balanced transformations).",
    demonstratedStrengths: [
      'Accurate basic single-digit and double-digit integer arithmetic',
      'Understands how to isolate identical terms (knows to group x-variables together)',
      'Clean, legible step-by-step layout on the top half of the exam sheet',
      'Correctly simplified Question 1 & Question 2 algebraic reductions',
    ],
    criticalGaps: [
      'Sign reversal error when transposing constants across the equal sign (e.g. -9 stays -9)',
      'Failure to distribute coefficients across grouped parentheses containing minus signs',
      'Freezes when confronted with rational/fractional denominators in linear equations (Question 6)',
      'Lacks the habit of checking answers by back-substituting the solved x value into original equations',
    ],
    questions: [
      {
        qNumber: 'Question 5',
        topic: 'Linear Equation Transposition',
        maxScore: 6,
        scored: 1,
        pupilAnswer: '6x - 9 = 2x + 15  =>  6x = 2x + 15 - 9  =>  4x = 6  =>  x = 1.5',
        expectedAnswer: '6x - 9 = 2x + 15  =>  6x - 2x = 15 + 9  =>  4x = 24  =>  x = 6',
        errorClassification: 'Symbol/Sign Inversion',
        severity: 'critical',
        diagnosticExplanation:
          "Crucial transposition failure. Student moved -9 across the '=' sign but left it as -9 instead of inverting to +9. The student has memorized 'move number to right side' mechanically without grasping that an inverse additive operation (+9) must balance both sides.",
      },
      {
        qNumber: 'Question 4',
        topic: 'Distributive Law with Parentheses',
        maxScore: 5,
        scored: 1,
        pupilAnswer: '4(x - 3) = 2x + 8  =>  2x - 3 = 2x + 8  =>  x = 10',
        expectedAnswer: '4x - 12 = 2x + 8  =>  4x - 2x = 8 + 12  =>  2x = 20  =>  x = 10',
        errorClassification: 'Conceptual Misunderstanding',
        severity: 'critical',
        diagnosticExplanation:
          "Failed to multiply the outer factor 4 into the bracket terms (neither 4*x nor 4*(-3) were calculated). Student wrote '2x - 3', confusing the division of 4/2 with bracket multiplication.",
      },
      {
        qNumber: 'Question 6',
        topic: 'Rational Linear Equations (Fraction Denominators)',
        maxScore: 6,
        scored: 1,
        pupilAnswer: '(x + 1) / 2 = 3x - 4  =>  (x + 1) / 2 = (3x - 4) / (x + 1)  =>  Stuck',
        expectedAnswer: 'x + 1 = 2(3x - 4)  =>  x + 1 = 6x - 8  =>  5x = 9  =>  x = 9/5 (1.8)',
        errorClassification: 'Process/Algorithmic Flaw',
        severity: 'critical',
        diagnosticExplanation:
          'Denominator panic. Instead of multiplying both sides of the equation by 2, student attempted to divide both sides by the numerator (x + 1), resulting in total equation collapse and abandoning the question.',
      },
      {
        qNumber: 'Question 3',
        topic: 'Fraction Addition in Equations',
        maxScore: 5,
        scored: 3,
        pupilAnswer: '1/3 x + 2/5 = 7/10  =>  Working scratchy  =>  Calculated 7 = 1',
        expectedAnswer: '1/3 x = 7/10 - 4/10 = 3/10  =>  x = 9/10',
        errorClassification: 'Symbol/Sign Inversion',
        severity: 'moderate',
        diagnosticExplanation:
          'Correctly recognized the need to find LCM for denominators 5 and 10, but made an arithmetic slip in intermediate subtraction and erased steps.',
      },
      {
        qNumber: 'Question 1 & 2',
        topic: 'Simple Monomial Simplification',
        maxScore: 8,
        scored: 8,
        pupilAnswer: '2a = b - 1 (Correct) and 2a = 2b + 2 (Correct)',
        expectedAnswer: 'Correctly simplified expressions',
        errorClassification: 'Process/Algorithmic Flaw',
        severity: 'minor',
        diagnosticExplanation: 'Executed properly. Proves the student has no problem with basic variable representations.',
      },
    ],
    remediationPlan: {
      phase1:
        'Week 1 Focus: Balance Scale Physical Metaphor. Stop teaching "moving numbers across equal sign". Teach "whatever you do to the left scale pan, you must execute identically to the right scale pan" (+9 on both sides).',
      phase2:
        'Week 2 Focus: Rainbow Bracket Expansion. Have Kwame use color highlighters to draw two curved arrows from the outer multiplier to both inside terms before writing any numerals.',
      phase3:
        'Back-substitution habit: Kwame must substitute his calculated x back into the equation on every test problem before moving to the next item.',
      customPracticeProblems: [
        'Practice 1: 5(y - 4) = 3y + 10 (Target: Distributive multiplication on negative terms)',
        'Practice 2: 7x - 12 = 3x + 16 (Target: Correct addition of 12 to both sides of equation)',
        'Practice 3: (m - 3) / 4 = 5 (Target: Clearing denominator by multiplying both sides by 4)',
      ],
      teachingAidTip:
        'Use classroom Algebra Tiles or a double-pan balance scale during Friday remedial clinic.',
      parentGuidanceAdvice:
        'Encourage parent (Mrs. Osei) to supervise 15 minutes of evening equations. Advise her NOT to teach shortcut rules like "change sign when jumping", but rather ask Kwame: "What operation undoes minus 9?"',
    },
  };

  const sampleScienceReport: DiagnosticReportData = {
    studentId: 'std_05',
    studentName: 'Yaw Adjei',
    studentRoll: 'BFA-2024-005',
    className: 'JHS 2A',
    subject: 'Integrated Science',
    testTitle: 'Unit Test: Plant Physiology — Photosynthesis, Cellular Respiration & Gas Exchange',
    testDate: '14 Nov 2024',
    totalMarks: 30,
    scoredMarks: 13,
    gradeEquivalent: 'Grade 9',
    gradeDescription: 'Weak (Fail) — Serious Conceptual Conflation',
    subjectConfidence: 32,
    coreBottleneckTitle: 'Fundamental Conflation of Plant Respiration with Photosynthesis & Equation Misconceptions',
    coreBottleneckNarrative:
      "Yaw demonstrates strong visual-spatial retention: his hand-drawn cross-section of the leaf is remarkably well-sketched and accurately labels the Upper Epidermis, Palisade Mesophyll, and Guard Cells. However, conceptually, he suffers from a classic, deep-seated misconception: he fundamentally believes that 'plants breathe carbon dioxide to make oxygen for people, and only animals respire.' In Part II Question 1, he defined plant respiration as 'plants taking in CO2 to make energy for night time.' He has merged two opposite biochemical pathways into one. Furthermore, in his chemical word equations, he consistently omits the biological catalysts (chlorophyll), treating 'sunlight' as a physical reactant substance rather than the energy driver.",
    psychologicalBehavior:
      'High visual confidence, but low vocabulary precision. Relies heavily on colloquial phrases learned in primary school rather than formal scientific definitions.',
    curriculumDeficiency:
      'GES Integrated Science JHS 2 Curriculum: Strand 2 (Cycles), Sub-strand 2 (Life Cycles of Organisms) — Photosynthesis and Cellular Respiration distinct biochemical pathways.',
    demonstratedStrengths: [
      'Exceptional anatomical diagram sketching (Leaf cross section, stoma pore, and guard cells)',
      'Understands the role of stomata in regulating gas exchange and transpiration',
      'Neat handwriting and orderly examination presentation',
    ],
    criticalGaps: [
      'Does not realize that plant cells possess mitochondria and carry out cellular respiration using Oxygen',
      'Confuses products and reactants in the cellular respiration word equation',
      'Omits chlorophyll as the light-absorbing pigment in chloroplasts',
      'Mistakes sunlight as a reactant element rather than electromagnetic energy',
    ],
    questions: [
      {
        qNumber: 'Part II Q1',
        topic: 'Plant Respiration Definition',
        maxScore: 5,
        scored: 1,
        pupilAnswer: 'Plant respiration is with photosynthesis: plants take in CO2 to make energy.',
        expectedAnswer: 'Respiration is the cellular process where plant cells break down glucose using oxygen to release ATP energy, releasing CO2 and water.',
        errorClassification: 'Conceptual Misunderstanding',
        severity: 'critical',
        diagnosticExplanation:
          'Severe conceptual error. Student believes plants respire CO2 instead of Oxygen. Failed to distinguish cellular respiration (energy release) from photosynthesis (food synthesis).',
      },
      {
        qNumber: 'Part II Q2',
        topic: 'Respiration Word Equation',
        maxScore: 5,
        scored: 1,
        pupilAnswer: 'Glucose + O2 -> Energy + Water + CO2 (Crossed out O2 with question mark)',
        expectedAnswer: 'Glucose + Oxygen -> Carbon Dioxide + Water + ATP Energy',
        errorClassification: 'Conceptual Misunderstanding',
        severity: 'critical',
        diagnosticExplanation:
          'Student actually had the correct equation initially, but second-guessed himself and crossed out Oxygen because he could not reconcile plants consuming oxygen.',
      },
      {
        qNumber: 'Part I Q2',
        topic: 'Photosynthesis Word Equation',
        maxScore: 5,
        scored: 2,
        pupilAnswer: 'CO2 + H2O + Sunlight -> Glucose + Oxygen (Chlorophyll missing)',
        expectedAnswer: 'Carbon Dioxide + Water --[Sunlight / Chlorophyll]--> Glucose + Oxygen',
        errorClassification: 'Omission/Incomplete',
        severity: 'moderate',
        diagnosticExplanation:
          'Treated sunlight as an added chemical reactant on the left side of the equation and completely omitted chlorophyll, which is essential to harness light.',
      },
      {
        qNumber: 'Part I Q3',
        topic: 'Leaf Anatomy & Stomata Diagram',
        maxScore: 10,
        scored: 8,
        pupilAnswer: 'Diagram drawn with upper epidermis, palisade layer, spongy mesophyll, stomata and guard cells',
        expectedAnswer: 'Accurately labeled cross-section of dicot leaf',
        errorClassification: 'Process/Algorithmic Flaw',
        severity: 'minor',
        diagnosticExplanation:
          'Very well drawn and labeled. Lost 2 marks only due to misspelling mesophyll and omitting cuticle layer.',
      },
    ],
    remediationPlan: {
      phase1:
        'Interactive Lab Demonstration: Place an Elodea water plant under a funnel with light (showing O2 bubbles), and another in darkness with limewater (showing CO2 production from respiration).',
      phase2:
        'Contrasting T-Chart: Have Yaw build a comparative table side-by-side contrasting Photosynthesis (Sunlight needed, occurs in chloroplasts, produces glucose) vs Respiration (Occurs 24/7, in mitochondria, consumes glucose).',
      phase3:
        'Card sorting activity: Physical index cards with chemical names to assemble the two distinct equations on his desk without pencil anxiety.',
      customPracticeProblems: [
        'Practice 1: Write the balanced word equation for aerobic respiration in plant cells. Circle the gas absorbed.',
        'Practice 2: Explain in two sentences why a seedling germinating underground in the dark still requires oxygen.',
        'Practice 3: Name the green organelle where photosynthesis occurs and the cell organelle where respiration takes place.',
      ],
      teachingAidTip:
        'Use the school science lab microscope slide of Zebrina leaf epidermal peel to show stomata guard cells in action.',
      parentGuidanceAdvice:
        'Share with parent that Yaw has tremendous artistic and observational talent, but needs verbal quiz discussions at home regarding why seeds and roots underground need air to survive.',
    },
  };

  // Helper to dynamically synthesize report for any student & subject
  const generateDynamicReport = (
    studentName: string,
    studentId: string,
    roll: string,
    subject: string,
    title: string
  ): DiagnosticReportData => {
    if (subject.toLowerCase().includes('science')) {
      return {
        ...sampleScienceReport,
        studentName,
        studentId,
        studentRoll: roll,
        subject,
        testTitle: title,
      };
    }
    return {
      ...sampleMathReport,
      studentName,
      studentId,
      studentRoll: roll,
      subject,
      testTitle: title,
    };
  };

  // Set default active report to Math on initial load
  React.useEffect(() => {
    setActiveReport(sampleMathReport);
  }, []);

  // Handle Preset Selection
  const handleLoadSample = (sampleType: 'math' | 'science') => {
    setActiveSampleId(sampleType);
    setIsSampleLoaded(true);
    setIsSynced(false);
    setIsParentNotified(false);

    if (sampleType === 'math') {
      setSelectedClass('JHS 2A');
      setSelectedStudentId('std_03');
      setSelectedSubject('Mathematics');
      setTestTitle('Mid-Term Assessment: Algebraic Expressions & Linear Equations');
      setUploadedImage('/assets/math_test_shoot.jpg');
      setUploadedFileName('kwame_osei_math_test_shoot.jpg');
      setActiveReport(sampleMathReport);
    } else {
      setSelectedClass('JHS 2A');
      setSelectedStudentId('std_05');
      setSelectedSubject('Integrated Science');
      setTestTitle('Unit Test: Plant Physiology — Photosynthesis & Respiration');
      setUploadedImage('/assets/science_test_shoot.jpg');
      setUploadedFileName('yaw_adjei_science_test_shoot.jpg');
      setActiveReport(sampleScienceReport);
    }
  };

  // Handle Custom File Upload (Drag & Drop or File Input)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    setUploadedImage(fileUrl);
    setUploadedFileName(file.name);
    setIsSampleLoaded(false);
    setActiveSampleId('custom');
    setIsSynced(false);
    setIsParentNotified(false);

    // Prompt teacher to run scan
    setActiveReport(null);
    setToastMessage(`Test shoot "${file.name}" uploaded successfully! Click "Scan & Analyze Test Paper with AI" below.`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Run AI Scan & Analysis Simulation
  const handleRunAiAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(10);
    setAnalysisStepText('Optical Scanning: Normalizing perspective, lighting, and pupil handwriting grid...');

    const steps = [
      { progress: 28, text: 'Handwriting OCR: Extracting mathematical formulas, word equations, and student margin notes...' },
      { progress: 54, text: 'Syllabus Alignment: Matching responses against Ghana Education Service (GES) Marking Scheme...' },
      { progress: 76, text: 'Cognitive Diagnosis: Detecting root-cause misconception patterns, calculation slips, and avoidance markers...' },
      { progress: 95, text: 'Synthesizing Diagnosis: Compiling specific weak points & individualized teacher remedial blueprint...' },
    ];

    steps.forEach((st, idx) => {
      setTimeout(() => {
        setAnalysisProgress(st.progress);
        setAnalysisStepText(st.text);
      }, (idx + 1) * 450);
    });

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisProgress(100);
      const generated = generateDynamicReport(
        currentStudent.name,
        currentStudent.id,
        currentStudent.roll,
        selectedSubject,
        testTitle
      );
      setActiveReport(generated);
      setActiveTab('diagnosis');
      setToastMessage(`AI Assessment complete! Identified ${generated.questions.length} question autopsies and primary learning bottleneck.`);
      setTimeout(() => setToastMessage(null), 4000);
    }, 2200);
  };

  // Sync to Gradebook
  const handleSyncToGradebook = () => {
    if (!activeReport) return;
    if (onSyncScore) {
      onSyncScore(activeReport.studentId, activeReport.subject, activeReport.scoredMarks);
    }
    setIsSynced(true);
    setToastMessage(
      `Continuous assessment score (${activeReport.scoredMarks}/${activeReport.totalMarks}) synced directly to ${currentStudent.name}'s Term 2 Gradebook record!`
    );
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Send Parent Notification
  const handleSendToParent = () => {
    if (!activeReport) return;
    setIsParentNotified(true);
    setToastMessage(
      `Diagnostic Briefing & Home Remedial Tips dispatched to ${activeReport.studentName}'s parent via SchoolOS Parent SMS & Portal!`
    );
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Print Report
  const handlePrint = () => {
    window.print();
  };

  const filteredQuestions = activeReport
    ? activeReport.questions.filter((q) => {
        if (filterSeverity === 'all') return true;
        return q.severity === filterSeverity;
      })
    : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white border border-cyan-500/50 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-bounce max-w-md">
          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="text-xs font-semibold leading-relaxed">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 rounded-2xl p-6 text-white shadow-xl border border-indigo-900/60 relative overflow-hidden">
        {/* Glow backdrop circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400/20 to-orange-400/20 text-amber-300 border border-amber-400/40 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                AI Optical Diagnostic Engine
              </span>
              <span className="text-xs text-indigo-200">
                • Teacher Classroom Tool • GES Curriculum Aligned
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              Student Test Paper Shoot & Diagnostic Scanner
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200/90 max-w-3xl leading-relaxed">
              Upload snapshots or phone photos of handwritten student test answer sheets. The system optically analyzes student calculations and scientific explanations, identifies specific question errors, and diagnoses the root cause of what is truly holding the student back.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start lg:self-center shrink-0">
            {onBackToMarks && (
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs"
                onClick={onBackToMarks}
              >
                Back to Gradebook
              </Button>
            )}
            <button
              onClick={() => handleLoadSample('math')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                activeSampleId === 'math'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Sample 1: Math Shoot</span>
            </button>
            <button
              onClick={() => handleLoadSample('science')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                activeSampleId === 'science'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Sample 2: Science Shoot</span>
            </button>
          </div>
        </div>
      </div>

      {/* Target Student & Test Context Configuration Strip */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              1. Assessment Context & Target Student
            </h2>
          </div>
          <span className="text-[11px] text-slate-400">Step 1 of 2</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Class Selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Assigned Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="JHS 2A">JHS 2A (Form Class - 34 Pupils)</option>
              <option value="JHS 2B">JHS 2B (Mathematics - 31 Pupils)</option>
              <option value="Basic 4">Basic 4 (Integrated Science - 33 Pupils)</option>
            </select>
          </div>

          {/* Student Selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Target Student
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => {
                setSelectedStudentId(e.target.value);
                setIsSynced(false);
              }}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availableStudents.map((std) => (
                <option key={std.id} value={std.id}>
                  {std.name} ({std.roll})
                </option>
              ))}
            </select>
          </div>

          {/* Subject Selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Test Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setIsSynced(false);
              }}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Integrated Science">Integrated Science</option>
              <option value="English Language">English Language</option>
              <option value="Social Studies">Social Studies</option>
              <option value="Computing / ICT">Computing / ICT</option>
            </select>
          </div>

          {/* Test Paper Title */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Assessment Topic / Title
            </label>
            <input
              type="text"
              value={testTitle}
              onChange={(e) => setTestTitle(e.target.value)}
              placeholder="e.g. Mid-Term Algebra Quiz"
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Main Workbench: Left Paper Upload & View, Right Diagnostic Autopsy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: UPLOAD & TEST PAPER SHOOT PREVIEW (5 Cols)                   */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Student Test Answer Shoot
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 truncate max-w-[180px]">
                {uploadedFileName}
              </span>
            </div>

            {/* Test Paper Shoot Preview Card */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 group">
              <img
                src={uploadedImage}
                alt="Student test paper shoot"
                className="w-full h-[430px] object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              />

              {/* Laser Scanning Animation Overlay during analysis */}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-indigo-950/40 backdrop-blur-[1px] flex flex-col justify-between p-4 pointer-events-none">
                  {/* Moving scanning beam */}
                  <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.9)] animate-pulse" />
                  <div className="bg-slate-950/80 border border-cyan-500/40 rounded-xl p-3 text-center space-y-1">
                    <div className="flex items-center justify-center gap-2 text-cyan-300 text-xs font-bold">
                      <ScanLine className="w-4 h-4 animate-spin" />
                      <span>OPTICAL AI SCANNING IN PROGRESS ({analysisProgress}%)</span>
                    </div>
                    <p className="text-[11px] text-slate-300">{analysisStepText}</p>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-300"
                        style={{ width: `${analysisProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Bounding Box Annotations (when not analyzing and report ready) */}
              {!isAnalyzing && showAnnotations && activeReport && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Annotation Pin 1: Q5 Sign Error */}
                  {selectedSubject.toLowerCase().includes('math') ? (
                    <>
                      <div className="absolute top-[48%] left-[24%] pointer-events-auto cursor-pointer group/pin">
                        <span className="relative flex h-5 w-5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-5 w-5 bg-rose-600 border-2 border-white text-[9px] font-black text-white items-center justify-center shadow-lg">
                            !
                          </span>
                        </span>
                        <div className="absolute bottom-6 left-0 hidden group-hover/pin:block bg-slate-900 text-white text-[10px] py-1 px-2 rounded shadow-xl whitespace-nowrap z-20 border border-rose-500">
                          <strong>Q5: Sign Transposition Error</strong> (-9 stayed -9)
                        </div>
                      </div>

                      {/* Annotation Pin 2: Q4 Bracket Error */}
                      <div className="absolute top-[36%] left-[20%] pointer-events-auto cursor-pointer group/pin">
                        <span className="relative flex h-5 w-5">
                          <span className="relative inline-flex rounded-full h-5 w-5 bg-amber-500 border-2 border-white text-[9px] font-black text-white items-center justify-center shadow-lg">
                            !
                          </span>
                        </span>
                        <div className="absolute bottom-6 left-0 hidden group-hover/pin:block bg-slate-900 text-white text-[10px] py-1 px-2 rounded shadow-xl whitespace-nowrap z-20 border border-amber-500">
                          <strong>Q4: Parentheses Distribution Skipped</strong>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Science Pin 1: Chlorophyll missing */}
                      <div className="absolute top-[23%] left-[42%] pointer-events-auto cursor-pointer group/pin">
                        <span className="relative flex h-5 w-5">
                          <span className="relative inline-flex rounded-full h-5 w-5 bg-rose-600 border-2 border-white text-[9px] font-black text-white items-center justify-center shadow-lg">
                            !
                          </span>
                        </span>
                        <div className="absolute bottom-6 left-0 hidden group-hover/pin:block bg-slate-900 text-white text-[10px] py-1 px-2 rounded shadow-xl whitespace-nowrap z-20 border border-rose-500">
                          <strong>Chlorophyll Omission</strong> (Treated sunlight as reactant)
                        </div>
                      </div>

                      {/* Science Pin 2: Respiration conflation */}
                      <div className="absolute top-[68%] left-[45%] pointer-events-auto cursor-pointer group/pin">
                        <span className="relative flex h-5 w-5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-5 w-5 bg-rose-600 border-2 border-white text-[9px] font-black text-white items-center justify-center shadow-lg">
                            !
                          </span>
                        </span>
                        <div className="absolute bottom-6 left-0 hidden group-hover/pin:block bg-slate-900 text-white text-[10px] py-1 px-2 rounded shadow-xl whitespace-nowrap z-20 border border-rose-500">
                          <strong>Conceptual Conflation</strong> (Confused Respiration with Photosynthesis)
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Bottom Quick Tools Bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-slate-950/80 backdrop-blur-md p-2 rounded-xl border border-white/10 text-white text-xs">
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 font-semibold text-[11px] transition-colors"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Inspect Full Shoot</span>
                </button>

                <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-semibold text-slate-300">
                  <input
                    type="checkbox"
                    checked={showAnnotations}
                    onChange={(e) => setShowAnnotations(e.target.checked)}
                    className="rounded border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>Show AI Pins</span>
                </label>
              </div>
            </div>

            {/* Upload Buttons & Options */}
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Upload}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full text-xs justify-center"
                >
                  Upload New Shoot
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  icon={ScanLine}
                  disabled={isAnalyzing}
                  onClick={handleRunAiAnalysis}
                  className="w-full text-xs justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md font-bold"
                >
                  {isAnalyzing ? 'Scanning...' : 'Scan & Diagnose Shoot'}
                </Button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                Supports phone camera photos (.jpg, .png) or scanned quiz papers.
              </p>
            </div>
          </div>

          {/* Quick Guidance Box */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 text-indigo-900 font-bold">
              <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>How the AI Diagnosis Works</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              The system analyzes the student&apos;s actual handwritten steps rather than merely the final answer. It maps scratchwork, crossings out, and skipped steps against diagnostic rubrics to pinpoint the exact psychological and cognitive cause of failure.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: AI DIAGNOSTIC REPORT & WEAK POINTS DISCOVERY (7 Cols)      */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-4">
          {!activeReport ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-2xs space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Ready to Analyze Student Test Paper
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Click &ldquo;Scan &amp; Diagnose Shoot&rdquo; to trigger the optical diagnostic engine. You will receive an immediate breakdown of scored marks, identified weak points, and what is truly going wrong with the student in {selectedSubject}.
              </p>
              <Button
                variant="primary"
                icon={ScanLine}
                onClick={handleRunAiAnalysis}
                className="bg-indigo-600 hover:bg-indigo-700 text-xs px-6 py-2.5 font-bold mx-auto"
              >
                Scan &amp; Diagnose Shoot Now
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Top Score & Identification Card */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white font-black text-sm flex items-center justify-center shadow-sm shrink-0">
                      {activeReport.studentName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black text-slate-900">
                          {activeReport.studentName}
                        </h2>
                        <span className="text-[11px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-100">
                          {activeReport.studentRoll}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {activeReport.className} • {activeReport.subject} • {activeReport.testTitle}
                      </p>
                    </div>
                  </div>

                  {/* Scored Metrics */}
                  <div className="flex items-center gap-3 self-start sm:self-center">
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Assessed Score
                      </span>
                      <div className="text-2xl font-black text-slate-900">
                        {activeReport.scoredMarks}
                        <span className="text-sm font-semibold text-slate-400">
                          /{activeReport.totalMarks}
                        </span>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider block">
                        WAEC Grade
                      </span>
                      <span className="text-xs font-black">{activeReport.gradeEquivalent}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons for Teacher */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSyncToGradebook}
                      disabled={isSynced}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                        isSynced
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 cursor-default'
                          : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-sm'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isSynced ? 'Score Synced to Gradebook' : 'Sync Mark to Gradebook'}</span>
                    </button>

                    <button
                      onClick={handleSendToParent}
                      disabled={isParentNotified}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                        isParentNotified
                          ? 'bg-purple-50 text-purple-700 border-purple-200 cursor-default'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isParentNotified ? 'Parent Notified via SMS' : 'Send Briefing to Parent'}</span>
                    </button>
                  </div>

                  <button
                    onClick={handlePrint}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    title="Print Diagnostic Worksheet"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sub-Tabs: Diagnosis vs Weak Points vs Remediation Plan */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/70 border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('diagnosis')}
                  className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'diagnosis'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Brain className="w-4 h-4 text-indigo-600" />
                  <span>What&apos;s Really Wrong</span>
                </button>
                <button
                  onClick={() => setActiveTab('weaknesses')}
                  className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'weaknesses'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Question Autopsies ({activeReport.questions.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('remediation')}
                  className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'remediation'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span>Teacher Action Plan</span>
                </button>
              </div>

              {/* TAB 1: WHAT'S REALLY WRONG WITH THE STUDENT (THE CORE REQUIREMENT) */}
              {activeTab === 'diagnosis' && (
                <div className="space-y-4">
                  {/* Spotlight Card: The Fundamental Root Cause */}
                  <div className="bg-gradient-to-br from-rose-950/95 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl border border-rose-500/40 relative overflow-hidden">
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300">
                            Root Cognitive Cause in {activeReport.subject}
                          </span>
                          <h3 className="text-base sm:text-lg font-black text-white">
                            {activeReport.coreBottleneckTitle}
                          </h3>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3">
                        <p className="font-medium text-white/95">
                          {activeReport.coreBottleneckNarrative}
                        </p>
                      </div>

                      {/* Behavioral & Curriculum Markers */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-1">
                          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                            <Lightbulb className="w-3 h-3 text-amber-400" />
                            Exam Scratchwork Behavior
                          </span>
                          <p className="text-slate-300 text-[11px] leading-relaxed">
                            {activeReport.psychologicalBehavior}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-1">
                          <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-cyan-400" />
                            GES Curriculum Standard Gap
                          </span>
                          <p className="text-slate-300 text-[11px] leading-relaxed">
                            {activeReport.curriculumDeficiency}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Strengths vs Critical Gaps Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Demonstrated Strengths */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-emerald-700">
                        <CheckCircle2 className="w-4 h-4" />
                        <h4 className="text-xs font-bold uppercase tracking-wider">
                          Demonstrated Strengths
                        </h4>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {activeReport.demonstratedStrengths.map((str, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span className="text-[11px] leading-relaxed">{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Critical Vulnerabilities */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-rose-700">
                        <XCircle className="w-4 h-4" />
                        <h4 className="text-xs font-bold uppercase tracking-wider">
                          Identified Vulnerabilities
                        </h4>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {activeReport.criticalGaps.map((gap, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                            <span className="text-[11px] leading-relaxed font-medium text-slate-800">
                              {gap}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: DETAILED QUESTION AUTOPSIES */}
              {activeTab === 'weaknesses' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Question-by-Question Mistake Autopsy
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Detailed analysis comparing student&apos;s written answers against model solutions.
                      </p>
                    </div>

                    {/* Filter Severity */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <span className="text-slate-400 text-[11px]">Filter:</span>
                      <button
                        onClick={() => setFilterSeverity('all')}
                        className={`px-2 py-1 rounded text-[11px] ${
                          filterSeverity === 'all'
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setFilterSeverity('critical')}
                        className={`px-2 py-1 rounded text-[11px] ${
                          filterSeverity === 'critical'
                            ? 'bg-rose-600 text-white'
                            : 'text-rose-600 hover:bg-rose-50'
                        }`}
                      >
                        Critical Only
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredQuestions.map((q, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border text-xs space-y-3 transition-all ${
                          q.severity === 'critical'
                            ? 'bg-rose-50/40 border-rose-200'
                            : q.severity === 'moderate'
                            ? 'bg-amber-50/40 border-amber-200'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">
                              {q.qNumber}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span className="font-semibold text-slate-600">{q.topic}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                q.severity === 'critical'
                                  ? 'bg-rose-200/80 text-rose-900'
                                  : q.severity === 'moderate'
                                  ? 'bg-amber-200/80 text-amber-900'
                                  : 'bg-emerald-200/80 text-emerald-900'
                              }`}
                            >
                              {q.errorClassification}
                            </span>
                            <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
                              {q.scored} / {q.maxScore} pts
                            </span>
                          </div>
                        </div>

                        {/* Comparison Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2.5 rounded-lg bg-white border border-rose-200/70">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block mb-1">
                              Pupil&apos;s Handwritten Working
                            </span>
                            <p className="font-mono text-slate-800 break-words">
                              {q.pupilAnswer}
                            </p>
                          </div>

                          <div className="p-2.5 rounded-lg bg-white border border-emerald-200/70">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                              Expected Model Solution
                            </span>
                            <p className="font-mono text-slate-800 break-words">
                              {q.expectedAnswer}
                            </p>
                          </div>
                        </div>

                        {/* Diagnostic Explanation */}
                        <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-700">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <p className="leading-relaxed">
                            <strong>Diagnostic Finding:</strong> {q.diagnosticExplanation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: TEACHER ACTION PLAN & REMEDIATION BLUEPRINT */}
              {activeTab === 'remediation' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        2-Week Remedial Prescription for {activeReport.studentName}
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Actionable pedagogical interventions to address the root cognitive block.
                      </p>
                    </div>
                    <Badge variant="success">Customized Plan</Badge>
                  </div>

                  {/* 3 Step Roadmap */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-blue-900">Phase 1: Conceptual Rewiring</h4>
                        <p className="text-[11px] text-slate-700 mt-0.5 leading-relaxed">
                          {activeReport.remediationPlan.phase1}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100">
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-indigo-900">Phase 2: Visual Scaffolding</h4>
                        <p className="text-[11px] text-slate-700 mt-0.5 leading-relaxed">
                          {activeReport.remediationPlan.phase2}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-purple-50/60 border border-purple-100">
                      <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-purple-900">Phase 3: Verification Habit</h4>
                        <p className="text-[11px] text-slate-700 mt-0.5 leading-relaxed">
                          {activeReport.remediationPlan.phase3}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Homework / Practice Set */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>Prescribed Drill Exercises (Targeting Diagnosed Weak Point)</span>
                    </h4>
                    <div className="space-y-1.5 font-mono text-[11px] text-slate-800">
                      {activeReport.remediationPlan.customPracticeProblems.map((prob, idx) => (
                        <div key={idx} className="p-2 rounded bg-white border border-slate-200/80">
                          {prob}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Home Advice for Parent */}
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                      <Send className="w-4 h-4 text-amber-700" />
                      <span>Home Guidance Advice for Parent (Dispatched to Portal)</span>
                    </div>
                    <p className="text-slate-700 text-[11px] leading-relaxed">
                      {activeReport.remediationPlan.parentGuidanceAdvice}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen High-Res Image Inspection Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950 text-white">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold truncate">
                  Inspect Test Shoot: {uploadedFileName}
                </h3>
              </div>
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto p-4 flex items-center justify-center bg-slate-950">
              <img
                src={uploadedImage}
                alt="Full inspect student test paper"
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
