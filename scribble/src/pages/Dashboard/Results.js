import React, { useState } from "react";
import { DialogWindow } from "../../components";

const Results = () => {
  const [isDialogOpen, setDialogOpen] = useState(true);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <button
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        Open
      </button>
      <DialogWindow
        isModalOpen={isDialogOpen}
        closeModal={closeDialog}
        modalText={"Delete Task?"}
      />
    </>
  );
};

export default Results;
