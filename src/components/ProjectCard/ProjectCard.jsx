import React from 'react';
import './ProjectCard.css';
import FallbackImage from '../../assets/images/fallback.svg?react';

const ProjectCard = ({ title, client, deadline, status, coverImage }) => {
  return (
    <article className="project-card">
      <div className="project-card__image-container">
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
        <span className="project-card__status">{status}</span>
        <p className="project-card__client">
          <strong>Client:</strong> {client}
        </p>
        <p className="project-card__deadline">
          <strong>Deadline:</strong> {deadline}
        </p>
        <button className="project-card__button" type="button">
          Go to
        </button>
      </div>
    </article>
  );
};

export default ProjectCard;
