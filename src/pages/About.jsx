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
          <h2 className="aboutTitle">About</h2>

          <p className="aboutLead"></p>

          <div className="aboutBio">
            <p>
              👋Hi! I'm Kian Gholi Baghshahi, a graduate from the University of
              Georgia with a Bachelor's Degree in Entertainment Media and
              Digital Marketing from the Grady College of Journalism and Mass
              Communication. With a focus on film and television, I am dedicated
              to honing my skills and voice to tell meaningful stories. I last
              interned at Catapult Acting Studios on their production team in
              Atlanta, shooting reels for rising actors to showcase their
              abilities.
            </p>

            <p>
              💡Throughout my time I have worked on various short films and
              creative projects of my own and my colleagues, including "Life's
              Many Doors," which won the Audience Choice Award at the 2024
              Backlight Film Festival. Additionally, I produced commercials for
              the University of Georgia's Law School Master's Program,
              ShutterScope Media, and Your Pie Pizzeria. My experience also
              includes digital marketing where I created content for Athens Real
              Estate company and Habitat for Humanity through their social media
              platforms.
            </p>

            <p>
              🔧Proficient in DaVinci Resolve, Adobe Premiere Pro, Photoshop,
              InDesign, After Effects, Slack, and Autodesk Maya, with extensive
              experience in post-production for a wide range of projects. Having
              worked on numerous production sets, I've learned to utilize my
              communication skills, open-mindedness, and detailed eye in any
              situation. As a team-oriented individual, I thrive in
              collaborative environments, both on-set and in post-production.
              I'm passionate about bringing stories to life in and creating
              content that engages, challenges, and inspires audiences. I look
              forward to continuing my journey and collaborating with talented
              peers and professionals who share my enthusiasm for the craft.
            </p>

            <p className="aboutMeta">
              Available for commissions and collaborations.
            </p>
          </div>

          <div className="aboutDivider" role="separator" aria-hidden="true" />

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
