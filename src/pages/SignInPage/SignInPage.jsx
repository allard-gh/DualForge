import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../context/AuthenticationContext/AuthenticationContext.js";
import { ROUTES } from "../../constants/routes";
import Button from "../../components/Button/Button";
import "./SignInPage.css";

function SignInPage() {
  const { signIn, status, isUserAuthenticated } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isUserAuthenticated, navigate]);

  const onSubmit = async (data) => {
    await signIn(data);
  };

  return (
    <main className="sign-in-page">
      <h1>Sign In</h1>
      <p>Access your DualForge account.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
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
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        {status === "error" && <p className="error-message">Login failed. Check your credentials and try again</p>}
        <Button type="submit">Sign In</Button>
      </form>
    </main>
  );
}

export default SignInPage;
