// Wild Park Main Coordinator & Application Router

import { ANIMAL_DATA, CARETAKERS, BIOMES } from './data.js';
import { renderAnimal3D, initFoodChain3D } from './models.js';
import { initParkMap } from './map.js';
import { TicketBookingManager, initTransitNav } from './booking.js';

class AppController {
  constructor() {
    this.bookingManager = new TicketBookingManager();
    this.adoptionCount = 12; // Initial mock count
    this.currentSelectedSpecies = null;
    this.synthesizer = null;
    this.audioPlaying = false;
  }

  init() {
    this.setupViewRouter();
    this.setupSearchAndFilters();
    this.renderDirectoryGrid(ANIMAL_DATA);
    this.initDashboard();
    this.setupAdoptionSystem();
    this.bookingManager.init();
    
    // Initialize transit guides
    initTransitNav("transit-selector", "transit-route-map", "transit-instructions");

    // Initialize 2D park map
    initParkMap("svg-map-container", ANIMAL_DATA, (species) => this.showAnimalDetail(species));

    // Setup interactive icons
    lucide.createIcons();

    // Trigger food chain initialization in 3D
    initFoodChain3D("foodchain-canvas-container", ANIMAL_DATA, (species) => this.showAnimalDetail(species));

    // Setup procedural sound synthesizer
    this.setupAudioSynthesizer();
  }

