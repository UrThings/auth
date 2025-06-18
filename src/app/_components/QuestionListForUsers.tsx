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

export default function QuestionListForUsers({ questions }: Props) {
  return (
    <div className="flex justify-center">
      <div className="grid w-[650px] grid-cols-1 gap-6 p-6 md:grid-cols-2">
        {questions.map((q) => (
          <div
            key={q.id}
            className="w-[600px] rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition hover:shadow-lg"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              {q.title}
            </h2>
            <p className="mb-1 text-gray-600">
              <span className="font-semibold">Question:</span> {q.question}
            </p>
            <form className="flex flex-col gap-3" action="">
              <label
                htmlFor={`answer-${q.id}`}
                className="font-medium text-gray-800"
              >
                Your answer
              </label>
              <div className="flex gap-20">
                <input
                  id={`answer-${q.id}`}
                  type="text"
                  className="w-[400px] rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Type your answer here..."
                />
                <button
                  type="submit"
                  className="self-start rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white transition hover:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
