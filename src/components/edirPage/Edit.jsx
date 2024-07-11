
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editUser } from "../../features/userDetailSlice";

const Edit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the id parameter from the URL
  const allUsers = useSelector((state) => state.app.users);
  const loading = useSelector((state) => state.app.loading);

  const [updateUser, setUpdateUser] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id && allUsers.length > 0) {
      const userToEdit = allUsers.find((user) => user.id === id);
      if (userToEdit) {
        setUpdateUser(userToEdit);
      } else {
        console.log(`User with id ${id} not found.`);
      }
    }
  }, [id, allUsers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser({ ...updateUser, [name]: value });

    // Clear validation error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!updateUser.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!updateUser.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(updateUser.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!updateUser.age) {
      newErrors.age = "Age is required";
      valid = false;
    } else if (updateUser.age < 18 || updateUser.age > 120) {
      newErrors.age = "Age must be between 18 and 120";
      valid = false;
    }

    if (!updateUser.gender) {
      newErrors.gender = "Gender is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(editUser(updateUser));
      navigate("/read");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-2 px-4">
      <center className="py-2">
        <h3>Edit User Detail Form</h3>
      </center>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={updateUser.name}
            name="name"
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={updateUser.email}
            name="email"
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your age"
            value={updateUser.age}
            name="age"
            onChange={handleChange}
            isInvalid={!!errors.age}
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <div>
            <Form.Check
              type="radio"
              id="maleRadio"
              name="gender"
              label="Male"
              value="male"
              checked={updateUser.gender === "male"}
              onChange={handleChange}
              isInvalid={!!errors.gender}
            />
            <Form.Check
              type="radio"
              id="femaleRadio"
              name="gender"
              label="Female"
              value="female"
              checked={updateUser.gender === "female"}
              onChange={handleChange}
              isInvalid={!!errors.gender}
            />
          </div>
          <Form.Control.Feedback type="invalid">
            {errors.gender}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Edit;
