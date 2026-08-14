import brand1 from "../assets/images/Brands/1.png";
import brand2 from "../assets/images/Brands/2.png";
import brand3 from "../assets/images/Brands/3.png";
import brand4 from "../assets/images/Brands/4.png";
import brand5 from "../assets/images/Brands/5.png";
import brand6 from "../assets/images/Brands/6.jpg";
import brand7 from "../assets/images/Brands/7.png";
import broadwayLogo from "../assets/images/logo/broadway.png";

import insta1 from "../assets/images/Insta/1.jpg";
import insta2 from "../assets/images/Insta/2.jpg";
import insta3 from "../assets/images/Insta/3.jpg";
import insta4 from "../assets/images/Insta/4.jpg";
import insta5 from "../assets/images/Insta/5.jpg";
import insta6 from "../assets/images/Insta/6.jpg";
import insta7 from "../assets/images/Insta/7.jpg";
import insta8 from "../assets/images/Insta/8.jpg";
import insta9 from "../assets/images/Insta/9.jpg";
import insta10 from "../assets/images/Insta/10.jpg";

import video1 from "../assets/videos/achievement/1.mp4";

export const BRANDS = [
  {
    id: "01",
    slug: "broadway-cinemas",
    title: "Broadway Cinemas",
    headline: "Transforming the multiplex entertainment landscape.",
    category: "Branding / Multiplex / Motion",
    logo: broadwayLogo,
    src: brand1,
    color: "#BBACAF",
    description:
      "Broadway Cinemas, Coimbatore is a premium multiplex featuring South India's first IMAX with Laser and Tamil Nadu's first EPIQ for an unmatched big-screen experience. HyperX and Vivid deliver enhanced visuals, vibrant colors, and immersive Dolby Atmos sound.",
    details:
      "The creative direction focused on building immersive brand identity, collectible IMAX cards, digital menu boards, motion graphics, and large-format LED displays for movie premieres.",
    deliverables: [
      "Social media contents",
      "IMAX Collectible cards",
      "Prints works",
      "Menu design",
      "LED wall designs",
    ],
    media: [
      { id: 1, type: "image", src: brand1, title: "IMAX Laser Visual Identity", tag: "Brand Identity" },
      { id: 2, type: "video", src: video1, title: "IMAX Experience Trailer", tag: "Motion Ad" },
      { id: 3, type: "image", src: insta1, title: "Collectible Ticket Series", tag: "Print Work" },
      { id: 4, type: "image", src: insta2, title: "Premiere Night Digital Banner", tag: "Digital Poster" },
      { id: 5, type: "image", src: insta3, title: "Dolby Atmos Visualizer", tag: "Social Media" },
      { id: 6, type: "image", src: insta4, title: "Concession Menu Board", tag: "Menu Design" },
    ],
  },
  {
    id: "02",
    slug: "aarthi-grand-cineplex",
    title: "Aarthi Grand Cineplex (AGC)",
    headline: "Creating a visual language for a cinematic experience.",
    category: "Branding / Social Media / Motion",
    logo: broadwayLogo,
    src: brand2,
    color: "#977F6D",
    description:
      "Aarthi Grand Cineplex (AGC) is a premium multiplex in Dindigul, offering 4K Barco Laser projection, Dolby Atmos sound, modern interiors, and comfortable seating for a high-quality movie experience.",
    details:
      "The creative direction focused on building engaging visual communication for digital platforms, social media campaigns, and vibrant LED display boards across the multiplex.",
    deliverables: [
      "Social media contents",
      "LED wall designs",
      "Poster & Key Visuals",
      "Video Production",
    ],
    media: [
      { id: 1, type: "image", src: brand2, title: "Brand Identity & Key Visuals", tag: "Brand Identity" },
      { id: 2, type: "video", src: video1, title: "Cinematic Trailer & LED Wall Ad", tag: "Motion Video" },
      { id: 3, type: "image", src: insta5, title: "Social Media Campaign 01", tag: "Social Media" },
      { id: 4, type: "image", src: insta6, title: "Premiere Experience Visuals", tag: "Promotion" },
      { id: 5, type: "image", src: insta7, title: "Dolby Atmos Acoustic Campaign", tag: "Audio-Visual" },
      { id: 6, type: "image", src: insta8, title: "Digital Display & Kiosk Design", tag: "Display Graphics" },
    ],
  },
  {
    id: "03",
    slug: "thats-y-food",
    title: "That's Y Food, OTG & Café Totaram",
    headline: "Crafting appetizing aesthetics for culinary excellence.",
    category: "Hospitality / Culinary / Social Media",
    logo: broadwayLogo,
    src: brand3,
    color: "#C24914",
    description:
      "That's Y Food — A premium multi-cuisine restaurant known for global flavors and fine dining. On the Go (OTG) — A casual café and restaurant serving quick meals, beverages, and comfort food. Café Totaram — A cozy café at Race Course, Coimbatore.",
    details:
      "Produced mouth-watering visual campaigns, food photography directions, short promo videos, artisanal menu placards, and seasonal festival collaterals.",
    deliverables: [
      "Social media contents",
      "Video shoot",
      "Placards & Menu Cards",
      "Promotional Campaigns",
    ],
    media: [
      { id: 1, type: "image", src: brand3, title: "Signature Dish Feature", tag: "Food Photography" },
      { id: 2, type: "video", src: video1, title: "Chef's Special Reel", tag: "Food Reel" },
      { id: 3, type: "image", src: insta9, title: "Artisan Coffee Campaign", tag: "Beverage Visual" },
      { id: 4, type: "image", src: insta10, title: "Weekend Brunch Menu Placard", tag: "Print Menu" },
      { id: 5, type: "image", src: insta1, title: "Festive Dining Showcase", tag: "Social Creative" },
      { id: 6, type: "image", src: insta2, title: "Dessert Special Graphics", tag: "Promotion" },
    ],
  },
  {
    id: "04",
    slug: "the-crimson",
    title: "The Crimson Restobar",
    headline: "Electrifying nightlife and cocktail visual storytelling.",
    category: "Restobar / Nightlife / Branding",
    logo: broadwayLogo,
    src: brand4,
    color: "#B6244F",
    description:
      "The Crimson is a premium restobar in Broadway Square, Coimbatore, known for its stylish ambience, handcrafted cocktails, multi-cuisine menu, and vibrant dining experience.",
    details:
      "Developed high-energy visual assets, neon-infused social media creative, cocktail lookbooks, and DJ night promotional posters.",
    deliverables: [
      "Social media contents",
      "Cocktail Menu Cards",
      "Nightlife Posters",
      "Digital Ads",
    ],
    media: [
      { id: 1, type: "image", src: brand4, title: "Neon Nights Identity", tag: "Brand Visual" },
      { id: 2, type: "video", src: video1, title: "Weekend DJ Promo Reel", tag: "Motion Video" },
      { id: 3, type: "image", src: insta3, title: "Mixology Spotlight", tag: "Cocktail Series" },
      { id: 4, type: "image", src: insta4, title: "Live Music Night Poster", tag: "Event Poster" },
      { id: 5, type: "image", src: insta5, title: "Gourmet Bites Creative", tag: "Social Post" },
      { id: 6, type: "image", src: insta6, title: "VIP Lounge Signage", tag: "Display Graphics" },
    ],
  },
  {
    id: "05",
    slug: "giggles-and-twirls",
    title: "Giggles and Twirls",
    headline: "Elegance and playful comfort for modern fashion.",
    category: "Fashion / Luxury Apparel / Social",
    logo: broadwayLogo,
    src: brand5,
    color: "#88A28D",
    description:
      "Giggles & Twirls is a premium fashion brand offering luxury linen clothing for women and kids, combining elegant designs, breathable fabrics, and everyday comfort.",
    details:
      "Curated pastel-toned catalog lookbooks, e-commerce banners, Instagram story templates, and seasonal product launch graphics.",
    deliverables: [
      "Social media contents",
      "Website banner",
      "Lookbook Design",
      "Apparel Tags",
    ],
    media: [
      { id: 1, type: "image", src: brand5, title: "Summer Linen Collection", tag: "Lookbook" },
      { id: 2, type: "video", src: video1, title: "Behind The Seams Reel", tag: "Brand Reel" },
      { id: 3, type: "image", src: insta7, title: "Kids Couture Showcase", tag: "Catalog" },
      { id: 4, type: "image", src: insta8, title: "E-Commerce Hero Banner", tag: "Web Banner" },
      { id: 5, type: "image", src: insta9, title: "Minimalist Brand Palette", tag: "Brand Guide" },
      { id: 6, type: "image", src: insta10, title: "Fabric Story Carousel", tag: "Social Post" },
    ],
  },
  {
    id: "06",
    slug: "new-city-developers",
    title: "New City Developers",
    headline: "Building architectural landmarks with precision & trust.",
    category: "Real Estate / Construction / Print",
    logo: broadwayLogo,
    src: brand6,
    color: "#1C1C1C",
    description:
      "New City Developers is a construction company specializing in residential construction, home renovation, and redevelopment, delivering quality craftsmanship and modern living spaces.",
    details:
      "Formulated architectural visualization posters, site hoardings, luxury brochure layouts, and investor pitch deck designs.",
    deliverables: [
      "Social media contents",
      "Project Brochures",
      "Site Hoardings",
      "3D Render Graphics",
    ],
    media: [
      { id: 1, type: "image", src: brand6, title: "Skyline Villa Elevation", tag: "Architecture" },
      { id: 2, type: "video", src: video1, title: "Construction Walkthrough", tag: "3D Motion" },
      { id: 3, type: "image", src: insta1, title: "Interior Blueprint Showcase", tag: "Design Render" },
      { id: 4, type: "image", src: insta2, title: "Site Hoarding Billboard", tag: "Outdoor Print" },
      { id: 5, type: "image", src: insta3, title: "Luxury Brochure Cover", tag: "Print Collateral" },
      { id: 6, type: "image", src: insta4, title: "Investor Presentation Slide", tag: "Digital Deck" },
    ],
  },
  {
    id: "07",
    slug: "pavizham-jewellers",
    title: "Pavizham Jewellers",
    headline: "Timeless craftsmanship in gold, diamond and silver.",
    category: "Jewellery / Luxury / Commercial Shoot",
    logo: broadwayLogo,
    src: brand7,
    color: "#868F45",
    description:
      "Pavizham Jewellers is a trusted jewellery brand in Coimbatore, offering gold, diamond, platinum, and silver jewellery with quality craftsmanship and elegant designs.",
    details:
      "Directed high-end jewelry photoshoot concepts, festival bridal campaigns, newspaper advertisements, and digital social media carousels.",
    deliverables: [
      "Social media contents",
      "Jewelry product shoot",
      "Festival Print Ads",
      "Bridal Catalog",
    ],
    media: [
      { id: 1, type: "image", src: brand7, title: "Bridal Gold Heritage Series", tag: "Jewelry Shoot" },
      { id: 2, type: "video", src: video1, title: "Sparkle & Craft Film", tag: "Commercial Film" },
      { id: 3, type: "image", src: insta5, title: "Solitaire Diamond Close-up", tag: "Product Macro" },
      { id: 4, type: "image", src: insta6, title: "Festival Print Newspaper Ad", tag: "Print Ad" },
      { id: 5, type: "image", src: insta7, title: "Traditional Temple Ornaments", tag: "Social Post" },
      { id: 6, type: "image", src: insta8, title: "Exclusive Festive Lookbook", tag: "Catalog" },
    ],
  },
];