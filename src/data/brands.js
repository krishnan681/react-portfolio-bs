import brand1 from "../assets/images/Brands/1.jpg";
import brand2 from "../assets/images/Brands/2.jpg";
import brand3 from "../assets/images/Brands/3.jpg";
import brand4 from "../assets/images/Brands/4.jpg";
import brand5 from "../assets/images/Brands/5.jpg";
import brand6 from "../assets/images/Brands/6.jpg";
import brand7 from "../assets/images/Brands/7.jpeg";
import brand8 from "../assets/images/Brands/8.jpg";
import brand9 from "../assets/images/Brands/9.jpg";
import brand10 from "../assets/images/Brands/10.jpg";

import brandbanners1 from "../assets/images/BrandsBanner/Banners-01.jpg";
import brandbanners2 from "../assets/images/BrandsBanner/Banners-02.jpg";
import brandbanners3 from "../assets/images/BrandsBanner/Banners-03.jpg";
import brandbanners4 from "../assets/images/BrandsBanner/Banners-04.jpg";
import brandbanners5 from "../assets/images/BrandsBanner/Banners-05.jpg";
import brandbanners6 from "../assets/images/BrandsBanner/Banners-06.jpg"; 
import brandbanners7 from "../assets/images/BrandsBanner/Banners-07.jpg";
import brandbanners8 from "../assets/images/BrandsBanner/Banners-08.jpg";
import brandbanners9 from "../assets/images/BrandsBanner/Banners-09.jpg";
import brandbanners10 from "../assets/images/BrandsBanner/Banners-10.jpg"; 

import broadwayLogo from "../assets/images/logo/broadway.png";
import bsLogo from "../assets/images/logo/BS.png";

// Additional images from CH and Insta
import ch1 from "../assets/images/CH/1.jpeg";
import ch2 from "../assets/images/CH/2.jpeg";
import ch3 from "../assets/images/CH/3.jpeg";
import ch4 from "../assets/images/CH/4.jpeg";

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

// Videos
import hyperxVideo from "../assets/videos/C-H/hyperx.mp4";
import gandtVideo from "../assets/videos/C-H/gandt.mp4";
import thaaiVideo from "../assets/videos/C-H/Thaai Kelavi Promotion Reel.mp4";
import f1Video from "../assets/videos/C-H/F1.mp4";
import strayKidsVideo from "../assets/videos/C-H/Stray Kids Promotion.mp4";
import youthVideo from "../assets/videos/C-H/Youth.mp4";

