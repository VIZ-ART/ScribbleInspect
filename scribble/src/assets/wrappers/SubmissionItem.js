import styled from "styled-components";

const Wrapper = styled.section`
  .sub-item {
    display: flex;
    align-items: center;
    padding: 10px;
    color: black;
    background-color: white;
    text-transform: capitalize;
    border-radius: 8px;

    > div {
      flex-grow: 1;
      flex-basis: 0;
      text-align: center;
    }

    /* button {
      flex-grow: 0;
      flex-basis: auto;
      margin-right: 0.5rem;
      color: var(--blue-dark);
      background: var(--blue-light);
      border: 0;
      border-radius: 4px;
      padding: 3px 30px;
    } */
  }

  .odd {
    background-color: rgb(244 248 255);
    color: black;
  }

  .sub-item.title {
    background-color: var(--primary-700);
    color: white;
    text-transform: uppercase;
    border-radius: 3px;
  }

  .view-btn {
    cursor: pointer;
    color: var(--white);
    background: var(--grey-500);
    border: transparent;
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
    padding: 3px 25px;
    box-shadow: var(--shadow-2);
    transition: var(--transition);
    text-transform: capitalize;
    display: inline-block;
    margin-right: 0.5rem;
  }
  .view-btn:hover {
    background: var(--black);
    box-shadow: var(--shadow-3);
  }

  .modify-btn {
    cursor: pointer;
    color: var(--white);
    background: var(--primary-500);
    border: transparent;
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
    padding: 3px 25px;
    box-shadow: var(--shadow-2);
    transition: var(--transition);
    text-transform: capitalize;
    display: inline-block;
    margin-right: 0.5rem;
  }
  .modify-btn:hover {
    background: var(--primary-700);
    box-shadow: var(--shadow-3);
  }
`;

export default Wrapper;
