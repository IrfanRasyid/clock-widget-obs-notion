import React, { useState } from 'react';

export const ControlPanel = ({
  theme,
  setTheme,
  layout,
  setLayout,
  format12h,
  setFormat12h,
  showSeconds,
  setShowSeconds,
  showDate,
  setShowDate,
  font,
  setFont,
  isSimulating,
  setIsSimulating,
  simulatedMinutes,
  setSimulatedMinutes,
  noBorder,
  setNoBorder,
  widgetTransparent,
  setWidgetTransparent,
  pageTransparent,
  setPageTransparent,
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedObs, setCopiedObs] = useState(false);

  // Available themes with colors for preview buttons
  const themes = [
    { id: 'cyberpunk', name: 'Cyberpunk', bg: '#fcf634', accent: '#02fdfd' },
    { id: 'tokyopink', name: 'Tokyo Pink', bg: '#ff79c6', accent: '#bd93f9' },
    { id: 'pinkwhite', name: 'Pink White', bg: '#ffffff', accent: '#ff85a2' },
    { id: 'mintlime', name: 'Mint Lime', bg: '#5efd9c', accent: '#10b981' },
    { id: 'sunmoon', name: 'Sun & Moon', bg: '#fdba74', accent: '#93c5fd' },
    { id: 'mono', name: 'Mono Stark', bg: '#ffffff', accent: '#e5e7eb' },
  ];

  // Available fonts
  const fonts = [
    { id: 'dela', name: 'Dela Gothic One (Chunky)' },
    { id: 'bebas', name: 'Bebas Neue (Tall)' },
    { id: 'space', name: 'Space Grotesk (Brutalist)' },
    { id: 'mono', name: 'Share Tech (Digital)' },
    { id: 'fredoka', name: 'Fredoka (Round)' },
  ];

  // Helper to convert simulated minutes (0-1439) to HH:MM format
  const getSimulatedTimeString = () => {
    const hrs = Math.floor(simulatedMinutes / 60);
    const mins = simulatedMinutes % 60;
    const ampm = hrs >= 12 ? 'PM' : 'AM';
    const displayHrs = hrs % 12 || 12;
    const strHrs = displayHrs.toString().padStart(2, '0');
    const strMins = mins.toString().padStart(2, '0');
    return `${strHrs}:${strMins} ${ampm} (${hrs.toString().padStart(2, '0')}:${strMins})`;
  };

  // Helper to generate shareable embed URL
  const getEmbedUrl = (isObs = false) => {
    const base = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    params.set('theme', theme);
    params.set('layout', layout);
    params.set('font', font);
    params.set('format12h', format12h);
    params.set('showSeconds', showSeconds);
    params.set('showDate', showDate);
    
    if (isObs) {
      params.set('embed', 'true');
      params.set('transparent', 'true');
      if (noBorder) params.set('noBorder', 'true');
      if (widgetTransparent) params.set('widgetTransparent', 'true');
    } else {
      params.set('embed', 'true');
      if (noBorder) params.set('noBorder', 'true');
      if (widgetTransparent) params.set('widgetTransparent', 'true');
      if (pageTransparent) params.set('transparent', 'true');
    }
    
    return `${base}?${params.toString()}`;
  };

  // Copy standard link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(getEmbedUrl(false)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Copy OBS link
  const handleCopyObsLink = () => {
    navigator.clipboard.writeText(getEmbedUrl(true)).then(() => {
      setCopiedObs(true);
      setTimeout(() => setCopiedObs(false), 2000);
    });
  };

  return (
    <div
      className="brutalist-card"
      style={{
        backgroundColor: '#ffffff',
        padding: '2rem',
        width: '100%',
        maxWidth: '720px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.75rem',
      }}
    >
      {/* Control Panel Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-dela)', fontSize: '1.4rem', textTransform: 'uppercase' }}>
          WIDGET BUILDER
        </h2>
        <span className="brutalist-badge" style={{ backgroundColor: 'var(--bg-widget)' }}>
          CONFIGURATOR
        </span>
      </div>

      <hr style={{ borderTop: '3px solid var(--border-color)' }} />

      {/* Grid of Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {/* Theme select */}
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            1. Select Color Theme
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className="brutalist-button"
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem',
                  backgroundColor: theme === t.id ? t.bg : '#f3f4f6',
                  transform: theme === t.id ? 'translate(-2px, -2px)' : 'none',
                  boxShadow: theme === t.id ? '4px 4px 0px #000' : '2px 2px 0px #000',
                  borderWidth: '2px',
                }}
              >
                {/* Visual Color swatches inside button */}
                <div style={{ display: 'flex', gap: '3px', marginRight: '4px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: t.bg, border: '1px solid #000' }} />
                  <div style={{ width: '12px', height: '12px', backgroundColor: t.accent, border: '1px solid #000' }} />
                </div>
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Font Select */}
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            2. Choose Font
          </label>
          <div style={{ position: 'relative' }}>
            <select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: 'var(--font-space)',
                backgroundColor: '#ffffff',
                border: '3px solid var(--border-color)',
                boxShadow: '4px 4px 0px #000',
                cursor: 'pointer',
                borderRadius: 0,
                outline: 'none',
              }}
            >
              {fonts.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Layout and Display Toggles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>
              3. Widget Layout
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => setLayout('wide')}
                className="brutalist-button"
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  fontSize: '0.85rem',
                  backgroundColor: layout === 'wide' ? 'var(--bg-accent)' : '#fff',
                  boxShadow: layout === 'wide' ? '3px 3px 0px #000' : '1px 1px 0px #000',
                  transform: layout === 'wide' ? 'translate(-1px, -1px)' : 'none',
                  borderWidth: '2px',
                }}
              >
                Wide (Notion)
              </button>
              <button
                onClick={() => setLayout('compact')}
                className="brutalist-button"
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  fontSize: '0.85rem',
                  backgroundColor: layout === 'compact' ? 'var(--bg-accent)' : '#fff',
                  boxShadow: layout === 'compact' ? '3px 3px 0px #000' : '1px 1px 0px #000',
                  transform: layout === 'compact' ? 'translate(-1px, -1px)' : 'none',
                  borderWidth: '2px',
                }}
              >
                Compact (Square)
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>
              4. Toggle Elements
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="brutalist-toggle">
                <input
                  type="checkbox"
                  checked={format12h}
                  onChange={(e) => setFormat12h(e.target.checked)}
                />
                <span className="brutalist-toggle-switch"></span>
                <span>12-Hour Format</span>
              </label>

              <label className="brutalist-toggle">
                <input
                  type="checkbox"
                  checked={showSeconds}
                  onChange={(e) => setShowSeconds(e.target.checked)}
                />
                <span className="brutalist-toggle-switch"></span>
                <span>Show Seconds</span>
              </label>

              <label className="brutalist-toggle">
                <input
                  type="checkbox"
                  checked={showDate}
                  onChange={(e) => setShowDate(e.target.checked)}
                />
                <span className="brutalist-toggle-switch"></span>
                <span>Show Date</span>
              </label>
            </div>
          </div>
        </div>

        <hr style={{ borderTop: '2px dashed var(--border-color)', margin: '0.5rem 0' }} />

        {/* OBS Stream overlay panel customization */}
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.9rem', textTransform: 'uppercase', color: '#ff007f' }}>
            5. OBS Stream Overlay Settings (Optional)
          </label>
          <div
            style={{
              padding: '1.25rem',
              backgroundColor: '#fffbeb',
              border: '3px solid #000',
              boxShadow: '4px 4px 0px #000',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <label className="brutalist-toggle">
              <input
                type="checkbox"
                checked={pageTransparent}
                onChange={(e) => setPageTransparent(e.target.checked)}
              />
              <span className="brutalist-toggle-switch"></span>
              <span>Transparent Page Background (Kunci Kroma / Transparan)</span>
            </label>

            <label className="brutalist-toggle">
              <input
                type="checkbox"
                checked={noBorder}
                onChange={(e) => setNoBorder(e.target.checked)}
              />
              <span className="brutalist-toggle-switch"></span>
              <span>Borderless & Flat (Sembunyikan Garis Tepi & Bayangan Kotak)</span>
            </label>

            <label className="brutalist-toggle">
              <input
                type="checkbox"
                checked={widgetTransparent}
                onChange={(e) => setWidgetTransparent(e.target.checked)}
              />
              <span className="brutalist-toggle-switch"></span>
              <span>Transparent Widget Box (Kotak Widget Transparan)</span>
            </label>
          </div>
        </div>

        <hr style={{ borderTop: '2px dashed var(--border-color)', margin: '0.5rem 0' }} />

        {/* Time Simulator */}
        <div>
          <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <label style={{ fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase' }}>
              6. Time Simulation
            </label>
            <label className="brutalist-toggle" style={{ fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={isSimulating}
                onChange={(e) => setIsSimulating(e.target.checked)}
              />
              <span className="brutalist-toggle-switch" style={{ width: '40px', height: '20px' }}></span>
              <span>Enable Demo Mode</span>
            </label>
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor: isSimulating ? 'var(--bg-accent)' : '#f3f4f6',
              border: '2px solid var(--border-color)',
              opacity: isSimulating ? 1 : 0.6,
              transition: 'background-color 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.85rem' }}>
              <span>Drag to change time:</span>
              <span style={{ fontFamily: 'var(--font-mono)', backgroundColor: '#fff', border: '1.5px solid #000', padding: '0 6px' }}>
                {isSimulating ? getSimulatedTimeString() : 'Clock is Running Live'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1439"
              value={simulatedMinutes}
              disabled={!isSimulating}
              onChange={(e) => setSimulatedMinutes(parseInt(e.target.value))}
              className="brutalist-input-range"
            />
          </div>
        </div>

        {/* Integration Links Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Notion Link */}
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>
              7. Embed in Notion / Web
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                readOnly
                value={getEmbedUrl(false)}
                onClick={(e) => e.target.select()}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  border: '2px solid var(--border-color)',
                  backgroundColor: '#f9f9f9',
                  borderRadius: 0,
                  outline: 'none',
                }}
              />
              <button
                onClick={handleCopyLink}
                className="brutalist-button"
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.8rem',
                  backgroundColor: copied ? '#4ade80' : 'var(--bg-accent)',
                  whiteSpace: 'nowrap',
                  borderWidth: '2px',
                  boxShadow: '2px 2px 0px #000',
                }}
              >
                {copied ? 'COPIED!' : 'COPY URL'}
              </button>
            </div>
          </div>

          {/* OBS Browser Source Link */}
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', color: '#ff007f' }}>
              8. OBS Browser Source URL (Untuk Streaming)
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                readOnly
                value={getEmbedUrl(true)}
                onClick={(e) => e.target.select()}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  border: '2px solid #000',
                  backgroundColor: '#fff0f5',
                  borderRadius: 0,
                  outline: 'none',
                }}
              />
              <button
                onClick={handleCopyObsLink}
                className="brutalist-button"
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.8rem',
                  backgroundColor: copiedObs ? '#4ade80' : '#ff007f',
                  color: '#fff',
                  whiteSpace: 'nowrap',
                  borderWidth: '2px',
                  boxShadow: '2px 2px 0px #000',
                }}
              >
                {copiedObs ? 'COPIED!' : 'COPY OBS URL'}
              </button>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#666', marginTop: '0.4rem' }}>
              * Menyalin link khusus streaming dengan latar belakang transparan otomatis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
