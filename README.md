# Wild Park - Premium Interactive Wildlife Sanctuary

Welcome to **Wild Park**, a premium, highly interactive Single Page Application (SPA) designed to showcase a modern ecological national park. Built using vanilla web technologies, the platform integrates **Three.js** for 3D renderings and the **Web Audio API** for real-time procedural nature soundscapes.

---

## 🌟 Key Features

*   **Ecosystem Telemetry Dashboard**: Real-time display of total species (50), total population (174), active sponsorships, and a dynamic ecological balance meter dividing populations across trophic levels.
*   **50 Species Database**: A searchable, filterable catalog containing 50 distinct animal types from all sectors of the food web. Each species displays its scientific name, conservation status, food requirements, keeper profiles, and a register of **150+ individually named, serial-tagged animals** (e.g. Simba `WP-001`).
*   **3D Food Chain Sandbox**: An interactive Three.js hourglass structure displaying stacked concentric circles of species nodes. Users can rotate/zoom the viewport, hover over nodes for alerts, and click them to highlight prey connections in green and predator connections in red.
*   **Procedural 3D Animal Viewer**: Renders stylized, low-poly 3D models for each animal class dynamically inside the detail panel. Primitives animate procedurally to simulate breathing, leg pacing, wing flapping, tail-wagging, and body wiggling.
*   **Interactive SVG Sanctuary Map**: Renders geographic boundaries, mountain ranges, and water bodies (a winding river, tributaries, and central lake). Features hoverable biome sectors and pulsing animal pins linked to their data cards.
*   **Dynamic Barcode Ticketing**: Select date and ticket quantities, and watch the system update total costs live. Submitting a virtual checkout generates a digital ticket pass drawing custom vector barcodes dynamically based on the input name.
*   **Transit Router**: Directions and custom SVG route diagrams from regional transportation hubs (Railway Station and Bus Terminal) directly to the park entrances.
*   **Web Audio forest breeze Synthesizer**: Generates organic wind noise (filtered brownian noise) and periodic pitch-swept bird chirps procedurally on the client side without needing external static audio file downloads.

---

## 📂 File Structure

```text
├── index.html          # Core SPA scaffolding and HTML panels
├── styles.css          # Variable-driven glassmorphism stylesheet
└── js/
    ├── data.js         # Complete species catalog and keepers database
    ├── models.js       # Three.js graph loader and procedural animators
    ├── map.js          # SVG park geometry generator and pin layers
    ├── booking.js      # Ticketing calculations and transit routing
    └── app.js          # Coordinator and Web Audio synthesizer
```

---

## 🛠️ Technology Stack

*   **Frontend**: Vanilla HTML5, CSS3, ES6 JavaScript (Native ESM Modules).
*   **Graphics**: [Three.js](https://threejs.org/) (WebGL), OrbitControls, custom SVG/Canvas elements.
*   **Audio**: Web Audio API (real-time synthesised oscillators, gain nodes, and filters).
*   **Icons**: [Lucide Icons](https://lucide.dev/) CDN.

---

## 🚀 Setup & Launch

Because the website utilizes **native ES modules** for importing scripts, you must host it on a local development server to avoid CORS issues:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/PreethiVardhan037/Wild-Park-hack-2-skill.git
    cd Wild-Park-hack-2-skill
    ```

2.  **Start a Static Dev Server**:
    Using Python (built-in):
    ```bash
    python3 -m http.server 8080
    ```
    Or Node.js `http-server`:
    ```bash
    npx http-server -p 8080
    ```

3.  **Open in Browser**:
    Navigate to [http://localhost:8080](http://localhost:8080) to explore the Wild Park interface.
