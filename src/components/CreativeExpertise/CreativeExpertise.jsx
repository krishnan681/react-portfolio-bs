import "./CreativeExpertise.css";

export default function CreativeExpertise() {
  return (
    <section className="expertise-section" id="creative-expertise">
      <div className="container">
        <div className="title">
          <div className="bg-text">Creative</div>
          <h1 className="main-title">Expertise</h1>
        </div>

        <div className="CE-heading text-center">
          <p>
            The ability to conceptualize, design, and produce visually engaging content that communicates a brand's message and resonates with target audiences.
          </p>
        </div>

        <div className="row g-4">
          {/* Left Card */}

          <div className="col-lg-6">
            <div className="expertise-card">
              <div className="card-top">
                <span className="line"></span>
                <span className="category">DESIGN &amp; VISUAL</span>
                <span className="number">01</span>
              </div>

              <h2>
                Design that
                <br />
                communicates with clarity.
              </h2>

              <div className="divider"></div>

              <div className="service-item">
                <div className="count">01</div>

                <div className="icon">
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                </div>

                <div className="content">
                  <h4>Motion &amp; Visual Design</h4>
                  <p>Motion graphics & visual storytelling for brand engagement.</p>
                </div>
              </div>

              <div className="service-item">
                <div className="count">02</div>

                <div className="icon">
                  <i className="fa-solid fa-font"></i>
                </div>

                <div className="content">
                  <h4>Typography</h4>
                  <p>
                    Typography & letterform design for brand identity.
                  </p>
                </div>
              </div>

              <div className="service-item">
                <div className="count">03</div>

                <div className="icon">
                  <i className="fa-solid fa-palette"></i>
                </div>

                <div className="content">
                  <h4>Color Theory</h4>
                  <p>
                    Color palette & composition for brand consistency.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card */}

          <div className="col-lg-6">
            <div className="expertise-card">
              <div className="card-top">
                <span className="line"></span>
                <span className="category">CONTENT &amp; MEDIA</span>
                <span className="number">02</span>
              </div>

              <h2>
                Content that
                <br />
                leaves an impression.
              </h2>

              <div className="divider"></div>

              <div className="service-item">
                <div className="count">01</div>

                <div className="icon">
                  <i className="fa-solid fa-share-nodes"></i>
                </div>

                <div className="content">
                  <h4>Social Media Content</h4>
                  <p>
                    Social media campaigns & content creation that boost audience engagement.
                  </p>
                </div>
              </div>

              <div className="service-item">
                <div className="count">02</div>

                <div className="icon">
                  <i className="fa-solid fa-camera"></i>
                </div>

                <div className="content">
                  <h4>Product Photography</h4>
                  <p>
                    Product photography & visual merchandising for premium brand presentation.
                  </p>
                </div>
              </div>

              <div className="service-item">
                <div className="count">03</div>

                <div className="icon">
                  <i className="fa-solid fa-clapperboard"></i>
                </div>

                <div className="content">
                  <h4>Cinematography</h4>
                  <p>
                    Cinematography & visual storytelling for high-quality video production.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}