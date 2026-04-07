export const BUSINESS_INFO = {
  name: "Mentor Arena",
  phone: "0332 213 7898",
  accountHolder: "Fazal Shahid Latif",
  paymentMethods: ["Easypaisa", "JazzCash"],
  adminEmail: "accts.pak@gmail.com",
};

export const PRICING = {
  clarityCall: {
    title: "Clarity Call",
    price: "PKR 1,000",
    duration: "15 minutes",
    description: "A quick session to clear your doubts and find your path.",
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
    description: "Learn with peers. Class starts with 2 students, max 3.",
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

export const TIME_SLOTS = [
  "Clarity Call: 1 PM – 4 PM",
  "Clarity Call: 8 PM – 10 PM",
  "Mentorship: 4 PM – 8 PM",
  "Mentorship: 10 PM – 2 AM (Next Day)"
];

export const DAILY_SCHEDULE = {
  clarityCalls: ["1 PM – 4 PM", "8 PM – 10 PM"],
  mentorshipSessions: [
    { time: "4 PM – 8 PM", duration: "4 Hours" },
    { time: "10 PM – 2 AM", duration: "4 Hours", note: "Next Day" }
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
