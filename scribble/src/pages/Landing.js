import React from "react";
import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";

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
