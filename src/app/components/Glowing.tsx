import React from "react";
import styled from "styled-components";

type GlowingProps = {
  img: string;
};

const Glowing = ({ img }: GlowingProps) => {
  return (
    <StyledWrapper>
      <div>
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq">
            <feColorMatrix
              values="1 0 0 0 0 
                      0 1 0 0 0 
                      0 0 1 0 0 
                      0 0 0 4 0"
            />
          </filter>
          <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq2">
            <feColorMatrix
              values="1 0 0 0 0 
                      0 1 0 0 0 
                      0 0 1 0 0 
                      0 0 0 2 0"
            />
          </filter>
          <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq3">
            <feColorMatrix
              values="1 0 0 0.1 0 
                      0 1 0 0.1 0 
                      0 0 1 0.1 0 
                      0 0 0 1.5 0"
            />
          </filter>
        </svg>
        <button className="real-button" />
        <div className="button-container">
          <div className="spin spin-blur" />
          <div className="spin spin-intense" />
          <div className="button-border">
            <div className="spin spin-inside" />
            <div className="button">
              <img src={img} alt="glow-img" />
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  pointer-events: none;

  display: flex;
  justify-content: center;
  align-items: center;

  .button-container {
    position: relative;
    margin: 0 2em;
  }

  .button-border {
    padding: 4px;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 1em;
  }

  .button {
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 1em;
    width: 900px;
    height: 520px;
    display: flex;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 11;
    }
  }

  .real-button {
    position: absolute;
    width: 900px;
    height: 520px;
    z-index: 1;
    outline: none;
    border: none;
    border-radius: 1em;
    cursor: pointer;
    opacity: 0;
    pointer-events: auto;
  }

  .spin {
    position: absolute;
    inset: 0;
    z-index: -2;
    opacity: 0.4;
    overflow: hidden;
    transition: 0.3s;
  }

  .spin::before {
    content: "";
    position: absolute;
    inset: -100%;
    animation: speen 12s linear infinite, woah 6s ease-in-out infinite;
    animation-play-state: running;
  }

  .spin-blur {
    filter: blur(1.5em) url(#unopaq);
  }

  .spin-intense {
    inset: -0.25em;
    filter: blur(0.5em) url(#unopaq2);
    border-radius: 1em;
  }

  .spin-inside {
    inset: -2px;
    border-radius: inherit;
    filter: blur(2px) url(#unopaq3);
    z-index: 0;
  }

  /* Tinh chỉnh màu gradient glow cho thanh lịch */
  .spin-blur::before {
    background: linear-gradient(90deg, #0055ff 20%, #0000 50%, #00eeffff 80%);
  }

  .spin-intense::before {
    background: linear-gradient(90deg, #0066ff 20%, #0000 50%, #00aaff 80%);
  }

  .spin-inside::before {
    background: linear-gradient(90deg, #99ccff 20%, #0000 50%, #00eeffff 80%);
  }

  @keyframes speen {
    0% {
      rotate: 0deg;
    }
    50% {
      rotate: 180deg;
    }
    100% {
      rotate: 360deg;
    }
  }

  @keyframes woah {
    0%,
    100% {
      scale: 1;
    }
    50% {
      scale: 0.98;
    }
  }
`;

export default Glowing;
