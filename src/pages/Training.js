import React, { useRef } from "react";
import { motion } from "framer-motion";
import{ Button } from "../components/ui/button"; // Changed from { Button } to Button
import { Link } from "react-router-dom"; 

export default function App() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const visionRef = useRef(null);
  const aboutRef = useRef(null);
  const productRef = useRef(null);
  const resourcesRef = useRef(null);
  const middleDivRef = useRef(null);
  // sequence fade+slide up
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.2, ease: "easeOut" },
    }),
  };

  // simple fade+up
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <main ref={containerRef} className="overflow-x-hidden">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-20 py-20"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Add the Title Text Here
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            This is a space to showcase content in the site. Add here
            description and copy that relates what the site is all about, and
            add an engaging message or values.
          </p>
          <Button className="rounded-full px-8 py-2 border-gray-300">
            Learn More
          </Button>
        </motion.div>

        <div className="relative w-full max-w-5xl h-[400px] md:h-[500px]">
          {/* Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="
      absolute
      top-[50px]          /* 25% down from top */
      left-[100px]           /* flush to left edge of container */
      w-[290px]             /* 240px */
      h-[252px]
      z-[1]                /* Changed from z-index-[1] to z-[1] */
      bg-gradient-to-br from-gray-100 to-gray-200
      rounded-2xl
      shadow-lg
      overflow-hidden
      "
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[100px] h-[100px] rounded-full bg-white opacity-80" />
            </div>
          </motion.div>

          {/* Middle (with top slide-in animation) */}
          <motion.div
            ref={middleDivRef}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="
    absolute
    top-[-20px]
    left-[350px]
    w-80
    h-[550px]
    bg-gradient-to-br from-gray-100 to-gray-200
    rounded-2xl
    shadow-xl
    z-[0]
    overflow-hidden
    transform -translate-x-1/2
  "
          >
            <div className="w-full h-full relative">
              <div className="absolute bottom-0 right-0 w-[200px] h-[200px] rounded-full bg-white opacity-50 translate-x-1/4 translate-y-1/4" />
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeInUp}
            className="
      absolute
      bottom-0          /* flush to bottom of container */
      right-[80px]           /* flush to right edge */
      w-[294px]             /* 256px */
      h-[258px]             /* 192px */
      bg-gradient-to-br from-blue-100 to-purple-100
      rounded-2xl
      z-[1]
      shadow-lg
      overflow-hidden
      "
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[80px] h-[80px] rounded-full bg-white opacity-80" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section
        ref={visionRef}
        className="py-20 px-6 md:px-12 lg:px-20 relative z-10"
      >
        {" "}
        {/* Added relative and z-10 */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-64 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="md:w-1/3 sticky top-20" // Added sticky positioning
            >
              <h2 className="text-3xl font-bold mb-4">Vision</h2>
              <p className="text-gray-600 mb-4">
                This is the space to introduce visitors to the business or
                brand. Briefly explain who's behind it, what it does, and what
                makes it unique. Share its core values and what this site has to
                offer.
              </p>
              <p className="text-gray-600">
                This is the space to showcase content in the site. Add here
                description and copy.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/3 relative z-1" // Added relative and z-1
            >
              <div className="w-full h-[300px] bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg" />
            </motion.div>
          </div>
        </div>
      </section>
      <section
        ref={aboutRef}
        className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={0}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">About</h2>
          <p className="text-gray-600 max-w-3xl">
            Add a description about your business or services…
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              { label: "10K", delay: 1 },
              { label: "250", delay: 2 },
              { label: "3K", delay: 3 },
              { label: "+45%", delay: 4 },
            ].map(({ label, delay }, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={delay}
                className="text-center"
              >
                <h3 className="text-3xl font-bold mb-4">{label}</h3>
                <p className="text-sm text-gray-600">
                  Use this space to elaborate on the headline…
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Product Section */}
      <section ref={productRef} className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <div className="w-full h-[300px] bg-gray-100 rounded-lg" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={1}
            className="md:w-1/2"
          >
            <h2 className="text-3xl font-bold mb-6">Our Product</h2>
            <p className="text-gray-600 mb-8">
              Showcase the value proposition of each offering…
            </p>
            <Button className="bg-gray-900 hover:bg-gray-800">
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Resources Section */}
      <section
        ref={resourcesRef}
        className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={0}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-12 text-blue-900">
            Agricultural Training Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image:
                  "https://images.pexels.com/photos/28375744/pexels-photo-28375744/free-photo-of-aerial-view-of-tractor-plowing-farmland.jpeg",
                title: "Practical Training",
                description:
                  "Discover the latest advancements in agricultural technology...",
                category: "Land Preparation and Sowing Techniques",
              },
              {
                image:
                  "https://images.pexels.com/photos/6126974/pexels-photo-6126974.jpeg",
                title: "Sustainable Agriculture",
                description: "Learn about eco-friendly farming practices...",
                category: "Climate-Smart Agriculture Techniques",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={i * 0.5}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="h-[200px] relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-semibold">
                      Watch Now
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {item.description}
                  </p>
                  <Link
                    to="/watch"
                    state={{
                      category:
                        item.title === "Practical Training"
                          ? "Land Preparation and Sowing Techniques"
                          : "Climate-Smart Agriculture Techniques",
                      videoType:
                        item.title === "Practical Training"
                          ? "practical"
                          : "sustainable",
                    }}
                    className="text-indigo-600 text-sm font-medium hover:underline inline-flex items-center"
                  >
                    Watch Video
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
