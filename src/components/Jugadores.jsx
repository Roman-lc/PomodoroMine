import React from 'react'

export default function Jugadores({perfilActivo, setPerfilActivo}) {

    const handlePerfilClick = (perfil) => {
        setPerfilActivo(perfil);
    };


  return (
    <div className="player-list">
      
      <div className="player-entry" onClick={() => handlePerfilClick(1)}>
          <div>
              <img className="player-ping" src='/src/assets/FaceRubius.svg'/>
          </div>

          <div className="player-name">
              Perfil 1
          </div>

          <div>
              <img className="player-ping" src={perfilActivo === 1 ? '/src/assets/PingFull.png' : '/src/assets/Ping.png'}/>
          </div>
      </div>

      <div className="player-entry" onClick={() => handlePerfilClick(2)}>
          <div>
              <img className="player-ping" src='/src/assets/FaceVeggeta777.jpg'/>
          </div>
          <div className="player-name">
              Perfil 2
          </div>
          <div>
              <img className="player-ping" src={perfilActivo === 1 ? '/src/assets/Ping.png' : '/src/assets/PingFull.png'}/>
          </div>
      </div>

    </div>
  )
}
