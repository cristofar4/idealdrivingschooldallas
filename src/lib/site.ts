/**
 * Single source of truth for Ideal Driving School.
 * Business facts preserved from idealdrivingschooldallas.com.
 */

export const site = {
  name: "Ideal Driving School",
  shortName: "Ideal",
  tagline: "Texas's Premier Driving Academy",
  domain: "https://idealdrivingschooldallas.com",
  description:
    "Premium, TDLR-approved driver education in the Dallas–Fort Worth Metroplex. Certified instructors, personalized lessons, and a road-test pass rate that speaks for itself.",
  phone: "(214) 884-5350",
  phoneAlt: "(214) 884-5288",
  phoneHref: "tel:+12148845350",
  phoneAltHref: "tel:+12148845288",
  email: "info@idealdrivingschooldallas.com",
  emailHref: "mailto:info@idealdrivingschooldallas.com",
  address: {
    line1: "4101 E. Park Blvd, Suite 147",
    city: "Plano",
    region: "TX",
    postal: "75074",
    area: "Dallas–Fort Worth Metroplex",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Ideal+Driving+School+4101+E+Park+Blvd+Plano+TX+75074",
  },
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
    { day: "Saturday", time: "9:00 AM – 5:00 PM" },
    { day: "Sunday", time: "By appointment" },
  ],
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/idealdrivingschooldallas/", icon: "facebook" },
    { label: "Instagram", href: "https://www.facebook.com/idealdrivingschooldallas/", icon: "instagram" },
    { label: "Reviews", href: "https://www.google.com/maps/search/?api=1&query=Ideal+Driving+School+Plano+TX", icon: "star" },
  ],
} as const;

