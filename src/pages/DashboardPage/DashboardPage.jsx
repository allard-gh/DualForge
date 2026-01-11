import { useState, useEffect, useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext/AuthenticationContext.js";
import "./DashboardPage.css";

function DashboardPage() {
  const {token} = useContext(AuthenticationContext);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!token) return;

    async function fetchProjects() {
      setIsLoading(true);
      setHasError(false);

      try {
        const response = await fetch("https://novi-backend-api-wgsgz.ondigitalocean.app/api/projects", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "novi-education-project-id": "c8c123e6-beb1-4124-9d9f-b3c03ec31a1a",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        console.log("Projects response data:", data);
        setProjects(data);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, [token]);

  return (
    <main className="dashboard-page">
      <h1>Dashboard</h1>
      <p>Manage your projects and overview your activity.</p>

      {isLoading && <p>Loading projects...</p>}
      {hasError && <p>Could not load projects. Please try again.</p>}
    </main>
  );
}

export default DashboardPage;
