import type { CaseStudyData } from "@/types";

/**
 * Long-form case studies, one per project slug.
 * Sections render in order. Kinds: "text", "architecture", "features",
 * "stack", "indicators", "gallery" (screenshots come from the project's `gallery`).
 * A "text" section with an empty `body` is hidden in production and flagged in development.
 * Text fields: a plain string or `{ en, fr }`.
 */
export const caseStudies: CaseStudyData[] = [
  {
    slug: "stream-etl",
    tagline: {
      en: "Design a Kafka → Spark streaming pipeline on a canvas; StreamETL generates, deploys and runs the PySpark job.",
      fr: "Dessinez un pipeline de streaming Kafka → Spark sur un canvas ; StreamETL génère, déploie et exécute le job PySpark.",
    },
    sections: [
      {
        kind: "text",
        id: "overview",
        title: { en: "Overview", fr: "Présentation" },
        body: [
          {
            en: "StreamETL makes real-time data processing accessible without writing Spark code. Users draw their pipeline on an interactive canvas: Kafka sources, transformations, then Kafka or Parquet destinations.",
            fr: "StreamETL rend le traitement de données en temps réel accessible sans écrire de code Spark. L'utilisateur dessine son pipeline sur un canvas interactif : sources Kafka, transformations, puis destinations Kafka ou fichiers Parquet.",
          },
          {
            en: "The backend analyzes the graph, checks that it is valid and derives a PySpark Structured Streaming job from it. The job is then launched on a containerized Spark cluster, and its execution can be followed from the interface. The whole ETL flow (Extract, Transform, Load) is driven from a single interface.",
            fr: "Le backend analyse le graphe, vérifie qu'il est valide et en tire un job PySpark Structured Streaming. Ce job est ensuite lancé sur un cluster Spark conteneurisé, et l'interface permet d'en suivre l'exécution. Tout le flux ETL (Extract, Transform, Load) se pilote depuis une seule interface.",
          },
        ],
      },
      {
        kind: "features",
        id: "features",
        title: { en: "Features", fr: "Fonctionnalités" },
        groups: [
          {
            title: { en: "Visual design", fr: "Conception visuelle" },
            items: [
              {
                en: "Drag-and-drop editor built on React Flow: connectable nodes, minimap, zoom, a configuration panel for each node",
                fr: "Éditeur drag-and-drop basé sur React Flow : nœuds connectables, mini-carte, zoom, panneau de configuration pour chaque nœud",
              },
              {
                en: "Preview of the generated PySpark code for each node, and of the full job",
                fr: "Aperçu du code PySpark généré pour chaque nœud, et du job complet",
              },
              { en: "Light / dark theme", fr: "Thème clair / sombre" },
            ],
          },
          {
            title: { en: "Kafka management", fr: "Gestion de Kafka" },
            items: [
              {
                en: "List, create (choosing the number of partitions) and delete topics from the interface",
                fr: "Lister, créer (avec choix du nombre de partitions) et supprimer des topics depuis l'interface",
              },
              { en: "Live preview of a topic's latest messages", fr: "Aperçu en direct des derniers messages d'un topic" },
              {
                en: "Source configuration: continuous (stream) or one-off (batch) reads, starting offset (earliest / latest), consumer group, serialization format, output acknowledgment policy (acks)",
                fr: "Configuration de la source : lecture en continu (stream) ou ponctuelle (batch), offset de départ (earliest / latest), consumer group, format de sérialisation, politique d'acquittement (acks) en sortie",
              },
            ],
          },
          {
            title: { en: "Spark transformations", fr: "Transformations Spark" },
            items: [
              {
                en: "ParseJSON: output schema definition (field typing), permissive mode, flattening of nested objects",
                fr: "ParseJSON : définition du schéma de sortie (typage des champs), mode permissif, aplatissement des objets imbriqués",
              },
              {
                en: "Filter: conditions with comparison operators and LIKE",
                fr: "Filter : conditions avec opérateurs de comparaison et LIKE",
              },
              {
                en: "GroupBy: time windows (tumbling / sliding) and watermarks to handle late data",
                fr: "GroupBy : fenêtres temporelles (tumbling / sliding) et watermarks pour gérer les données en retard",
              },
              { en: "Aggregate: count, sum, avg, min, max", fr: "Aggregate : count, sum, avg, min, max" },
              {
                en: "Join: inner, left, right and full joins between streams, with watermarks",
                fr: "Join : jointures inner, left, right et full entre flux, avec watermarks",
              },
            ],
          },
          {
            title: { en: "Execution & reliability", fr: "Exécution et fiabilité" },
            items: [
              {
                en: "Code generation, deployment and launch of the job on the Spark cluster in one click, then stop and restart",
                fr: "Génération du code, déploiement et lancement du job sur le cluster Spark en un clic, puis arrêt et redémarrage",
              },
              {
                en: "Job status tracking and error logs surfaced in the interface",
                fr: "Suivi de l'état du job et remontée des logs d'erreur dans l'interface",
              },
              {
                en: "Automatic choice of the Spark output mode (append, update or complete) from a compatibility matrix (sink type × aggregation × watermark); invalid combinations are rejected with an explanation",
                fr: "Choix automatique du mode de sortie Spark (append, update ou complete), selon une matrice de compatibilité (type de destination × agrégation × watermark). Les combinaisons invalides sont refusées avec un message explicatif.",
              },
              {
                en: "Parquet sink that also handles aggregations without a watermark, by writing through foreachBatch",
                fr: "Destination Parquet qui gère aussi les agrégations sans watermark, en écrivant via foreachBatch",
              },
            ],
          },
          {
            title: { en: "Persistence", fr: "Persistance" },
            items: [
              {
                en: "Pipelines and version history saved in PostgreSQL (JSONB)",
                fr: "Sauvegarde des pipelines et historique des versions dans PostgreSQL (JSONB)",
              },
              { en: "Last pipeline reloaded automatically on startup", fr: "Rechargement automatique du dernier pipeline au démarrage" },
              { en: "Pipeline export and import as JSON", fr: "Export et import des pipelines au format JSON" },
            ],
          },
        ],
      },
      {
        kind: "architecture",
        id: "architecture",
        title: "Architecture",
        body: [
          {
            en: "From the canvas to the cluster: the interface describes the pipeline, the backend validates it and generates the job, Spark runs it against Kafka and Parquet.",
            fr: "Du canvas au cluster : l'interface décrit le pipeline, le backend le valide et génère le job, Spark l'exécute sur Kafka et Parquet.",
          },
        ],
        layers: [
          {
            title: { en: "Design", fr: "Conception" },
            nodes: [
              { label: "React Flow", detail: { en: "Pipeline canvas (React 19, Vite)", fr: "Canvas du pipeline (React 19, Vite)" } },
              {
                label: { en: "Code preview", fr: "Aperçu du code" },
                detail: { en: "Generated PySpark, per node", fr: "PySpark généré, par nœud" },
              },
            ],
          },
          {
            title: { en: "Generation", fr: "Génération" },
            nodes: [
              {
                label: "FastAPI",
                detail: {
                  en: "Graph validation & PySpark generation (Pydantic)",
                  fr: "Validation du graphe et génération PySpark (Pydantic)",
                },
              },
              {
                label: "PostgreSQL",
                detail: { en: "Pipelines & versions (JSONB, SQLAlchemy)", fr: "Pipelines et versions (JSONB, SQLAlchemy)" },
              },
            ],
          },
          {
            title: { en: "Execution", fr: "Exécution" },
            nodes: [
              { label: "Spark 3.5", detail: { en: "Structured Streaming, master / worker", fr: "Structured Streaming, master / worker" } },
              {
                label: "Docker",
                detail: { en: "Containerized cluster (Docker SDK, Compose)", fr: "Cluster conteneurisé (SDK Docker, Compose)" },
              },
            ],
          },
          {
            title: { en: "Data", fr: "Données" },
            nodes: [
              {
                label: "Kafka",
                detail: { en: "Sources & sinks (Zookeeper, Kafka UI)", fr: "Sources et destinations (Zookeeper, Kafka UI)" },
              },
              { label: "Parquet", detail: { en: "File sink", fr: "Destination fichiers" } },
            ],
          },
        ],
      },
      {
        kind: "text",
        id: "challenge",
        title: { en: "Main technical challenge", fr: "Défi technique principal" },
        body: [
          {
            en: "The hardest part was turning a free-form graph, drawn by the user, into a valid Spark Streaming job. Spark rejects some combinations: for example, an aggregation without a watermark cannot be written in append mode to a file.",
            fr: "Le plus difficile a été de traduire un graphe libre, dessiné par l'utilisateur, en un job Spark Streaming valide. Spark refuse certaines combinaisons : par exemple, une agrégation sans watermark ne peut pas être écrite en mode append vers un fichier.",
          },
          {
            en: 'I designed a compatibility matrix that automatically picks the right write strategy (native mode or foreachBatch). The generator also propagates the "aggregated / watermarked" information along the graph, joins included. Result: users get a clear error at design time rather than a crash at runtime.',
            fr: "J'ai conçu une matrice de compatibilité qui choisit automatiquement la bonne stratégie d'écriture (mode natif ou foreachBatch). Le générateur fait aussi suivre l'information « agrégé / watermarké » le long du graphe, jointures comprises. Résultat : l'utilisateur reçoit une erreur claire au moment de la conception plutôt qu'un crash à l'exécution.",
          },
        ],
      },
      {
        kind: "stack",
        id: "technologies",
        title: "Technologies",
        items: [
          {
            name: "Frontend",
            role: {
              en: "React 19, Vite, React Flow (@xyflow/react), Lucide Icons, CSS (themes)",
              fr: "React 19, Vite, React Flow (@xyflow/react), Lucide Icons, CSS (thèmes)",
            },
          },
          {
            name: "Backend",
            role: {
              en: "Python, FastAPI, Pydantic, SQLAlchemy, kafka-python, Docker SDK",
              fr: "Python, FastAPI, Pydantic, SQLAlchemy, kafka-python, SDK Docker",
            },
          },
          {
            name: { en: "Processing", fr: "Traitement" },
            role: {
              en: "Apache Spark 3.5 (PySpark, Structured Streaming), master/worker cluster",
              fr: "Apache Spark 3.5 (PySpark, Structured Streaming), cluster master/worker",
            },
          },
          { name: { en: "Messaging", fr: "Messagerie" }, role: "Apache Kafka, Zookeeper, Kafka UI" },
          { name: { en: "Database", fr: "Base de données" }, role: "PostgreSQL 15 (JSONB)" },
          { name: "Infrastructure", role: "Docker, Docker Compose" },
          { name: "Formats", role: "JSON, Parquet" },
        ],
      },
      {
        kind: "gallery",
        id: "gallery",
        title: { en: "Screenshots", fr: "Captures d'écran" },
      },
    ],
  },
  {
    slug: "ai-stock-analyst",
    tagline: {
      en: "From raw market data to an AI agent that explains technical signals.",
      fr: "Des données de marché brutes à un agent IA qui explique les signaux techniques.",
    },
    sections: [
      {
        kind: "text",
        id: "problem",
        title: { en: "Problem", fr: "Problématique" },
        body: [
          {
            en: "Technical analysis of a stock relies on many indicators: momentum, trend, moving averages, price levels. Computing them is mechanical; interpreting them consistently, for every listed stock, is slow and repetitive.",
            fr: "L'analyse technique d'une valeur repose sur de nombreux indicateurs : momentum, tendance, moyennes mobiles, niveaux de prix. Les calculer est mécanique ; les interpréter de façon cohérente, pour chaque valeur cotée, est long et répétitif.",
          },
          {
            en: "The question behind the project: can an AI agent compute these signals reliably and turn them into a clear, grounded explanation?",
            fr: "La question derrière le projet : un agent IA peut-il calculer ces signaux de façon fiable et les transformer en une explication claire et fondée ?",
          },
        ],
      },
      {
        kind: "text",
        id: "context",
        title: { en: "Context", fr: "Contexte" },
        body: [
          {
            en: "Built during an internship at the Digital Center of Attijariwafa Bank (July to September 2026), with the Casablanca Stock Exchange as the target market.",
            fr: "Réalisé pendant un stage au Digital Center d'Attijariwafa Bank (juillet à septembre 2026), avec la Bourse de Casablanca comme marché cible.",
          },
        ],
      },
      {
        kind: "text",
        id: "solution",
        title: "Solution",
        body: [
          {
            en: "A pipeline that prepares market data and computes indicators deterministically, combined with an LLM agent that reasons over those results and over retrieved reference context, served through an API.",
            fr: "Un pipeline qui prépare les données de marché et calcule les indicateurs de façon déterministe, combiné à un agent LLM qui raisonne sur ces résultats et sur un contexte de référence récupéré, le tout servi par une API.",
          },
        ],
        bullets: [
          {
            en: "Indicators are computed in code, not guessed by the model.",
            fr: "Les indicateurs sont calculés par le code, pas devinés par le modèle.",
          },
          { en: "The agent's workflow is orchestrated with LangGraph.", fr: "Le workflow de l'agent est orchestré avec LangGraph." },
          {
            en: "Answers are grounded with retrieval (embeddings + vector database).",
            fr: "Les réponses sont fondées sur la recherche (embeddings + base vectorielle).",
          },
          { en: "Everything is exposed through a FastAPI backend.", fr: "L'ensemble est exposé via un backend FastAPI." },
        ],
      },
      {
        kind: "architecture",
        id: "architecture",
        title: "Architecture",
        body: [
          {
            en: "Four layers: data preparation, storage and indicator computation, the agent with its retrieval layer, and the API that serves it.",
            fr: "Quatre couches : préparation des données, stockage et calcul des indicateurs, l'agent et sa couche de recherche, et l'API qui le sert.",
          },
        ],
        layers: [
          {
            title: "Ingestion",
            nodes: [
              {
                label: { en: "Market data", fr: "Données de marché" },
                detail: { en: "Casablanca Stock Exchange history", fr: "Historique de la Bourse de Casablanca" },
              },
              { label: "Pandas", detail: { en: "Cleaning & structuring", fr: "Nettoyage et structuration" } },
            ],
          },
          {
            title: { en: "Storage & signals", fr: "Stockage et signaux" },
            nodes: [
              { label: "PostgreSQL", detail: { en: "Historical market data", fr: "Données de marché historiques" } },
              { label: { en: "Indicator engine", fr: "Moteur d'indicateurs" }, detail: "RSI · MACD · EMA20/50 · S/R" },
            ],
          },
          {
            title: { en: "Intelligence", fr: "Intelligence" },
            nodes: [
              {
                label: { en: "LangGraph agent", fr: "Agent LangGraph" },
                detail: { en: "Orchestrated analysis steps (LangChain)", fr: "Étapes d'analyse orchestrées (LangChain)" },
              },
              { label: "RAG", detail: { en: "Embeddings + vector database", fr: "Embeddings + base vectorielle" } },
            ],
          },
          {
            title: { en: "Serving", fr: "Exposition" },
            nodes: [
              { label: "FastAPI", detail: { en: "API exposing the agent", fr: "API exposant l'agent" } },
              {
                label: { en: "API consumers", fr: "Clients de l'API" },
                detail: { en: "Analysis requests & answers", fr: "Demandes d'analyse et réponses" },
              },
            ],
          },
        ],
      },
      {
        kind: "text",
        id: "data-pipeline",
        title: { en: "Data Pipeline", fr: "Pipeline de données" },
        body: [
          {
            en: "Historical market data is cleaned and structured with Pandas, then persisted in PostgreSQL so indicators can be recomputed and queried consistently.",
            fr: "Les données de marché historiques sont nettoyées et structurées avec Pandas, puis stockées dans PostgreSQL afin de recalculer et d'interroger les indicateurs de façon cohérente.",
          },
        ],
      },
      {
        kind: "text",
        id: "ai-agent",
        title: { en: "AI Agent", fr: "Agent IA" },
        body: [
          {
            en: "The agent is built with LangChain and orchestrated with LangGraph: the analysis is broken into explicit steps, so the model works from computed indicators and retrieved context rather than from memory.",
            fr: "L'agent est construit avec LangChain et orchestré avec LangGraph : l'analyse est découpée en étapes explicites, pour que le modèle travaille à partir des indicateurs calculés et du contexte récupéré plutôt que de sa mémoire.",
          },
        ],
      },
      {
        kind: "indicators",
        id: "technical-analysis",
        title: { en: "Technical Analysis", fr: "Analyse technique" },
        body: [
          {
            en: "The agent works from a set of classic technical indicators.",
            fr: "L'agent s'appuie sur un ensemble d'indicateurs techniques classiques.",
          },
        ],
        indicators: [
          {
            name: "RSI",
            fullName: { en: "Relative Strength Index", fr: "Indice de force relative" },
            description: {
              en: "Momentum oscillator (0 to 100) used to spot overbought and oversold conditions.",
              fr: "Oscillateur de momentum (0 à 100) qui repère les zones de surachat et de survente.",
            },
          },
          {
            name: "MACD",
            fullName: "Moving Average Convergence Divergence",
            description: {
              en: "Trend-following momentum indicator built from the difference of two EMAs.",
              fr: "Indicateur de tendance et de momentum construit à partir de l'écart entre deux EMA.",
            },
          },
          {
            name: "EMA20",
            fullName: { en: "20-period Exponential Moving Average", fr: "Moyenne mobile exponentielle 20 périodes" },
            description: {
              en: "Short-term trend, weighted towards recent prices.",
              fr: "Tendance court terme, pondérée vers les prix récents.",
            },
          },
          {
            name: "EMA50",
            fullName: { en: "50-period Exponential Moving Average", fr: "Moyenne mobile exponentielle 50 périodes" },
            description: {
              en: "Medium-term trend; crossings with EMA20 signal trend changes.",
              fr: "Tendance moyen terme ; ses croisements avec l'EMA20 signalent les changements de tendance.",
            },
          },
          {
            name: "Support",
            fullName: { en: "Support level", fr: "Niveau de support" },
            description: {
              en: "Price zone where buying pressure has historically stopped declines.",
              fr: "Zone de prix où la pression acheteuse a historiquement stoppé les baisses.",
            },
          },
          {
            name: "Resistance",
            fullName: { en: "Resistance level", fr: "Niveau de résistance" },
            description: {
              en: "Price zone where selling pressure has historically capped rallies.",
              fr: "Zone de prix où la pression vendeuse a historiquement plafonné les hausses.",
            },
          },
        ],
      },
      {
        kind: "stack",
        id: "technologies",
        title: "Technologies",
        items: [
          {
            name: "Python",
            role: { en: "Core language across the pipeline and the agent", fr: "Langage principal du pipeline et de l'agent" },
          },
          { name: "Pandas", role: { en: "Data cleaning and structuring", fr: "Nettoyage et structuration des données" } },
          { name: "PostgreSQL", role: { en: "Storage for historical market data", fr: "Stockage des données de marché historiques" } },
          {
            name: "Technical Indicators",
            role: { en: "RSI, MACD, EMA20, EMA50, support & resistance", fr: "RSI, MACD, EMA20, EMA50, supports et résistances" },
          },
          { name: "LangChain", role: { en: "LLM tooling and integrations", fr: "Outillage et intégrations LLM" } },
          { name: "LangGraph", role: { en: "Agent workflow orchestration", fr: "Orchestration du workflow de l'agent" } },
          { name: "RAG", role: { en: "Grounds answers in retrieved context", fr: "Fonde les réponses sur le contexte récupéré" } },
          { name: "Embeddings", role: { en: "Semantic representation for retrieval", fr: "Représentation sémantique pour la recherche" } },
          {
            name: "Vector Database",
            role: { en: "Similarity search over embedded context", fr: "Recherche par similarité sur le contexte vectorisé" },
          },
          { name: "FastAPI", role: { en: "API layer serving the agent", fr: "Couche API qui sert l'agent" } },
        ],
      },
      // TODO: document real, measured outcomes.
      { kind: "text", id: "results", title: { en: "Results", fr: "Résultats" }, body: [] },
      // TODO: what you learned, technical and non-technical.
      { kind: "text", id: "lessons", title: { en: "Lessons Learned", fr: "Enseignements" }, body: [] },
    ],
  },
];
