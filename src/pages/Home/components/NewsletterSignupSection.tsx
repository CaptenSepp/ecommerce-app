import newsletterBannerImg from "@/assets/images/Banner-newsletter.png"

const NewsletterSignupSection = () => {
  return (
    <section className="w-full py-10 contact-section">
      <div className="flex w-full flex-col gap-0 px-4 md:flex-row">
        <div className="md:w-1/2">
          <img
            src={newsletterBannerImg} // Show the newsletter image in the left half.
            alt="Newsletter banner"
            className="h-full w-full rounded-lg object-cover" // Fill the area without stretching the image.
            loading="lazy"
          />
        </div>

        <div className="flex flex-col items-start gap-4 md:w-1/2 contact-form-wrap">
          <div className="text-left">
            <h2 className="mb-1 u-text-white">Subscribe to our newsletter</h2>
            <p className="u-text-sm u-text-white-80">
              Get fresh deals and product updates delivered weekly.
            </p>
          </div>

          <form
            className="contact-form"
            onSubmit={(event) => event.preventDefault()} // Keep the current static demo behavior.
          >
            <input className="contact-input" type="text" placeholder="Your name" />
            <input className="contact-input" type="email" placeholder="Email address" />
            <button type="submit" className="btn btn-primary btn-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSignupSection
