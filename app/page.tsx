"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import brandLogo from "../opendata-fyi-original-dots-logo-pack/opendata-logo-original-transparent.png";

const github = "https://github.com/opendatafyi/openmcp";

const prompts = [
  "How have rental prices changed across major cities?",
  "How has Canada’s electricity generation mix changed over time?",
  "Compare population growth across provinces.",
  "What do federal datasets show about food price inflation?",
  "Find recent data on greenhouse gas emissions by sector.",
  "Which neighbourhoods in Toronto report the worst air quality?",
];

const workflowQuestion = "How do interest rates affect housing prices in Canada?";
const workflowSteps = [
  ["Searching the catalogue", "24,000+ datasets"],
  ["Comparing relevant sources", "12 candidates"],
  ["Querying source data", "3 datasets"],
  ["Generating chart", "Chart ready"],
] as const;
const workflowLines = [workflowQuestion, ...workflowSteps.map(([label]) => label)];

const faq = [
  ["What is opendata.fyi?", "A project that helps AI assistants discover and query public datasets published through open.canada.ca (with more sources coming soon). It is powered by the open-source openmcp server."],
  ["What is MCP?", "The Model Context Protocol is an open standard that lets AI applications connect to external tools and data sources."],
  ["Which AI clients can use it?", "Any client that supports MCP servers over standard stdio transport, including Claude, ChatGPT, Codex, Cursor, Gemini CLI, Zed and others."],
  ["Do I need an API key?", "No. It uses public data endpoints and a local embedding model."],
  ["Does it copy all public data to my computer?", "No. The local index contains catalogue metadata and embeddings. Source resources are queried only when needed."],
  ["Is the data official?", "opendata.fyi works with resources published through open.canada.ca (with more sources coming soon) and links results to the source. It is an independent project."],
  ["What data formats are supported?", "CKAN datastore resources plus remote CSV, Parquet, JSON, ZIP, Excel, PDF and TXT resources, subject to each file’s structure."],
  ["Can I contribute?", "Yes. The underlying openmcp server is MIT licensed. Issues, feedback and contributions are welcome on GitHub."],
];

function Arrow() {
  return (
    <svg className="arrow-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 12 12 4M6 4h6v6" />
    </svg>
  );
}

