/**
 * Horoscope API Client Service
 * Connects Next.js Frontend with the Python FastAPI Backend.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function calculateHoroscope(birthData) {
  const res = await fetch(`${API_BASE}/api/horoscope/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(birthData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to calculate horoscope');
  }

  return res.json();
}

export async function fetchChartById(chartId) {
  const res = await fetch(`${API_BASE}/api/horoscope/${chartId}`);
  if (!res.ok) throw new Error('Failed to fetch chart record');
  return res.json();
}

export async function fetchDashas(chartId) {
  const res = await fetch(`${API_BASE}/api/horoscope/${chartId}/dasha`);
  if (!res.ok) throw new Error('Failed to fetch dasha timeline');
  return res.json();
}

export async function fetchYogas(chartId) {
  const res = await fetch(`${API_BASE}/api/horoscope/${chartId}/yogas`);
  if (!res.ok) throw new Error('Failed to fetch detected yogas');
  return res.json();
}

export async function fetchPredictions(chartId) {
  const res = await fetch(`${API_BASE}/api/horoscope/${chartId}/predictions`);
  if (!res.ok) throw new Error('Failed to fetch predictions');
  return res.json();
}

export async function fetchTransits(chartId) {
  const res = await fetch(`${API_BASE}/api/horoscope/${chartId}/transits`);
  if (!res.ok) throw new Error('Failed to fetch real-time transits');
  return res.json();
}

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/api/health`, { cache: 'no-store' });
    return res.ok;
  } catch {
    return false;
  }
}

