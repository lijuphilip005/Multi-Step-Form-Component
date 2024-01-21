import React, { useState, useEffect, useRef } from "react";

function FirstForm({ handlePrev, handleNext, onChange, formValues, }) {
  // State to manage form validation errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    dob: "",
  });
  // State to track whether the form has been touched
  const [isFormTouched, setIsFormTouched] = useState(false)
  // State to track overall form validity
  const [isFormValid, setIsFormValid] = useState(false);
  // Ref to track whether the component is mounted
  const isMounted = useRef(false)



  // Effect to reset errors when the form is touched
  useEffect(() => {
    if (isFormTouched) {
      setErrors({
        name: "",
        email: "",
        dob: "",
      });
    }
  }, [isFormTouched]);

  // Effect to set the component as mounted after the first render
  useEffect(() => {
    isMounted.current = true;
  }, []);

  // Function to validate overall form values
  const validateFormValues = (values) => {
    let isValid = true;

    isValid = validateName(values.name) && isValid;
    isValid = validateEmail(values.email) && isValid;
    isValid = validateDateOfBirth(values.dob) && isValid;

    return isValid;
  };


  // Effect to update form validity and visibility of the "Next" button
  useEffect(() => {
    if (isMounted.current && isFormTouched) {
      const formIsValid = validateFormValues(formValues);
      setIsFormValid(formIsValid);
      const nextButton = document.getElementById("nextButton");
      if (nextButton) {
        nextButton.style.visibility = formIsValid ? "visible" : "hidden";
      }
    }
  }, [formValues, isFormTouched]);



  // Function to validate the "Name" field
  const validateName = (value) => {
    const onlyCharactersRegex = /^[A-Za-z\s]+$/;
    if (!value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, name: "Name is required" }));
      return false;
    } else if (value.length < 3 || !onlyCharactersRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name must be at least 3 characters",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
      return true;
    }
  };
  // Function to validate the "Email" field
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Email is required" }));
      return false;
    } else if (!emailRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      return true;
    }
  };
  // Function to validate the "Date of Birth" field
  const validateDateOfBirth = (value) => {
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dob: "Date of Birth is required",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, dob: "" }));
      return true;
    }
  };

  // Handler function for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(e);
    setIsFormTouched(true);

    switch (name) {
      case "name":
        validateName(value);
        break;
      case "email":
        validateEmail(value);
        break;
      case "dob":
        validateDateOfBirth(value);
        break;
      default:
        break;
    }

  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div
        className="  flex flex-col  bg-white  shadow-md  px-4  sm:px-6  md:px-8  lg:px-10  py-8  rounded-3xl  w-50  max-w-md "
      >
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          welcome
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your details to  create an account
        </div>
        <div className="mt-10">
          <form action="#">
            <div className="flex flex-col mb-5">
              <label
                htmlFor="name"
                className="mb-1 text-xs tracking-wide text-gray-600 text-left"
              >
                Name:
              </label>
              <div className="relative">
                <div
                  className="  inline-flex  items-center  justify-center  absolute  left-0  top-0  h-full  w-10  text-gray-400 "
                >
                  <i className="fas fa-user text-blue-500" />
                </div>
                <input

                  id="name"
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={(e) => handleChange(e)}
                  required
                  className="
                    text-sm  placeholder-gray-500  pl-10  pr-4  rounded-2xl  border border-gray-400  w-full  py-2  focus:outline-none focus:border-blue-400"
                  placeholder="Enter your name"
                />
                {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
              </div>
            </div>
            <div className="flex flex-col mb-5">
              <label
                htmlFor="email"
                className="mb-1 text-xs tracking-wide text-gray-600 text-left"
              >
                E-Mail Address:
              </label>
              <div className="relative">
                <div
                  className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400 "
                >
                  <i className="fas fa-at text-blue-500" />
                </div>
                <input

                  id="email"
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={(e) => handleChange(e)}
                  required
                  className="  text-sm  placeholder-gray-500  pl-10  pr-4  rounded-2xl  border border-gray-400  w-full  py-2  focus:outline-none focus:border-blue-400 "
                  placeholder="Enter your email"
                />
                {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="dob"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600 text-left"
              >
                Date of Birth:
              </label>
              <div className="relative">
                <div
                  className="  inline-flex  items-center  justify-center  absolute  left-0  top-0  h-full  w-10  text-gray-400 "
                >
                  <span>
                    <i className="fas fa-calendar-alt text-blue-500" />
                  </span>
                </div>
                <input
                  id="dob"
                  type="date"
                  name="dob"
                  value={formValues.dob}
                  onChange={(e) => handleChange(e)}
                  required
                  className=" text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 "
                  placeholder="Select your date of birth"
                />
                {errors.dob && <div className="text-red-500 text-xs">{errors.dob}</div>}
              </div>
            </div>

            <div className="flex w-full justify-between">



              <button
                type="button"
                onClick={handleNext}
                style={{ visibility: isFormValid ? 'visible' : 'hidden' }}
                className=" flex mt-2 items-center justify-center focus:outline-none text-white text-xs bg-blue-500 hover:bg-blue-600 rounded-2xl py-1 px-2 ml-auto transition duration-150 ease-in "
              >
                <span className="mr-1 uppercase">Next</span>
                <span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>

          </form>
        </div>
      </div>


    </div>

  );
}

export default FirstForm;
