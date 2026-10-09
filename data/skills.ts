import type { EngineeringDomainData, SkillGroupData } from "@/types";

/** "Engineering profile": domains of work and the tools used in each. */
export const engineeringDomains: EngineeringDomainData[] = [
  {
    id: "ai-ml",
    title: { en: "AI / Machine Learning", fr: "IA / Machine Learning" },
    summary: {
      en: "LLM agents, retrieval-augmented generation, NLP and classical ML.",
      fr: "Agents LLM, RAG, NLP et machine learning classique.",
    },
    icon: "brain",
    technologies: ["Python", "Scikit-learn", "TensorFlow", "NLP", "LLMs", "LangChain", "LangGraph", "Hugging Face", "RAG"],
  },
  {
    id: "data-engineering",
    title: "Data Engineering & ETL",
    summary: {
      en: "Collecting, cleaning and moving data so it can be trusted downstream.",
      fr: "Collecter, nettoyer et acheminer la donnée pour qu'elle soit fiable en aval.",
    },
    icon: "workflow",
    technologies: ["Pandas", "ETL pipelines", "Talend", "SSIS", "Selenium", "BeautifulSoup"],
  },
  {
    id: "analytics-bi",
    title: "Analytics & BI",
    summary: {
      en: "Decision chains, OLAP and dashboards that turn data into answers.",
      fr: "Chaînes décisionnelles, OLAP et tableaux de bord qui transforment la donnée en réponses.",
    },
    icon: "chart",
    technologies: ["Power BI", "SSAS", "SSRS", "Excel", "Matplotlib", "Seaborn"],
  },
  {
    id: "databases",
    title: { en: "Databases", fr: "Bases de données" },
    summary: {
      en: "Relational and document stores, modeled for the workload.",
      fr: "Bases relationnelles et documentaires, modélisées selon l'usage.",
    },
    icon: "database",
    technologies: ["SQL", "PostgreSQL", "MySQL", "SQL Server", "MongoDB", "NoSQL"],
  },
  {
    id: "backend",
    title: { en: "Backend Engineering", fr: "Ingénierie backend" },
    summary: {
      en: "APIs and services that put data and models into production.",
      fr: "APIs et services qui mettent la donnée et les modèles en production.",
    },
    icon: "server",
    technologies: ["FastAPI", "Java", "Spring Boot"],
  },
  {
    id: "frontend",
    title: { en: "Frontend Development", fr: "Développement frontend" },
    summary: { en: "Interfaces that make complex systems usable.", fr: "Des interfaces qui rendent les systèmes complexes utilisables." },
    icon: "layout",
    technologies: ["React", "Next.js", "JavaScript", "TailwindCSS"],
  },
  {
    id: "big-data",
    title: "Big Data",
    summary: {
      en: "Distributed storage, processing and streaming at scale.",
      fr: "Stockage, traitement distribué et streaming à grande échelle.",
    },
    icon: "layers",
    technologies: ["Hadoop", "Hive", "Spark", "PySpark", "Kafka"],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    summary: {
      en: "Reproducible environments and collaborative delivery.",
      fr: "Environnements reproductibles et livraison collaborative.",
    },
    icon: "cloud",
    technologies: ["AWS", "Docker", "Git", "GitHub", "Linux"],
  },
];

/**
 * "Tech stack": every tool, grouped by category.
 * `logo`: a Simple Icons slug (https://simpleicons.org) for the brand logo.
 * `icon`: a generic icon when no brand logo exists (see GenericIcon in types).
 */
export const techStack: SkillGroupData[] = [
  {
    id: "programming",
    title: { en: "Programming", fr: "Programmation" },
    description: { en: "Languages", fr: "Langages" },
    skills: [
      { name: "Python", logo: "python" },
      { name: "Java", logo: "openjdk" },
      { name: "JavaScript", logo: "javascript" },
      { name: "SQL", icon: "database" },
    ],
  },
  {
    id: "ai",
    title: { en: "AI & ML", fr: "IA & ML" },
    description: { en: "Models, agents & retrieval", fr: "Modèles, agents et recherche" },
    skills: [
      { name: "LangChain", logo: "langchain" },
      { name: "LangGraph", logo: "langgraph" },
      { name: "LLMs", icon: "sparkles" },
      { name: "RAG", icon: "search" },
      { name: "Hugging Face", logo: "huggingface" },
      { name: "Transformers", icon: "network" },
      { name: "Scikit-learn", logo: "scikitlearn" },
      { name: "TensorFlow", logo: "tensorflow" },
      { name: "spaCy", logo: "spacy" },
      { name: "NLP", icon: "message" },
      { name: "Machine Learning", icon: "brain" },
    ],
  },
  {
    id: "data",
    title: "Data Engineering",
    description: { en: "Collection, ETL & processing", fr: "Collecte, ETL et traitement" },
    skills: [
      { name: "Pandas", logo: "pandas" },
      { name: "ETL pipelines", icon: "workflow" },
      { name: "Talend", logo: "talend" },
      { name: "SSIS", icon: "workflow" },
      { name: "Selenium", logo: "selenium" },
      { name: "BeautifulSoup", icon: "code" },
    ],
  },
  {
    id: "big-data",
    title: "Big Data",
    description: { en: "Hadoop ecosystem, Spark & streaming", fr: "Écosystème Hadoop, Spark et streaming" },
    skills: [
      { name: "Hadoop", logo: "apachehadoop" },
      { name: "Hive", logo: "apachehive" },
      { name: "Spark", logo: "apachespark" },
      { name: "PySpark", logo: "apachespark" },
      { name: "Kafka", logo: "apachekafka" },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & BI",
    description: { en: "OLAP, reporting & visualization", fr: "OLAP, reporting et visualisation" },
    skills: [
      { name: "Power BI", icon: "chart" },
      { name: "SSAS", icon: "cube" },
      { name: "SSRS", icon: "report" },
      { name: "Excel", icon: "sheet" },
      { name: "Matplotlib", icon: "lineChart" },
      { name: "Seaborn", icon: "lineChart" },
    ],
  },
  {
    id: "databases",
    title: { en: "Databases", fr: "Bases de données" },
    description: { en: "Relational & NoSQL", fr: "Relationnel et NoSQL" },
    skills: [
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "MySQL", logo: "mysql" },
      { name: "SQL Server", icon: "database" },
      { name: "MongoDB", logo: "mongodb" },
    ],
  },
  {
    id: "web",
    title: "Web",
    description: { en: "APIs & interfaces", fr: "APIs et interfaces" },
    skills: [
      { name: "FastAPI", logo: "fastapi" },
      { name: "Spring Boot", logo: "springboot" },
      { name: "React", logo: "react" },
      { name: "Next.js", logo: "nextdotjs" },
      { name: "TailwindCSS", logo: "tailwindcss" },
    ],
  },
  {
    id: "tools",
    title: { en: "Cloud & Tools", fr: "Cloud & outils" },
    description: { en: "Cloud, containers and versioning", fr: "Cloud, conteneurs et versioning" },
    skills: [
      { name: "AWS", icon: "cloud" },
      { name: "Docker", logo: "docker" },
      { name: "Git", logo: "git" },
      { name: "GitHub", logo: "github" },
      { name: "Linux", logo: "linux" },
    ],
  },
];
