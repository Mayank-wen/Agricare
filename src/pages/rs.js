import { useEffect, useState } from "react";

const HeroSection = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    {
      url: "https://media.istockphoto.com/id/1989091367/photo/agronomist-examining-green-corn-cob.jpg?b=1&s=612x612&w=0&k=20&c=zwpsXWsSIJX2y0umZpFhjq99BlO-VdoPFRbao0i5JjU=",
      alt: "Baking background 1",
    },
    {
      url: "https://images.pexels.com/photos/20571208/pexels-photo-20571208/free-photo-of-magnifying-glass-on-ears-of-grain-in-overhead-view.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Baking background 2",
    },
    {
      url: "https://images.pexels.com/photos/30557521/pexels-photo-30557521/free-photo-of-person-examining-vineyard-plants-in-leognan.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Baking background 3",
    },
  ];

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);

    // Auto-advance carousel every 5 seconds
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const slideAnimation = {
    entering: {
      transform: `translateY(-100%) translateY(${offsetY * 0.2}px)`,
      opacity: 0,
    },
    active: {
      transform: `translateY(0) translateY(${offsetY * 0.2}px)`,
      opacity: 1,
    },
    exiting: {
      transform: `translateY(100%) translateY(${offsetY * 0.2}px)`,
      opacity: 0,
    },
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 relative overflow-hidden -mt-7">
      <div
        className="bg-[#f8f5f0] p-10 md:p-10 h-[800px] flex flex-col justify-center relative z-10"
        style={{
          marginTop: `${offsetY *10}px`,
          transform: `translateY(${offsetY * 0.5}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <h1 className="text-2xl font-dark mb-4 text-blue-600">
          BAKING
          <br />
          WORKSHOPS
          <br />& CLASSES
        </h1>
        <p className="text-sm mb-6 max-w-md text-blue-500">
          Discover how to create delicious & visually stunning baked goods with
          our expert-led workshops and classes. Perfect for beginners and
          experienced bakers alike.
        </p>
        <button className="btn btn-outline w-fit px-6 text-blue-600 hover:text-blue-700">
          LEARN MORE
        </button>
      </div>
      <div className="relative h-[800px] md:h-auto">
        <div
          className="absolute inset-0 bg-amber-800/30 flex items-center justify-center z-10"
          style={{
            transform: `translateY(${offsetY * 0.3}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <h2 className="text-6xl md:text-8xl text-blue-500 font-serif">
            JOYFUL
          </h2>
        </div>
        {/* Carousel */}
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 w-full h-full"
              style={{
                ...slideAnimation[
                  currentImage === index
                    ? "active"
                    : currentImage === (index + 1) % images.length
                    ? "entering"
                    : "exiting"
                ],
                transition: "transform 1s ease-out, opacity 1s ease-out",
              }}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
          {/* Carousel Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  currentImage === index ? "bg-blue-600" : "bg-white/50"
                }`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const BakingImagesSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative h-[800px] group overflow-hidden">
        <img
          src="https://images.pexels.com/photos/11596299/pexels-photo-11596299.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="People baking together"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay with text */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-3xl font-bold text-white mb-4">
            Expert Guidance
          </h3>
          <p className="text-white/90 text-lg max-w-md">
            Learn from experienced professionals who are passionate about
            sharing their knowledge and helping you develop your skills.
          </p>
        </div>
      </div>
      <div className="relative h-[800px] group overflow-hidden">
        <img
          src="https://images.pexels.com/photos/30557521/pexels-photo-30557521/free-photo-of-person-examining-vineyard-plants-in-leognan.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Baking ingredients"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay with text */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-3xl font-bold text-white mb-4">
            Quality Materials
          </h3>
          <p className="text-white/90 text-lg max-w-md">
            Work with premium ingredients and professional equipment to create
            exceptional results every time.
          </p>
        </div>
      </div>
    </section>
  );
};

const BakingPage = () => {
  return (
    <main>
      <HeroSection />
      <BakingImagesSection />
    </main>
  );
};

export default BakingPage;
