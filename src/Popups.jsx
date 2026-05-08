import React from 'react';

const popupData = {
  biography: {icon: '/file.png', title: 'About Me'},
  music: {icon: '/napster.png', title: 'My Music'},
  mail: {icon: '/mail.png', title: 'Contact Me'},
  photos: {icon: '/photos.png', title: 'Photos'},
}

function Topbar({ name, icon, closeWindow}) {
  return (
    <div className="dragbar">
      <div className="dragbar-left">
        <img src={popupData[name]?.icon || '/default.png'} alt={`${name}-icon`} className="dragbar-icon"/>
        <span>{popupData[name]?.title || name}</span>
      </div>

      <div className="dragbar-right">
        <button className="minimise-btn">_</button>
        <button className="resize-btn">❐</button>
        <button className="close-btn" onClick={() => closeWindow(name)}>×</button>
      </div>
    </div>
  )
}

export default function Popups({ windows, handleMouseDown, closeWindow }) {
  return (
    <>
      {Object.entries(windows).map(([name, win]) =>
        win.isOpen ? (
          <div
            key={name}
            onMouseDown={(e) => handleMouseDown(e, name)}
            style={{
              position: 'absolute',
              top: win.position.y,
              left: win.position.x,
              width: '500px',
              minWidth: '500px',
              height: '400px',
              backgroundColor: 'var(--taskbar-gray)',
              border: '2px solid white',
              zIndex: 1000,
            }}
            className={`${name}-window`}
          >

            {/* ✅ Reuse the Topbar here */}
            <Topbar name={name} icon={popupData[name]} closeWindow={closeWindow} />

            {/* Edit below here */}
            {name === "biography" && (
              <div className="biography-content">
                <div className="biography-picture-container">
                  <img src="/HJ.png" alt="me!" className="biography-pic-1" />
                </div>
                <div className="biography-content-right">
                  <h1 className="biography-title">Harry Jarvis</h1>
                  <h1 className="biography-line1">
                    Economics Graduate @ Manchester Metropolitan University, aspiring front-end web developer
                  </h1>
                  <h1 className="biography-line2">📍 Manchester, UK</h1>
                  <div className="programming-buttons">
                    <img className="JS" alt="JavaScript" src="https://img.shields.io/badge/-Javascript-green" />
                    <img className="HTML/CSS" alt="HTML/CSS" src="https://img.shields.io/badge/-HTML/CSS-orange" />
                    <img className="React" alt="React" src="https://img.shields.io/badge/-React-blue" />
                    <img className="SQL" alt="SQL" src="https://img.shields.io/badge/-SQL-yellow" />
                    <img className="Figma" alt="Figma" src="https://img.shields.io/badge/-Figma-purple" />
                  </div>
                </div>
              </div>
            )}

            {name === "music" && (
              <div className="music-content">
                <h1>🎵 Music Player Coming Soon!</h1>
                <p>Playlist integration, media controls, and more.</p>
              </div>
            )}

            {/* Add more window content here as needed */}
          </div>
        ) : null
      )}
    </>
  );
}
