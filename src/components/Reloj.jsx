import React from 'react';

function Reloj({ children: totalSeconds }) {
  // Aseguramos que el valor sea un número y no negativo
  const safeSeconds = Math.max(0, Number(totalSeconds)); 

  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  // Formatear para que siempre tenga dos dígitos (ej: 05 en lugar de 5)
  // .padStart(2, '0') asegura que la cadena tenga al menos 2 caracteres,
  // rellenando con '0' si es necesario.
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return (
    <div className='reloj'>
      {formattedMinutes}:{formattedSeconds}
    </div>
  );
}

export default Reloj;