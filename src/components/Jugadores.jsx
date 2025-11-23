import React from 'react'

import faceRubius from '../assets/FaceRubius.svg'
import faceVeggeta from '../assets/FaceVeggeta777.jpg'
import pingFull from '../assets/PingFull.png'
import ping from '../assets/Ping.png'

export default function Jugadores({perfilActivo, setPerfilActivo}) {

    const handlePerfilClick = (perfil) => {
        setPerfilActivo(perfil);
    };


  return (
    <div className="player-list">
      
      <div className="player-entry" onClick={() => handlePerfilClick(1)}>
          <div>
              <img className="player-ping" src={faceRubius}/>
          </div>

          <div className="player-name">
              Perfil 1
          </div>

          <div>
              <img className="player-ping" src={perfilActivo === 1 ? pingFull : ping}/>
          </div>
      </div>

      <div className="player-entry" onClick={() => handlePerfilClick(2)}>
          <div>
              <img className="player-ping" src={faceVeggeta}/>
          </div>
          <div className="player-name">
              Perfil 2
          </div>
          <div>
              <img className="player-ping" src={perfilActivo === 1 ? ping : pingFull}/>
          </div>
      </div>

    </div>
  )
}
