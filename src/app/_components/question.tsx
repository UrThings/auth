import React from "react";

// Question interface (optional, strongly typed болгох)
interface Question {
  id: string;
  title: string;
  question: string;
  answer: string;
  user: {
    name: string;
  };
}

interface Props {
  questions: Question[];
}

export default function QuestionList({ questions }: Props) {
  return (
    <div className="grid  grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {questions.map((q) => (
        <div
          key={q.id}
          className="bg-white min-w-[400px] shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{q.title}</h2>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Question:</span> {q.question}
          </p>
          <p className="text-green-700 mb-1">
            <span className="font-semibold">Correct answer:</span> {q.answer}
          </p>
        </div>
      ))}
    </div>
  );
}
