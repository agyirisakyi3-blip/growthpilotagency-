import type { Service, Stat, Testimonial, Industry } from "./types";

export const siteConfig = {
  name: "GrowthPilot Agency",
  description:
    "We help businesses grow faster with SEO & GEO, high-converting websites, AI automation, and WhatsApp lead generation.",
  url: "https://growthpilotagency.com",
  ogImage: "/og.png",
  links: {
    twitter: "https://x.com/GrowthPilotAgency",
    github: "https://github.com/GrowthPilotAgency",
  },
};

export const services: Service[] = [
  {
    title: "SEO & GEO Services",
    slug: "seo-services",
    description:
      "Dominate search and AI-generated rankings with data-driven SEO & GEO strategies that drive organic traffic and qualified leads.",
    icon: "Search",
    benefits: [
      "Keyword research & strategy",
      "On-page & technical SEO",
      "GEO (Generative Engine Optimization)",
      "Content strategy",
    ],
    cta: "Boost Rankings",
  },
  {
    title: "Website Design",
    slug: "website-design",
    description:
      "High-converting, modern websites built with cutting-edge technology that captivates and converts.",
    icon: "Palette",
    benefits: [
      "Custom Next.js development",
      "Responsive & mobile-first",
      "SEO-optimized structure",
      "Fast loading & accessible",
    ],
    cta: "Get Website",
  },
  {
    title: "AI Automation",
    slug: "ai-automation",
    description:
      "Streamline your business with intelligent AI-powered automations that save time and boost efficiency.",
    icon: "Bot",
    benefits: [
      "Workflow automation",
      "Chatbot development",
      "AI content generation",
      "Process optimization",
    ],
    cta: "Automate Now",
  },
  {
    title: "WhatsApp Automation",
    slug: "whatsapp-automation",
    description:
      "Automate customer communication and lead nurturing directly through WhatsApp's massive reach.",
    icon: "MessageSquare",
    benefits: [
      "Auto-reply systems",
      "Broadcast campaigns",
      "Lead qualification",
      "CRM integration",
    ],
    cta: "Start Chat",
  },
  {
    title: "Lead Generation",
    slug: "lead-generation",
    description:
      "Multi-channel lead generation campaigns that fill your pipeline with high-quality, ready-to-convert prospects.",
    icon: "TrendingUp",
    benefits: [
      "Targeted campaigns",
      "Landing page funnels",
      "Email outreach",
      "Conversion tracking",
    ],
    cta: "Get Leads",
  },
  {
    title: "Local SEO",
    slug: "local-seo",
    description:
      "Dominate local search results and Google Maps to bring more nearby customers to your business.",
    icon: "MapPin",
    benefits: [
      "Google Business Profile",
      "Local citations",
      "Review management",
      "Local content strategy",
    ],
    cta: "Go Local",
  },
  {
    title: "SMS Automation",
    slug: "sms-automation",
    description:
      "Develop and customize SMS marketing campaigns that engage customers and drive conversions on the channel with 98% open rates.",
    icon: "Smartphone",
    benefits: [
      "SMS campaign strategy",
      "Custom SMS templates",
      "Automated drip sequences",
      "Delivery & analytics tracking",
    ],
    cta: "Start SMS",
  },
  {
    title: "Social Media Management",
    slug: "social-media-management",
    description: "Build your brand presence across Instagram, Facebook, TikTok and LinkedIn with content that drives engagement.",
    icon: "Globe",
    benefits: ["Content calendar planning", "Community management", "Analytics & reporting", "Paid social strategy"],
    cta: "Grow Social",
  },
  {
    title: "Google Ads & PPC",
    slug: "google-ads-ppc",
    description: "High-ROI paid search campaigns on Google that capture intent-driven traffic and convert it into customers.",
    icon: "BarChart3",
    benefits: ["Search & Display ads", "YouTube advertising", "Shopping campaigns", "Conversion tracking"],
    cta: "Run Ads",
  },
  {
    title: "Social Media Ads",
    slug: "social-media-ads",
    description: "Targeted Facebook, Instagram and TikTok ad campaigns optimized for lead generation and sales.",
    icon: "Megaphone",
    benefits: ["Audience targeting", "Ad creative & copy", "A/B testing", "Retargeting funnels"],
    cta: "Advertise Now",
  },
  {
    title: "Content Creation",
    slug: "content-creation",
    description: "Professional copywriting, short-form video, and graphic design that tells your brand story and drives action.",
    icon: "PenTool",
    benefits: ["Copywriting & blogging", "Short-form video", "Graphic design", "Brand voice strategy"],
    cta: "Create Content",
  },
  {
    title: "E-commerce Solutions",
    slug: "ecommerce-solutions",
    description: "Launch and optimize your online store with Shopify, WooCommerce, or custom builds that maximize conversions.",
    icon: "ShoppingCart",
    benefits: ["Store setup & design", "Product optimization", "Payment integration", "Conversion optimization"],
    cta: "Launch Store",
  },
  {
    title: "CRM Setup & Automation",
    slug: "crm-setup-automation",
    description: "Implement and automate CRM systems that track leads, nurture relationships, and close more deals.",
    icon: "Users",
    benefits: ["CRM selection & setup", "Pipeline automation", "Lead scoring", "Integration with tools"],
    cta: "Set Up CRM",
  },
  {
    title: "Reputation Management",
    slug: "reputation-management",
    description: "Monitor, manage, and improve your online reputation across review platforms and social media.",
    icon: "Star",
    benefits: ["Review monitoring", "Response management", "Reputation strategy", "Competitor benchmarking"],
    cta: "Protect Reputation",
  },
  {
    title: "Maintenance & Support",
    slug: "maintenance-support",
    description: "Ongoing website care, security monitoring, updates, and technical support to keep your site running smoothly.",
    icon: "Wrench",
    benefits: ["Regular updates", "Security monitoring", "Backup management", "Priority support"],
    cta: "Get Support",
  },
];

