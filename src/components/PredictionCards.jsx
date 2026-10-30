import React, { useState } from 'react';

const DOMAIN_ICONS = {
  career: '💼',
  wealth: '💰',
  health: '❤️',
  relationships: '💍',
  intellect: '🧠',
  spirituality: '✨'
};

const DOMAIN_LABELS = {
  career: 'Career & Ambition',
  wealth: 'Money & Assets',
  health: 'Health & Vitality',
  relationships: 'Love & Marriage',
  intellect: 'Mind & Focus',
  spirituality: 'Inner Peace'
};

export default function PredictionCards({ predictionsData }) {
  const [activeTab, setActiveTab] = useState('career');

  if (!predictionsData || !predictionsData.readings) return null;

  const { readings, dasha_highlight } = predictionsData;
  const domains = Object.keys(readings);

  return (
    <div className="warm-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 className="font-serif-warm" style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
          Detailed Life Stream Predictions
        </h2>
        {dasha_highlight && (
          <p style={{ fontSize: '13px', color: 'var(--gold-warm)', marginTop: '4px', fontWeight: 600 }}>
            ⚡ {dasha_highlight}
          </p>
        )}
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '6px',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        {domains.map(dom => {
          const isSelected = activeTab === dom;
          const r = readings[dom];

          return (
            <button
              key={dom}
              type="button"
              onClick={() => setActiveTab(dom)}
              className={`tab-pill ${isSelected ? 'active' : ''}`}
            >
              <span>{DOMAIN_ICONS[dom]}</span>
              <span>{DOMAIN_LABELS[dom] || dom}</span>
              <span style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '6px',
                background: isSelected ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                color: isSelected ? '#ffffff' : 'var(--text-muted)'
              }}>
                {r.score.toFixed(0)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Reading Detail */}
      {readings[activeTab] && (
        <div style={{
          background: 'var(--bg-card-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '26px' }}>{DOMAIN_ICONS[activeTab]}</span>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                  {DOMAIN_LABELS[activeTab] || activeTab}
                </h3>
                <span style={{ fontSize: '13px', color: 'var(--text-soft)' }}>
                  Vitality Score: <strong style={{ color: 'var(--gold-warm)' }}>{readings[activeTab].score.toFixed(1)}/100</strong> ({readings[activeTab].status})
                </span>
              </div>
            </div>
          </div>

          {/* Planetary & Lord Placement Analysis */}
          <div style={{
            background: 'var(--bg-card-inner)',
            borderLeft: '4px solid var(--gold-warm)',
            padding: '12px 16px',
            borderRadius: '0 10px 10px 0',
            fontSize: '13px',
            color: 'var(--gold-warm)'
          }}>
            <strong>Astrological Planetary Blueprint:</strong> {readings[activeTab].lord_analysis}
          </div>

          {/* Narrative Prediction */}
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>
              What to Expect
            </div>
            <p style={{ fontSize: '15px', color: 'var(--text-main)', lineHeight: 1.7, margin: 0 }}>
              {readings[activeTab].prediction}
            </p>
          </div>

          {/* Recommended Focus / Agency */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '12px',
            padding: '14px 18px'
          }}>
            <div style={{ fontSize: '12px', color: '#6ee7b7', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
              ✦ What You Can Actively Do
            </div>
            <p style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>
              {readings[activeTab].recommended_focus}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
