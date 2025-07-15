import React from "react";
import styled from "styled-components";

const ButtonContact = () => {
  return (
    <StyledWrapper>
      <button type="submit" className="frutiger-button">
        <div className="inner">
          <div className="top-white" />
          <span className="text">GỬI YÊU CẦU</span>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .frutiger-button {
    cursor: pointer;
    position: relative;
    padding: 2px;
    border-radius: 32px;
    border: 0;
    background: linear-gradient(#0080cc, #00b2d4); /* xanh đậm hơn */
    box-shadow: 0 4px 10px rgba(0, 102, 204, 0.5);
    transition: 0.3s all;
    width: 100%;
    max-width: 100%;
  }

  .frutiger-button:hover {
    box-shadow: 0 8px 16px rgba(0, 102, 204, 0.6);
  }

  .frutiger-button:active {
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .inner {
    padding: 10px 1em;
    border-radius: 32px;
    position: relative;
    background: radial-gradient(
        circle at 50% 100%,
        #39d5e0ff 5%,
        transparent 60%
      ),
      linear-gradient(135deg, #006da1, #00a2c6); /* đậm hơn */
    overflow: hidden;
    transition: inherit;
  }

  .inner::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      -65deg,
      transparent 40%,
      rgba(255, 255, 255, 0.25) 50%,
      transparent 70%
    );
    background-size: 200% 100%;
    animation: thing 3s ease infinite;
  }

  @keyframes thing {
    0% {
      background-position: 130%;
      opacity: 1;
    }
    100% {
      background-position: -166%;
      opacity: 0;
    }
  }

  .top-white {
    position: absolute;
    border-radius: inherit;
    inset: 0 -8em;
    background: radial-gradient(
      circle at 50% -270%,
      #ffffffcc 45%,
      #ffffff55 60%,
      transparent 60%
    );
    transition: inherit;
  }

  .inner::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    transition: inherit;
    box-shadow: inset 0 2px 8px -2px transparent;
  }

  .frutiger-button:active .inner::after {
    box-shadow: inset 0 2px 8px -2px rgba(0, 0, 0, 0.4);
  }

  .text {
    position: relative;
    z-index: 1;
    color: #246496ff; /* dịu, nhẹ, không chói */
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 1px;
  }
`;

export default ButtonContact;
