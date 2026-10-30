import React from 'react';

export default function TransitsPanel({ transitData }) {
  if (!transitData) return null;

  const { as_of_date, transiting_positions, sade_sati, jupiter_gochar } = transitData;

  return (
    <div className="warm-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h2 className="font-serif-warm" style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
            Real-Time Planetary Transits (Gochar)
          </h2>
          <span style={{ fontSize: '13px', color: 'var(--text-soft)' }}>
            Where planets are moving in the sky right now relative to your Moon.
          </span>
        </div>

        <span style={{
          fontSize: '11px',
          fontWeight: 700,
          padding: '4px 12px',
          borderRadius: '9999px',
          background: 'rgba(56, 189, 248, 0.15)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          color: 'var(--sky-intellect)'
        }}>
          Live Sky Movement
        </span>
      </div>

      {/* Planets Positions */}
      {transiting_positions && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px'
        }}>
          {Object.entries(transiting_positions).map(([pName, pPos]) => (
            <div
              key={pName}
              style={{
                background: 'var(--bg-card-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '14px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{pName}</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                {pPos.sign}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--gold-warm)', fontWeight: 600 }}>
                {pPos.degree.toFixed(1)}°
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Saturn Sade Sati Card */}
      <div style={{
        background: 'var(--bg-card-elevated)',
        border: `1px solid ${sade_sati.is_active ? 'rgba(245, 158, 11, 0.35)' : 'var(--border-subtle)'}`,
        borderRadius: '14px',
        padding: '18px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>🪐</span>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              Saturn Sade Sati Cycle
            </h4>
          </div>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '6px',
            background: sade_sati.is_active ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
            color: sade_sati.is_active ? 'var(--gold-warm)' : 'var(--emerald-peace)'
          }}>
            {sade_sati.is_active ? sade_sati.phase : 'No Active Sade Sati'}
          </span>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-soft)', lineHeight: 1.6, margin: 0 }}>
          {sade_sati.description}
        </p>
      </div>

      {/* Jupiter Gochar Card */}
      <div style={{
        background: 'var(--bg-card-elevated)',
        border: `1px solid ${jupiter_gochar.is_benefic_transit ? 'rgba(16, 185, 129, 0.35)' : 'var(--border-subtle)'}`,
        borderRadius: '14px',
        padding: '18px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>✨</span>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              Jupiter Blessing (Guru Gochar)
            </h4>
          </div>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '6px',
            background: jupiter_gochar.is_benefic_transit ? 'rgba(16, 185, 129, 0.15)' : 'rgba(148, 163, 184, 0.15)',
            color: jupiter_gochar.is_benefic_transit ? 'var(--emerald-peace)' : 'var(--text-muted)'
          }}>
            {jupiter_gochar.is_benefic_transit ? 'Golden Expansion Window' : 'Inward Reflection'}
          </span>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-soft)', lineHeight: 1.6, margin: 0 }}>
          {jupiter_gochar.description}
        </p>
      </div>
    </div>
  );
}
