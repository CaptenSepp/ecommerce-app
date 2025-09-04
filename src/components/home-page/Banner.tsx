import heroImg from "../../assets/images/fragrances-hero.jpg";

const Banner = () => {
  return (
    <div className="">
      <section
        className="w-full h-[20vw] bg-cover"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16">
          <div className="max-w-prose">
            <h1 className=" ">
              Inspiring Quote and
              <strong className="text-amber-500"> word in Focus </strong>
              after it
            </h1>

            <p className="mt-4   text-pretty text-black">
              {/* TODO must be changed */}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,
              nisi. Natus, provident accusamus impedit minima harum corporis
              iusto.
            </p>

            <div className="mt-4 flex gap-4">
              <a
                className="inline-block rounded-lg border border-black bg-amber-600 px-5 py-3 font-medium text-black shadow-sm transition-colors hover:bg-yellow-800 hover:text-white hover:border-black"
                href="#"
              >
                Get Started
              </a>

              <a
                className="inline-block rounded-lg border border-black  bg-white px-5 py-3 font-medium text-black shadow-sm transition-colors hover:text-black hover:bg-gray-300"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
