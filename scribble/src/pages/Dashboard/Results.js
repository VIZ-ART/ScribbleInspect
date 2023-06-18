import React, { useState } from "react";
import ChangeScoreWindow from "../../components/ChangeScoreWindow";

const Results = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <h1>Results</h1>
      <button onClick={openModal}>Open</button>
      {isModalOpen && (
        <ChangeScoreWindow
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          successModal={closeModal}
          prevScore={22}
          maxScore={30}
        />
      )}
    </>
  );
};

export default Results;
