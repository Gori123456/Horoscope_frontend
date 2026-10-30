import React, { useState } from 'react';

const DIGNITY_COLORS = {
  'Exalted': '#d97706',       // Deep Gold / Amber
  'Moolatrikona': '#0284c7',  // Cyan / Sky
  'Own Sign': '#059669',      // Emerald Green
  'Friendly': 'var(--text-main)', // Adaptive Text
  'Neutral': 'var(--text-soft)',  // Muted
  'Enemy': '#ea580c',         // Orange
  'Debilitated': '#e11d48'    // Rose Red
};

export default function KundaliChart({ chartData, housesData }) {
  const [chartStyle, setChartStyle] = useState('north'); // 'north' or 'south'
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  if (!chartData || !chartData.planets) return null;

  const asc = chartData.ascendant;
  const planets = chartData.planets;

  // Group planets by house (1 to 12)
  const planetsInHouse = {};
  for (let h = 1; h <= 12; h++) planetsInHouse[h] = [];
  Object.values(planets).forEach(p => {
    if (planetsInHouse[p.house]) {
      planetsInHouse[p.house].push(p);
    }
  });

  const houseSigns = {};
  for (let h = 1; h <= 12; h++) {
    houseSigns[h] = ((asc.sign_id - 1 + (h - 1)) % 12) + 1;
  }

  return (
    <div className="warm-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Header and Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 className="font-serif-warm" style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
            Your Birth Chart (Janam Kundali)
          </h2>
          <span style={{ fontSize: '13px', color: 'var(--gold-warm)', fontWeight: 600 }}>
            Rising Sign (Lagna): {asc.sign_name} ({asc.sign_sanskrit}) at {asc.degree_in_sign.toFixed(1)}°
          </span>
        </div>

        {/* Style Switcher & Guide Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setShowGuide(!showGuide)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              background: showGuide ? 'rgba(245, 158, 11, 0.2)' : 'var(--tab-bg)',
              color: showGuide ? 'var(--gold-warm)' : 'var(--text-soft)',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            ❓ How to Read
          </button>

          <div style={{
            display: 'flex',
            background: 'var(--tab-bg)',
            borderRadius: '8px',
            padding: '3px',
            border: '1px solid var(--border-subtle)'
          }}>
            <button
              type="button"
              onClick={() => setChartStyle('north')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                background: chartStyle === 'north' ? 'rgba(245, 158, 11, 0.25)' : 'transparent',
                color: chartStyle === 'north' ? 'var(--gold-warm)' : 'var(--text-muted)'
              }}
            >
              Diamond
            </button>
            <button
              type="button"
              onClick={() => setChartStyle('south')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                background: chartStyle === 'south' ? 'rgba(245, 158, 11, 0.25)' : 'transparent',
                color: chartStyle === 'south' ? 'var(--gold-warm)' : 'var(--text-muted)'
              }}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* Beginner-Friendly Explainer Banner */}
      {showGuide && (
        <div style={{
          background: 'var(--bg-card-inner)',
          border: '1px solid var(--border-card)',
          borderRadius: '12px',
          padding: '14px 18px',
          fontSize: '12px',
          color: 'var(--text-soft)',
          lineHeight: 1.6
        }}>
          <strong style={{ color: 'var(--gold-warm)' }}>📖 Reading Guide:</strong>
          <ul style={{ paddingLeft: '18px', marginTop: '6px' }}>
            <li>The <strong>top-center diamond</strong> is House 1 (Lagna / You: personality & vitality).</li>
            <li>Houses count <strong>counter-clockwise</strong> from 1 to 12.</li>
            <li>The small numbers inside each box indicate the <strong>Zodiac Sign (1=Aries, 2=Taurus, etc.)</strong> occupying that life area.</li>
            <li>Click on any planet (e.g., <strong>Su</strong> for Sun, <strong>Mo</strong> for Moon, <strong>Ju</strong> for Jupiter) to see its full details.</li>
          </ul>
        </div>
      )}

      {/* SVG Kundali Visualizer */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'var(--chart-bg)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid var(--border-card)'
      }}>
        {chartStyle === 'north' ? (
          <NorthIndianDiamondSVG
            houseSigns={houseSigns}
            planetsInHouse={planetsInHouse}
            onSelectPlanet={setSelectedPlanet}
          />
        ) : (
          <SouthIndianGrid
            planets={planets}
            asc={asc}
            onSelectPlanet={setSelectedPlanet}
          />
        )}
      </div>

      {/* Legend & Selected Planet Details */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '12px',
        color: 'var(--text-soft)',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '12px'
      }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <span><strong style={{ color: '#d97706' }}>● Gold:</strong> Exalted (Very Strong)</span>
          <span><strong style={{ color: '#059669' }}>● Green:</strong> Own Sign (Comfortable)</span>
          <span><strong style={{ color: '#e11d48' }}>● Red:</strong> Challenged (Needs Remedy)</span>
          <span><strong>(R)</strong> Retrograde</span>
        </div>

        {selectedPlanet && (
          <div style={{
            background: 'var(--bg-card-inner)',
            border: '1px solid var(--border-card)',
            padding: '6px 14px',
            borderRadius: '8px',
            color: 'var(--gold-warm)',
            fontWeight: 600
          }}>
            <strong>{selectedPlanet.name} ({selectedPlanet.sanskrit}):</strong> {selectedPlanet.sign_name} {selectedPlanet.degree_in_sign.toFixed(1)}° | House {selectedPlanet.house} | {selectedPlanet.dignity}
          </div>
        )}
      </div>
    </div>
  );
}

