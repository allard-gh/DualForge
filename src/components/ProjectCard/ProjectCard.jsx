import React from 'react';
import './ProjectCard.css';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import FallbackImage from '../../assets/images/fallback.svg?react';
import top2000Img from '../../assets/images/Top-2000-cafe.jpg';
import mysterylandImg from '../../assets/images/mysteryland-haarlemmermeer.jpg';
import quicksliceImg from '../../assets/images/dr-oetker-suprema.jpg';
import cokeParisImg from '../../assets/images/coke-paris-2024.avif';
import wefImg from '../../assets/images/WEF-Davos-2026.png';
import moetImg from '../../assets/images/moet_red_limited_edition.jpg';
import coronaImg from '../../assets/images/Corona-Cero-Winter-Olympics.jpg';
import { getProjectStatusColor } from '../../helpers/getProjectStatusColor';

const ProjectCard = ({ title, client, partners, deadline, status, coverImage, projectId, onOpenProject }) => {
  const localImages = {
    1001: top2000Img,
    1002: mysterylandImg,
    1003: quicksliceImg,
    1004: cokeParisImg,
    1005: wefImg,
    1006: moetImg,
    1007: coronaImg,
  };

  const localCoverImage = localImages[projectId];

  // Calculate project status color using the helper
  const statusColor = getProjectStatusColor(status, deadline);

  // Map the hex color to a semantic variant for the StatusIndicator
  let projectStatusVariant = "yellow";
  if (statusColor === "#2FA36A") {
    projectStatusVariant = "green";
  } else if (statusColor === "#E6BF6A") {
    projectStatusVariant = "yellow";
  } else if (statusColor === "#FF7A29") {
    projectStatusVariant = "orange";
  } else if (statusColor === "#C94A4A") {
    projectStatusVariant = "red";
  }

  const handleGoToProject = () => {
    if (onOpenProject) {
      onOpenProject(projectId);
    }
  };

  return (
    <article className="project-card">
      <div className="project-card__image-container">
        <StatusIndicator
          variant={projectStatusVariant}
          className="project-card__status-indicator"
        />
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="project-card__image"
          />
        ) : localCoverImage ? (
          <img
            src={localCoverImage}
            alt={title}
            className="project-card__image"
          />
        ) : (
          <FallbackImage className="project-card__image" title={title} />
        )}
      </div>
      <div className="project-card__content">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__client">
          <strong>Client:</strong> {client}
        </p>
        {partners && partners.length > 0 && (
          <p className="project-card__partners">
            <strong>Partners:</strong> {partners.join(", ")}
          </p>
        )}
        <p className="project-card__deadline">
          <strong>Deadline:</strong> {deadline}
        </p>
        <button
          className="project-card__button"
          type="button"
          onClick={handleGoToProject}
        >
          Go to
        </button>
      </div>
    </article>
  );
};

export default ProjectCard;
