import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { BRANDS } from "../../data/brands";

import "./ProjectPage.css";

const ProjectPage = () => {
  const { slug } = useParams();

  const project = BRANDS.find(
    (item) => item.slug === slug
  );

  // Project doesn't exist
  if (!project) {
    return (
      <section className="project-not-found">

        <h1>Project not found</h1>

        <Link to="/">
          <ArrowLeft size={18} />
          Back to portfolio
        </Link>

      </section>
    );
  }

  return (
    <main
      className="project-page"
      style={{
        "--project-color": project.color,
      }}
    >

      {/* Top navigation */}
      <nav className="project-nav">

        <Link
          to="/"
          className="project-back"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <span className="project-number">
          {project.id}
        </span>

      </nav>


      {/* Hero */}
      <section className="project-hero">

        <div className="project-hero-content">

          <span className="project-label">
            Branding / Collaboration
          </span>

          <h1>
            {project.title}
          </h1>

          <p>
            {project.description}
          </p>

        </div>


        <div className="project-hero-image">

          <img
            src={project.src}
            alt={project.title}
          />

        </div>

      </section>


      {/* Project information */}
      <section className="project-information">

        <div className="project-info-block">

          <span>
            Deliverables
          </span>

          <div className="project-tags">

            {project.deliverables.map(
              (item, index) => (
                <span key={index}>
                  {item}
                </span>
              )
            )}

          </div>

        </div>

      </section>


      {/* Future content */}
      <section className="project-content">

        <h2>
          Project Overview
        </h2>

        <p>
          This project showcases the creative work,
          visual direction, content design and branding
          created for {project.title}.
        </p>

      </section>


      {/* Bottom */}
      <section className="project-footer">

        <Link to="/">
          <ArrowLeft size={18} />
          Back to all collaborations
        </Link>

      </section>

    </main>
  );
};

export default ProjectPage;