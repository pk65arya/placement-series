import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { ref, onValue, update } from 'firebase/database';
import { useAuth } from '../context/AuthContext';

const NoteDetail = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const { setGlobalLoading } = useAuth();

  useEffect(() => {
    const noteRef = ref(db, `notes/${noteId}`);
    
    // Subscribe to realtime changes
    const unsubscribe = onValue(noteRef, (snapshot) => {
      if (snapshot.exists()) {
        setNote(snapshot.val());
        // Requirement: Store last opened item
        localStorage.setItem('lastPath', `/notes/${noteId}`);
      }
    });

    return () => unsubscribe();
  }, [noteId]);

  const handleEdit = (content) => {
    update(ref(db, `notes/${noteId}`), { content });
  };

  if (!note) return <div>Note not found or loading...</div>;

  return (
    <div className="note-container">
      <h2>Edit Note</h2>
      <textarea 
        value={note.content} 
        onChange={(e) => handleEdit(e.target.value)}
        rows="10"
      />
    </div>
  );
};

export default NoteDetail;