import type { CaseStudy } from "@/types";

/**
 * Long-form case studies, keyed by project slug.
 * Blocks with an empty `body` are hidden in production and flagged in development.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-stock-analyst",
    tagline: "From raw market data to an AI agent that explains technical signals.",
    problem: {
      id: "problem",
      title: "Problem",
      body: [
        "Technical analysis of a stock relies on many indicators: momentum, trend, moving averages, price levels. Computing them is mechanical; interpreting them consistently, for every listed stock, is slow and repetitive.",
        "The question behind the project: can an AI agent compute these signals reliably and turn them into a clear, grounded explanation?",
      ],
    },
    context: {
      id: "context",
      title: "Context",
      body: [
        "Built during an internship at the Digital Center of Attijariwafa Bank (July to September 2026), with the Casablanca Stock Exchange as the target market.",
      ],
    },
    solution: {
      id: "solution",
      title: "Solution",
      body: [
        "A pipeline that prepares market data and computes indicators deterministically, combined with an LLM agent that reasons over those results and over retrieved reference context, served through an API.",
      ],
      bullets: [
        "Indicators are computed in code, not guessed by the model.",
        "The agent's workflow is orchestrated with LangGraph.",
        "Answers are grounded with retrieval (embeddings + vector database).",
        "Everything is exposed through a FastAPI backend.",
      ],
    },
    architecture: {
      id: "architecture",
      title: "Architecture",
      body: [
        "Four layers: data preparation, storage and indicator computation, the agent with its retrieval layer, and the API that serves it.",
      ],
      layers: [
        {
          title: "Ingestion",
          nodes: [
            { label: "Market data", detail: "Casablanca Stock Exchange history" },
            { label: "Pandas", detail: "Cleaning & structuring" },
          ],
        },
        {
          title: "Storage & signals",
          nodes: [
            { label: "PostgreSQL", detail: "Historical market data" },
            { label: "Indicator engine", detail: "RSI · MACD · EMA20/50 · S/R" },
          ],
        },
        {
          title: "Intelligence",
          nodes: [
            { label: "LangGraph agent", detail: "Orchestrated analysis steps (LangChain)" },
            { label: "RAG", detail: "Embeddings + vector database" },
          ],
        },
        {
          title: "Serving",
          nodes: [
            { label: "FastAPI", detail: "API exposing the agent" },
            { label: "API consumers", detail: "Analysis requests & answers" },
          ],
        },
      ],
    },
    stack: [
      { name: "Python", role: "Core language across the pipeline and the agent" },
      { name: "Pandas", role: "Data cleaning and structuring" },
      { name: "PostgreSQL", role: "Storage for historical market data" },
      { name: "Technical Indicators", role: "RSI, MACD, EMA20, EMA50, support & resistance" },
      { name: "LangChain", role: "LLM tooling and integrations" },
      { name: "LangGraph", role: "Agent workflow orchestration" },
      { name: "RAG", role: "Grounds answers in retrieved context" },
      { name: "Embeddings", role: "Semantic representation for retrieval" },
      { name: "Vector Database", role: "Similarity search over embedded context" },
      { name: "FastAPI", role: "API layer serving the agent" },
    ],
    dataPipeline: {
      id: "data-pipeline",
      title: "Data Pipeline",
      body: [
        "Historical market data is cleaned and structured with Pandas, then persisted in PostgreSQL so indicators can be recomputed and queried consistently.",
      ],
    },
    aiAgent: {
      id: "ai-agent",
      title: "AI Agent",
      body: [
        "The agent is built with LangChain and orchestrated with LangGraph: the analysis is broken into explicit steps, so the model works from computed indicators and retrieved context rather than from memory.",
      ],
    },
    technicalAnalysis: {
      id: "technical-analysis",
      title: "Technical Analysis",
      body: ["The agent works from a set of classic technical indicators."],
      indicators: [
        {
          name: "RSI",
          fullName: "Relative Strength Index",
          description: "Momentum oscillator (0 to 100) used to spot overbought and oversold conditions.",
        },
        {
          name: "MACD",
          fullName: "Moving Average Convergence Divergence",
          description: "Trend-following momentum indicator built from the difference of two EMAs.",
        },
        {
          name: "EMA20",
          fullName: "20-period Exponential Moving Average",
          description: "Short-term trend, weighted towards recent prices.",
        },
        {
          name: "EMA50",
          fullName: "50-period Exponential Moving Average",
          description: "Medium-term trend; crossings with EMA20 signal trend changes.",
        },
        {
          name: "Support",
          fullName: "Support level",
          description: "Price zone where buying pressure has historically stopped declines.",
        },
        {
          name: "Resistance",
          fullName: "Resistance level",
          description: "Price zone where selling pressure has historically capped rallies.",
        },
      ],
    },
    // TODO: document real, measured outcomes.
    results: { id: "results", title: "Results", body: [] },
    // TODO: what you learned, technical and non-technical.
    lessons: { id: "lessons", title: "Lessons Learned", body: [] },
  },
];
