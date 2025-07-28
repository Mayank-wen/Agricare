import React from "react";
import styled from "styled-components";

// Add this styled component for the video background
const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 23px;
  z-index: 0;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3;
  }
`;

const Card = ({
  temperature,
  location,
  date,
  weatherCondition = "Clear",
  humidity,
  windSpeed,
  moisture,
}) => {
  // Add time-based background
  const currentHour = new Date().getHours();
  const isNight = currentHour < 6 || currentHour >= 18;

  // Format location display
  const locationDisplay = {
    city: location?.city || "Loading location...",
    country: location?.state
      ? `${location.state}, ${location.country}`
      : location?.country || "",
  };

  const renderWeatherIcon = () => {
    switch (weatherCondition.toLowerCase()) {
      case "clouds":
        return (
          <div className="container cloudy">
            <div className="cloud front">
              <span className="left-front" />
              <span className="right-front" />
            </div>
            <div className="cloud back">
              <span className="left-back" />
              <span className="right-back" />
            </div>
          </div>
        );
      case "rain":
        return (
          <div className="container rainy">
            <div className="cloud front">
              <span className="left-front" />
              <span className="right-front" />
            </div>
            <div className="rain-drops" />
          </div>
        );
      case "snow":
        return (
          <div className="container snowy">
            <div className="cloud front">
              <span className="left-front" />
              <span className="right-front" />
            </div>
            <div className="snow-crystals" />
          </div>
        );
      case "fog":
      case "mist":
      case "haze":
        return (
          <div className="container foggy">
            <div className="fog-container">
              <div className="fog-img fog-img-first"></div>
              <div className="fog-img fog-img-second"></div>
            </div>
          </div>
        );
      case "thunderstorm":
        return (
          <div className="container stormy">
            <div className="cloud front">
              <span className="left-front" />
              <span className="right-front" />
            </div>
            <div className="lightning" />
          </div>
        );
      case "clear":
      default:
        return (
          <div className="container">
            {isNight ? (
              <>
                <span className="moon" />
                <span className="stars" />
              </>
            ) : (
              <>
                <span className="sun sunshine" />
                <span className="sun" />
              </>
            )}
          </div>
        );
    }
  };

  const getWeatherVideo = () => {
    switch (weatherCondition.toLowerCase()) {
      case "rain":
        return "https://videos.pexels.com/video-files/856960/856960-sd_640_360_25fps.mp4";
      case "snow":
        return "https://videos.pexels.com/video-files/1856985/1856985-sd_640_360_25fps.mp4";
      case "thunderstorm":
        return "https://videos.pexels.com/video-files/855936/855936-sd_640_360_30fps.mp4";
      case "clouds":
        return "https://videos.pexels.com/video-files/855785/855785-sd_640_360_24fps.mp4";
      case "fog":
        return "https://videos.pexels.com/video-files/2534297/2534297-sd_640_360_30fps.mp4";
      case "mist":
        return"https://videos.pexels.com/video-files/1405527/1405527-sd_640_360_30fps.mp4";
      case "haze":
        return "https://videos.pexels.com/video-files/8820216/8820216-sd_640_360_25fps.mp4";
      default:
        return isNight ? "https://videos.pexels.com/video-files/854739/854739-sd_640_360_30fps.mp4" : "https://videos.pexels.com/video-files/1730393/1730393-sd_640_360_25fps.mp4";
    }
  };
  return (
    <StyledWrapper
      $weatherCondition={weatherCondition.toLowerCase()}
      $isNight={isNight}
    >
      <div className="card">
        <VideoBackground>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={`/images/${weatherCondition.toLowerCase()}.jpg`}
          >
            <source src={getWeatherVideo()} type="video/mp4" />
          </video>
        </VideoBackground>
        {renderWeatherIcon()}
        <div className="card-header">
          <span>
            {locationDisplay.city}
            <br />
            {locationDisplay.country}
          </span>
          <span>{date}</span>
        </div>
        <div className="weather-info">
          <div className="temp-container">
            <span className="temp">{temperature?.toFixed(1)}°</span>
          </div>
          <div className="weather-details">
            <div className="detail">
              <i className="fas fa-tint"></i>
              <span>{humidity}%</span>
              <small>Humidity</small>
            </div>
            <div className="detail">
              <i className="fas fa-wind"></i>
              <span>{windSpeed}</span>
              <small>Wind</small>
            </div>
            <div className="detail">
              <i className="fas fa-water"></i>
              <span>{moisture}%</span>
              <small>Moisture</small>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 100%; // Change from fixed width to 100%
    max-width: calc(100vw - 40px); // Add max-width with some padding
    height: 480px;
    position: relative;
    padding: 25px;
    background: transparent;
    box-shadow: 0px 155px 62px rgba(0, 0, 0, 0.01),
      0px 87px 52px rgba(0, 0, 0, 0.05), 
      0px 39px 39px rgba(0, 0, 0, 0.09),
      0px 10px 21px rgba(0, 0, 0, 0.1);
    border-radius: 23px;
    transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
    cursor: pointer;
    z-index: 1;
  }

  .card:hover {
    transform: scale(1.05);
  }

  .container {
    width: 250px;
    height: 250px;
    position: absolute;
    right: -35px;
    top: -50px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0.7);
  }

  .cloud {
    width: 250px;
  }

  .front {
    padding-top: 45px;
    margin-left: 25px;
    display: inline;
    position: absolute;
    z-index: 11;
    animation: clouds 8s infinite;
    animation-timing-function: ease-in-out;
  }

  .back {
    margin-top: -30px;
    margin-left: 150px;
    z-index: 12;
    animation: clouds 12s infinite;
    animation-timing-function: ease-in-out;
  }

  .right-front {
    width: 45px;
    height: 45px;
    border-radius: 50% 50% 50% 0%;
    background-color: #4c9beb;
    display: inline-block;
    margin-left: -25px;
    z-index: 5;
  }

  .left-front {
    width: 65px;
    height: 65px;
    border-radius: 50% 50% 0% 50%;
    background-color: #4c9beb;
    display: inline-block;
    z-index: 5;
  }

  .right-back {
    width: 50px;
    height: 50px;
    border-radius: 50% 50% 50% 0%;
    background-color: #4c9beb;
    display: inline-block;
    margin-left: -20px;
    z-index: 5;
  }

  .left-back {
    width: 30px;
    height: 30px;
    border-radius: 50% 50% 0% 50%;
    background-color: #4c9beb;
    display: inline-block;
    z-index: 5;
  }

  .sun {
    width: 120px;
    height: 120px;
    background: -webkit-linear-gradient(to right, #fcbb04, #fffc00);
    background: linear-gradient(to right, #fcbb04, #fffc00);
    border-radius: 60px;
    display: inline;
    position: absolute;
  }

  .sunshine {
    animation: sunshines 2s infinite;
  }

  @keyframes sunshines {
    0% {
      transform: scale(1);
      opacity: 0.6;
    }

    100% {
      transform: scale(1.4);
      opacity: 0;
    }
  }

  @keyframes clouds {
    0% {
      transform: translateX(15px);
    }

    50% {
      transform: translateX(0px);
    }

    100% {
      transform: translateX(15px);
    }
  }
.card-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: absolute;
    top: 25px;
    left: 25px;
    z-index: 2;
  }

  .card-header span:first-child {
    word-break: break-word;
    font-weight: 800;
    font-size: 28px; // Increased from 18px
    line-height: 135%;
    color: ${(props) =>
      props.$isNight ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)"};
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    margin-bottom: 4px;
  }

  .card-header span:last-child {
    font-weight: 600;
    font-size: 18px; // Increased from 15px
    line-height: 135%;
    color: ${(props) =>
      props.$isNight ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"};
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  }

 
  .temp {
    position: relative;
    left: 0;
    bottom: 0;
    font-weight: 700;
    font-size: 64px;
    line-height: 77px;
    color: ${(props) =>
      props.$isNight ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)"};
  }

  .temp-scale {
    width: 80px;
    height: 36px;
    position: absolute;
    right: 25px;
    bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.5); // Made more transparent
    border-radius: 9px;

    span {
      font-weight: 700;
      font-size: 13px;
      line-height: 134.49%;
      color: ${(props) =>
        props.$isNight ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
    }
  }

  .rain-drops {
    position: absolute;
    width: 2px;
    height: 8px;
    background: #4c9beb;
    border-radius: 50%;
    animation: rain 1s infinite linear;
    &:nth-child(2n) {
      animation-delay: 0.3s;
    }
    &:nth-child(3n) {
      animation-delay: 0.6s;
    }
  }

  .snow-crystals {
    position: absolute;
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
    animation: snow 3s infinite linear;
    &:nth-child(2n) {
      animation-delay: 1s;
    }
    &:nth-child(3n) {
      animation-delay: 2s;
    }
  }

  .cloudy .sun {
    opacity: 0.4;
  }

  .rainy {
    background: ${(props) =>
      props.$weatherCondition === "rain" ? "#4c9beb33" : "transparent"};
  }

  .snowy {
    background: ${(props) =>
      props.$weatherCondition === "snow" ? "#ffffff33" : "transparent"};
  }

  @keyframes rain {
    0% {
      transform: translateY(-10px);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateY(30px);
      opacity: 0;
    }
  }

  @keyframes snow {
    0% {
      transform: translateY(-10px) rotate(0deg);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateY(30px) rotate(360deg);
      opacity: 0;
    }
  }

  .moon {
    width: 100px;
    height: 100px;
    background: #ffd700;
    border-radius: 50%;
    box-shadow: 15px 15px 0 0 #fff9c4;
    opacity: ${(props) => (props.$isNight ? 1 : 0)};
    transition: opacity 0.3s ease;
  }

  .stars {
    position: absolute;
    width: 3px;
    height: 3px;
    background: white;
    border-radius: 50%;
    box-shadow: 15px 15px white, 25px 25px white, 35px -15px white,
      -15px 25px white, -25px -25px white;
    opacity: ${(props) => (props.$isNight ? 1 : 0)};
    animation: twinkle 1.5s infinite alternate;
  }

  .fog-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .fog-img {
    position: absolute;
    height: 100%;
    width: 300%;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAgCAYAAADkK90uAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMC8yOS8xMiKqq3kAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVxteM2AAACHklEQVRoge2a23HDMAxEYTgFpISUkBLcgktICe7AJagEd+AS0kFKcAfRx8WjM1qZG0p2HG8S+jEPXpAg9CK2JKdRkiRX7TvVrKT0nR8pHwlnSUt/fqymL31m5XKfLTftS0nnmm0laXFt6FBLf1m51+xjSd9ru0uq2V4kvUj6lPQm6VRbGiBpknRot6F2Rm0j+kT/Zb57P06K89mHMLEjSB1BmtUGaPeTpIWkdwXjhaSLIhGSlkFsh+X79r0pjDMr1GI/NdtA0qz7GSCPHQLUSRre1wgZXpM0+7mRtK/ZPWagU0tMOljdJZN0kvRVs89qZwL7xvFAkiRJA+QK4XCpFRcyOD8OXxz7iKTCuZ1zvTV51G0PO31IWgXjwNlMu9K/+L5OVHv0L+47KdgPrv9r4Qj+bqzZZ0mnluN9jyahz0V3BPuIPcLXOXcc3U9rqZ1hkqS0Q2q2E8GzmStAhSTD+ErQY4IEcOKOMEet7VOtyaIQ/D5Jw3GzazbfUduNJ2BJkiRJkiRJkiRJkiRJ8vxgh3niY/QVC1TsggX7YRcsZoV7+8kpOlp4ousY2/+MIz7X1lDCEe5t5/fQ0Zk/xSFBbqX840x2yEqwLIwDQoDgEJaQd1go98o3XKGcRYQcZ7jC/ihc70vzjJv1niCDcUrcv8T5EtnOYHzJ19GZEOQxUF6jt+lSs++9uv/J/6s/82/hgZzwmpwAAAAASUVORK5CYII=")
      repeat-x;
    animation: fogAnimation 60s linear infinite;
    opacity: 0.5;
  }

  .fog-img-first {
    animation: fogAnimation 60s linear infinite;
  }

  .fog-img-second {
    animation: fogAnimation2 60s linear infinite;
  }

  .lightning {
    position: absolute;
    width: 12px;
    height: 45px;
    background: #ffd700;
    transform: translateY(20px);
    animation: lightning 1.5s infinite;
    filter: drop-shadow(0 0 10px #fff);
  }

  @keyframes fogAnimation {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes fogAnimation2 {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(200%);
    }
  }

  @keyframes twinkle {
    0% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes lightning {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    20% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    40% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  ${(props) =>
    props.$isNight &&
    `
    .card {
      background: radial-gradient(
        178.94% 106.41% at 26.42% 106.41%,
        #03045e 0%,
        rgba(0, 0, 0, 0.8) 71.88%
      );
    }
    
    .card-header span,
    .temp,
    .temp-scale span {
      color: rgba(255, 255, 255, 0.8);
    }
  `}

  ${(props) =>
    props.$weatherCondition === "fog" ||
    props.$weatherCondition === "mist" ||
    (props.$weatherCondition === "haze" &&
      `
    .card {
      background: #f8f9fa;
    }
  `)}

  .weather-info {
    position: absolute;
    left: 25px;
    right: 25px;
    bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .temp-container {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .temp {
    font-weight: 700;
    font-size: 64px;
    color: rgba(255, 255, 255, 1);
  }

  .temp-scale {
    background: rgba(255, 255, 255, 0.1);
    padding: 8px 12px;
    border-radius: 9px;

    span {
      font-weight: 700;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .weather-details {
    display: flex;
    gap: 40px; // Increased gap for better spacing
    align-items: center;
    margin-right: 230px;
    margin-bottom: 20px;
  }

  .detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgba(255, 255, 255, 0.9); // Increased opacity for better visibility

    i {
      font-size: 40px; // Increased from 18px
      margin-bottom: 8px; // Increased from 5px
    }

    span {
      font-size: 40px; // Increased from 16px
      font-weight: 600;
      margin-bottom: 4px;
    }

    small {
      font-size: 40px; // Increased from 12px
      opacity: 0.8; // Increased from 0.7
      font-weight: 500;
    }
  }

  .detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgba(255, 255, 255, 0.8);
    font-size: 40px;
    i {
      font-size: 40px;
      margin-bottom: 5px;
    }

    span {
      font-size: 25px;
      font-weight: 600;
    }

    small {
      font-size: 18px;
      opacity: 0.7;
    }
  }
`;

export default Card;
