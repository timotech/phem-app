export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: "beginner" | "intermediate" | "advanced";
  students: number;
  categories: string[];
  image: string;
  price: number;
  rating: number;
}

export const courseData: Course[] = [
  {
    id: "1",
    title: "Disease Surveillance and Epidemiology",
    description:
      "Learn about monitoring, detecting, and responding to disease outbreaks in Nigeria.",
    instructor: "Dr. Ifeanyi Okafor",
    level: "beginner",
    students: 1250,
    categories: ["Public Health", "Surveillance", "Disease Control"],
    image: "/55.jpg",
    price: 0,
    rating: 4.8,
  },
  {
    id: "2",
    title: "Infection Prevention and Control (IPC)",
    description:
      "Master infection prevention strategies in healthcare settings across Nigeria.",
    instructor: "Dr. Chioma Adeyemi",
    level: "intermediate",
    students: 890,
    categories: ["Healthcare", "Infection Control", "Safety"],
    image: "/51.png",
    price: 0,
    rating: 4.7,
  },
  {
    id: "3",
    title: "Immunization Programs and Vaccination",
    description:
      "Comprehensive guide to Nigeria's immunization programs and vaccine management.",
    instructor: "Prof. Emeka Nwosu",
    level: "intermediate",
    students: 1520,
    categories: ["Immunization", "Public Health", "Prevention"],
    image: "/52.jpg",
    price: 0,
    rating: 4.9,
  },
  {
    id: "4",
    title: "Laboratory Diagnosis and Testing",
    description:
      "Advanced techniques in laboratory diagnosis for infectious diseases.",
    instructor: "Dr. Oluwatoyin Adebayo",
    level: "advanced",
    students: 630,
    categories: ["Laboratory", "Diagnostics", "Testing"],
    image: "/53.jpg",
    price: 0,
    rating: 4.6,
  },
  {
    id: "5",
    title: "Community Health Education",
    description:
      "Strategies for effective health communication and community engagement.",
    instructor: "Mrs. Zainab Hassan",
    level: "beginner",
    students: 945,
    categories: ["Community Health", "Education", "Public Health"],
    image: "/54.jpg",
    price: 0,
    rating: 4.5,
  },
  {
    id: "6",
    title: "Outbreak Response and Management",
    description: "Rapid response protocols for disease outbreaks in Nigeria.",
    instructor: "Dr. Chukwudi Okonkwo",
    level: "advanced",
    students: 540,
    categories: ["Emergency Response", "Surveillance", "Disease Control"],
    image: "/41.jpg",
    price: 0,
    rating: 4.7,
  },
  {
    id: "7",
    title: "Disease Surveillance and Epidemiology",
    description:
      "Learn about monitoring, detecting, and responding to disease outbreaks in Nigeria.",
    instructor: "Dr. Ifeanyi Okafor",
    level: "beginner",
    students: 1250,
    categories: ["Public Health", "Surveillance", "Disease Control"],
    image: "/55.jpg",
    price: 0,
    rating: 4.8,
  },
  {
    id: "8",
    title: "Infection Prevention and Control (IPC)",
    description:
      "Master infection prevention strategies in healthcare settings across Nigeria.",
    instructor: "Dr. Chioma Adeyemi",
    level: "intermediate",
    students: 890,
    categories: ["Healthcare", "Infection Control", "Safety"],
    image: "/51.png",
    price: 0,
    rating: 4.7,
  },
  {
    id: "9",
    title: "Immunization Programs and Vaccination",
    description:
      "Comprehensive guide to Nigeria's immunization programs and vaccine management.",
    instructor: "Prof. Emeka Nwosu",
    level: "intermediate",
    students: 1520,
    categories: ["Immunization", "Public Health", "Prevention"],
    image: "/52.jpg",
    price: 0,
    rating: 4.9,
  },
  {
    id: "10",
    title: "Laboratory Diagnosis and Testing",
    description:
      "Advanced techniques in laboratory diagnosis for infectious diseases.",
    instructor: "Dr. Oluwatoyin Adebayo",
    level: "advanced",
    students: 630,
    categories: ["Laboratory", "Diagnostics", "Testing"],
    image: "/53.jpg",
    price: 0,
    rating: 4.6,
  },
];
