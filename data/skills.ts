import type { EngineeringDomain, SkillGroup } from "@/types";

/** "Engineering profile": domains of work and the tools used in each. */
export const engineeringDomains: EngineeringDomain[] = [
  {
    id: "ai-ml",
    title: "AI / Machine Learning",
    summary: "LLM agents, retrieval-augmented generation, NLP and classical ML.",
    icon: "brain",
    technologies: ["Python", "Scikit-learn", "TensorFlow", "NLP", "LLMs", "LangChain", "LangGraph", "Hugging Face", "RAG"],
  },
  {
    id: "data-engineering",
    title: "Data Engineering & ETL",
    summary: "Collecting, cleaning and moving data so it can be trusted downstream.",
    icon: "workflow",
    technologies: ["Pandas", "ETL pipelines", "Talend", "SSIS", "Selenium", "BeautifulSoup"],
  },
  {
    id: "analytics-bi",
    title: "Analytics & BI",
    summary: "Decision chains, OLAP and dashboards that turn data into answers.",
    icon: "chart",
    technologies: ["Power BI", "SSAS", "SSRS", "Excel", "Matplotlib", "Seaborn"],
  },
  {
    id: "databases",
    title: "Databases",
    summary: "Relational and document stores, modeled for the workload.",
    icon: "database",
    technologies: ["SQL", "PostgreSQL", "MySQL", "SQL Server", "MongoDB", "NoSQL"],
  },
  {
    id: "backend",
    title: "Backend Engineering",
    summary: "APIs and services that put data and models into production.",
    icon: "server",
    technologies: ["FastAPI", "Java", "Spring Boot", "PHP", "Laravel"],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    summary: "Interfaces that make complex systems usable.",
    icon: "layout",
    technologies: ["React", "Next.js", "JavaScript", "TailwindCSS", "HTML", "CSS"],
  },
  {
    id: "big-data",
    title: "Big Data",
    summary: "Distributed storage, processing and streaming at scale.",
    icon: "layers",
    technologies: ["Hadoop", "Spark", "PySpark", "Kafka"],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    summary: "Reproducible environments and collaborative delivery.",
    icon: "cloud",
    technologies: ["AWS", "Docker", "Git", "GitHub", "Linux"],
  },
];

/**
 * "Tech stack": every tool, grouped by category.
 * `symbol` overrides the derived two-letter symbol when two tools would collide.
 */
export const techStack: SkillGroup[] = [
  {
    id: "programming",
    title: "Programming",
    description: "Languages",
    skills: [{ name: "Python" }, { name: "Java" }, { name: "JavaScript" }, { name: "PHP" }, { name: "C" }, { name: "SQL" }],
  },
  {
    id: "ai",
    title: "AI & ML",
    description: "Models, agents & retrieval",
    skills: [
      { name: "Machine Learning" },
      { name: "Scikit-learn" },
      { name: "TensorFlow" },
      { name: "NLP" },
      { name: "spaCy", symbol: "Sy" },
      { name: "Transformers" },
      { name: "LLMs", symbol: "Lm" },
      { name: "LangChain" },
      { name: "LangGraph" },
      { name: "Hugging Face" },
      { name: "RAG" },
    ],
  },
  {
    id: "data",
    title: "Data Engineering",
    description: "Collection, ETL & processing",
    skills: [
      { name: "Pandas" },
      { name: "ETL pipelines", symbol: "Et" },
      { name: "Talend" },
      { name: "SSIS", symbol: "Is" },
      { name: "Selenium", symbol: "Sl" },
      { name: "BeautifulSoup" },
    ],
  },
  {
    id: "big-data",
    title: "Big Data",
    description: "Distributed processing & streaming",
    skills: [{ name: "Hadoop" }, { name: "Spark" }, { name: "PySpark" }, { name: "Kafka" }],
  },
  {
    id: "analytics",
    title: "Analytics & BI",
    description: "OLAP, reporting & visualization",
    skills: [
      { name: "Power BI" },
      { name: "SSAS", symbol: "As" },
      { name: "SSRS", symbol: "Rs" },
      { name: "Excel" },
      { name: "Matplotlib" },
      { name: "Seaborn" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    description: "Relational & NoSQL",
    skills: [{ name: "PostgreSQL", symbol: "Pg" }, { name: "MySQL" }, { name: "SQL Server", symbol: "Sv" }, { name: "MongoDB" }],
  },
  {
    id: "web",
    title: "Web",
    description: "APIs & interfaces",
    skills: [
      { name: "FastAPI" },
      { name: "Spring Boot" },
      { name: "Laravel" },
      { name: "React" },
      { name: "Next.js" },
      { name: "TailwindCSS" },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    id: "tools",
    title: "Cloud & Tools",
    description: "Delivery, cloud & design",
    skills: [{ name: "AWS" }, { name: "Docker" }, { name: "Git" }, { name: "GitHub" }, { name: "Linux" }, { name: "Figma" }],
  },
];
