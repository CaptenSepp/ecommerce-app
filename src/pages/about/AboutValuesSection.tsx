import { stats, values } from "./about-data"

const AboutValuesSection = () => (
  <>
    <section className="about-values">
      <h2 className="about-section__title">What We Care About</h2>
      <div className="about-values__grid">
        {values.map((valueItem) => (
          <div key={valueItem.title} className="about-card">
            <h3 className="about-card__title">{valueItem.title}</h3>
            <p className="about-card__body">{valueItem.body}</p>
          </div>
        ))}
      </div>
    </section>
    <section className="about-stats">
      <div className="about-stats__box">
        {stats.map((statItem) => (
          <div key={statItem.label} className="about-stats__item">
            <div className="about-stats__value">{statItem.value}</div>
            <div className="about-stats__label">{statItem.label}</div>
          </div>
        ))}
      </div>
    </section>
  </>
)

export default AboutValuesSection