function NorthIndianDiamondSVG({ houseSigns, planetsInHouse, onSelectPlanet }) {
  const houseCoords = {
    1: { x: 200, y: 100 },
    2: { x: 100, y: 50 },
    3: { x: 50, y: 100 },
    4: { x: 100, y: 200 },
    5: { x: 50, y: 300 },
    6: { x: 100, y: 350 },
    7: { x: 200, y: 300 },
    8: { x: 300, y: 350 },
    9: { x: 350, y: 300 },
    10: { x: 300, y: 200 },
    11: { x: 350, y: 100 },
    12: { x: 300, y: 50 }
  };

  return (
    <svg width="380" height="380" viewBox="0 0 400 400" style={{ maxWidth: '100%', height: 'auto' }}>
      <rect x="2" y="2" width="396" height="396" fill="var(--chart-fill)" stroke="var(--chart-line)" strokeWidth="1.5" />
      <line x1="0" y1="0" x2="400" y2="400" stroke="var(--chart-line)" strokeWidth="1.2" opacity="0.8" />
      <line x1="0" y1="400" x2="400" y2="0" stroke="var(--chart-line)" strokeWidth="1.2" opacity="0.8" />
      <polygon points="200,0 400,200 200,400 0,200" fill="none" stroke="var(--chart-line)" strokeWidth="1.5" />

      {/* Lagna Facet Glow */}
      <polygon points="200,0 300,100 200,200 100,100" fill="rgba(245, 158, 11, 0.12)" />

      {Object.entries(houseCoords).map(([hNumStr, pos]) => {
        const hNum = parseInt(hNumStr, 10);
        const signNum = houseSigns[hNum];
        const plist = planetsInHouse[hNum] || [];

        return (
          <g key={hNum}>
            <text
              x={pos.x}
              y={pos.y - 20}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="var(--gold-warm)"
              opacity="0.9"
            >
              {signNum}
            </text>

            {plist.map((p, idx) => {
              const yOffset = pos.y + (idx * 15) - ((plist.length - 1) * 7);
              const color = DIGNITY_COLORS[p.dignity] || 'var(--text-main)';

              return (
                <text
                  key={p.name}
                  x={pos.x}
                  y={yOffset}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={color}
                  cursor="pointer"
                  onClick={() => onSelectPlanet(p)}
                >
                  {p.name.slice(0, 2)}
                  {p.is_retrograde && 'ᴿ'}
                  {p.is_combust && '🔥'}
                </text>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

function SouthIndianGrid({ planets, asc, onSelectPlanet }) {
  const southOrder = [
    { signId: 12, name: 'Pisces' },
    { signId: 1, name: 'Aries' },
    { signId: 2, name: 'Taurus' },
    { signId: 3, name: 'Gemini' },
    { signId: 11, name: 'Aquarius' },
    { isCenter: true },
    { isCenter: true },
    { signId: 4, name: 'Cancer' },
    { signId: 10, name: 'Capricorn' },
    { isCenter: true },
    { isCenter: true },
    { signId: 5, name: 'Leo' },
    { signId: 9, name: 'Sagittarius' },
    { signId: 8, name: 'Scorpio' },
    { signId: 7, name: 'Libra' },
    { signId: 6, name: 'Virgo' }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 88px)',
      gridTemplateRows: 'repeat(4, 88px)',
      gap: '2px',
      background: 'var(--chart-line)',
      border: '2px solid var(--chart-line)',
      borderRadius: '12px'
    }}>
      {southOrder.map((cell, idx) => {
        if (cell.isCenter) {
          if (idx === 5) {
            return (
              <div
                key={idx}
                style={{
                  gridColumn: 'span 2',
                  gridRow: 'span 2',
                  background: 'var(--bg-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-warm)',
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '15px',
                  fontWeight: 700
                }}
              >
                RASI (D1)
              </div>
            );
          }
          return null;
        }

        const isAscSign = asc.sign_id === cell.signId;
        const cellPlanets = Object.values(planets).filter(p => p.sign_id === cell.signId);

        return (
          <div
            key={cell.signId}
            style={{
              background: 'var(--bg-card-elevated)',
              padding: '6px',
              fontSize: '11px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '2px' }}>
              <span>{cell.name.slice(0, 3)}</span>
              {isAscSign && <span style={{ color: 'var(--gold-warm)', fontWeight: 'bold' }}>ASC</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {cellPlanets.map(p => (
                <span
                  key={p.name}
                  onClick={() => onSelectPlanet(p)}
                  style={{
                    color: DIGNITY_COLORS[p.dignity] || 'var(--text-main)',
                    cursor: 'pointer',
                    fontWeight: 700
                  }}
                >
                  {p.name.slice(0, 2)} {p.degree_in_sign.toFixed(0)}°{p.is_combust ? '🔥' : ''}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
