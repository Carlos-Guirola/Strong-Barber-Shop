'use client';

import { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function AgendarCita() {
  const [nombre, setNombre] = useState('');
  const [servicio, setServicio] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('1');
  const [minutos, setMinutos] = useState('00');
  const [ampm, setAmpm] = useState('AM');
  const [telefono, setTelefono] = useState('');
  const [barbero, setBarbero] = useState('');
  const [mensaje, setMensaje] = useState('');
  const router = useRouter();

  const formatTo12Hour = (hour, minutes, ampm) => {
    const formattedHour = ((hour % 12) || 12).toString().padStart(2, '0');
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedHora = `${hora}:${minutos} ${ampm}`;

    try {
      const citasRef = collection(db, 'citas');
      const q = query(citasRef, where('fecha', '==', fecha), where('hora', '==', formattedHora));
      const querySnapshot = await getDocs(q);

      const barberosConCita = [];
      querySnapshot.forEach((doc) => {
        const cita = doc.data();
        barberosConCita.push(cita.barbero);
      });

      if (barberosConCita.length >= 3) {
        setMensaje('No hay más cupo disponible a esta hora. Por favor, elige otra hora.');
      } else if (barberosConCita.includes(barbero)) {
        setMensaje(`El barbero ${barbero} ya tiene una cita a esta hora. Por favor, elige otra hora o barbero.`);
      } else {
        await addDoc(citasRef, {
          nombre,
          servicio,
          fecha,
          hora: formattedHora,
          telefono,
          barbero,
        });
        setMensaje('Cita agendada exitosamente.');
        setNombre('');
        setServicio('');
        setFecha('');
        setHora('1');
        setMinutos('00');
        setAmpm('AM');
        setTelefono('');
        setBarbero('');
      }
    } catch (err) {
      setMensaje('Hubo un error al agendar la cita, intenta nuevamente.');
      console.error('Error al guardar la cita: ', err);
    }
  };

  const handleVolverInicio = () => {
    router.push('/');
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-red-600">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-red-500">Agendar Cita</h1>
          <div className="flex justify-center mb-6">
<<<<<<< HEAD
            <img src="/logo.png" alt="Logo" className="h-16" />
=======
            <img src="/Logo.png" alt="Logo" className="h-16" /> 
>>>>>>> 11990a3ffebe2ff9b92aaf28d590d67d96dbd77a
          </div>
          {mensaje && <p className="text-green-500 mb-4 text-center">{mensaje}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
              Nombre Completo
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 text-black py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="servicio">
              Servicio
            </label>
            <select
              id="servicio"
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              className="w-full px-3 text-black py-2 border rounded"
              required
            >
              <option value="" disabled>Selecciona un servicio</option>
              <option value="Corte de cabello">Corte de cabello Urbano</option>
              <option value="Afeitado">Corte de cabello Clásico</option>
              <option value="Tinte">Delineado de Barba</option>
              <option value="Recorte de barba">Tinte en Barba</option>
              <option value="Limpieza facial">Delineado de Cejas</option>
              <option value="Limpieza facial">Aplicación de mascarilla Black Mask</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="barbero">
              Barbero
            </label>
            <select
              id="barbero"
              value={barbero}
              onChange={(e) => setBarbero(e.target.value)}
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha">
              Fecha
            </label>
            <input
              type="date"
              id="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-3 text-black py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hora">
              Hora
            </label>
            <div className="flex space-x-2">
              <select
                id="hora"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                className="w-1/3 px-3 text-black py-2 border rounded"
                required
              >
                {[...Array(12).keys()].map(i => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select
                id="minutos"
                value={minutos}
                onChange={(e) => setMinutos(e.target.value)}
                className="w-1/3 px-3 text-black py-2 border rounded"
                required
              >
                {[0, 15, 30, 45].map(m => (
                  <option key={m} value={m}>{m.toString().padStart(2, '0')}</option>
                ))}
              </select>
              <select
                id="ampm"
                value={ampm}
                onChange={(e) => setAmpm(e.target.value)}
                className="w-1/3 px-3 text-black py-2 border rounded"
                required
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <p className="text-gray-700 mt-2">Hora seleccionada: {formatTo12Hour(hora, minutos, ampm)}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full px-3 text-black py-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Agendar Cita
          </button>
          <button onClick={handleVolverInicio} className="mt-4 bg-white border-2 border-red-500 hover:bg-red-100 text-red-500 font-bold py-2 px-4 rounded w-full">
            Volver al inicio
          </button>
        </form>
      </div>
    </div>
  );
}
