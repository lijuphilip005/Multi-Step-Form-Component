import React, { useState, useEffect } from "react";

function ThirdForm({ handlePrev, handleNext, handleSubmit, onChange, formValues }) {
  // State to manage form validation errors
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });


  // State to track overall form validity
  const [isFormValid, setIsFormValid] = useState(true)
  // State to track whether the form has been interacted 
  const [formInteracted, setFormInteracted] = useState(false);
  // Effect to validate the form when it has been interacted with
  useEffect(() => {
    if (formInteracted) {
      const timer = setTimeout(() => {
        validateForm();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [formValues, formInteracted]);

  // Function to validate the form and update errors and form validity
  const validateForm = () => {
    const newErrors = {};
    let newIsFormValid = true;

    // Validate Username
    if (formValues.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      newIsFormValid = false;
    }

    // Validate Password
    if (formValues.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      newIsFormValid = false;
    }

    // Validate Confirm Password 
    if (formValues.confirmPassword.trim() !== "" && formValues.confirmPassword.trim() !== formValues.password.trim()) {
      newErrors.confirmPassword = "Passwords do not match";
      newIsFormValid = false;
    } else {

      newErrors.confirmPassword = "";
    }
    // Set errors and form validity in the state
    setErrors(newErrors);
    setIsFormValid(newIsFormValid);

    return { newErrors, newIsFormValid };
  };



  // Handler function for input changes
  const handleChange = (e) => {
    onChange(e)
    setFormInteracted(true);

  };
  // Handler function for the "Next" button click
  const handleNextClick = () => {
    const { newErrors, newIsFormValid } = validateForm();

    if (newIsFormValid) {

      handleNext();
      setErrors({
        username: "",
        password: "",
        confirmPassword: "",
      });
      setFormInteracted(false)
    } else {

      console.log("Form contains errors", newErrors);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div
        className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md"
      >
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
        welcome
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
        Enter your details to  create an account
        </div>
        <div className="mt-10">
          <form action="" onSubmit={handleSubmit} method="post">
            <div className="flex flex-col mb-5">
              <label
                htmlFor="username"
                className="mb-1 text-xs tracking-wide text-gray-600 text-left"
              >
                User Name:
              </label>
              <div className="relative">
                <div
                  className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                >
                  <i className="fas fa-user text-blue-500" />
                </div>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                  className="  text-sm  placeholder-gray-500  pl-10  pr-4  rounded-2xl  border border-gray-400  w-full  py-2  focus:outline-none focus:border-blue-400"
                  placeholder="Enter your user name"
                />

                {errors.username && <div className="text-red-500 text-xs">{errors.username}</div>}
              </div>
            </div>
            <div className="flex flex-col mb-5">
              <label
                htmlFor="password"
                className="mb-1 text-xs tracking-wide text-gray-600 text-left"
              >
                Password:
              </label>
              <div className="relative">
                <div
                  className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                >
                  <i className="fas fa-at text-blue-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  className="  text-sm  placeholder-gray-500  pl-10  pr-4  rounded-2xl  border border-gray-400  w-full  py-2  focus:outline-none focus:border-blue-400 "
                  placeholder="Enter your password"
                />

                {errors.password && <div className="text-red-500 text-xs">{errors.password}</div>}
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="confirmPassword"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600 text-left"
              >
                Confirm Password:
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
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  className=" text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 "
                  placeholder="confirm password"
                />

                {errors.confirmPassword && <div className="text-red-500 text-xs">{errors.confirmPassword}</div>}
              </div>
            </div>

            <div className="flex w-full">
              <button onClick={handleSubmit}
                type="submit"
                disabled={!isFormValid}
                className=" flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in "
              >
                <span className="mr-2 uppercase">Submit</span>
                <span>
                  <svg
                    className="h-6 w-6"
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
            <div>
              <button
                type="button"
                onClick={handlePrev}
                className=" flex mt-2 items-center justify-center focus:outline-none text-white text-xs bg-blue-500 hover:bg-blue-600 rounded-2xl py-1 px-2 transition duration-150 ease-in"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ThirdForm;