export default function Home() {
  const [activePrompt, setActivePrompt] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [workflowLine, setWorkflowLine] = useState(0);
  const [workflowChar, setWorkflowChar] = useState(0);
  const [showWorkflowSource, setShowWorkflowSource] = useState(false);
  const [workflowInView, setWorkflowInView] = useState(false);
  const workflowCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = workflowCardRef.current;
    if (!card || !("IntersectionObserver" in window)) {
      setWorkflowInView(true);
      return;
    }

    // Fallback timer for mobile browsers where IntersectionObserver may be delayed
    const fallbackTimer = setTimeout(() => setWorkflowInView(true), 1000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWorkflowInView(true);
        }
      },
      { threshold: 0.05, rootMargin: "100px" },
    );
    observer.observe(card);
    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!workflowInView) return;

    let timer: ReturnType<typeof setTimeout>;
    if (workflowLine < workflowLines.length) {
      const currentLine = workflowLines[workflowLine];
      if (workflowChar < currentLine.length) {
        timer = setTimeout(() => setWorkflowChar((value) => value + 1), 34);
      } else {
        timer = setTimeout(() => {
          setWorkflowLine((value) => value + 1);
          setWorkflowChar(0);
        }, workflowLine === 0 ? 650 : 420);
      }
    } else if (!showWorkflowSource) {
      timer = setTimeout(() => setShowWorkflowSource(true), 450);
    } else {
      timer = setTimeout(() => {
        setWorkflowLine(0);
        setWorkflowChar(0);
        setShowWorkflowSource(false);
      }, 2400);
    }

    return () => clearTimeout(timer);
  }, [showWorkflowSource, workflowChar, workflowInView, workflowLine]);

  const typedWorkflowLine = (index: number) => {
    if (index < workflowLine) return workflowLines[index];
    if (index === workflowLine) return workflowLines[index].slice(0, workflowChar);
    return "";
  };

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="opendata.fyi home">
          <Image className="brand-logo" src={brandLogo} alt="opendata.fyi" priority />
        </a>
        <nav aria-label="Main navigation">
          <a href="#how">How it works</a>
          <a href="#questions">Examples</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="header-cta" href={github} target="_blank" rel="noreferrer">
          GitHub <Arrow />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><i />A context layer for Canadian public data</p>
          <h1>Explore<br /><span>open data.</span></h1>
          <p className="lede">
            Connect your AI assistant to 24,000+ public datasets. Find the right
            sources, query the data, and build charts, visuals,
            reports and stories—all traceable to the official source.
          </p>
          <div className="actions">
            <a className="button button-dark" href={`${github}#quick-start`} target="_blank" rel="noreferrer">
              Get started on GitHub <Arrow />
            </a>
            <a className="text-link" href="#how">See how it works <span>↓</span></a>
          </div>
        </div>

        <div ref={workflowCardRef} className="demo-card" aria-label="opendata.fyi example workflow">
          <div className="demo-top">
            <span>LIVE WORKFLOW</span>
            <span className="live">
              <Image className="workflow-logo" src={brandLogo} alt="opendata.fyi" />
            </span>
          </div>
          <div className="prompt" aria-label={workflowQuestion}>
            <span className="prompt-icon">→</span>
            <p aria-hidden="true">
              {typedWorkflowLine(0)}
              {workflowLine === 0 && <span className="typing-cursor">▌</span>}
            </p>
          </div>
          <div className="workflow">
            {workflowSteps.map(([label, value], index) => (
              <div className="workflow-row" aria-label={`${label}: ${value}`} key={label}>
                <span className={`workflow-index ${workflowLine < index + 1 ? "is-hidden" : ""}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="workflow-label" aria-hidden="true">
                  {typedWorkflowLine(index + 1)}
                  {workflowLine === index + 1 && <span className="typing-cursor">▌</span>}
                </span>
                <span className={`${index === 3 ? "ready " : ""}${workflowLine <= index + 1 ? "is-hidden" : ""}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
          <div className={`demo-footer ${showWorkflowSource ? "is-visible" : ""}`}>
            <span>Official housing dataset</span>
            <span className="source-url">open.canada.ca/data/en/dataset/324befd1-893b-42e6-bece-6d30af3dd9f1</span>
          </div>
        </div>
      </section>

      <div className="stat-strip" aria-label="opendata.fyi statistics">
        <div><strong>24K+</strong><span>indexed datasets</span></div>
        <div><strong>Natural Language</strong><span>discovery and analysis</span></div>
        <div><strong>Official Sources</strong><span>results you can trace</span></div>
        <div><strong>No API keys</strong><span>ready to run</span></div>
      </div>

      <section className="statement">
        <p className="section-kicker">The problem</p>
        <div>
          <h2>Less hunting through portals.<br /><span>More answers from data.</span></h2>
          <div className="two-col-copy">
            <p>A vast amount of public data is available, but getting from a question to an answer often means searching unfamiliar catalogues, decoding spreadsheets and figuring out which resource is current.</p>
            <p>opendata.fyi gives your AI assistant the tools to handle that work. Ask in plain English; it finds relevant datasets, inspects their structure, queries useful rows and shows where the information came from.</p>
          </div>
        </div>
      </section>

      <section className="how" id="how">
        <div className="section-head">
          <p className="section-kicker">How it works</p>
          <h2>A traceable path.</h2>
        </div>
        <div className="steps">
          {[
            ["Discover", "It searches 24,000+ catalogue entries by meaning and keyword, then ranks the strongest sources."],
            ["Inspect", "Before touching the data, it checks fields, sheets, formats and date coverage to choose the right resource."],
            ["Query", "It filters at the source when possible and streams CSV, Excel, JSON, ZIP, Parquet or PDF only when needed."],
            ["Cite", "Direct dataset links keep every result traceable and make the original source easy to verify."],
          ].map(([title, body], index) => (
            <article className="step" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="questions" id="questions">
        <div className="section-head question-head">
          <p className="section-kicker">What could you ask?</p>
          <h2>Follow your curiosity.</h2>
          <p>A few sample questions to get started.</p>
        </div>
        <div className="prompt-showcase">
          <div className="prompt-counter">
            <span>Sample question</span>
            <span>{String(activePrompt + 1).padStart(2, "0")} / {String(prompts.length).padStart(2, "0")}</span>
          </div>
          <p className="showcase-question">“{prompts[activePrompt]}”</p>
          <div className="showcase-controls">
            <button
              type="button"
              onClick={() => setActivePrompt((activePrompt - 1 + prompts.length) % prompts.length)}
              aria-label="Previous sample question"
            >
              ← Previous
            </button>
            <div className="prompt-dots" aria-label="Choose a sample question">
              {prompts.map((item, index) => (
                <button
                  type="button"
                  className={activePrompt === index ? "active" : ""}
                  onClick={() => setActivePrompt(index)}
                  aria-label={`Show sample question ${index + 1}: ${item}`}
                  aria-current={activePrompt === index ? "true" : undefined}
                  key={item}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActivePrompt((activePrompt + 1) % prompts.length)}
              aria-label="Next sample question"
            >
              Next →
            </button>
          </div>
        </div>
      </section>

      <section className="technical">
        <p className="section-kicker">Under the hood</p>
        <div className="technical-copy">
          <h2>Open-source<br /><span>MCP server.</span></h2>
          <p>The server builds a local semantic index by encoding dataset metadata into 384-dimensional vectors with bge-small-en-v1.5 and storing them in a DuckDB database. For every query, it runs a hybrid search: local semantic search in DuckDB alongside CKAN’s live package_search API. Results are merged using Reciprocal Rank Fusion (RRF) to rank the most relevant datasets.</p>
          <p>For retrieval, the server routes queries through the most efficient read-only execution path. Datastore-backed tables are filtered server-side through CKAN, while remote files are queried with DuckDB or handled with format-specific readers. Only targeted results are returned to your MCP client for downstream analysis, visualization and synthesis.</p>
        </div>
      </section>

      <section className="get-started" id="start">
        <div className="start-copy">
          <p className="section-kicker">Open source and ready to run</p>
          <h2>Connect opendata.fyi<br /><span>to your AI assistant.</span></h2>
          <p>Clone the repository, install the Python dependencies, download the latest catalogue index, and add the MCP server to your client.</p>
          <a className="button button-red" href={`${github}#quick-start`} target="_blank" rel="noreferrer">View setup instructions <Arrow /></a>
        </div>
        <div className="code-window">
          <div className="code-bar"><span>01 / INSTALL</span><span>TERMINAL</span></div>
          <pre><code><span>$</span> git clone {github}.git{"\n"}<span>$</span> cd openmcp{"\n"}<span>$</span> python3 -m venv venv{"\n"}<span>$</span> venv/bin/pip install -r requirements.txt</code></pre>
          <div className="code-note"><span>02</span><p>Download <code>catalog.duckdb</code> from the latest release and place it in the project root.</p></div>
          <div className="code-note"><span>03</span><p>Connect the server in your MCP client configuration. Full examples are in the repository.</p></div>
        </div>
      </section>

      <section className="privacy">
        <p className="section-kicker">Transparent by design</p>
        <div>
          <h2>Know what runs locally<br />and what gets sent.</h2>
          <p>Search embeddings and the catalogue run locally. Requests to retrieve public data go to the relevant source host. Lightweight, asynchronous telemetry helps maintainers understand usage and errors, and can be disabled.</p>
          <p className="small">Telemetry does not collect names, usernames, authentication keys, local file contents or system paths.</p>
        </div>
      </section>

      <section className="faq" id="faq">
        <div>
          <p className="section-kicker">FAQ</p>
          <h2>Questions,<br />answered.</h2>
        </div>
        <div className="faq-list">
          {faq.map(([q, a], index) => (
            <div className="faq-item" key={q}>
              <button aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                <span>{q}</span><i>{openFaq === index ? "−" : "+"}</i>
              </button>
              {openFaq === index && <p>{a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <p className="section-kicker">opendata.fyi</p>
        <h2>Explore<br /></h2>
        <p>
          24,000+ public datasets with your favorite AI assistant.
          <span className="coming-soon">(More sources coming soon.)</span>
        </p>
        <a className="button button-dark" href={github} target="_blank" rel="noreferrer">Get openmcp on GitHub <Arrow /></a>
      </section>

      <footer>
        <div className="footer-brand">
          <a className="wordmark" href="#top" aria-label="opendata.fyi home">
            <Image className="brand-logo" src={brandLogo} alt="opendata.fyi" />
          </a>
          <p>AI-assisted discovery, querying and analysis for public data.</p>
        </div>
        <div className="footer-links">
          <a href={github}>GitHub</a>
          <a href={`${github}#quick-start`}>Documentation</a>
          <a href={`${github}/releases/latest`}>Releases</a>
          <a href="https://open.canada.ca/en/open-data">open.canada.ca</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 opendata.fyi · openmcp is MIT licensed</span>
          <span>Independent and not affiliated with any data publisher.</span>
        </div>
      </footer>
    </main>
  );
}
