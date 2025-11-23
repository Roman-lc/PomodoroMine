import React, { useRef, useEffect } from 'react';
import cancion from '../assets/Audio/lofi.mp3';

const Reproductor = ({reproducir, volumen}) => {

    const audioRef = useRef(null);

    useEffect(() => {
    if (audioRef.current) {
      // Convertimos de 0-100 a 0.0-1.0
      const volumenDecimal = volumen / 100; 
      audioRef.current.volume = volumenDecimal;
    }
  }, [volumen]);

    useEffect(() => {
    // Esta lógica se ejecuta cada vez que cambia la variable 'reproducir'
    if (audioRef.current) {
        if (reproducir) {
        // Intentamos reproducir
        audioRef.current.play().catch(error => {
            console.log("Esperando interacción del usuario para reproducir audio:", error);
        });
        } else {
        // Pausamos
        audioRef.current.pause();
        }
    }
  }, [reproducir]);

  return (
    <div className="reproductor-container">
      {/* 'controls' muestra el reproductor nativo del navegador */}
      <audio
      ref={audioRef}
      loop
      hidden
      autoPlay
      src={cancion}>
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  );
};

export default Reproductor;