import type { Project, ProjectCategory } from "@/types";

/**
 * Add projects here. Leave `github` / `demo` as `null` when there is no
 * public link: the buttons are hidden automatically.
 */
export const projects: Project[] = [
  {
    title: "AI Stock Analyst",
    slug: "ai-stock-analyst",
    description:
      "An AI agent dedicated to the technical analysis of the Casablanca Stock Exchange. It computes market indicators and explains them, grounded by retrieval.",
    categories: ["AI", "Data", "Backend"],
    technologies: [
      "Python",
      "LangChain",
      "LangGraph",
      "FastAPI",
      "PostgreSQL",
      "Pandas",
      "RAG",
      "Embeddings",
      "Vector Database",
      "Technical Indicators",
    ],
    image: null,
    github: null,
    demo: null,
    featured: true,
    year: 2026,
    context: "Internship · Attijariwafa Bank, Digital Center",
    highlightsTitle: "Indicators",
    highlights: ["RSI", "MACD", "EMA20", "EMA50", "Support", "Resistance"],
    pipeline: ["Market data", "Pandas", "PostgreSQL", "Indicators", "LangGraph agent + RAG", "FastAPI"],
    hasCaseStudy: true,
  },
  {
    title: "Alumni Career Trajectory Platform",
    slug: "alumni-career-trajectories",
    description:
      "An intelligent, data-driven platform for predictive analysis of alumni career trajectories, built on web scraping and LLMs.",
    categories: ["AI", "Data", "Backend", "Frontend"],
    technologies: ["LLMs", "Selenium", "Requests", "BeautifulSoup", "Pandas", "PostgreSQL", "FastAPI", "React"],
    image: null,
    github: null,
    demo: null,
    featured: false,
    highlights: ["Web scraping", "Predictive analysis", "LLMs", "Career trajectories"],
  },
  {
    title: "Job-Market Course Recommender",
    slug: "job-market-course-recommender",
    description: "A recommendation system for courses and skills, driven by what the job market actually asks for.",
    categories: ["AI", "Data", "Backend", "Frontend"],
    technologies: ["Python", "BeautifulSoup", "Selenium", "NLP", "spaCy", "Transformers", "Scikit-learn", "FastAPI", "React"],
    image: null,
    github: null,
    demo: null,
    featured: false,
    highlights: ["Recommendation system", "NLP", "Job-market data", "Web scraping"],
  },
  {
    title: "HIV Data BI Pipeline (UNICEF)",
    slug: "hiv-data-bi-pipeline",
    description:
      "A business-intelligence decision chain for analyzing HIV data (UNICEF), from ETL to OLAP cube to reports, on the Microsoft BI stack.",
    categories: ["Data"],
    technologies: ["SSIS", "SSAS", "SSRS", "SQL Server", "Excel"],
    image: null,
    github: null,
    demo: null,
    featured: false,
    highlights: ["ETL (SSIS)", "OLAP cube (SSAS)", "Reporting (SSRS)"],
  },
  {
    title: "HealthCare Manager",
    slug: "healthcare-manager",
    description:
      "A complete medical-practice management system: appointment booking, patient records and online prescriptions, integrated with Google Calendar.",
    categories: ["Backend", "Frontend"],
    technologies: ["Spring Boot", "Java", "React", "TypeScript", "TailwindCSS", "Google Calendar API"],
    image: null,
    github: "https://github.com/momomsb/Health-Care-Backend",
    repositories: [
      { label: "Backend", url: "https://github.com/momomsb/Health-Care-Backend" },
      { label: "Frontend", url: "https://github.com/momomsb/Health-Care-Frontend" },
      { label: "Design", url: "https://github.com/momomsb/Health-Care-conception" },
    ],
    demo: null,
    featured: false,
    // From the repositories' creation date (Nov 2025).
    year: 2025,
    highlights: ["Appointments", "Patient records", "Online prescriptions", "Google Calendar API"],
  },
];

export const projectFilters: Array<"All" | ProjectCategory> = ["All", "AI", "Data", "Backend", "Frontend", "Big Data"];