  // SPA VIEW ROUTING
  setupViewRouter() {
    const navLinks = document.querySelectorAll(".nav-link");
    const views = document.querySelectorAll(".view-panel");

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        const targetViewId = link.getAttribute("data-target");

        // Toggle active navigation buttons
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        // Toggle active views
        views.forEach(v => {
          if (v.id === targetViewId) {
            v.classList.add("active");
            // If opening maps or food chains, resize Three.js canvases
            window.dispatchEvent(new Event('resize'));
          } else {
            v.classList.remove("active");
          }
        });
      });
    });
  }

  // ALERTS & DASHBOARD INITIALIZER
  initDashboard() {
    // Total species count
    document.getElementById("stat-total-species").innerText = ANIMAL_DATA.length;
    
    // Calculate total individual population count
    let totalPopulation = 0;
    ANIMAL_DATA.forEach(a => {
      // 50 Earthworm is colony, counted as 100 individuals
      totalPopulation += a.population;
    });
    document.getElementById("stat-total-animals").innerText = totalPopulation;

    // Spotlight animal
    const randomIndex = Math.floor(Math.random() * ANIMAL_DATA.length);
    const spotlight = ANIMAL_DATA[randomIndex];
    
    const sName = document.getElementById("spotlight-name");
    const sDesc = document.getElementById("spotlight-desc");
    const sBtn = document.getElementById("spotlight-view-btn");

    if (sName) sName.innerText = spotlight.name;
    if (sDesc) sDesc.innerText = `${spotlight.scientific} (${spotlight.trophic}) - ${spotlight.description}`;
    if (sBtn) {
      sBtn.onclick = () => this.showAnimalDetail(spotlight);
    }

    // Alerts Feed
    const alertFeed = document.getElementById("dashboard-alerts");
    if (alertFeed) {
      const mockAlerts = [
        { type: "info", text: "New Capybara enclosure completed near Crested Lake." },
        { type: "medical", text: "Mufasa the Lion's dental surgery has healed successfully." },
        { type: "info", text: "Ecosystem balance updated. Primary consumer populations are stable." },
        { type: "adopt", text: "A donor has successfully sponsored Gigi the Gazelle." },
        { type: "warning", text: "Wetlands region experiencing high water levels. Sub-canopy pathways closed." }
      ];

      alertFeed.innerHTML = mockAlerts.map(alert => {
        let icon = "info";
        let colorClass = "text-main";
        if (alert.type === "medical") { icon = "activity"; colorClass = "text-secondary"; }
        if (alert.type === "adopt") { icon = "award"; colorClass = "text-primary"; }
        if (alert.type === "warning") { icon = "alert-triangle"; colorClass = "text-accent-red"; }

        return `
          <div class="individual-row" style="padding: 12px; border-left: 3px solid var(--primary);">
            <div style="display: flex; align-items: center; gap: 10px;">
              <i data-lucide="${icon}" style="width:16px; height:16px;"></i>
              <span style="font-size: 13px;" class="${colorClass}">${alert.text}</span>
            </div>
            <span style="font-size: 11px; color: var(--text-muted);">Just Now</span>
          </div>
        `;
      }).join('');
    }
  }

  // SEARCH AND GRID FILTER LOGIC
  setupSearchAndFilters() {
    const searchBar = document.getElementById("species-search");
    const filterBiome = document.getElementById("filter-biome");
    const filterTrophic = document.getElementById("filter-trophic");
    const filterDiet = document.getElementById("filter-diet");

    const triggerFilter = () => {
      const query = searchBar.value.toLowerCase();
      const biomeVal = filterBiome.value;
      const trophicVal = filterTrophic.value;
      const dietVal = filterDiet.value;

      const filtered = ANIMAL_DATA.filter(animal => {
        const matchesQuery = animal.name.toLowerCase().includes(query) || 
                             animal.scientific.toLowerCase().includes(query) ||
                             animal.trophic.toLowerCase().includes(query) ||
                             animal.diet.toLowerCase().includes(query);
        const matchesBiome = biomeVal === 'all' || animal.biome === biomeVal;
        const matchesTrophic = trophicVal === 'all' || animal.trophic === trophicVal;
        const matchesDiet = dietVal === 'all' || animal.diet === dietVal;

        return matchesQuery && matchesBiome && matchesTrophic && matchesDiet;
      });

      this.renderDirectoryGrid(filtered);
    };

    if (searchBar) searchBar.addEventListener("input", triggerFilter);
    if (filterBiome) filterBiome.addEventListener("change", triggerFilter);
    if (filterTrophic) filterTrophic.addEventListener("change", triggerFilter);
    if (filterDiet) filterDiet.addEventListener("change", triggerFilter);
  }

  renderDirectoryGrid(list) {
    const grid = document.getElementById("animal-directory-grid");
    if (!grid) return;

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: span 12; text-align: center; padding: 40px; color: var(--text-muted);">
          No animal species match your filters. Try adjusting them.
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map(animal => {
      let badgeClass = "";
      if (animal.trophic === "Apex Predator") badgeClass = "apex";
      else if (animal.trophic === "Tertiary Consumer") badgeClass = "tertiary";
      else if (animal.trophic === "Decomposer") badgeClass = "decomposer";

      const bColor = BIOMES[animal.biome]?.color || "var(--primary)";

      return `
        <div class="animal-card" data-id="${animal.id}">
          <div class="animal-card-header">
            <span class="tag-badge">ID: #${animal.id.toString().padStart(3, '0')}</span>
            <span class="trophic-badge ${badgeClass}">${animal.trophic}</span>
          </div>
          <h3 style="border-left: 3px solid ${bColor}; padding-left: 8px;">${animal.name}</h3>
          <p class="scientific">${animal.scientific}</p>
          <div class="animal-card-footer">
            <span><i data-lucide="shield-check"></i> ${animal.health}</span>
            <span><i data-lucide="users"></i> Pop: ${animal.population}</span>
          </div>
        </div>
      `;
    }).join('');

    // Re-trigger icon rendering
    lucide.createIcons();

    // Attach click events to card elements
    const cards = grid.querySelectorAll(".animal-card");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const id = parseInt(card.getAttribute("data-id"));
        const species = ANIMAL_DATA.find(a => a.id === id);
        if (species) {
          this.showAnimalDetail(species);
        }
      });
    });
  }

  // ANIMAL SIDEBAR DETAIL RENDERING
  showAnimalDetail(species) {
    this.currentSelectedSpecies = species;
    
    // Toggle active classes
    const sidebar = document.getElementById("animal-detail-sidebar");
    if (sidebar) sidebar.classList.add("active");

    // Map UI text
    document.getElementById("detail-title").innerText = species.name;
    document.getElementById("detail-scientific").innerText = species.scientific;
    document.getElementById("detail-trophic").innerText = species.trophic;
    document.getElementById("detail-diet").innerText = species.diet;
    document.getElementById("detail-food").innerText = species.foodNeeds;
    document.getElementById("detail-population").innerText = `${species.population} Individs`;
    document.getElementById("detail-description").innerText = species.description;
    
    // Biome mapping
    const biomeInfo = BIOMES[species.biome];
    const biomeSpan = document.getElementById("detail-biome");
    if (biomeSpan) {
      biomeSpan.innerText = biomeInfo ? biomeInfo.name : species.biome;
      biomeSpan.style.color = biomeInfo ? biomeInfo.color : "var(--text-highlight)";
    }

    // Caretaker Mapping
    const keeper = CARETAKERS[species.caretakerId];
    const keeperCard = document.getElementById("detail-caretaker");
    if (keeper && keeperCard) {
      keeperCard.innerHTML = `
        <div class="caretaker-avatar"><i data-lucide="${keeper.icon}"></i></div>
        <div class="caretaker-info">
          <h4>${keeper.name}</h4>
          <p>${keeper.role} (Badge: ${keeper.badge})</p>
        </div>
      `;
      lucide.createIcons();
    }

    // Individuals Registry Injection
    const indContainer = document.getElementById("detail-individuals-container");
    if (indContainer) {
      if (species.individuals && species.individuals.length > 0) {
        indContainer.innerHTML = species.individuals.map(ind => `
          <div class="individual-row">
            <div>
              <strong class="ind-name">${ind.name}</strong>
              <span class="ind-tag">${ind.tag}</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="ind-status">${ind.health} (${ind.sex})</span>
              <button class="ind-adopt-btn" data-tag="${ind.tag}" data-name="${ind.name}">Adopt</button>
            </div>
          </div>
        `).join('');

        // Bind Adopt Button triggers
        const adoptBtns = indContainer.querySelectorAll(".ind-adopt-btn");
        adoptBtns.forEach(btn => {
          btn.addEventListener("click", () => {
            const name = btn.getAttribute("data-name");
            const tag = btn.getAttribute("data-tag");
            this.openAdoptionModal(name, tag);
          });
        });
      } else {
        indContainer.innerHTML = `<div style="text-align:center; padding:12px; color:var(--text-muted);">No cataloged individuals list.</div>`;
      }
    }

    // Close detail panel bind
    const closeBtn = document.getElementById("btn-close-detail");
    if (closeBtn) {
      closeBtn.onclick = () => sidebar.classList.remove("active");
    }

    // Trigger Three.js render loop inside panel canvas
    renderAnimal3D("detail-3d-canvas", species);
  }

  // ADOPTION SYSTEM MODAL ACTIONS
  setupAdoptionSystem() {
    const backdrop = document.getElementById("adopt-backdrop");
    const modal = document.getElementById("adopt-modal");
    const closeBtn = document.getElementById("btn-close-adopt-modal");
    const submitDonationBtn = document.getElementById("btn-submit-donation");

    const closeModal = () => {
      backdrop.classList.remove("active");
      modal.classList.remove("active");
    };

    if (closeBtn) closeBtn.onclick = closeModal;
    if (backdrop) backdrop.onclick = closeModal;

    // General fund sponsor trigger
    if (submitDonationBtn) {
      submitDonationBtn.onclick = () => {
        const dName = document.getElementById("donor-name").value || "Anonymous Supporter";
        const dAmount = document.getElementById("custom-donation").value || "50";
        const dArea = document.getElementById("donation-target").value;

        alert(`❤️ Thank you, ${dName}!\n\nYour simulated donation of $${dAmount} to our '${dArea}' fund has been processed successfully. Your support aids medical upkeep and food supply!`);
      };
    }
  }

  openAdoptionModal(animalName, animalTag) {
    const backdrop = document.getElementById("adopt-backdrop");
    const modal = document.getElementById("adopt-modal");
    const certDonor = document.getElementById("cert-donor-name");
    const certTitle = document.getElementById("cert-animal-title");
    const certTag = document.getElementById("cert-animal-tag");
    const certDate = document.getElementById("cert-date");

    // Gather user name
    const donorName = prompt("Please enter the Adoptive Parent's Full Name:", "Jane Doe");
    if (!donorName) return; // cancel

    // Fill cert data
    if (certDonor) certDonor.innerText = donorName;
    if (certTitle) certTitle.innerText = `${animalName} the ${this.currentSelectedSpecies.name}`;
    if (certTag) certTag.innerText = animalTag;
    if (certDate) certDate.innerText = new Date().toLocaleDateString();

    // Open Modal
    if (backdrop) backdrop.classList.add("active");
    if (modal) modal.classList.add("active");

    // Update Telemetry Counter
    this.adoptionCount++;
    const statAdoptions = document.getElementById("stat-total-adoptions");
    if (statAdoptions) statAdoptions.innerText = `${this.adoptionCount} Active`;
  }

  // PROCEDURAL SOUNDS SYNTHESISER (Web Audio API)
  // Generates a beautiful ambient forest breeze and periodic synthesised bird chirping loops
  setupAudioSynthesizer() {
    const toggleBtn = document.getElementById("audio-toggle-btn");
    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.synthesizer) {
        this.synthesizer = new AudioCtx();
      }

      if (!this.audioPlaying) {
        // Resume context if suspended (Browser policy)
        if (this.synthesizer.state === 'suspended') {
          this.synthesizer.resume();
        }
        
        // Start synthesising ambient wind & forest chirps
        this.startForestAmbience();
        this.audioPlaying = true;
        toggleBtn.innerHTML = `<i data-lucide="volume-2" class="text-primary"></i>`;
        toggleBtn.classList.add("active");
      } else {
        this.stopForestAmbience();
        this.audioPlaying = false;
        toggleBtn.innerHTML = `<i data-lucide="volume-x"></i>`;
        toggleBtn.classList.remove("active");
      }
      lucide.createIcons();
    });
  }

  startForestAmbience() {
    if (!this.synthesizer) return;

    const ctx = this.synthesizer;

    // 1. Synthesize wind (Filtered White Noise)
    const bufferSize = ctx.sampleRate * 2; // 2 seconds
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Fill buffer with white noise
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Lowpass filter to emulate deep forest breeze
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(300, ctx.currentTime);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);

    // Gain node for breeze volume adjustments
    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.04, ctx.currentTime);

    // Chain nodes
    whiteNoise.connect(filter);
    filter.connect(windGain);
    windGain.connect(ctx.destination);

    whiteNoise.start();
    this.windNode = whiteNoise;
    this.windGainNode = windGain;

    // Modulate wind cutoff filter dynamically to simulate gusting wind
    this.modulateWindFilter(filter);

    // 2. Synthesize bird chirping intervals
    this.birdTimer = setInterval(() => {
      this.playSynthesizedChirp();
    }, 4000);
  }

  modulateWindFilter(filter) {
    if (!this.audioPlaying) return;
    const ctx = this.synthesizer;
    
    // Oscillate frequency between 150Hz and 600Hz
    const nextTime = ctx.currentTime + 3;
    const nextFreq = 150 + Math.random() * 450;
    
    filter.frequency.exponentialRampToValueAtTime(nextFreq, nextTime);

    setTimeout(() => {
      if (this.audioPlaying) this.modulateWindFilter(filter);
    }, 3000);
  }

  playSynthesizedChirp() {
    if (!this.synthesizer || this.synthesizer.state === 'suspended') return;
    const ctx = this.synthesizer;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    // Bird frequencies are high, e.g. 2000Hz up to 4500Hz
    const baseFreq = 2200 + Math.random() * 1000;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    
    // Volume envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

    // Frequency modulation for bird chirps (sweeping pitch up and down rapidly)
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 800, ctx.currentTime + 0.1);
    osc.frequency.exponentialRampToValueAtTime(baseFreq - 400, ctx.currentTime + 0.25);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  }

  stopForestAmbience() {
    if (this.windNode) {
      try { this.windNode.stop(); } catch(e) {}
      this.windNode.disconnect();
      this.windNode = null;
    }
    if (this.windGainNode) {
      this.windGainNode.disconnect();
      this.windGainNode = null;
    }
    if (this.birdTimer) {
      clearInterval(this.birdTimer);
      this.birdTimer = null;
    }
  }
}

// Initialize Application once document parses
document.addEventListener("DOMContentLoaded", () => {
  const controller = new AppController();
  controller.init();
  
  // Set global reference for global inline HTML ticket event triggers
  window.appBooking = controller.bookingManager;
});
