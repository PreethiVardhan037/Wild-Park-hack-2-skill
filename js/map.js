// Wild Park Interactive Map Controller
// Renders an interactive vector SVG representing the geography of the sanctuary.

import { BIOMES } from './data.js';

// Specific coordinates for interactive elements on a 800x500 map canvas
const BIOME_PATHS = {
  forest: {
    d: "M 50 50 L 400 50 L 380 200 L 250 250 L 50 200 Z",
    name: "Northern Pine Forest",
    desc: "A dense sanctuary of pine and willow trees, home to cold-tolerant wolves, grizzly bears, tigers, and woodpeckers.",
    color: "#3d7e5a"
  },
  cliffs: {
    d: "M 400 50 L 750 50 L 750 250 L 500 280 L 380 200 Z",
    name: "Aviary Mountain Cliffs",
    desc: "High alpine ridges and rocky precipices designed for birds of prey like falcons, eagles, and cliff-dwelling songbirds.",
    color: "#6c757d"
  },
  savannah: {
    d: "M 500 280 L 750 250 L 750 450 L 450 450 L 400 360 Z",
    name: "Savannah Grasslands",
    desc: "Vast golden plains simulating African grasslands. Regulates large herds of zebras, elephants, rhinos, and lions.",
    color: "#e2b85c"
  },
  wetland: {
    d: "M 50 200 L 250 250 L 320 320 L 280 450 L 50 450 Z",
    name: "Reptile & Insect Wetland",
    desc: "Misty swamps and muddy banks. Provides ideal humidity for crocodiles, anacondas, bullfrogs, and detritivores.",
    color: "#2d6a4f"
  },
  aquatic: {
    d: "M 250 250 L 380 200 L 500 280 L 400 360 L 320 320 Z",
    name: "Aquatic Estuary & Central Lake",
    desc: "Our primary water reservoir, including deep-water marine zones for orcas, penguins, platypuses, and sea otters.",
    color: "#0077b6"
  }
};

// Animal Pins to scatter on the map
const MAP_PINS = [
  { id: 1, name: "African Lion", x: 620, y: 350, icon: "🦁" },
  { id: 3, name: "Grizzly Bear", x: 180, y: 120, icon: "🐻" },
  { id: 4, name: "Killer Whale", x: 420, y: 280, icon: "🐳" },
  { id: 5, name: "Nile Crocodile", x: 180, y: 380, icon: "🐊" },
  { id: 8, name: "Peregrine Falcon", x: 600, y: 140, icon: "🦅" },
  { id: 36, name: "African Elephant", x: 550, y: 390, icon: "🐘" },
  { id: 37, name: "Plains Zebra", x: 680, y: 310, icon: "🦓" },
  { id: 41, name: "Giant Panda", x: 260, y: 150, icon: "🐼" },
  { id: 43, name: "Hippopotamus", x: 150, y: 320, icon: "🦛" },
  { id: 49, name: "Galapagos Tortoise", x: 80, y: 290, icon: "🐢" }
];

