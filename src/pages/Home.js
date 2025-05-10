import { useState } from "react";
import "../css/home.css";
import Navbar from "../components/Navbar";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="climaxica-container">   
      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            {[
              "About Climaxica",
              "Platform Solution",
              "Resources",
              "Ethical Standards",
              "Careers",
            ].map((item, index) => (
              <li key={item} className={`slide-in delay-${(index + 1) * 100}`}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="slide-in">
              <span className="slide-in delay-100">Reduce Carbon,</span>{" "}
              <span className="slide-in delay-200">
                Restore <span className="highlight">Nature</span>
              </span>
            </h1>
            <p className="subtitle slide-in delay-300">
              Analyzing the materials of the future with AI
            </p>
          </div>
          <div className="welcome-text">
            <p className="slide-in delay-400">
              This is a space to welcome visitors to the site. Grab their
              attention with copy that clearly states what the site is about,
              and add an engaging image or video.
            </p>
          </div>
        </div>
      </section>

      <section className="nav-numbers">
        <div className="nav-numbers-container">
          <div className="numbers-row">
            {["01", "02", "03", "04", "05"].map((number, index) => (
              <div
                key={number}
                className={`slide-in delay-${(index + 1) * 100}`}
              >
                {number}
              </div>
            ))}
          </div>
          <div className="nav-items-row">
            {[
              "• About",
              "• Platform Solution",
              "• Resources",
              "• Ethical Standards",
              "• Careers",
            ].map((item, index) => (
              <div key={item} className={`slide-in delay-${(index + 1) * 100}`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="background-image" />
    </div>
  );
};

export default Home;
