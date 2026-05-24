import React, { useState, useEffect } from 'react';
import { ClockWidget } from './components/ClockWidget';
import { ControlPanel } from './components/ControlPanel';

function App() {
  // Widget Configuration State
  const [theme, setTheme] = useState('cyberpunk');
  const [layout, setLayout] = useState('wide');
  const [format12h, setFormat12h] = useState(true);
  const [showSeconds, setShowSeconds] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [font, setFont] = useState('dela');

  // OBS Overlay Configuration State
  const [noBorder, setNoBorder] = useState(false);
  const [widgetTransparent, setWidgetTransparent] = useState(false);
  const [pageTransparent, setPageTransparent] = useState(false);
  const [showTracker, setShowTracker] = useState(true);
  const [hideNightCycle, setHideNightCycle] = useState(false);

  // Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedMinutes, setSimulatedMinutes] = useState(720); // Default to 12:00 PM

  // Check if we are in Embed Mode (hides settings panel, fits widget to container)
  const [isEmbed, setIsEmbed] = useState(false);

  // Time state
  const [currentTime, setCurrentTime] = useState(new Date());

  // Load configuration from URL Query parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const themeParam = params.get('theme');
    if (themeParam) setTheme(themeParam);

    const layoutParam = params.get('layout');
    if (layoutParam) setLayout(layoutParam);

    const fontParam = params.get('font');
    if (fontParam) setFont(fontParam);

    const format12hParam = params.get('format12h');
    if (format12hParam !== null) setFormat12h(format12hParam === 'true');

    const showSecondsParam = params.get('showSeconds');
    if (showSecondsParam !== null) setShowSeconds(showSecondsParam === 'true');

    const showDateParam = params.get('showDate');
    if (showDateParam !== null) setShowDate(showDateParam === 'true');

    const embedParam = params.get('embed');
    if (embedParam !== null) setIsEmbed(embedParam === 'true');

    // OBS Overlays Query params
    const transparentParam = params.get('transparent');
    if (transparentParam !== null) setPageTransparent(transparentParam === 'true');

    const noBorderParam = params.get('noBorder');
    if (noBorderParam !== null) setNoBorder(noBorderParam === 'true');

    const widgetTransparentParam = params.get('widgetTransparent');
    if (widgetTransparentParam !== null) setWidgetTransparent(widgetTransparentParam === 'true');

    const showTrackerParam = params.get('showTracker');
    if (showTrackerParam !== null) setShowTracker(showTrackerParam === 'true');

    const hideNightCycleParam = params.get('hideNightCycle');
    if (hideNightCycleParam !== null) setHideNightCycle(hideNightCycleParam === 'true');
  }, []);

  // Update body styles dynamically when transparency state changes
  useEffect(() => {
    if (pageTransparent || (isEmbed && new URLSearchParams(window.location.search).get('transparent') === 'true')) {
      document.body.style.backgroundColor = 'transparent';
      document.body.style.backgroundImage = 'none';
    } else {
      document.body.style.backgroundColor = 'var(--bg-page)';
      document.body.style.backgroundImage = 'radial-gradient(var(--dot-color) 1.5px, transparent 1.5px)';
    }
  }, [pageTransparent, isEmbed]);

  // Update clock time every second when not simulating
  useEffect(() => {
    if (isSimulating) return;

    // Run tick immediately
    setCurrentTime(new Date());

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Construct simulated time based on slider minutes
  const getDisplayTime = () => {
    if (!isSimulating) return currentTime;

    const simDate = new Date();
    const hrs = Math.floor(simulatedMinutes / 60);
    const mins = simulatedMinutes % 60;
    simDate.setHours(hrs);
    simDate.setMinutes(mins);
    simDate.setSeconds(0);
    return simDate;
  };

  // If in embed mode, only render the clock widget at full size
  if (isEmbed) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          overflow: 'hidden',
          backgroundColor: 'transparent',
        }}
      >
        <ClockWidget
          time={getDisplayTime()}
          layout={layout}
          format12h={format12h}
          showSeconds={showSeconds}
          showDate={showDate}
          font={font}
          theme={theme}
          noBorder={noBorder}
          widgetTransparent={widgetTransparent}
          showTracker={showTracker}
          hideNightCycle={hideNightCycle}
        />
      </div>
    );
  }

  return (
    <>
      {/* Header Area */}
      <header
        style={{
          textAlign: 'center',
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <h1
            style={{
              fontFamily: 'var(--font-dela)',
              fontSize: '2rem',
              textTransform: 'uppercase',
              textShadow: '2px 2px 0 #00ffff, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
              color: '#000000',
            }}
          >
            NEO-BRUTALIST CLOCK
          </h1>
          <span
            className="brutalist-badge"
            style={{
              transform: 'rotate(-2deg)',
              backgroundColor: '#ff007f',
              color: '#ffffff',
              fontSize: '0.8rem',
            }}
          >
            NOTION & OBS STREAM READY!
          </span>
        </div>
        <p style={{ fontWeight: '600', maxWidth: '600px', fontSize: '0.95rem' }}>
          A highly customizable live clock widget with a day/night sun-moon horizontal tracker. 
          Configure, preview, and embed it straight into your dashboards or OBS streaming overlays!
        </p>
      </header>

      {/* Main Workspace Layout */}
      <main
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
        }}
      >
        {/* Live Widget Preview */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: '0.5rem',
          }}
        >
          <div style={{ alignSelf: 'center', marginBottom: '0.25rem' }}>
            <span
              className="brutalist-badge"
              style={{
                backgroundColor: '#000',
                color: '#fff',
                fontSize: '0.75rem',
                border: '1px solid #fff',
              }}
            >
              LIVE WIDGET PREVIEW
            </span>
          </div>

          <ClockWidget
            time={getDisplayTime()}
            layout={layout}
            format12h={format12h}
            showSeconds={showSeconds}
            showDate={showDate}
            font={font}
            theme={theme}
            noBorder={noBorder}
            widgetTransparent={widgetTransparent}
            showTracker={showTracker}
            hideNightCycle={hideNightCycle}
          />
        </div>

        {/* Customization Control Panel */}
        <ControlPanel
          theme={theme}
          setTheme={setTheme}
          layout={layout}
          setLayout={setLayout}
          format12h={format12h}
          setFormat12h={setFormat12h}
          showSeconds={showSeconds}
          setShowSeconds={setShowSeconds}
          showDate={showDate}
          setShowDate={setShowDate}
          font={font}
          setFont={setFont}
          isSimulating={isSimulating}
          setIsSimulating={setIsSimulating}
          simulatedMinutes={simulatedMinutes}
          setSimulatedMinutes={setSimulatedMinutes}
          noBorder={noBorder}
          setNoBorder={setNoBorder}
          widgetTransparent={widgetTransparent}
          setWidgetTransparent={setWidgetTransparent}
          pageTransparent={pageTransparent}
          setPageTransparent={setPageTransparent}
          showTracker={showTracker}
          setShowTracker={setShowTracker}
          hideNightCycle={hideNightCycle}
          setHideNightCycle={setHideNightCycle}
        />
      </main>

      {/* Footer / Notion & OBS Guide */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '720px', marginBottom: '3rem' }}>
        {/* Notion Guide */}
        <footer
          style={{
            backgroundColor: '#000000',
            color: '#ffffff',
            padding: '1.5rem',
            border: '4px solid #ffffff',
            boxShadow: '6px 6px 0px #000000',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-space)', fontWeight: 'bold', fontSize: '1rem', textTransform: 'uppercase', color: '#fcf634' }}>
            ⚡ Notion Integration Guide
          </h3>
          <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>Customize the clock layout, colors, and fonts using the configurator above.</li>
            <li>Click the <strong>COPY URL</strong> button in the Notion / Web card.</li>
            <li>Open your page in Notion and type <code>/embed</code>, then press Enter.</li>
            <li>Paste the copied URL and adjust the block size. Done!</li>
          </ol>
        </footer>

        {/* OBS Stream Guide */}
        <footer
          style={{
            backgroundColor: '#ff007f',
            color: '#ffffff',
            padding: '1.5rem',
            border: '4px solid #000000',
            boxShadow: '6px 6px 0px #000000',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-space)', fontWeight: 'bold', fontSize: '1rem', textTransform: 'uppercase', color: '#00ffff' }}>
            🎥 Panduan Streaming OBS Studio
          </h3>
          <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>Sesuaikan pengaturan OBS di atas (transparansi latar belakang, borderless, dsb).</li>
            <li>Klik tombol <strong>COPY OBS URL</strong> warna merah muda di atas.</li>
            <li>Di OBS Studio, tambahkan Source baru: <strong>Browser</strong> (Sumber Browser).</li>
            <li>Tempel URL yang disalin pada kolom <strong>URL</strong> di OBS.</li>
            <li>Atur ukuran resolusi (Width & Height) di OBS:
              <ul>
                <li>Layout <strong>Wide</strong>: Width: <strong>740</strong>, Height: <strong>260</strong></li>
                <li>Layout <strong>Compact</strong>: Width: <strong>380</strong>, Height: <strong>440</strong></li>
              </ul>
            </li>
            <li>Centang opsi <i>"Refresh browser when scene becomes active"</i> jika ingin memuat ulang saat berpindah scene.</li>
          </ol>
        </footer>
      </div>
    </>
  );
}

export default App;

