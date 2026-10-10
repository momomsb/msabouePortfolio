import type { ProjectCategory, ProjectData } from "@/types";
import type { Localized } from "@/i18n/config";

/** Screenshot under /public/projects/<folder>/<file>.png, with its pixel size. */
function shot(folder: string, file: string, alt: Localized, width: number, height: number) {
  return { src: `/projects/${folder}/${file}.png`, alt, width, height };
}

const streamEtl = (file: string, alt: Localized) => shot("StreamETL", file, alt, 3200, 1800);
const healthCare = (file: string, alt: Localized) => shot("HealthCare", file, alt, 2880, 1800);
const alumni = (file: string, alt: Localized, width: number, height: number) => shot("Alumni-ENSAJ", file, alt, width, height);

/**
 * Projects: a short presentation, the technologies used and screenshots.
 * Portfolio rules: no dates, no repository links, no architecture details.
 *
 * Screenshots: put them in /public/projects/<Project>/, set `image` (cover)
 * and `gallery` (all screenshots, opened in a fullscreen viewer from the card).
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
    context: { en: "Internship · Attijariwafa Bank, Digital Center", fr: "Stage · Attijariwafa Bank, Digital Center" },
    categories: ["AI", "Data", "Backend"],
    technologies: ["Python", "LangChain", "LangGraph", "FastAPI", "PostgreSQL", "Pandas", "RAG", "Embeddings", "Vector Database"],
    image: null,
    featured: true,
  },
  {
    title: "StreamETL",
    slug: "stream-etl",
    description: {
      en: "A low-code platform to build real-time Kafka → Spark streaming pipelines by dragging and dropping blocks. The PySpark code is generated and deployed automatically on a Spark cluster.",
      fr: "Une plateforme low-code qui permet de construire des pipelines de streaming Kafka → Spark en glissant-déposant des blocs. Le code PySpark est généré et déployé automatiquement sur un cluster Spark.",
    },
    categories: ["Data", "Big Data", "Backend", "Frontend"],
    technologies: ["Kafka", "Spark", "PySpark", "FastAPI", "Python", "PostgreSQL", "React", "React Flow", "Docker", "Parquet"],
    image: "/projects/StreamETL/StreamETL.png",
    featured: false,
    gallery: [
      streamEtl("01_editor", { en: "Pipeline editor", fr: "Éditeur de pipeline" }),
      streamEtl("02_kafka_node_config", { en: "Kafka source configuration", fr: "Configuration d'une source Kafka" }),
      streamEtl("03_transform_config", { en: "Spark transformation configuration", fr: "Configuration d'une transformation Spark" }),
      streamEtl("06_generated_code", { en: "Generated PySpark code", fr: "Code PySpark généré" }),
      streamEtl("05_new_topic", { en: "Creating a Kafka topic", fr: "Création d'un topic Kafka" }),
      streamEtl("04_history", { en: "Pipeline version history", fr: "Historique des versions du pipeline" }),
      streamEtl("07_editor_light", { en: "Editor in light theme", fr: "Éditeur en thème clair" }),
      streamEtl("09_kafka_ui_messages", { en: "Topic messages in Kafka UI", fr: "Messages d'un topic dans Kafka UI" }),
      streamEtl("10_spark_master_ui", { en: "Spark master UI", fr: "Interface du Spark master" }),
      streamEtl("11_api_docs", { en: "Backend API documentation", fr: "Documentation de l'API backend" }),
    ],
  },
  {
    title: { en: "ENSAJ Alumni: Career Analytics Platform", fr: "ENSAJ Alumni : plateforme d'analyse des carrières" },
    slug: "alumni-career-trajectories",
    description: {
      en: "An intelligent, data-driven platform for predictive analysis of alumni career trajectories, built on web scraping and LLMs.",
      fr: "Une plateforme intelligente et data-driven d'analyse prédictive des trajectoires professionnelles des alumni, basée sur le web scraping et les LLMs.",
    },
    categories: ["AI", "Data", "Backend", "Frontend"],
    technologies: ["LLMs", "Selenium", "Requests", "BeautifulSoup", "Pandas", "PostgreSQL", "FastAPI", "React"],
    image: "/projects/Alumni-ENSAJ/Analyse_Par_Filiere.png",
    featured: false,
    gallery: [
      alumni("Dashboard-1", { en: "Global alumni overview", fr: "Vue globale des alumni" }, 1893, 819),
      alumni(
        "Dashboard-2",
        { en: "Geographic distribution and top hiring companies", fr: "Distribution géographique et principales entreprises d'embauche" },
        1893,
        817,
      ),
      alumni("Analyse_Par_Filiere", { en: "Analysis by program", fr: "Analyse par filière" }, 1894, 819),
      alumni("Trajectoire_carriere", { en: "Career trajectories", fr: "Trajectoires de carrière" }, 1892, 818),
      alumni(
        "ML_Tendances_Sectorielles",
        { en: "ML projection of sector trends", fr: "Prédiction ML des tendances sectorielles" },
        1893,
        818,
      ),
      alumni("Insight_strategic", { en: "Strategic insights for the school", fr: "Insights stratégiques pour l'école" }, 1895, 818),
    ],
  },
  {
    title: { en: "Boussole: Job-Market Course Recommender", fr: "Boussole : recommandation de formations selon le marché" },
    slug: "job-market-course-recommender",
    description: {
      en: "Import a CV, compare its skills with real job offers, and get the training that closes the gaps: a course and skills recommendation system driven by the job market.",
      fr: "Importez un CV, comparez ses compétences aux offres d'emploi réelles et obtenez les formations qui comblent les lacunes : un système de recommandation de formations guidé par le marché de l'emploi.",
    },
    categories: ["AI", "Data"],
    technologies: ["Python", "Selenium", "BeautifulSoup", "PyMuPDF", "LLMs", "MCP Server", "Streamlit"],
    image: "/projects/recommendation_de_cours/Ecart_des_competance.png",
    featured: false,
    gallery: [
      shot(
        "recommendation_de_cours",
        "Dashboard",
        { en: "CV analysis and extracted skills", fr: "Analyse du CV et compétences extraites" },
        1284,
        769,
      ),
      shot("recommendation_de_cours", "marcher_emploi", { en: "Job market overview", fr: "Vue du marché de l'emploi" }, 998, 766),
      shot(
        "recommendation_de_cours",
        "Ecart_des_competance",
        { en: "Skills gap against job offers", fr: "Écart de compétences face aux offres" },
        1281,
        769,
      ),
      shot(
        "recommendation_de_cours",
        "Formations",
        { en: "Recommended training path", fr: "Parcours de formations recommandé" },
        1027,
        769,
      ),
      shot(
        "recommendation_de_cours",
        "Offres_demploi",
        { en: "Job offers ranked by compatibility", fr: "Offres d'emploi triées par compatibilité" },
        1022,
        509,
      ),
    ],
  },
  {
    title: { en: "HIV Data BI Pipeline (UNICEF)", fr: "Chaîne décisionnelle BI : données VIH (UNICEF)" },
    slug: "hiv-data-bi-pipeline",
    description: {
      en: "A business-intelligence decision chain for analyzing HIV data (UNICEF), on the Microsoft BI stack.",
      fr: "Une chaîne décisionnelle BI pour l'analyse des données VIH (UNICEF), sur la stack Microsoft BI.",
    },
    categories: ["Data"],
    technologies: ["SSIS", "SSAS", "SSRS", "SQL Server", "Excel"],
    image: "/projects/VIH_UNICEF/first-photo.png",
    featured: false,
    gallery: [
      shot(
        "VIH_UNICEF",
        "first-photo",
        { en: "Pregnant women tested for HIV, by UNICEF region", fr: "Femmes enceintes testées pour le VIH, par région UNICEF" },
        941,
        567,
      ),
      shot(
        "VIH_UNICEF",
        "seconde_photo",
        { en: "Pregnant women tested for HIV, by year", fr: "Femmes enceintes testées pour le VIH, par année" },
        958,
        395,
      ),
      shot(
        "VIH_UNICEF",
        "Evolution_du_vih_par_annee",
        { en: "HIV incidence by year", fr: "Évolution de l'incidence du VIH par année" },
        952,
        547,
      ),
      shot(
        "VIH_UNICEF",
        "Evolution_annuelle_du_tar",
        { en: "Yearly ART trend among young people, by sex", fr: "Évolution annuelle du TAR chez les jeunes, par sexe" },
        1021,
        513,
      ),
      shot(
        "VIH_UNICEF",
        "taux_des-morts",
        { en: "HIV-related deaths: top 10 countries", fr: "Décès liés au VIH : top 10 des pays" },
        877,
        413,
      ),
      shot(
        "VIH_UNICEF",
        "repartition_des_pays_region",
        { en: "Countries by UNICEF region", fr: "Répartition des pays par région UNICEF" },
        1006,
        604,
      ),
    ],
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
    image: "/projects/HealthCare/01-accueil.png",
    featured: false,
    gallery: [
      healthCare("01-accueil", { en: "Home page", fr: "Page d'accueil" }),
      healthCare("02-a-propos", { en: "About", fr: "À propos" }),
      healthCare("03-nos-specialites", { en: "Medical specialties", fr: "Nos spécialités" }),
      healthCare("04-notre-etablissement", { en: "The facility", fr: "Notre établissement" }),
      healthCare("05-contact", { en: "Contact", fr: "Contact" }),
      healthCare("06-connexion", { en: "Sign in", fr: "Connexion" }),
      healthCare("07-inscription", { en: "Sign up", fr: "Inscription" }),
      healthCare("08-mot-de-passe-oublie", { en: "Forgot password", fr: "Mot de passe oublié" }),
    ],
  },
];

export const projectFilters: Array<"All" | ProjectCategory> = ["All", "AI", "Data", "Backend", "Frontend", "Big Data"];
