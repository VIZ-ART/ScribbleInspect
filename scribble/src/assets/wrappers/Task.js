import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 5fr 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .subs-btn {
    width: 40px;
    height: 40px;
    padding: 0;
    align-self: center;
    justify-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-self: end;
  }

  .pending,
  .ongoing {
    background: #fcefc7;
    color: #e9b949;
  }
  .submitted,
  .completed {
    background: #d3f9d8;
    color: #32cd32;
  }
  .missed {
    background: #ffe6e6;
    color: #d9534f;
  }
  .graded {
    background: #e0e8f9;
    color: #647acb;
  }
  .requested,
  .grading {
    background: #fde9d2;
    color: #ff8c00;
  }
  .reviewed {
    background: #f9e6ff;
    color: #722ed1;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
    margin-top: 0.5rem;
  }

  footer {
    margin-top: 1rem;
    border-top: 1px solid var(--grey-100);
    padding-top: 1rem;
  }

  .actions {
    display: flex;
    justify-content: space-between;
  }

  .actions-left,
  .actions-right {
    display: flex;
    justify-content: space-between;
  }

  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .grade-btn,
  .result-btn {
    margin-right: 0.5rem;
    color: var(--blue-dark);
    background: var(--blue-light);
  }

  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }

  .report-btn {
    color: var(--purple-dark);
    background: var(--purple-light);
  }

  &:hover .actions {
    visibility: visible;
  }
`;

export default Wrapper;
