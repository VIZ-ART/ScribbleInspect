import React from "react";
import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import styled from "styled-components";

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: flex;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-rows: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="Scribble logo" className="logo" />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Assignment <span>Evaluator</span>
          </h1>
          <p>
            Your handwriting, our expertise: Delivering superior evaluation
            services for your assignments! Revolutionize your grading process
            with our advanced software. Simply upload handwritten assignments
            and receive objective, accurate grades instantly. Try it now and
            save time while ensuring fair and consistent grading.
          </p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img
          src={main}
          alt="A student climbing to success with education"
          className="img main-img"
        />
      </div>
    </Wrapper>
  );
};

export default Landing;
