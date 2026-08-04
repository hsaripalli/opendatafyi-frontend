"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import brandLogo from "../opendata-fyi-original-dots-logo-pack/opendata-logo-original-transparent.png";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const github = "https://github.com/opendatafyi/openmcp";

const prompts = [
  "How has Alberta’s electricity generation mix changed over time?",
  "How do asking rents compare across major Canadian cities?",
  "How have hospital and ICU admissions changed across Ontario regions?",
  "Where is public infrastructure funding being spent across Canada?",
  "Which provinces had the fastest population growth over the past decade?",
  "How has wildfire smoke affected air quality in Alberta?",
];

const workflowQuestion = "How do interest rates affect housing prices in Canada?";
const workflowSteps = [
  ["Searching the catalogue", "75,000 datasets"],
  ["Comparing relevant sources", "12 candidates"],
  ["Querying source data", "3 datasets"],
  ["Generating chart", "Chart ready"],
] as const;
const workflowLines = [workflowQuestion, ...workflowSteps.map(([label]) => label)];

const dataSources = [
  {
    name: "Government of Canada",
    domain: "open.canada.ca",
    href: "https://open.canada.ca/en/open-data",
  },
  {
    name: "Alberta Open Data",
    domain: "open.alberta.ca",
    href: "https://open.alberta.ca",
  },
  {
    name: "Ontario Open Data",
    domain: "data.ontario.ca",
    href: "https://data.ontario.ca",
  },
  {
    name: "Statistics Canada",
    domain: "statcan.gc.ca",
    href: "https://www.statcan.gc.ca/en/developers/wds",
  },
] as const;

