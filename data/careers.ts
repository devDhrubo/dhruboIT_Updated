export interface JobOpening {
  id: string;
  title: string;
  company: string;
  workType: string;
  employmentMode: string;
  compensation: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  whoShouldApply: string[];
  closingNote: string;
}

export const jobOpenings: JobOpening[] = [
  {
    id: "business-development-partner-remote",
    title: "Commission-Based Business Development Partner (Remote)",
    company: "Dhrubo IT",
    workType: "100% Remote",
    employmentMode: "Freelance / Partnership",
    compensation:
      "Performance-Based Commission (10–15% per successfully closed project)",
    about:
      "Dhrubo IT is a software development agency focused on building modern digital solutions for businesses. We are looking for motivated and result-driven individuals who can help us connect with international clients and bring new software development opportunities.",
    responsibilities: [
      "Find and connect with potential international clients.",
      "Generate qualified leads for software development projects.",
      "Reach out to businesses through LinkedIn, email, and other channels.",
      "Arrange meetings and communicate with potential clients.",
      "Help convert prospects into paying customers.",
      "Build long-term business relationships.",
    ],
    requirements: [
      "Good communication and negotiation skills.",
      "Basic understanding of software development services.",
      "Experience in lead generation, sales, or business development is a plus.",
      "Ability to find and approach international clients.",
      "Self-motivated and target-oriented.",
    ],
    benefits: [
      "10–15% commission on successfully closed projects.",
      "No earning limit.",
      "100% remote opportunity.",
      "Flexible working hours.",
      "Opportunity to build a long-term partnership with Dhrubo IT.",
    ],
    whoShouldApply: [
      "Freelance business developers.",
      "Independent sales representatives.",
      "Lead generation specialists.",
      "Anyone with the skills and network to bring software development clients.",
    ],
    closingNote:
      "Send us a short introduction about yourself and your relevant experience. Let's grow together with Dhrubo IT!",
  },
];
