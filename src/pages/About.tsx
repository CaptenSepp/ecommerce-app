import React from "react"
import { Link } from "react-router-dom"
import storyImg from "@/assets/images/Banner-middle.png"
import AboutTeamSection from "./about/AboutTeamSection"
import AboutValuesSection from "./about/AboutValuesSection"

const About: React.FC = () => (
  <div className="about-page">
    <section className="about-hero">
      <div className="about-hero__content">
        <span className="about-hero__label">ABOUT</span>
        <h1 className="about-hero__title">Built for daily essentials,</h1>
        <h1 className="about-hero__title">crafted with real care.</h1>
        <p className="about-hero__intro">We exist to make everyday shopping feel simple, honest, and reliable. Our focus is quality, fair pricing, and fast delivery without the noise.</p>
        <div className="about-hero__actions"><Link className="btn btn-primary" to="/products">Browse Products</Link><Link className="btn btn-secondary" to="/products?sale=1&sort=price-asc">Shop Deals</Link></div>
      </div>
    </section>
    <div className="about-divider" />
    <section className="about-story">
      <div className="about-story__text"><h2 className="about-section__title">Our Story</h2><p className="about-paragraph">We started with a simple problem: shopping for basics should not feel overwhelming. So we narrowed the selection to what people actually use.</p><p className="about-paragraph">What makes us different is focus. We keep the catalog tight, quality high, and support fast so you can buy with confidence.</p></div>
      <div className="about-story__media"><img src={storyImg} alt="Our Story" className="about-story__image" /></div>
    </section>
    <AboutValuesSection />
    <AboutTeamSection />
    <section className="about-cta">
      <div className="about-cta__box">
        <h2 className="about-cta__title">Ready to browse what we picked?</h2>
        <p className="about-cta__text">Start with our bestsellers or check the latest deals.</p>
        <div className="about-cta__actions"><Link className="btn btn-primary" to="/products">Browse Products</Link><Link className="btn btn-secondary" to="/products?sale=1&sort=price-asc">Shop Deals</Link></div>
      </div>
    </section>
  </div>
)

export default About
