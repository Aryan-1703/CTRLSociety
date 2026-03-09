import { ABOUT_IMG } from '../data/products'

export default function About({ onHover }) {
  return (
    <section id="about" className="about" aria-label="About CTRL Society">
      <div className="about-img">
        {ABOUT_IMG
          ? <img src={ABOUT_IMG} alt="About CTRL Society — Three Models" loading="lazy" />
          : <div className="about-img-ph" />
        }
      </div>
      <div className="about-body">
        <div className="reveal">
          <div className="sec-lbl">Our Story</div>
        </div>
        <h2 className="sec-h reveal d1">
          CONTROL IS<br />THE ONLY<br />LUXURY.
        </h2>
        <blockquote className="about-q reveal d2">
          &ldquo;We don&apos;t follow trends.<br />We archive them.&rdquo;
        </blockquote>
        <p className="reveal d3">
          CTRL Society was born from the idea that clothing should be an extension of
          mindset — not a trend. Built independently, designed for those who move with
          intention. Every thread has purpose. Every drop is a statement.
        </p>
        <div className="reveal d4">
          <button
            className="btn btn-oc"
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
          >
            Our Story →
          </button>
        </div>
      </div>
    </section>
  )
}
