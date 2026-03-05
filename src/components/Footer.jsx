const FOOTER_COLS = [
  {
    title: 'Shop',
    links: ['New Arrivals', 'Hoodies', 'Tracksuits', 'Accessories', 'Sale'],
  },
  {
    title: 'Brand',
    links: ['About Us', 'Lookbook', 'Stockists', 'Press', 'Careers'],
  },
  {
    title: 'Help',
    links: ['Sizing Guide', 'Shipping', 'Returns', 'FAQ', 'Contact'],
  },
]

export default function Footer({ onHover }) {
  return (
    <footer>
      <div className="ft">
        {/* Brand column */}
        <div>
          <div className="f-logo">
            CTRL<sup>®</sup> SOCIETY
          </div>
          <p className="f-tag">
            Control. Discipline. Identity.
            <br />
            Born independent. Built for those who lead.
          </p>
          <div className="f-soc">
            {[['IG', '#'], ['TK', '#'], ['TW', '#'], ['YT', '#']].map(([label, href]) => (
              <a
                key={label}
                className="fsoc-a"
                href={href}
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
                aria-label={label}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_COLS.map(({ title, links }) => (
          <div key={title} className="f-col">
            <div className="f-col-ttl">{title}</div>
            <ul>
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    onMouseEnter={() => onHover(true)}
                    onMouseLeave={() => onHover(false)}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="f-bot">
        <span className="f-copy">© 2025 CTRL Society — All Rights Reserved</span>
        <span className="f-copy">Privacy · Terms · Cookies</span>
      </div>
    </footer>
  )
}
