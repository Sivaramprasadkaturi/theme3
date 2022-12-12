import React, { useEffect, useMemo } from "react";
import classes from "./Register.module.css";
import { registerAccount } from "../../redux/actions/accountActions.js";
import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { REGISTER_FAILURE } from "../../redux/types";
import { shallowEqual, useSelector } from "react-redux";
import { MdPersonAdd } from "react-icons/md";
import { useRouter } from "next/router";
import { setAuthModal } from "../../redux/actions/app";

function Register() {
  const dispatch = useDispatch();
  const errorMessageState = useSelector(
    state => state.accountReducer.errorMessage,
    shallowEqual
  );

  const authModalState = useSelector(
    state => state.appReducer.authModal,
    shallowEqual
  );

  const router = useRouter();
  console.log("props", router?.query);
  let state = router?.query;

  const OnSubmit = data => {
    console.log(`submitting registration: ${JSON.stringify(data)}`);
    dispatch(
      registerAccount(data, () => {
        console.log("state?.returnUrl", state?.returnUrl);
        if (state?.returnUrl) {
          console.log("ifstate", state?.returnUrl);
          router.push(state?.returnUrl);
        } else {
          console.log("elsestate", state?.returnUrl);
          window.location.reload();
        }
      })
    );
  };

  const errorMessageMemo = useMemo(() => {
    if (
      errorMessageState?.[0]?.includes(
        "have a member with that email address entered"
      )
    ) {
      return (
        <div className={classes.errorMessage}>
          Sorry, we already have a member with that email address entered.
          Please enter a new email address or click
          <a
            style={{
              padding: "0 5px",
              display: "initial"
            }}
            onClick={() => dispatch(setAuthModal(!authModalState))}
          >
            here
          </a>
          to login.
        </div>
      );
    } else {
      return (
        <div
          className={classes.errorMessage}
          dangerouslySetInnerHTML={
            errorMessageState && {
              __html: errorMessageState
            }
          }
        ></div>
      );
    }
  }, [errorMessageState]);

  console.log("errorMessageMemo", errorMessageMemo);
  useEffect(() => {
    dispatch({
      type: REGISTER_FAILURE,
      payload: ""
    });
  }, []);

  const notEmpty = value => !value;
  const required = value => (value ? undefined : "Required");
  const nameValidation = value =>
    value && value.match(/\d/g)
      ? "name should not container number"
      : value
      ? undefined
      : "name is required";

  // regex only numbers
  const onlyNumbers = value =>
    value && !/^[0-9]*$/.test(value)
      ? "must not container letters or symbols"
      : undefined;

  // regex email validation
  const emailValidation = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? "is not a valid email address"
      : value
      ? undefined
      : "is required";

  const renderValidatedField = (type, name, placeholder, validation) => {
    return (
      <div className={classes.formField}>
        <label>
          {placeholder} <icon className={classes.asteriskIcon}>*</icon>
        </label>
        <Field name={name} component="input" validate={validation}>
          {({ input, meta }) => (
            <>
              <input
                type={type}
                {...input}
                style={{
                  border: meta.error && meta.touched ? "1px solid red" : ""
                }}
                placeholder={placeholder}
              />
              {meta.error && meta.touched && (
                <span className={classes.red}>
                  {placeholder + " " + meta.error}
                </span>
              )}
            </>
          )}
        </Field>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <h1>
        <MdPersonAdd
          style={{
            color: "#005a85"
          }}
        />
        Register Account
      </h1>

      <Form
        onSubmit={OnSubmit}
        initialValues={{}}
        render={({ handleSubmit, form, submitting }) => (
          <form onSubmit={handleSubmit} id="form-id">
            {renderValidatedField(
              "text",
              "firstname",
              "First Name",
              nameValidation
            )}
            {renderValidatedField(
              "text",
              "lastname",
              "Last Name",
              nameValidation
            )}
            {renderValidatedField(
              "text",
              "email",
              "Email Address",
              emailValidation
            )}
            {renderValidatedField(
              "text",
              "confirmEmail",
              "Confirm Email",
              emailValidation
            )}
            {renderValidatedField("password", "password", "Password", required)}
            {renderValidatedField(
              "password",
              "confirmPassword",
              "Confirm Password",
              required
            )}
            {renderValidatedField("tel", "phone", "Phone", onlyNumbers)}
          </form>
        )}
      />
      <section>
        <div>
          <button
            color="primary"
            className={classes.formButton}
            type="submit"
            form="form-id"
          >
            Create Account
          </button>
          <button
            color="secondary"
            className={classes.formButton}
            onClick={() => router.push("/login")}
          >
            Cancel
          </button>
        </div>

        {errorMessageState && errorMessageMemo}
      </section>
    </div>
  );
}

export default Register;
