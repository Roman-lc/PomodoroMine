import "./App.css";
import { useState, useEffect } from "react";
import Jugadores from "./components/Jugadores";
import Reloj from "./components/Reloj";
import XpTime from "./components/XpTime";
import Reproductor from "./components/Reproductor";

const BotonFlecha = ({ onClick, esIncrementar, deshabilitado }) => {
  const [hover, setHover] = useState(false);

  const getSrc = () => {
    if (deshabilitado) return "/src/assets/FlechaNoActiva.png";
    if (hover) return "/src/assets/FlechaHolder.png";
    return "/src/assets/FlechaActiva.png";
  };

  const getRotation = () => {
    if (deshabilitado) {
      return esIncrementar ? "0deg" : "180deg";
    } else {
      return esIncrementar ? "180deg" : "0deg";
    }
  };

  return (
    <img
      src={getSrc()}
      className="flecha"
      onClick={() => !deshabilitado && onClick()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: deshabilitado ? "default" : "pointer",
        transform: `rotate(${getRotation()})`
      }}
    />
  );
};

function App() {

  const obtenerGuardado = (clave, valorInicial) => {
    const guardado = localStorage.getItem(clave);
    if (guardado) {
      return JSON.parse(guardado);
    }
    return valorInicial;
  };
  // Esto es del Reloj
  const [isRunning, setIsRunning] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(true);

  function toggleRunning() {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  }

  function resetTime() {
    setIsRunning(false); 
    setTime(isPomodoro ? tiempoPodoro * 60 : tiempoRecreo * 60);
  }

  //perfiles etc

  const [perfilActivo, setPerfilActivo] = useState(() => obtenerGuardado("perfilActivo", 1));

  const [pomodoroPerfil1, setPomodoroPerfil1] = useState(() => obtenerGuardado("pomodoroPerfil1", 25));
  const [recreoPerfil1, setRecreoPerfil1] = useState(() => obtenerGuardado("recreoPerfil1", 5));

  const [pomodoroPerfil2, setPomodoroPerfil2] = useState(() => obtenerGuardado("pomodoroPerfil2", 50));
  const [recreoPerfil2, setRecreoPerfil2] = useState(() => obtenerGuardado("recreoPerfil2", 10));

  const [pp1, setPp1] = useState(0);
  const [pp2, setPp2] = useState(0);
  const [rp1, setRp1] = useState(0);
  const [rp2, setRp2] = useState(0);

  const [tiempoPodoro, setTiempoPodoro] = useState(() => {
    return perfilActivo === 1 ? pomodoroPerfil1 : pomodoroPerfil2;
  });

  const [tiempoRecreo, setTiempoRecreo] = useState(() => {
    return perfilActivo === 1 ? recreoPerfil1 : recreoPerfil2;
  });

  const [time, setTime] = useState(() => {
    const minutosIniciales = perfilActivo === 1 ? pomodoroPerfil1 : pomodoroPerfil2;
    return minutosIniciales * 60;
  });

  useEffect(() => {
    localStorage.setItem("perfilActivo", JSON.stringify(perfilActivo));
    localStorage.setItem("pomodoroPerfil1", JSON.stringify(pomodoroPerfil1));
    localStorage.setItem("recreoPerfil1", JSON.stringify(recreoPerfil1));
    localStorage.setItem("pomodoroPerfil2", JSON.stringify(pomodoroPerfil2));
    localStorage.setItem("recreoPerfil2", JSON.stringify(recreoPerfil2));
  }, [perfilActivo, pomodoroPerfil1, recreoPerfil1, pomodoroPerfil2, recreoPerfil2]);

  // Este efecto se ejecuta automáticamente cada vez que cambia el perfilActivo
  // o si cambias la configuración de tiempos de los perfiles.
  useEffect(() => {
    let nuevoTiempoTrabajo;
    let nuevoTiempoRecreo;

    // 1. Detectar qué tiempos usar
    if (perfilActivo === 1) {
      nuevoTiempoTrabajo = pomodoroPerfil1;
      nuevoTiempoRecreo = recreoPerfil1;
    } else {
      nuevoTiempoTrabajo = pomodoroPerfil2;
      nuevoTiempoRecreo = recreoPerfil2;
    }

    // 2. Actualizar los estados de referencia
    setTiempoPodoro(nuevoTiempoTrabajo);
    setTiempoRecreo(nuevoTiempoRecreo);

    // 3. Resetear el reloj principal
    setIsRunning(false); // Pausar el reloj
    setIsPomodoro(true); // Volver al modo Pomodoro
    setTime(nuevoTiempoTrabajo * 60); // IMPORTANTE: Convertir minutos a segundos

  }, [perfilActivo, pomodoroPerfil1, recreoPerfil1, pomodoroPerfil2, recreoPerfil2]);


  const ajustarTiempoActual = (minutos) => {
  setTime((prevTime) => {
    const nuevoTiempo = prevTime + (minutos * 60);
    return nuevoTiempo > 0 ? nuevoTiempo : 0; // Prevent negative time
  });
};

  const guardarCambios = () => {
    // 1. Actualizamos los estados "Reales" con lo que hay en los "Temporales"
    setPomodoroPerfil1(pp1);
    setRecreoPerfil1(rp1);
    setPomodoroPerfil2(pp2);
    setRecreoPerfil2(rp2);

    // 2. Calculamos el nuevo tiempo para el reloj según el perfil activo
    let nuevoTiempoTrabajo;
    let nuevoTiempoRecreo;

    if (perfilActivo === 1) {
      // Usamos las variables temporales (pp1/rp1) porque las reales 
      // tardan un render en actualizarse
      nuevoTiempoTrabajo = pp1;
      nuevoTiempoRecreo = rp1;
    } else {
      nuevoTiempoTrabajo = pp2;
      nuevoTiempoRecreo = rp2;
    }

    // 3. Actualizamos los tiempos de referencia del reloj
    setTiempoPodoro(nuevoTiempoTrabajo);
    setTiempoRecreo(nuevoTiempoRecreo);

    // 4. Reseteamos y cerramos
    setIsPomodoro(true);
    setIsRunning(false);
    setTime(nuevoTiempoTrabajo * 60);

    setEstaAbierto(false); // Cerramos el menú automáticamente al guardar
  };

  // Esto es del menu de opciones
  const [estaAbierto, setEstaAbierto] = useState(false);

  const alternarMenu = () => {
    if (!estaAbierto) {
      setPp1(pomodoroPerfil1);
      setRp1(recreoPerfil1);
      setPp2(pomodoroPerfil2);
      setRp2(recreoPerfil2);
    }
    setEstaAbierto(!estaAbierto);
  };

  //Esto en el nombre del Item
  const [itemActual, setItemActual] = useState("  ");

  const handleEnter = (texto) => {
    setItemActual(texto);
  };

  const handleLeave = () => {
    setItemActual("  ");
  };

  //Esto es del item disco
  const [music, setMusic] = useState(false);
  const alterarMusica = () => {
    setMusic(!music);
  };
  

  //Esto es del item cuadro
  const [cuadro, setCuadro] = useState(() => obtenerGuardado("cuadro", 1));

  const alterarCuadro = () => {
    setCuadro((prevCuadro) => {
      if (prevCuadro >= 5) {
        return 1;
      } else {
        return prevCuadro + 1;
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("cuadro", JSON.stringify(cuadro));
    const claseFondo = `fondo-${cuadro}`;
    for (let i = 1; i <= 5; i++) {
      document.body.classList.remove(`fondo-${i}`);
    }
    document.body.classList.add(claseFondo);
  }, [cuadro]);

  //El tiempo baja uno por segundo,
  useEffect(() => {
    // Si llega a 0, cambiar modo y ajustar tiempo (no dentro del intervalo)
    if (time === 0) {
      if (isPomodoro) {
        setTime(tiempoRecreo * 60);
      } else {
        setTime(tiempoPodoro * 60);
      }
      setIsPomodoro((prev) => !prev);
      return;
    }

    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time, isRunning, isPomodoro, tiempoPodoro, tiempoRecreo]);

  return (
    <>
      <Reproductor reproducir={music}></Reproductor>
      {estaAbierto && (
        <opciones>
          <div id="botonCierre">
            <button onClick={alternarMenu}>Cerrar</button>
          </div>

          <div>
            <div>Tiempos:</div>
            <div>Tiempo Pomodoro: {tiempoPodoro}</div>
            <div>Tiempo recreo: {tiempoRecreo}</div>

            <div>
              <div className="perfil">
                <div className="tituloPerfil">Perfil 1:</div>
                Pomodoro:
                <BotonFlecha
                  esIncrementar={false}
                  deshabilitado={pp1 <= 1}
                  onClick={() => setPp1((prev) => Math.max(1, prev - 1))}
                />
                <div>{pp1}</div>
                <BotonFlecha
                  esIncrementar={true}
                  deshabilitado={false}
                  onClick={() => setPp1((prev) => prev + 1)}
                />
                Recreo:
                <BotonFlecha
                  esIncrementar={false}
                  deshabilitado={rp1 <= 1}
                  onClick={() => setRp1((prev) => Math.max(1, prev - 1))}
                />
                <div>{rp1}</div>
                <BotonFlecha
                  esIncrementar={true}
                  deshabilitado={false}
                  onClick={() => setRp1((prev) => prev + 1)}
                />
              </div>

              <div className="perfil">
                <div className="tituloPerfil">Perfil 2:</div>
                Pomodoro:
                <BotonFlecha
                  esIncrementar={false}
                  deshabilitado={pp2 <= 1}
                  onClick={() => setPp2((prev) => Math.max(1, prev - 1))}
                />
                <div>{pp2}</div>
                <BotonFlecha
                  esIncrementar={true}
                  deshabilitado={false}
                  onClick={() => setPp2((prev) => prev + 1)}
                />
                Recreo:
                <BotonFlecha
                  esIncrementar={false}
                  deshabilitado={rp2 <= 1}
                  onClick={() => setRp2((prev) => Math.max(1, prev - 1))}
                />
                <div>{rp2}</div>
                <BotonFlecha
                  esIncrementar={true}
                  deshabilitado={false}
                  onClick={() => setRp2((prev) => prev + 1)}
                />
              </div>

              <div className="perfil">
                <button className="minecraft-btn" onClick={guardarCambios}>Guardar cambios</button>
              </div>
            </div>

            <div>
              redes
            </div>
          </div>
        </opciones>
      )}

      <div className="bloque">
        <superior className="ladrillo superior">
          <personas>
            <Jugadores perfilActivo={perfilActivo} setPerfilActivo={setPerfilActivo}></Jugadores>
          </personas>
          <Reloj isRunning={isRunning} isPomodoro={isPomodoro}>{time}</Reloj>
        </superior>

        <barraTiempo className="ladrillo nombreItemAltura">
          <div
            style={{
              minHeight: "25px",
              fontWeight: "bold",
              textShadow: "1px 1px 2px #000000, 0 0 1em #000000",
            }}
          >
            {itemActual}
          </div>
          <XpTime tiempoRestante={time} tiempoTotalPomodoro={tiempoPodoro} tiempoTotalRecreo={tiempoRecreo} isPomodoro={isPomodoro}></XpTime>
        </barraTiempo>

        <menu className="ladrillo">
          <div
            className="minecraft-slot item molde1"
            onMouseEnter={() => handleEnter("Sumar un minuto")}
            onMouseLeave={handleLeave}
            onClick={() => ajustarTiempoActual(1)}
          ></div>
          <div
            className="minecraft-slot item molde2"
            onMouseEnter={() => handleEnter("Sumar cinco minutos")}
            onMouseLeave={handleLeave}
            onClick={() => ajustarTiempoActual(5)}
          ></div>
          <div
            className="minecraft-slot item molde3"
            onMouseEnter={() => handleEnter("Restar un minuto")}
            onMouseLeave={handleLeave}
            onClick={() => ajustarTiempoActual(-1)}
          ></div>
          <div
            className="minecraft-slot item molde4"
            onMouseEnter={() => handleEnter("Restar cinco minutos")}
            onMouseLeave={handleLeave}
            onClick={() => ajustarTiempoActual(-5)}
          ></div>
          <div
            className="minecraft-slot item cuadro"
            onMouseEnter={() => handleEnter("Cambiar fondo")}
            onMouseLeave={handleLeave}
            onClick={alterarCuadro}
          ></div>
          <div
            className={`minecraft-slot item ${music ? "music" : "noMusic"}`}
            onMouseEnter={() => handleEnter("Musica")}
            onMouseLeave={handleLeave}
            onClick={alterarMusica}
          ></div>
          <div
            className="minecraft-slot item boton"
            onMouseEnter={() => handleEnter("Resetear tiempo")}
            onMouseLeave={handleLeave}
            onClick={resetTime}
          ></div>
          <div
            className={`minecraft-slot item ${isRunning ? "antorcha" : "antorchaApagada"
              }`}
            onMouseEnter={() => handleEnter("Pausar/Reproducir reloj")}
            onMouseLeave={handleLeave}
            onClick={toggleRunning}
          ></div>
          <div
            className="minecraft-slot item config"
            onMouseEnter={() => handleEnter("Opciones")}
            onMouseLeave={handleLeave}
            onClick={alternarMenu}
          ></div>
        </menu>
      </div>
    </>
  );
}

export default App;
