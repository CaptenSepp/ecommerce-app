import heroImg from "@/assets/images/fragrances-hero.jpg"; // placeholder image

const BrandStoryMini = () => ( // condensed story section
  <section className="brand-mini"> {/* section wrapper */}
    <div className="brand-mini__text"> {/* text column */}
      <div className="brand-mini__label">Our Philosophy</div> {/* small label */}
      <div className="brand-mini__headline">Everyday goods, chosen with care.</div> {/* mission line */}
      <p className="brand-mini__body">
        We keep the catalog focused and the quality high so shopping stays simple.
        Our team is obsessed with value, speed, and honest service.
      </p>
      <a className="brand-mini__link" href="/about">Learn more →</a> {/* about link */}
    </div>
    <div className="brand-mini__media"> {/* image column */}
      <img src={heroImg} alt="Lifestyle" className="brand-mini__image" /> {/* image */}
      <div className="brand-mini__overlay" aria-hidden="true" /> {/* soft overlay */}
    </div>
  </section>
);

export default BrandStoryMini;
