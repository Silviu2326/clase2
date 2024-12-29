import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import TablaAlumnos from './components/TablaAlumnos';
import TablaAlumnosAlternativa from './components/TablaAlumnosAlternativa';
import TablaAlumnosModerna from './components/TablaAlumnosModerna';
import TablaAlumnosElegante from './components/TablaAlumnosElegante';
import TablaAlumnosOscura from './components/TablaAlumnosOscura';
import TablaAlumnosOscuraGradiente from './components/TablaAlumnosOscuraGradiente';
import TablaAlumnosOscuraMinimalista from './components/TablaAlumnosOscuraMinimalista';
import TablaAlumnosOscuraNeomorfica from './components/TablaAlumnosOscuraNeomorfica';
import { translations } from './translations/translations';
import educationalProblems from './data/educational-problems.json';
import problemasEducativos from './data/problemas-educativos.json';
import './App.css';

function App() {
  const [tablaActiva, setTablaActiva] = useState('original');
  const [language, setLanguage] = useState('es');
  const [showAlternative, setShowAlternative] = useState(false);
  const esModoOscuro = ['oscura', 'oscura-gradiente', 'oscura-minimalista', 'oscura-neomorfica'].includes(tablaActiva);
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const toggleView = () => {
    setShowAlternative(prev => !prev);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${esModoOscuro ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="p-4">
        <div className={`flex justify-between items-center mb-6 ${esModoOscuro ? 'bg-gray-800 p-4 rounded-xl' : ''}`}>
          <div className="flex space-x-4 flex-wrap gap-y-2">
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
          <div className="flex space-x-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
           
          </div>
        </div>
        <div className="mt-4">
          {showAlternative ? (
            <TablaAlumnosAlternativa language={language} />
          ) : (
            <div>
              {tablaActiva === 'original' && <TablaAlumnos language={language} />}
              {tablaActiva === 'alternativa' && <TablaAlumnosAlternativa language={language} />}
              {tablaActiva === 'moderna' && <TablaAlumnosModerna language={language} />}
              {tablaActiva === 'elegante' && <TablaAlumnosElegante language={language} />}
              {tablaActiva === 'oscura' && <TablaAlumnosOscura language={language} />}
              {tablaActiva === 'oscura-gradiente' && <TablaAlumnosOscuraGradiente language={language} />}
              {tablaActiva === 'oscura-minimalista' && <TablaAlumnosOscuraMinimalista language={language} />}
              {tablaActiva === 'oscura-neomorfica' && <TablaAlumnosOscuraNeomorfica language={language} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
