import React from 'react';
import { SunMoonIcon } from './SunMoonIcon';

export const ClockWidget = ({
  time, // Date object
  layout = 'wide', // 'wide' or 'compact'
  format12h = true,
  showSeconds = true,
  showDate = true,
  font = 'dela', // 'bebas', 'dela', 'space', 'mono', 'fredoka'
  theme = 'cyberpunk',
  noBorder = false,
  widgetTransparent = false,
  showTracker = true,
  hideNightCycle = false,
  textColor = 'dark', // 'dark' (black) or 'light' (white)
  textOutline = true, // thick text borders
}) => {
  // Determine hours, minutes, seconds
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Determine if it is day time (6 AM to 6 PM)
  const isDay = hours >= 6 && hours < 18;

  // Check if we should show the tracker box
  const shouldShowTracker = showTracker && !(hideNightCycle && !isDay);

  // Calculate the progress of the current day or night cycle (0% to 100%)
  let progress = 0;
  if (isDay) {
    // 6 AM to 6 PM
    const elapsedMinutes = (hours - 6) * 60 + minutes + seconds / 60;
    progress = (elapsedMinutes / (12 * 60)) * 100;
  } else {
    // 6 PM to 6 AM
    let elapsedMinutes = 0;
    if (hours >= 18) {
      elapsedMinutes = (hours - 18) * 60 + minutes + seconds / 60;
    } else {
      elapsedMinutes = (hours + 6) * 60 + minutes + seconds / 60;
    }
    progress = (elapsedMinutes / (12 * 60)) * 100;
  }

  // Ensure progress is bounded
  progress = Math.max(0, Math.min(100, progress));

  // Format hours and minutes
  let displayHours = hours;
  let ampm = '';
  if (format12h) {
    ampm = hours >= 12 ? 'PM' : 'AM';
    displayHours = hours % 12;
    if (displayHours === 0) displayHours = 12;
  }
  const strHours = displayHours.toString().padStart(2, '0');
  const strMinutes = minutes.toString().padStart(2, '0');
  const strSeconds = seconds.toString().padStart(2, '0');

  // Format date
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const dayName = weekdays[time.getDay()];
  const monthName = months[time.getMonth()];
  const dateNum = time.getDate();
  const yearNum = time.getFullYear();

  // Map font name to CSS variable class
  const fontClass = {
    bebas: 'font-bebas',
    dela: 'font-dela',
    space: 'font-space',
    mono: 'font-mono',
    fredoka: 'font-fredoka',
  }[font] || 'font-dela';

  // Inline font CSS classes
  const fontStyles = {
    'font-bebas': { fontFamily: 'var(--font-bebas)', letterSpacing: '2px' },
    'font-dela': { fontFamily: 'var(--font-dela)' },
    'font-space': { fontFamily: 'var(--font-space)', fontWeight: '700' },
    'font-mono': { fontFamily: 'var(--font-mono)' },
    'font-fredoka': { fontFamily: 'var(--font-fredoka)', fontWeight: '600' },
  }[fontClass];

  // Resolve Widget border and shadow styles
  const widgetBoxStyle = {
    display: 'flex',
    flexDirection: layout === 'wide' ? 'row' : 'column',
    alignItems: 'stretch',
    maxWidth: layout === 'wide' ? '720px' : '360px',
    userSelect: 'none',
    border: noBorder ? 'none' : 'var(--border-width-thick) solid var(--border-color)',
    boxShadow: noBorder ? 'none' : 'var(--shadow-offset-thick) var(--shadow-offset-thick) 0px 0px var(--shadow-color)',
    backgroundColor: widgetTransparent ? 'transparent' : 'var(--bg-widget)',
    transition: 'all 0.3s ease',
  };

  return (
    <div className={`brutalist-card theme-${theme}`} style={widgetBoxStyle}>
      {/* 1. Day/Night Sky Tracker Box */}
      {shouldShowTracker && (
        <div
          style={{
            width: layout === 'wide' ? '180px' : '100%',
            minHeight: layout === 'wide' ? '100%' : '140px',
            borderRight: noBorder 
              ? 'none' 
              : (layout === 'wide' ? '4px solid var(--border-color)' : 'none'),
            borderBottom: noBorder 
              ? 'none' 
              : (layout === 'wide' ? 'none' : '4px solid var(--border-color)'),
            backgroundColor: widgetTransparent 
              ? (isDay ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.3)')
              : (isDay ? 'var(--bg-page)' : 'var(--bg-slider-track)'),
            position: 'relative',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            transition: 'background-color 0.3s ease',
          }}
        >
          {/* Subtle grid background for tracker box */}
          {!widgetTransparent && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: isDay
                  ? 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)'
                  : 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '12px 12px',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Top/Side labels */}
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span
              className="brutalist-badge"
              style={{
                fontSize: '0.7rem',
                padding: '0.1rem 0.4rem',
                backgroundColor: isDay ? 'var(--bg-widget)' : 'var(--bg-accent)',
                borderWidth: noBorder ? '1.5px' : '2px',
                boxShadow: noBorder ? 'none' : '3px 3px 0px 0px var(--shadow-color)',
                color: '#000000', // badge always black text for brutalism contrast
              }}
            >
              {isDay ? 'DAY CYCLE' : 'NIGHT CYCLE'}
            </span>
          </div>

          {/* The slider gauge track */}
          <div
            style={{
              position: 'relative',
              height: '48px',
              width: '100%',
              backgroundColor: isDay ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
              border: noBorder ? '2px solid rgba(0, 0, 0, 0.4)' : '2px solid var(--border-color)',
              marginTop: 'auto',
              marginBottom: 'auto',
              zIndex: 1,
            }}
          >
            {/* Hour markers inside the track */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '6px',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 4px',
                opacity: 0.5,
              }}
            >
              <div style={{ width: '2px', height: '100%', backgroundColor: noBorder ? 'rgba(0,0,0,0.4)' : 'var(--border-color)' }}></div>
              <div style={{ width: '2px', height: '100%', backgroundColor: noBorder ? 'rgba(0,0,0,0.4)' : 'var(--border-color)' }}></div>
              <div style={{ width: '2px', height: '100%', backgroundColor: noBorder ? 'rgba(0,0,0,0.4)' : 'var(--border-color)' }}></div>
              <div style={{ width: '2px', height: '100%', backgroundColor: noBorder ? 'rgba(0,0,0,0.4)' : 'var(--border-color)' }}></div>
              <div style={{ width: '2px', height: '100%', backgroundColor: noBorder ? 'rgba(0,0,0,0.4)' : 'var(--border-color)' }}></div>
            </div>

            {/* Sliding Icon Wrapper */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: `${progress}%`,
                transform: 'translate(-50%, -50%)',
                width: '42px',
                height: '42px',
                transition: 'left 0.2s cubic-bezier(0.1, 0.8, 0.2, 1)',
              }}
            >
              <SunMoonIcon isDay={isDay} />
            </div>
          </div>

          {/* Cycle start and end labels */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              color: isDay ? 'var(--text-sub)' : '#a1a1aa',
            }}
          >
            <span>{isDay ? '6:00 AM' : '6:00 PM'}</span>
            <span>{isDay ? '6:00 PM' : '6:00 AM'}</span>
          </div>
        </div>
      )}

      {/* 2. Main Clock Panel */}
      <div
        style={{
          flex: 1,
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: (layout === 'wide' && shouldShowTracker) ? 'flex-start' : 'center',
          backgroundColor: widgetTransparent ? 'transparent' : 'var(--bg-widget)',
          textAlign: (layout === 'wide' && shouldShowTracker) ? 'left' : 'center',
          transition: 'background-color 0.3s ease',
        }}
      >
        {/* Time Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.5rem',
            position: 'relative',
          }}
        >
          {/* Main Time Hours and Minutes */}
          <span
            style={{
              fontSize: layout === 'wide' ? '6.5rem' : '4.5rem',
              lineHeight: '0.85',
              ...fontStyles,
              color: textColor === 'light' ? '#ffffff' : '#000000',
              textShadow: textOutline 
                ? (noBorder 
                    ? '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000' 
                    : '3px 3px 0px var(--bg-accent), -1.5px -1.5px 0px #000, 1.5px -1.5px 0px #000, -1.5px 1.5px 0px #000, 1.5px 1.5px 0px #000')
                : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {strHours}:{strMinutes}
          </span>

          {/* Seconds & AM/PM Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.25rem',
              marginLeft: '0.5rem',
            }}
          >
            {/* Seconds (Floating Badge) */}
            {showSeconds && (
              <span
                className="brutalist-badge"
                style={{
                  fontSize: '1rem',
                  padding: '0.1rem 0.4rem',
                  backgroundColor: 'var(--bg-accent)',
                  color: '#000000',
                  fontFamily: 'var(--font-mono)',
                  borderWidth: noBorder ? '1.5px' : '2px',
                  boxShadow: noBorder ? 'none' : '2px 2px 0px #000',
                  transform: 'rotate(4deg)',
                }}
              >
                {strSeconds}s
              </span>
            )}

            {/* AM / PM Stamp */}
            {format12h && (
              <span
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '2.5rem',
                  lineHeight: '0.9',
                  color: textColor === 'light' ? 'var(--bg-accent)' : 'var(--text-accent)',
                  fontWeight: '900',
                  letterSpacing: '1px',
                  textShadow: textOutline 
                    ? '1.5px 1.5px 0px #000, -1.5px -1.5px 0px #000, 1.5px -1.5px 0px #000, -1.5px 1.5px 0px #000'
                    : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {ampm}
              </span>
            )}
          </div>
        </div>

        {/* Date Display */}
        {showDate && (
          <div
            style={{
              marginTop: '1.25rem',
              transform: (layout === 'wide' && shouldShowTracker) ? 'rotate(-1.5deg) translateX(4px)' : 'rotate(-1.5deg)',
              display: 'inline-block',
            }}
          >
            <div
              className="brutalist-badge"
              style={{
                backgroundColor: 'var(--bg-accent)',
                color: '#000000',
                fontSize: '1.05rem',
                padding: '0.4rem 1rem',
                fontFamily: 'var(--font-space)',
                letterSpacing: '1px',
                borderWidth: noBorder ? '2px' : '3px',
                boxShadow: noBorder ? 'none' : '3px 3px 0px 0px var(--shadow-color)',
              }}
            >
              {dayName}, {monthName} {dateNum} {yearNum}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
