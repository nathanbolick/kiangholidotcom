import { NavLink, useParams } from "react-router-dom";

import img1 from "/photos/pic1.png";
import img2 from "/photos/pic2.png";
import img3 from "/photos/pic3.png";
import img4 from "/photos/pic4.png";

const GROUPS = [
  { slug: "shows", label: "Shows" },
  { slug: "street", label: "Street" },
  { slug: "portraits", label: "Portraits" },
  { slug: "grad", label: "Grad Photos" },
  { slug: "events", label: "Events" },
];

const GROUP_SLUGS = new Set(GROUPS.map((g) => g.slug));

// Demo images: reuse these assets across categories for now.
// Swap in real selects later by importing/assigning per group.
const PHOTOS = [
  { group: "portraits", src: img1, alt: "Portrait", title: "", meta: "" },
  {
    group: "street",
    src: img2,
    alt: "Street photography",
    title: "",
    meta: "",
  },
  { group: "shows", src: img3, alt: "Show photography", title: "", meta: "" },
  { group: "events", src: img4, alt: "Event photography", title: "", meta: "" },

  // A few repeats for grid density (demo)
  { group: "shows", src: img2, alt: "Show photography", title: "", meta: "" },
  {
    group: "street",
    src: img4,
    alt: "Street photography",
    title: "",
    meta: "",
  },
  { group: "portraits", src: img3, alt: "Portrait", title: "", meta: "" },
  {
    group: "grad",
    src: img1,
    alt: "Graduation photography",
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

      {(title || meta) && (
        <div className="photoCaption">
          {title && <div className="photoTitle">{title}</div>}
          {meta && <div className="photoMeta">{meta}</div>}
        </div>
      )}
    </article>
  );
}

export default function PhotoPage() {
  const { group } = useParams();
  const activeGroup = group && GROUP_SLUGS.has(group) ? group : "shows";
  const visible = PHOTOS.filter((p) => p.group === activeGroup);

  return (
    <section className="photo" aria-label="Photo">
      <header className="photoHeader">
        <h2 className="photoH2">Gallery</h2>
        <p className="photoLead">A curated set of photos.</p>

        <nav className="photoTabs" aria-label="Photo categories">
          {GROUPS.map((g) => (
            <NavLink
              key={g.slug}
              to={g.slug === "shows" ? "/photo" : `/photo/${g.slug}`}
              end={g.slug === "shows"}
              className={({ isActive }) =>
                `photoTab${isActive ? " photoTabActive" : ""}`
              }
            >
              {g.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <div className="photoGrid" data-photo-group={activeGroup}>
        {visible.map((p, idx) => (
          <PhotoCard key={`${p.group}-${idx}`} {...p} />
        ))}
      </div>
    </section>
  );
}
