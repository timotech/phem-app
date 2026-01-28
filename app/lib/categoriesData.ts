import { Course, courseData } from "./courseData";

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  courses?: Course[];
}

export const ncdicCategories: Category[] = [
  {
    id: "1",
    name: "Disease Prevention",
    description: "Learn about disease prevention strategies and protocols",
    icon: "🛡️",
    courses: courseData.filter((c) => c.categories.includes("Prevention")),
  },
  {
    id: "2",
    name: "Epidemiology",
    description: "Understanding disease patterns and outbreak investigation",
    icon: "📊",
    courses: courseData.filter((c) => c.categories.includes("Surveillance")),
  },
  {
    id: "3",
    name: "Laboratory Services",
    description: "Lab testing, diagnostics, and quality assurance",
    icon: "🔬",
    courses: courseData.filter((c) => c.categories.includes("Laboratory")),
  },
  {
    id: "4",
    name: "Public Health Training",
    description: "Professional development for health workers",
    icon: "📚",
    courses: courseData.filter((c) => c.categories.includes("Public Health")),
  },
  {
    id: "5",
    name: "Surveillance Systems",
    description: "Disease surveillance and monitoring systems",
    icon: "📡",
    courses: courseData.filter((c) => c.categories.includes("Surveillance")),
  },
  {
    id: "6",
    name: "Emergency Response",
    description: "Crisis management and emergency preparedness",
    icon: "🚨",
    courses: courseData.filter((c) =>
      c.categories.includes("Emergency Response"),
    ),
  },
];
