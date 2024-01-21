import React, { useState } from "react";

function SecondForm({ handlePrev, handleNext, options, onChange, formValues }) {
  // State to manage form validation errors
  const [errors, setErrors] = useState({
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });
  // State to track overall form validity
  const [isFormValid, setIsFormValid] = useState(true)
  // Function to validate the form and update errors 
  const validateForm = () => {
    const errors = {};
    let isFormValid = true;

    // Validate Street Address
    if (formValues.streetAddress.trim().length < 5) {
      errors.streetAddress = "Street Address must be at least 5 characters";
      isFormValid = false;
    }

    // Validate City
    if (formValues.city.trim().length < 3) {
      errors.city = "City must be at least 3 characters";
      isFormValid = false;
    }

    // Validate State
    if (!formValues.state) {
      errors.state = "Please select your state";
      isFormValid = false;
    }

    // Validate Zip Code
    const zipCodeRegex = /^\d+$/;
    if (!formValues.zipCode || !zipCodeRegex.test(formValues.zipCode)) {
      errors.zipCode = "Zip Code must be a valid numeric format";
      isFormValid = false;
    }
    // Set errors and form validity in the state
    setErrors(errors);
    setIsFormValid(isFormValid);


    return { errors, isFormValid };


  };

  // Handler function for input changes
  const handleChange = (e) => {
    onChange(e);
    const { errors, isFormValid } = validateForm();
    setErrors(errors);
    setIsFormValid(isFormValid);
  };
  // Handler function for the "Next" button click
  const handleNextClick = () => {
    const { errors, isFormValid } = validateForm();

    if (isFormValid) {
      // Proceed to the next step
      handleNext();
      // Reset errors for the next step
      setErrors({
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
      });
    } else {
      console.log("Form contains errors", errors);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div
        className=" flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md "
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
                htmlFor="StreetAddress"
                className="mb-1 text-xs tracking-wide text-gray-600 text-left"
              >
                Street Address:
              </label>
              <div className="relative">
                <div
                  className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400 "
                >
                  <i className="fas fa-user text-blue-500" />
                </div>
                <input
                  id="streetAddress"
                  type="text"
                  name="streetAddress"
                  value={formValues.streetAddress}
                  onChange={handleChange}
                  className=" text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your Street Address"
                />
                {errors.streetAddress && (
                  <div className="text-red-500 text-xs">{errors.streetAddress}</div>
                )}

              </div>
            </div>

            <div className="flex flex-col mb-5">
              <label
                htmlFor="city"
                className="mb-1 text-xs tracking-wide text-gray-600 text-left"
              >
                City:
              </label>
              <div className="relative">
                <div
                  className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400 "
                >
                  <i className="fas fa-user text-blue-500" />
                </div>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formValues.city}
                  onChange={handleChange}
                  className=" text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 "
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <div className="text-red-500 text-xs">{errors.city}</div>
                )}

              </div>
            </div>
            <div className="flex flex-col mb-5">
              <label
                htmlFor="State"
                className="mb-1 text-xs tracking-wide text-gray-600 text-left"
              >
                State:
              </label>
              <div className="relative">
                <div
                  className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400 "
                >
                  <i className="fas fa-user text-blue-500" />
                </div>
                <select
                  id="state"
                  type="select"
                  name="state"
                  value={formValues.state}
                  onChange={handleChange}
                  className=" text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 "

                >
                  <option value="" disabled selected >Select your state</option>
                  {options.map((state, id) => {
                    return <option key={state.id}>{state.name} </option>
                  })}

                </select>
              </div>

            </div>

            <div className="flex flex-col mb-5">
              <label
                htmlFor="zipCode"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600 text-left"
              >
                Zip Code:
              </label>
              <div className="relative">
                <div
                  className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400 "
                >
                  <span>
                    <i className="fas fa-mail-bulk text-blue-500" />
                  </span>
                </div>
                <input
                  id="zipCode"
                  type="number"
                  name="zipCode"
                  value={formValues.zipCode}
                  onChange={handleChange}
                  className="  text-sm  placeholder-gray-500  pl-10  pr-4  rounded-2xl  border border-gray-400  w-full  py-2  focus:outline-none focus:border-blue-400 "
                  placeholder="Enter your zip code"
                />
                {errors.zipCode && (
                  <div className="text-red-500 text-xs">{errors.zipCode}</div>
                )}

              </div>
            </div>

            <div className="flex w-full justify-between">

              <button
                type="button"
                onClick={handlePrev}
                className="  flex  mt-2  items-center  justify-center  focus:outline-none  text-white text-xs  bg-blue-500  hover:bg-blue-600  rounded-2xl  py-1  px-2  transition  duration-150  ease-in "
              >
                <span>
                  <svg
                    className="h-4 w-4 transform -rotate-180"
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
                <span className="ml-1 uppercase">Prev</span>
              </button>


              <button
                type="button"
                onClick={handleNext}
                style={{ visibility: isFormValid ? "visible" : "hidden" }}
                className="  flex  mt-2  items-center  justify-center  focus:outline-none  text-white text-xs  bg-blue-500  hover:bg-blue-600  rounded-2xl  py-1  px-2  transition  duration-150  ease-in "
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

export default SecondForm;