export function initParkMap(containerId, animalData, onShowAnimal) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Generate SVG Element
  let svgHTML = `
    <svg viewBox="0 0 800 500" class="svg-map" xmlns="http://www.w3.org/2000/svg">
      <!-- Definitions for filters -->
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Base Map Grassland Fill -->
      <rect width="800" height="500" fill="#040b07" rx="16" />
      
      <!-- GRID LINES FOR HIGH TECH TELEMETRY STYLE -->
      <g stroke="rgba(16, 185, 129, 0.03)" stroke-width="1">
        ${Array.from({ length: 16 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="500" />`).join('')}
        ${Array.from({ length: 10 }, (_, i) => `<line x1="0" y1="${i * 50}" x2="800" y2="${i * 50}" />`).join('')}
      </g>

      <!-- BIOME HABITATS -->
      <g id="map-biomes">
  `;

  for (let key in BIOME_PATHS) {
    const biome = BIOME_PATHS[key];
    svgHTML += `
      <path d="${biome.d}" 
            class="map-biome" 
            data-biome-key="${key}" 
            fill="${biome.color}" 
            fill-opacity="0.12" 
            stroke="${biome.color}" 
            stroke-width="1.5" 
            stroke-dasharray="4,4" />
    `;
  }

  svgHTML += `
      </g>

      <!-- WATER BODIES (Lakes & Rivers) -->
      <g id="map-waters">
        <!-- Winding River feeding into Central Lake -->
        <path d="M 680 50 Q 550 80, 520 160 T 420 220" class="map-river-tributary" />
        <path d="M 520 160 Q 460 170, 420 220" class="map-river-tributary" />
        
        <!-- Main River running from North-East mountain region -->
        <path d="M 750 90 Q 600 110, 510 170 T 380 230" class="map-river" />

        <!-- Central Lake -->
        <ellipse cx="380" cy="270" rx="90" ry="60" class="map-lake" />
        <circle cx="340" cy="260" r="30" class="map-lake" />

        <!-- River Delta draining South-West into swamp -->
        <path d="M 330 310 Q 280 340, 240 330 T 130 420" class="map-river" />
        <path d="M 290 315 Q 260 380, 220 450" class="map-river-tributary" />
      </g>

      <!-- BIOME NAMES LABELS -->
      <text x="210" y="90" class="map-label">Northern Pine Forest</text>
      <text x="610" y="90" class="map-label">Aviary Mountain Cliffs</text>
      <text x="610" y="420" class="map-label">Savannah Grasslands</text>
      <text x="140" y="430" class="map-label">Wetlands</text>
      <text x="380" y="275" class="map-label" fill="#fff" opacity="0.6">Crested Lake</text>

      <!-- ANIMAL PINS -->
      <g id="map-pins">
  `;

  // Draw pins
  MAP_PINS.forEach(pin => {
    svgHTML += `
      <g class="map-pin" data-species-id="${pin.id}" transform="translate(${pin.x}, ${pin.y})">
        <!-- Radar Pulsing Ring -->
        <circle r="14" fill="none" stroke="#10b981" stroke-width="1" opacity="0.4">
          <animate attributeName="r" values="8;18" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
        </circle>
        
        <!-- Base Pin Circle -->
        <circle r="9" fill="#12231c" stroke="#10b981" stroke-width="1.5" filter="url(#glow)" />
        
        <!-- Emoji representation -->
        <text y="4" font-size="11" text-anchor="middle">${pin.icon}</text>
      </g>
    `;
  });

  svgHTML += `
      </g>
    </svg>
  `;

  // Inject SVG
  container.innerHTML = svgHTML;

  // Add Interactive Events
  const biomePaths = container.querySelectorAll(".map-biome");
  const detailsCard = document.getElementById("map-details-card");

  const highlightBiome = (key) => {
    biomePaths.forEach(p => {
      const isTarget = p.getAttribute("data-biome-key") === key;
      p.setAttribute("fill-opacity", isTarget ? "0.25" : "0.12");
      p.setAttribute("stroke-width", isTarget ? "2.5" : "1.5");
    });

    const info = BIOME_PATHS[key];
    const biomeSpecies = animalData.filter(a => a.biome === key);

    if (detailsCard) {
      detailsCard.innerHTML = `
        <h3 style="color: ${info.color}; font-size:18px;">${info.name}</h3>
        <p style="font-size: 13px; color: var(--text-muted); margin-top: 8px; line-height: 1.5;">${info.desc}</p>
        
        <h4 style="font-size: 12px; text-transform: uppercase; color: var(--text-muted); margin-top: 16px; margin-bottom: 8px;">
          Resident Species (${biomeSpecies.length})
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 6px; max-height: 180px; overflow-y: auto; padding-right: 4px;">
          ${biomeSpecies.map(a => `
            <span class="tag-badge" 
                  style="cursor: pointer; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color);" 
                  onclick="window.appTriggerShowAnimal(${a.id})">
              ${a.name}
            </span>
          `).join('')}
        </div>
      `;
    }
  };

  // Bind Biome Clicks
  biomePaths.forEach(path => {
    path.addEventListener("click", () => {
      const key = path.getAttribute("data-biome-key");
      highlightBiome(key);
    });
  });

  // Bind Pin Clicks
  const pinElems = container.querySelectorAll(".map-pin");
  pinElems.forEach(pin => {
    pin.addEventListener("click", () => {
      const speciesId = parseInt(pin.getAttribute("data-species-id"));
      const species = animalData.find(a => a.id === speciesId);
      if (species && onShowAnimal) {
        onShowAnimal(species);
      }
    });

    pin.addEventListener("mouseenter", () => {
      const speciesId = parseInt(pin.getAttribute("data-species-id"));
      const species = animalData.find(a => a.id === speciesId);
      if (species && detailsCard) {
        detailsCard.innerHTML = `
          <h3 style="color: var(--secondary); font-size: 18px;">${species.name}</h3>
          <p style="font-size:12px; font-style:italic; color: var(--text-muted);">${species.scientific}</p>
          <p style="font-size:13px; color: var(--text-main); margin-top: 8px;">
            <strong>Trophic Role:</strong> ${species.trophic}<br>
            <strong>Population:</strong> ${species.population} in park<br>
            <strong>Health Status:</strong> <span style="color: var(--primary);">${species.health}</span>
          </p>
          <button class="btn-primary" style="margin-top: 14px; padding: 8px 12px; font-size:12px;" onclick="window.appTriggerShowAnimal(${species.id})">
            Open Telemetry Profile
          </button>
        `;
      }
    });
  });

  // Expose triggers globally for inline HTML click interactions
  window.appTriggerShowAnimal = (id) => {
    const species = animalData.find(a => a.id === id);
    if (species && onShowAnimal) {
      onShowAnimal(species);
    }
  };

  // Highlight forest by default
  highlightBiome("forest");
}
