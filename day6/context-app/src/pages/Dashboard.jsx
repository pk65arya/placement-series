import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue, push, remove } from 'firebase/database';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const notesRef = ref(db, 'notes');
    const unsubscribe = onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      const list = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setNotes(list);
    });
    return () => unsubscribe();
  }, []);

  const addNote = () => {
    if (!newNote) return;
    push(ref(db, 'notes'), {
      content: newNote,
      timestamp: Date.now()
    });
    setNewNote('');
  };

  const deleteNote = (id) => {
    remove(ref(db, `notes/${id}`));
  };

  return (
    <div className="dashboard">
      <h1>Your Vault</h1>
      <div className="input-group">
        <input 
          value={newNote} 
          onChange={(e) => setNewNote(e.target.value)} 
          placeholder="New note content..." 
        />
        <button onClick={addNote}>Add Note</button>
      </div>

      <div className="grid">
        {notes.map(note => (
          <div key={note.id} className="card">
            <Link to={`/notes/${note.id}`}>
              <p>{note.content.substring(0, 30)}...</p>
            </Link>
            <button onClick={() => deleteNote(note.id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;