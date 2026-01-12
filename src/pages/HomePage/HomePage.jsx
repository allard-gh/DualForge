import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../context/AuthenticationContext/AuthenticationContext";
import "./HomePage.css";

function HomePage() {
  const { isUserAuthenticated } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate("/dashboard");
    }
  }, [isUserAuthenticated, navigate]);

  return (
    <main className="home-page">
      <h1>Home Page</h1>
      <p>Welcome to DualForge. Forge your projects with precision.</p>
    </main>
  );
}

export default HomePage;
