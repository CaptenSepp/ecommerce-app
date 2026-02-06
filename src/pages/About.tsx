import React from 'react'

// renders a simple About page (component) with centered content (layout)
const About: React.FC = () => 
(
  // centers the section vertically and horizontally (layout)
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 className="text-2xl font-bold mb-4">About Us</h1>
    <p className="text-lg text-center max-w-md">
      We are a team of passionate developers dedicated to building amazing web applications.
      Our mission is to create user-friendly and efficient solutions for our clients.
    </p>
  </div>
)

export default About
