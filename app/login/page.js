'use client';

import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from '../../firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const auth = getAuth(app);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (err) {
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  };

  const handleVolverInicio = () => {
    router.push('/'); 
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-red-600">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-red-500">Iniciar Sesión</h1>
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-16" /> 
        </div>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
            Usuario
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 text-black py-2 border rounded"
            placeholder="Ingrese su correo"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 text-black py-2 border rounded"
            placeholder="Ingrese su contraseña"
            required
          />
        </div>
        <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
          Iniciar Sesión
        </button>
        <button
  type="button"
  onClick={handleVolverInicio}
  className="mt-4 bg-white border-2 border-red-500 hover:bg-red-100 text-red-500 font-bold py-2 px-4 rounded w-full"
>
  Volver al Inicio
</button>

      </form>
    </div>
  );
}
