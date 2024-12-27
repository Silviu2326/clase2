import React from 'react';
import { X, BookOpen, Target, Brain, Clock, Heart, Layout, Laptop, Users } from 'lucide-react';

const SolucionPersonalizadaPopup = ({ solucion, onClose, onSave, alumno }) => {
  if (!solucion) return null;

  // Función para procesar el texto y separarlo en secciones numeradas
  const procesarSolucion = (texto) => {
    const lineas = texto.split('\n');
    const secciones = [];
    let seccionActual = null;

    lineas.forEach(linea => {
      if (linea.match(/^\d+\./)) {
        if (seccionActual) secciones.push(seccionActual);
        seccionActual = { titulo: linea, contenido: [] };
      } else if (seccionActual && linea.trim()) {
        seccionActual.contenido.push(linea);
      }
    });
    if (seccionActual) secciones.push(seccionActual);
    return secciones;
  };

  // Iconos para cada sección
  const iconosPorSeccion = {
    0: <BookOpen className="w-5 h-5" />,
    1: <Target className="w-5 h-5" />,
    2: <Brain className="w-5 h-5" />,
    3: <Clock className="w-5 h-5" />,
    4: <Heart className="w-5 h-5" />,
    5: <Layout className="w-5 h-5" />,
    6: <Laptop className="w-5 h-5" />,
    7: <Users className="w-5 h-5" />
  };

  const secciones = procesarSolucion(solucion);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-xl transform transition-all">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">
                Solución Personalizada
              </h2>
              <p className="text-indigo-100 mt-1">
                {alumno.nombre} - {alumno.descripcion}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Diagnósticos */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Diagnósticos
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              alumno.trastornoPsicologico1,
              alumno.trastornoPsicologico2,
              alumno.trastornoPsicologico3
            ]
              .filter(Boolean)
              .map((trastorno, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium"
                >
                  {trastorno}
                </span>
              ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-280px)]">
          <div className="grid gap-6">
            {secciones.map((seccion, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                    {iconosPorSeccion[index]}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {seccion.titulo}
                  </h4>
                </div>
                <div className="pl-12">
                  {seccion.contenido.map((parrafo, idx) => (
                    <p
                      key={idx}
                      className="text-gray-600 dark:text-gray-300 mb-2 last:mb-0"
                    >
                      {parrafo}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(solucion)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors"
          >
            Guardar Solución
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolucionPersonalizadaPopup;
