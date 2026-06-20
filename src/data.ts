import { Project, BlogPost, Service, TimelineEvent, Testimonial, AnalyticsStats } from './types';

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Apex SaaS Analytics Platform',
    description: 'A cloud-native SaaS infrastructure management portal displaying real-time microservice latency, CPU patterns, and resource container distribution graphs.',
    category: 'SaaS Platforms',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'Vite'],
    demoUrl: 'https://apex-saas-analytics-preview.example.com',
    githubUrl: 'https://github.com/akibsatej/apex-analytics-saas',
    image: '/src/assets/images/saas_dashboard_preview_1781844175428.jpg',
    longDescription: `This project is a premium developer-focused SaaS Analytics platform. It features deep observability integration for microservices, allowing engineers to visualize database traffic, network requests latency, and CPU usage on a scale-to-zero infrastructure.

Key contributions:
- Engineered dynamic canvas rendering capable of plotting 50,000 continuous data points under 16ms latency.
- Implemented JWT authentication and secure session states across partitioned tenant domains.
- Integrated a comprehensive PostgreSQL analytics compiler, improving read query execution speeds by 38%.`,
    views: 1240,
    likes: 428,
    featured: true
  },
  {
    id: 'proj-2',
    name: 'SvelteLux Premium E-Commerce Hub',
    description: 'An immersive 3D-oriented shopping experience showcasing responsive product detail micro-interactions and atomic card transitions.',
    category: 'E-Commerce',
    tech: ['Next.js', 'Tailwind CSS', 'Redux Toolkit', 'Stripe API', 'PostgreSQL'],
    demoUrl: 'https://sveltelux-shop.example.com',
    githubUrl: 'https://github.com/akibsatej/sveltelux-ecommerce',
    image: '/src/assets/images/ecommerce_platform_preview_1781844190580.jpg',
    longDescription: `A luxury consumer-focused online retail experience optimized for mobile responsiveness and core Web Vitals. Powered by an Express-based server proxy to encrypt Stripe transactions and protect merchant checkouts.

Key features:
- Interactive product zooming with custom spring physics motion curves.
- Instant checkout capability caching client-side preferences and session carts.
- SEO-focused server-side metadata generator, yielding a 98% Lighthouse performance rating.`,
    views: 935,
    likes: 312,
    featured: true
  },
  {
    id: 'proj-3',
    name: 'OmniSync Collaboration Panel',
    description: 'Real-time multi-tenant team dashboard with secure task cards, shared whiteboard canvases, and inline markdown journals.',
    category: 'Dashboards',
    tech: ['React', 'Express.js', 'Socket.io', 'MongoDB', 'Tailwind CSS', 'lucide-react'],
    demoUrl: 'https://omnisync-workspace.example.com',
    githubUrl: 'https://github.com/akibsatej/omnisync-workspace',
    image: '/src/assets/images/omnisync_preview_1781943441928.jpg',
    longDescription: `OmniSync delivers an immersive collaborative workspace for remote development teams. Using server-authoritative state reconciliation, it allows synchronous workspace editing, messaging, and real-time canvas sketches.

Key features:
- Multi-client websocket channel synchronizing project boards under 12ms.
- Persistent document databases caching canvas drawings and markdown draft articles locally to prevent data loss.
- Flexible team administration permissions and audit logs reporting directory updates.`,
    views: 844,
    likes: 198,
    featured: false
  },
  {
    id: 'proj-4',
    name: 'SmartBank Decentralized Portal',
    description: 'A crypto-centric asset tracking, budget logger, and real-time transaction visualizer with dark slate glassmorphism styling.',
    category: 'Web Applications',
    tech: ['React', 'Tailwind CSS', 'D3.js', 'Firebase', 'Next.js'],
    demoUrl: 'https://smartbank-crypto.example.com',
    githubUrl: 'https://github.com/akibsatej/smartbank-crypto',
    image: '/src/assets/images/smartbank_preview_1781943461219.jpg',
    longDescription: `A Web3-inspired financial analytics companion tracking crypto tokens and fiat currency trends in one single-screen visualizer. High contrast UI components present dynamic asset allocations and transaction streams.

Key features:
- Complete relational D3 chart visualization representing account asset weights.
- Lazy-loaded search queries indexing historic ledgers containing up to 100,000 simulated blockchain blocks.
- Seamless Dark/Light responsive layout mimicking contemporary neon banking terminals.`,
    views: 712,
    likes: 185,
    featured: false
  }
];

