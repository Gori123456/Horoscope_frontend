import React from 'react';

export default function YogasList({ yogasData }) {
  if (!yogasData || !yogasData.yogas) return null;

  const { yogas, yogas_count } = yogasData;

  return (
    <div className="warm-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h2 className="font-serif-warm" style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
            Your Cosmic Blessings & Yogas
          </h2>
          <span style={{ fontSize: '13px', color: 'var(--text-soft)' }}>
            Special alignments in your chart that bestow unique strengths and talents.
          </span>
        </div>

        <span style={{
          fontSize: '12px',
          fontWeight: 700,
          padding: '4px 14px',
          borderRadius: '9999px',
          background: 'rgba(245, 158, 11, 0.15)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          color: 'var(--gold-warm)'
        }}>
          {yogas_count} Special Alignments
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {yogas.map((y, idx) => {
          const isBenefic = y.impact_weight > 0;
          const isMitigated = y.type.includes('Mitigated');
          const badgeBg = isBenefic 
            ? 'rgba(16, 185, 129, 0.15)' 
            : (isMitigated ? 'rgba(245, 158, 11, 0.15)' : 'rgba(244, 63, 94, 0.15)');
          const badgeColor = isBenefic 
            ? '#34d399' 
            : (isMitigated ? '#fbbf24' : '#fb7185');

          return (
            <div
              key={idx}
              style={{
                background: 'var(--bg-card-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '18px 22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: '6px',
                    background: badgeBg,
                    color: badgeColor
                  }}>
                    {isBenefic ? `+${y.impact_weight} pts` : `${y.impact_weight} pts`}
                  </span>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                    {y.name}
                  </h4>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {y.category}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: 'var(--text-soft)'
                  }}>
                    {y.type}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.6, margin: 0 }}>
                {y.description}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginTop: '4px'
              }}>
                <span>📖 Citation: {y.classical_citation}</span>
                <span>Planets: <strong style={{ color: 'var(--gold-light)' }}>{y.planets_involved.join(', ')}</strong></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
