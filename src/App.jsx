import "./App.css";
import { useState, useEffect } from "react";
import Jugadores from "./components/Jugadores";
import Reloj from "./components/Reloj";

function App() {
  // Esto es del Reloj
  const [time, setTime] = useState(200);
  const [isRunning, setIsRunning] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(true);

  function toggleRunning() {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  }

  function resetTime() {
    setTime(5);
  }

  //perfiles etc
  const [tiempoPodoro, setTiempoPodoro] = useState(20);
  const [tiempoRecreo, setTiempoRecreo] = useState(10);

  const [perfilActivo, setPerfilActivo] = useState(1);

  const [pomodoroPerfil1, setPomodoroPerfil1] = useState(25);
  const [recreoPerfil1, setRecreoPerfil1] = useState(5);

  const [pomodoroPerfil2, setPomodoroPerfil2] = useState(50);
  const [recreoPerfil2, setRecreoPerfil2] = useState(10);

  const cambiarPerfil = () => {
    setPerfilActivo((prev) => (prev === 1 ? 2 : 1));
  };

  const guardarCambios = () => {
    if (perfilActivo === 1) {
      setTiempoPodoro(pomodoroPerfil1);
      setTiempoRecreo(recreoPerfil1);
    }
    else {
      setTiempoPodoro(pomodoroPerfil2);
      setTiempoRecreo(recreoPerfil2);
    }
    setIsPomodoro(true);
    setTime(tiempoPodoro);
  }

  // Esto es del menu de opciones
  const [estaAbierto, setEstaAbierto] = useState(false);

  const alternarMenu = () => {
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
  const [cuadro, setCuadro] = useState(1);
  const alterarCuadro = () => {
    setCuadro((prevcuadro) => prevcuadro + 1);
    if (cuadro == 5) {
      setCuadro(1);
    }
  };

  useEffect(() => {
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
        setTime(tiempoRecreo);
      } else {
        setTime(tiempoPodoro);
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
                <button
                  onClick={() => {
                    setPomodoroPerfil1((prevTime) => Math.max(1, prevTime - 1));
                  }}>-1</button>
                <div>{pomodoroPerfil1}</div>
                <button 
                onClick={() => {
                    setPomodoroPerfil1((prevTime) => prevTime + 1);
                  }}>+1</button>
                Recreo:
                <button onClick={() => {
                    setRecreoPerfil1((prevTime) => Math.max(1, prevTime - 1));
                  }}>-1</button>
                <div>{recreoPerfil1}</div>
                <button
                onClick={() => {
                    setRecreoPerfil1((prevTime) => prevTime + 1);
                  }}>+1</button>
              </div>

              <div className="perfil">
                <div className="tituloPerfil">Perfil 2:</div>
                Pomodoro:
                <button
                  onClick={() => {
                    setPomodoroPerfil2((prevTime) => Math.max(1, prevTime - 1));
                  }}
                >
                  -1
                </button>
                <div>{pomodoroPerfil2}</div>
                <button
                  onClick={() => {
                    setPomodoroPerfil2((prevTime) => prevTime + 1);
                  }}
                >
                  +1
                </button>
                Recreo:
                <button
                  onClick={() => {
                    setRecreoPerfil2((prevTime) => Math.max(1, prevTime - 1));
                  }}
                >
                  -1
                </button>
                <div>{recreoPerfil2}</div>
                <button
                  onClick={() => {
                    setRecreoPerfil2((prevTime) => prevTime + 1);
                  }}
                >
                  +1
                </button>
              </div>

              <div className="perfil">
                <div className="">Perfil Activo:</div>
                <button onClick={cambiarPerfil}>{perfilActivo}</button>
                <button onClick={guardarCambios}>Aplicar cambios</button>
              </div>
            </div>

            <div>redes</div>
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
          <div class="xp-bar-container" id="xp-bar">
            <div class="xp-segment">
              <div class="xp-segment-fill"></div>
            </div>
            <div class="xp-segment">
              <div class="xp-segment-fill"></div>
            </div>
            <div class="xp-segment">
              <div class="xp-segment-fill"></div>
            </div>
            <div class="xp-segment">
              <div class="xp-segment-fill"></div>
            </div>
            <div class="xp-segment">
              <div class="xp-segment-fill"></div>
            </div>
            <div class="xp-segment">
              <div class="xp-segment-fill"></div>
            </div>
            <div class="xp-segment">
              <div class="xp-segment-fill"></div>
            </div>
            <div class="xp-segment">
              <div class="xp-segment-fill"></div>
            </div>
            <div class="xp-segment"></div>
            <div class="xp-segment"></div>
          </div>
        </barraTiempo>

        <menu className="ladrillo">
          <div
            className="minecraft-slot item molde1"
            onMouseEnter={() => handleEnter("Sumar un minuto")}
            onMouseLeave={handleLeave}
          ></div>
          <div
            className="minecraft-slot item molde2"
            onMouseEnter={() => handleEnter("Sumar cinco minutos")}
            onMouseLeave={handleLeave}
          ></div>
          <div
            className="minecraft-slot item molde3"
            onMouseEnter={() => handleEnter("Restar un minuto")}
            onMouseLeave={handleLeave}
          ></div>
          <div
            className="minecraft-slot item molde4"
            onMouseEnter={() => handleEnter("Restar cinco minutos")}
            onMouseLeave={handleLeave}
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
            className={`minecraft-slot item ${
              isRunning ? "antorcha" : "antorchaApagada"
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
