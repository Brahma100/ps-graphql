import { useState, useEffect, FC, useContext } from "react";
import { LOGIN_USER } from "../../gqloperations/mutations";
import { SIGNUP_USER } from '../../gqloperations/mutations';
import { useMutation } from '@apollo/client';
import {
  Container,
  Form,
  Field,
  Input,
  Button,
  Label,
  ErrorMessage,
  Title,
} from "./auth.style";
import { useNavigate } from "react-router";
import { ProductContext } from "../../context/ProductProvider";

const Auth=()=> {
  const { setToken} = useContext(ProductContext);
  const navigate = useNavigate()
  const [signupUser] = useMutation(SIGNUP_USER)
  const [signinUser, { error, loading, data }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      localStorage.setItem("token", data.user.token)
      setToken(data.user.token)
      navigate('/')
    }
  })
  const initialValues = { name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.entries(formErrors).length === 0) {
      !isLogin?
      signupUser({
        variables: {
          userNew: formValues
        }
      }):
      signinUser({
        variables: {
          userSignin: { email: formValues.email, password: formValues.password }
        }
      })
    }
  };
  const handleClear = () => {
    setFormValues(initialValues);
    setFormErrors({});
    setIsSubmit(false);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name && !isLogin) {
      errors.name = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>{isLogin ? "Login" : "Register"} Form</Title>
        <div className="form">
          {!isLogin &&
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input

                required
                id="name"
                name="name"
                placeholder="Name"
                value={formValues.name}
                onChange={handleChange}
              />
            </Field>}
          <ErrorMessage>{formErrors.name}</ErrorMessage>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input

              required
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </Field>
          <ErrorMessage>{formErrors.email}</ErrorMessage>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              required
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </Field>
          <ErrorMessage>{formErrors.password}</ErrorMessage>
          <Button>Submit</Button>
          <Button ml_10 danger type="button" onClick={handleClear}>
            Clear
          </Button>
        </div>
        <div>{isLogin ? <>New User? <span onClick={() => setIsLogin(false)} >Create an Account</span></> : <>Already have an account? <span onClick={() => setIsLogin(true)} >Login</span></>}</div>
      </Form>
    </Container>
  );
}

export default Auth;
