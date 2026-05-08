import '/src/App.css';
import '/src/Popups.css';
import Popups from './Popups.jsx';
import { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import useOnClickOutside from './hooks/useOnClickOutside';

// Clock component
function Clock( { onClick }) {
  const [time, setTime] = useState(() => new Date()); // initial time state

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000); // update every second
    return () => clearInterval(interval); // cleanup on component unmount
  }, []);

  // Format time with uppercase AM/PM
  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return <span onClick={onClick}>{formattedTime.toUpperCase()}</span>;
}

// Main component: HomePage

export default function App() {

  // State to control whether calendar is visible
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  // State to control whether start menu is visible
  const [isStartMenuVisible, setIsStartMenuVisible] = useState(false);

  const [isCsVisible, setIsCsVisible] = useState(false);

  const [selectedIcon, setSelectedIcon] = useState(null);

  // Refs for detecting outside clicks
  const calendarRef = useRef(null);
  const startMenuRef = useRef(null);

  const calendarButtonRef = useRef(null);
  const startButtonRef = useRef(null);

  // Handle clicking the time box (toggles calendar)
  const handleTimeBoxClick = () => {
    setIsCalendarVisible((prev) => !prev); // toggle calendar
    setIsStartMenuVisible(false); // close start menu
  };

  // Handle clicking the start button (toggles start menu)
  const handleStartButtonClick = () => {
    setIsStartMenuVisible((prev) => !prev); // toggle start menu
    setIsCalendarVisible(false); // close calendar
  };

  // click outside to close menus
  //
  // 

  useOnClickOutside(calendarRef, (e) => {
    if (calendarButtonRef.current && calendarButtonRef.current.contains(e.target)) {
      return;
    }
    setIsCalendarVisible(false);
  });

  useOnClickOutside(startMenuRef, (e) => {
    if (startButtonRef.current && startButtonRef.current.contains(e.target)) {
      return; // ignore clicks on the button itself
    }
    setIsStartMenuVisible(false);
  });

  // Desktop icon state component

  const [windows, setWindows] = useState({});

  const openWindow = (name) => {
    setWindows((prev) => ({
      ...prev,
      [name]: {
        isOpen: true,
        position: { x: 150, y: 150 }
      }
    }));
  };

  const closeWindow = (name) => {
    setWindows((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        isOpen: false,
      }
    }));
  };

  // dragging windows

  const [draggingWindow, setDraggingWindow] = useState(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e, name) => {
    if (!windows[name]) return;
    setDraggingWindow(name);
    dragOffset.current = {
      x: e.clientX - windows[name].position.x,
      y: e.clientY - windows[name].position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!draggingWindow) return;
    setWindows((prev) => ({
      ...prev,
      [draggingWindow]: {
        ...prev[draggingWindow],
        position: {
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        }
      }
    }));
  };

  const handleMouseUp = () => setDraggingWindow(null);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingWindow]);

  return (
    <div className="desktop" onClick={() => setSelectedIcon(null)}>

      {/* desktop-icons */}
      <div className="desktop-icons-container">

          {/* biography */}
          <div
          className={`desktop-icon biography ${selectedIcon === 'biography' ? 'desktop-icon-selected' : ''}`}
            onDoubleClick={() => {
              openWindow("biography")
              setSelectedIcon(null);
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIcon('biography');
          }}>
            <img src="/file.png" alt="biography-icon" className="desktop-icon"/>
            <span>About Me</span>
          </div>

          {/* music */}
          <div
          className={`desktop-icon music ${selectedIcon === 'music' ? 'selected-icon' : ''}`}
            onDoubleClick={() => openWindow("music")}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIcon('music');
          }}>
            <img src="/napster.png" alt="music-icon"/>
            <span>My Music</span>
          </div>

          {/* mail */}
          <div className="desktop-icon">
            <img src="/mail.png" alt="mail-icon"/>
            <span>Mail</span>
          </div>

          <div className="desktop-icon">
            <img src="/photos.png" alt="photos-icon"/>
            <span>Photos</span>
          </div>

          {/* MSN */}
          <div className="desktop-icon">
            <img src="/msn.png" alt="msn-icon"/>
            <span>MSN</span>
          </div>

          {/* steam */}
          <div className="desktop-icon">
            <img src="/steam.png" alt="steam-icon"/>
            <span>Steam</span>
          </div>

          <div className="desktop-icon">
            <img src="/counterstrike.png" alt="cs-icon"/>
            <span className="desktop-icon-cs">Counter <br />Strike</span>
          </div>
          
      </div>

      <Popups
  windows={windows}
  handleMouseDown={handleMouseDown}
  closeWindow={closeWindow}
/>

      {/* Taskbar */}
      <div className="taskbar">

        {/* start button */}
        <button ref={startButtonRef} className={`start-button ${isStartMenuVisible ? 'start-button-active' : ''}`}
        onClick={handleStartButtonClick}>
          <img src="/win95old.png" alt="start" className="start-icon"/>
          <span className="start-text">Start</span>
        </button>

        {/* Clock */}
        <div ref={calendarButtonRef} onClick={handleTimeBoxClick} className="clock">
          <img src="/network.png" alt="network" className="right-task-icon"/>
          <Clock/>
        </div>

        {/* Calendar (shows on toggle) */}
        {isCalendarVisible && (
          <div className="calendar-model" ref={calendarRef}>
            <div className="calendar-container">
              <Calendar />
            </div>
          </div>
        )}

      </div>

      {/* Start Menu (shows on toggle) */}
      {isStartMenuVisible && (
        <div className="start-menu" ref={startMenuRef}>

          <div className="start-menu-left">
            <img src="/HJ25(1).png" alt="start-menu-left-logo" />
          </div>

          <div className="start-menu-right">
            <div className="start-item" onClick={() => window.location.href = '/'}>
              <img src="/program.png" alt="computer"/>
              <span><u>P</u>rograms</span>
              <span className="start-item-arrow">▶</span>
            </div>
  
            <div className="start-item" onClick={() => window.location.href = '/'}>
              <img src="/openfolder.png" alt="resume"/>
              <span><u>D</u>ocuments</span>
              <span className="start-item-arrow">▶</span>
            </div>
       
            <div className="start-item" onClick={() => window.location.href = 'https://github.com/harryjarvis'}>
              <img src="/github.png" alt="github"/>
              <span><u>G</u>ithub</span>
            </div>
            <div className="start-item" onClick={() => window.location.href = 'https://www.linkedin.com/in/harryjamesjarvis/'}>
              <img src="/linked.png" alt="linkedin"/>
              <span><u>L</u>inkedIn</span>
            </div>
            <div className="start-item">
              <img src="/book.png" alt="book"/>
              <span><u>H</u>elp</span>
            </div>
            <div className="start-item">
              <img src="/gear.png" alt="gear"/>
              <span><u>S</u>ettings</span>
            </div>
            <div className="start-item-shutdown" onClick={() => window.location.href = '/'}>
              <img src="/shutdown.png" alt="shutdown"/>
              <span><u>S</u>hut down...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}