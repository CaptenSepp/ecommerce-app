import personImg from "@/assets/images/Person.jpg"
import { team } from "../about-data"

const AboutTeamSection = () => (
  <>
    <section className="about-team">
      <h2 className="about-section__title">The Team</h2>
      <div className="about-team__grid">
        {team.map((member) => (
          <div key={member.name} className="about-card about-team__card">
            <img src={personImg} alt={member.name} className="about-team__avatar" />
            <div className="about-team__name">{member.name}</div>
            <div className="about-team__role">{member.role}</div>
            <p className="about-team__quote">“{member.quote}”</p>
          </div>
        ))}
      </div>
    </section>
    <section className="about-hq">
      <h2 className="about-section__title">Where We Work</h2>
      <div className="about-hq__grid">
        <div className="about-card"><h3 className="about-card__title">Headquarters</h3><p className="about-card__body">San Francisco, CA</p><p className="about-card__body">Our brand, product, and experience teams work together here.</p></div>
        <div className="about-card"><h3 className="about-card__title">Fulfillment</h3><p className="about-card__body">Reno, NV</p><p className="about-card__body">Orders are packed fast with quality checks at every step.</p></div>
      </div>
    </section>
  </>
)

export default AboutTeamSection
