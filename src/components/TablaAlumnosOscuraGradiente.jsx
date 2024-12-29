import React, { useState } from 'react';
import studentsData from '../data/students.json';
import problemasEducativos from '../data/problemas-educativos.json';
import educationalProblems from '../data/educational-problems.json';
import { 
  Search, 
  ChevronDown,
  ChevronUp,
  Filter,
  Settings,
  Download,
  Plus
} from 'lucide-react';
import logo from './logo.jpeg';

const TablaAlumnosOscuraGradiente = ({ language = 'es' }) => {
  console.log('Imported data:', { studentsData, problemasEducativos, educationalProblems });
  console.log('Current language:', language);

  const [expandedStudent, setExpandedStudent] = useState(null);
  const [expandedBehaviors, setExpandedBehaviors] = useState({});
  const [expandedSolutions, setExpandedSolutions] = useState({});
  const [busquedaGlobal, setBusquedaGlobal] = useState('');

  // Seleccionar el conjunto de datos según el idioma
  const problemsData = language === 'es' ? problemasEducativos : educationalProblems;

  // Traducciones
  const translations = {
    es: {
      title: 'Tabla de Alumnos',
      darkMode: 'Modo Oscuro',
      newStudent: 'Nuevo Alumno',
      searchPlaceholder: 'Buscar...',
      buttons: {
        settings: 'Configuración',
        export: 'Exportar',
        filters: 'Filtros'
      },
      name: 'Nombre',
      disorder: 'Trastorno',
      behavior: 'Conducta',
      behaviors: 'Conductas',
      solutions: 'Soluciones',
      viewBehaviors: 'Ver conductas',
      viewSolutions: 'Ver soluciones',
      solutionsFor: 'Soluciones para',
      behaviorsFor: 'Conductas de'
    },
    en: {
      title: 'Students Table',
      darkMode: 'Dark Mode',
      newStudent: 'New Student',
      searchPlaceholder: 'Search...',
      buttons: {
        settings: 'Settings',
        export: 'Export',
        filters: 'Filters'
      },
      name: 'Name',
      disorder: 'Disorder',
      behavior: 'Behavior',
      behaviors: 'Behaviors',
      solutions: 'Solutions',
      viewBehaviors: 'View behaviors',
      viewSolutions: 'View solutions',
      solutionsFor: 'Solutions for',
      behaviorsFor: 'Behaviors of'
    }
  };

  const t = translations[language];

  // Mapeo de códigos de trastornos a IDs de problemas educativos
  const codigoAId = {
    'C&L': 1,
    'SEMH': 4,
    'ADHD': 5,
    'SpLD': 16,
    'APD': 6,
    'NSA': 19
  };

  // Función para obtener las conductas asociadas a un trastorno específico
  const getConductas = (disorder) => {
    console.log('Getting conductas for disorder:', disorder);
    const problemaId = codigoAId[disorder.code];
    console.log('Mapped problemaId:', problemaId);
    if (!problemaId) return null;

    const problems = language === 'es' ? problemsData.problemas : problemsData.problems;
    console.log('Selected problems data:', problems);
    console.log('Current language:', language);
    const problema = problems.find(p => p.id === problemaId);
    console.log('Found problema:', problema);
    
    if (!problema) return null;

    const behaviors = language === 'es' ? problema.conductas : problema.behaviors;
    console.log('Selected behaviors:', behaviors);
    
    // Extraer las manifestaciones según el idioma
    let manifestaciones = [];
    if (language === 'es') {
      manifestaciones = behaviors.flatMap(b => b.manifestaciones);
    } else {
      // En inglés, extraer todas las manifestaciones de cada behavior
      manifestaciones = behaviors.reduce((acc, behavior) => {
        if (behavior.manifestations && Array.isArray(behavior.manifestations)) {
          acc.push(...behavior.manifestations);
        }
        return acc;
      }, []);
    }
    
    console.log('Final manifestaciones:', manifestaciones);
    return manifestaciones;
  };

  // Función para obtener las soluciones asociadas a un trastorno específico
  const getSoluciones = (disorder) => {
    console.log('Getting solutions for disorder:', disorder.code);
    const problemaId = codigoAId[disorder.code];
    if (!problemaId) {
      console.log('No problema ID found for code:', disorder.code);
      return null;
    }

    const problems = language === 'es' ? problemsData.problemas : problemsData.problems;
    const problema = problems.find(p => p.id === problemaId);
    
    if (!problema) {
      console.log('No problema found for ID:', problemaId);
      return null;
    }

    console.log('Found problema:', problema);
    
    // Obtener las soluciones según el idioma
    const solutions = language === 'es' ? problema.soluciones : problema.solutions;
    if (!solutions) {
      console.log('No solutions found');
      return [];
    }

    // Transformar las soluciones al formato esperado
    const formattedSolutions = solutions.map(solution => ({
      categoria: language === 'es' ? solution.categoria : solution.category,
      estrategias: language === 'es' ? solution.estrategias : solution.strategies || []
    }));

    console.log('Formatted solutions:', formattedSolutions);
    return formattedSolutions;
  };

  // Función para obtener las soluciones asociadas a un trastorno específico
  const isNSA = (disorder) => {
    return disorder && disorder.code === 'NSA';
  };

  // Filtrado de datos basado en la búsqueda global
  const datosFiltrados = Object.values(studentsData.groups).flatMap(group =>
    group.students.filter(student =>
      student.group.toLowerCase().includes(busquedaGlobal.toLowerCase()) ||
      student.disorders.some(d => 
        d.name.toLowerCase().includes(busquedaGlobal.toLowerCase()) ||
        d.code.toLowerCase().includes(busquedaGlobal.toLowerCase())
      )
    )
  );

  // Renderizado de soluciones
  const renderSoluciones = (soluciones) => {
    console.log('Rendering solutions:', soluciones);
    if (!soluciones || !Array.isArray(soluciones) || soluciones.length === 0) {
      console.log('No solutions to render');
      return null;
    }

    return (
      <div className="space-y-6">
        {soluciones.map((solucion, idx) => {
          // Verificar que solucion y sus propiedades existen
          if (!solucion || !solucion.categoria || !Array.isArray(solucion.estrategias)) {
            console.log('Invalid solution object:', solucion);
            return null;
          }

          return (
            <div key={idx} className="mb-4">
              <h5 className="text-cyan-300 font-medium mb-3">{solucion.categoria}:</h5>
              <ul className="list-disc pl-5 space-y-2">
                {solucion.estrategias.map((estrategia, estrategiaIdx) => (
                  <li key={estrategiaIdx} className="text-gray-300">
                    {estrategia}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  const toggleBehaviors = (studentId, disorder) => {
    console.log('===== TOGGLE BEHAVIORS FUNCTION =====');
    console.log('Student ID:', studentId);
    console.log('Disorder:', disorder);
    console.log('Current behaviors state:', expandedBehaviors);
    const key = `${studentId}-${disorder.id}`;
    console.log('State key:', key);
    const newState = !expandedBehaviors[key];
    console.log('New state will be:', newState);
    
    setExpandedBehaviors(prev => {
      const updated = {
        ...prev,
        [key]: newState
      };
      console.log('Updated behaviors state:', updated);
      return updated;
    });
  };

  const toggleSolutions = (studentId, disorder) => {
    console.log('===== TOGGLE SOLUTIONS FUNCTION =====');
    console.log('Student ID:', studentId);
    console.log('Disorder:', disorder);
    console.log('Current solutions state:', expandedSolutions);
    const key = `${studentId}-${disorder.id}`;
    console.log('State key:', key);
    const newState = !expandedSolutions[key];
    console.log('New state will be:', newState);
    
    setExpandedSolutions(prev => {
      const updated = {
        ...prev,
        [key]: newState
      };
      console.log('Updated solutions state:', updated);
      return updated;
    });
  };

  const toggleStudent = (studentId) => {
    setExpandedStudent(prev => prev === studentId ? null : studentId);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl">
      {/* Header con gradiente */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                <img src={logo} alt="Logo" className="h-10 w-auto" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <p className="text-gray-400">{t.darkMode}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors backdrop-blur-sm"
                title={t.buttons.settings}
              >
                <Settings className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors backdrop-blur-sm"
                title={t.buttons.export}
              >
                <Download className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-lg flex items-center space-x-2 hover:from-cyan-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-900/20">
                <Plus className="w-4 h-4" />
                <span>{t.newStudent}</span>
              </button>
            </div>
          </div>

          {/* Búsqueda */}
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={busquedaGlobal}
                onChange={(e) => setBusquedaGlobal(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 text-gray-200 rounded-lg border border-gray-700/50 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 placeholder-gray-500"
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <button 
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors backdrop-blur-sm"
              title={t.buttons.filters}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabla con efecto de cristal */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {t.name}
                </th>
                {[1, 2, 3, 4].map(index => (
                  <th key={index} className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {t.disorder} {index}
                  </th>
                ))}
                {[1, 2, 3, 4].map(index => (
                  <th key={index} className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {t.behavior} {index}
                  </th>
                ))}
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {t.solutions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {datosFiltrados.map((student, index) => (
                <React.Fragment key={student.id}>
                  <tr 
                    className={`group transition-all duration-200 cursor-pointer
                      ${expandedStudent === student.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
                    onClick={() => toggleStudent(student.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-white rounded-lg flex items-center justify-center border border-white/10">
                          {student.group.charAt(0)}
                        </div>
                        <span className="text-gray-200 font-medium">
                          {student.group} {student.period}
                        </span>
                      </div>
                    </td>
                    {[0, 1, 2, 3].map(index => (
                      <td key={index} className="px-6 py-4 text-center">
                        {student.disorders[index] ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                            {student.disorders[index].code}
                          </span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                    ))}
                    {[0, 1, 2, 3].map(index => (
                      <td key={index} className="px-6 py-4 text-center">
                        {student.disorders[index] ? (
                          isNSA(student.disorders[index]) ? (
                            <span className="text-gray-500">-</span>
                          ) : (
                            <button
                              onClick={(e) => {
                                console.log('===== BEHAVIOR BUTTON CLICKED IN BEHAVIORS COLUMN =====');
                                console.log('Column index:', index);
                                console.log('Disorder:', student.disorders[index]);
                                console.log('Student:', student);
                                toggleBehaviors(student.id, student.disorders[index]);
                              }}
                              className="px-3 py-1 bg-gradient-to-r from-purple-600/50 to-purple-500/50 rounded-lg hover:from-purple-500/50 hover:to-purple-400/50 transition-colors text-sm text-white"
                            >
                              {student.disorders[index].code}
                            </button>
                          )
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {student.disorders
                          .filter(disorder => !isNSA(disorder))
                          .map(disorder => (
                            <React.Fragment key={disorder.id}>
                              <button
                                onClick={(e) => {
                                  console.log('===== SOLUTION BUTTON CLICKED IN SOLUTIONS COLUMN =====');
                                  console.log('Disorder:', disorder);
                                  console.log('Student:', student);
                                  toggleSolutions(student.id, disorder);
                                }}
                                className="px-3 py-1 bg-gradient-to-r from-cyan-600/50 to-cyan-500/50 rounded-lg hover:from-cyan-500/50 hover:to-cyan-400/50 transition-colors text-sm text-white"
                              >
                                {disorder.code}
                              </button>
                            </React.Fragment>
                          ))}
                      </div>
                    </td>
                  </tr>
                  {expandedStudent === student.id && (
                    <tr className="bg-white/5">
                      <td colSpan="10" className="px-6 py-4">
                        <div className="space-y-4">
                          {student.disorders.map((disorder, index) => {
                            const conductasForDisorder = getConductas(disorder);
                            const isExpandedBehavior = expandedBehaviors[`${student.id}-${disorder.id}`];
                            const isExpandedSolution = expandedSolutions[`${student.id}-${disorder.id}`];
                            
                            if (!conductasForDisorder && !disorder) return null;

                            return (
                              <React.Fragment key={disorder.id}>
                                {isExpandedBehavior && conductasForDisorder && (
                                  <div className="p-4 bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-lg mb-4">
                                    {console.log('===== RENDERING BEHAVIORS SECTION =====', {
                                      studentId: student.id,
                                      disorderId: disorder.id,
                                      code: disorder.code,
                                      expandedKey: `${student.id}-${disorder.id}`,
                                      isExpanded: expandedBehaviors[`${student.id}-${disorder.id}`],
                                      conductasCount: conductasForDisorder.length
                                    })}
                                    <h4 className="font-semibold mb-4 text-white">
                                      {t.behaviorsFor} {disorder.name}:
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-2">
                                      {conductasForDisorder.map((conducta, idx) => (
                                        <li key={idx} className="text-gray-300">
                                          {conducta}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {isExpandedSolution && (
                                  <div className="p-4 bg-gradient-to-r from-cyan-900/30 to-cyan-800/30 rounded-lg">
                                    {console.log('===== RENDERING SOLUTIONS SECTION =====', {
                                      studentId: student.id,
                                      disorderId: disorder.id,
                                      code: disorder.code,
                                      expandedKey: `${student.id}-${disorder.id}`,
                                      isExpanded: expandedSolutions[`${student.id}-${disorder.id}`],
                                      solutions: getSoluciones(disorder)
                                    })}
                                    <h4 className="font-semibold mb-4 text-white">
                                      {t.solutionsFor} {disorder.name}:
                                    </h4>
                                    {renderSoluciones(getSoluciones(disorder))}
                                  </div>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaAlumnosOscuraGradiente;
