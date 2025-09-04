import { Outlet } from "react-router-dom";
import { useState } from 'react'

const Main = () => {
  return (
    <main className="flex-1">
      <Outlet />
      <section className="section" />
      <div className="relative flex flex-col items-left h-70 bg-cover bg-center bg-no-repeat bg-gray-200">
        <ContactSection />
      </div>
    </main>
  );
};

export default Main;

// Inlined contact section from layout-page/ContactSection
import heroImg from '../../assets/images/fragrances-hero.jpg';

const ContactSection = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thanks, ${name}! We'll reach you at ${email}.`)
  }

  return (
    <section
      className="contact-section bg-cover-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          className="contact-input"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="contact-input"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button className="btn btn-primary btn-sm" type="submit">
          Subscribe
        </button>
      </form>
    </section>
  )
}
