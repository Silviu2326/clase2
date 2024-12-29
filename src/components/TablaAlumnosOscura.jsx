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

const TablaAlumnosOscura = ({ language = 'es' }) => {
  // Para traducciones
  const t = translations[language] || translations['es'];

  // Estados para expansión y búsqueda
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [busquedaGlobal, setBusquedaGlobal] = useState('');

  // Seleccionar el conjunto de datos según el idioma
  const problemsData = language === 'es' ? problemasEducativos : educationalProblems;

  /**
   * Función para obtener las conductas asociadas a una condición específica
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
      // Coincidencia en el nombre del grupo o en cualquier condición
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
   * Renderiza las soluciones para una condición dada
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
              <h5 className="text-sm font-medium text-gray-100">
                {solucion.categoria}:
              </h5>
              <ul className="list-disc pl-5 space-y-1">
                {solucion.estrategias.map((estrategia, estrategiaIdx) => (
                  <li
                    key={estrategiaIdx}
                    className="text-sm text-gray-300"
                  >
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
    <div className="container mx-auto p-4 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-100 min-h-screen">
      {/* Header with glass effect */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl border border-gray-600 shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{t.title}</h1>
            <p className="text-sm text-gray-400">{t.darkMode}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            className="p-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-all duration-300 border border-gray-700 hover:border-blue-500/50"
            title={t.buttons.settings}
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-all duration-300 border border-gray-700 hover:border-blue-500/50"
            title={t.buttons.export}
          >
            <Download className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center space-x-2 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
            <Plus className="w-4 h-4" />
            <span>{t.newStudent}</span>
          </button>
        </div>
      </div>

      {/* Search bar with glass effect */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={busquedaGlobal}
            onChange={(e) => setBusquedaGlobal(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 backdrop-blur-sm text-gray-100 rounded-lg border border-gray-700/50 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
        <button
          className="p-3 text-gray-300 hover:text-blue-400 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800 rounded-lg transition-all duration-300 border border-gray-700/50 hover:border-blue-500/50"
          title={t.buttons.filters}
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Table with glass effect */}
      <div className="overflow-x-auto border border-gray-700/50 rounded-xl bg-gray-800/30 backdrop-blur-sm shadow-xl">
        <table className="min-w-full divide-y divide-gray-700/50">
          <thead className="bg-gray-800/50 backdrop-blur-sm">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300 border-r border-gray-700/50">
                {t.name}
              </th>
              {[1, 2, 3, 4].map(num => (
                <th
                  key={`disorder-${num}`}
                  className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-300 border-r border-gray-700/50"
                >
                  {t.disorder} {num}
                </th>
              ))}
              {[1, 2, 3, 4].map(num => (
                <th
                  key={`behavior-${num}`}
                  className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-300 border-r border-gray-700/50"
                >
                  {t.behavior} {num}
                </th>
              ))}
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-300">
                {t.solutions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {datosFiltrados.map((student) => (
              <React.Fragment key={student.id}>
                {/* Fila principal */}
                <tr
                  className={`cursor-pointer hover:bg-gray-800/70 ${
                    expandedStudent === student.id ? 'bg-gray-800/70' : ''
                  }`}
                  onClick={() => toggleStudent(student.id)}
                >
                  {/* Nombre/Grupo */}
                  <td className="px-4 py-3 border-r border-gray-700/50 text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-700 text-white rounded-lg flex items-center justify-center">
                        <span className="text-gray-300">
                          {student.group.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold">{student.group} {student.period}</div>
                      </div>
                    </div>
                  </td>

                  {/* Condiciones */}
                  {[0, 1, 2, 3].map(index => (
                    <td
                      key={index}
                      className="px-6 py-4 border-r border-gray-700/50 text-center text-sm"
                    >
                      {student.disorders[index] && !isNSA(student.disorders[index]) ? (
                        <span className="text-blue-400 font-semibold">
                          {student.disorders[index].code}
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                  ))}

                  {/* Conductas */}
                  {[0, 1, 2, 3].map(index => (
                    <td
                      key={index}
                      className="px-6 py-4 border-r border-gray-700/50 text-sm"
                    >
                      {student.disorders[index] && !isNSA(student.disorders[index]) ? (
                        <div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBehaviors(student.id, student.disorders[index]);
                            }}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 border border-blue-500/30"
                          >
                            {student.disorders[index].code}
                          </button>
                          {isExpanded(student.id, student.disorders[index].id, 'behaviors') && (
                            <div className="mt-2 p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                              <h4 className="text-sm font-semibold text-blue-400 mb-3">
                                {t.behaviorsFor} {student.disorders[index].name}
                              </h4>
                              <div className="space-y-4">
                                {getConductas(student.disorders[index])?.map((conducta, idx) => (
                                  <div key={idx} className="mb-4">
                                    <h5 className="text-sm font-medium text-blue-300 mb-2">
                                      {conducta.tipo}:
                                    </h5>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                                      {conducta.manifestaciones.map((manifestacion, midx) => (
                                        <li key={midx}>
                                          {manifestacion}
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
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                  ))}

                  {/* Soluciones */}
                  <td className="px-6 py-4 text-sm">
                    {student.disorders
                      .filter(d => !isNSA(d))
                      .map((disorder) => (
                        <button
                          key={disorder.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSolutions(student.id, disorder);
                          }}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 border border-blue-500/30 mr-2 mb-2"
                        >
                          {disorder.code}
                        </button>
                      ))
                    }
                    {student.disorders
                      .filter(d => !isNSA(d))
                      .map((disorder) => (
                        <React.Fragment key={disorder.id}>
                          {isExpanded(student.id, disorder.id, 'solutions') && (
                            <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mt-2">
                              <h4 className="text-sm font-semibold text-blue-400 mb-3">
                                {t.solutionsFor} {disorder.name}
                              </h4>
                              {renderSoluciones(getSoluciones(disorder))}
                            </div>
                          )}
                        </React.Fragment>
                      ))
                    }
                  </td>
                </tr>

                {/* Fila expandida con detalles de conductas y soluciones */}
                {expandedStudent === student.id && (
                  <tr className="bg-gray-800/70">
                    <td
                      colSpan={1 + 4 + 4 + 1}
                      className="px-4 py-4 border-t border-gray-700/50"
                    >
                      <div className="space-y-4">
                        {student.disorders.map((disorder) => {
                          if (!disorder || isNSA(disorder)) return null;

                          const conductasForDisorder = getConductas(disorder);
                          const solucionesForDisorder = getSoluciones(disorder);

                          return (
                            <div key={disorder.id} className="space-y-4">
                              {/* Conductas */}
                              {isExpanded(student.id, disorder.id, 'behaviors') && conductasForDisorder && conductasForDisorder.length > 0 && (
                                <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                                  <h4 className="text-sm font-semibold text-blue-400 mb-3">
                                    {t.behaviorsFor} {disorder.name} ({disorder.code})
                                  </h4>
                                  <div className="space-y-2">
                                    {conductasForDisorder.map((conducta, idx) => (
                                      <div key={idx} className="mb-4">
                                        <h5 className="text-sm font-medium text-blue-300 mb-2">
                                          {conducta.tipo}:
                                        </h5>
                                        <ul className="list-disc pl-5 space-y-1 text-gray-300">
                                          {conducta.manifestaciones.map((manifestacion, midx) => (
                                            <li key={midx}>
                                              {manifestacion}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Soluciones */}
                              {isExpanded(student.id, disorder.id, 'solutions') && solucionesForDisorder && solucionesForDisorder.length > 0 && (
                                <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                                  <h4 className="text-sm font-semibold text-blue-400 mb-3">
                                    {t.solutionsFor} {disorder.name} ({disorder.code})
                                  </h4>
                                  <div className="space-y-4">
                                    {solucionesForDisorder.map((solucion, idx) => (
                                      <div key={idx} className="space-y-2">
                                        <h5 className="text-sm font-medium text-gray-100">
                                          {solucion.categoria}
                                        </h5>
                                        <ul className="list-disc pl-5 space-y-1 text-gray-300">
                                          {solucion.estrategias.map((estrategia, eidx) => (
                                            <li key={eidx}>
                                              {estrategia}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
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
  );
};

export default TablaAlumnosOscura;
