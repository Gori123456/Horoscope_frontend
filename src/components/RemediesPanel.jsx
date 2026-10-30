import React, { useState } from 'react';

const STREAM_TABS = [
  { id: 'career', label: 'Career & Work', icon: '💼', color: '#f59e0b' },
  { id: 'wealth', label: 'Money & Wealth', icon: '💰', color: '#10b981' },
  { id: 'relationships', label: 'Love & Marriage', icon: '💍', color: '#f43f5e' },
  { id: 'health', label: 'Health & Energy', icon: '❤️', color: '#ef4444' },
  { id: 'intellect', label: 'Mind & Studies', icon: '🧠', color: '#38bdf8' },
  { id: 'active_dasha', label: 'Current Life Chapter', icon: '🌟', color: '#a855f7' }
];

export default function RemediesPanel({ remediesData }) {
  const [activeStream, setActiveStream] = useState('career');

  if (!remediesData) return null;

  const currentRemedy = remediesData[activeStream];

  return (
    <div className="warm-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '9999px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', color: 'var(--gold-warm)', fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>
            <span>🌿 Remedial Measures & Upayas</span>
          </div>
          <h2 className="font-serif-warm" style={{ fontSize: '22px', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
            Life Problem Solver & Vedic Remedies
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-soft)', marginTop: '4px', maxWidth: '650px' }}>
            If you are facing blocks in any area of your life, here is why it happens according to your planetary chart, and the exact steps to soften and remove it.
          </p>
        </div>
      </div>

      {/* Stream Selector Buttons */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '6px',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        {STREAM_TABS.map(tab => {
          const isSelected = activeStream === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveStream(tab.id)}
              className={`tab-pill ${isSelected ? 'active' : ''}`}
              style={{
                borderColor: isSelected ? tab.color : 'transparent'
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Stream Details */}
      {currentRemedy ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Status & Problem Diagnosis Banner */}
          <div style={{
            background: 'var(--bg-card-inner)',
            border: '1px solid var(--border-card)',
            borderRadius: '16px',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '22px' }}>
                  {STREAM_TABS.find(t => t.id === activeStream)?.icon || '●'}
                </span>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                  {currentRemedy.stream_name}
                </h3>
              </div>
              <span style={{
                fontSize: '12px',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '9999px',
                background: currentRemedy.status.includes('Challenging') || currentRemedy.status.includes('Attention') || currentRemedy.status.includes('Needs')
                  ? 'rgba(239, 68, 68, 0.15)'
                  : 'rgba(16, 185, 129, 0.15)',
                border: `1px solid ${currentRemedy.status.includes('Challenging') || currentRemedy.status.includes('Attention') || currentRemedy.status.includes('Needs')
                  ? 'rgba(239, 68, 68, 0.35)'
                  : 'rgba(16, 185, 129, 0.35)'}`,
                color: currentRemedy.status.includes('Challenging') || currentRemedy.status.includes('Attention') || currentRemedy.status.includes('Needs')
                  ? 'var(--rose-love)'
                  : 'var(--emerald-peace)'
              }}>
                Status: {currentRemedy.status}
              </span>
            </div>

            {/* Problem Identified */}
            <div style={{ marginTop: '4px' }}>
              <div style={{ fontSize: '11px', color: 'var(--gold-warm)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                ⚠️ What the Planets Are Showing (Challenge)
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-main)', marginTop: '4px', lineHeight: 1.6, margin: 0 }}>
                {currentRemedy.problem_detected}
              </p>
            </div>

            {/* Root Cause */}
            <div style={{
              background: 'var(--bg-card)',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '12px',
              color: 'var(--text-soft)',
              border: '1px solid var(--border-subtle)',
              marginTop: '6px'
            }}>
              <strong>🔍 Astrological Root Cause:</strong> {currentRemedy.root_cause}
            </div>
          </div>

          {/* 4-Step Solution & Remedy Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            {/* Step 1: Real-Life Habit & Psychological Action */}
            <div style={{
              background: 'var(--bg-card-inner)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>📋</span>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold-warm)', margin: 0 }}>
                  1. Real-World Action & Habits
                </h4>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: 1.6, whiteSpace: 'pre-line', margin: 0 }}>
                {currentRemedy.actionable_habits}
              </p>
            </div>

            {/* Step 2: Vedic Sacred Energy Remedy */}
            <div style={{
              background: 'var(--bg-card-inner)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>🌸</span>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--emerald-peace)', margin: 0 }}>
                  2. Ancient Vedic Energy Balance
                </h4>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: 1.6, whiteSpace: 'pre-line', margin: 0 }}>
                {currentRemedy.vedic_remedy}
              </p>
            </div>

            {/* Step 3: Sacred Sound / Mantra */}
            <div style={{
              background: 'var(--bg-card-inner)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>🕉️</span>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--purple-divine)', margin: 0 }}>
                  3. Calming Sacred Sound (Mantra)
                </h4>
              </div>
              <div style={{
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.25)',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '13px',
                fontStyle: 'italic',
                color: 'var(--text-main)'
              }}>
                "{currentRemedy.mantra_sound}"
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-soft)' }}>
                Chanting or listening creates acoustic coherence that calms nervous tension.
              </span>
            </div>

            {/* Step 4: Charity & Auspicious Timing */}
            <div style={{
              background: 'var(--bg-card-inner)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>🤝</span>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--rose-love)', margin: 0 }}>
                  4. Charity (Danam) & Lucky Timing
                </h4>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: 1.6, margin: 0 }}>
                <strong>Gift / Donation:</strong> {currentRemedy.charity_karma_correction}
              </p>
              <div style={{ fontSize: '12px', color: 'var(--gold-warm)', marginTop: '4px', fontWeight: 600 }}>
                🗓️ <strong>Best Day & Color:</strong> {currentRemedy.optimal_day_and_color}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
          Select a life stream to view personalized remedies.
        </div>
      )}
    </div>
  );
}
