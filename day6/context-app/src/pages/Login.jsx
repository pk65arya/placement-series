import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setGlobalLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalLoading(true);
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>{isSignup ? 'Create Vault' : 'Access Vault'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <p onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have access? Login' : 'Need a vault? Sign up'}
      </p>
    </div>
  );
};

export default Login;