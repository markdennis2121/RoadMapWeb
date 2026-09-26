import { useState, useMemo, useLayoutEffect } from 'react';
import { getLearningContent } from '../../js/learning.js';
import { CodePlayground, StaticCodeBlock } from './CodePlayground.jsx';
import { TopicDiagram } from './TopicDiagram.jsx';

export function TopicStudyView({
  topic,
  category,
  progress = {},
  isAuthenticated = true,
  allTopics = [],
  onSaveProgress,
  onUpdateStatus,
  onBackToOverview,
  onSelectTopic
}) {
  const content = useMemo(() => getLearningContent(topic.id, topic.title), [topic.id, topic.title]);
  const learningObjectives = content.learningObjectives?.length
    ? content.learningObjectives
    : content.summary?.skillsAcquired?.length
      ? content.summary.skillsAcquired
      : content.coreConcepts?.slice(0, 3).map((concept) => `Explain ${concept.title.toLowerCase()}`) || [];
  const [exerciseAnswer, setExerciseAnswer] = useState('');
  const [examAnswer, setExamAnswer] = useState('');
  const [exerciseFeedback, setExerciseFeedback] = useState(null);
  const [examFeedback, setExamFeedback] = useState(null);
  const [guestProgress, setGuestProgress] = useState({});
  const [showChallengeHint, setShowChallengeHint] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.querySelector('.workspace-content')?.scrollTo(0, 0);
  }, [topic.id]);

  // Progressive Disclosure: State for expandable advanced drawers
  const [expandedDrawers, setExpandedDrawers] = useState({
    syntax: false,
    implementation: false,
    bestPractices: false,
    pitfalls: false,
    applications: false
  });

  const toggleDrawer = (key) => {
    setExpandedDrawers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const lessonComplete = progress?.lesson_complete || guestProgress.lesson_complete || false;
  const exerciseComplete = progress?.exercise_complete || guestProgress.exercise_complete || false;
  const examComplete = progress?.exam_complete || guestProgress.exam_complete || false;

  // Navigation indices
  const currentIndex = allTopics.findIndex((t) => t.id === topic.id);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex >= 0 && currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  // Milestone percentage
  const stepPercent = examComplete ? 100 : exerciseComplete ? 66 : lessonComplete ? 33 : 0;

  const handleMarkLesson = () => {
    onSaveProgress(topic.id, { lesson_complete: true });
    if (topic.status === 'Not Started') {
      onUpdateStatus(topic.id, 'Currently Learning');
    }
  };

  const checkExercise = () => {
    const isCorrect = exerciseAnswer === content.exercise.answer;
    if (isCorrect) {
      setExerciseFeedback({
        correct: true,
        text: isAuthenticated
          ? 'Correct answer. You unlocked the mastery exam.'
          : 'Correct answer. You unlocked the mastery exam. Sign in to save your quiz history, track your progress, and continue learning across devices.'
      });
      setGuestProgress((current) => ({ ...current, exercise_complete: true }));
      if (isAuthenticated) onSaveProgress(topic.id, { exercise_complete: true });
      if (isAuthenticated && topic.status === 'Not Started') {
        onUpdateStatus(topic.id, 'Currently Learning');
      }
    } else {
      setExerciseFeedback({ correct: false, text: 'Incorrect. Review the core concepts and try again.' });
    }
  };

  const checkExam = () => {
    const isCorrect = examAnswer === content.exam.answer;
    if (isCorrect) {
      setExamFeedback({
        correct: true,
        text: isAuthenticated
          ? 'Outstanding. You passed the exam with 100% score and mastered this topic.'
          : 'Outstanding. You passed the exam with 100% score and mastered this topic. Sign in to save your quiz history, track your progress, and continue learning across devices.'
      });
      setGuestProgress((current) => ({ ...current, exam_complete: true }));
      if (isAuthenticated) {
        onSaveProgress(topic.id, { exam_complete: true, exam_score: 100 });
        onUpdateStatus(topic.id, 'Completed');
      }
    } else {
      setExamFeedback({ correct: false, text: 'Incorrect. Review the core concepts and try again.' });
    }
  };

  return (
    <div className="study-view-wrapper">
      {/* 1. Top Navigation Bar (Font Size: 16-18px) */}
      <div className="study-top-nav">
        <div className="study-breadcrumbs">
          <button onClick={onBackToOverview} className="breadcrumb-link">
            Dashboard
          </button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-cat">{category?.name || 'Curriculum'}</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-curr">{topic.title}</span>
        </div>

        <div className="study-top-actions">
          <div className="study-status-select-wrap">
            <span className="study-status-label">Status:</span>
            <select
              value={topic.status}
              onChange={(e) => onUpdateStatus(topic.id, e.target.value)}
              className="study-status-select"
            >
              <option value="Not Started">Not started</option>
              <option value="Currently Learning">In progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button onClick={onBackToOverview} className="btn-secondary">
            Close Lesson
          </button>
        </div>
      </div>

      {/* 2. Hero Lesson Header (Main lesson title: 38-42px) */}
      <div className="study-hero-card">
        <div className="study-hero-main">
          <div className="study-hero-tags-row">
            <span className="study-category-badge">{category?.name || 'Web Development'}</span>
            {examComplete ? (
              <span className="study-pill-mastered">Mastered 100%</span>
            ) : exerciseComplete ? (
              <span className="study-pill-progress">Step 3 of 3: Final Exam</span>
            ) : lessonComplete ? (
              <span className="study-pill-progress">Step 2 of 3: Practice Quiz</span>
            ) : (
              <span className="study-pill-todo">Step 1 of 3: Core Tutorial</span>
            )}
          </div>
          <h1 className="study-hero-title">{topic.title}</h1>
          <p className="study-hero-subtitle">
            {content.overview?.what || content.lesson}
          </p>
        </div>

        {/* Minimal Progress Tracker */}
        <div className="study-minimal-progress">
          <div className="study-progress-top">
            <div className="study-steps-indicator">
              <span className={`study-step-dot ${lessonComplete ? 'done' : 'active'}`}>1. Core Concept</span>
              <span className="study-step-sep">›</span>
              <span className={`study-step-dot ${exerciseComplete ? 'done' : lessonComplete ? 'active' : ''}`}>2. Practice Quiz</span>
              <span className="study-step-sep">›</span>
              <span className={`study-step-dot ${examComplete ? 'done' : exerciseComplete ? 'active' : ''}`}>3. Final Exam</span>
            </div>
            <strong className="study-progress-percent">{stepPercent}%</strong>
          </div>
          <div className="study-progress-track">
            <div
              className="study-progress-bar"
              style={{
                width: `${stepPercent}%`,
                backgroundColor: examComplete ? '#10b981' : '#4f46e5'
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="study-sections-grid">
        
        {/* =========================================================================
            SECTION 1: MAIN CONCEPT FIRST (Primary Focus)
        ========================================================================= */}
        <section className="study-card">
          <div className="study-card-header">
            <div>
              <h2 className="study-card-title">Core Concept</h2>
              <p className="study-card-sub">Fundamental principles and practical mental model</p>
            </div>
          </div>

          <div className="study-card-body">
            <div className="overview-triad-grid">
              <div className="overview-block">
                <span className="overview-tag blue">What You'll Learn</span>
                <p className="overview-text">{content.overview?.what || content.lesson}</p>
              </div>

              <div className="overview-block">
                <span className="overview-tag emerald">Why It Matters</span>
                <p className="overview-text">
                  {content.overview?.why || 'Essential for professional software engineering and production application architecture.'}
                </p>
              </div>

              <div className="overview-block">
                <span className="overview-tag purple">Real-World Usage</span>
                <p className="overview-text">
                  {content.overview?.whereUsed || 'Used extensively across frontend frameworks, web servers, and client applications.'}
                </p>
              </div>
            </div>

            {learningObjectives.length > 0 && (
              <div className="lesson-objectives">
                <h3>Learning Objectives</h3>
                <ul>
                  {learningObjectives.map((objective, index) => (
                    <li key={index}><span aria-hidden="true">✓</span>{objective}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Core Concepts Breakdown */}
            {content.coreConcepts && content.coreConcepts.length > 0 && (
              <div className="concepts-list">
                {content.coreConcepts.map((concept, idx) => (
                  <div key={idx} className="concept-card">
                    <h3 className="concept-card-title">
                      <span className="concept-num">{idx + 1}</span> {concept.title}
                    </h3>
                    <p className="concept-explanation">{concept.explanation}</p>

                    {concept.terms && concept.terms.length > 0 && (
                      <div className="terms-grid">
                        {concept.terms.map((t, tIdx) => (
                          <div key={tIdx} className="term-pill-card">
                            <code className="term-name">{t.term}</code>
                            <span className="term-def">{t.definition}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Visual Concept Diagram */}
            {content.diagramType && (
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h4 className="text-lg font-bold text-slate-900 mb-3">Visual Concept Blueprint</h4>
                <TopicDiagram diagramType={content.diagramType} title={topic.title} />
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: PRACTICAL EXAMPLE & PLAYGROUND (Secondary Focus)
        ========================================================================= */}
        <section className="study-card">
          <div className="study-card-header">
            <div>
              <h2 className="study-card-title">Practical Example</h2>
              <p className="study-card-sub">Working code blueprints and interactive live playground</p>
            </div>
          </div>

          <div className="study-card-body">
            {content.practicalExamples && content.practicalExamples.length > 0 && (
              <div className="flex flex-col gap-6 mb-8">
                {content.practicalExamples.map((ex, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <div className="bg-white px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <strong className="text-slate-900 font-bold text-base">{ex.title}</strong>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
                        {ex.level}
                      </span>
                    </div>

                    <StaticCodeBlock code={ex.code} language={content.codeLanguage || 'javascript'} />

                    <div className="p-4 bg-white border-t border-slate-200 text-sm text-slate-700">
                      <strong>Analysis:</strong> {ex.explanation}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Live Interactive Code Playground */}
            {content.hasPlayground && (
              <div>
                <div className="mb-4">
                  <h4 className="text-base font-bold text-slate-900">Interactive Try-It-Yourself Editor</h4>
                  <p className="text-sm text-slate-600">Modify code below and observe execution results immediately.</p>
                </div>

                <CodePlayground
                  initialCode={content.codeSnippet || '// Try editing code here\nconsole.log("Ready!");'}
                  language={content.codeLanguage || 'javascript'}
                  type={content.codeType || 'js'}
                  title={topic.title}
                />
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: ADVANCED DETAILS (Progressive Disclosure - Expandable Accordions)
        ========================================================================= */}
        <div className="drawer-accordion-container">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Deep Dive & Detailed Reference</h3>
          <p className="text-slate-600 text-base mb-4">Expand any drawer below for syntax breakdowns, best practices, pitfalls, and project blueprints.</p>

          {/* Drawer 1: Syntax Breakdown */}
          {content.syntaxStructure && (
            <div className="drawer-accordion">
              <button onClick={() => toggleDrawer('syntax')} className="drawer-toggle-btn">
                <span>Syntax & Structural Breakdown</span>
                <svg className={`drawer-icon-arrow ${expandedDrawers.syntax ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedDrawers.syntax && (
                <div className="drawer-content-body">
                  {content.syntaxStructure.generalStructure && (
                    <div className="mb-6">
                      <h4 className="text-base font-bold text-slate-900 mb-2">General Code Blueprint</h4>
                      <StaticCodeBlock code={content.syntaxStructure.generalStructure} language={content.codeLanguage || 'javascript'} />
                    </div>
                  )}

                  {content.syntaxStructure.breakdown && content.syntaxStructure.breakdown.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-base font-bold text-slate-900 mb-2">Token & Keyword Breakdown</h4>
                      <div className="syntax-breakdown-grid">
                        {content.syntaxStructure.breakdown.map((item, idx) => (
                          <div key={idx} className="syntax-part-card">
                            <code className="syntax-token">{item.part}</code>
                            <span className="syntax-meaning">{item.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {content.syntaxStructure.conventions && (
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-2">Formatting Rules & Conventions</h4>
                      <ul className="list-disc pl-5 space-y-2 text-slate-700">
                        {content.syntaxStructure.conventions.map((conv, idx) => (
                          <li key={idx}>{conv}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Drawer 2: Implementation Guide */}
          {content.implementationSteps && content.implementationSteps.length > 0 && (
            <div className="drawer-accordion">
              <button onClick={() => toggleDrawer('implementation')} className="drawer-toggle-btn">
                <span>Step-by-Step Implementation Guide</span>
                <svg className={`drawer-icon-arrow ${expandedDrawers.implementation ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedDrawers.implementation && (
                <div className="drawer-content-body">
                  <div className="implementation-timeline">
                    {content.implementationSteps.map((stepItem, idx) => (
                      <div key={idx} className="step-timeline-node">
                        <div className="step-badge-col">
                          <div className="step-circle">{stepItem.step || idx + 1}</div>
                          {idx < content.implementationSteps.length - 1 && <div className="step-line" />}
                        </div>
                        <div className="step-content-box">
                          <h4 className="step-title">{stepItem.title}</h4>
                          <p className="step-instruction">{stepItem.instruction}</p>
                          <div className="step-why-badge">
                            <strong>Why This Step Is Necessary:</strong> {stepItem.whyNecessary}
                          </div>
                          {stepItem.codeSnippet && (
                            <StaticCodeBlock code={stepItem.codeSnippet} language={content.codeLanguage || 'javascript'} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Drawer 3: Best Practices */}
          {content.bestPractices && (
            <div className="drawer-accordion">
              <button onClick={() => toggleDrawer('bestPractices')} className="drawer-toggle-btn">
                <span>Best Practices & Performance Guidelines</span>
                <svg className={`drawer-icon-arrow ${expandedDrawers.bestPractices ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedDrawers.bestPractices && (
                <div className="drawer-content-body">
                  <div className="best-practices-grid">
                    <div className="bp-card">
                      <h4>Industry Standards</h4>
                      <ul className="bp-list">
                        {(content.bestPractices.industryStandards || content.proTips || []).map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bp-card">
                      <h4>Recommended Structure</h4>
                      <ul className="bp-list">
                        {(content.bestPractices.structureRecommendations || [
                          'Organize files into clean single-responsibility modules.',
                          'Keep components and utilities concise and focused.'
                        ]).map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bp-card">
                      <h4>Performance Optimization</h4>
                      <ul className="bp-list">
                        {(content.bestPractices.performanceConsiderations || [
                          'Minimize unnecessary DOM recalculations and layout reflows.',
                          'Benchmark critical rendering paths in production.'
                        ]).map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Drawer 4: Common Pitfalls & Debugging */}
          {content.commonMistakes && content.commonMistakes.length > 0 && (
            <div className="drawer-accordion">
              <button onClick={() => toggleDrawer('pitfalls')} className="drawer-toggle-btn">
                <span>Common Pitfalls & Debugging</span>
                <svg className={`drawer-icon-arrow ${expandedDrawers.pitfalls ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedDrawers.pitfalls && (
                <div className="drawer-content-body">
                  <div className="mistakes-deck">
                    {content.commonMistakes.map((m, idx) => (
                      <div key={idx} className="mistake-card">
                        <div className="mistake-header">
                          <h4>Pitfall #{idx + 1}: {m.mistake}</h4>
                        </div>
                        <div className="mistake-solution-grid">
                          <div className="solution-box">
                            <strong className="text-emerald-800 block mb-1">How to Avoid & Fix:</strong>
                            <p>{m.howToAvoid}</p>
                          </div>
                          <div className="solution-box">
                            <strong className="text-indigo-800 block mb-1">How to Debug:</strong>
                            <p>{m.debuggingTip}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Drawer 5: Real-World Applications & Practice Tasks */}
          {(content.projectApplications || content.handsOnExercises) && (
            <div className="drawer-accordion">
              <button onClick={() => toggleDrawer('applications')} className="drawer-toggle-btn">
                <span>Real-World Applications & Project Ideas</span>
                <svg className={`drawer-icon-arrow ${expandedDrawers.applications ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedDrawers.applications && (
                <div className="drawer-content-body flex flex-col gap-6">
                  {content.projectApplications && content.projectApplications.length > 0 && (
                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 text-base">Production Domains</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {content.projectApplications.map((app, idx) => (
                          <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <strong className="text-indigo-700 font-bold text-sm block mb-1">{app.domain}</strong>
                            <p className="text-slate-700 text-sm">{app.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {content.handsOnExercises?.codingChallenge?.prompt && (
                    <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-xl">
                      <h4 className="font-bold text-indigo-900 text-base mb-2">Coding Challenge</h4>
                      <p className="text-indigo-950 text-base mb-3">{content.handsOnExercises.codingChallenge.prompt}</p>
                      <button
                        onClick={() => setShowChallengeHint(!showChallengeHint)}
                        className="btn-secondary text-xs"
                      >
                        {showChallengeHint ? 'Hide Implementation Hint' : 'Reveal Implementation Hint'}
                      </button>
                      {showChallengeHint && (
                        <div className="mt-3 p-3 bg-white border border-indigo-200 rounded-lg text-sm text-indigo-900">
                          <strong>Hint:</strong> {content.handsOnExercises.codingChallenge.hint}
                        </div>
                      )}
                    </div>
                  )}

                  {content.handsOnExercises?.miniProjectIdea?.title && (
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                      <h4 className="font-bold text-slate-900 text-base mb-1">
                        Mini-Project Idea: {content.handsOnExercises.miniProjectIdea.title}
                      </h4>
                      <p className="text-slate-700 text-base">
                        {content.handsOnExercises.miniProjectIdea.description}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* =========================================================================
            SECTION 4: KNOWLEDGE CHECK & MASTERY EXAM (Final Step)
        ========================================================================= */}
        <section id="sec-quiz" className="study-card">
          <div className="study-card-header">
            <div>
              <h2 className="study-card-title">Knowledge Check Quiz</h2>
              <p className="study-card-sub">Verify core understanding to unlock the mastery certification exam</p>
            </div>
            {exerciseComplete && <span className="study-done-badge">Quiz Passed</span>}
          </div>

          <div className="study-card-body">
            <p className="study-question-text">{content.exercise.question}</p>
            <div className="study-options-container">
              {content.exercise.options.map((opt, idx) => {
                const isSelected = exerciseAnswer === opt;
                const letter = String.fromCharCode(65 + idx);
                return (
                  <button
                    key={opt}
                    onClick={() => setExerciseAnswer(opt)}
                    className={`study-choice-btn ${isSelected ? 'selected' : ''}`}
                  >
                    <span className={`study-choice-radio ${isSelected ? 'checked' : ''}`} />
                    <span><strong>Option {letter}:</strong> {opt}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <button
                disabled={!exerciseAnswer}
                onClick={checkExercise}
                className="btn-primary"
              >
                Verify Answer
              </button>
              {!lessonComplete && (
                <button onClick={handleMarkLesson} className="btn-secondary">
                  Mark Core Concept Read
                </button>
              )}
            </div>

            {exerciseFeedback && (
              <div className={`study-feedback-box ${exerciseFeedback.correct ? 'success' : 'error'}`}>
                {exerciseFeedback.text}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 5: FINAL MASTERY EXAM */}
        <section id="sec-exam" className={`study-card ${!exerciseComplete ? 'opacity-70' : ''}`}>
          <div className="study-card-header">
            <div>
              <h2 className="study-card-title">Mastery Certification Exam</h2>
              <p className="study-card-sub">
                {exerciseComplete
                  ? 'Final evaluation to complete this milestone 100%'
                  : 'Pass the Knowledge Check Quiz above to unlock this exam'}
              </p>
            </div>
            {examComplete ? (
              <span className="study-done-badge">Mastered 100%</span>
            ) : !exerciseComplete ? (
              <span className="study-locked-badge">Locked</span>
            ) : null}
          </div>

          <div className="study-card-body">
            <p className="study-question-text">{content.exam.question}</p>
            <div className="study-options-container">
              {content.exam.options.map((opt, idx) => {
                const isSelected = examAnswer === opt;
                const letter = String.fromCharCode(65 + idx);
                return (
                  <button
                    key={opt}
                    disabled={!exerciseComplete}
                    onClick={() => setExamAnswer(opt)}
                    className={`study-choice-btn ${isSelected ? 'selected' : ''}`}
                  >
                    <span className={`study-choice-radio ${isSelected ? 'checked' : ''}`} />
                    <span><strong>Option {letter}:</strong> {opt}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <button
                disabled={!exerciseComplete || !examAnswer}
                onClick={checkExam}
                className="btn-emerald"
              >
                Submit Final Exam
              </button>
            </div>

            {examFeedback && (
              <div className={`study-feedback-box ${examFeedback.correct ? 'success' : 'error'}`}>
                {examFeedback.text}
              </div>
            )}
          </div>
        </section>

        {/* Prev / Next Navigation Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-4">
          {prevTopic ? (
            <button
              onClick={() => onSelectTopic(prevTopic)}
              className="btn-secondary"
            >
              ← Previous: {prevTopic.title}
            </button>
          ) : <div />}

          {nextTopic ? (
            <button
              onClick={() => onSelectTopic(nextTopic)}
              className="btn-primary"
            >
              Next Topic: {nextTopic.title} →
            </button>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
