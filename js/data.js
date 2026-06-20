// Wild Park Species & Caretaker Database
// 50 Species representing a full food web including Herbivores, Omnivores, Carnivores, Apex Predators, and Decomposers.

export const CARETAKERS = {
  1: { name: "Dr. Sarah Jenkins", role: "Senior Wildlife Veterinarian", badge: "VET-098", icon: "user-md" },
  2: { name: "Marcus Thorne", role: "Apex Carnivore Specialist", badge: "CAR-431", icon: "paw" },
  3: { name: "Elena Rostova", role: "Ungulate & Herbivore Lead", badge: "HER-219", icon: "leaf" },
  4: { name: "Kofi Anan", role: "Avian & Wetland Curator", badge: "AV-874", icon: "feather" },
  5: { name: "Dr. Kenji Sato", role: "Reptile & Invertebrate Biologist", badge: "REP-512", icon: "bug" },
  6: { name: "Maya Lin", role: "Marine Mammal Supervisor", badge: "MAR-307", icon: "droplet" }
};

export const BIOMES = {
  savannah: { name: "Savannah Grasslands", color: "#e2b85c", bg: "rgba(226, 184, 92, 0.1)" },
  forest: { name: "Northern Pine Forest", color: "#3d7e5a", bg: "rgba(61, 126, 90, 0.1)" },
  wetland: { name: "Reptile & Insect Wetland", color: "#2d6a4f", bg: "rgba(45, 106, 79, 0.1)" },
  cliffs: { name: "Aviary Mountain Cliffs", color: "#6c757d", bg: "rgba(108, 117, 125, 0.1)" },
  aquatic: { name: "Aquatic Estuary & Oceans", color: "#0077b6", bg: "rgba(0, 119, 182, 0.1)" }
};

