import React from 'react'

export default function Jugadores() {
  return (
    <div className="player-list">
      
      <div className="player-entry">
          <div>
              <img className="player-ping" src='/src/assets/FaceRubius.svg'/>
          </div>

          <div className="player-name">
              Perfil 1
          </div>

          <div>
              <img className="player-ping" src='/src/assets/Ping.png'/>
          </div>
      </div>

      <div className="player-entry">
          <div>
              <img className="player-ping" src='/src/assets/FaceVeggeta777.jpg'/>
          </div>
          <div className="player-name">
              Perfil 2
          </div>
          <div>
              <img className="player-ping" src='/src/assets/PingFull.png'/>
          </div>
      </div>

    </div>
  )
}
