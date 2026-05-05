export const BUSINESS_INFO = {
  name: "Mentor Arena",
  phone: "923322137898",
  accountHolder: "Fazal Shahid Latif",
  paymentMethods: ["Easypaisa", "JazzCash"],
  adminEmail: "support@mentorarena.online",
};

export const PRICING = {
  clarityCall: {
    title: "Clarity Call",
    price: "PKR 1,000",
    duration: "15 minutes",
    description: "A quick session to answer your questions and find your path.",
  },
  oneToOne: {
    title: "1-to-1 Mentorship",
    price: "PKR 30,000",
    duration: "120-150 live hours",
    description: "Personalized attention, 2-4 hours daily. Your project, your pace.",
  },
  group: {
    title: "Group Mentorship",
    price: "PKR 15,000",
    duration: "2-3 students per batch",
    description: "Learn with peers. Classes start with 2 students, max 3.",
  },
};

export const SKILL_PATHS = [
  "Web Development",
  "SEO (Search Engine Optimization)",
  "Digital Marketing",
  "Social Media & Content",
  "Marketing Automation",
  "Affiliate Marketing",
];

export const CURRICULUM_FRAMEWORK = {
  pillars: [
    {
      id: "operator",
      title: "THE OPERATOR",
      description: "AI is not a subject to study—it's a tool to amplify your capabilities.",
      focus: "Productivity & AI Workflows"
    },
    {
      id: "optimization",
      title: "OPTIMIZATION",
      description: "A high-value product does not require high initial capital. Leverage AI workflows.",
      focus: "Value Creation & Efficiency"
    },
    {
      id: "execution",
      title: "EXECUTION",
      description: "Speed beats perfection. Learn to prototype rapidly and launch iterative solutions.",
      focus: "Launch & Iterate"
    }
  ],
  modules: [
    {
      id: "01",
      title: "UNDERSTANDING THE DIGITAL LANDSCAPE",
      description: "Evolution of learning: From memorization to execution. The rise of AI-powered workflows.",
      outcome: "Understand why traditional skills alone are no longer enough.",
      icon: "Globe"
    },
    {
      id: "02",
      title: "THE AI MINDSET SHIFT",
      description: "Moving from 'Learner' to 'Operator'. Understanding AI as a tool, not a subject.",
      outcome: "Adopt the mindset that AI amplifies those who already know how to produce.",
      icon: "Cpu"
    },
    {
      id: "03",
      title: "THINKING LIKE A PRODUCER",
      description: "Adopting a producer mindset. Identifying problems worth solving and building solutions.",
      outcome: "Transition from consumer to creator.",
      icon: "Target"
    }
  ]
};

export const COURSE_DETAILS = {
  "Web Development": [
    "HTML5 & Semantic Web",
    "CSS3, Flexbox & Grid Layouts",
    "Modern JavaScript (ES6+)",
    "React.js & Component Architecture",
    "Tailwind CSS for Rapid Styling",
    "Deploying to Cloud Platforms"
  ],
  "SEO (Search Engine Optimization)": [
    "Keyword Research & Intent Analysis",
    "On-Page Optimization & Technical SEO",
    "Content Strategy & SILO Structure",
    "Backlink Building & Outreach",
    "Local SEO & Google Business Profile",
    "Analytics & Search Console Mastery"
  ],
  "Digital Marketing": [
    "Marketing Fundamentals & Funnels",
    "PPC Advertising (Google & Meta)",
    "Email Marketing & Lead Nurturing",
    "Conversion Rate Optimization (CRO)",
    "Data-Driven Decision Making",
    "Brand Positioning & Messaging"
  ],
  "Social Media & Content": [
    "Content Pillars & Calendar Planning",
    "Copywriting for Social Platforms",
    "Video Content Strategy (Reels/TikTok)",
    "Community Building & Engagement",
    "Influencer Marketing Basics",
    "Social Media Analytics & Reporting"
  ],
  "Marketing Automation": [
    "Introduction to CRM Systems",
    "Automated Email Sequences",
    "Zapier & Workflow Integration",
    "Lead Scoring & Segmentation",
    "Chatbot Development Basics",
    "Scaling Operations with AI"
  ],
  "Affiliate Marketing": [
    "Niche Selection & Profitability",
    "Finding & Joining Affiliate Programs",
    "Building Authority Review Sites",
    "Traffic Generation Strategies",
    "Compliance & Legal Requirements",
    "Scaling to Multiple Income Streams"
  ]
};

export const TIME_SLOTS = [
  "Clarity Call: 11 AM – 1 PM",
  "Clarity Call: 6 PM – 8 PM",
  "Mentorship: 2 PM – 6 PM",
  "Mentorship: 8 PM – 12 AM"
];

export const DAILY_SCHEDULE = {
  clarityCalls: ["11 AM – 1 PM", "6 PM – 8 PM"],
  mentorshipSessions: [
    { time: "2 PM – 6 PM", duration: "4 Hours" },
    { time: "8 PM – 12 AM", duration: "4 Hours" }
  ]
};

export const COMPARISON_DATA = [
  {
    feature: "Project Ownership",
    conventional: "Student follows instructions; result is a replica of the last batch.",
    mentorArena: "Student takes ownership; every project is unique, like human DNA.",
  },
  {
    feature: "Learning Flow",
    conventional: "Theory first, practice later. Often disconnected from real work.",
    mentorArena: "Practice and theory run in parallel; simple explanations applied immediately.",
  },
  {
    feature: "Batch Size",
    conventional: "Large groups where students often get lost in the noise.",
    mentorArena: "Small batches (1-to-1 or max 3) to ensure every student is heard.",
  },
  {
    feature: "Mentor's Role",
    conventional: "Lecturer who delivers a fixed curriculum regardless of student niche.",
    mentorArena: "Channel that directs your raw power into productive skills and projects.",
  },
];

export const FAQ_DATA = [
  {
    question: "Do I get a certificate?",
    answer: "One real, working project built by you is the certificate that truly matters in the digital world. We focus on building your portfolio.",
  },
  {
    question: "What if I miss a class?",
    answer: "Since we have very small batches, we can adjust the schedule. However, consistency is key to your success.",
  },
  {
    question: "Can I pay in installments?",
    answer: "Currently, we require full payment upfront to secure your slot in our limited-capacity batches.",
  },
  {
    question: "What equipment do I need?",
    answer: "A working laptop and a stable internet connection are mandatory for live sessions.",
  },
];