export const ANIMAL_DATA = [
  // APEX PREDATORS (1-6)
  {
    id: 1,
    name: "African Lion",
    scientific: "Panthera leo",
    trophic: "Apex Predator",
    diet: "Carnivore",
    biome: "savannah",
    population: 3,
    foodNeeds: "7-10 kg of fresh red meat daily",
    caretakerId: 2,
    preyIds: [7, 8, 9, 10], // Zebra, Gazelle, Bison, Camel
    health: "Excellent",
    description: "The pride of the savannah, these lions regulate populations of large herbivores, keeping the grasslands healthy.",
    individuals: [
      { tag: "WP-001", name: "Simba", age: "6 years", sex: "Male", health: "Healthy & Active", weight: "190 kg" },
      { tag: "WP-002", name: "Nala", age: "5 years", sex: "Female", health: "Pregnant - Monitoring", weight: "140 kg" },
      { tag: "WP-003", name: "Mufasa", age: "8 years", sex: "Male", health: "Minor tooth treatment", weight: "210 kg" }
    ]
  },
  {
    id: 2,
    name: "Bengal Tiger",
    scientific: "Panthera tigris tigris",
    trophic: "Apex Predator",
    diet: "Carnivore",
    biome: "forest",
    population: 2,
    foodNeeds: "8 kg of fresh meat daily",
    caretakerId: 2,
    preyIds: [12, 13, 31], // Deer, Wild Boar, Beaver
    health: "Stable",
    description: "Solitary hunters of the deep forest, Bengal tigers rely on dense vegetation to stalk their prey.",
    individuals: [
      { tag: "WP-004", name: "Sheru", age: "4 years", sex: "Male", health: "Healthy & Vigilant", weight: "220 kg" },
      { tag: "WP-005", name: "Kira", age: "3 years", sex: "Female", health: "Healthy", weight: "160 kg" }
    ]
  },
  {
    id: 3,
    name: "Grizzly Bear",
    scientific: "Ursus arctos horribilis",
    trophic: "Apex Predator",
    diet: "Omnivore",
    biome: "forest",
    population: 2,
    foodNeeds: "15 kg of fish, berries, and roots daily",
    caretakerId: 3,
    preyIds: [12, 29, 31], // Deer, Sea Otter, Beaver
    health: "Excellent",
    description: "A dominant force in the northern woods. Bears act as seed dispersers and nutrient cyclers through fishing.",
    individuals: [
      { tag: "WP-006", name: "Baloo", age: "7 years", sex: "Male", health: "Preparing for dormancy cycles", weight: "320 kg" },
      { tag: "WP-007", name: "Ursa", age: "5 years", sex: "Female", health: "Healthy", weight: "240 kg" }
    ]
  },
  {
    id: 4,
    name: "Killer Whale (Orca)",
    scientific: "Orcinus orca",
    trophic: "Apex Predator",
    diet: "Carnivore",
    biome: "aquatic",
    population: 2,
    foodNeeds: "45 kg of salmon and fish daily",
    caretakerId: 6,
    preyIds: [30, 41], // Penguin, Leopard Seal
    health: "Excellent",
    description: "Apex predators of the oceans, displaying complex social structures and highly coordinated hunting tactics.",
    individuals: [
      { tag: "WP-008", name: "Keiko", age: "12 years", sex: "Male", health: "Excellent", weight: "4200 kg" },
      { tag: "WP-009", name: "Freya", age: "10 years", sex: "Female", health: "Highly Interactive", weight: "3500 kg" }
    ]
  },
  {
    id: 5,
    name: "Nile Crocodile",
    scientific: "Crocodylus niloticus",
    trophic: "Apex Predator",
    diet: "Carnivore",
    biome: "wetland",
    population: 3,
    foodNeeds: "5 kg of fish or meat every 3 days",
    caretakerId: 5,
    preyIds: [7, 8, 24, 27], // Zebra, Gazelle, Hippo, Capybara
    health: "Stable",
    description: "An ancient ambush predator, sitting at the intersection of land and aquatic ecosystems.",
    individuals: [
      { tag: "WP-010", name: "Sobek", age: "25 years", sex: "Male", health: "Healthy", weight: "450 kg" },
      { tag: "WP-011", name: "Lizzie", age: "18 years", sex: "Female", health: "Healthy", weight: "320 kg" },
      { tag: "WP-012", name: "Gator", age: "6 years", sex: "Male", health: "Small tail scrape, healing", weight: "120 kg" }
    ]
  },
  {
    id: 6,
    name: "Jaguar",
    scientific: "Panthera onca",
    trophic: "Apex Predator",
    diet: "Carnivore",
    biome: "forest",
    population: 2,
    foodNeeds: "5 kg of meat daily",
    caretakerId: 2,
    preyIds: [27, 43], // Capybara, Iguana
    health: "Stable",
    description: "Jaguars possess an exceptionally powerful bite that allows them to pierce the shells of armored prey.",
    individuals: [
      { tag: "WP-013", name: "Shadow", age: "5 years", sex: "Male", health: "Healthy", weight: "95 kg" },
      { tag: "WP-014", name: "Maya", age: "4 years", sex: "Female", health: "Active & Playful", weight: "75 kg" }
    ]
  },

  // TERTIARY CONSUMERS (7-13)
  {
    id: 7,
    name: "Gray Wolf",
    scientific: "Canis lupus",
    trophic: "Tertiary Consumer",
    diet: "Carnivore",
    biome: "forest",
    population: 4,
    foodNeeds: "3 kg of raw meat daily",
    caretakerId: 2,
    preyIds: [12, 14, 31], // Deer, Rabbit, Beaver
    health: "Excellent",
    description: "Pack hunters that keep deer and herbivore populations moving, preventing overgrazing of riverbanks.",
    individuals: [
      { tag: "WP-015", name: "Alpha", age: "5 years", sex: "Male", health: "Strong leadership behavior", weight: "42 kg" },
      { tag: "WP-016", name: "Luna", age: "4 years", sex: "Female", health: "Healthy", weight: "36 kg" },
      { tag: "WP-017", name: "Ghost", age: "3 years", sex: "Male", health: "Healthy", weight: "39 kg" },
      { tag: "WP-018", name: "Sita", age: "2 years", sex: "Female", health: "Healthy", weight: "32 kg" }
    ]
  },
  {
    id: 8,
    name: "Peregrine Falcon",
    scientific: "Falco peregrinus",
    trophic: "Tertiary Consumer",
    diet: "Carnivore",
    biome: "cliffs",
    population: 3,
    foodNeeds: "300g of insects and small rodents daily",
    caretakerId: 4,
    preyIds: [26, 35, 45], // Owl, Skunk, Songbird
    health: "Excellent",
    description: "The fastest animal on earth, stooping at speeds over 320 km/h to strike small avian prey.",
    individuals: [
      { tag: "WP-019", name: "Horus", age: "3 years", sex: "Male", health: "Excellent flight capabilities", weight: "0.8 kg" },
      { tag: "WP-020", name: "Aero", age: "2 years", sex: "Male", health: "Healthy", weight: "0.75 kg" },
      { tag: "WP-021", name: "Valkyrie", age: "4 years", sex: "Female", health: "Healthy", weight: "1.1 kg" }
    ]
  },
  {
    id: 9,
    name: "Bald Eagle",
    scientific: "Haliaeetus leucocephalus",
    trophic: "Tertiary Consumer",
    diet: "Carnivore",
    biome: "cliffs",
    population: 2,
    foodNeeds: "600g of fresh fish and small mammals daily",
    caretakerId: 4,
    preyIds: [28, 35], // Platypus, Skunk
    health: "Stable",
    description: "A majestic bird of prey that primarily scavenges and hunts fish near larger water bodies.",
    individuals: [
      { tag: "WP-022", name: "Freedom", age: "7 years", sex: "Male", health: "Healthy", weight: "4.2 kg" },
      { tag: "WP-023", name: "Glory", age: "6 years", sex: "Female", health: "Recovering from wing feather repair", weight: "5.1 kg" }
    ]
  },
  {
    id: 10,
    name: "King Cobra",
    scientific: "Ophiophagus hannah",
    trophic: "Tertiary Consumer",
    diet: "Carnivore",
    biome: "wetland",
    population: 2,
    foodNeeds: "1 rodent or small snake weekly",
    caretakerId: 5,
    preyIds: [25, 42], // Garter Snake, Chameleon
    health: "Stable",
    description: "The world's longest venomous snake, specialized in preying on other reptiles and snakes.",
    individuals: [
      { tag: "WP-024", name: "Naga", age: "5 years", sex: "Male", health: "Recently shed skin, healthy", weight: "6.2 kg" },
      { tag: "WP-025", name: "Basilisk", age: "4 years", sex: "Female", health: "Healthy", weight: "5.5 kg" }
    ]
  },
  {
    id: 11,
    name: "Cheetah",
    scientific: "Acinonyx jubatus",
    trophic: "Tertiary Consumer",
    diet: "Carnivore",
    biome: "savannah",
    population: 2,
    foodNeeds: "3.5 kg of meat daily",
    caretakerId: 2,
    preyIds: [15, 16], // Gazelle, Hare
    health: "Stable",
    description: "The ultimate sprinter, utilizing its flexible spine and semi-retractable claws to hunt swift herbivores.",
    individuals: [
      { tag: "WP-026", name: "Bolt", age: "4 years", sex: "Male", health: "Excellent athletic shape", weight: "52 kg" },
      { tag: "WP-027", name: "Swift", age: "3 years", sex: "Female", health: "Healthy", weight: "45 kg" }
    ]
  },
  {
    id: 12,
    name: "Leopard Seal",
    scientific: "Hydrurga leptonyx",
    trophic: "Tertiary Consumer",
    diet: "Carnivore",
    biome: "aquatic",
    population: 2,
    foodNeeds: "4 kg of fish and krill daily",
    caretakerId: 6,
    preyIds: [30], // Penguin
    health: "Excellent",
    description: "Fierce polar predators with serpentine bodies and powerful jaws specialized for catching penguins and fish.",
    individuals: [
      { tag: "WP-028", name: "Hunter", age: "6 years", sex: "Male", health: "Active", weight: "310 kg" },
      { tag: "WP-029", name: "Frost", age: "5 years", sex: "Female", health: "Healthy", weight: "270 kg" }
    ]
  },
  {
    id: 13,
    name: "Wolverine",
    scientific: "Gulo gulo",
    trophic: "Tertiary Consumer",
    diet: "Carnivore",
    biome: "forest",
    population: 2,
    foodNeeds: "1.5 kg of meat/carrion daily",
    caretakerId: 2,
    preyIds: [14, 34, 35], // Rabbit, Lemur, Skunk
    health: "Stable",
    description: "A small but incredibly fierce carnivore capable of taking down prey many times its size.",
    individuals: [
      { tag: "WP-030", name: "Logan", age: "4 years", sex: "Male", health: "Highly aggressive but healthy", weight: "15 kg" },
      { tag: "WP-031", name: "X-23", age: "2 years", sex: "Female", health: "Healthy", weight: "11 kg" }
    ]
  },

  // SECONDARY CONSUMERS / OMNIVORES & SMALL CARNIVORES (14-35)
  {
    id: 14,
    name: "Meerkat",
    scientific: "Suricata suricatta",
    trophic: "Secondary Consumer",
    diet: "Omnivore",
    biome: "savannah",
    population: 8,
    foodNeeds: "150g of mealworms, crickets, and root vegetables",
    caretakerId: 3,
    preyIds: [46, 47, 49], // Mantis, Butterfly, Earthworm
    health: "Excellent",
    description: "Highly social animals that live in cooperative mobs and keep guard against overhead predators.",
    individuals: [
      { tag: "WP-032", name: "Timon", age: "3 years", sex: "Male", health: "Extremely alert", weight: "0.78 kg" },
      { tag: "WP-033", name: "Pippa", age: "3 years", sex: "Female", health: "Healthy", weight: "0.72 kg" },
      { tag: "WP-034", name: "Billy", age: "1 year", sex: "Male", health: "Active", weight: "0.65 kg" }
    ]
  },
  {
    id: 15,
    name: "Red Fox",
    scientific: "Vulpes vulpes",
    trophic: "Secondary Consumer",
    diet: "Omnivore",
    biome: "forest",
    population: 3,
    foodNeeds: "600g of rodents and berries daily",
    caretakerId: 3,
    preyIds: [14, 33, 49], // Rabbit, Squirrel, Earthworm
    health: "Stable",
    description: "Adaptable and cunning, foxes thrive on a diverse diet of small rodents, insects, and fruits.",
    individuals: [
      { tag: "WP-035", name: "Todd", age: "3 years", sex: "Male", health: "Healthy", weight: "6.5 kg" },
      { tag: "WP-036", name: "Vixen", age: "2 years", sex: "Female", health: "Healthy", weight: "5.8 kg" },
      { tag: "WP-037", name: "Robin", age: "1 year", sex: "Male", health: "Healthy", weight: "4.9 kg" }
    ]
  },
  {
    id: 16,
    name: "Raccoon",
    scientific: "Procyon lotor",
    trophic: "Secondary Consumer",
    diet: "Omnivore",
    biome: "forest",
    population: 4,
    foodNeeds: "500g of fish, insects, and nuts daily",
    caretakerId: 3,
    preyIds: [23, 47, 49], // Frog, Butterfly, Earthworm
    health: "Stable",
    description: "Clever mammals with mask-like facial markings, known for using their sensitive paws to 'wash' food.",
    individuals: [
      { tag: "WP-038", name: "Bandit", age: "4 years", sex: "Male", health: "Slightly overweight, diet adjusted", weight: "8.2 kg" },
      { tag: "WP-039", name: "Rocket", age: "2 years", sex: "Male", health: "Healthy & Active", weight: "6.1 kg" }
    ]
  },
  {
    id: 17,
    name: "Striped Skunk",
    scientific: "Mephitis mephitis",
    trophic: "Secondary Consumer",
    diet: "Omnivore",
    biome: "forest",
    population: 2,
    foodNeeds: "200g of insects, small grubs, and leaves daily",
    caretakerId: 3,
    preyIds: [46, 49], // Mantis, Earthworm
    health: "Stable",
    description: "Defends itself using highly smelly spray, primarily consuming beetles, grubs, and vegetation.",
    individuals: [
      { tag: "WP-040", name: "Flower", age: "2 years", sex: "Female", health: "Healthy", weight: "2.5 kg" },
      { tag: "WP-041", name: "Pepé", age: "3 years", sex: "Male", health: "Healthy", weight: "2.8 kg" }
    ]
  },
  {
    id: 18,
    name: "Ring-tailed Lemur",
    scientific: "Lemur catta",
    trophic: "Secondary Consumer",
    diet: "Herbivore",
    biome: "forest",
    population: 5,
    foodNeeds: "300g of fruits, leaves, and sap daily",
    caretakerId: 3,
    preyIds: [], // Strictly herbivore but secondary level in some niches
    health: "Excellent",
    description: "Social primates with distinctive striped tails, spending time both in trees and on the forest floor.",
    individuals: [
      { tag: "WP-042", name: "King Julien", age: "5 years", sex: "Male", health: "Dominant, very active", weight: "2.4 kg" },
      { tag: "WP-043", name: "Maurice", age: "6 years", sex: "Male", health: "Stable", weight: "2.7 kg" },
      { tag: "WP-044", name: "Clover", age: "3 years", sex: "Female", health: "Healthy", weight: "2.1 kg" }
    ]
  },
  {
    id: 19,
    name: "Common Chimpanzee",
    scientific: "Pan troglodytes",
    trophic: "Secondary Consumer",
    diet: "Omnivore",
    biome: "forest",
    population: 4,
    foodNeeds: "2.5 kg of fruits, plants, and insects daily",
    caretakerId: 3,
    preyIds: [46, 48], // Mantis, Honeybee
    health: "Excellent",
    description: "Our closest living relatives, capable of tool use, problem-solving, and rich social interactions.",
    individuals: [
      { tag: "WP-045", name: "Caesar", age: "10 years", sex: "Male", health: "Highly intelligent, active", weight: "55 kg" },
      { tag: "WP-046", name: "Koko", age: "8 years", sex: "Female", health: "Healthy", weight: "42 kg" },
      { tag: "WP-047", name: "Cornelius", age: "12 years", sex: "Male", health: "Gingivitis treatment completed", weight: "58 kg" }
    ]
  },
  {
    id: 20,
    name: "Platypus",
    scientific: "Ornithorhynchus anatinus",
    trophic: "Secondary Consumer",
    diet: "Carnivore",
    biome: "aquatic",
    population: 3,
    foodNeeds: "200g of freshwater shrimp and insect larvae daily",
    caretakerId: 6,
    preyIds: [49], // Earthworm/invertebrates
    health: "Stable",
    description: "A semi-aquatic egg-laying mammal with a duck-like bill, beaver-like tail, and otter-like feet.",
    individuals: [
      { tag: "WP-048", name: "Perry", age: "4 years", sex: "Male", health: "Secretive but healthy", weight: "1.5 kg" },
      { tag: "WP-049", name: "Penny", age: "3 years", sex: "Female", health: "Healthy", weight: "1.2 kg" }
    ]
  },
  {
    id: 21,
    name: "Bullfrog",
    scientific: "Lithobates catesbeianus",
    trophic: "Secondary Consumer",
    diet: "Carnivore",
    biome: "wetland",
    population: 6,
    foodNeeds: "50g of worms and small insects daily",
    caretakerId: 5,
    preyIds: [46, 47, 49], // Mantis, Butterfly, Earthworm
    health: "Stable",
    description: "Aggressive sit-and-wait predator that will swallow almost anything it can fit in its mouth.",
    individuals: [
      { tag: "WP-050", name: "Jumpy", age: "2 years", sex: "Male", health: "Healthy", weight: "0.45 kg" },
      { tag: "WP-051", name: "Ribbit", age: "1 year", sex: "Female", health: "Healthy", weight: "0.38 kg" }
    ]
  },
  {
    id: 22,
    name: "Garter Snake",
    scientific: "Thamnophis sirtalis",
    trophic: "Secondary Consumer",
    diet: "Carnivore",
    biome: "wetland",
    population: 4,
    foodNeeds: "1 small frog or worm weekly",
    caretakerId: 5,
    preyIds: [21, 49], // Bullfrog, Earthworm
    health: "Stable",
    description: "Harmless to humans, these snakes play an important role in controlling garden pests and amphibians.",
    individuals: [
      { tag: "WP-052", name: "Slinky", age: "2 years", sex: "Male", health: "Healthy", weight: "0.15 kg" },
      { tag: "WP-053", name: "Noodle", age: "3 years", sex: "Female", health: "Healthy", weight: "0.22 kg" }
    ]
  },
  {
    id: 23,
    name: "Barn Owl",
    scientific: "Tyto alba",
    trophic: "Secondary Consumer",
    diet: "Carnivore",
    biome: "cliffs",
    population: 2,
    foodNeeds: "150g of mice and small rodents daily",
    caretakerId: 4,
    preyIds: [33, 35], // Squirrel, Skunk/Mice
    health: "Excellent",
    description: "Silent night hunters equipped with heart-shaped facial discs that funnel sound to their ears.",
    individuals: [
      { tag: "WP-054", name: "Hedwig", age: "4 years", sex: "Female", health: "Excellent vision & hearing", weight: "0.55 kg" },
      { tag: "WP-055", name: "Errol", age: "7 years", sex: "Male", health: "Healthy but elderly", weight: "0.48 kg" }
    ]
  },
  {
    id: 24,
    name: "Hedgehog",
    scientific: "Erinaceus europaeus",
    trophic: "Secondary Consumer",
    diet: "Omnivore",
    biome: "forest",
    population: 3,
    foodNeeds: "80g of beetles, worms, and roots daily",
    caretakerId: 3,
    preyIds: [46, 49], // Mantis, Earthworm
    health: "Stable",
    description: "Spiny mammals that roll into a tight ball when threatened, consuming insects and grubs.",
    individuals: [
      { tag: "WP-056", name: "Sonic", age: "2 years", sex: "Male", health: "Healthy", weight: "0.62 kg" },
      { tag: "WP-057", name: "Spike", age: "3 years", sex: "Male", health: "Healthy", weight: "0.71 kg" }
    ]
  },
  {
    id: 25,
    name: "Wild Boar",
    scientific: "Sus scrofa",
    trophic: "Secondary Consumer",
    diet: "Omnivore",
    biome: "forest",
    population: 3,
    foodNeeds: "2 kg of roots, acorns, and earthworms daily",
    caretakerId: 3,
    preyIds: [49], // Earthworm
    health: "Stable",
    description: "Strong, tusked omnivores that root through the forest floor, aerating soil and dispersing seeds.",
    individuals: [
      { tag: "WP-058", name: "Pumbaa", age: "5 years", sex: "Male", health: "Healthy & Stout", weight: "120 kg" },
      { tag: "WP-059", name: "Grumble", age: "4 years", sex: "Female", health: "Healthy", weight: "90 kg" }
    ]
  },
  {
    id: 26,
    name: "Sea Otter",
    scientific: "Enhydra lutris",
    trophic: "Secondary Consumer",
    diet: "Carnivore",
    biome: "aquatic",
    population: 3,
    foodNeeds: "2.5 kg of sea urchins, crabs, and clams daily",
    caretakerId: 6,
    preyIds: [], // Urchins not in list
    health: "Excellent",
    description: "A keystone species that protects kelp forests by feeding on herbivorous sea urchins.",
    individuals: [
      { tag: "WP-060", name: "Ollie", age: "4 years", sex: "Male", health: "Energetic and social", weight: "28 kg" },
      { tag: "WP-061", name: "Pip", age: "2 years", sex: "Female", health: "Healthy", weight: "22 kg" }
    ]
  },
  {
    id: 27,
    name: "Emperor Penguin",
    scientific: "Aptenodytes forsteri",
    trophic: "Secondary Consumer",
    diet: "Carnivore",
    biome: "aquatic",
    population: 6,
    foodNeeds: "1 kg of small fish and krill daily",
    caretakerId: 6,
    preyIds: [], // Fish/Krill not explicitly in list
    health: "Excellent",
    description: "Stately birds built for extreme cold, diving to incredible depths to catch fish and squid.",
    individuals: [
      { tag: "WP-062", name: "Mumble", age: "3 years", sex: "Male", health: "Healthy, active swimmer", weight: "32 kg" },
      { tag: "WP-063", name: "Gloria", age: "3 years", sex: "Female", health: "Healthy", weight: "28 kg" }
    ]
  },
  {
    id: 28,
    name: "Praying Mantis",
    scientific: "Tenodera sinensis",
    trophic: "Secondary Consumer",
    diet: "Carnivore",
    biome: "wetland",
    population: 15,
    foodNeeds: "2 small flies or moths daily",
    caretakerId: 5,
    preyIds: [47, 48], // Butterfly, Honeybee
    health: "Stable",
    description: "Highly stealthy predatory insect with raptorial forelegs designed to ambush flying bugs.",
    individuals: [
      { tag: "WP-064", name: "Mantis #1", age: "6 months", sex: "Female", health: "Healthy", weight: "12 g" },
      { tag: "WP-065", name: "Mantis #2", age: "4 months", sex: "Male", health: "Healthy", weight: "8 g" }
    ]
  },
  {
    id: 29,
    name: "Chameleon",
    scientific: "Chamaeleo calyptratus",
    trophic: "Secondary Consumer",
    diet: "Insectivore",
    biome: "wetland",
    population: 4,
    foodNeeds: "5 crickets daily",
    caretakerId: 5,
    preyIds: [28, 47, 48], // Mantis, Butterfly, Honeybee
    health: "Stable",
    description: "Fascinating reptiles featuring color-changing skin, independently moving eyes, and long projectile tongues.",
    individuals: [
      { tag: "WP-066", name: "Pascal", age: "2 years", sex: "Male", health: "Vibrant coloration", weight: "180 g" },
      { tag: "WP-067", name: "Karma", age: "1 year", sex: "Female", health: "Healthy", weight: "140 g" }
    ]
  },
  {
    id: 30,
    name: "Squirrel",
    scientific: "Sciurus vulgaris",
    trophic: "Secondary Consumer",
    diet: "Herbivore",
    biome: "forest",
    population: 12,
    foodNeeds: "50g of acorns, pine cones, and hazelnuts daily",
    caretakerId: 3,
    preyIds: [],
    health: "Excellent",
    description: "Acrobatic rodents that scatter-hoard nuts, inadvertently planting thousands of new trees each year.",
    individuals: [
      { tag: "WP-068", name: "Nutty", age: "2 years", sex: "Male", health: "Healthy", weight: "320 g" },
      { tag: "WP-069", name: "Scrat", age: "3 years", sex: "Male", health: "Obsessive nut-hiding, healthy", weight: "350 g" }
    ]
  },
  {
    id: 31,
    name: "Tarantula",
    scientific: "Grammostola pulchra",
    trophic: "Secondary Consumer",
    diet: "Carnivore",
    biome: "wetland",
    population: 5,
    foodNeeds: "1 cricket or roach weekly",
    caretakerId: 5,
    preyIds: [46, 48], // Mantis, Honeybee
    health: "Stable",
    description: "Large, slow-moving spiders that wait inside burrows to ambush crawling insects.",
    individuals: [
      { tag: "WP-070", name: "Rosie", age: "4 years", sex: "Female", health: "Healthy", weight: "45 g" },
      { tag: "WP-071", name: "Fuzzy", age: "3 years", sex: "Male", health: "Healthy", weight: "32 g" }
    ]
  },
  {
    id: 32,
    name: "Fruit Bat",
    scientific: "Pteropus vampyrus",
    trophic: "Secondary Consumer",
    diet: "Herbivore",
    biome: "forest",
    population: 10,
    foodNeeds: "200g of bananas, figs, and nectar daily",
    caretakerId: 4,
    preyIds: [],
    health: "Stable",
    description: "Crucial nocturnal pollinators and seed dispersers, flying over forest canopies in search of fruiting trees.",
    individuals: [
      { tag: "WP-072", name: "Dracula", age: "3 years", sex: "Male", health: "Healthy", weight: "0.95 kg" },
      { tag: "WP-073", name: "Stellaluna", age: "2 years", sex: "Female", health: "Healthy", weight: "0.82 kg" }
    ]
  },
  {
    id: 33,
    name: "Woodpecker",
    scientific: "Dryocopus martius",
    trophic: "Secondary Consumer",
    diet: "Insectivore",
    biome: "forest",
    population: 5,
    foodNeeds: "100g of tree grubs and beetles daily",
    caretakerId: 4,
    preyIds: [46, 48], // Mantis, Honeybee
    health: "Excellent",
    description: "Chisels holes in tree bark with its strong beak to extract boring wood insect larvae.",
    individuals: [
      { tag: "WP-074", name: "Woody", age: "2 years", sex: "Male", health: "Healthy", weight: "310 g" },
      { tag: "WP-075", name: "Knocky", age: "3 years", sex: "Female", health: "Healthy", weight: "290 g" }
    ]
  },
  {
    id: 34,
    name: "Spotted Salamander",
    scientific: "Ambystoma maculatum",
    trophic: "Secondary Consumer",
    diet: "Carnivore",
    biome: "wetland",
    population: 8,
    foodNeeds: "10g of worms and small slugs daily",
    caretakerId: 5,
    preyIds: [49], // Earthworm
    health: "Stable",
    description: "Nocturnal amphibians that spend most of their time in damp leaf litter and underground burrows.",
    individuals: [
      { tag: "WP-076", name: "Spotty", age: "2 years", sex: "Male", health: "Healthy", weight: "15 g" }
    ]
  },
  {
    id: 35,
    name: "Songbird (Sparrow)",
    scientific: "Passer domesticus",
    trophic: "Secondary Consumer",
    diet: "Omnivore",
    biome: "cliffs",
    population: 20,
    foodNeeds: "30g of seeds and small caterpillars daily",
    caretakerId: 4,
    preyIds: [48, 49], // Honeybee, Earthworm
    health: "Excellent",
    description: "Small, vocal birds that consume high quantities of plant seeds and small caterpillars.",
    individuals: [
      { tag: "WP-077", name: "Pip", age: "1 year", sex: "Male", health: "Healthy", weight: "28 g" },
      { tag: "WP-078", name: "Chirp", age: "2 years", sex: "Female", health: "Healthy", weight: "32 g" }
    ]
  },

  // PRIMARY CONSUMERS / HERBIVORES (36-49)
  {
    id: 36,
    name: "African Elephant",
    scientific: "Loxodonta africana",
    trophic: "Primary Consumer",
    diet: "Herbivore",
    biome: "savannah",
    population: 3,
    foodNeeds: "150 kg of grass, bark, and leaves daily",
    caretakerId: 3,
    preyIds: [],
    health: "Excellent",
    description: "Ecosystem engineers that clear brush, dig waterholes, and create paths utilized by other wildlife.",
    individuals: [
      { tag: "WP-079", name: "Tembo", age: "18 years", sex: "Male", health: "Healthy & Leader", weight: "5200 kg" },
      { tag: "WP-080", name: "Rafiki", age: "15 years", sex: "Female", health: "Healthy", weight: "3800 kg" },
      { tag: "WP-081", name: "Toto", age: "2 years", sex: "Male", health: "Calf - Healthy & Playful", weight: "450 kg" }
    ]
  },
  {
    id: 37,
    name: "Plains Zebra",
    scientific: "Equus quagga",
    trophic: "Primary Consumer",
    diet: "Herbivore",
    biome: "savannah",
    population: 6,
    foodNeeds: "12 kg of coarse grass daily",
    caretakerId: 3,
    preyIds: [],
    health: "Stable",
    description: "Highly resilient grazers that consume lower-quality fibrous grasses, paving the way for selective feeders.",
    individuals: [
      { tag: "WP-082", name: "Marty", age: "5 years", sex: "Male", health: "Healthy", weight: "310 kg" },
      { tag: "WP-083", name: "Ziggy", age: "4 years", sex: "Female", health: "Healthy", weight: "280 kg" }
    ]
  },
  {
    id: 38,
    name: "Red Kangaroo",
    scientific: "Osphranter rufus",
    trophic: "Primary Consumer",
    diet: "Herbivore",
    biome: "savannah",
    population: 4,
    foodNeeds: "2.5 kg of green shoots and grasses daily",
    caretakerId: 3,
    preyIds: [],
    health: "Excellent",
    description: "The largest hopping mammal, highly adapted to arid grasslands with water-conserving kidneys.",
    individuals: [
      { tag: "WP-084", name: "Boomer", age: "5 years", sex: "Male", health: "Healthy & Strong", weight: "85 kg" },
      { tag: "WP-085", name: "Matilda", age: "4 years", sex: "Female", health: "Healthy, carrying joey", weight: "42 kg" }
    ]
  },
  {
    id: 39,
    name: "Grant's Gazelle",
    scientific: "Nanger granti",
    trophic: "Primary Consumer",
    diet: "Herbivore",
    biome: "savannah",
    population: 8,
    foodNeeds: "2 kg of tender leaves and shoots daily",
    caretakerId: 3,
    preyIds: [],
    health: "Stable",
    description: "Fast-running grazers that can obtain all required moisture from plants, avoiding water holes.",
    individuals: [
      { tag: "WP-086", name: "Gigi", age: "3 years", sex: "Female", health: "Healthy", weight: "48 kg" },
      { tag: "WP-087", name: "Swifty", age: "2 years", sex: "Male", health: "Minor hoof cut, treated", weight: "52 kg" }
    ]
  },
  {
    id: 40,
    name: "Koala",
    scientific: "Phascolarctos cinereus",
    trophic: "Primary Consumer",
    diet: "Herbivore",
    biome: "forest",
    population: 3,
    foodNeeds: "500g of fresh eucalyptus leaves daily",
    caretakerId: 3,
    preyIds: [],
    health: "Stable",
    description: "Tree-dwelling marsupials specialized in digesting fibrous, toxic eucalyptus leaves, sleeping 20 hours a day.",
    individuals: [
      { tag: "WP-088", name: "Buster", age: "4 years", sex: "Male", health: "Healthy", weight: "9.5 kg" },
      { tag: "WP-089", name: "Coco", age: "3 years", sex: "Female", health: "Healthy", weight: "7.8 kg" }
    ]
  },
  {
    id: 41,
    name: "Giant Panda",
    scientific: "Ailuropoda melanoleuca",
    trophic: "Primary Consumer",
    diet: "Herbivore",
    biome: "forest",
    population: 2,
    foodNeeds: "12 kg of fresh bamboo shoots daily",
    caretakerId: 3,
    preyIds: [],
    health: "Excellent",
    description: "Beloved bamboo specialist, possessing a unique thumb-like bone to grasp bamboo stalks.",
    individuals: [
      { tag: "WP-090", name: "Po", age: "6 years", sex: "Male", health: "Excellent, very active", weight: "115 kg" },
      { tag: "WP-091", name: "Mei Mei", age: "5 years", sex: "Female", health: "Healthy", weight: "98 kg" }
    ]
  },
  {
    id: 42,
    name: "Capybara",
    scientific: "Hydrochoerus hydrochaeris",
    trophic: "Primary Consumer",
    diet: "Herbivore",
    biome: "wetland",
    population: 5,
    foodNeeds: "3 kg of aquatic grasses and bark daily",
    caretakerId: 3,
    preyIds: [],
    health: "Excellent",
    description: "The world's largest rodent, highly social and semi-aquatic, with webbed toes for swimming.",
    individuals: [
      { tag: "WP-092", name: "Cappy", age: "3 years", sex: "Male", health: "Healthy", weight: "55 kg" },
      { tag: "WP-093", name: "Gort", age: "2 years", sex: "Male", health: "Healthy", weight: "48 kg" }
    ]
  },
  {
    id: 43,
    name: "Hippopotamus",
    scientific: "Hippopotamus amphibius",
    trophic: "Primary Consumer",
    diet: "Herbivore",
    biome: "wetland",
    population: 2,
    foodNeeds: "35 kg of short grasses nightly",
    caretakerId: 3,
    preyIds: [],
    health: "Stable",
    description: "Massive semi-aquatic mammals that spend hot days submerged in water and nights grazing on land.",
    individuals: [
      { tag: "WP-094", name: "Gloria", age: "10 years", sex: "Female", health: "Healthy", weight: "1400 kg" },
      { tag: "WP-095", name: "Moto", age: "8 years", sex: "Male", health: "Excellent, territorial", weight: "1650 kg" }
    ]
  },
  {
    id: 44,
    name: "Reticulated Giraffe",
    scientific: "Giraffa camelopardalis reticulata",
    trophic: "Primary Consumer",
    diet: "Herbivore",
    biome: "savannah",
    population: 3,
    foodNeeds: "30 kg of acacia leaves daily",
    caretakerId: 3,
    preyIds: [],
    health: "Excellent",
    description: "The tallest terrestrial animals, browsing treetops and feeding primarily on thorny acacia trees.",
    individuals: [
      { tag: "WP-096", name: "Melman", age: "8 years", sex: "Male", health: "Healthy", weight: "1200 kg" },
      { tag: "WP-097", name: "Zara", age: "6 years", sex: "Female", health: "Healthy", weight: "850 kg" }
    ]
  },
  {
    id: 45,
    name: "Moose",
    scientific: "Alces alces",
    trophic: "Primary Consumer",
    diet: "Herbivore",
    biome: "forest",
    population: 2,
    foodNeeds: "20 kg of willow twigs and aquatic plants daily",
    caretakerId: 3,
    preyIds: [],
    health: "Stable",
    description: "The largest species of deer, utilizing broad hooves to walk over boggy land and snow to eat brush.",
    individuals: [
      { tag: "WP-098", name: "Bullwinkle", age: "6 years", sex: "Male", health: "Healthy", weight: "510 kg" }
    ]
  },
  {
    id: 46,
    name: "European Rabbit",
    scientific: "Oryctolagus cuniculus",
    trophic: "Primary Consumer",
    diet: "Herbivore",
    biome: "savannah",
    population: 15,
    foodNeeds: "150g of grass and leafy weeds daily",
    caretakerId: 3,
    preyIds: [],
    health: "Excellent",
    description: "Rapidly breeding herbivores that live in extensive warrens and prune herbaceous foliage.",
    individuals: [
      { tag: "WP-099", name: "Peter", age: "2 years", sex: "Male", health: "Healthy", weight: "1.8 kg" },
      { tag: "WP-100", name: "Cottontail", age: "1 year", sex: "Female", health: "Healthy", weight: "1.5 kg" }
    ]
  },
  {
    id: 47,
    name: "Black Rhinoceros",
    scientific: "Diceros bicornis",
    trophic: "Primary Consumer",
    diet: "Herbivore",
    biome: "savannah",
    population: 2,
    foodNeeds: "25 kg of woody twigs and leaves daily",
    caretakerId: 3,
    preyIds: [],
    health: "Excellent",
    description: "Critically endangered browser with a prehensile upper lip designed to select twigs and branches.",
    individuals: [
      { tag: "WP-101", name: "Toby", age: "9 years", sex: "Male", health: "Excellent health, skin checked", weight: "1100 kg" },
      { tag: "WP-102", name: "Rani", age: "7 years", sex: "Female", health: "Healthy", weight: "950 kg" }
    ]
  },
  {
    id: 48,
    name: "Green Iguana",
    scientific: "Iguana iguana",
    trophic: "Primary Consumer",
    diet: "Herbivore",
    biome: "wetland",
    population: 5,
    foodNeeds: "150g of mixed greens and flowers daily",
    caretakerId: 5,
    preyIds: [],
    health: "Stable",
    description: "Large tree-dwelling lizards that consume leaves, flowers, and fruits in tropical forest canopies.",
    individuals: [
      { tag: "WP-103", name: "Iggy", age: "4 years", sex: "Male", health: "Healthy", weight: "4.2 kg" }
    ]
  },
  {
    id: 49,
    name: "Galapagos Tortoise",
    scientific: "Chelonoidis niger",
    trophic: "Primary Consumer",
    diet: "Herbivore",
    biome: "wetland",
    population: 3,
    foodNeeds: "1.5 kg of cactus pads and grass daily",
    caretakerId: 5,
    preyIds: [],
    health: "Excellent",
    description: "Long-lived tortoises that graze slowly, shaping the island vegetation and living up to 150+ years.",
    individuals: [
      { tag: "WP-104", name: "Harriet", age: "110 years", sex: "Female", health: "Excellent, very slow metabolism", weight: "220 kg" },
      { tag: "WP-105", name: "Lonesome George Jr.", age: "45 years", sex: "Male", health: "Healthy", weight: "185 kg" }
    ]
  },

  // DECOMPOSERS / DETRITIVORES (50)
  {
    id: 50,
    name: "Earthworm",
    scientific: "Lumbricus terrestris",
    trophic: "Decomposer",
    diet: "Detritivore",
    biome: "wetland",
    population: 100, // Represented as colony/bulk
    foodNeeds: "Decaying organic matter and leaf litter",
    caretakerId: 5,
    preyIds: [],
    health: "Excellent",
    description: "Nature's soil builders, recycling dead leaves and organic matter into nutrient-rich soil castings.",
    individuals: [
      { tag: "WP-106", name: "Colony Alpha", age: "N/A", sex: "Hermaphrodite", health: "Thriving in soil beds", weight: "0.5 kg total" }
    ]
  }
];
