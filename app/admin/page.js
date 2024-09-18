'use client';

import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const HourSelector = ({ value, onChange }) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = ['00', '15', '30', '45'];
  const ampm = ['AM', 'PM'];

  return (
    <div className="flex space-x-2">
      <select
        value={value.split(':')[0]}
        onChange={(e) => onChange(`${e.target.value}:${value.split(':')[1]} ${value.split(' ')[1]}`)}
        className="border border-red-500 text-black rounded p-2"
      >
        {hours.map(hour => (
          <option key={hour} value={hour}>{hour}</option>
        ))}
      </select>
      <select
        value={value.split(':')[1].split(' ')[0]}
        onChange={(e) => onChange(`${value.split(':')[0]}:${e.target.value} ${value.split(' ')[1]}`)}
        className="border border-red-500 text-black rounded p-2"
      >
        {minutes.map(minute => (
          <option key={minute} value={minute}>{minute}</option>
        ))}
      </select>
      <select
        value={value.split(' ')[1]}
        onChange={(e) => onChange(`${value.split(':')[0]}:${value.split(':')[1].split(' ')[0]} ${e.target.value}`)}
        className="border border-red-500 text-black rounded p-2"
      >
        {ampm.map(period => (
          <option key={period} value={period}>{period}</option>
        ))}
      </select>
    </div>
  );
};

const formatHour = (hour) => {
  const [time, period] = hour.split(' ');
  const [hours, minutes] = time.split(':');
  const formattedHours = hours.length === 1 ? `0${hours}` : hours; 
  return `${formattedHours}:${minutes} ${period}`;
};

export default function Admin() {
  const [citas, setCitas] = useState([]);
  const [filteredCitas, setFilteredCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editCita, setEditCita] = useState(null);
  const [completedCitas, setCompletedCitas] = useState([]);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      }
    });

    const fetchCitas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'citas'));
        const citasData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCitas(citasData);
        setFilteredCitas(citasData);
      } catch (error) {
        console.error('Error fetching citas: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();

    return () => unsubscribe();
  }, [auth, router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    if (date) {
      const filtered = citas.filter(cita => cita.fecha === date);
      setFilteredCitas(filtered);
    } else {
      setFilteredCitas(citas);
    }
  };

  const handleEditClick = (cita) => {
    setEditCita(cita);
    setEditMode(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteDoc(doc(db, 'citas', id));
      setCitas(citas.filter(cita => cita.id !== id));
      setFilteredCitas(filteredCitas.filter(cita => cita.id !== id));
    } catch (error) {
      console.error('Error deleting cita: ', error);
    }
  };

  const handleCompleteClick = (id) => {
    setCompletedCitas((prev) => [...prev, id]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editCita) return;

    try {
      const citaRef = doc(db, 'citas', editCita.id);
      await updateDoc(citaRef, editCita);
      setCitas(citas.map(cita => cita.id === editCita.id ? editCita : cita));
      setFilteredCitas(filteredCitas.map(cita => cita.id === editCita.id ? editCita : cita));
      setEditMode(false);
      setEditCita(null);
    } catch (error) {
      console.error('Error updating cita: ', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center text-red-500">Cargando...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-white">
      <header className="flex justify-between items-center mb-6">
        <img src="/Logo.png" alt="Logo" className="h-20" />
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Salir
        </button>
      </header>
      <h1 className="text-4xl font-bold mb-6 text-center text-red-500">ADMINISTRACION STRONG BARBER SHOP</h1>
      <div className="mb-6 flex flex-col items-center">
        <p className="text-center text-xl mb-4 mt-3 text-black">Selecciona una fecha para ver las citas correspondientes:</p>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border border-red-500 text-black rounded p-2"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="py-3 px-4 border-b">Nombre</th>
              <th className="py-3 px-4 border-b">Servicio</th>
              <th className="py-3 px-4 border-b">Barbero</th>
              <th className="py-3 px-4 border-b">Fecha</th>
              <th className="py-3 px-4 border-b">Hora</th>
              <th className="py-3 px-4 border-b">Teléfono</th>
              <th className="py-3 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCitas.map((cita) => (
              <tr key={cita.id} className={`hover:bg-gray-100 ${completedCitas.includes(cita.id) ? 'bg-green-100' : ''}`}>
                <td className="py-3 px-4 border-b text-center text-black">{cita.nombre}</td>
                <td className="py-3 px-4 border-b text-center text-black">{cita.servicio}</td>
                <td className="py-3 px-4 border-b text-center text-black">{cita.barbero}</td>
                <td className="py-3 px-4 border-b text-center text-black">{cita.fecha}</td>
                <td className="py-3 px-4 border-b text-center text-black">{cita.hora}</td>
                <td className="py-3 px-4 border-b text-center text-black">{cita.telefono}</td>
                <td className="py-3 px-4 border-b text-center">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button 
                      onClick={() => handleEditClick(cita)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition duration-300"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(cita.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition duration-300"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleCompleteClick(cita.id)}
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition duration-300"
                    >
                      Completar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-3xl font-bold mb-6 text-center text-red-500">Editar cita</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-black mb-2">Nombre:</label>
                <input
                  type="text"
                  value={editCita.nombre}
                  onChange={(e) => setEditCita({ ...editCita, nombre: e.target.value })}
                  className="w-full p-2 text-black border border-red-500 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">Selecciona un Servicio:</label>
                <input
                  type="text"
                  value={editCita.servicio}
                  onChange={(e) => setEditCita({ ...editCita, servicio: e.target.value })}
                  className="w-full p-2 text-black border border-red-500 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2" htmlFor="barbero">
                  Selecciona un Barbero
                </label>
                <select
                  id="barbero"
                  value={editCita.barbero} 
                  onChange={(e) => setEditCita({ ...editCita, barbero: e.target.value })} 
                  className="w-full px-3 text-black py-2 border rounded"
                  required
                >
                  <option value="" disabled>Selecciona un barbero</option>
                  <option value="Javier">Javier</option>
                  <option value="Eliseo">Eliseo</option>
                  <option value="Enrique">Enrique</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">Fecha:</label>
                <input
                  type="date"
                  value={editCita.fecha}
                  onChange={(e) => setEditCita({ ...editCita, fecha: e.target.value })}
                  className="w-full p-2 text-black border border-red-500 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">Hora:</label>
                <HourSelector
                  value={formatHour(editCita.hora)}
                  onChange={(newHour) => setEditCita({ ...editCita, hora: newHour })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">Teléfono:</label>
                <input
                  type="tel"
                  value={editCita.telefono}
                  onChange={(e) => setEditCita({ ...editCita, telefono: e.target.value })}
                  className="w-full p-2 border text-black border-red-500 rounded"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


