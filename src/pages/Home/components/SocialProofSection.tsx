const testimonials = [ // fake testimonials
  { name: "Ava L.", text: "Fast shipping and great quality. I reordered in the same week." },
  { name: "Noah R.", text: "The essentials are actually useful. Simple checkout, quick delivery." },
  { name: "Sophia K.", text: "Support replied fast and fixed my issue right away." },
];

const SocialProofSection = () => ( // testimonials section
  <section className="social-proof"> {/* section wrapper */}
    <div className="social-proof__title">What Customers Say</div> {/* section title */}
    <div className="social-proof__grid"> {/* cards grid */}
      {testimonials.map((t) => (
        <div key={t.name} className="social-proof__card"> {/* testimonial card */}
          <div className="social-proof__name">{t.name}</div> {/* customer name */}
          <div className="social-proof__stars">★★★★★</div> {/* static stars */}
          <p className="social-proof__text">{t.text}</p> {/* review text */}
        </div>
      ))}
    </div>
  </section>
);

export default SocialProofSection;
