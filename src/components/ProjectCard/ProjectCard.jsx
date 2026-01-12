import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.css';
import FallbackImage from '../../assets/images/fallback.svg?react';
import top2000Img from '../../assets/images/Top-2000-cafe.jpg';
import mysterylandImg from '../../assets/images/mysteryland-haarlemmermeer.jpg';
import quicksliceImg from '../../assets/images/dr-oetker-suprema.jpg';
import cokeParisImg from '../../assets/images/coke-paris-2024.avif';
import wefImg from '../../assets/images/WEF-Davos-2026.png';
import moetImg from '../../assets/images/moet_red_limited_edition.jpg';
import coronaImg from '../../assets/images/Corona-Cero-Winter-Olympics.jpg';
import { getProjectStatusColor } from '../../helpers/getProjectStatusColor';

const ProjectCard = ({ title, client, partners, deadline, status, coverImage, projectId }) => {
  const statusColor = getProjectStatusColor(status, deadline);
  const navigate = useNavigate();

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

  const handleGoToProject = () => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <article className="project-card">
      <div className="project-card__image-container">
        <div
          className="project-card__status-indicator"
          style={{ backgroundColor: statusColor }}
        ></div>
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
