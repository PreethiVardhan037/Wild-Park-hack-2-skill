// Wild Park Ticket Booking & Transit routing controller

export class TicketBookingManager {
  constructor() {
    this.prices = {
      adult: 25,
      child: 12,
      guide: 35
    };
    this.state = {
      adults: 1,
      children: 0,
      includeGuide: false,
      name: "John Doe",
      date: new Date().toISOString().split('T')[0]
    };
  }

  init() {
    this.setupEventListeners();
    this.updateUI();
  }

  setupEventListeners() {
    const nameInput = document.getElementById("visitor-name");
    const dateInput = document.getElementById("visit-date");
    const guideInput = document.getElementById("add-on-guide");
    const checkoutBtn = document.getElementById("btn-generate-ticket");

    if (nameInput) {
      nameInput.value = this.state.name;
      nameInput.addEventListener("input", (e) => {
        this.state.name = e.target.value || "John Doe";
        this.updateUI();
      });
    }

    if (dateInput) {
      dateInput.value = this.state.date;
      dateInput.addEventListener("input", (e) => {
        this.state.date = e.target.value;
        this.updateUI();
      });
    }

    if (guideInput) {
      guideInput.addEventListener("change", (e) => {
        this.state.includeGuide = e.target.checked;
        this.updateUI();
      });
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        if (!nameInput.value || !dateInput.value) {
          alert("Please fill in visitor name and date.");
          return;
        }
        
        // Mock successful transaction
        alert(`🎉 Reservation Confirmed!\n\nRepresentative: ${this.state.name}\nDate: ${this.state.date}\nTotal Paid: $${this.calculateTotal().toFixed(2)}\n\nYour digital pass has been activated and added to the Wild Park database. Present QR code on arrival.`);
      });
    }
  }

  increment(type) {
    if (type === 'adults') this.state.adults++;
    if (type === 'children') this.state.children++;
    this.updateUI();
  }

  decrement(type) {
    if (type === 'adults' && this.state.adults > 0) this.state.adults--;
    if (type === 'children' && this.state.children > 0) this.state.children--;
    this.updateUI();
  }

  calculateTotal() {
    let total = (this.state.adults * this.prices.adult) + (this.state.children * this.prices.child);
    if (this.state.includeGuide) {
      total += this.prices.guide;
    }
    return total;
  }

  updateUI() {
    // Update counters text
    const adultsSpan = document.getElementById("counter-adults");
    const childrenSpan = document.getElementById("counter-children");
    
    if (adultsSpan) adultsSpan.innerText = this.state.adults;
    if (childrenSpan) childrenSpan.innerText = this.state.children;

    // Update Virtual Ticket output fields
    const outName = document.getElementById("ticket-out-name");
    const outDate = document.getElementById("ticket-out-date");
    const outAttendees = document.getElementById("ticket-out-attendees");
    const outGuide = document.getElementById("ticket-out-guide");
    const outTotal = document.getElementById("ticket-out-total");

    if (outName) outName.innerText = this.state.name;
    if (outDate) outDate.innerText = this.state.date;
    if (outAttendees) {
      outAttendees.innerText = `${this.state.adults} Adult${this.state.adults !== 1 ? 's' : ''}, ${this.state.children} Child${this.state.children !== 1 ? 'ren' : ''}`;
    }
    if (outGuide) {
      outGuide.innerText = this.state.includeGuide ? "Private Safari Tour Included" : "Standard Self-guided";
    }
    if (outTotal) {
      outTotal.innerText = `$${this.calculateTotal().toFixed(2)}`;
    }

    // Draw Barcode dynamically
    this.drawBarcode();
  }

  drawBarcode() {
    const canvas = document.getElementById("barcode-elem");
    if (!canvas) return;

    // Redraw barcode lines inside SVG
    let svgLines = "";
    const seed = this.state.name.length + this.state.adults + this.state.children;
    let pos = 10;
    const width = 280;

    // Draw Mock barcode stripes
    for (let i = 0; pos < width - 10; i++) {
      // Procedural pseudo-random stripe widths
      const val = Math.sin(seed + i * 1.7) * 0.5 + 0.5;
      const stripeWidth = val < 0.2 ? 1 : (val < 0.5 ? 2 : (val < 0.85 ? 4 : 6));
      const isBlack = (i % 2 === 0);

      if (isBlack) {
        svgLines += `<rect x="${pos}" y="2" width="${stripeWidth}" height="46" fill="#111" />`;
      }
      pos += stripeWidth + 1;
    }
    canvas.innerHTML = svgLines;
  }
}


