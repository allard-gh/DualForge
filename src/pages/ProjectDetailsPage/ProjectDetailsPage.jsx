import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthenticationContext } from "../../context/AuthenticationContext/AuthenticationContext.js";
import FallbackImage from "../../assets/images/fallback.svg?react";
import "./ProjectDetailsPage.css";

import top2000Img from "../../assets/images/Top-2000-cafe.jpg";
import mysterylandImg from "../../assets/images/mysteryland-haarlemmermeer.jpg";
import quicksliceImg from "../../assets/images/dr-oetker-suprema.jpg";
import cokeParisImg from "../../assets/images/coke-paris-2024.avif";
import wefImg from "../../assets/images/WEF-Davos-2026.png";
import moetImg from "../../assets/images/moet_red_limited_edition.jpg";
import coronaImg from "../../assets/images/Corona-Cero-Winter-Olympics.jpg";

function ProjectDetailsPage() {
  const { projectId } = useParams();
  const { token } = useContext(AuthenticationContext);

  const [project, setProject] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [projectPartners, setProjectPartners] = useState([]);
  const [buildFiles, setBuildFiles] = useState([]);
  const [projectDocuments, setProjectDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!token || !projectId) return;

    async function fetchData() {
      setIsLoading(true);
      setHasError(false);

      const headers = {
        "Content-Type": "application/json",
        "novi-education-project-id": "c8c123e6-beb1-4124-9d9f-b3c03ec31a1a",
        "Authorization": `Bearer ${token}`,
      };

      try {
        const projectResult = await fetch(
          `https://novi-backend-api-wgsgz.ondigitalocean.app/api/projects/${projectId}`,
          { headers }
        );
        const projectPartnersResult = await fetch(
          "https://novi-backend-api-wgsgz.ondigitalocean.app/api/projectPartners",
          { headers }
        );
        const companiesResult = await fetch(
          "https://novi-backend-api-wgsgz.ondigitalocean.app/api/companies",
          { headers }
        );
        const buildFilesResult = await fetch(
          "https://novi-backend-api-wgsgz.ondigitalocean.app/api/buildFiles",
          { headers }
        );
        const projectDocumentsResult = await fetch(
          "https://novi-backend-api-wgsgz.ondigitalocean.app/api/projectDocuments",
          { headers }
        );

        if (
          !projectResult.ok ||
          !projectPartnersResult.ok ||
          !companiesResult.ok ||
          !buildFilesResult.ok ||
          !projectDocumentsResult.ok
        ) {
          throw new Error("Failed to fetch project data");
        }

        const projectData = await projectResult.json();
        const projectPartnersData = await projectPartnersResult.json();
        const companiesData = await companiesResult.json();
        const buildFilesData = await buildFilesResult.json();
        const projectDocumentsData = await projectDocumentsResult.json();

        setProject(projectData);
        setProjectPartners(projectPartnersData);
        setCompanies(companiesData);
        setBuildFiles(buildFilesData);
        setProjectDocuments(projectDocumentsData);
      } catch (error) {
        console.error("Could not fetch project data:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [token, projectId]);

  if (isLoading) {
    return (
      <main className="project-details-page">
        <p>Loading project...</p>
      </main>
    );
  }

  if (hasError || !project) {
    return (
      <main className="project-details-page">
        <p>Could not load project. Please try again.</p>
      </main>
    );
  }

  const clientCompany = companies.find((c) => c.id === project.clientCompanyId);
  const clientName = clientCompany ? clientCompany.name : "Unknown client";

  const partnerNames = projectPartners
    .filter((pp) => pp.projectId === project.id && pp.role !== "client")
    .map((pp) => {
      const company = companies.find((c) => c.id === pp.companyId);
      return company ? company.name : null;
    })
    .filter((name) => name !== null);

  const localImages = {
    1001: top2000Img,
    1002: mysterylandImg,
    1003: quicksliceImg,
    1004: cokeParisImg,
    1005: wefImg,
    1006: moetImg,
    1007: coronaImg,
  };

  const localCoverImage = localImages[projectId] || null;

  const projectDocumentsForThisProject =
    projectDocuments.filter((doc) => doc.projectId === project.id);

  return (
    <main className="project-details-page">
      <h1>{project.title}</h1>

      <section className="project-details-page__upper">
        <div className="project-details-page__image-container">
          {project.coverImage ? (
            <img src={project.coverImage} alt={project.coverImageAlt || project.title} />
          ) : localCoverImage ? (
            <img src={localCoverImage} alt={project.coverImageAlt || project.title} />
          ) : (
            <FallbackImage className="project-details-page__fallback-image" />
          )}
        </div>

        <div className="project-details-page__info">
          <p className="project-details-page__description">
            {project.description || "No description available."}
          </p>
          <div className="project-details-page__meta">
            <p>
              <strong>Client:</strong> {clientName}
            </p>
            {partnerNames.length > 0 && (
              <p>
                <strong>Partners:</strong> {partnerNames.join(", ")}
              </p>
            )}
            {project.deadline && (
              <p>
                <strong>Deadline:</strong> {project.deadline}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="project-details-page__lower">
        <div className="project-details-page__placeholder-card">
          <h2>Approved Builds</h2>
          <p>No builds available yet.</p>
        </div>
        <div className="project-details-page__placeholder-card">
          <h2>Documents</h2>
          {projectDocumentsForThisProject.length === 0 ? (
            <p>No documents available yet.</p>
          ) : (
            <ul>
              {projectDocumentsForThisProject.map((doc) => (
                <li key={doc.id}>
                  <a href={doc.url}>{doc.title}</a>
                  <p className="project-details-page__meta-line">
                    {doc.fileType} - {doc.isApproved ? "Approved" : "Not approved"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

export default ProjectDetailsPage;
