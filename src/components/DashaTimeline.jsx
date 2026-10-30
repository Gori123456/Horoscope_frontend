import React, { useState } from 'react';

const PLANET_COLORS = {
  Ketu: '#c084fc',
  Venus: '#f472b6',
  Sun: '#f59e0b',
  Moon: '#38bdf8',
  Mars: '#ef4444',
  Rahu: '#94a3b8',
  Jupiter: '#fbbf24',
  Saturn: '#64748b',
  Mercury: '#34d399'
};

export default function DashaTimeline({ dashaData }) {
  const [expandedMaha, setExpandedMaha] = useState(null);

  if (!dashaData || !dashaData.mahadashas) return null;

  const { active_dasha, mahadashas } = dashaData;
  const currentMaha = active_dasha.active_mahadasha;
  const currentAntar = active_dasha.active_antardasha;

  return (
    <div className="warm-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 className="font-serif-warm" style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
            Your Life Chapters & Timing (Dasha Timeline)
          </h2>
          <span style={{ fontSize: '13px', color: 'var(--text-soft)' }}>
            Vedic astrology divides your life into 9 major planetary chapters that dictate when events happen.
          </span>
        </div>

        {/* Current Active Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(245, 158, 11, 0.15)',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          padding: '6px 16px',
          borderRadius: '9999px'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24', boxShadow: '0 0 10px #fbbf24' }} />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#fde68a' }}>
            Current Chapter: {currentMaha} / {currentAntar}
          </span>
        </div>
      </div>

      {/* Active Dasha Window Details Card */}
      {active_dasha.mahadasha_period && (
        <div style={{
          background: 'var(--bg-card-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '14px',
          padding: '16px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--gold-warm)', textTransform: 'uppercase', fontWeight: 700 }}>
              Major Chapter (Mahadasha)
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
              {currentMaha} Period
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-soft)' }}>
              {active_dasha.mahadasha_period.start.slice(0, 10)} to {active_dasha.mahadasha_period.end.slice(0, 10)}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: 'var(--gold-light)', textTransform: 'uppercase', fontWeight: 700 }}>
              Current Sub-Chapter (Antardasha)
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--gold-warm)', marginTop: '2px' }}>
              {currentAntar} Sub-Period
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-soft)' }}>
              {active_dasha.antardasha_period ? `${active_dasha.antardasha_period.start.slice(0, 10)} to ${active_dasha.antardasha_period.end.slice(0, 10)}` : 'In progress'}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Mahadasha Scrubber Bar */}
      <div>
        <div style={{ fontSize: '12px', color: 'var(--text-soft)', marginBottom: '8px' }}>
          Tap any period below to explore its sub-dates:
        </div>
        <div style={{
          display: 'flex',
          width: '100%',
          height: '46px',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border-subtle)',
          background: 'rgba(15, 23, 42, 0.9)'
        }}>
          {mahadashas.map(m => {
            const isCurrent = m.planet === currentMaha;
            const isSelected = expandedMaha === m.planet;
            const pct = (m.total_years / 120.0) * 100;
            const pColor = PLANET_COLORS[m.planet] || '#f59e0b';

            return (
              <div
                key={m.planet}
                onClick={() => setExpandedMaha(isSelected ? null : m.planet)}
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  background: isCurrent ? pColor : `${pColor}44`,
                  borderRight: '1px solid rgba(0,0,0,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isCurrent ? '#000000' : '#ffffff',
                  fontWeight: isCurrent ? 800 : 600,
                  fontSize: '12px',
                  boxShadow: isCurrent ? `inset 0 0 12px rgba(255,255,255,0.4), 0 0 15px ${pColor}` : 'none',
                  transition: 'all 0.25s',
                  position: 'relative'
                }}
                title={`${m.planet} (${m.total_years} yrs): ${m.start_date.slice(0, 10)} to ${m.end_date.slice(0, 10)}`}
              >
                <span>{m.planet.slice(0, 3)}</span>
                {isCurrent && (
                  <span style={{
                    position: 'absolute',
                    top: '-6px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#ffffff'
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Antardashas Drilldown */}
      {expandedMaha && (
        <div style={{
          background: 'var(--bg-card-inner)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '18px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gold-warm)' }}>
              Sub-Periods for {expandedMaha} Chapter
            </h4>
            <button
              onClick={() => setExpandedMaha(null)}
              style={{
                fontSize: '12px',
                padding: '4px 10px',
                background: 'transparent',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-soft)',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              ✕ Close
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '10px'
          }}>
            {mahadashas.find(m => m.planet === expandedMaha)?.antardashas?.map(a => {
              const isCurrentAntar = expandedMaha === currentMaha && a.planet === currentAntar;
              return (
                <div
                  key={a.planet}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: isCurrentAntar ? 'rgba(245, 158, 11, 0.2)' : 'var(--bg-card)',
                    border: `1px solid ${isCurrentAntar ? 'rgba(245, 158, 11, 0.5)' : 'var(--border-subtle)'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: isCurrentAntar ? 'var(--gold-warm)' : 'var(--text-main)' }}>
                      {expandedMaha} - {a.planet}
                    </span>
                    {isCurrentAntar && <span style={{ fontSize: '11px', color: 'var(--gold-warm)', fontWeight: 'bold' }}>NOW</span>}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-soft)', marginTop: '3px' }}>
                    {a.start_date.slice(0, 10)} to {a.end_date.slice(0, 10)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
