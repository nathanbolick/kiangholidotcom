import { useEffect, useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function getFilmsApiUrl() {
  // Prefer a dedicated env var; fall back to same-origin (Pages Function/proxy) if you add it later.
  // Example: VITE_FILMS_API_URL=https://your-worker.workers.dev/api/films
  return (
    import.meta.env.VITE_FILMS_API_URL ||
    import.meta.env.VITE_FILMS_API ||
    "/api/films"
  );
}

function prettyLabel(slug) {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function extractYouTubeId(url) {
  try {
    const u = new URL(url);

    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id || "";
    }

    // youtube.com/watch?v=<id>
    const v = u.searchParams.get("v");
    if (v) return v;

    // youtube.com/embed/<id>
    if (u.pathname.includes("/embed/")) {
      const parts = u.pathname.split("/embed/");
      return parts[1]?.split("/")?.[0] || "";
    }

    // youtube.com/shorts/<id>
    if (u.pathname.includes("/shorts/")) {
      const parts = u.pathname.split("/shorts/");
      return parts[1]?.split("/")?.[0] || "";
    }

    return "";
  } catch {
    return "";
  }
}

function extractVimeoId(url) {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("vimeo.com")) return "";

    // vimeo.com/<id> or vimeo.com/channels/<channel>/<id>
    const parts = u.pathname.split("/").filter(Boolean);
    // find last numeric segment
    for (let i = parts.length - 1; i >= 0; i -= 1) {
      if (/^\d+$/.test(parts[i])) return parts[i];
    }

    return "";
  } catch {
    return "";
  }
}

function getEmbedSrc(url) {
  if (!url) return "";

  const ytId = extractYouTubeId(url);
  if (ytId) {
    return `https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1&playsinline=1`;
  }

  const vimeoId = extractVimeoId(url);
  if (vimeoId) {
    return `https://player.vimeo.com/video/${vimeoId}`;
  }

  return "";
}

function FilmMedia({ embedSrc, title }) {
  if (!embedSrc) {
    return (
      <div className="filmEmbed" aria-label="Video placeholder">
        <div className="photoPlaceholder" aria-hidden="true">
          <div className="photoPlaceholderMark">
            <div className="photoPlaceholderMarkTop">REEL</div>
            <div className="photoPlaceholderMarkBottom">COMING SOON</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <iframe
      className="filmEmbed"
      src={embedSrc}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}

function FilmCard({ title, meta, url }) {
  const embedSrc = useMemo(() => getEmbedSrc(url), [url]);

  return (
    <article className="filmCard">
      <div className="filmFrame">
        <FilmMedia embedSrc={embedSrc} title={title} />
      </div>

      <div className="filmCaption">
        <div className="filmTitle">{title}</div>
        <div className="filmMeta">{meta}</div>
      </div>
    </article>
  );
}

function buildMeta(item) {
  const parts = [];
  if (item.type) parts.push(item.type);
  if (item.director) parts.push(`Dir. ${item.director}`);
  if (item.role) parts.push(item.role);
  if (item.status) parts.push(item.status);
  return parts.join(" • ");
}

export default function FilmPage() {
  const { group } = useParams();

  const [films, setFilms] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(getFilmsApiUrl(), {
          method: "GET",
          mode: "cors",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(
            `Films API error (${res.status}): ${text || res.statusText}`
          );
        }

        const data = await res.json();
        if (!cancelled) setFilms(data);
      } catch (e) {
        const msg = e?.message || String(e);
        const hint =
          msg.toLowerCase().includes("failed to fetch") ||
          msg.toLowerCase().includes("cors")
            ? "\n\nTip: If your films API is on a different domain, ensure it returns Access-Control-Allow-Origin (CORS)."
            : "";
        if (!cancelled) setError(msg + hint);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const sections = useMemo(() => {
    const arr = Array.isArray(films?.sections) ? films.sections : [];
    return arr
      .filter((s) => s && typeof s === "object")
      .map((s) => ({
        slug: s.slug || "",
        label: s.title || (s.slug ? prettyLabel(s.slug) : "Untitled"),
        items: Array.isArray(s.items) ? s.items : [],
      }))
      .filter((s) => s.slug);
  }, [films]);

  const sectionSlugs = useMemo(
    () => new Set(sections.map((s) => s.slug)),
    [sections]
  );

  const defaultGroup = useMemo(() => {
    if (sectionSlugs.has("narrative-shorts")) return "narrative-shorts";
    return sections[0]?.slug || "narrative-shorts";
  }, [sectionSlugs, sections]);

  const activeGroup = group && sectionSlugs.has(group) ? group : defaultGroup;

  const visible = useMemo(() => {
    const section = sections.find((s) => s.slug === activeGroup);
    const items = section?.items || [];
    return items.map((it, idx) => ({
      key: `${activeGroup}-${it.title || "item"}-${it.url || "nolink"}-${idx}`,
      title: it.title || "Untitled",
      url: it.url || "",
      meta: buildMeta(it),
    }));
  }, [sections, activeGroup]);

  const showPlaceholders = !loading && !error && visible.length === 0;

  return (
    <section className="film" aria-label="Film">
      <header className="filmHeader">
        <h2 className="filmH2">Film</h2>
        <p className="filmLead">Selected film works</p>

        {error && (
          <p className="filmNote" role="alert">
            <span className="filmCode">{error}</span>
          </p>
        )}

        <nav className="filmTabs" aria-label="Film categories">
          {sections.map((s) => (
            <NavLink
              key={s.slug}
              to={s.slug === defaultGroup ? "/film" : `/film/${s.slug}`}
              end={s.slug === defaultGroup}
              className={({ isActive }) =>
                `filmTab${isActive ? " filmTabActive" : ""}`
              }
            >
              {s.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <div className="filmGrid" data-film-group={activeGroup}>
        {loading &&
          Array.from({ length: 6 }).map((_, idx) => (
            <FilmCard key={`loading-${idx}`} title="Loading" meta="" url="" />
          ))}

        {!loading &&
          !error &&
          visible.map((v) => (
            <FilmCard key={v.key} title={v.title} meta={v.meta} url={v.url} />
          ))}

        {showPlaceholders &&
          Array.from({ length: 6 }).map((_, idx) => (
            <FilmCard key={`empty-${idx}`} title="Coming Soon" meta="" url="" />
          ))}
      </div>
    </section>
  );
}
