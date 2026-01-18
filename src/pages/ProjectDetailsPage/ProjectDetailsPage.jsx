import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthenticationContext } from "../../context/AuthenticationContext/AuthenticationContext.js";
import Button from "../../components/Button/Button";
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
  const { token, role, userProfile } = useContext(AuthenticationContext);

  const [project, setProject] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [projectPartners, setProjectPartners] = useState([]);
  const [buildFiles, setBuildFiles] = useState([]);
  const [projectDocuments, setProjectDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [isUpdatingInternalApproval, setIsUpdatingInternalApproval] = useState(false);
  const [internalApprovalUpdateError, setInternalApprovalUpdateError] = useState(null);
  const [internalApprovalUpdatingId, setInternalApprovalUpdatingId] = useState(null);

  const [isUpdatingPartnerApproval, setIsUpdatingPartnerApproval] = useState(false);
  const [partnerApprovalUpdateError, setPartnerApprovalUpdateError] = useState(null);
  const [partnerApprovalUpdatingId, setPartnerApprovalUpdatingId] = useState(null);

  const formatDateOnly = (value) => {
    if (!value) return "";
    return new Date(value).toLocaleDateString("nl-NL");
  };

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
        const projectResult = await axios.get(
          `https://novi-backend-api-wgsgz.ondigitalocean.app/api/projects/${projectId}`,
          { headers }
        );
        const projectPartnersResult = await axios.get(
          "https://novi-backend-api-wgsgz.ondigitalocean.app/api/projectPartners",
          { headers }
        );
        const companiesResult = await axios.get(
          "https://novi-backend-api-wgsgz.ondigitalocean.app/api/companies",
          { headers }
        );
        const buildFilesResult = await axios.get(
          "https://novi-backend-api-wgsgz.ondigitalocean.app/api/buildFiles",
          { headers }
        );
        const projectDocumentsResult = await axios.get(
          "https://novi-backend-api-wgsgz.ondigitalocean.app/api/projectDocuments",
          { headers }
        );

        setProject(projectResult.data);
        setProjectPartners(projectPartnersResult.data);
        setCompanies(companiesResult.data);
        setBuildFiles(buildFilesResult.data);
        setProjectDocuments(projectDocumentsResult.data);
      } catch (error) {
        console.error("Could not fetch project data:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [token, projectId]);

  const handleInternalApprove = async (buildFileId) => {
    setIsUpdatingInternalApproval(true);
    setInternalApprovalUpdateError(null);
    setInternalApprovalUpdatingId(buildFileId);

    const fileToUpdate = buildFiles.find((f) => f.id === buildFileId);
    if (!fileToUpdate) {
      setInternalApprovalUpdateError("Build file not found.");
      setIsUpdatingInternalApproval(false);
      setInternalApprovalUpdatingId(null);
      return;
    }

    const fullName = userProfile?.displayName || userProfile?.email || "Unknown user";

    const updatePayload = {
      ...fileToUpdate,
      internalApproval: true,
      internalApprovedAt: new Date().toISOString(),
      internalApprovedByName: fullName,
    };

    const headers = {
      "Content-Type": "application/json",
      "novi-education-project-id": "c8c123e6-beb1-4124-9d9f-b3c03ec31a1a",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.put(
        `https://novi-backend-api-wgsgz.ondigitalocean.app/api/buildFiles/${buildFileId}`,
        updatePayload,
        { headers }
      );

      const updatedItem = response.data || updatePayload;

      setBuildFiles((prev) =>
        prev.map((item) => (item.id === buildFileId ? updatedItem : item))
      );
    } catch (error) {
      console.error("Could not update internal approval:", error);
      setInternalApprovalUpdateError("Failed to approve. Please try again.");
    } finally {
      setIsUpdatingInternalApproval(false);
      setInternalApprovalUpdatingId(null);
    }
  };

  const handlePartnerApprove = async (buildFileId) => {
    setIsUpdatingPartnerApproval(true);
    setPartnerApprovalUpdateError(null);
    const numericBuildFileId = Number(buildFileId);
    setPartnerApprovalUpdatingId(numericBuildFileId);

    const fileToUpdate = buildFiles.find((f) => Number(f.id) === numericBuildFileId);
    if (!fileToUpdate) {
      setPartnerApprovalUpdateError("Build file not found.");
      setIsUpdatingPartnerApproval(false);
      setPartnerApprovalUpdatingId(null);
      return;
    }

    const partnerName = userProfile?.displayName || userProfile?.email || "Unknown user";

    const updatePayload = {
      ...fileToUpdate,
      partnerApproval: true,
      partnerApprovedAt: new Date().toISOString(),
      partnerApprovedByName: partnerName,
    };

    const headers = {
      "Content-Type": "application/json",
      "novi-education-project-id": "c8c123e6-beb1-4124-9d9f-b3c03ec31a1a",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.put(
        `https://novi-backend-api-wgsgz.ondigitalocean.app/api/buildFiles/${numericBuildFileId}`,
        updatePayload,
        { headers }
      );

      const updatedItem = response.data || updatePayload;

      setBuildFiles((prev) =>
        prev.map((item) => (Number(item.id) === numericBuildFileId ? updatedItem : item))
      );
    } catch (error) {
      console.error("Could not update partner approval:", error);
      setPartnerApprovalUpdateError("Failed to approve. Please try again.");
    } finally {
      setIsUpdatingPartnerApproval(false);
      setPartnerApprovalUpdatingId(null);
    }
  };

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

  const buildFilesForThisProject =
    buildFiles.filter((file) => Number(file.projectId) === Number(project.id));

  const projectDocumentsForThisProject =
    projectDocuments.filter((doc) => Number(doc.projectId) === Number(project.id));

  const canApproveInternal = role === "pm_internal" || role === "admin";
  const canApprovePartner = role === "pm_external" || role === "admin";

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
          <h2>Builds</h2>
          {internalApprovalUpdateError && (
            <p className="project-details-page__error-message">
              {internalApprovalUpdateError}
            </p>
          )}
          {partnerApprovalUpdateError && (
            <p className="project-details-page__error-message">
              {partnerApprovalUpdateError}
            </p>
          )}
          {buildFilesForThisProject.length === 0 ? (
            <p>No build files available yet.</p>
          ) : (
            <ul>
              {buildFilesForThisProject.map((file) => {
                let approvalsCount = 0;
                if (file.internalApproval) approvalsCount += 1;
                if (file.partnerApproval) approvalsCount += 1;

                let statusClass = "status--red";
                if (approvalsCount === 1) statusClass = "status--yellow";
                if (approvalsCount === 2) statusClass = "status--green";

                return (
                  <li key={file.id}>
                    <a href={file.url}>{file.title}</a>{" "}
                    <span className={`approval-indicator ${statusClass}`}></span>
                    <p className="project-details-page__meta-line">
                      Approvals: {approvalsCount}/2
                    </p>
                    {file.internalApproval && (
                      <p className="project-details-page__meta-line">
                        Internal: {file.internalApprovedByName} – {formatDateOnly(file.internalApprovedAt)}
                      </p>
                    )}
                    {file.partnerApproval && (
                      <p className="project-details-page__meta-line">
                        Partner: {file.partnerApprovedByName} – {formatDateOnly(file.partnerApprovedAt)}
                      </p>
                    )}
                    <div className="approval-actions">
                      {canApproveInternal && (
                        <Button
                          type="button"
                          className="approval-button"
                          disabled={
                            file.internalApproval ||
                            internalApprovalUpdatingId === file.id
                          }
                          onClick={() => handleInternalApprove(file.id)}
                        >
                          {internalApprovalUpdatingId === file.id
                            ? "Processing..."
                            : file.internalApproval
                            ? "Internal approved"
                            : "Approve internally"}
                        </Button>
                      )}
                      {canApprovePartner && (
                        <Button
                          type="button"
                          className="approval-button"
                          disabled={
                            file.partnerApproval ||
                            partnerApprovalUpdatingId === file.id
                          }
                          onClick={() => handlePartnerApprove(file.id)}
                        >
                          {partnerApprovalUpdatingId === file.id
                            ? "Processing..."
                            : file.partnerApproval
                            ? "Partner approved"
                            : "Approve as partner"}
                        </Button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
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