// TRANSIT AND DIRECTION MAP GENERATOR
const TRANSIT_DATA = {
  railway: {
    title: "Route from Central Railway Station",
    time: "25 minutes via Expressway Shuttle Bus",
    steps: [
      "Board the Wild Park Direct Express from Platform 4 (Runs every 15 minutes).",
      "Transit along the Emerald Highway (20 km heading North-West).",
      "Pass the Forest Buffer Zone boundary check.",
      "Disembark at the Sanctuary Main Gates and present booking pass QR."
    ],
    svg: `
      <svg viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%;">
        <rect width="400" height="150" fill="#030805" rx="8" />
        <g stroke="rgba(16, 185, 129, 0.15)" stroke-width="1">
          <line x1="0" y1="75" x2="400" y2="75" stroke-dasharray="4,4" />
        </g>
        
        <!-- Connecting Road -->
        <path d="M 40 75 Q 150 20, 250 110 T 360 75" fill="none" stroke="#e2b85c" stroke-width="3" stroke-dasharray="2,2"/>
        
        <!-- Nodes -->
        <circle cx="40" cy="75" r="8" fill="#10b981" />
        <text x="40" y="98" fill="#e2e8f0" font-size="10" text-anchor="middle">Central Rail Hub</text>

        <circle cx="200" cy="55" r="6" fill="#e2b85c" />
        <text x="200" y="42" fill="#94a3b8" font-size="9" text-anchor="middle">Forest Boundary Check</text>

        <circle cx="360" cy="75" r="10" fill="#f43f5e" />
        <text x="360" y="98" fill="#e2e8f0" font-size="10" text-anchor="middle">Wild Park Gate</text>
      </svg>
    `
  },
  bus: {
    title: "Route from Downtown Bus Terminal",
    time: "15 minutes via Line-B Local Commute",
    steps: [
      "Board Shuttle Bus Line B from Dock 12.",
      "Travel along the Lakeside Perimeter Road (12 km heading North).",
      "Pass through the Scenic Bridge Junction.",
      "Arrive at Gate 2 Entrance (Reptile Wetland wing)."
    ],
    svg: `
      <svg viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%;">
        <rect width="400" height="150" fill="#030805" rx="8" />
        <g stroke="rgba(16, 185, 129, 0.15)" stroke-width="1">
          <line x1="0" y1="75" x2="400" y2="75" stroke-dasharray="4,4" />
        </g>

        <!-- Connecting Road -->
        <path d="M 50 110 Q 120 40, 280 120 T 350 40" fill="none" stroke="#0ea5e9" stroke-width="3" />

        <!-- Nodes -->
        <circle cx="50" cy="110" r="8" fill="#10b981" />
        <text x="50" y="130" fill="#e2e8f0" font-size="10" text-anchor="middle">Bus Station</text>

        <circle cx="200" cy="75" r="6" fill="#0ea5e9" />
        <text x="200" y="98" fill="#94a3b8" font-size="9" text-anchor="middle">Scenic Bridge</text>

        <circle cx="350" cy="40" r="10" fill="#f43f5e" />
        <text x="350" y="62" fill="#e2e8f0" font-size="10" text-anchor="middle">Gate 2 Wetland</text>
      </svg>
    `
  }
};

export function initTransitNav(selectorId, mapBoxId, textContainerId) {
  const selector = document.getElementById(selectorId);
  const mapBox = document.getElementById(mapBoxId);
  const titleElem = document.getElementById("transit-title");
  const summaryElem = document.getElementById("transit-summary");
  const instructionsList = document.getElementById("transit-instructions");

  if (!selector) return;

  const updateTransitRoute = () => {
    const val = selector.value;
    const data = TRANSIT_DATA[val];
    if (!data) return;

    if (mapBox) mapBox.innerHTML = data.svg;
    if (titleElem) titleElem.innerText = data.title;
    if (summaryElem) summaryElem.innerText = `Travel Time: ${data.time}`;

    if (instructionsList) {
      instructionsList.innerHTML = data.steps
        .map(step => `<li>${step}</li>`)
        .join('');
    }
  };

  selector.addEventListener("change", updateTransitRoute);
  
  // Initialize
  updateTransitRoute();
}
