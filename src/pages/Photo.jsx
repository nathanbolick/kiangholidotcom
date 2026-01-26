const PHOTOS = [
  {
    src: "src/assets/Screenshot 2026-01-26 at 8.23.17 AM.png",
    alt: "Selected Frame I",
    title: "",
    meta: "",
  },
  {
    src: "src/assets/Screenshot 2026-01-26 at 8.24.04 AM.png",
    alt: "Selected Frame II",
    title: "",
    meta: "",
  },
  {
    src: "src/assets/Screenshot 2026-01-26 at 8.24.24 AM.png",
    alt: "Selected Frame III",
    title: "",
    meta: "",
  },
  {
    src: "src/assets/Screenshot 2026-01-26 at 8.23.48 AM.png",
    alt: "Selected Frame IV",
    title: "",
    meta: "",
  },
];

function PhotoMedia({ src, alt }) {
  if (!src) {
    return (
      <div className="photoPlaceholder" aria-label="Image placeholder">
        <div className="photoPlaceholderMark" aria-hidden="true">
          <div className="photoPlaceholderMarkTop">FRAME</div>
          <div className="photoPlaceholderMarkBottom">COMING SOON</div>
        </div>
      </div>
    );
  }

  return (
    <img
      className="photoImage"
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
}

function PhotoCard({ src, alt, title, meta }) {
  return (
    <article className="photoCard">
      <div className="photoFrame">
        <PhotoMedia src={src} alt={alt} />
      </div>

      <div className="photoCaption">
        <div className="photoTitle">{title}</div>
        <div className="photoMeta">{meta}</div>
      </div>
    </article>
  );
}

export default function PhotoPage() {
  return (
    <section className="photo" aria-label="Photo">
      <header className="photoHeader">
        <h2 className="photoH2">Photo</h2>
        <p className="photoLead">A curated set of photos.</p>
      </header>

      <div className="photoGrid">
        {PHOTOS.map((p) => (
          <PhotoCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}