export const stats: Stat[] = [
  { value: 350, suffix: "%", label: "Avg Traffic Increase" },
  { value: 85, suffix: "%", label: "Better Rankings" },
  { value: 200, suffix: "%", label: "More Leads Generated" },
  { value: 45, suffix: "%", label: "Higher Conversions" },
];

export const whyChooseUs = [
  {
    title: "Proven Strategies",
    description:
      "Every tactic is backed by data, tested for results, and refined for maximum ROI.",
    icon: "Target",
  },
  {
    title: "Fast Execution",
    description:
      "We move at startup speed. Campaigns launch in days, not weeks or months.",
    icon: "Zap",
  },
  {
    title: "AI-Powered Systems",
    description:
      "Leveraging artificial intelligence to optimize campaigns, content, and conversions.",
    icon: "Cpu",
  },
  {
    title: "Affordable Solutions",
    description:
      "Enterprise-quality digital marketing at prices that make sense for growing businesses.",
    icon: "Wallet",
  },
  {
    title: "Ongoing Support",
    description:
      "We're your long-term partner. Continuous optimization, reporting, and support included.",
    icon: "Headphones",
  },
];

export const industries: Industry[] = [
  {
    name: "Law Firms",
    description:
      "Dominate local search and attract high-value legal clients seeking your expertise.",
    icon: "Scale",
  },
  {
    name: "Insurance Brokers",
    description:
      "Generate qualified insurance leads through targeted SEO & GEO and automated follow-ups.",
    icon: "Shield",
  },
  {
    name: "NGOs",
    description:
      "Amplify your mission with compelling digital presence and donor acquisition strategies.",
    icon: "Heart",
  },
  {
    name: "Hotels",
    description:
      "Drive direct bookings with local SEO & GEO, stunning web design, and automated guest outreach.",
    icon: "Building2",
  },
  {
    name: "Schools",
    description:
      "Attract enrollments with optimized admissions funnels and community engagement.",
    icon: "GraduationCap",
  },
  {
    name: "Real Estate",
    description:
      "Convert property seekers into buyers with immersive virtual tours and lead systems.",
    icon: "Home",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Mensah",
    role: "Managing Partner",
    company: "Mensah & Associates Law Firm",
    content:
      "GrowthPilot Agency transformed our online presence. Our organic leads increased by 400% in just 3 months. The ROI has been extraordinary.",
    avatar: "/avatars/sarah.jpg",
  },
  {
    name: "James Osei",
    role: "CEO",
    company: "Osei Insurance Brokers",
    content:
      "The WhatsApp automation system they built for us revolutionized how we handle client inquiries. We now respond instantly and close 3x more deals.",
    avatar: "/avatars/james.jpg",
  },
  {
    name: "Dr. Amma Boateng",
    role: "Director",
    company: "WellCare Clinics",
    content:
      "Our patient bookings doubled after the SEO overhaul and new website. The team understands healthcare marketing at a deep level.",
    avatar: "/avatars/amma.jpg",
  },
  {
    name: "Kwame Asare",
    role: "Founder",
    company: "Asare Properties",
    content:
      "From zero to page 1 on Google for competitive real estate keywords in 60 days. Absolutely phenomenal work.",
    avatar: "/avatars/kwame.jpg",
  },
];

export const caseStudies = [
  {
    title: "Law Firm Lead Generation Transformation",
    client: "Mensah & Associates",
    industry: "Legal Services",
    before:
      "Relied on referrals only, minimal online presence, 5 organic leads/month.",
    after:
      "Dominant search presence, 200+ organic leads/month, 40% from SEO & GEO.",
    metrics: {
      "Traffic Increase": "380%",
      "Rankings Improved": "45 keywords in top 3",
      "Lead Conversion": "12.5%",
    },
    image: "/cases/law-firm.jpg",
  },
  {
    title: "Insurance Broker WhatsApp Automation",
    client: "Osei Insurance Brokers",
    industry: "Insurance",
    before:
      "Manual responses, slow follow-ups, 15 qualified leads/month.",
    after:
      "Automated 24/7 responses, instant follow-ups, 80+ qualified leads/month.",
    metrics: {
      "Response Time": "From 4hrs to 30sec",
      "Leads Generated": "+433%",
      "Close Rate": "28%",
    },
    image: "/cases/insurance.jpg",
  },
  {
    title: "Clinic Website & SEO Overhaul",
    client: "WellCare Clinics",
    industry: "Healthcare",
    before:
      "Outdated website, no local SEO, 10 appointment bookings/month.",
    after:
      "Modern high-converting site, #1 on Google Maps, 200+ bookings/month.",
    metrics: {
      "Website Traffic": "+520%",
      "Google Maps Rank": "#1 for 12 keywords",
      "Booking Rate": "22%",
    },
    image: "/cases/clinic.jpg",
  },
];
