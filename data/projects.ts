import type { ProjectCategory, ProjectData } from "@/types";
import type { Localized } from "@/i18n/config";

/** Screenshot under /public/projects/StreamETL (all captured at 3200×1800). */
function shot(file: string, alt: Localized) {
  return { src: `/projects/StreamETL/${file}.png`, alt, width: 3200, height: 1800 };
}

/**
 * Add projects here. Leave `github` / `demo` as `null` when there is no
 * public link: the buttons are hidden automatically.
 * Text fields: a plain string or `{ en, fr }`.
 */
export const projects: ProjectData[] = [
  {
    title: "AI Stock Analyst",
    slug: "ai-stock-analyst",
    description: {
      en: "An AI agent dedicated to the technical analysis of the Casablanca Stock Exchange. It computes market indicators and explains them, grounded by retrieval.",
      fr: "Un agent IA dédié à l'analyse technique de la Bourse de Casablanca. Il calcule les indicateurs de marché et les explique, en s'appuyant sur la recherche documentaire (RAG).",
    },
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
    context: { en: "Internship · Attijariwafa Bank, Digital Center", fr: "Stage · Attijariwafa Bank, Digital Center" },
    highlightsTitle: { en: "Indicators", fr: "Indicateurs" },
    highlights: ["RSI", "MACD", "EMA20", "EMA50", "Support", { en: "Resistance", fr: "Résistance" }],
    pipeline: [
      { en: "Market data", fr: "Données de marché" },
      "Pandas",
      "PostgreSQL",
      { en: "Indicators", fr: "Indicateurs" },
      { en: "LangGraph agent + RAG", fr: "Agent LangGraph + RAG" },
      "FastAPI",
    ],
    hasCaseStudy: true,
  },
  {
    title: "StreamETL",
    slug: "stream-etl",
    description: {
      en: "A low-code platform to build real-time Kafka → Spark streaming pipelines by dragging and dropping blocks. The PySpark code is generated and deployed automatically on a Spark cluster.",
      fr: "Une plateforme low-code qui permet de construire des pipelines de streaming Kafka → Spark en glissant-déposant des blocs. Le code PySpark est généré et déployé automatiquement sur un cluster Spark.",
    },
    context: { en: "Visual designer for real-time data pipelines", fr: "Concepteur visuel de pipelines de données en temps réel" },
    categories: ["Data", "Big Data", "Backend", "Frontend"],
    technologies: [
      "Kafka",
      "Spark",
      "PySpark",
      "Spark Structured Streaming",
      "FastAPI",
      "Python",
      "Pydantic",
      "SQLAlchemy",
      "PostgreSQL",
      "React",
      "React Flow",
      "Vite",
      "Docker",
      "Docker Compose",
      "Parquet",
    ],
    image: "/projects/StreamETL/StreamETL.png",
    github: null,
    demo: null,
    featured: false,
    highlights: [
      { en: "Drag-and-drop pipeline editor", fr: "Éditeur de pipelines drag-and-drop" },
      { en: "PySpark code generation", fr: "Génération de code PySpark" },
      { en: "One-click deploy on Spark", fr: "Déploiement en un clic sur Spark" },
      { en: "Windows, watermarks & joins", fr: "Fenêtres, watermarks et jointures" },
    ],
    pipeline: ["Kafka", "ParseJSON", "GroupBy", "Aggregate", { en: "Kafka / Parquet", fr: "Kafka / Parquet" }],
    gallery: [
      shot("01_editor", {
        en: "Pipeline editor: Kafka source, ParseJSON transform and Parquet sink",
        fr: "Éditeur de pipeline : source Kafka, transformation ParseJSON et destination Parquet",
      }),
      shot("02_kafka_node_config", { en: "Kafka source configuration", fr: "Configuration d'une source Kafka" }),
      shot("03_transform_config", { en: "Spark transformation configuration", fr: "Configuration d'une transformation Spark" }),
      shot("06_generated_code", { en: "Generated PySpark code", fr: "Code PySpark généré" }),
      shot("05_new_topic", { en: "Creating a Kafka topic", fr: "Création d'un topic Kafka" }),
      shot("04_history", { en: "Pipeline version history", fr: "Historique des versions du pipeline" }),
      shot("07_editor_light", { en: "Editor in light theme", fr: "Éditeur en thème clair" }),
      shot("09_kafka_ui_messages", { en: "Topic messages in Kafka UI", fr: "Messages d'un topic dans Kafka UI" }),
      shot("10_spark_master_ui", { en: "Spark master UI running the job", fr: "Interface du Spark master exécutant le job" }),
      shot("11_api_docs", { en: "FastAPI documentation of the backend", fr: "Documentation FastAPI du backend" }),
    ],
    hasCaseStudy: true,
  },
  {
    title: { en: "Alumni Career Trajectory Platform", fr: "Plateforme d'analyse des trajectoires alumni" },
    slug: "alumni-career-trajectories",
    description: {
      en: "An intelligent, data-driven platform for predictive analysis of alumni career trajectories, built on web scraping and LLMs.",
      fr: "Une plateforme intelligente et data-driven d'analyse prédictive des trajectoires professionnelles des alumni, basée sur le web scraping et les LLMs.",
    },
    categories: ["AI", "Data", "Backend", "Frontend"],
    technologies: ["LLMs", "Selenium", "Requests", "BeautifulSoup", "Pandas", "PostgreSQL", "FastAPI", "React"],
    image: null,
    github: null,
    demo: null,
    featured: false,
    highlights: [
      "Web scraping",
      { en: "Predictive analysis", fr: "Analyse prédictive" },
      "LLMs",
      { en: "Career trajectories", fr: "Trajectoires professionnelles" },
    ],
  },
  {
    title: { en: "Job-Market Course Recommender", fr: "Recommandation de cours selon le marché de l'emploi" },
    slug: "job-market-course-recommender",
    description: {
      en: "A recommendation system for courses and skills, driven by what the job market actually asks for.",
      fr: "Un système de recommandation de cours et de compétences, guidé par ce que le marché de l'emploi demande réellement.",
    },
    categories: ["AI", "Data", "Backend", "Frontend"],
    technologies: ["Python", "BeautifulSoup", "Selenium", "NLP", "spaCy", "Transformers", "Scikit-learn", "FastAPI", "React"],
    image: null,
    github: null,
    demo: null,
    featured: false,
    highlights: [
      { en: "Recommendation system", fr: "Système de recommandation" },
      "NLP",
      { en: "Job-market data", fr: "Données du marché de l'emploi" },
      "Web scraping",
    ],
  },
  {
    title: { en: "HIV Data BI Pipeline (UNICEF)", fr: "Chaîne décisionnelle BI : données VIH (UNICEF)" },
    slug: "hiv-data-bi-pipeline",
    description: {
      en: "A business-intelligence decision chain for analyzing HIV data (UNICEF), from ETL to OLAP cube to reports, on the Microsoft BI stack.",
      fr: "Une chaîne décisionnelle BI pour l'analyse des données VIH (UNICEF), de l'ETL au cube OLAP jusqu'aux rapports, sur la stack Microsoft BI.",
    },
    categories: ["Data"],
    technologies: ["SSIS", "SSAS", "SSRS", "SQL Server", "Excel"],
    image: null,
    github: null,
    demo: null,
    featured: false,
    highlights: ["ETL (SSIS)", { en: "OLAP cube (SSAS)", fr: "Cube OLAP (SSAS)" }, "Reporting (SSRS)"],
  },
  {
    title: "HealthCare Manager",
    slug: "healthcare-manager",
    description: {
      en: "A complete medical-practice management system: appointment booking, patient records and online prescriptions, integrated with Google Calendar.",
      fr: "Un système complet de gestion de cabinet médical : prise de rendez-vous, dossiers patients et ordonnances en ligne, intégré à Google Calendar.",
    },
    categories: ["Backend", "Frontend"],
    technologies: ["Spring Boot", "Java", "React", "TypeScript", "TailwindCSS", "Google Calendar API"],
    image: null,
    github: "https://github.com/momomsb/Health-Care-Backend",
    repositories: [
      { label: "Backend", url: "https://github.com/momomsb/Health-Care-Backend" },
      { label: "Frontend", url: "https://github.com/momomsb/Health-Care-Frontend" },
      { label: { en: "Design", fr: "Conception" }, url: "https://github.com/momomsb/Health-Care-conception" },
    ],
    demo: null,
    featured: false,
    // From the repositories' creation date (Nov 2025).
    year: 2025,
    highlights: [
      { en: "Appointments", fr: "Rendez-vous" },
      { en: "Patient records", fr: "Dossiers patients" },
      { en: "Online prescriptions", fr: "Ordonnances en ligne" },
      "Google Calendar API",
    ],
  },
];

export const projectFilters: Array<"All" | ProjectCategory> = ["All", "AI", "Data", "Backend", "Frontend", "Big Data"];
