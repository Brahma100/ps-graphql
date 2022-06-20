import { useState, useEffect } from "react";
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

function AddProduct() {
  const initialValues = { name: "", imageUrl: "", price: 0 };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors=validate(formValues);
    setFormErrors(errors);
    console.log("ERROR:",errors,Object.entries(errors).length);
    if(Object.entries(errors).length===0){
      fetch('/api/items',{
        method:'POST',  
        headers: { 'Content-Type': 'application/json'},
        body:JSON.stringify(formValues)
      })
      .then(res=>res.json())
      .then()
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
    const regex = /(https?:\/\/.*\.(?:png|jpg))/i;
    if (!values.name) {
      errors.name = "Product Name is required!";
    }
    if (!values.imageUrl) {
      errors.imageUrl = "Image URL is required!";
    } else if (!regex.test(values.imageUrl)) {
      errors.imageUrl = "This is not a valid URL!";
    }
    if (values.price <=0 ) {
      errors.price = "Price must be greater than ₹0";
    } else if (values.price > 1000) {
      errors.price = "Price cannot exceed ₹1000";
    }
    return errors;
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Add Product</Title>
        <div className="form">
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
          </Field>
          <ErrorMessage>{formErrors.name}</ErrorMessage>
          <Field>
            <Label htmlFor="imageUrl">Image</Label>
            <Input

              required
              id="imageUrl"
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={formValues.imageUrl}
              onChange={handleChange}
            />
          </Field>
          <ErrorMessage>{formErrors.imageUrl}</ErrorMessage>
          <Field>
            <Label htmlFor="price">Price</Label>
            <Input
              required
              id="price"
              type="number"
              name="price"
              placeholder="Price"
              value={formValues.price}
              onChange={handleChange}
            />
          </Field>
          <ErrorMessage>{formErrors.price}</ErrorMessage>
          <Button>Submit</Button>
          <Button ml_10 danger type="button" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AddProduct;
