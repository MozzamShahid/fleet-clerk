import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    
  };

  return (
    <div>
      <div className="form-background flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col bg-slate-300 p-4">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mb-2 p-2 border"
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mb-2 p-2 border"
          />
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mb-2 p-2 border"
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mb-4 p-2 border"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white">
            Submit
          </button>
        </form>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </div>
    </div>
  );
};

export default Signup;
