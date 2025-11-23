import React, { useState, useRef, useEffect } from 'react';
import cuadrado from '../assets/Slider.png';

function MinecraftSlider({onChange, value}) {
  const [percentage, setPercentage] = useState(value !== undefined ? value : 50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (value !== undefined) {
      setPercentage(value);
    }
  }, [value]);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calcular posición relativa
    const x = clientX - rect.left;
    let newPercentage = (x / rect.width) * 100;

    // Limites estrictos (Clamp)
    if (newPercentage < 0) newPercentage = 0;
    if (newPercentage > 100) newPercentage = 100;

    setPercentage(newPercentage);
    if (onChange) onChange(newPercentage);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  useEffect(() => {
      const handleMouseMoveWindow = (e) => { if (isDragging) handleMove(e.clientX); };
      const handleMouseUpWindow = () => { if (isDragging) setIsDragging(false); };
      if (isDragging) {
        window.addEventListener('mousemove', handleMouseMoveWindow);
        window.addEventListener('mouseup', handleMouseUpWindow);
      }
      return () => {
        window.removeEventListener('mousemove', handleMouseMoveWindow);
        window.removeEventListener('mouseup', handleMouseUpWindow);
      };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      style={{
        backgroundColor:'rgba(41, 41, 41)',
        color: 'rgba(244, 244, 244)',
        height: '40px',
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img 
        src={cuadrado}
        alt="Thumb"
        style={{
          height: '100%', // Se adapta al alto de la barra
          position: 'absolute',
          top: '0',
          
          // LA CORRECCIÓN DE POSICIÓN:
          left: `${percentage}%`,
          transform: `translateX(-${percentage}%)`,
          
          pointerEvents: 'none' 
        }} 
      />
      
      {/* Texto con sombra para efecto Minecraft */}
      <span style={{ zIndex: 1, textShadow: '2px 1px 0px #000' }}>
        Volumen de la musica: {Math.round(percentage)}%
      </span>
    </div>
  )
}

export default MinecraftSlider;