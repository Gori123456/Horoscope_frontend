import React, { useState } from 'react';

const POPULAR_CITIES = [
  'New Delhi', 'Mumbai', 'Pune', 'Bengaluru', 'Jaipur', 'Ahmedabad', 'Kolkata', 'Chennai', 'Hyderabad', 'New York', 'London', 'Dubai'
];

export default function BirthForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    name: 'Arjun Sharma',
    birth_date: '1998-07-21',
    birth_time: '14:30:00',
    place_name: 'New Delhi, India',
    latitude: '',
    longitude: '',
    birth_timezone: 'Asia/Kolkata'
  });

  const [showAdvancedGps, setShowAdvancedGps] = useState(false);

  const handleCityQuickClick = (cityName) => {
    setFormData(prev => ({
      ...prev,
      place_name: cityName,
      latitude: '',
      longitude: ''
    }));
  };

  const handleQuickSample = () => {
    setFormData({
      name: 'Priya Patel',
      birth_date: '1996-05-12',
      birth_time: '10:15:00',
      place_name: 'Pune',
      latitude: '',
      longitude: '',
      birth_timezone: 'Asia/Kolkata'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      birth_date: formData.birth_date,
      birth_time: formData.birth_time,
      place_name: formData.place_name,
      birth_timezone: formData.birth_timezone || 'Asia/Kolkata'
    };

    // Include lat/long only if user explicitly typed them
    if (formData.latitude && formData.longitude) {
      payload.latitude = parseFloat(formData.latitude);
      payload.longitude = parseFloat(formData.longitude);
    }

    onSubmit(payload);
  };

  return (
    <div className="warm-card" style={{ padding: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
        <div>
          <h2 className="font-serif-warm" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
            🌟 Your Birth Details
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-soft)', marginTop: '4px' }}>
            Enter your date, time & city to discover your cosmic blueprint and solutions.
          </p>
        </div>
        <button
          type="button"
          onClick={handleQuickSample}
          style={{
            fontSize: '12px',
            padding: '7px 12px',
            borderRadius: '8px',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: 'var(--gold-warm)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          ✨ Sample Profile
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Full Name */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-soft)', marginBottom: '6px' }}>
            Your Name
          </label>
          <input
            type="text"
            required
            className="warm-input"
            placeholder="e.g. Rahul Sharma"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Date and Time */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-soft)', marginBottom: '6px' }}>
              Date of Birth
            </label>
            <input
              type="date"
              required
              className="warm-input"
              value={formData.birth_date}
              onChange={e => setFormData({ ...formData, birth_date: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-soft)', marginBottom: '6px' }}>
              Time of Birth
            </label>
            <input
              type="time"
              step="1"
              required
              className="warm-input"
              value={formData.birth_time}
              onChange={e => setFormData({ ...formData, birth_time: e.target.value })}
            />
          </div>
        </div>

        {/* Place of Birth Input (No Lat/Long Needed!) */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-soft)', marginBottom: '6px' }}>
            City / Place of Birth
          </label>
          <input
            type="text"
            required
            className="warm-input"
            placeholder="e.g. Pune, Delhi, Mumbai, New York..."
            value={formData.place_name}
            onChange={e => setFormData({ ...formData, place_name: e.target.value })}
          />
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
            💡 You don't need latitude or longitude — just type your city name.
          </span>

          {/* Quick Click City Badges */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
            {POPULAR_CITIES.map(city => (
              <button
                key={city}
                type="button"
                onClick={() => handleCityQuickClick(city)}
                className={`btn-pill-city ${formData.place_name === city ? 'selected' : ''}`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced GPS Toggle */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
          <button
            type="button"
            onClick={() => setShowAdvancedGps(!showAdvancedGps)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{showAdvancedGps ? '▼' : '▶'}</span>
            <span>Optional: Enter exact GPS coordinates & timezone manually</span>
          </button>

          {showAdvancedGps && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Exact Latitude</label>
                <input
                  type="number"
                  step="0.0001"
                  className="warm-input"
                  placeholder="e.g. 28.6139"
                  value={formData.latitude}
                  onChange={e => setFormData({ ...formData, latitude: e.target.value })}
                  style={{ padding: '8px 12px', fontSize: '12px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Exact Longitude</label>
                <input
                  type="number"
                  step="0.0001"
                  className="warm-input"
                  placeholder="e.g. 77.2090"
                  value={formData.longitude}
                  onChange={e => setFormData({ ...formData, longitude: e.target.value })}
                  style={{ padding: '8px 12px', fontSize: '12px' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Big Warm Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary-warm"
        >
          {loading ? (
            <>
              <span style={{
                display: 'inline-block',
                width: '18px',
                height: '18px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: '#ffffff',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }} />
              <span>Aligning Celestial Coordinates...</span>
            </>
          ) : (
            <>
              <span>✨ Reveal My Kundali & Life Solutions</span>
            </>
          )}
        </button>
      </form>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
