import type { EngineeringDomainData, SkillGroupData } from "@/types";

/** "Engineering profile": domains of work and the tools used in each. */
export const engineeringDomains: EngineeringDomainData[] = [
  {
    id: "ai",
    title: { en: "AI · ML / DL", fr: "IA · ML / DL" },
    summary: {
      en: "Machine learning, deep learning, NLP and LLM agents with retrieval-augmented generation.",
      fr: "Machine learning, deep learning, NLP et agents LLM avec RAG.",
    },
    icon: "brain",
    technologies: ["Python", "Scikit-learn", "TensorFlow", "Hugging Face", "NLP", "LLMs", "LangChain", "LangGraph", "RAG"],
  },
  {
    id: "data",
    title: { en: "Data Engineering & Big Data", fr: "Data Engineering & Big Data" },
    summary: {
      en: "Pipelines that collect, transform and move data, from batch ETL to distributed processing and streaming.",
      fr: "Des pipelines qui collectent, transforment et acheminent la donnée, de l'ETL batch au traitement distribué et au streaming.",
    },
    icon: "database",
    technologies: ["SQL", "Pandas", "ETL pipelines", "Talend", "SSIS", "Hadoop", "Hive", "Spark", "PySpark", "Kafka"],
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