export const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Architecting High-Performance Full Stack React Applications in 2026',
    brief: 'Delve into the modern frontend pipeline: state hydration, ESM packaging, CSS-in-JS alternatives, and strategies for achieving sub-second Largest Contentful Paint.',
    content: `## The Modern Full-Stack Pipeline in 2026

Building modern web applications requires tight cohesion between the client-side compilation systems and edge server orchestration. As micro-frontends and server-side component streaming continue to mature, optimization is no longer just "nice-to-have" — it's the defining factor of product conversions.

### 1. Stripping Out CSS-in-JS Bottlenecks
In 2026, runtime CSS-in-JS has largely been replaced by static Tailwind compiling engines, CSS modules, and custom Tailwind compiler plugins (e.g., Tailwind v4). This prevents blocking the main thread during hydration, as style sheets are compiled statically.

\`\`\`typescript
// Example: Stabilizing React dependency arrays to prevent re-renders
const memoizedData = useMemo(() => {
  return rawData.map(item => ({
    id: item.uuid,
    computedMetric: item.value * 1.085
  }));
}, [rawData]); // Avoid object references
\`\`\`

### 2. Microservice Edge Routing
Connecting React portals to Express backends running behind distributed proxy networks ensures that static assets are delivered from the nearest geography while API payloads are lazily resolved. Readying your app for this requires careful state structures.`,
    tags: ['React', 'Performance', 'Engineering'],
    date: 'June 12, 2026',
    readTime: '6 min read',
    author: 'Md. Akib Uddin Satej',
    views: 540,
    likes: 184
  },
  {
    id: 'blog-2',
    title: 'Why I Switched from Monoliths to Scale-to-Zero Cloud Environments',
    brief: 'A conceptual exploration of cost-effective deployment patterns, serverless cold starts, and why modern developer tools leverage isolated containers.',
    content: `## Demystifying Serverless Devops

Cost-efficiency is the driver behind modern software scaling. When running microservices that experience volatile traffic spikes, hosting standard dedicated VM nodes 24/7 is an unnecessary financial leakage. Here is how modern developers leverage scale-to-zero container architectures.

### Container Partitioning
By wrapping Express microservices in lightweight containers, cloud handlers can instantly boot instances inside 100ms on request arrivals:

*   **Zero Inactive Idle Cost**: When queries drop to zero, servers pause automatically.
*   **Decoupled Scaling**: Independent route handling prevents single-point crashes from freezing the complete platform.
*   **Security Sandboxing**: Containers restrict scope breaches, ensuring compromised APIs cannot compromise auxiliary environments.

### Mitigating Cold Starts
Cold starts remain a hurdle, but pre-warming bundles and modularizing database query initializers can bring startup delays well under acceptable thresholds!`,
    tags: ['DevOps', 'Cloud', 'Architecture'],
    date: 'April 28, 2026',
    readTime: '8 min read',
    author: 'Md. Akib Uddin Satej',
    views: 420,
    likes: 145
  },
  {
    id: 'blog-3',
    title: 'The Developer Guide to Secure API Proxies & Sanitized User Inputs',
    brief: 'Protecting your server variables and avoiding client-side credential leakages using robust Express proxies and secure cookie sessions.',
    content: `## API Security and Express Routing

A recurring security pitfall is embedding high-privileged APIs (e.g. OpenAI or custom provider tokens) directly into the browser client. No matter how obfuscated your React bundle is, end-users can capture keys instantly via their Network devtools tab.

### The Correct Middleware Proxy Pattern

Always proxy sensitive operations through server controllers. This keeps keys hidden in secure env variables:

\`\`\`typescript
// server.ts (Safe server-side API routing)
import express from 'express';
const app = express();

app.post('/api/complete', async (req, res) => {
  try {
    const response = await fetch('https://api.external.com/v1/auth', {
      headers: { 'Authorization': \`Bearer \${process.env.SECRET_API_KEY}\` }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});
\`\`\`

Using this decoupled architecture ensures zero direct exposure of your infrastructure.`,
    tags: ['Security', 'NodeJS', 'Database'],
    date: 'March 05, 2026',
    readTime: '5 min read',
    author: 'Md. Akib Uddin Satej',
    views: 310,
    likes: 112
  }
];

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 'srv-1',
    iconName: 'Code',
    title: 'Frontend Development',
    description: 'Developing high-fidelity single-page applications and server-rendered micro-frontend panels with pristine responsive layouts.',
    details: ['React, Next.js & Svelte ecosystem mastery', 'Tailwind CSS utility styling with desktop-first precision', 'W3C Web Content Accessibility (WCAG 2.1) compliance', 'Dynamic SVG layouts & complex interface animations']
  },
  {
    id: 'srv-2',
    iconName: 'Cpu',
    title: 'Backend Development',
    description: 'Architecting fast, scalable, and secure API routers and middleware layers that process microservices safely.',
    details: ['Robust Node.js and Express server frameworks', 'Secure JWT session handlers & RBAC authorization', 'Throttling rate limiters & sanitizing middleware utilities', 'CORS proxy solutions keeping secret credentials hidden']
  },
  {
    id: 'srv-3',
    iconName: 'Layers',
    title: 'Full Stack Development',
    description: 'Providing comprehensive end-to-end web engineering, bridging elegant client components with durable databases.',
    details: ['Robust full-stack architectural design', 'State reconciliation between client cache & server stores', 'Universal metadata compilation for organic SEO indexing', 'Comprehensive environment variable sandboxing']
  },
  {
    id: 'srv-4',
    iconName: 'Globe',
    title: 'API Development',
    description: 'Building pristine, RESTful and GraphQL endpoints engineered for heavy transaction processing.',
    details: ['Self-documenting, clean JSON response standards', 'Asynchronous file stream upload integrations', 'Lazy-loaded aggregation fields with structured telemetry', 'Error boundary payloads preventing system leakages']
  },
  {
    id: 'srv-5',
    iconName: 'Database',
    title: 'Database Design',
    description: 'Modeling high-performance data schemas, index optimization, and persistent memory caching.',
    details: ['NoSQL architectures (Firestore, MongoDB model mapping)', 'Relational SQL setups (PostgreSQL and MySQL partitions)', 'Indexed query performance optimizations', 'Data recovery structures & cloud backup systems']
  },
  {
    id: 'srv-6',
    iconName: 'Zap',
    title: 'Website Optimization',
    description: 'Refactoring existing codebases to achieve maximum Web Vitals scoring and elite lighthouse grades.',
    details: ['Offloading long JavaScript compile cycles using Web Workers', 'Lazy loading high-resolution visual previews', 'Static site caching mechanisms across global edge networks', 'Asset minification and redundant style tree pruning']
  }
];

