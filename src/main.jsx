import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const devicon = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const cvUrl = `${import.meta.env.BASE_URL}Kedist_Shegute_CV_Template_Style.pdf`;

const languageTools = [
  ["Python", `${devicon}/python/python-original.svg`],
  ["Java", `${devicon}/java/java-original.svg`],
  ["C++", `${devicon}/cplusplus/cplusplus-original.svg`],
  ["JavaScript", `${devicon}/javascript/javascript-original.svg`],
  ["Dart", `${devicon}/dart/dart-original.svg`],
  ["PHP", `${devicon}/php/php-original.svg`],
];

const skillGroups = [
  {
    title: "AI & Graph",
    note: "Models, mining, graph databases, and KG tooling.",
    accent: "gold",
    tools: [
      ["TensorFlow", `${devicon}/tensorflow/tensorflow-original.svg`],
      ["Keras", `${devicon}/keras/keras-original.svg`],
      ["Neo4j", `${devicon}/neo4j/neo4j-original.svg`],
      ["NetworkX", null, "NX"],
      ["SPMiner", null, "SP"],
      ["BioCypher", null, "BC"],
    ],
  },
  {
    title: "Web & Apps",
    note: "APIs, interfaces, mobile apps, and product surfaces.",
    accent: "cyan",
    tools: [
      ["FastAPI", `${devicon}/fastapi/fastapi-original.svg`],
      ["React", `${devicon}/react/react-original.svg`],
      ["Flutter", `${devicon}/flutter/flutter-original.svg`],
      ["Node.js", `${devicon}/nodejs/nodejs-original.svg`],
      ["Tailwind", `${devicon}/tailwindcss/tailwindcss-original.svg`],
      ["Bootstrap", `${devicon}/bootstrap/bootstrap-original.svg`],
    ],
  },
  {
    title: "Data & DevOps",
    note: "Databases, containers, Linux, and delivery pipelines.",
    accent: "green",
    tools: [
      ["PostgreSQL", `${devicon}/postgresql/postgresql-original.svg`],
      ["MySQL", `${devicon}/mysql/mysql-original.svg`],
      ["MongoDB", `${devicon}/mongodb/mongodb-original.svg`],
      ["Docker", `${devicon}/docker/docker-original.svg`],
      ["Linux", `${devicon}/linux/linux-original.svg`],
      ["CI/CD", null, "CI"],
    ],
  },
];

const projects = [
  {
    title: "BioCypher Knowledge Graph",
    period: "Rejuve.Bio · iCog Labs",
    text: "Large-scale biomedical KG work integrating human and Drosophila sources across genes, proteins, regulatory elements, ontologies, disease biology, and graph refresh workflows.",
    chips: ["BioCypher", "Ontology adapters", "Neo4j pipelines"],
    repo: "https://github.com/rejuve-bio/biocypher-kg",
  },
  {
    title: "Neural Subgraph Matcher Miner",
    period: "Rejuve.Bio · iCog Labs",
    text: "Mining system work around SPMiner-style workflows, NetworkX graph export, directed graph support, analyzer improvements, visualization, and large biological graph experiments.",
    chips: ["SPMiner", "NetworkX", "Graph mining"],
    repo: "https://github.com/rejuve-bio/neural-subgraph-matcher-miner",
  },
  {
    title: "NeuroGraph AI Assistant",
    period: "iCog Labs",
    text: "Multi-service AI platform for graph mining, LLM interpretation, annotation tooling, visualization, Docker deployment, and coordinated microservice delivery.",
    chips: ["AI assistant", "Microservices", "Docker"],
    repo: "https://github.com/iCog-Labs-Dev/NeuroGraph-AI-Assistant",
  },
  {
    title: "Coffee Disease Detection",
    period: "Final Year Project · 2023-2024",
    text: "End-to-end machine learning pipeline for coffee plant disease detection, including data collection, labeling, model training, evaluation, API integration, and frontend delivery.",
    chips: ["Machine learning", "API", "Frontend"],
  },
  {
    title: "YazLeba Theft Detection App",
    period: "Personal Project · 2023",
    text: "Flutter mobile app for campus theft detection and device verification, generating QR-code tags that security staff can scan to confirm device ownership.",
    chips: ["Flutter", "QR codes", "Theft detection"],
  },
  {
    title: "Lounge Management System",
    period: "Personal Project · 2022-2023",
    text: "Java Swing desktop application for campus lounge inventory, customer ordering, and real-time order tracking.",
    chips: ["Java Swing", "Inventory", "Order tracking"],
  },
];

const research = [
  {
    number: "20M edges",
    label: "BioCypher KG · 2026",
    title: "Human biological KG analysis",
    text: "Analyzed a large human biological knowledge graph built from genomics, protein, ontology, and annotation sources, using sampled ego-networks to surface recurring graph structures.",
    metrics: ["150,619 nodes", "20,000 neighborhoods", "10,138 unique entities"],
  },
  {
    number: "503 instances",
    label: "TFLink · 2026",
    title: "Human regulatory network report",
    text: "Studied directed transcription factor relationships to identify recurring hierarchical regulatory structures and convergence points across human gene regulation.",
    metrics: ["78,686 genes", "6,393,993 edges", "374 motif genes"],
  },
  {
    number: "14,877 instances",
    label: "STRING PPI · 2026",
    title: "Protein interaction network report",
    text: "Mapped structural patterns in human protein interaction networks, highlighting modules connected to immune signaling, chromatin regulation, mitochondria, replication, and transport.",
    metrics: ["53,356 proteins", "6,612,766 links", "18 motif types"],
  },
];

