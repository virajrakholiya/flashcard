import { useState } from 'react';

const FlashcardList = ({ flashcards, onDelete }) => {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (flashcards.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No flashcards yet. Create one to get started!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {flashcards.map((flashcard) => (
        <div
          key={flashcard._id}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
          onClick={() => toggleFlip(flashcard._id)}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                {flashcard.category}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(flashcard._id);
                }}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
            <div className="min-h-[100px] flex items-center justify-center">
              {flippedCards[flashcard._id] ? (
                <p className="text-gray-600">{flashcard.answer}</p>
              ) : (
                <p className="text-gray-800 font-medium">{flashcard.question}</p>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Click to {flippedCards[flashcard._id] ? 'see question' : 'reveal answer'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlashcardList;