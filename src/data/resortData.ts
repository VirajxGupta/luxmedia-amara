export interface Suite {
  id: string;
  name: string;
  subtitle: string;
  size: string;
  view: string;
  description: string;
  fullDetails: string;
  features: string[];
  image: string;
  priceTag: string;
}

export interface Experience {
  id: string;
  title: string;
  category: string;
  description: string;
  quote: string;
  details: string[];
  image: string;
}

export const RESORT_DATA = {
  name: "AMARA",
  location: "Amalfi Coast, Italy",
  address: "Via Panoramica 42, 84011 Amalfi SA, Italy",
  coordinates: "40.6340° N, 14.6027° E",
  contact: {
    phone: "+39 089 932 8040",
    email: "sanctuary@amara-resort.it",
    concierge: "concierge@amara-resort.it",
  },
  tagline: "Twenty-two suites suspended between stone and sea.",
  heroVideoPoster: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2400&q=85", // Amalfi cliffside aerial view
  setting: {
    title: "Carved into the sheer limestone of Ravello",
    subtitle: "A sanctuary where time decelerates",
    paragraphs: [
      "Amara is not built upon the land — it is an organic continuation of the cliff face, hand-chiseled from warm travertine stone over three generations.",
      "Positioned 300 meters above the Tyrrhenian Sea, every terrace captures the unhurried arc of the Mediterranean sun, from golden morning light filtering through private lemon groves to deep twilight dusk over the horizon."
    ],
    highlights: [
      { title: "22 Private Havens", desc: "No two suites share a footprint, each oriented toward open water." },
      { title: "Travertine & Terracotta", desc: "Crafted by master stonemasons using ancient Amalfi building traditions." },
      { title: "Direct Cove Access", desc: "A private stone elevator carved inside the cliff leading down to private sea decks." },
    ],
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2000&q=85", // Amalfi coast stone cliff village
  },
  suites: [
    {
      id: "terrazza-suite",
      name: "La Terrazza Cliffside Suite",
      subtitle: "Open Horizon • Private Plunge Pool",
      size: "120 m² / 1,290 sq ft",
      view: "Unobstructed 180° Tyrrhenian Sea View",
      description: "Suspended directly above the coastal waves, featuring a seamless indoor-outdoor terrace and heated travertine plunge pool.",
      fullDetails: "La Terrazza represents the pinnacle of cliffside sanctuary. Crafted with hand-honed travertine floors, hand-loomed linen drapes, and dual sea-facing terraces. Includes a private infinity plunge pool carved into the limestone bedrock.",
      features: [
        "Private heated limestone infinity pool",
        "Deep soaking stone bathtub overlooking the coastline",
        "Hand-loomed organic linens & custom fragrance bar",
        "Dedicated 24-hour private butler service",
        "Direct elevator access to private cove deck"
      ],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85", // Luxury sea view suite pool terrace
      priceTag: "From €2,400 / night"
    },
    {
      id: "villa-sunlit",
      name: "Villa Sunlit Sanctuary",
      subtitle: "Private Citrus Garden • Outdoor Bath",
      size: "180 m² / 1,930 sq ft",
      view: "Private Lemon Grove & Horizon Sea View",
      description: "Tucked inside an ancient terraced lemon orchard with open-air stone rain showers and sun-dappled dining bowers.",
      fullDetails: "Enclosed by century-old terraced citrus trees, this villa offers total seclusion. The open-plan salon flows onto a secluded terrace surrounded by fragrant white blossoms and sea breezes.",
      features: [
        "Private terraced lemon bower & dining lounge",
        "Sunlit outdoor rain shower & hot plunge tub",
        "Fireplace chiseled from local travertine stone",
        "Bespoke wine cellar curated with Amalfi vintages",
        "In-villa spa treatment room"
      ],
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85", // Resort bedroom luxury
      priceTag: "From €3,100 / night"
    },
    {
      id: "amalfi-horizon",
      name: "Amalfi Horizon Suite",
      subtitle: "Dual Balconies • Ceramic Artistry",
      size: "95 m² / 1,020 sq ft",
      view: "Direct Coastline & Horizon",
      description: "Refined quiet luxury adorned with hand-painted Vietri ceramics, vaulted ceilings, and dual sea-view balconies.",
      fullDetails: "Designed for quiet contemplation, the Horizon Suite features traditional vaulted ceilings that naturally amplify light and sea whispers. Handcrafted ceramic tiles reflect the deep Mediterranean palette.",
      features: [
        "Dual private wrought-iron balconies",
        "Custom artisan ceramic tilework & warm stone finishes",
        "Acoustically tuned ocean sound ambiance",
        "King bed with Italian silk & linen bedding",
        "Walk-in stone shower & Aesop amenities"
      ],
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85", // High-end hotel room
      priceTag: "From €1,850 / night"
    },
    {
      id: "cliffside-cavern",
      name: "Cliffside Cavern Spa Suite",
      subtitle: "Indoor Thermal Pool • Direct Sea Lift",
      size: "150 m² / 1,610 sq ft",
      view: "Cliff Cave & Panoramic Sea Panorama",
      description: "Carved directly into the interior mountain bedrock with a private indoor thermal pool and steam sanctuary.",
      fullDetails: "A masterpiece of subterranean architecture. Natural stone walls frame a private heated saltwater thermal pool fed by sea minerals, offering the ultimate private wellness retreat.",
      features: [
        "In-suite natural stone thermal saltwater pool",
        "Private marble eucalyptus steam room",
        "Panoramic glass facade suspended over the waves",
        "Private champagne & fruit bar refreshed daily",
        "Private sea landing boat access"
      ],
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85", // Cliffside pool view
      priceTag: "From €3,800 / night"
    }
  ] as Suite[],
  experiences: [
    {
      id: "dining",
      title: "Ristorante Terrazza",
      category: "GASTRONOMY",
      description: "Dining 300 meters above the sea. Wild Mediterranean herbs, freshly harvested lemons, and line-caught sea bream cooked over open olive wood coals.",
      quote: "Food is served slowly, paired with organic natural wines from terraced vineyards carved into volcanic soil.",
      details: ["Seasonal tasting menu by Chef Matteo Rinaldi", "Tables set under wild vine pergolas", "Sunset candlelit cliffside seating"],
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85"
    },
    {
      id: "spa",
      title: "Limestone Thermal Baths & Spa",
      category: "WELLNESS",
      description: "Natural saltwater pools heated by volcanic geothermal earth, infused with local rosemary and wild citrus oils.",
      quote: "Listen to the distant rhythm of breaking waves while immersed in mineral-rich waters.",
      details: ["Thermal cold & hot cliffside plunge pools", "Deep massage with cold-pressed olive & lemon oil", "Mindful sunset sea meditation"],
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85"
    },
    {
      id: "boating",
      title: "Riva Charter & Private Cove",
      category: "EXPLORATION",
      description: "Board our classic mahogany Riva boat from the resort's private cliffside cove for unhurried day trips to Capri and emerald sea grottoes.",
      quote: "Glide along secret coves unreachable by land, accompanied by our private skipper.",
      details: ["Bespoke coastal itineraries", "Sunset champagne cruises", "Snorkeling in crystalline grottoes"],
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85"
    }
  ] as Experience[]
};