const faq = [
  ["What is opendata.fyi?", "An open-source MCP server that helps AI assistants discover and query Canadian public data across federal, Alberta, Ontario and Statistics Canada sources."],
  ["What is MCP?", "The Model Context Protocol is an open standard that lets AI applications connect to external tools and data sources."],
  ["Which AI clients can use it?", "Any client that supports MCP servers over standard stdio transport, including Claude, ChatGPT, Codex, Cursor, Gemini CLI, Zed and others."],
  ["Do I need an API key?", "No. It uses public data endpoints and a local embedding model."],
  ["Does it copy all public data to my computer?", "No. The local index contains catalogue metadata and embeddings. Source resources are queried only when needed."],
  ["Is the data official?", "opendata.fyi works with resources published through open.canada.ca, open.alberta.ca, data.ontario.ca and Statistics Canada, and links every result to its source. It is an independent project."],
  ["What data formats are supported?", "CKAN datastore resources plus remote CSV, Parquet, JSON, ZIP, Excel, PDF and TXT resources, subject to each file’s structure."],
  ["Can I contribute?", "Yes. The opendata.fyi MCP server is MIT licensed. Issues, feedback and contributions are welcome on GitHub."],
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
  const workflowCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = workflowCardRef.current;
    if (!card || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWorkflowLine(0);
          setWorkflowChar(0);
          setShowWorkflowSource(false);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
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
  }, [showWorkflowSource, workflowChar, workflowLine]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActivePrompt((value) => (value + 1) % prompts.length);
    }, 7500);

    return () => window.clearTimeout(timer);
  }, [activePrompt]);

  const selectPrompt = (index: number) => {
    setActivePrompt(index);
  };

  const typedWorkflowLine = (index: number) => {
    if (index < workflowLine) return workflowLines[index];
    if (index === workflowLine) return workflowLines[index].slice(0, workflowChar);
    return "";
  };

  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><i />A context layer for Canadian public data</p>
          <h1>Explore<br /><span>open data.</span></h1>
          <p className="lede">
            Connect your AI assistant to 75,000 public datasets and statistical
            tables from Government of Canada, Statistics Canada, Alberta and Ontario sources.
            Find the right sources, query the data, and build charts, visuals,
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
        <div><strong>Local Index</strong><span>75,000 · catalogue metadata</span></div>
        <div><strong>Natural Language</strong><span>12 MCP tools · discovery and analysis</span></div>
        <div><strong>Official Sources</strong><span>4 catalogues · results you can trace</span></div>
        <div><strong>No API keys</strong><span>ready to run</span></div>
      </div>

      <section className="statement">
        <p className="section-kicker">The problem</p>
        <div>
          <h2>Less hunting through portals.<br /><span>More answers from data.</span></h2>
          <div className="two-col-copy">
            <p>A vast amount of public data is available, but getting from a question to an answer often means searching unfamiliar catalogues, decoding spreadsheets and figuring out which resource is current.</p>
            <p>opendata.fyi gives your AI assistant the tools to handle that work.</p>
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
            ["Discover", "It searches catalogue entries by meaning and keyword, then ranks the strongest sources."],
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
        </div>
        <div className="curiosity-layout">
          <div className="sources" id="sources">
            <div className="source-section-label">
              <span>75,000 datasets and statistical tables</span>
            </div>
            <div className="source-grid">
              {dataSources.map((source, index) => (
                <a
                  className="source-card"
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  key={source.name}
                >
                  <span className="source-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{source.name}</h3>
                  <span className="source-domain">{source.domain} <Arrow /></span>
                </a>
              ))}
            </div>
          </div>
          <div className="prompt-showcase">
            <div className="prompt-counter">
              <span>Sample question</span>
              <span>{String(activePrompt + 1).padStart(2, "0")} / {String(prompts.length).padStart(2, "0")}</span>
            </div>
            <p
              className="showcase-question"
              key={activePrompt}
              aria-label={prompts[activePrompt]}
              aria-live="polite"
            >
              “{prompts[activePrompt]}”
            </p>
            <div className="showcase-controls">
              <button
                type="button"
                onClick={() => selectPrompt((activePrompt - 1 + prompts.length) % prompts.length)}
                aria-label="Previous sample question"
              >
                ← Previous
              </button>
              <div className="prompt-dots" aria-label="Choose a sample question">
                {prompts.map((item, index) => (
                  <button
                    type="button"
                    className={activePrompt === index ? "active" : ""}
                    onClick={() => selectPrompt(index)}
                    aria-label={`Show sample question ${index + 1}: ${item}`}
                    aria-current={activePrompt === index ? "true" : undefined}
                    key={item}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => selectPrompt((activePrompt + 1) % prompts.length)}
                aria-label="Next sample question"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="technical">
        <p className="section-kicker">Under the hood</p>
        <div className="technical-copy">
          <h2>Open-source<br /><span>MCP server.</span></h2>
          <p>opendata.fyi encodes metadata from Canada, Alberta, Ontario and the complete Statistics Canada WDS table inventory into 384-dimensional vectors stored in DuckDB. Each question runs against that shared semantic index while the three CKAN catalogues are searched live. Reciprocal Rank Fusion combines those signals into one ranked result set.</p>
          <p>For retrieval, the server chooses the most efficient read-only path. CKAN datastores are filtered server-side, remote files are queried with DuckDB, and the StatCan WDS tool retrieves table metadata, vectors, coordinates and bounded time-series data directly from the official API.</p>
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
          <h2>Optional telemetry.<br /><span>Off by default.</span></h2>
          <p>Catalogue search and embeddings run on your machine. Data requests go directly to the source.</p>
          <p>If you opt in, opendata.fyi records a session ID that lasts for one server run, along with server version, tool names, response times, outcomes, general error types, and the public dataset IDs surfaced, inspected or queried. This helps show which tools and datasets get used, where failures happen, and where performance needs attention.</p>
          <p className="small">It never records your questions, SQL, filters, complete URLs, detailed errors, file paths or resource contents.</p>
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
        <h2>Find. Build.<br /><span>Share.</span></h2>
        <p>
          public data with your favorite AI assistant.
          <span className="coming-soon">Federal, Alberta, Ontario and Statistics Canada sources—one traceable workflow.</span>
        </p>
        <a className="button button-dark" href={github} target="_blank" rel="noreferrer">View source on GitHub <Arrow /></a>
      </section>

      <SiteFooter />
    </main>
  );
}
