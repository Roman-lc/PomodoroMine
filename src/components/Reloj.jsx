import React from "react";

function Reloj({ children: totalSeconds, isRunning, isPomodoro }) {
  // Aseguramos que el valor sea un número y no negativo
  const safeSeconds = Math.max(0, Number(totalSeconds));

  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  // Formatear a MM:SS
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");


  const displayColor = isRunning ? "white" : "gray";

  return (
    // Se elimina el fragmento <></> innecesario
    <div
      className="reloj"
      style={{
        // ✨ FLEXBOX para apilar y centrar verticalmente
        display: "flex", 
        flexDirection: "column",
        alignItems: "center", // Centrado horizontal
        justifyContent: "center", // Centrado vertical (si el contenedor tiene altura)
        
        // Estilos visuales
        fontWeight: "bold",
        color: displayColor,
        textShadow: "1px 1px 2px #000000, 0 0 1em #000000",
        padding: '10px 0', // Espacio vertical, si es necesario
        minHeight: 'auto', // Permitir que el contenido defina la altura
      }}
    >
      {/* 1. Muestra el tiempo */}
      <span style={{ 
        fontSize: "4em",
        // Ajuste clave: Reducir el espacio de la línea base del texto grande
        lineHeight: 1, 
        // Pequeño espacio controlado debajo del tiempo
        marginBottom: '4px' 
      }}> 
        {formattedMinutes}:{formattedSeconds}
      </span>
      
      {/* 2. Etiqueta del ciclo */}
      <span style={{ 
        fontSize: "small", 
        // Ya no se necesita 'display: "block"' porque Flexbox ya los apila
      }}>
        {isPomodoro ? "POMODORO" : "DESCANSO"}
        {isRunning ? "" : " (PAUSADO)"}
      </span>
    </div>
  );
}

export default Reloj;