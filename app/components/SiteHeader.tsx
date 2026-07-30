import Image from "next/image";
import brandLogo from "../../opendata-fyi-original-dots-logo-pack/opendata-logo-original-transparent.png";

const github = "https://github.com/opendatafyi/openmcp";

function Arrow() {
  return (
    <svg className="arrow-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 12 12 4M6 4h6v6" />
    </svg>
  );
}

export function SiteHeader({ current }: { current?: "insights" }) {
  return (
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="opendata.fyi home">
        <Image className="brand-logo" src={brandLogo} alt="opendata.fyi" priority />
      </a>
      <nav className="primary-nav" aria-label="Main navigation">
        <a href="/#how">How it works</a>
        <a href="/#questions">Examples</a>
        <a href="/#faq">FAQ</a>
        <a
          className="nav-insights"
          href="/insights"
          aria-current={current === "insights" ? "page" : undefined}
        >
          Insights
        </a>
      </nav>
      <a className="header-cta" href={github} target="_blank" rel="noreferrer">
        GitHub <Arrow />
      </a>
      <div className="mobile-nav-group">
        <a
          className="mobile-nav-insights"
          href="/insights"
          aria-current={current === "insights" ? "page" : undefined}
        >
          Insights
        </a>
        <details className="mobile-nav">
          <summary>Menu</summary>
          <div className="mobile-nav-panel">
            <a href="/#how">How it works</a>
            <a href="/#questions">Examples</a>
            <a href="/#faq">FAQ</a>
            <a href={github} target="_blank" rel="noreferrer">
              GitHub <Arrow />
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}
