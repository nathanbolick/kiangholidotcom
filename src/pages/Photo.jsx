import img1 from "/photos/pic1.png";
import img2 from "/photos/pic2.png";
import img3 from "/photos/pic3.png";
import img4 from "/photos/pic4.png";

const PHOTOS = [
  {
    src: img1,
    alt: "Selected Frame I",
    title: "",
    meta: "",
  },
  {
    src: img4,
    alt: "Selected Frame II",
    title: "",
    meta: "",
  },
  {
    src: img3,
    alt: "Selected Frame III",
    title: "",
    meta: "",
  },
  {
    src: img2,
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
