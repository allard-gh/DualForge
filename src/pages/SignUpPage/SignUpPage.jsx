import { useState } from "react";
import { useForm } from "react-hook-form";
import "./SignUpPage.css";

function SignUpPage() {
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSuccessMessage("Account created successfully.");
  };

  return (
    <main className="sign-up-page">
      <h1>Sign Up</h1>
      <p>Create a new DualForge account to start building.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            {...register("company", { required: "Company is required" })}
          />
          {errors.company && <span>{errors.company.message}</span>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button type="submit">Sign Up</button>
      </form>

      {successMessage && <p>{successMessage}</p>}
    </main>
  );
}

export default SignUpPage;
