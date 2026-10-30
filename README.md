# Deterministic Horoscope & Predictive Engine - Frontend

A modern, reactive **Next.js (JavaScript)** web application delivering interactive Vedic Kundali visualization, 120-year Vimshottari timeline scrubbing, canonical yoga evaluation, and deterministic domain scoring.

---

## 🌟 Key Components

* **`BirthForm.jsx`**: High-precision birth input form supporting exact seconds, timezone selection, city presets (New Delhi, Mumbai, New York, London, Tokyo, etc.), and quick-sample profile loading.
* **`KundaliChart.jsx`**: Dual-style SVG chart visualizer supporting:
  * **North Indian Diamond Chart** (traditional, house-fixed)
  * **South Indian Fixed Sign Grid**
  * Color-coded dignities (Exalted, Own Sign, Debilitated, Combust, Retrograde).
* **`DashaTimeline.jsx`**: Zoomable 120-year Vimshottari dasha scrubber highlighting active Mahadasha and Antardasha.
* **`DomainScoreGauges.jsx`**: Progress gauges (0–100) across 6 core life pillars: Career, Wealth, Health, Relationships, Intellect, and Spirituality.
* **`YogasList.jsx`**: Filterable cards displaying detected classical Yogas and Doshas with scriptural citations (*Brihat Parashara Hora Shastra*, *Phaladeepika*, *Saravali*).
* **`TransitsPanel.jsx`**: Live planetary transits (Saturn *Sade Sati*, Jupiter *Guru Gochar*, Rahu/Ketu).
* **`PredictionCards.jsx`**: Tabbed explainable life readings with clear actionable focus.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Open your browser at **[http://localhost:3000](http://localhost:3000)**.

---

## 🔗 Backend Connection
The frontend connects automatically to the FastAPI backend running at `http://localhost:8000`.
To customize the backend address, create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

