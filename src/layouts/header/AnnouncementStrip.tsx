import { useEffect, useState } from "react"
import { announcementMessages } from "./header-tools"

const AnnouncementStrip = () => {
  const [activeMessageIndex, setActiveMessageIndex] = useState(0) // current visible message

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveMessageIndex((previousIndex) => (previousIndex + 1) % announcementMessages.length)
    }, 3200) // rotate every few seconds

    return () => window.clearInterval(intervalId) // clear on unmount
  }, [])

  return (
    <div className="header-announcement" aria-live="polite">
      <span className="header-announcement__text">{announcementMessages[activeMessageIndex]}</span>
    </div>
  )
}

export default AnnouncementStrip
