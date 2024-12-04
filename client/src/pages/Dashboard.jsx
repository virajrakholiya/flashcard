import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import FlashcardForm from '../components/FlashcardForm';
import FlashcardList from '../components/FlashcardList';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { token } = useAuth();

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/flashcards', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFlashcards(response.data);
    } catch (error) {
      toast.error('Failed to fetch flashcards');
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, [token]);

  const handleCreate = async (flashcardData) => {
    try {
      await axios.post('http://localhost:3000/api/flashcards', flashcardData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Flashcard created successfully');
      fetchFlashcards();
      setIsFormVisible(false);
    } catch (error) {
      toast.error('Failed to create flashcard');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/flashcards/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Flashcard deleted successfully');
      fetchFlashcards();
    } catch (error) {
      toast.error('Failed to delete flashcard');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Flashcards</h1>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {isFormVisible ? 'Cancel' : 'Add Flashcard'}
        </button>
      </div>

      {isFormVisible && (
        <FlashcardForm onSubmit={handleCreate} />
      )}

      <FlashcardList flashcards={flashcards} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;