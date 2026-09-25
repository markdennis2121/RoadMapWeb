import { useState } from 'react';
import { getLearningContent } from '../../js/learning.js';

export function LearningModal({ topic, progress, onClose, onSave }) {
  const content = getLearningContent(topic.id, topic.title);
  const [exerciseAnswer, setExerciseAnswer] = useState('');
  const [examAnswer, setExamAnswer] = useState('');
  const [result, setResult] = useState('');
  const exerciseComplete = progress?.exercise_complete || false;
  const examComplete = progress?.exam_complete || false;
  const saveLesson = () => onSave({ lesson_complete: true });
  const checkExercise = () => {
    const correct = exerciseAnswer === content.exercise.answer;
    setResult(correct ? 'Exercise correct. Exam unlocked.' : 'Not quite. Review the lesson and try again.');
    if (correct) onSave({ exercise_complete: true });
  };
  const checkExam = () => {
    const correct = examAnswer === content.exam.answer;
    setResult(correct ? 'Exam passed. Topic completed.' : 'That answer is not correct yet. Try again.');
    if (correct) onSave({ exam_complete: true, exam_score: 100 });
  };
  return <div className="fixed inset-0 z-20 overflow-y-auto bg-slate-950/80 p-5"><section className="mx-auto my-8 max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-100 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-cyan-400">Learning path</p><h2 className="mt-1 font-['Space_Grotesk'] text-2xl font-bold">{topic.title}</h2></div><button onClick={onClose} className="text-2xl text-slate-400" aria-label="Close">×</button></div><div className="mt-6 space-y-5"><article className="rounded-xl bg-slate-950/70 p-4"><p className="mb-2 text-xs font-bold uppercase text-slate-400">1. Lesson</p><p className="text-slate-300">{content.lesson}</p><ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">{content.points.map((point) => <li key={point}>{point}</li>)}</ul><div className="mt-4 flex flex-wrap items-center gap-3"><button onClick={saveLesson} className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-bold text-slate-950">Mark lesson complete</button><a href={content.materialUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-cyan-300 hover:text-cyan-200">Optional reference →</a></div></article><article className="rounded-xl bg-slate-950/70 p-4"><p className="mb-2 text-xs font-bold uppercase text-slate-400">2. Exercise {exerciseComplete && <span className="text-emerald-400">Complete</span>}</p><p className="mb-3 text-slate-300">{content.exercise.question}</p><div className="flex flex-wrap gap-2">{content.exercise.options.map((option) => <button key={option} onClick={() => setExerciseAnswer(option)} className={`rounded-lg border px-3 py-2 text-sm ${exerciseAnswer === option ? 'border-cyan-400 bg-cyan-400/10' : 'border-slate-700'}`}>{option}</button>)}</div><button disabled={!exerciseAnswer} onClick={checkExercise} className="mt-4 rounded-lg bg-cyan-500 px-3 py-2 text-sm font-bold text-slate-950 disabled:opacity-40">Check exercise</button></article><article className={`rounded-xl bg-slate-950/70 p-4 ${!exerciseComplete ? 'opacity-60' : ''}`}><p className="mb-2 text-xs font-bold uppercase text-slate-400">3. Exam {examComplete && <span className="text-emerald-400">Passed</span>}</p><p className="mb-3 text-slate-300">{content.exam.question}</p><div className="flex flex-wrap gap-2">{content.exam.options.map((option) => <button key={option} disabled={!exerciseComplete} onClick={() => setExamAnswer(option)} className={`rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed ${examAnswer === option ? 'border-cyan-400 bg-cyan-400/10' : 'border-slate-700'}`}>{option}</button>)}</div><button disabled={!exerciseComplete || !examAnswer} onClick={checkExam} className="mt-4 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-bold text-slate-950 disabled:opacity-40">Submit exam</button></article></div>{result && <p className="mt-5 rounded-xl bg-slate-950 p-3 text-sm text-cyan-300">{result}</p>}</section></div>;
}
