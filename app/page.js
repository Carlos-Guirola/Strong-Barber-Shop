"use client";
import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="bg-red-500 relative">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                onClick={toggleMenu}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img className="h-12 w-auto" src="/Logo.png" alt="logo TECNOARTE-WEB" />
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a href="#inicio" className="rounded-md px-3 py-2 text-xl font-medium text-white hover:bg-white hover:text-red-500">Inicio</a>
                <a href="#servicios" className="rounded-md px-3 py-2 text-xl font-medium text-white hover:bg-white hover:text-red-500">Servicios</a>
                <a href="#nosotros" className="rounded-md px-3 py-2 text-xl font-medium text-white hover:bg-white hover:text-red-500">Sobre Nosotros</a>
                <a href="#contactos" className="rounded-md px-3 py-2 text-xl font-medium text-white hover:bg-white hover:text-red-500">Contactos</a>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`absolute inset-x-0 top-full bg-red-500 text-white ${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}
          id="mobile-menu"
          style={{ zIndex: 50 }}
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a href="#inicio" className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white hover:text-red-500">Inicio</a>
            <a href="#servicios" className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white hover:text-red-500">Servicios</a>
            <a href="#nosotros" className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white hover:text-red-500">Sobre Nosotros</a>
            <a href="#contactos" className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white hover:text-red-500">Contactos</a>
          </div>
        </div>
      </nav>

      <section id="inicio" className="relative bg-cover bg-center min-h-screen flex flex-col justify-center items-center" style={{ backgroundImage: 'url(/portada.jpg)' }}>
  <div className="absolute inset-0 bg-black opacity-20" />
  <div className="relative z-10 text-center">
    <h1 className="text-5xl font-bold text-white mb-8">Bienvenido a Strong Barber Shop</h1>
    <p className="text-2xl text-white mb-6">Programe una cita con nosotros en minutos.</p>
    <div className="flex justify-center space-x-[1cm]">
      <a href="/agendar" className="bg-red-500 hover:bg-white hover:text-red-500 text-white font-bold py-2 px-4 rounded">
        Agendar Cita
      </a>
      <a href="/login" className="bg-red-500 hover:bg-white hover:text-red-500 text-white font-bold py-2 px-4 rounded">
        Iniciar Sesión
      </a>
    </div>
  </div>
</section>

<section id="servicios" className="bg-black py-12">
  <div className="container mx-auto px-4">
    <div className="text-center mb-8">
      <div className="w-24 h-1 bg-red-500 mx-auto mb-6" />
      <h2 className="text-3xl font-bold text-white">Nuestros Servicios</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 flex flex-col">
        <img src="/su.jpg" alt="Corte de Cabello" className="w-full h-48 object-cover rounded-t-lg mb-4" />
        <h3 className="text-xl text-red-500 font-bold mb-2">Corte de Cabello Urbano</h3>
        <p className="text-gray-700">Ofrecemos cortes de cabello urbano a la moda y personalizados según tus preferencias.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 flex flex-col">
        <img src="/s1.jpg" alt="Afeitado" className="w-full h-48 object-cover rounded-t-lg mb-4" />
        <h3 className="text-xl text-red-500 font-bold mb-2">Corte de Cabello Clásico</h3>
        <p className="text-gray-700">El corte de cabello clásico ofrece un estilo elegante y atemporal, con líneas limpias y un acabado pulido para un look sofisticado y fácil de mantener.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 flex flex-col">
        <img src="/db.jpg" alt="Delineado de Barba" className="w-full h-48 object-cover rounded-t-lg mb-4" />
        <h3 className="text-xl text-red-500 font-bold mb-2">Delineado de Barba</h3>
        <p className="text-gray-700">Un acabado preciso y definido para resaltar la forma natural de tu barba, dándole un aspecto pulido y bien cuidado.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 flex flex-col">
        <img src="/tb.jpg" alt="Tinte de Barba" className="w-full h-48 object-cover rounded-t-lg mb-4" />
        <h3 className="text-xl text-red-500 font-bold mb-2">Tinte de Barba</h3>
        <p className="text-gray-700">Coloriza y rejuvenece tu barba con un tono natural o audaz, para un look fresco y personalizado.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 flex flex-col">
        <img src="/ds.jpg" alt="Delineado de Cejas" className="w-full h-48 object-cover rounded-t-lg mb-4" />
        <h3 className="text-xl text-red-500 font-bold mb-2">Delineado de Cejas</h3>
        <p className="text-gray-700">Define y estructura tus cejas con precisión para un look pulido y bien cuidado, realzando tu expresión natural.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 flex flex-col">
        <img src="/mb.jpg" alt="Aplicación de Mascarilla Black Mask" className="w-full h-48 object-cover rounded-t-lg mb-4" />
        <h3 className="text-xl text-red-500 font-bold mb-2">Aplicación de Mascarilla Black Mask</h3>
        <p className="text-gray-700">Purifica y rejuvenece tu piel con una mascarilla de arcilla negra, eliminando impurezas y dejándola fresca y radiante.</p>
      </div>
    </div>
  </div>
</section>




<section id="nosotros" className="relative bg-gradient-to-r from-red-500 to-red-700 min-h-screen flex items-center">
  <div className="absolute inset-0 z-0 bg-gradient-to-r from-red-500 to-red-700" />
  <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center">
    <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
      <img src="/img.jpg" alt="Sobre Nosotros" className="w-full max-w-md rounded-lg shadow-lg" />
    </div>
    <div className="lg:w-1/2 lg:pl-12 text-center lg:text-left">
      <h2 className="text-4xl font-bold text-white mb-6">Sobre Nosotros</h2>
      <p className="text-lg text-white leading-relaxed">
        Nos enorgullece ofrecer un servicio de alta calidad en un ambiente acogedor y profesional. Nuestro equipo de barberos experimentados está dedicado a brindarte la mejor experiencia posible, ya sea que vengas por un corte de cabello clásico o un estilo moderno. Nos esforzamos por crear un espacio donde te sientas relajado y bien cuidado, asegurándonos de que cada visita sea una experiencia excepcional. ¡Ven y descubre por qué somos la barbería favorita de la ciudad!
      </p>
    </div>
  </div>
</section>
 
<section id="contactos" className="bg-white text-white py-12">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl text-red-500 font-bold text-center mb-12">Contáctanos</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="flex flex-col justify-center">
        <h3 className="text-2xl text-black font-semibold mb-4">Nuestra Ubicación</h3>
        <p className="text-lg  text-black mb-4">Avenida El Ángel #22
        Boulevard Centro, Sonzacate
        Sonsonate, El Salvador
        Media cuadra abajo del Parque Sonzacate </p>
        <h3 className="text-2xl text-black font-semibold mb-4">Teléfono</h3>
        <p className="text-lg  text-black mb-2">+503 2448 3766</p>
      </div>

      <div className="flex flex-col justify-center">
        <h3 className="text-2xl font-semibold mb-4  text-black">Síguenos en nuestras redes</h3>
        <div className="flex space-x-6">
          <a href="https://www.instagram.com/strongbarber_shop/" target="_blank" rel="noopener noreferrer">
            <img src="/i.png" alt="Instagram" className="w-8 h-8" />
          </a>
          <a href="https://www.facebook.com/people/Strong-BarberShop/100063525195224/" target="_blank" rel="noopener noreferrer">
            <img src="/f.png" alt="Facebook" className="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
    <div className="mt-12">
      <iframe 
      src="https://www.google.com/maps/d/u/0/embed?mid=1C6SokBWztp7lKpydpgXROykqRc0ohQ4&ehbc=2E312F&noprof=1"
        width="100%" 
        height="400" 
        allowFullScreen="" 
        loading="lazy" 
        className="rounded-lg shadow-lg">
      </iframe>
    </div>
  </div>
</section>

<footer className="bg-red-600 text-white py-4">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center justify-between">
      <p className="text-lg text-center md:text-left mb-2 md:mb-0">
        © {new Date().getFullYear()} Strong Barber Shop. Todos los derechos reservados.
      </p>
      <div className="flex items-center">
        <p className="text-sm mr-2 text-center md:text-left">
          Hecho por TecnoArte-Web 2024
        </p>
        <img src="/logos.png" alt="Tecnoarte Web Logo" className="h-8" />
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}
