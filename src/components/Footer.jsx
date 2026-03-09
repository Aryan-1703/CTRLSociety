const FOOTER_COLS = [
  { title: 'Shop', links: ['New Arrivals', 'Hoodies', 'Tracksuits', 'Accessories', 'Sale'] },
  { title: 'Brand', links: ['About Us', 'Lookbook', 'Stockists', 'Press', 'Careers'] },
  { title: 'Help', links: ['Sizing Guide', 'Shipping & Returns', 'FAQ', 'Contact Us', 'Track Order'] },
]

const SOCIALS = [
  { label: 'IG', href: 'https://instagram.com', title: 'Instagram' },
  { label: 'TK', href: 'https://tiktok.com', title: 'TikTok' },
  { label: 'TW', href: 'https://twitter.com', title: 'Twitter' },
  { label: 'YT', href: 'https://youtube.com', title: 'YouTube' },
]

export default function Footer({ onHover }) {
  return (
    <footer>
      <div className="ft">
        {/* Brand column */}
        <div className="f-brand">
          <div className="f-logo">CTRL<sup>®</sup> SOCIETY</div>
          <p className="f-tag">
            Control. Discipline. Identity.<br />
            Born independent. Built for those who lead.
          </p>
          <div className="f-soc" aria-label="Social links">
            {SOCIALS.map(({ label, href, title }) => (
              <a
                key={label}
                className="fsoc-a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
                aria-label={title}
                title={title}
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
              {links.map(link => (
                <li key={link}>
                  <a href="#" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="f-bot">
        <span className="f-copy">© {new Date().getFullYear()} CTRL Society — All Rights Reserved</span>
        <div className="f-legal">
          <a href="#">Privacy</a>
          <span>·</span>
          <a href="#">Terms</a>
          <span>·</span>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  )
}
