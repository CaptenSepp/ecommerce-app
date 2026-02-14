import React from "react"; // React types
import heroImg from "@/assets/images/fragrances-hero.jpg"; // placeholder image

const values = [ // value cards data
  { title: "Quality First", body: "We pick everyday products that feel premium without the premium markup." },
  { title: "Clear Pricing", body: "No surprises at checkout. What you see is what you pay." },
  { title: "Fast Dispatch", body: "We ship quickly and keep you updated at every step." },
  { title: "Support That Cares", body: "Real people, fast replies, and solutions that stick." },
];

const stats = [ // stats strip data
  { value: "120k+", label: "Orders Shipped" },
  { value: "24 hrs", label: "Avg Dispatch" },
  { value: "30 days", label: "Return Window" },
  { value: "7 days", label: "Support Week" },
];

const team = [ // team grid data
  { name: "Maya Chen", role: "Brand Lead", quote: "Details matter most when you use a product every day." },
  { name: "Luis Ortega", role: "Operations", quote: "Fast shipping is a promise, not a feature." },
  { name: "Priya Nair", role: "Customer Care", quote: "We listen, then we fix. Every time." },
  { name: "Jonas Berg", role: "Product Curator", quote: "Great value starts with great selection." },
];

const About: React.FC = () => ( // full about page
  <div className="about-page"> {/* overall page wrapper */}
    <section className="about-hero"> {/* hero block */}
      <div className="about-hero__content"> {/* text container */}
        <span className="about-hero__label">ABOUT</span> {/* small label */}
        <h1 className="about-hero__title">Built for daily essentials,</h1> {/* headline line 1 */}
        <h1 className="about-hero__title">crafted with real care.</h1> {/* headline line 2 */}
        <p className="about-hero__intro"> {/* intro paragraph */}
          We exist to make everyday shopping feel simple, honest, and reliable.
          Our focus is quality, fair pricing, and fast delivery without the noise.
        </p>
        <div className="about-hero__actions"> {/* hero buttons */}
          <a className="btn btn-primary" href="/products">Browse Products</a> {/* primary CTA */}
          <a className="btn btn-secondary" href="/products?sale=1&sort=price-asc">Shop Deals</a> {/* secondary CTA */}
        </div>
      </div>
    </section>

    <div className="about-divider" /> {/* subtle divider */}

    <section className="about-story"> {/* story split section */}
      <div className="about-story__text"> {/* left column */}
        <h2 className="about-section__title">Our Story</h2> {/* section title */}
        <p className="about-paragraph">
          We started with a simple problem: shopping for basics should not feel overwhelming.
          So we narrowed the selection to what people actually use.
        </p>
        <p className="about-paragraph">
          What makes us different is focus. We keep the catalog tight, quality high,
          and support fast so you can buy with confidence.
        </p>
      </div>
      <div className="about-story__media"> {/* right column */}
        <img src={heroImg} alt="Lifestyle" className="about-story__image" /> {/* lifestyle image */}
      </div>
    </section>

    <section className="about-values"> {/* values grid section */}
      <h2 className="about-section__title">What We Care About</h2> {/* section title */}
      <div className="about-values__grid"> {/* card grid */}
        {values.map((v) => (
          <div key={v.title} className="about-card"> {/* value card */}
            <h3 className="about-card__title">{v.title}</h3> {/* card title */}
            <p className="about-card__body">{v.body}</p> {/* card text */}
          </div>
        ))}
      </div>
    </section>

    <section className="about-stats"> {/* stats strip */}
      <div className="about-stats__box"> {/* bordered box */}
        {stats.map((s) => (
          <div key={s.label} className="about-stats__item"> {/* stat item */}
            <div className="about-stats__value">{s.value}</div> {/* big number */}
            <div className="about-stats__label">{s.label}</div> {/* small label */}
          </div>
        ))}
      </div>
    </section>

    <section className="about-team"> {/* team grid */}
      <h2 className="about-section__title">The Team</h2> {/* section title */}
      <div className="about-team__grid"> {/* team cards */}
        {team.map((t) => (
          <div key={t.name} className="about-card about-team__card"> {/* team card */}
            <div className="about-team__avatar" aria-hidden="true" /> {/* avatar circle */}
            <div className="about-team__name">{t.name}</div> {/* person name */}
            <div className="about-team__role">{t.role}</div> {/* role text */}
            <p className="about-team__quote">“{t.quote}”</p> {/* short quote */}
          </div>
        ))}
      </div>
    </section>

    <section className="about-hq"> {/* locations section */}
      <h2 className="about-section__title">Where We Work</h2> {/* section title */}
      <div className="about-hq__grid"> {/* two cards */}
        <div className="about-card"> {/* HQ card */}
          <h3 className="about-card__title">Headquarters</h3> {/* card title */}
          <p className="about-card__body">San Francisco, CA</p> {/* city */}
          <p className="about-card__body">Our brand, product, and experience teams work together here.</p> {/* description */}
        </div>
        <div className="about-card"> {/* fulfillment card */}
          <h3 className="about-card__title">Fulfillment</h3> {/* card title */}
          <p className="about-card__body">Reno, NV</p> {/* region */}
          <p className="about-card__body">Orders are packed fast with quality checks at every step.</p> {/* description */}
        </div>
      </div>
    </section>

    <section className="about-cta"> {/* closing CTA */}
      <div className="about-cta__box"> {/* bordered box */}
        <h2 className="about-cta__title">Ready to browse what we picked?</h2> {/* closing headline */}
        <p className="about-cta__text">Start with our bestsellers or check the latest deals.</p> {/* supporting line */}
        <div className="about-cta__actions"> {/* CTA buttons */}
          <a className="btn btn-primary" href="/products">Browse Products</a> {/* primary */}
          <a className="btn btn-secondary" href="/products?sale=1&sort=price-asc">Shop Deals</a> {/* secondary */}
        </div>
      </div>
    </section>
  </div>
);

export default About;
