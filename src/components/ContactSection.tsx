// src/components/ContactSection.tsx
import { useState } from 'react'

const ContactSection = () => {
  // Local state to store form values (no actual submit logic yet)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: connect to backend or email service
    alert(`Thanks, ${name}! We'll reach you at ${email}.`)
  }

  return (
    <section
      className="contact-section bg-cover-center"
      style={{ backgroundImage: "url('/src/assets/images/contact-bg.jpg')" }}
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

export default ContactSection
