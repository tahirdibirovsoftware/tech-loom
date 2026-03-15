import './App.css'
import ProductList from './ProductList'

function Logo() {
  return (
    <svg viewBox="0 0 120 120" width="64" height="64" aria-hidden>
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="#6c7bff" />
          <stop offset="1" stopColor="#8bd3ff" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="108" height="108" rx="20" fill="url(#g1)" opacity="0.14" />
      <g transform="translate(22,22)">
        <path d="M14 0 L40 0 L54 30 L40 60 L14 60 L0 30 Z" fill="#ffffff11" />
        <path d="M12 6 L36 6 L48 30 L36 54 L12 54 L0 30 Z" fill="url(#g1)" opacity="0.98" />
      </g>
    </svg>
  )
}

function App() {
  return (
    <div id="root">
      <header className="site-header">
        <div className="brand">
          <div className="logo">
            <Logo />
          </div>
          <div>
            <h1 className="brand-title">TechLoom</h1>
            <div className="tagline">Curated gear for creators</div>
          </div>
        </div>
      </header>

      <section className="hero-banner">
        <div className="banner-content">
          <h2 className="banner-title">Discover tools that inspire</h2>
          <p className="banner-sub">Quality-tested hardware and accessories for work and play.</p>
          <div className="banner-cta">
            <button className="cta">Browse collection</button>
          </div>
        </div>
      </section>

      <ProductList />

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-col">
            <strong>TechLoom</strong>
            <div className="footer-note">Curated gear for creators</div>
          </div>
          <div className="footer-col">
            <a href="#">About</a>
            <a href="#">Support</a>
            <a href="#">Privacy</a>
          </div>
          <div className="footer-col">
            <div>© {new Date().getFullYear()} TechLoom</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