export type NavLink = { label: string; href: string; description?: string };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Road Test", href: "/road-test" },
  { label: "Pricing", href: "/pricing" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Academy",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Programs", href: "/programs" },
      { label: "Gallery", href: "/gallery" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Teen Driver Ed", href: "/programs#teen" },
      { label: "Adult Driver Ed", href: "/programs#adult" },
      { label: "Road Test Service", href: "/road-test" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Book a Lesson", href: "/booking" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export type Stat = { value: number; suffix?: string; prefix?: string; label: string; sub?: string };

export const stats: Stat[] = [
  { value: 98, suffix: "%", label: "Road test pass rate", sub: "First-attempt success" },
  { value: 12000, suffix: "+", label: "Licensed drivers", sub: "And counting across DFW" },
  { value: 17, suffix: " yrs", label: "On Texas roads", sub: "Trusted since 2008" },
  { value: 4.9, label: "Average rating", sub: "From verified students", prefix: "★ " },
];

export type JourneyStep = {
  index: string;
  title: string;
  subtitle: string;
  body: string;
  points: string[];
  icon: string;
};

export const journey: JourneyStep[] = [
  {
    index: "01",
    title: "Get Your Permit",
    subtitle: "The first mile",
    body: "We prepare you for the Texas DPS knowledge exam with focused permit coaching, Impact Texas Teen Drivers, and everything you need to leave the counter with a learner's permit in hand.",
    points: ["Knowledge-test mastery", "Paperwork handled for you", "Permit-day checklist"],
    icon: "id-card",
  },
  {
    index: "02",
    title: "Learn With Certified Instructors",
    subtitle: "Foundations",
    body: "Step into the driver's seat beside TDLR-certified instructors who teach calm, deliberate fundamentals — mirrors, control, scanning, and confidence — in a dual-control academy vehicle.",
    points: ["TDLR-certified coaches", "Dual-control safety cars", "Female instructors available"],
    icon: "steering-wheel",
  },
  {
    index: "03",
    title: "Practice Real-World Driving",
    subtitle: "Mastery",
    body: "Highways, parallel parking, school zones, night driving, and Dallas traffic. We rehearse the exact conditions you'll meet on test day and for the rest of your driving life.",
    points: ["Highway & city merges", "Parking & maneuvers", "Defensive scanning"],
    icon: "route",
  },
  {
    index: "04",
    title: "Road Test Preparation",
    subtitle: "Final approach",
    body: "A mock exam on the official route, a pre-test inspection walkthrough, and a calm game plan. You'll know precisely what the examiner is looking for before you ever pull out.",
    points: ["Mock road test", "Examiner-route rehearsal", "Use our vehicle"],
    icon: "clipboard-check",
  },
  {
    index: "05",
    title: "Get Licensed",
    subtitle: "Open road",
    body: "Take your 3rd-party road test with our DPS-authorized examiners and drive away licensed. The destination you started with — earned with skill you'll keep for life.",
    points: ["3rd-party road test", "Same-day results", "Lifelong safe habits"],
    icon: "trophy",
  },
];

export type Program = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  ages: string;
  duration: string;
  price: string;
  priceNote?: string;
  features: string[];
  icon: string;
  accent: "gold" | "navy" | "teal" | "violet" | "rose" | "sky";
  popular?: boolean;
};

export const programs: Program[] = [
  {
    slug: "teen",
    name: "Teen Driver Education",
    tagline: "Ages 14–17 · TDLR-approved",
    description:
      "The complete state-approved path from first permit to provisional license — 32 hours of classroom plus behind-the-wheel and observation, taught with patience.",
    ages: "14 – 17",
    duration: "32 hrs class + 14 hrs in-car",
    price: "$399",
    priceNote: "complete program",
    features: [
      "32-hour TDLR classroom curriculum",
      "7 hours behind-the-wheel coaching",
      "7 hours guided observation",
      "Permit & ITTD preparation included",
    ],
    icon: "graduation-cap",
    accent: "gold",
    popular: true,
  },
  {
    slug: "adult",
    name: "Adult Driver Education",
    tagline: "Ages 18+ · First license & refreshers",
    description:
      "Streamlined six-hour adult course required for a first Texas license (18–24), plus flexible refresher lessons for anyone returning to the wheel with confidence.",
    ages: "18 +",
    duration: "6-hr course + lessons",
    price: "$95",
    priceNote: "course · lessons from $60/hr",
    features: [
      "State-required 6-hour adult course",
      "Evening & weekend scheduling",
      "New-driver & refresher tracks",
      "Test-ready in weeks, not months",
    ],
    icon: "user-check",
    accent: "navy",
  },
  {
    slug: "private",
    name: "Private Lessons",
    tagline: "One-on-one · Your pace",
    description:
      "Fully personalized, tailor-made coaching with door-to-door pickup and drop-off. Build skill on your schedule with an instructor matched to you.",
    ages: "All ages",
    duration: "Flexible, per hour",
    price: "$60",
    priceNote: "per hour · packages save more",
    features: [
      "Door-to-door pickup & drop-off",
      "Female instructors available",
      "Lesson plans built around you",
      "Anxiety-friendly, judgment-free",
    ],
    icon: "car",
    accent: "teal",
  },
  {
    slug: "road-test",
    name: "Road Test Services",
    tagline: "3rd-party · DPS-authorized",
    description:
      "Skip the DPS wait. Take your official driving exam with our certified third-party examiners — in our car or yours — and get your result the same day.",
    ages: "All ages",
    duration: "~45 minutes",
    price: "$80",
    priceNote: "by appointment",
    features: [
      "State-authorized examiners",
      "Use our vehicle or your own",
      "Same-day pass results",
      "Pre-test inspection walkthrough",
    ],
    icon: "badge-check",
    accent: "violet",
  },
  {
    slug: "permit",
    name: "Permit Classes",
    tagline: "Knowledge-test ready",
    description:
      "Targeted preparation for the Texas DPS written knowledge exam — signs, laws, scenarios, and the Impact Texas Drivers requirement, demystified.",
    ages: "14 +",
    duration: "Self-paced + live help",
    price: "$49",
    priceNote: "prep package",
    features: [
      "Texas signs & laws mastery",
      "Practice exams with explanations",
      "ITTD / ITD guidance",
      "Permit-day document checklist",
    ],
    icon: "book-open",
    accent: "sky",
  },
  {
    slug: "defensive",
    name: "Defensive Driving",
    tagline: "Ticket dismissal · Insurance discount",
    description:
      "A TDLR-approved defensive driving course to dismiss an eligible citation or earn a safe-driver insurance discount — taught by people who love teaching it.",
    ages: "All ages",
    duration: "6 hours",
    price: "$45",
    priceNote: "state-approved",
    features: [
      "Eligible ticket dismissal",
      "Up to 10% insurance discount",
      "Flexible online & in-person",
      "Certificate processing included",
    ],
    icon: "shield-check",
    accent: "rose",
  },
];

export type Plan = {
  name: string;
  audience: string;
  price: number;
  unit?: string;
  blurb: string;
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
  accent: "gold" | "navy";
};

export const plans: Plan[] = [
  {
    name: "Permit Starter",
    audience: "Brand-new drivers",
    price: 49,
    unit: "one-time",
    blurb: "Everything you need to walk out of DPS with a learner's permit.",
    features: [
      "Knowledge-test prep package",
      "Texas signs & laws course",
      "Practice exams + explanations",
      "Permit-day document checklist",
    ],
    cta: "Start with permit prep",
    href: "/booking?plan=permit",
    accent: "navy",
  },
  {
    name: "Teen Complete",
    audience: "Ages 14–17",
    price: 399,
    unit: "complete program",
    blurb: "The full TDLR-approved journey from permit to provisional license.",
    features: [
      "32-hr classroom curriculum",
      "7 hrs behind-the-wheel + 7 hrs observation",
      "Permit & ITTD preparation",
      "Mock road test included",
      "Priority scheduling",
    ],
    cta: "Enroll your teen",
    href: "/booking?plan=teen",
    popular: true,
    accent: "gold",
  },
  {
    name: "Private Pro",
    audience: "All ages · skill-building",
    price: 540,
    unit: "10-lesson pack",
    blurb: "Ten one-on-one hours with pickup, drop-off, and a plan built for you.",
    features: [
      "10 private behind-the-wheel hours",
      "Door-to-door pickup & drop-off",
      "Female instructors available",
      "Flexible evening & weekend slots",
      "Road-test day support",
    ],
    cta: "Build my package",
    href: "/booking?plan=private",
    accent: "navy",
  },
];

export const aLaCarte = [
  { name: "Single private lesson", price: "$60 / hour", note: "Pickup & drop-off available" },
  { name: "3rd-party road test", price: "$80", note: "Our car or yours · by appointment" },
  { name: "Adult 6-hour course", price: "$95", note: "Required for first TX license (18–24)" },
  { name: "Defensive driving", price: "$45", note: "Ticket dismissal · insurance discount" },
];

export type Instructor = {
  name: string;
  role: string;
  initials: string;
  years: number;
  specialties: string[];
  languages: string[];
  bio: string;
  accent: "gold" | "navy" | "teal" | "violet";
};

export const instructors: Instructor[] = [
  {
    name: "Adi R.",
    role: "Lead Instructor & Founder",
    initials: "AR",
    years: 17,
    specialties: ["Teen education", "Highway confidence", "Test prep"],
    languages: ["English", "Hindi", "Urdu"],
    bio: "Adi built Ideal on a simple idea: calm, patient teaching creates safe drivers for life. Seventeen years and thousands of licenses later, that idea still drives every lesson.",
    accent: "gold",
  },
  {
    name: "Najeeb K.",
    role: "Senior Behind-the-Wheel Coach",
    initials: "NK",
    years: 11,
    specialties: ["Nervous drivers", "Parallel parking", "Defensive driving"],
    languages: ["English", "Arabic", "Urdu"],
    bio: "Najeeb is the instructor parents ask for by name. Unshakeably patient, he turns white-knuckle first-timers into composed, capable drivers.",
    accent: "navy",
  },
  {
    name: "Sana M.",
    role: "Certified Instructor",
    initials: "SM",
    years: 8,
    specialties: ["Female-instructor lessons", "Adult learners", "Anxiety-friendly"],
    languages: ["English", "Urdu", "Hindi"],
    bio: "Sana leads our female-instructor program, creating a judgment-free seat for adult learners and anyone who drives better without the pressure.",
    accent: "teal",
  },
  {
    name: "Jaf A.",
    role: "Road-Test Examiner",
    initials: "JA",
    years: 9,
    specialties: ["3rd-party road test", "Mock exams", "Maneuvers"],
    languages: ["English", "Pashto", "Urdu"],
    bio: "A state-authorized examiner, Jaf knows exactly what test day demands — and rehearses every detail with you until passing feels inevitable.",
    accent: "violet",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
  location: string;
  highlight?: boolean;
  video?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "My oldest passed his driving test the first time, and now both of my kids have learned here. From the front desk to the instructors to the paperwork team — welcoming, knowledgeable, and genuinely helpful.",
    name: "Monica T.",
    role: "Parent of two teen drivers",
    rating: 5,
    location: "Plano, TX",
    highlight: true,
    video: true,
  },
  {
    quote:
      "I came in terrified of highways. Najeeb never once made me feel rushed. By my fourth lesson I merged onto 75 like it was nothing. I cannot recommend Ideal enough.",
    name: "Priya S.",
    role: "Adult learner",
    rating: 5,
    location: "Richardson, TX",
    highlight: true,
  },
  {
    quote:
      "The most professional driving school in DFW, hands down. Adi and the team are kind, patient, and incredibly organized. Passed my road test on the first attempt.",
    name: "Daniel O.",
    role: "Teen driver",
    rating: 5,
    location: "Frisco, TX",
  },
  {
    quote:
      "Having a female instructor made all the difference for me. Sana was calm, encouraging, and the pickup service meant I could practice straight after work. Worth every dollar.",
    name: "Aisha R.",
    role: "Adult learner",
    rating: 5,
    location: "Allen, TX",
    video: true,
  },
  {
    quote:
      "We did the 3rd-party road test here instead of waiting weeks at DPS. Booked, tested, passed, and licensed the same day. Jaf walked us through everything beforehand.",
    name: "Kevin L.",
    role: "Parent",
    rating: 5,
    location: "McKinney, TX",
  },
  {
    quote:
      "Tailor-made is real here. They built lessons around my work schedule and my anxiety, never the other way around. I finally have my license at 34.",
    name: "Brittany H.",
    role: "Adult learner",
    rating: 5,
    location: "Carrollton, TX",
  },
  {
    quote:
      "Both instructors we worked with were patient and committed to making the car a comfortable place to learn. Our daughter actually looked forward to her lessons.",
    name: "Rajesh & Meena V.",
    role: "Parents",
    rating: 5,
    location: "Plano, TX",
  },
  {
    quote:
      "Clear pricing, no surprises, and they handled the DPS paperwork I was dreading. This is how every driving school should be run.",
    name: "Marcus B.",
    role: "Teen driver",
    rating: 5,
    location: "Garland, TX",
  },
];

export type Faq = { q: string; a: string; category: string };

export const faqCategories = [
  "Getting Started",
  "Programs & Pricing",
  "Road Test",
  "Scheduling",
] as const;

export const faqs: Faq[] = [
  {
    category: "Getting Started",
    q: "How old does my teen need to be to start driver education?",
    a: "Teens can begin the classroom portion of Texas driver education at 14. To get a learner's permit, they must be at least 15, have completed the required classroom instruction, and pass the DPS knowledge exam. We guide your family through each milestone.",
  },
  {
    category: "Getting Started",
    q: "What do I need to bring on my first day?",
    a: "Bring a valid ID (or your teen's), proof of enrollment or identity documents, and a comfortable pair of closed-toe shoes for behind-the-wheel sessions. We'll send a simple checklist when you book so nothing slows you down.",
  },
  {
    category: "Programs & Pricing",
    q: "Is Ideal Driving School TDLR-approved?",
    a: "Yes. Our curriculum follows the Texas Department of Licensing and Regulation (TDLR) standards for both teen and adult driver education, so your hours and certificate count toward your Texas license.",
  },
  {
    category: "Programs & Pricing",
    q: "Do you offer female instructors?",
    a: "We do. Many students learn best with a female instructor, and our female-instructor program is available for private lessons and behind-the-wheel sessions — just request it when you book.",
  },
  {
    category: "Programs & Pricing",
    q: "How much does the complete teen program cost?",
    a: "Our complete TDLR-approved teen program is $399 and includes 32 hours of classroom instruction, 7 hours of behind-the-wheel coaching, 7 hours of observation, permit preparation, and a mock road test. Flexible payment options are available.",
  },
  {
    category: "Road Test",
    q: "Can I take my road test at Ideal instead of the DPS?",
    a: "Yes. We're authorized to administer the official third-party road test. It's $80 by appointment, you can use our vehicle or your own, and you'll receive your result the same day — no long DPS wait.",
  },
  {
    category: "Road Test",
    q: "What happens if I don't pass the road test?",
    a: "It happens, and it's okay. We'll review exactly what to work on, schedule focused practice on those skills, and get you re-tested as soon as you're ready. Most students pass on their first attempt after our preparation.",
  },
  {
    category: "Road Test",
    q: "Do you provide a car for the road test?",
    a: "Yes — our academy vehicles are dual-control, insured, and inspected. You're welcome to test in your own vehicle as well, provided it passes a quick pre-test safety inspection.",
  },
  {
    category: "Scheduling",
    q: "Do you offer pickup and drop-off?",
    a: "For private lessons, yes. Door-to-door pickup and drop-off is available across the Dallas–Fort Worth area for a small additional charge, so students can practice straight from home, school, or work.",
  },
  {
    category: "Scheduling",
    q: "How do I book a lesson or class?",
    a: "Use our online booking flow to choose a service, date, and instructor, or call (214) 884-5350. We offer evening and weekend slots and do our best to match you with your preferred instructor.",
  },
];

export type GalleryItem = {
  title: string;
  caption: string;
  scene: "road" | "wheel" | "city" | "lesson" | "test" | "night" | "map" | "park" | "sunrise";
  span: "tall" | "wide" | "normal";
  accent: "gold" | "navy" | "teal" | "violet" | "rose" | "sky";
};

export const gallery: GalleryItem[] = [
  { title: "First lesson", caption: "Calm foundations in a dual-control car", scene: "wheel", span: "tall", accent: "gold" },
  { title: "Open road", caption: "Highway confidence on US-75", scene: "road", span: "wide", accent: "navy" },
  { title: "City mastery", caption: "Downtown Dallas, handled", scene: "city", span: "normal", accent: "teal" },
  { title: "Behind the wheel", caption: "One-on-one coaching", scene: "lesson", span: "normal", accent: "violet" },
  { title: "Test day", caption: "Same-day road test results", scene: "test", span: "tall", accent: "gold" },
  { title: "Night driving", caption: "Required night hours, mastered", scene: "night", span: "wide", accent: "sky" },
  { title: "The route", caption: "We rehearse the examiner's path", scene: "map", span: "normal", accent: "rose" },
  { title: "Parking & maneuvers", caption: "Parallel parking, perfected", scene: "park", span: "normal", accent: "navy" },
  { title: "Licensed", caption: "Where every journey is headed", scene: "sunrise", span: "wide", accent: "gold" },
];

export type TrustBadge = { label: string; sub: string; icon: string };

export const trustBadges: TrustBadge[] = [
  { label: "TDLR Approved", sub: "Texas-licensed curriculum", icon: "shield-check" },
  { label: "DPS-Authorized", sub: "3rd-party road testing", icon: "badge-check" },
  { label: "Dual-Control Fleet", sub: "Insured & inspected", icon: "car" },
  { label: "Certified Instructors", sub: "Background-checked", icon: "user-check" },
];

export const differentiators = [
  {
    title: "Personalized to your pace",
    body: "No conveyor belt. Lessons are tailor-made around your schedule, comfort, and goals — never the other way around.",
    icon: "sliders",
  },
  {
    title: "Female instructors available",
    body: "A dedicated female-instructor program creates a comfortable, judgment-free seat for every learner who wants one.",
    icon: "users",
  },
  {
    title: "Door-to-door service",
    body: "Pickup and drop-off across DFW means students practice from home, school, or work without the logistics.",
    icon: "map-pin",
  },
  {
    title: "Skip the DPS wait",
    body: "On-site, state-authorized third-party road testing with same-day results — no weeks-long appointment queue.",
    icon: "calendar-check",
  },
];
