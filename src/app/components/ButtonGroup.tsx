import React, { useState } from "react";
import styled from "styled-components";

type ButtonGroupProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

const ButtonGroup = ({ activeIndex, onSelect }: ButtonGroupProps) => {
  return (
    <StyledWrapper>
      <div className="button-container">
        {["Tạo hạt", "Phân tách", "Băm nước", "Sàng rung"].map(
          (label, index) => (
            <button
              key={index}
              className={activeIndex === index ? "active" : ""}
              onClick={() => onSelect(index)}
            >
              {label}
            </button>
          )
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    background-color: #f1f5f9;
    border-radius: 50px;
    width: fit-content;
    border: 1px solid #e2e8f0;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.08),
      -4px -4px 15px rgba(255, 255, 255, 0.4);
    transition: all 0.3s ease;
  }

  button {
    width: 7em;
    height: 3.5em;
    position: relative;
    border: 3px ridge #14dceae7;
    background-color: transparent;
    color: black;
    font-size: 16px;
    font-weight: bold;
    border-radius: 2em;
    cursor: pointer;
    transition: 0.4s ease;
    outline: none;
    z-index: 1;
  }

  button::before,
  button::after {
    content: "";
    position: absolute;
    left: 3%;
    width: 94%;
    height: 40%;
    background-color: #f1f5f9;
    transition: 0.5s ease;
    transform-origin: center;
    z-index: -1;
  }

  button::after {
    top: -10px;
  }

  button::before {
    top: 80%;
  }

  button:hover::before,
  button:hover::after,
  button.active::before,
  button.active::after {
    transform: scale(0);
  }

  button:hover,
  button.active {
    box-shadow: inset 0px 0px 25px #14dceae7;
  }
`;

export default ButtonGroup;
