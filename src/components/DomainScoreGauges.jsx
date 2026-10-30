import React from 'react';

const DOMAIN_ICONS = {
  career: '💼',
  wealth: '💰',
  health: '❤️',
  relationships: '🤝',
  intellect: '🧠',
  spirituality: '✨'
};

const DOMAIN_TITLES = {
  career: 'Career & Authority',
  wealth: 'Wealth & Assets',
  health: 'Health & Vitality',
  relationships: 'Love & Marriage',
  intellect: 'Intellect & Focus',
  spirituality: 'Spiritual Peace'
};

export default function DomainScoreGauges({ domainScores, readings }) {
  if (!domainScores) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // Emerald
    if (score >= 65) return '#f59e0b'; // Gold
    if (score >= 50) return '#38bdf8'; // Sky Blue
    return '#f43f5e';                  // Rose Red
  };

  return (
    <div className="warm-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h2 className="font-serif-warm" style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
          Your Life Stream Vitality
        </h2>
        <span style={{ fontSize: '13px', color: 'var(--text-soft)' }}>
          How smoothly energy is flowing in each of your major life domains right now.
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '14px'
      }}>
        {Object.entries(domainScores).map(([domain, score]) => {
          const color = getScoreColor(score);
          const icon = DOMAIN_ICONS[domain] || '●';
          const title = DOMAIN_TITLES[domain] || domain;
          const status = readings?.[domain]?.status || 'Active';

          return (
            <div
              key={domain}
              style={{
                background: 'var(--bg-card-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '24px' }}>{icon}</span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  background: `${color}20`,
                  color: color
                }}>
                  {status}
                </span>
              </div>

              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-soft)' }}>
                  {title}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '4px' }}>
                  <span style={{ fontSize: '26px', fontWeight: 800, color: '#f8fafc' }}>
                    {score.toFixed(0)}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/ 100</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min(100, Math.max(0, score))}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${color}cc, ${color})`,
                  borderRadius: '9999px'
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
