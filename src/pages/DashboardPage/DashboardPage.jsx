import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthenticationContext } from "../../context/AuthenticationContext/AuthenticationContext.js";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./DashboardPage.css";

function DashboardPage() {
  const {token} = useContext(AuthenticationContext);
  const [projects, setProjects] = useState([]);
  const [projectPartners, setProjectPartners] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!token) return;

    async function fetchData() {
      setIsLoading(true);
      setHasError(false);

      const headers = {
        "Content-Type": "application/json",
        "novi-education-project-id": "c8c123e6-beb1-4124-9d9f-b3c03ec31a1a",
        "Authorization": `Bearer ${token}`
      };

      try {
        const projectsResult = await axios.get("https://novi-backend-api-wgsgz.ondigitalocean.app/api/projects", {headers});
        const projectPartnersResult = await axios.get("https://novi-backend-api-wgsgz.ondigitalocean.app/api/projectPartners", {headers});
        const companiesResult = await axios.get("https://novi-backend-api-wgsgz.ondigitalocean.app/api/companies", {headers});

        const projectsData = projectsResult.data;
        const partnersData = projectPartnersResult.data;
        const companiesData = companiesResult.data;

        setProjects(projectsData);
        setProjectPartners(partnersData);
        setCompanies(companiesData);
      } catch (error) {
        console.error("Could not fetch dashboard data:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [token]);

  return (
    <main className="dashboard-page">
      <h1>Dashboard</h1>
      <p>Manage your projects and overview your activity.</p>

      {isLoading && <p>Loading projects...</p>}
      {hasError && <p>Could not load projects. Please try again.</p>}

      {!isLoading && !hasError && (
        <section className="dashboard-page__projects">
          {projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            <div className="dashboard-page__grid">
              {projects.map((project) => {
                const partnerNames = projectPartners
                  .filter((pp) => pp.projectId === project.id && pp.role !== "client")
                  .map((pp) => {
                    const company = companies.find((c) => c.id === pp.companyId);
                    return company ? company.name : null;
                  })
                  .filter((name) => name !== null);

                const clientCompany = companies.find((c) => c.id === project.clientCompanyId);
                const clientName = clientCompany ? clientCompany.name : "Unknown client";

                return (
                  <ProjectCard
                    key={project.id}
                    projectId={project.id}
                    title={project.title}
                    client={clientName}
                    partners={partnerNames}
                    deadline={project.deadline || ""}
                    status={project.status || ""}
                    coverImage={project.coverImage}
                  />
                );
              })}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default DashboardPage;