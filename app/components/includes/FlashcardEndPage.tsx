interface FlashcardEndPageProps {
  correctCount: number;
  wrongCount: number;
  total: number;
  onRetry: () => void;
  onGoHome: () => void;
}

export default function FlashcardEndPage({
  correctCount,
  wrongCount,
  total,
  onRetry,
  onGoHome,
}: FlashcardEndPageProps) {
  const percentage = Math.round((correctCount / total) * 100);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        🎉 Flashcard Session Finished!
      </h2>

      <div className="text-center text-lg mt-4 space-y-1">
        <p>
          ✅ Correct: <span className="font-semibold">{correctCount}</span>
        </p>
        <p>
          ❌ Wrong: <span className="font-semibold">{wrongCount}</span>
        </p>
        <p>
          📊 Total: <span className="font-semibold">{total}</span>
        </p>
        <p>
          💯 Accuracy: <span className="font-semibold">{percentage}%</span>
        </p>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={onRetry}
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          🔁 Try Again
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
        >
          🏠 Go Home
        </button>
      </div>
    </div>
  );
}
