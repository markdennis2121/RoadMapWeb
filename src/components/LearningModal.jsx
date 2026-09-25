import { useState } from 'react';
import { getLearningContent } from '../../js/learning.js';

export function LearningModal({ topic, progress, onClose, onSave }) {
  const content = getLearningContent(topic.id, topic.title);
  const [exerciseAnswer, setExerciseAnswer] = useState('');
  const [examAnswer, setExamAnswer] = useState('');
  const [exerciseFeedback, setExerciseFeedback] = useState(null); // { correct: boolean, text: string }
  const [examFeedback, setExamFeedback] = useState(null); // { correct: boolean, text: string }

  const lessonComplete = progress?.lesson_complete || false;
  const exerciseComplete = progress?.exercise_complete || false;
  const examComplete = progress?.exam_complete || false;

  const saveLesson = () => {
    onSave({ lesson_complete: true });
  };

  const checkExercise = () => {
    const isCorrect = exerciseAnswer === content.exercise.answer;
    if (isCorrect) {
      setExerciseFeedback({ correct: true, text: 'Great job! That is correct. Exam unlocked!' });
      onSave({ exercise_complete: true });
    } else {
      setExerciseFeedback({ correct: false, text: 'Not quite. Review the lesson points and try again!' });
    }
  };

  const checkExam = () => {
    const isCorrect = examAnswer === content.exam.answer;
    if (isCorrect) {
      setExamFeedback({ correct: true, text: 'Outstanding! You passed the exam and mastered this topic.' });
      onSave({ exam_complete: true, exam_score: 100 });
    } else {
      setExamFeedback({ correct: false, text: 'That answer is incorrect. Review the lesson and give it another shot.' });
    }
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-topic-title"
    >
      <div className="modal-container max-w-2xl">
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div className="modal-badge-row">
              <span className="modal-kicker">Learning Path</span>
              {examComplete ? (
                <span className="modal-status-pill completed">Mastered 100%</span>
              ) : exerciseComplete ? (
                <span className="modal-status-pill in-progress">Step 3 of 3</span>
              ) : lessonComplete ? (
                <span className="modal-status-pill in-progress">Step 2 of 3</span>
              ) : (
                <span className="modal-status-pill todo">Step 1 of 3</span>
              )}
            </div>
            <h2 id="modal-topic-title" className="modal-title">
              {topic.title}
            </h2>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body / Steps */}
        <div className="modal-body space-y-5">
          {/* Step 1: Lesson */}
          <section className="learning-step-card">
            <div className="step-header">
              <div className="step-number-icon">1</div>
              <div>
                <h3 className="step-title">Lesson Overview</h3>
                <p className="step-subtitle">Read and review the fundamental concepts</p>
              </div>
              {lessonComplete && (
                <span className="step-completed-tag">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Read
                </span>
              )}
            </div>

            <div className="step-content">
              <p className="lesson-text">{content.lesson}</p>
              {content.points && content.points.length > 0 && (
                <ul className="lesson-points-list">
                  {content.points.map((pt, i) => (
                    <li key={i}>
                      <span className="point-bullet">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="step-actions">
                <button
                  onClick={saveLesson}
                  className={`btn-secondary ${lessonComplete ? 'opacity-80' : ''}`}
                >
                  {lessonComplete ? '✓ Lesson Completed' : 'Mark as Read'}
                </button>
                {content.materialUrl && (
                  <a
                    href={content.materialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="lesson-ref-link"
                  >
                    <span>Documentation & Guides</span>
                    <svg className="w-3.5 h-3.5 ml-1 inline" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* Step 2: Interactive Exercise */}
          <section className="learning-step-card">
            <div className="step-header">
              <div className="step-number-icon">2</div>
              <div>
                <h3 className="step-title">Knowledge Check</h3>
                <p className="step-subtitle">Select the correct answer to unlock the exam</p>
              </div>
              {exerciseComplete && (
                <span className="step-completed-tag">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Passed
                </span>
              )}
            </div>

            <div className="step-content">
              <p className="quiz-question">{content.exercise.question}</p>
              <div className="quiz-options-grid">
                {content.exercise.options.map((opt, idx) => {
                  const isSelected = exerciseAnswer === opt;
                  const letter = String.fromCharCode(65 + idx); // A, B, C, D
                  return (
                    <button
                      key={opt}
                      onClick={() => setExerciseAnswer(opt)}
                      className={`quiz-opt-btn ${isSelected ? 'selected' : ''}`}
                    >
                      <span className={`quiz-opt-radio ${isSelected ? 'checked' : ''}`} />
                      <span><strong>Option {letter}:</strong> {opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <button
                  disabled={!exerciseAnswer}
                  onClick={checkExercise}
                  className="btn-primary"
                >
                  Verify Answer
                </button>
              </div>

              {exerciseFeedback && (
                <div className={`quiz-feedback-box ${exerciseFeedback.correct ? 'success' : 'error'}`}>
                  <span>{exerciseFeedback.text}</span>
                </div>
              )}
            </div>
          </section>

          {/* Step 3: Exam */}
          <section className={`learning-step-card ${!exerciseComplete ? 'step-locked' : ''}`}>
            <div className="step-header">
              <div className="step-number-icon">3</div>
              <div>
                <h3 className="step-title">Mastery Exam</h3>
                <p className="step-subtitle">
                  {exerciseComplete
                    ? 'Final test to mark topic as fully completed'
                    : 'Complete step 2 to unlock this exam'}
                </p>
              </div>
              {examComplete ? (
                <span className="step-completed-tag success">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  100% Score
                </span>
              ) : !exerciseComplete ? (
                <span className="step-locked-tag">Locked</span>
              ) : null}
            </div>

            <div className="step-content">
              <p className="quiz-question">{content.exam.question}</p>
              <div className="quiz-options-grid">
                {content.exam.options.map((opt, idx) => {
                  const isSelected = examAnswer === opt;
                  const letter = String.fromCharCode(65 + idx); // A, B, C, D
                  return (
                    <button
                      key={opt}
                      disabled={!exerciseComplete}
                      onClick={() => setExamAnswer(opt)}
                      className={`quiz-opt-btn ${isSelected ? 'selected' : ''}`}
                    >
                      <span className={`quiz-opt-radio ${isSelected ? 'checked' : ''}`} />
                      <span><strong>Option {letter}:</strong> {opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <button
                  disabled={!exerciseComplete || !examAnswer}
                  onClick={checkExam}
                  className="btn-emerald"
                >
                  Submit Final Exam
                </button>
              </div>

              {examFeedback && (
                <div className={`quiz-feedback-box ${examFeedback.correct ? 'success' : 'error'}`}>
                  <span>{examFeedback.text}</span>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
