import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import TablaAlumnos from './components/TablaAlumnos';
import TablaAlumnosAlternativa from './components/TablaAlumnosAlternativa';
import TablaAlumnosModerna from './components/TablaAlumnosModerna';
import TablaAlumnosDashboard from './components/TablaAlumnosDashboard';
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

  const getData = () => {
    return language === 'en' ? educationalProblems.problems : problemasEducativos.problemas;
  };

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
            <button
              onClick={() => setTablaActiva('oscura-minimalista')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                tablaActiva === 'oscura-minimalista'
                  ? 'bg-slate-600 text-white'
                  : esModoOscuro 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Tabla Oscura Minimalista
            </button>
            <button
              onClick={() => setTablaActiva('oscura-neomorfica')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                tablaActiva === 'oscura-neomorfica'
                  ? 'bg-gradient-to-r from-gray-700 to-slate-900 text-white'
                  : esModoOscuro 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Tabla Oscura Neomórfica
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                esModoOscuro 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Globe size={20} />
              <span>{language === 'es' ? 'English' : 'Español'}</span>
            </button>
            <button
              onClick={toggleView}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              {showAlternative ? t.switchToOriginal : t.switchToAlternative}
            </button>
          </div>
        </div>
        <div className="mt-4">
          {showAlternative ? (
            <TablaAlumnosAlternativa data={getData()} language={language} />
          ) : (
            <div>
              {tablaActiva === 'original' && <TablaAlumnos data={getData()} language={language} />}
              {tablaActiva === 'alternativa' && <TablaAlumnosAlternativa data={getData()} language={language} />}
              {tablaActiva === 'moderna' && <TablaAlumnosModerna data={getData()} language={language} />}
              {tablaActiva === 'dashboard' && <TablaAlumnosDashboard data={getData()} language={language} />}
              {tablaActiva === 'elegante' && <TablaAlumnosElegante data={getData()} language={language} />}
              {tablaActiva === 'oscura' && <TablaAlumnosOscura data={getData()} language={language} />}
              {tablaActiva === 'oscura-gradiente' && <TablaAlumnosOscuraGradiente data={getData()} language={language} />}
              {tablaActiva === 'oscura-minimalista' && <TablaAlumnosOscuraMinimalista data={getData()} language={language} />}
              {tablaActiva === 'oscura-neomorfica' && <TablaAlumnosOscuraNeomorfica data={getData()} language={language} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
