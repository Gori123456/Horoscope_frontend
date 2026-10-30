import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar({ backendConnected }) {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <header style={{
      borderBottom: '1px solid var(--border-card)',
      background: 'var(--header-bg)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '16px 24px',
      transition: 'background 0.3s ease, border-color 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1380px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        {/* Brand Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 60%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.35)',
            fontSize: '22px',
            color: '#ffffff'
          }}>
            ☸
          </div>
          <div>
            <h1 className="font-serif-warm" style={{
              fontSize: '22px',
              fontWeight: 800,
              letterSpacing: '0.02em',
              background: 'linear-gradient(to right, var(--text-heading), var(--gold-warm))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              AstroLogic
            </h1>
            <span style={{ fontSize: '12px', color: 'var(--text-soft)', fontWeight: 500 }}>
              Vedic Horoscope & Life Problem Solver
            </span>
          </div>
        </div>

        {/* Right Actions: Theme Switcher & Engine Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Light / Dark Mode Toggle Button */}
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          )}

          {/* Engine Status Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 600,
            background: backendConnected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${backendConnected ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)'}`,
            color: backendConnected ? 'var(--emerald-peace)' : 'var(--rose-love)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: backendConnected ? '#10b981' : '#ef4444',
              boxShadow: backendConnected ? '0 0 10px #10b981' : '0 0 10px #ef4444'
            }} />
            <span style={{ display: 'inline' }}>
              {backendConnected ? 'Ready (:8000)' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
