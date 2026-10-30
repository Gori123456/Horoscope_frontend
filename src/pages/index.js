import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import BirthForm from '@/components/BirthForm';
import KundaliChart from '@/components/KundaliChart';
import DashaTimeline from '@/components/DashaTimeline';
import DomainScoreGauges from '@/components/DomainScoreGauges';
import YogasList from '@/components/YogasList';
import TransitsPanel from '@/components/TransitsPanel';
import PredictionCards from '@/components/PredictionCards';
import RemediesPanel from '@/components/RemediesPanel';
import {
  calculateHoroscope,
  fetchDashas,
  fetchYogas,
  fetchPredictions,
  fetchTransits,
  checkBackendHealth
} from '@/api/horoscopeApi';

export default function Home() {
  const [backendConnected, setBackendConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewTab, setViewTab] = useState('chart'); // 'chart', 'remedies', 'timeline'

  // Core Data States
  const [chartData, setChartData] = useState(null);
  const [dashaData, setDashaData] = useState(null);
  const [yogasData, setYogasData] = useState(null);
  const [predictionsData, setPredictionsData] = useState(null);
  const [transitData, setTransitData] = useState(null);

  // Initial Health Check on Mount
  useEffect(() => {
    checkBackendHealth().then(isConnected => {
      setBackendConnected(isConnected);
    });
  }, []);

  // Form Submit Handler
  const handleCalculate = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Calculate Chart
      const chartRes = await calculateHoroscope(formData);
      setChartData(chartRes);
      const chartId = chartRes.chart_id;

      // 2. Fetch all downstream data in parallel
      const [dashas, yogas, predictions, transits] = await Promise.all([
        fetchDashas(chartId),
        fetchYogas(chartId),
        fetchPredictions(chartId),
        fetchTransits(chartId)
      ]);

      setDashaData(dashas);
      setYogasData(yogas);
      setPredictionsData(predictions);
      setTransitData(transits);
      setBackendConnected(true);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to calculate chart. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <Navbar backendConnected={backendConnected} />

      {/* Main Container */}
      <main style={{ maxWidth: '1380px', margin: '0 auto', padding: '28px 24px 60px', width: '100%' }}>
        {/* Warm Hero Welcome */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: 'var(--gold-warm)',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '12px'
          }}>
            <span>✨ Authentic Vedic Wisdom & Problem Solver</span>
          </div>

          <h1 className="font-serif-warm" style={{
            fontSize: 'clamp(26px, 4vw, 42px)',
            fontWeight: 800,
            background: 'var(--hero-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.01em',
            marginBottom: '10px'
          }}>
            Discover Your Blueprint & Clear Life Obstacles
          </h1>
          <p style={{
            fontSize: '15px',
            color: 'var(--text-soft)',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            No complex latitude or longitude required — simply enter your birth city, date, and time to reveal your Kundali, active life chapters, and concrete remedies to overcome challenges.
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            color: '#fca5a5',
            padding: '16px 20px',
            borderRadius: '12px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>⚠️ {error}</span>
            <button
              onClick={() => setError(null)}
              style={{ background: 'transparent', border: 'none', color: '#fca5a5', fontWeight: 'bold', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Input Form & Kundali Chart Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Left: Friendly Birth Form */}
          <BirthForm onSubmit={handleCalculate} loading={loading} />

          {/* Right: Kundali Chart Canvas */}
          {chartData ? (
            <KundaliChart chartData={chartData} housesData={chartData.houses} />
          ) : (
            <div className="warm-card" style={{
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              minHeight: '400px'
            }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                marginBottom: '16px',
                color: 'var(--gold-warm)'
              }}>
                ☸
              </div>
              <h3 className="font-serif-warm" style={{ fontSize: '20px', color: 'var(--text-main)', marginBottom: '8px' }}>
                Your Celestial Canvas
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-soft)', maxWidth: '340px', lineHeight: 1.6 }}>
                Fill in your birth city and time on the left, or tap <strong>✨ Sample Profile</strong> to instantly generate your horoscope.
              </p>
            </div>
          )}
        </div>

        {/* Navigation Tabs for Generated Chart Analysis */}
        {chartData && (
          <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              display: 'inline-flex',
              background: 'var(--bg-card-inner)',
              padding: '6px',
              borderRadius: '16px',
              border: '1px solid var(--border-card)',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              <button
                type="button"
                onClick={() => setViewTab('chart')}
                className={`tab-pill ${viewTab === 'chart' ? 'active' : ''}`}
              >
                <span>📊 Life Vitality & Insights</span>
              </button>
              <button
                type="button"
                onClick={() => setViewTab('remedies')}
                className={`tab-pill ${viewTab === 'remedies' ? 'active' : ''}`}
                style={{
                  color: viewTab === 'remedies' ? 'var(--gold-warm)' : 'var(--text-soft)'
                }}
              >
                <span>🌿 Life Problem Solver & Remedies</span>
              </button>
              <button
                type="button"
                onClick={() => setViewTab('timeline')}
                className={`tab-pill ${viewTab === 'timeline' ? 'active' : ''}`}
              >
                <span>⏳ Life Chapters (Dashas)</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 1: Main Life Insights & Vitality */}
        {chartData && viewTab === 'chart' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Quick Dasha Banner */}
            {dashaData && <DashaTimeline dashaData={dashaData} />}

            {/* Two-Column Grid: Domain Scores + Transits */}
            {predictionsData && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '24px'
              }}>
                <DomainScoreGauges
                  domainScores={predictionsData.domain_scores}
                  readings={predictionsData.readings}
                />
                <TransitsPanel transitData={transitData} />
              </div>
            )}

            {/* Lower Grid: Yogas + Narrative Predictions */}
            {yogasData && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '24px'
              }}>
                <YogasList yogasData={yogasData} />
                <PredictionCards predictionsData={predictionsData} />
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Dedicated Life Problem Solver & Remedies */}
        {chartData && viewTab === 'remedies' && (
          <div>
            <RemediesPanel remediesData={predictionsData?.remedies} />
          </div>
        )}

        {/* TAB 3: Life Chapters & Dashas */}
        {chartData && viewTab === 'timeline' && dashaData && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <DashaTimeline dashaData={dashaData} />
            {predictionsData && <PredictionCards predictionsData={predictionsData} />}
          </div>
        )}
      </main>

      {/* Warm Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-card)',
        background: 'var(--footer-bg)',
        padding: '24px',
        textAlign: 'center',
        fontSize: '13px',
        color: 'var(--text-soft)',
        transition: 'background 0.3s ease'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '12px' }}>
          <span>© 2026 AstroLogic — Empowering Clarity & Action</span>
          <span>Automatic City Geocoder | Classical BPHS Remedies & Upayas</span>
          <span>FastAPI + Next.js</span>
        </div>
      </footer>
    </div>
  );
}
