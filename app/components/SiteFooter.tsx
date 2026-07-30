import Image from "next/image";
import brandLogo from "../../opendata-fyi-original-dots-logo-pack/opendata-logo-original-transparent.png";

const github = "https://github.com/opendatafyi/openmcp";

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand">
        <a className="wordmark" href="/" aria-label="opendata.fyi home">
          <Image className="brand-logo" src={brandLogo} alt="opendata.fyi" />
        </a>
        <p>AI-assisted discovery, querying and analysis for public data.</p>
      </div>
      <div className="footer-links">
        <a href="/insights">Insights</a>
        <a href={github}>GitHub</a>
        <a href={`${github}#quick-start`}>Documentation</a>
        <a href={`${github}/releases/latest`}>Releases</a>
        <a href="https://open.canada.ca/en/open-data">open.canada.ca</a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 opendata.fyi · MIT licensed</span>
        <span>Independent and not affiliated with any data publisher.</span>
      </div>
    </footer>
  );
}
