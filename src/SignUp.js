import React, {useRef, useState} from "react";
import { useForm } from "react-hook-form";

import useFormPersist from "react-hook-form-persist";
import "./signUp.css";

export default function Form() {
  const {
    register,
    formState: { errors  },
    watch,
    setValue,
    handleSubmit,
    reset
  } = useForm({
    mode: "onChange"
  });
  useFormPersist('form', {watch, setValue}, { exclude: ["password","confirmPassword"] });

  const password = useRef({});
  const [formSubmitted, setFormSubmitted] = useState(0);
  password.current = watch("password", "");

  const eighteenYearsAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
  const eighteenYearsAgoDate = eighteenYearsAgo.toISOString().split('T')[0];
  const ageValidate = (value) => {
    if (value) {
      function _getAge(dob) {
        var ageDifMs = Date.now() - dob.getTime();
  
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
      let birthday = new Date(value);
      let age = _getAge(birthday);
      const ageRegex = /^(?:[5-9]|100|1[0-9]|[1-9][0-9])$/;
      return !!String(age).match(ageRegex);
    }
    return true;
  };

  const onSubmit = (data) => {
    setFormSubmitted(true);
    console.log(JSON.stringify(data));
    reset({})
  };
  console.log(errors);

  return (
    <div>
      { formSubmitted && (<h1>Thanks for registering with us! We will contact you shortly.</h1> )}
      { !formSubmitted && (
        <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
          <h1>Register</h1>
        
          <label>First name</label>
          <input
            type="text"
            data-testid="firstName"
            {...register("firstName", {
              required: "this is a required",
              maxLength: {
                value: 80,
                message: "Max length is 80"
              }
            })}
          />
          {errors.firstName && <p className='error'>{errors.firstName.message}</p>}

          <label>Middle name</label>
          <input
            type="text"
            data-testid="middleName"
            {...register("middleName", {
              maxLength: {
                value: 100,
                message: "Max length is 100"
              }
            })}
          />
          {errors.middleName && <p className='error'>{errors.middleName.message}</p>}

          <label>Last name</label>
          <input
            type="text"
            data-testid="lastName"
            {...register("lastName", {
              required: "this is a required",
              maxLength: {
                value: 100,
                message: "Max length is 100"
              }
            })}
          />
          {errors.lastName && <p className='error'>{errors.lastName.message}</p>}

          <label>Email</label>
          <input
            type="text"
            data-testid="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && <p className='error'>{errors.email.message}</p>}

          <label>Mobile number</label>
          <input
            type="tel"
            data-testid="mobileNumber"
            {...register("mobileNumber", {
              required: "This field is required",
              maxLength: {
                value: 13,
                message: "Max length is 13"
              },
              minLength: {
                value: 8,
                message: "Max length is 8"
              }
            })}
          />
          {errors.mobileNumber && <p className='error'>{errors.mobileNumber.message}</p>}

          <label>Title</label>
          <select
            name="Title"
            data-testid="title"
            {...register("title", {
              required: "This field is required"
            })}
          >
            <option value="">Title</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Dr">Dr</option>
          </select>
          {errors.title && <p className='error'>{errors.title.message}</p>}

          <label>Are you a developer?</label>
          <p><label>
          <input
            type="radio"
            data-testid="developer"
            value="Yes"
            {...register("developer", { required: "This field is required" })}
          /> Yes </label>
          <label>
          <input
            type="radio"
            value="No"
            {...register("developer", { required: "This field is required" })}
          /> No
          </label>
          </p>
          {errors.developer && <p className='error'>{errors.developer.message}</p>}

          <label>Date Of Birth</label>
          <input
            type="date"
            data-testid="dob"
            max={eighteenYearsAgoDate}
            placeholder="YYYY-MM-DD"
            {...register("dob", {
              required: "This field is required",
              pattern: {
                value: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                message: "Must be a valid date in the format YYYY-MM-DD"
              },
              validate: ageValidate,
            })}
          />
          {errors.dob && errors.dob.type !== "validate" && <p className='error'>{errors.dob.message}</p>}
          {errors.dob && errors.dob.type === "validate" && <p className='error'>Age is restricted</p>}

          <label>Password</label>
          <input
            type="password"
            data-testid="password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Must be at least 6 characters"
              }
            })}
          />
          {errors.password && <p className='error'>{errors.password.message}</p>}

          <label>Confirm Password</label>
          <input
            type="password"
            data-testid="confirmPassword"
            {...register("confirmPassword", {
              required: "This field is required",
              validate: value => value === password.current || "The passwords do not match"
            })}
          />
          {errors.confirmPassword && <p className='error'>{errors.confirmPassword.message}</p>}

          
          <label htmlFor="acceptTerms" className="form-check-label"> 
          <input
            type="checkbox"
            data-testid="acceptTerms"
            {...register("acceptTerms", {
              required: "This field is required",
            })}
          /> Accept Terms and Conditions</label>
          {errors.acceptTerms && <p className='error'>{errors.acceptTerms.message}</p>}

          <input type="submit" data-testid="submit"/>
        </form>
      )}
    </div>
  );
}