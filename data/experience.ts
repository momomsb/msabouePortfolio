import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "attijariwafa-digital-center",
    company: "Attijariwafa Bank",
    team: "Digital Center",
    role: "Intern",
    type: "Internship",
    title: "AI agent for technical analysis of the Casablanca Stock Exchange",
    start: "2026-07-13",
    end: "2026-09-04",
    context:
      "Internship at the Digital Center of Attijariwafa Bank, focused on applying AI to the technical analysis of stocks listed on the Casablanca Stock Exchange.",
    problem:
      "Technical analysis means computing and interpreting many indicators — RSI, MACD, moving averages, support and resistance — for each stock. The goal was an AI agent able to run this analysis and explain it.",
    technologies: ["Python", "LangChain", "LangGraph", "FastAPI", "PostgreSQL", "Pandas", "RAG", "Embeddings", "Vector Database"],
    responsibilities: [
      "Processed and stored historical market data with Pandas and PostgreSQL.",
      "Implemented the technical indicators: RSI, MACD, EMA20, EMA50, support and resistance.",
      "Designed the AI agent's workflow with LangChain and LangGraph.",
      "Built a RAG layer with embeddings and a vector database to ground the agent's answers.",
      "Exposed the agent through a FastAPI backend.",
    ],
    // TODO: add measured outcomes (accuracy, time saved, adoption, demo feedback…).
    results: [],
    projectSlug: "ai-stock-analyst",
  },
  {
    id: "mtnma-full-stack",
    company: "Ministry of Digital Transformation and Administrative Modernization",
    role: "Full-Stack Developer",
    type: "Internship",
    title: "Internal web application for meeting management",
    start: "2025-07",
    end: "2025-07",
    location: "Nouakchott, Mauritania",
    context:
      "Internship at the Mauritanian Ministry of Digital Transformation and Administrative Modernization (Ministère de la Transformation Numérique et de la Modernisation de l'Administration).",
    problem:
      "Meetings were organized through administrative processes the ministry wanted to digitalize. The goal was an internal web application to manage them.",
    technologies: ["PHP", "Laravel", "React", "MySQL"],
    responsibilities: [
      "Developed an internal web application for managing meetings, as part of the digitalization of administrative processes.",
      "Built the backend with PHP (Laravel) on a MySQL database.",
      "Built the user interface with React.",
    ],
    // TODO: add outcomes (users, adoption, features delivered…).
    results: [],
  },
];
