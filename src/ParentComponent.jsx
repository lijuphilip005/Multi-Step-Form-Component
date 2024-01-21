import React, { useState } from "react";
import FirstForm from "./FormComponents/FirstForm";
import SecondForm from "./FormComponents/SecondForm";
import ThirdForm from "./FormComponents/ThirdForm";

function ParentComponent() {
  // List of form components to navigate 
  const formList = ["FirstForm", "SecondForm", "ThirdForm"];
  // State to track the current form page
  const [page, setPage] = useState(0);
  const formLength = formList.length;
  // Initial form values
  const intialValues = {
    name: "",
    email: "",
    dob: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  // State to manage form values
  const [values, setValues] = useState(intialValues);
  // State to track overall form validity
  const [isFormValid, setIsFormValid] = useState(true)
  // Handler function to navigate to the previous form
  const handlePrev = () => {
    setPage(page === 0 ? formLength - 1 : page - 1);
  };
  // Handler function to navigate to the next form
  const handleNext = () => {

    if (!isFormValid) {
      return;
    }
    setPage(page === formLength - 1 ? 0 : page + 1);
  };


  const state = [

    { id: 0, name: "kerala" },
    { id: 2, name: "karnataka" },
    { id: 3, name: "Maharashtra" },
    { id: 4, name: "Tamil nadu" },
    { id: 5, name: "Assam" },
    { id: 6, name: "Goa" },
    { id: 7, name: "manipur" },
    { id: 8, name: "Telangana" },
    { id: 9, name: "uttarpradesh" },
    { id: 10, name: "Andra pradesh" },
  ];

  // Handler function to render the current form based on the page
  const handleForm = () => {
    switch (page) {
      case 0:
        return <FirstForm handlePrev={handlePrev} handleNext={handleNext} formValues={values} onChange={onChange} setIsFormValid={setIsFormValid} />;

      case 1:
        return <SecondForm handlePrev={handlePrev} handleNext={handleNext} options={state} formValues={values} onChange={onChange} setIsFormValid={setIsFormValid} />;

      case 2:
        return (
          <ThirdForm
            handlePrev={handlePrev}
            handleNext={handleNext}
            handleSubmit={handleSubmit} formValues={values} onChange={onChange}
          />
        );

      default:
        return null;
    }
  };

  // Handler function for input changes
  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  }

  // Handler function for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", values);
    setValues(intialValues)
  };
  // Render the current form based on the page
  return (
    <div>
      <div>{handleForm()}</div>
    </div>
  );
}

export default ParentComponent;
