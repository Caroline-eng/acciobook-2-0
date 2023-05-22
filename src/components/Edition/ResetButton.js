import React from "react";
import Button from "react-bootstrap/Button";

const ResetButton = () => {
  let formikRef = null;

  const handleReset = () => {
    formikRef && formikRef.resetForm();
    const inputs = document.getElementsByTagName("text");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
    const selects = document.getElementsByTagName("select");
    for (let i = 0; i < selects.length; i++) {
      selects[i].value = "";
    }
  };

  return (
    <Button className="form-btn" type="reset" onClick={handleReset}>
      Limpar
    </Button>
  );
};

export default ResetButton;
