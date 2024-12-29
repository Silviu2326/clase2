import React, { useState } from 'react'; 
import { Search, ChevronDown, ChevronRight, ChevronUp, Filter, Settings, Download, Plus } from 'lucide-react';
import logo from './logo.jpeg';
import studentsData from '../data/students.json';
import problemasEducativos from '../data/problemas-educativos.json';
import educationalProblems from '../data/educational-problems.json';

// Mapeo de códigos de condiciones a IDs de problemas educativos
const codigoAId = {
  'C&L': 1,
  'SEMH': 4,
  'ADHD': 5,
  'SpLD': 16,
  'APD': 6,
  'NSA': 19
};

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
    disorder: 'Condición',
    disorders: 'Condiciones',
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
    disorder: 'Condition',
    disorders: 'Conditions',
    behavior: 'Behavior',
    behaviors: 'Behaviors',
    solutions: 'Solutions',
    viewBehaviors: 'View behaviors',
    viewSolutions: 'View solutions',
    solutionsFor: 'Solutions for',
    behaviorsFor: 'Behaviors of'
  }
};

const TablaAlumnosModerna = ({ language = 'es' }) => {
  // Para traducciones
  const t = translations[language] || translations['es'];

  // Estados para expansión y búsqueda
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [busquedaGlobal, setBusquedaGlobal] = useState('');

  // Seleccionar el conjunto de datos según el idioma
  const problemsData = language === 'es' ? problemasEducativos : educationalProblems;

  /**
   * Función para obtener las conductas asociadas a un trastorno específico
   */
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
    
    if (!behaviors) return [];

    // Mantener la estructura completa de las conductas
    const mappedBehaviors = behaviors.map(behavior => ({
      tipo: language === 'es' ? behavior.tipo : behavior.type,
      manifestaciones: language === 'es' ? behavior.manifestaciones : behavior.manifestations || []
    }));
    
    console.log('Final behaviors:', mappedBehaviors);
    return mappedBehaviors;
  };

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

  const isNSA = (disorder) => {
    return disorder && disorder.code === 'NSA';
  };

  const getBehaviorHelperText = (disorder) => {
    if (!disorder) return '';
    if (isNSA(disorder)) return 'No se aplica';
    const conductas = getConductas(disorder);
    if (!conductas || conductas.length === 0) return 'No hay conductas asociadas';
    return `Ver conductas (${conductas.length})`;
  };

  const getSolutionHelperText = (disorder) => {
    if (!disorder) return '';
    if (isNSA(disorder)) return 'No se aplica';
    const soluciones = getSoluciones(disorder);
    if (!soluciones || soluciones.length === 0) return 'No hay soluciones asociadas';
    return `Ver soluciones (${soluciones.length})`;
  };

  /**
   * Filtrado de los datos a partir de la búsqueda global
   */
  const datosFiltrados = Object.values(studentsData.groups).flatMap((group) =>
    group.students.filter((student) => {
      // Coincidencia en el nombre del grupo o en cualquier trastorno
      const matchGroup = student.group.toLowerCase().includes(busquedaGlobal.toLowerCase());
      const matchDisorders = student.disorders.some(
        (d) =>
          d.name.toLowerCase().includes(busquedaGlobal.toLowerCase()) ||
          d.code.toLowerCase().includes(busquedaGlobal.toLowerCase())
      );

      return matchGroup || matchDisorders;
    })
  );

  const toggleBehaviors = (studentId, disorder) => {
    console.log('Toggling behaviors for student:', studentId, 'disorder:', disorder);
    setExpandedItems(prev => {
      const key = `${studentId}-${disorder.id}-behaviors`;
      const newItems = { ...prev };
      newItems[key] = !prev[key];
      return newItems;
    });
  };

  const toggleSolutions = (studentId, disorder) => {
    console.log('Toggling solutions for student:', studentId, 'disorder:', disorder);
    setExpandedItems(prev => {
      const key = `${studentId}-${disorder.id}-solutions`;
      const newItems = { ...prev };
      newItems[key] = !prev[key];
      return newItems;
    });
  };

  const toggleStudent = (studentId) => {
    setExpandedStudent(prev => {
      const newState = prev === studentId ? null : studentId;
      if (newState === null) {
        // Si cerramos el estudiante, limpiamos los estados de expansión
        setExpandedItems({});
      }
      return newState;
    });
  };

  const isExpanded = (studentId, disorderId, type) => {
    const key = `${studentId}-${disorderId}-${type}`;
    return expandedItems[key] || false;
  };

  /**
   * Renderiza las soluciones para un trastorno dado
   */
  const renderSoluciones = (soluciones) => {
    console.log('Rendering solutions:', soluciones);
    if (!soluciones || !Array.isArray(soluciones) || soluciones.length === 0) {
      console.log('No solutions to render');
      return null;
    }

    return (
      <div className="space-y-4">
        {soluciones.map((solucion, idx) => {
          if (!solucion || !solucion.categoria || !Array.isArray(solucion.estrategias)) {
            console.log('Invalid solution object:', solucion);
            return null;
          }

          return (
            <div key={idx} className="space-y-2">
              <h5 className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {solucion.categoria}:
              </h5>
              <ul className="list-disc pl-5 space-y-1">
                {solucion.estrategias.map((estrategia, estrategiaIdx) => (
                  <li key={estrategiaIdx} className="text-sm text-slate-600 dark:text-slate-300">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      {/* Header con diseño moderno */}
      <div className="max-w-[1800px] mx-auto mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="bg-gradient-to-br from-teal-500 to-emerald-500 p-3 rounded-xl shadow-lg">
                  <img src={logo} alt="Logo" className="h-12 w-auto filter brightness-0 invert" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                    {t.title}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">{t.darkMode}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="p-2 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl transition-all duration-200"
                  title={t.buttons.settings}
                >
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  className="p-2 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl transition-all duration-200"
                  title={t.buttons.export}
                >
                  <Download className="w-5 h-5" />
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">{t.newStudent}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda con diseño moderno */}
      <div className="max-w-[1800px] mx-auto mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={busquedaGlobal}
              onChange={(e) => setBusquedaGlobal(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 shadow-lg text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
            />
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
          </div>
          <button className="px-4 py-3 bg-white dark:bg-slate-800 rounded-xl flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 shadow-lg border border-slate-200 dark:border-slate-700">
            <Filter className="w-5 h-5" />
            <span className="font-medium">{t.buttons.filters}</span>
          </button>
        </div>
      </div>

      {/* Tabla con diseño moderno */}
      <div className="max-w-[1800px] mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-600">
                    {t.name}
                  </th>
                  {[1, 2, 3, 4].map(num => (
                    <th
                      key={`disorder-${num}`}
                      className="px-6 py-4 text-center text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-600"
                    >
                      {t.disorder} {num}
                    </th>
                  ))}
                  {[1, 2, 3, 4].map(num => (
                    <th
                      key={`behavior-${num}`}
                      className="px-6 py-4 text-center text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-600"
                    >
                      {t.behavior} {num}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-600">
                    {t.solutions}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
                {datosFiltrados.map((student) => (
                  <React.Fragment key={student.id}>
                    <tr
                      className={`group cursor-pointer transition-all duration-200 ${
                        expandedStudent === student.id 
                          ? 'bg-slate-50 dark:bg-slate-700/50' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-700/30'
                      }`}
                      onClick={() => toggleStudent(student.id)}
                    >
                      {/* Nombre/Grupo */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl shadow-lg flex items-center justify-center">
                            <span className="text-white font-medium text-lg">
                              {student.group.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                              {student.group}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              {student.period}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Condiciones */}
                      {[0, 1, 2, 3].map(index => (
                        <td key={index} className="px-6 py-4 text-center">
                          {student.disorders[index] && !isNSA(student.disorders[index]) ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-medium bg-gradient-to-r from-teal-500/10 to-emerald-500/10 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                              {student.disorders[index].code}
                            </span>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-500">-</span>
                          )}
                        </td>
                      ))}

                      {/* Conductas */}
                      {[0, 1, 2, 3].map(index => (
                        <td key={index} className="px-6 py-4">
                          {student.disorders[index] && !isNSA(student.disorders[index]) ? (
                            <div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleBehaviors(student.id, student.disorders[index]);
                                }}
                                className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-800/40 transition-colors duration-200 border border-teal-200 dark:border-teal-800"
                              >
                                <span>{student.disorders[index].code}</span>
                                {isExpanded(student.id, student.disorders[index].id, 'behaviors') ? (
                                  <ChevronUp className="w-4 h-4 ml-1" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 ml-1" />
                                )}
                              </button>
                              {isExpanded(student.id, student.disorders[index].id, 'behaviors') && (
                                <div className="mt-3 p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 shadow-lg">
                                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
                                    {t.behaviorsFor} {student.disorders[index].name}
                                  </h4>
                                  <div className="space-y-4">
                                    {getConductas(student.disorders[index])?.map((conducta, idx) => (
                                      <div key={idx} className="space-y-2">
                                        <h5 className="text-sm font-medium text-teal-700 dark:text-teal-300">
                                          {conducta.tipo}
                                        </h5>
                                        <ul className="space-y-2">
                                          {conducta.manifestaciones.map((manifestacion, midx) => (
                                            <li
                                              key={midx}
                                              className="flex items-start space-x-2 text-sm text-slate-600 dark:text-slate-300"
                                            >
                                              <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-teal-400 dark:bg-teal-500"></span>
                                              <span>{manifestacion}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-500">-</span>
                          )}
                        </td>
                      ))}

                      {/* Soluciones */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {student.disorders.filter(d => !isNSA(d)).map((disorder) => (
                            <button
                              key={disorder.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSolutions(student.id, disorder);
                              }}
                              className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800/40 transition-colors duration-200 border border-emerald-200 dark:border-emerald-800"
                            >
                              <span>{disorder.code}</span>
                              {isExpanded(student.id, disorder.id, 'solutions') ? (
                                <ChevronUp className="w-4 h-4 ml-1" />
                              ) : (
                                <ChevronDown className="w-4 h-4 ml-1" />
                              )}
                            </button>
                          ))}
                        </div>
                        {student.disorders.filter(d => !isNSA(d)).map((disorder) => (
                          isExpanded(student.id, disorder.id, 'solutions') && (
                            <div key={disorder.id} className="mt-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 shadow-lg">
                              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
                                {t.solutionsFor} {disorder.name}
                              </h4>
                              {renderSoluciones(getSoluciones(disorder))}
                            </div>
                          )
                        ))}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaAlumnosModerna;
