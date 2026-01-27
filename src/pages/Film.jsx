import { NavLink, useParams } from "react-router-dom";

const GROUPS = [
  { slug: "narrative-shorts", label: "Narrative Shorts" },
  { slug: "music-videos", label: "Music Videos" },
  { slug: "promotionals", label: "Promotionals" },
];

const GROUP_SLUGS = new Set(GROUPS.map((g) => g.slug));

const YT = [
  {
    group: "narrative-shorts",
    id: "lXyTNaKFygY",
    title: "Crossroads",
    meta: "Short film • A7Siii",
  },
  {
    group: "narrative-shorts",
    id: "aAngFqev9FE",
    title: "Peeking In",
    meta: "Silent Short Film",
  },
  {
    group: "narrative-shorts",
    id: "m5VZLKN5h2Y",
    title: "On My Way!",
    meta: "Student Short Film",
  },
  // Demo placeholders so other tabs aren't empty yet
  {
    group: "music-videos",
    id: "",
    title: "Music Video (Demo)",
    meta: "Music video • demo",
  },
  {
    group: "promotionals",
    id: "",
    title: "Promotional (Demo)",
    meta: "Promotional • demo",
  },
];

function FilmCard({ id, title, meta }) {
  const src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;

  return (
    <article className="filmCard">
      <div className="filmFrame">
        <iframe
          className="filmEmbed"
          src={src}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <div className="filmCaption">
        <div className="filmTitle">{title}</div>
        <div className="filmMeta">{meta}</div>
      </div>
    </article>
  );
}

export default function FilmPage() {
  const { group } = useParams();
  const activeGroup =
    group && GROUP_SLUGS.has(group) ? group : "narrative-shorts";

  const visible = YT.filter((v) => v.group === activeGroup);

  return (
    <section className="film" aria-label="Film">
      <header className="filmHeader">
        <h2 className="filmH2">Film</h2>
        <p className="filmLead">Selected film works</p>

        <nav className="filmTabs" aria-label="Film categories">
          {GROUPS.map((g) => (
            <NavLink
              key={g.slug}
              to={g.slug === "narrative-shorts" ? "/film" : `/film/${g.slug}`}
              end={g.slug === "narrative-shorts"}
              className={({ isActive }) =>
                `filmTab${isActive ? " filmTabActive" : ""}`
              }
            >
              {g.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <div className="filmGrid" data-film-group={activeGroup}>
        {visible.map((v) => (
          <FilmCard key={`${v.group}-${v.id}`} {...v} />
        ))}
      </div>
    </section>
  );
}
