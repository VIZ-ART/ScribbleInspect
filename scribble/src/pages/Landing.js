import React from "react";
import main from "../assets/images/gazing.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Assignment <span>Evaluator</span>
          </h1>
          <p>
            Your handwriting, our expertise: Delivering superior evaluation
            services for your assignments!Simply upload handwritten assignments
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
