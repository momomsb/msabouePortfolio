import type { ExperienceData } from "@/types";

/** Newest first. Text fields: a plain string or `{ en, fr }`. */
export const experiences: ExperienceData[] = [
  {
    id: "attijariwafa-digital-center",
    company: "Attijariwafa Bank",
    team: "Digital Center",
    role: { en: "Intern", fr: "Stagiaire" },
    location: { en: "Casablanca, Morocco", fr: "Casablanca, Maroc" },
    type: "internship",
    title: {
      en: "AI agent for technical analysis of the Casablanca Stock Exchange",
      fr: "Agent IA d'analyse technique pour la Bourse de Casablanca",
    },
    start: "2026-07-13",
    end: "2026-09-04",
    context: {
      en: "Internship at the Digital Center of Attijariwafa Bank, focused on applying AI to the technical analysis of stocks listed on the Casablanca Stock Exchange.",
      fr: "Stage au Digital Center d'Attijariwafa Bank, consacré à l'application de l'IA à l'analyse technique des valeurs cotées à la Bourse de Casablanca.",
    },
    problem: {
      en: "Technical analysis means computing and interpreting many indicators (RSI, MACD, moving averages, support and resistance) for each stock. The goal was an AI agent that answers investors' questions by relying on a dedicated technical analysis engine, and on reference documents for everything else.",
      fr: "L'analyse technique consiste à calculer et interpréter de nombreux indicateurs (RSI, MACD, moyennes mobiles, supports et résistances) pour chaque valeur. L'objectif : un agent IA qui répond aux questions des investisseurs en s'appuyant sur un moteur d'analyse technique dédié, et sur des documents de référence pour le reste.",
    },
    technologies: ["Python", "LangChain", "LangGraph", "FastAPI", "PostgreSQL", "Pandas", "RAG", "Embeddings", "Vector Database"],
    responsibilities: [
      {
        en: "Processed and stored historical market data with Pandas and PostgreSQL.",
        fr: "Traitement et stockage des données de marché historiques avec Pandas et PostgreSQL.",
      },
      {
        en: "Built the technical analysis engine that computes the indicators: RSI, MACD, EMA20, EMA50, support and resistance.",
        fr: "Développement du moteur d'analyse technique qui calcule les indicateurs : RSI, MACD, EMA20, EMA50, supports et résistances.",
      },
      {
        en: "Designed a ReAct agent with LangChain and LangGraph that calls analysis tools built on the engine (analyse_stock, compare_stocks, analyse_risque…).",
        fr: "Conception d'un agent ReAct avec LangChain et LangGraph qui appelle des outils d'analyse s'appuyant sur le moteur (analyse_stock, compare_stocks, analyse_risque…).",
      },
      {
        en: "Built a RAG tool (embeddings + vector database) for documentary questions: investment guides, getting started on the stock exchange, regulations.",
        fr: "Mise en place d'un outil RAG (embeddings + base vectorielle) pour les questions documentaires : guide d'investissement, premiers pas en bourse, réglementation.",
      },
      { en: "Exposed the agent through a FastAPI backend.", fr: "Exposition de l'agent via un backend FastAPI." },
    ],
  },
  {
    id: "mtnma-full-stack",
    company: {
      en: "Ministry of Digital Transformation and Administrative Modernization",
      fr: "Ministère de la Transformation Numérique et de la Modernisation de l'Administration",
    },
    role: { en: "Full-Stack Developer", fr: "Développeur Full-Stack" },
    type: "internship",
    title: {
      en: "Internal web application for meeting management",
      fr: "Application web interne de gestion des réunions",
    },
    start: "2025-07",
    end: "2025-07",
    location: { en: "Nouakchott, Mauritania", fr: "Nouakchott, Mauritanie" },
    context: {
      en: "Internship at the Mauritanian Ministry of Digital Transformation and Administrative Modernization.",
      fr: "Stage au Ministère mauritanien de la Transformation Numérique et de la Modernisation de l'Administration.",
    },
    problem: {
      en: "Meetings were organized through administrative processes the ministry wanted to digitalize. The goal was an internal web application to manage them.",
      fr: "Les réunions reposaient sur des processus administratifs que le ministère souhaitait digitaliser. L'objectif : une application web interne pour les gérer.",
    },
    technologies: ["PHP", "Laravel", "React", "MySQL"],
    responsibilities: [
      {
        en: "Developed an internal web application for managing meetings, as part of the digitalization of administrative processes.",
        fr: "Développement d'une application web interne de gestion des réunions, dans le cadre de la digitalisation des processus administratifs.",
      },
      {
        en: "Built the backend with PHP (Laravel) on a MySQL database.",
        fr: "Développement du backend en PHP (Laravel) sur une base MySQL.",
      },
      { en: "Built the user interface with React.", fr: "Développement de l'interface utilisateur avec React." },
    ],
  },
];
