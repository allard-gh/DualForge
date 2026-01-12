import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.css';
import FallbackImage from '../../assets/images/fallback.svg?react';
import { getProjectStatusColor } from '../../helpers/getProjectStatusColor';

const ProjectCard = ({ title, client, partners, deadline, status, coverImage, projectId }) => {
  const statusColor = getProjectStatusColor(status, deadline);
  const navigate = useNavigate();

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