export const DEFAULT_TIMELINE: TimelineEvent[] = [
  {
    id: 'time-1',
    year: '2026 - Present',
    title: 'Senior Full Stack Developer',
    subtitle: 'NexaTech Innovations LLC',
    description: 'Guiding a squad of five front-end developers, spearheading the core client portal rewrite, and designing scale-to-zero microservice routers.',
    accomplishments: [
      'Engineered an SVG metrics visualizer mapping 12,000 requests per minute with zero CPU lockages.',
      'Cut server maintenance spendings by 42% by migrating API controllers into scalable serverless containers.',
      'Introduced strict TypeScript type guard validation, shrinking production error bounds by 29%.'
    ]
  },
  {
    id: 'time-2',
    year: '2024 - 2026',
    title: 'Full Stack Developer',
    subtitle: 'ApexDigital Software Group',
    description: 'Built customer-facing SaaS dashboards and custom retail gateways. Engineered RESTful API integrations and automated email inquiry forms.',
    accomplishments: [
      'Built a custom e-commerce product cart integrating headless Stripe payments, completing 45,000+ orders.',
      'Optimized global webpack/vite compilation setups, slicing production build times from 3 minutes to 40 seconds.',
      'Implemented clean, secure user session handlers with encrypted cross-subdomain cookies.'
    ]
  },
  {
    id: 'time-3',
    year: '2023 - 2024',
    title: 'Frontend Developer',
    subtitle: 'ByteCraft agency',
    description: 'Designed high-fidelity responsive websites for corporate and e-commerce brands, ensuring W3C accessibility compliance.',
    accomplishments: [
      'Developed 35+ fully responsive, hand-crafted landing pages featuring elegant CSS and scroll triggers.',
      'Aesthetic refactoring of public client frontends, uplifting average mobile Lighthouse ratings from 62 to 95+.',
      'Introduced standardized atomic component files, reducing code duplication in shared assets by 34%.'
    ]
  }
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Vance',
    role: 'Vice President of Product',
    company: 'SaaSify Platforms',
    content: 'Akib Satej is an absolute outlier. His attention to detail, impeccable visual taste, and profound technical mastery over React systems allowed us to release our real-time metrics panel ahead of timeline. Outstanding communication throughout.',
    rating: 5,
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: 'test-2',
    name: 'Marcus Thorne',
    role: 'Technical Founder',
    company: 'Solstice Finance',
    content: 'Our crypto analytics application required incredible rendering speed and beautiful micro-interactions. Akib built an SVG chart dashboard that is fluid, completely bug-free, and handles 100k data points with ease. A stellar professional hire.',
    rating: 5,
    avatar: 'https://picsum.photos/seed/marcus/100/100'
  },
  {
    id: 'test-3',
    name: 'Nora Al-Mansoori',
    role: 'E-Commerce Director',
    company: 'Velo Luxury Group',
    content: 'We contracted Akib to optimize our checkout micro-funnel, which was suffering from bad Lighthouse ranks. He rebuilt our entire interface statically with Tailwind v4, resulting in a 34% conversion increase and instant page speeds.',
    rating: 5,
    avatar: 'https://picsum.photos/seed/nora/100/100'
  }
];

export const INITIAL_ANALYTICS: AnalyticsStats = {
  totalViews: 4504,
  projectViews: 1823,
  blogViews: 1210,
  messagesReceived: 4,
  dailyViews: [
    { date: 'Jun 12', views: 240, contactSubmissions: 1 },
    { date: 'Jun 13', views: 310, contactSubmissions: 0 },
    { date: 'Jun 14', views: 290, contactSubmissions: 1 },
    { date: 'Jun 15', views: 420, contactSubmissions: 2 },
    { date: 'Jun 16', views: 380, contactSubmissions: 0 },
    { date: 'Jun 17', views: 510, contactSubmissions: 0 },
    { date: 'Jun 18', views: 480, contactSubmissions: 1 }
  ]
};
