import { useMemo } from "react";
import headshot from "../assets/748dadfde7-headshot.jpg";

// Demo content for the Home mosaic.
// When you receive real assets, replace `src` with local imports or /public paths,
// and replace YouTube IDs with real ones.
const PHOTO_ITEMS = [
  {
    type: "photo",
    src: headshot,
    alt: "Portrait",
    title: "Portrait",
    meta: "Natural light • editorial",
  },
  {
    type: "photo",
    src: "",
    alt: "Selected Frame",
    title: "Selected Frame",
    meta: "Street • soft grain",
  },
  {
    type: "photo",
    src: "",
    alt: "Selected Frame",
    title: "Selected Frame",
    meta: "Architecture • texture",
  },
];

const VIDEO_ITEMS = [
  {
    type: "video",
    id: "dQw4w9WgXcQ",
    title: "Selected Work",
    meta: "Short film • 4K",
  },
  {
    type: "video",
    id: "aqz-KE-bpKQ",
    title: "Selected Work",
    meta: "Documentary • natural light",
  },
];

function shuffleOnce(items) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function HomePhoto({ src, alt }) {
  if (!src) {
    return (
      <div className="homePlaceholder" aria-label="Image placeholder">
        <div className="homePlaceholderMark" aria-hidden="true">
          <div className="homePlaceholderMarkTop">FRAME</div>
          <div className="homePlaceholderMarkBottom">COMING SOON</div>
        </div>
      </div>
    );
  }

  return (
    <img
      className="homeImage"
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
}

function HomeVideo({ id, title }) {
  const src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;
  return (
    <iframe
      className="homeEmbed"
      src={src}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}

function HomeCard(item) {
  return (
    <article className="homeCard">
      <div className="homeFrame">
        {item.type === "video" ? (
          <HomeVideo id={item.id} title={item.title} />
        ) : (
          <HomePhoto src={item.src} alt={item.alt} />
        )}
      </div>

      <div className="homeCaption">
        <div className="homeTitle">{item.title}</div>
        <div className="homeMeta">{item.meta}</div>
      </div>
    </article>
  );
}

export default function HomePage() {
  // Create a small, curated mix and randomize it once per mount.
  const items = useMemo(() => {
    const mix = [...PHOTO_ITEMS, ...VIDEO_ITEMS];
    return shuffleOnce(mix).slice(0, 4);
  }, []);

  return (
    <section className="home" aria-label="Home">
      <header className="homeHeader">
        <h2 className="homeH2">Home</h2>
        <div className="homeTagline">filmmaker • writer • editor</div>
        <p className="homeLead"></p>
      </header>

      <div className="homeMosaic">
        {items.map((item, idx) => (
          <div key={`${item.type}-${idx}`} className="homeMosaicItem">
            {HomeCard(item)}
          </div>
        ))}
      </div>

      <p className="homeNote">
        This page shows a randomized subset for demo purposes. Swap in real
        images (local) and video IDs as soon as you have the final selects.
      </p>
    </section>
  );
}
