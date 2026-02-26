import headshot from "../assets/748dadfde7-headshot.jpg";
export default function AboutPage() {
  return (
    <section className="about" aria-label="About">
      <div className="aboutGrid">
        {/* Portrait / image area */}
        <figure className="aboutPortrait" aria-label="Portrait placeholder">
          <div className="aboutPortraitFrame" role="img" aria-label="Portrait">
            <div className="aboutPortraitInner">
              <img
                src={headshot}
                alt="Portrait"
                className="aboutPortraitImage"
                loading="lazy"
              />
            </div>

            <figcaption className="aboutCaption">
              <span className="aboutCaptionLabel"></span>
              <span className="aboutCaptionText"></span>
            </figcaption>
          </div>
        </figure>

        {/* Bio */}
        <div className="aboutBody">
          {/* Skills */}
          <section className="aboutSkills" aria-label="Skills">
            <h3 className="aboutSkillsTitle">Skills</h3>

            <div className="aboutSkillsGrid">
              <div className="aboutSkill">
                <span className="aboutSkillIcon">🎬</span>
                <span className="aboutSkillLabel">Directing</span>
              </div>

              <div className="aboutSkill">
                <span className="aboutSkillIcon">✍️</span>
                <span className="aboutSkillLabel">Writing</span>
              </div>

              <div className="aboutSkill">
                <span className="aboutSkillIcon">✂️</span>
                <span className="aboutSkillLabel">Editing</span>
              </div>

              <div className="aboutSkill">
                <span className="aboutSkillIcon">🎨</span>
                <span className="aboutSkillLabel">Color Grading</span>
              </div>

              <div className="aboutSkill">
                <span className="aboutSkillIcon">🎧</span>
                <span className="aboutSkillLabel">Sound Design</span>
              </div>

              <div className="aboutSkill">
                <span className="aboutSkillIcon">💻</span>
                <span className="aboutSkillLabel">Post‑Production</span>
              </div>
            </div>
          </section>
          <h2 className="aboutTitle">About</h2>

          <p className="aboutLead"></p>

          <div className="aboutBio">
            <p>
              Hi, I'm Kian — a filmmaker and post-production specialist based in
              Atlanta, GA, and a graduate of the Entertainment & Media Studies
              program at the University of Georgia's College of Journalism and
              Mass Communication. I craft visually compelling stories that
              resonate beyond the screen. I've worked across short films, music
              videos, and digital campaigns as an editor, cinematographer,
              gaffer, and director, bringing a meticulous eye for detail, strong
              communication, and a collaborative mindset to every project.
              Alongside narrative work, I create multimedia content for
              nonprofits and local businesses, blending storytelling with
              strategic digital marketing. I also work freelance as an A/V
              production technician with Encore Global, managing live event
              production and delivering high quality audio-visual experiences.
            </p>

            <p>
              I'm proficient in DaVinci Resolve, Adobe Premiere Pro, After
              Effects, Avid, Photoshop, InDesign, and Autodesk Maya.
            </p>

            <p>
              I'm available for freelance editing and videography and welcome
              collaboration with directors, brands, agencies, and independent
              creators. Whether refining a project in post or building one from
              the ground up, I'm committed to delivering thoughtful,
              high-quality work tailored to each client's vision.
            </p>
          </div>

          <div className="aboutDivider" role="separator" aria-hidden="true" />

          {/* Social Links */}
          <section className="aboutSocial" aria-label="Social links">
            <h3 className="aboutSkillsTitle">Connect</h3>

            <div className="aboutSocialGrid">
              <a
                className="aboutSocialLink"
                href="https://www.instagram.com/unexpectedkey/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="aboutSocialIcon">📸</span>
                <span>Instagram</span>
              </a>

              <a
                className="aboutSocialLink"
                href="https://www.linkedin.com/in/kian-gholi-baghshahi-b94522144/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="aboutSocialIcon">💼</span>
                <span>LinkedIn</span>
              </a>

              <a
                className="aboutSocialLink"
                href="https://www.youtube.com/@yawnkian"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="aboutSocialIcon">▶️</span>
                <span>YouTube</span>
              </a>

              <a
                className="aboutSocialLink"
                href="https://vimeo.com/user83242297"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="aboutSocialIcon">🎞️</span>
                <span>Vimeo</span>
              </a>

              <a
                className="aboutSocialLink"
                href="https://letterboxd.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="aboutSocialIcon">🎟️</span>
                <span>Letterboxd</span>
              </a>
            </div>
          </section>

          <div className="aboutDetails" aria-label="Details">
            <div className="aboutDetail">
              <div className="aboutDetailLabel"></div>
              <div className="aboutDetailValue"></div>
            </div>
            <div className="aboutDetail">
              <div className="aboutDetailLabel"></div>
              <div className="aboutDetailValue"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
