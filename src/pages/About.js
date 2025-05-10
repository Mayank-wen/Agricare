import React, { useState ,useEffect} from 'react';
import '../css/About.css';

const About = () => {
  const [showBottomNotification, setShowBottomNotification] = useState(true);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, observerOptions);

    // Observe all elements with slide-in class
    document.querySelectorAll('.slide-in').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);
  const [showTopNotification, setShowTopNotification] = useState(true);
  
  return (
    <div className="about-container">
      <div className="header">
        <h1 className="slide-in">About</h1>
      </div>
      <div className="divider slide-in delay-100"></div>
      <div className="content-container">
        <div className="vision-column">
          <h2 className="section-title slide-in delay-200">• Our Vision</h2>
          <div className="section-content">
            <p className="slide-in delay-300">
              This is a space to welcome visitors to the site. Grab their attention 
              with copy that clearly states what the site is about, and add an 
              engaging image or video.
            </p>   
            <div className="vision-image slide-in delay-400">
              <img 
                src="https://images.pexels.com/photos/31835038/pexels-photo-31835038/free-photo-of-aerial-view-of-verdant-hills-in-rwanda.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Vision illustration" 
              />
            </div>
          </div>
        </div>
        <div className="mission-column">
          <h2 className="section-title slide-in delay-200">• Our Mission</h2>
          
          <div className="section-content">
            <p className="slide-in delay-300">
              This is a space to welcome visitors to the site. Grab their attention 
              with copy that clearly states what the site is about, and add an 
              engaging image or video.
            </p>
            
            <div className="mission-visual">
              <div className="globe-image slide-in delay-400"></div>
              
              {showTopNotification && (
                <div className="notification top-notification slide-in delay-500">
                  <div className="notification-badge">Crucial Notification</div>
                  <div className="notification-content">
                    Significant increase in CO2 levels detected
                  </div>
                  <button 
                    className="close-icon"
                    onClick={() => setShowTopNotification(false)}
                  >
                    ✕
                  </button>
                </div>
              )}
              
              {showBottomNotification && (
                <div className="notification bottom-notification slide-in delay-500">
                  <button 
                    className="close-icon"
                    onClick={() => setShowBottomNotification(false)}
                  >
                    ✕
                  </button>
                  <div className="notification-badge">Crucial Notification</div>
                  <div className="notification-content">
                    Monitoring extreme weather in your region
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="footer slide-in delay-500">
        <span>Open Merlin</span>
      </div>
    </div>
  );
};

export default About;