import React, { useState } from 'react';
import TablaAlumnos from './components/TablaAlumnos';
import TablaAlumnosAlternativa from './components/TablaAlumnosAlternativa';
import TablaAlumnosModerna from './components/TablaAlumnosModerna';
import TablaAlumnosDashboard from './components/TablaAlumnosDashboard';
import TablaAlumnosElegante from './components/TablaAlumnosElegante';
import TablaAlumnosOscura from './components/TablaAlumnosOscura';
import TablaAlumnosOscuraGradiente from './components/TablaAlumnosOscuraGradiente';
import './App.css';

function App() {
  const [tablaActiva, setTablaActiva] = useState('original');
  const esModoOscuro = tablaActiva === 'oscura' || tablaActiva === 'oscura-gradiente';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${esModoOscuro ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="p-4">
        <div className={`mb-6 flex justify-center space-x-4 flex-wrap gap-y-2 ${esModoOscuro ? 'bg-gray-800 p-4 rounded-xl' : ''}`}>
          <button
            onClick={() => setTablaActiva('original')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              tablaActiva === 'original'
                ? 'bg-blue-600 text-white'
                : esModoOscuro 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Tabla Original
          </button>
          <button
            onClick={() => setTablaActiva('alternativa')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              tablaActiva === 'alternativa'
                ? 'bg-purple-600 text-white'
                : esModoOscuro 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Tabla Alternativa
          </button>
          <button
            onClick={() => setTablaActiva('moderna')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              tablaActiva === 'moderna'
                ? 'bg-teal-600 text-white'
                : esModoOscuro 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Tabla Moderna
          </button>
          <button
            onClick={() => setTablaActiva('dashboard')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              tablaActiva === 'dashboard'
                ? 'bg-indigo-600 text-white'
                : esModoOscuro 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Vista Dashboard
          </button>
          <button
            onClick={() => setTablaActiva('elegante')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              tablaActiva === 'elegante'
                ? 'bg-rose-600 text-white'
                : esModoOscuro 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Tabla Elegante
          </button>
          <button
            onClick={() => setTablaActiva('oscura')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              tablaActiva === 'oscura'
                ? 'bg-violet-600 text-white'
                : esModoOscuro 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Tabla Oscura
          </button>
          <button
            onClick={() => setTablaActiva('oscura-gradiente')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              tablaActiva === 'oscura-gradiente'
                ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                : esModoOscuro 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Tabla Oscura Gradiente
          </button>
        </div>

        <div>
          {tablaActiva === 'original' && <TablaAlumnos />}
          {tablaActiva === 'alternativa' && <TablaAlumnosAlternativa />}
          {tablaActiva === 'moderna' && <TablaAlumnosModerna />}
          {tablaActiva === 'dashboard' && <TablaAlumnosDashboard />}
          {tablaActiva === 'elegante' && <TablaAlumnosElegante />}
          {tablaActiva === 'oscura' && <TablaAlumnosOscura />}
          {tablaActiva === 'oscura-gradiente' && <TablaAlumnosOscuraGradiente />}
        </div>
      </div>
    </div>
  );
}

export default App;