export const BRANDS = [
  {
    id: "01",
    slug: "broadway-cinemas",
    title: "Broadway Cinemas",
    sectionTitle: "IMAX",
    headline: "Transforming the multiplex entertainment landscape.",
    category: "Branding / Multiplex / Motion",
    logo: broadwayLogo,
    banner: brandbanners1,
    src: brand1,
    color: "#C49A6C",
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
      {
        id: 1,
        type: "video",
        src: hyperxVideo,
        title: "HyperX IMAX Laser Experience",
        tag: "Motion Reel",
      },
      {
        id: 2,
        type: "image",
        src: brand1,
        title: "IMAX Laser Visual Identity",
        tag: "Brand Identity",
      },
      {
        id: 3,
        type: "image",
        src: ch1,
        title: "Collectible Ticket Series",
        tag: "Print Work",
      },
      {
        id: 4,
        type: "image",
        src: insta1,
        title: "Premiere Night Digital Banner",
        tag: "Digital Poster",
      },
      {
        id: 5,
        type: "image",
        src: insta2,
        title: "Dolby Atmos Visualizer",
        tag: "Social Media",
      },
      {
        id: 6,
        type: "image",
        src: ch4,
        title: "Concession Menu Board",
        tag: "Menu Design",
      },
    ],
  },
  {
    id: "02",
    slug: "the-crimson",
    title: "The Crimson Restobar",
    sectionTitle: "NIGHTLIFE & MIXOLOGY",
    headline: "Electrifying nightlife and cocktail visual storytelling.",
    category: "Restobar / Nightlife / Branding",
    logo: broadwayLogo,
    banner: brandbanners2,
    src: brand2,
    color: "#D4A76A",
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
      {
        id: 1,
        type: "video",
        src: f1Video,
        title: "Live Grand Prix & Nightlife Promo",
        tag: "Promo Video",
      },
      {
        id: 2,
        type: "image",
        src: brand2,
        title: "Neon Nights Brand Identity",
        tag: "Brand Visual",
      },
      {
        id: 3,
        type: "image",
        src: ch2,
        title: "Signature Mixology Spotlight",
        tag: "Cocktail Series",
      },
      {
        id: 4,
        type: "image",
        src: insta3,
        title: "Live Music Night Poster",
        tag: "Event Poster",
      },
      {
        id: 5,
        type: "image",
        src: insta4,
        title: "Gourmet Bites Creative",
        tag: "Social Post",
      },
      {
        id: 6,
        type: "image",
        src: ch3,
        title: "VIP Lounge Signage",
        tag: "Display Graphics",
      },
    ],
  },
  {
    id: "03",
    slug: "giggles-and-twirls",
    title: "Giggles & Twirls",
    sectionTitle: "LUXURY LINEN",
    headline: "Elegance and playful comfort for modern luxury linen fashion.",
    category: "Fashion / Luxury Apparel / Social",
    logo: broadwayLogo,
    banner: brandbanners3,
    src: brand3,
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
      {
        id: 1,
        type: "video",
        src: gandtVideo,
        title: "Summer Linen Collection Showcase",
        tag: "Brand Film",
      },
      {
        id: 2,
        type: "image",
        src: brand3,
        title: "Kids Couture Lookbook",
        tag: "Lookbook",
      },
      {
        id: 3,
        type: "image",
        src: insta5,
        title: "E-Commerce Hero Banner",
        tag: "Web Banner",
      },
      {
        id: 4,
        type: "image",
        src: insta6,
        title: "Minimalist Brand Palette",
        tag: "Brand Guide",
      },
      {
        id: 5,
        type: "image",
        src: ch1,
        title: "Fabric Story Carousel",
        tag: "Social Post",
      },
    ],
  },
  {
    id: "04",
    slug: "aarthi-grand-cineplex",
    title: "Aarthi Grand Cineplex (AGC)",
    sectionTitle: "4K LASER EXPERIENCE",
    headline: "Creating a visual language for a cinematic experience.",
    category: "Branding / Multiplex / Motion",
    logo: broadwayLogo,
    banner: brandbanners4,
    src: brand4,
    color: "#0A2E8C",
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
      {
        id: 1,
        type: "video",
        src: thaaiVideo,
        title: "Premiere Experience & Theatrical Promo",
        tag: "Theatrical Trailer",
      },
      {
        id: 2,
        type: "image",
        src: brand4,
        title: "Brand Identity & Key Visuals",
        tag: "Brand Identity",
      },
      {
        id: 3,
        type: "image",
        src: insta7,
        title: "Social Media Campaign 01",
        tag: "Social Media",
      },
      {
        id: 4,
        type: "image",
        src: ch4,
        title: "Dolby Atmos Acoustic Campaign",
        tag: "Audio-Visual",
      },
      {
        id: 5,
        type: "image",
        src: insta8,
        title: "Digital Display & Kiosk Design",
        tag: "Display Graphics",
      },
    ],
  },
  {
    id: "05",
    slug: "thats-y-food",
    title: "Cafe All Rise, Cafe Totaram, That's Y Food, On The Go",
    sectionTitle: "CULINARY ESSENCE",
    headline: "Crafting appetizing aesthetics for culinary excellence.",
    category: "Hospitality / Culinary / Social Media",
    logo: broadwayLogo,
    banner: brandbanners5,
    src: brand5,
    color: "#C25424",
    description:
      "That's Y Food — A premium multi-cuisine restaurant known for global flavors and fine dining. On the Go (OTG) — A casual café and restaurant serving quick meals, beverages, and comfort food. Café Totaram & Toto Tree — Artisanal hospitality in Coimbatore.",
    details:
      "Produced mouth-watering visual campaigns, food photography directions, short promo videos, artisanal menu placards, and seasonal festival collaterals.",
    deliverables: [
      "Social media contents",
      "Video shoot",
      "Placards & Menu Cards",
      "Promotional Campaigns",
    ],
    media: [
      {
        id: 1,
        type: "video",
        src: strayKidsVideo,
        title: "Cafe All Rise Event & Promo",
        tag: "Event Video",
      },
      {
        id: 2,
        type: "image",
        src: brand5,
        title: "Signature Dish Gourmet Feature",
        tag: "Food Photography",
      },
      {
        id: 3,
        type: "image",
        src: insta9,
        title: "Artisan Coffee Campaign",
        tag: "Beverage Visual",
      },
      {
        id: 4,
        type: "image",
        src: insta10,
        title: "Weekend Brunch Menu Placard",
        tag: "Print Menu",
      },
      {
        id: 5,
        type: "image",
        src: ch2,
        title: "Festive Dining Showcase",
        tag: "Social Creative",
      },
    ],
  },
  {
    id: "06",
    slug: "the-long-story",
    title: "The Long Story - Spirits & Spice",
    sectionTitle: "SPIRITS & SPICE",
    headline:
      "Crafting bespoke narrative and ambiance for fine spirits & dining.",
    category: "Restobar / Hospitality / Branding",
    logo: broadwayLogo,
    banner: brandbanners6,
    src: brand6,
    color: "#122B22",
    description:
      "The Long Story — Spirits & Spice is an upscale resto-lounge offering signature mixology, gourmet gastronomy, and refined nightlife storytelling with curated ambient aesthetics.",
    details:
      "Developed sophisticated brand identity collaterals, craft cocktail menus, ambient lighting themes, and digital social media campaigns.",
    deliverables: [
      "Brand Identity",
      "Cocktail & Dining Menu",
      "Social Media Campaigns",
      "Ambient Collaterals",
    ],
    media: [
      {
        id: 1,
        type: "video",
        src: youthVideo,
        title: "Nightlife Mood & Vibes Reel",
        tag: "Brand Reel",
      },
      {
        id: 2,
        type: "image",
        src: brand6,
        title: "Spirits & Spice Brand Emblem",
        tag: "Brand Identity",
      },
      {
        id: 3,
        type: "image",
        src: ch3,
        title: "Craft Mixology Showcase",
        tag: "Beverage Visual",
      },
      {
        id: 4,
        type: "image",
        src: insta1,
        title: "Signature Dining Lookbook",
        tag: "Menu Design",
      },
      {
        id: 5,
        type: "image",
        src: insta2,
        title: "VIP Bar Signage & Displays",
        tag: "Display Graphics",
      },
    ],
  },
  {
    id: "07",
    slug: "pavizham-jewellers",
    title: "Pavizham Jewellers",
    sectionTitle: "BRIDAL HERITAGE",
    headline: "Timeless craftsmanship in gold, diamond and silver.",
    category: "Jewellery / Luxury / Commercial Shoot",
    logo: broadwayLogo,
    banner: brandbanners7,
    src: brand7,
    color: "#8A131A",
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
      {
        id: 1,
        type: "image",
        src: brand7,
        title: "Bridal Gold Heritage Series",
        tag: "Jewelry Shoot",
      },
      {
        id: 2,
        type: "image",
        src: insta3,
        title: "Solitaire Diamond Close-up",
        tag: "Product Macro",
      },
      {
        id: 3,
        type: "image",
        src: insta4,
        title: "Festival Print Newspaper Ad",
        tag: "Print Ad",
      },
      {
        id: 4,
        type: "image",
        src: ch1,
        title: "Traditional Temple Ornaments",
        tag: "Social Post",
      },
      {
        id: 5,
        type: "image",
        src: ch2,
        title: "Exclusive Festive Lookbook",
        tag: "Catalog",
      },
    ],
  },
  {
    id: "08",
    slug: "new-city-developers",
    title: "New City Developers",
    sectionTitle: "ARCHITECTURAL VISION",
    headline: "Building architectural landmarks with precision & trust.",
    category: "Real Estate / Construction / Print",
    logo: broadwayLogo,
    banner: brandbanners8,
    src: brand8,
    color: "#1E242B",
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
      {
        id: 1,
        type: "image",
        src: brand8,
        title: "Skyline Villa Elevation",
        tag: "Architecture",
      },
      {
        id: 2,
        type: "image",
        src: insta5,
        title: "Interior Blueprint Showcase",
        tag: "Design Render",
      },
      {
        id: 3,
        type: "image",
        src: insta6,
        title: "Site Hoarding Billboard",
        tag: "Outdoor Print",
      },
      {
        id: 4,
        type: "image",
        src: ch3,
        title: "Luxury Brochure Cover",
        tag: "Print Collateral",
      },
      {
        id: 5,
        type: "image",
        src: ch4,
        title: "Investor Presentation Slide",
        tag: "Digital Deck",
      },
    ],
  },
  {
    id: "09",
    slug: "sunbeam-international-school",
    title: "Sunbeam International School",
    sectionTitle: "CAMPUS & ACADEMICS",
    headline:
      "Inspiring future minds with vibrant educational identity & campus visuals.",
    category: "Education / Institutional / Visual Media",
    logo: broadwayLogo,
    banner: brandbanners9,
    src: brand9,
    color: "#0284C7",
    description:
      "Sunbeam International School (ICSE) is a premier educational institution focused on holistic academic excellence, creative innovation, and character building.",
    details:
      "Designed vibrant admission campaigns, school prospectus, annual day creative themes, and digital parent engagement visuals.",
    deliverables: [
      "Admission Campaign",
      "Prospectus & Brochures",
      "Social Media Creatives",
      "Event Visual Identity",
    ],
    media: [
      {
        id: 1,
        type: "video",
        src: youthVideo,
        title: "Campus Life & Student Highlights",
        tag: "Campus Video",
      },
      {
        id: 2,
        type: "image",
        src: brand9,
        title: "Sunbeam Academic Identity",
        tag: "Identity Design",
      },
      {
        id: 3,
        type: "image",
        src: insta7,
        title: "Annual Day Theme Poster",
        tag: "Event Creative",
      },
      {
        id: 4,
        type: "image",
        src: insta8,
        title: "Campus Prospectus Layout",
        tag: "Print Work",
      },
      {
        id: 5,
        type: "image",
        src: ch1,
        title: "Student Achievement Banner",
        tag: "Social Media",
      },
    ],
  },
  {
    id: "10",
    slug: "newrish-pharmaceuticals",
    title: "Newrish Pharmaceuticals",
    sectionTitle: "HEALTHCARE INNOVATION",
    headline:
      "Pioneering healthcare excellence with trustworthy pharmaceutical branding.",
    category: "Healthcare / Pharmaceuticals / Corporate Identity",
    logo: bsLogo,
    banner: brandbanners10,
    src: brand10,
    color: "#0E6B88",
    description:
      "Newrish Pharmaceuticals Private Limited is dedicated to advancing healthcare and wellness through high-quality pharmaceutical formulations and ethical medical innovations.",
    details:
      "Crafted corporate branding guidelines, pharmaceutical packaging mockups, medical symposium backdrops, and product monographs.",
    deliverables: [
      "Corporate Identity",
      "Product Packaging",
      "Medical Brochures",
      "Symposium Collaterals",
    ],
    media: [
      {
        id: 1,
        type: "image",
        src: brand10,
        title: "Corporate Identity & Logo System",
        tag: "Brand Identity",
      },
      {
        id: 2,
        type: "image",
        src: insta9,
        title: "Pharmaceutical Packaging Series",
        tag: "Packaging",
      },
      {
        id: 3,
        type: "image",
        src: insta10,
        title: "Medical Symposium Backdrop",
        tag: "Print Display",
      },
      {
        id: 4,
        type: "image",
        src: ch2,
        title: "Product Monograph Guide",
        tag: "Editorial",
      },
      {
        id: 5,
        type: "image",
        src: ch3,
        title: "Healthcare Awareness Carousel",
        tag: "Social Media",
      },
    ],
  },
];