const courseLinks = [
  {
    title: "Supervised Machine Learning",
    url: "https://coursera.org/share/b7106cf994ab5c0c3efb5bfd4743cfec",
  },
  {
    title: "Object-Oriented Design",
    url: "https://coursera.org/share/06085cf6ef4a2a20a1615620d5287aba",
  },
  {
    title: "Neural Networks and Deep Learning",
    url: "https://coursera.org/share/f3125b75cd813d2654900e0ed4719a27",
  },
  {
    title: "Mathematics for Machine Learning",
    url: "https://coursera.org/share/dc2f6d71ca97883f307382732d7ca177",
  },
];

function useVisibleSections() {
  const [active, setActive] = useState("systems");

  useEffect(() => {
    const sections = [...document.querySelectorAll("[data-section]")];
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    const track = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.45, 0.65] }
    );

    sections.forEach((section) => {
      reveal.observe(section);
      if (section.id) track.observe(section);
    });

    requestAnimationFrame(() => {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08) {
          section.classList.add("is-visible");
        }
      });
    });

    return () => {
      reveal.disconnect();
      track.disconnect();
    };
  }, []);

  return active;
}

function Header({ active }) {
  const links = ["systems", "research", "lab", "contact"];

  const handleNav = (event, link) => {
    event.preventDefault();
    window.history.pushState(null, "", `#${link}`);

    if (link === "contact") {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
      return;
    }

    document.querySelector(`#${link}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Kedist Shegute Dimore home">
        <span>K</span>
        <strong>Kedist</strong>
      </a>
      <nav className="nav" aria-label="Primary navigation">
        {links.map((link) => (
          <a
            key={link}
            href={`#${link}`}
            aria-current={active === link ? "true" : undefined}
            onClick={(event) => handleNav(event, link)}
          >
            {link[0].toUpperCase() + link.slice(1)}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section-panel is-visible" id="top" data-section="top" aria-labelledby="hero-title">
      <div className="graph-stage" aria-hidden="true">
        <svg className="graph-lines" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
          <line className="graph-edge edge-one" x1="10" y1="34" x2="22" y2="20" />
          <line className="graph-edge edge-two" x1="22" y1="20" x2="44" y2="46" />
          <line className="graph-edge edge-three" x1="44" y1="46" x2="72" y2="31" />
          <line className="graph-edge edge-four" x1="72" y1="31" x2="88" y2="68" />
        </svg>
        {[1, 2, 3, 4, 5].map((n) => <span key={`n${n}`} className={`node n${n}`} />)}
      </div>

      <div className="hero-copy">
        <p className="eyebrow">AI Developer · KG Engineer · Full-stack Builder</p>
        <h1 id="hero-title">Building data systems that move from research to product.</h1>
        <p className="intro">
          I build biomedical knowledge graph pipelines, neural mining tools, and AI product interfaces,
          turning complex research data into systems teams can query, test, and deploy.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#systems">Explore work</a>
          <a className="button ghost external-link" href={cvUrl} target="_blank" rel="noreferrer">Open CV</a>
        </div>
      </div>

      <aside className="identity-card" aria-label="Kedist profile">
        <div className="profile-mark" aria-hidden="true">K</div>
        <div className="identity-copy">
          <p className="role">AI Developer & Knowledge Graph Engineer</p>
          <h2>Kedist Shegute Dimore</h2>
          <p>Addis Ababa, Ethiopia · Licensed software developer in the UAE</p>
        </div>
      </aside>
    </section>
  );
}

function Systems() {
  return (
    <section className="section system-section section-panel" id="systems" data-section="systems">
      <div className="section-kicker"><span>01</span></div>
      <div className="section-head">
        <h2>Selected Projects</h2>
        <p>Biomedical knowledge graphs, neural graph mining, AI assistant infrastructure, and practical apps built across web, mobile, and desktop.</p>
      </div>

      <div className="work-grid">
        {projects.map((item) => (
          <article className="work-card" key={item.title}>
            <div className="work-card-top">
              <p className="case-label">{item.period}</p>
              {item.repo && <a className="repo-link" href={item.repo} target="_blank" rel="noreferrer">GitHub</a>}
            </div>
            <div className="work-card-body">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
            <div className="work-chips">
              {item.chips.map((chip) => <span key={chip}>{chip}</span>)}
            </div>
          </article>
        ))}
      </div>

      <div className="timeline-strip" aria-label="Career timeline">
        {["BioCypher KG", "Miner", "NeuroGraph", "Coffee ML", "YazLeba", "Lounge app"].map((item) => (
          <div key={item}>
            <span />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Research() {
  return (
    <section className="section research-section section-panel" id="research" data-section="research">
      <div className="section-kicker"><span>02</span></div>
      <div className="section-head">
        <h2>Research and Analysis</h2>
        <p>Technical reports from biomedical knowledge graph mining, regulatory network analysis, and protein interaction motif discovery.</p>
      </div>
      <div className="research-board">
        {research.map((item) => (
          <article key={item.title}>
            <div className="research-number">{item.number}</div>
            <p className="case-label">{item.label}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <div className="metric-pills">
              {item.metrics.map((metric) => <span key={metric}>{metric}</span>)}
            </div>
          </article>
        ))}
      </div>

      <div className="course-strip">
        <p className="case-label">Coursera coursework</p>
        <div>
          {courseLinks.map((course) => (
            <a key={course.title} href={course.url} target="_blank" rel="noreferrer">
              {course.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoTile({ tool }) {
  const [label, src, fallback] = tool;
  return (
    <span className={src ? "logo-tile" : "logo-tile text-logo"}>
      {src ? <img src={src} alt="" aria-hidden="true" /> : <b>{fallback}</b>}
      <small>{label}</small>
    </span>
  );
}

function Lab() {
  return (
    <section className="section lab-section section-panel" id="lab" data-section="lab">
      <div className="section-kicker"><span>03</span></div>
      <div className="lab-intro">
        <h2>A practical builder’s toolkit.</h2>
        <p>Models, graphs, APIs, interfaces, data, and deployment.</p>
      </div>

      <div className="toolkit-board">
        <article className="skill-card language-card">
          <div className="skill-card-head"><h3>Languages</h3></div>
          <p className="skill-tagline">Core languages for AI systems, web products, automation, and mobile apps.</p>
          <div className="language-grid">
            {languageTools.map((tool) => <LogoTile key={tool[0]} tool={tool} />)}
          </div>
        </article>

        {skillGroups.map((group) => (
          <article className={`skill-card feature-skill ${group.accent}`} key={group.title}>
            <div className="skill-card-head"><h3>{group.title}</h3></div>
            <p className="skill-tagline">{group.note}</p>
            <div className="logo-cloud">
              {group.tools.map((tool) => <LogoTile key={tool[0]} tool={tool} />)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer className="contact-section section-panel" id="contact" data-section="contact">
      <div className="footer-wave" aria-hidden="true" />
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="eyebrow">Available for AI, graph, and full-stack systems work</p>
          <h2>Let’s make complex knowledge easier to use.</h2>
          <p>Biomedical KG pipelines, neural mining tools, backend services, and interfaces for research-driven products.</p>
        </div>

        <nav className="footer-column" aria-label="Project links">
          <h3>Projects</h3>
          <a className="external-link" href="https://github.com/rejuve-bio/biocypher-kg" target="_blank" rel="noreferrer">BioCypher KG</a>
          <a className="external-link" href="https://github.com/rejuve-bio/neural-subgraph-matcher-miner" target="_blank" rel="noreferrer">Miner</a>
          <a className="external-link" href="https://github.com/iCog-Labs-Dev/NeuroGraph-AI-Assistant" target="_blank" rel="noreferrer">NeuroGraph</a>
        </nav>

        <nav className="footer-column" aria-label="Portfolio links">
          <h3>Explore</h3>
          <a href="#systems">Selected Projects</a>
          <a href="#research">Research</a>
          <a href="#lab">Toolkit</a>
          <a className="external-link" href={cvUrl} target="_blank" rel="noreferrer">Open CV</a>
        </nav>

        <div className="footer-column footer-contact">
          <h3>Contact</h3>
          <a href="mailto:kedistkid723@gmail.com">kedistkid723@gmail.com</a>
          <a href="tel:+971521775993">+971 52 177 5993</a>
          <a href="tel:+251901946736">+251 901 946 736</a>
          <div className="footer-social" aria-label="Social links">
            <a className="external-link" href="https://github.com/kedistS" target="_blank" rel="noreferrer" aria-label="GitHub">
              <img className="github-icon" src={`${devicon}/github/github-original.svg`} alt="" aria-hidden="true" />
            </a>
            <a className="external-link" href="https://www.linkedin.com/in/kedist-shegute-387a64287/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <img className="linkedin-icon" src={`${devicon}/linkedin/linkedin-original.svg`} alt="" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>Kedist Shegute Dimore</span>
        <span>Addis Ababa, Ethiopia</span>
        <span>AI Developer & Knowledge Graph Engineer</span>
      </div>
    </footer>
  );
}

function App() {
  const active = useVisibleSections();

  useEffect(() => {
    if (!window.location.hash) return;
    const frame = requestAnimationFrame(() => {
      if (window.location.hash === "#contact") {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "auto" });
        return;
      }
      document.querySelector(window.location.hash)?.scrollIntoView({ block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <Header active={active} />
      <main>
        <Hero />
        <section className="marquee" aria-label="Core strengths">
          {["Knowledge graph engineering", "Ontology adapters", "Neo4j pipelines", "Full-stack AI", "CI/CD automation"].map((item) => (
            <p key={item}>{item}</p>
          ))}
        </section>
        <Systems />
        <Research />
        <Lab />
        <Contact />
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
