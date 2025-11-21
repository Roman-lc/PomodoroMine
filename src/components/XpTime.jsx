import React from 'react';

function XpTime({ tiempoRestante, tiempoTotalPomodoro, tiempoTotalRecreo, isPomodoro }) {
  const TOTAL_SEGMENTOS = 10;

  // 1. Obtener el tiempo total en segundos según el modo
  const tiempoTotalMinutos = isPomodoro ? tiempoTotalPomodoro : tiempoTotalRecreo;
  const tiempoTotalSegundos = tiempoTotalMinutos * 60;

  // 2. CALCULAR TIEMPO TRANSCURRIDO (Lo que ya pasó)
  // Si el total son 60s y faltan 50s -> Han pasado 10s (La barra empieza a llenarse)
  const tiempoTranscurrido = tiempoTotalSegundos - tiempoRestante;

  // 3. Calcular el porcentaje sobre lo transcurrido
  const porcentaje = tiempoTotalSegundos > 0 ? tiempoTranscurrido / tiempoTotalSegundos : 0;

  // 4. Convertir a segmentos
  const segmentosLlenos = Math.round(porcentaje * TOTAL_SEGMENTOS);

  const listaSegmentos = Array.from({ length: TOTAL_SEGMENTOS });

  return (
    <div className="xp-bar-container" id="xp-bar">
      {listaSegmentos.map((_, indice) => (
        <div key={indice} className="xp-segment">
          {/* Renderiza verde solo si el índice es menor a la cantidad llena */}
          {indice < segmentosLlenos && <div className="xp-segment-fill"></div>}
        </div>
      ))}
    </div>
  );
}

export default XpTime;