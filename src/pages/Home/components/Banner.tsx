import heroImg from "../../../assets/images/fragrances-hero.jpg";

const Banner = () => {
  return (
    <div className="">
      <section className="relative w-screen full-bleed">
        {/* Image behaves like other banners (fits width, keeps aspect) */}
        <img
          src={heroImg}
          alt="Fragrances hero"
          className="block w-full h-auto"
        />

        {/* Subtle readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" aria-hidden="true" />

        {/* Content overlay stays left-anchored with a responsive offset */}
        <div className="absolute inset-0">
          <div className="absolute left-[clamp(1rem,3vw,4rem)] top-[clamp(2rem,8vw,10rem)]">
            <div className="max-w-prose">
              <h1>
                Inspiring Quote and
                <strong className="text-brand-orange"> word in Focus </strong>
                after it
              </h1>

              <p className="mt-4 text-pretty text-brand-black">
                {/* TODO must be changed */}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,
                nisi. Natus, provident accusamus impedit minima harum corporis
                iusto.
              </p>

              <div className="mt-4 flex gap-4">
                <a className="btn btn-primary" href="#">
                  Get Started
                </a>

                <a className="btn btn-secondary" href="#">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
