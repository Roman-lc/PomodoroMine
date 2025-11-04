
import './App.css'
import { useState, useEffect } from 'react'
import Jugadores from './components/Jugadores'
import Reloj from './components/Reloj'

function App() {

  // Esto es del Reloj
  const [time, setTime] = useState(200)
  const [isRunning, setIsRunning] = useState(false);

  function toggleRunning() {
    setIsRunning(prevIsRunning => !prevIsRunning);
  }

  function resetTime() {
    setTime(1200)
  }

  //perfiles etc
  const [tiempoPodoro, setTiempoPodoro] = useState(1500);
  const [tiempoRecreo, setTiempoRecreo] = useState(600);

  // Esto es del menu de opciones
  const [estaAbierto, setEstaAbierto] = useState(false);

  const alternarMenu = () => {
    setEstaAbierto(!estaAbierto);
  };

  //Esto en el nombre del Item
  const [itemActual, setItemActual] = useState('  ');

  const handleEnter = (texto) => {
    setItemActual(texto)
  }

  const handleLeave =() => {
    setItemActual("  ")
  }

  //Esto es del item disco
  const [music, setMusic] = useState(false);
  const alterarMusica = () => {
    setMusic(!music)
  }

  //Esto es del item cuadro
  const [cuadro, setCuadro] = useState(1);
  const alterarCuadro = () => {
    setCuadro(prevcuadro => prevcuadro + 1)
    if (cuadro == 5) {
      setCuadro(1)
    } 
  }

  useEffect(() => {
    const claseFondo = `fondo-${cuadro}`;
    for (let i = 1; i <= 5; i++) {
      document.body.classList.remove(`fondo-${i}`);
    }
    document.body.classList.add(claseFondo);

  }, [cuadro]);

  //El tiempo baja uno por segundo, 
  useEffect(() => {
    let intervalId = null;
    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [time, isRunning]);


  return (
    <>

    {estaAbierto && <opciones>
      <div id='botonCierre'><button onClick={alternarMenu}>chau</button></div>
      <div>
        <div>Perfil 1:</div>
        <div>{tiempoPodoro}</div>
        <div>{tiempoRecreo}</div>
      </div>
      <div>3</div>
      </opciones>}

    <div className='bloque'>

      <superior className='ladrillo superior'>
        <personas>
          <Jugadores></Jugadores>
        </personas>
        <Reloj>{time}</Reloj>
      </superior>
 
      <barraTiempo className='ladrillo nombreItemAltura'>
        <div style={{minHeight:'25px',fontWeight:'bold', textShadow:'1px 1px 2px #000000, 0 0 1em #000000'}}>{itemActual}</div>
        <div class="xp-bar-container" id="xp-bar">
          <div class="xp-segment"><div class="xp-segment-fill"></div></div>
          <div class="xp-segment"><div class="xp-segment-fill"></div></div>
          <div class="xp-segment"><div class="xp-segment-fill"></div></div>
          <div class="xp-segment"><div class="xp-segment-fill"></div></div>
          <div class="xp-segment"><div class="xp-segment-fill"></div></div>
          <div class="xp-segment"><div class="xp-segment-fill"></div></div>
          <div class="xp-segment"><div class="xp-segment-fill"></div></div>
          <div class="xp-segment"><div class="xp-segment-fill"></div></div>
          <div class="xp-segment"></div>
          <div class="xp-segment"></div>
        </div>

      </barraTiempo>

      <menu className='ladrillo'>
        <div className='minecraft-slot item molde1' onMouseEnter={() => handleEnter("Sumar un minuto")} onMouseLeave={handleLeave}></div>
        <div className='minecraft-slot item molde2' onMouseEnter={() => handleEnter("Sumar cinco minutos")} onMouseLeave={handleLeave}></div>
        <div className='minecraft-slot item molde3' onMouseEnter={() => handleEnter("Restar un minuto")} onMouseLeave={handleLeave}></div>
        <div className='minecraft-slot item molde4' onMouseEnter={() => handleEnter("Restar cinco minutos")} onMouseLeave={handleLeave}></div>
        <div className='minecraft-slot item cuadro' onMouseEnter={() => handleEnter("Cambiar fondo")} onMouseLeave={handleLeave} onClick={alterarCuadro}></div>
        <div className={`minecraft-slot item ${music ? 'music' : 'noMusic'}`} onMouseEnter={() => handleEnter("Musica")} onMouseLeave={handleLeave} onClick={alterarMusica}></div>
        <div className='minecraft-slot item boton' onMouseEnter={() => handleEnter("Resetear tiempo")} onMouseLeave={handleLeave} onClick={resetTime}></div>
        <div className={`minecraft-slot item ${isRunning ? 'antorcha' : 'antorchaApagada'}`} onMouseEnter={() => handleEnter("Pausar/Reproducir reloj")} onMouseLeave={handleLeave} onClick={toggleRunning}></div>
        <div className='minecraft-slot item config' onMouseEnter={() => handleEnter("Opciones")} onMouseLeave={handleLeave} onClick={alternarMenu}></div>
      </menu>

    </div>
    </>
  )
}

export default App
