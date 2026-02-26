import { useEffect, useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function prettyLabel(slug) {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function getApiUrl() {
  // Prefer env var for production; fall back to same-origin (Pages Function/proxy) if you add it later.
  // Example: VITE_MEDIA_API_URL=https://kian-media-worker.yourname.workers.dev/api/media
  return (
    import.meta.env.VITE_MEDIA_API_URL ||
    import.meta.env.VITE_MEDIA_API ||
    "/api/media"
  );
}

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

  const [manifest, setManifest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const apiUrl = getApiUrl();
        const res = await fetch(apiUrl, {
          method: "GET",
          // Explicitly use CORS mode so failures are easier to reason about.
          mode: "cors",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(
            `Media API error (${res.status}): ${text || res.statusText}`
          );
        }

        const data = await res.json();
        if (!cancelled) setManifest(data);
      } catch (e) {
        const msg = e?.message || String(e);
        // Common symptom when CORS headers are missing (browser blocks the response).
        const hint =
          msg.toLowerCase().includes("failed to fetch") ||
          msg.toLowerCase().includes("cors")
            ? "\n\nTip: If your media API is on a different domain, ensure it returns Access-Control-Allow-Origin (CORS)."
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

  const groups = useMemo(() => {
    const keys = Object.keys(manifest?.groups || {});
    // Exclude about from the photo gallery tabs
    const slugs = keys.filter((k) => k !== "about");
    // Prefer a predictable order, but keep it stable for new folders
    slugs.sort((a, b) => a.localeCompare(b));
    return slugs.map((slug) => ({ slug, label: prettyLabel(slug) }));
  }, [manifest]);

  const groupSet = useMemo(() => new Set(groups.map((g) => g.slug)), [groups]);

  const defaultGroup = useMemo(() => {
    if (groupSet.has("shows")) return "shows";
    return groups[0]?.slug || "shows";
  }, [groupSet, groups]);

  const activeGroup = group && groupSet.has(group) ? group : defaultGroup;

  const visible = useMemo(() => {
    const items = manifest?.groups?.[activeGroup] || [];
    // items are { src, name }
    return items.map((it) => ({
      group: activeGroup,
      src: it.src,
      alt: it.name
        ? `${prettyLabel(activeGroup)} — ${it.name}`
        : prettyLabel(activeGroup),
      title: "",
      meta: "",
    }));
  }, [manifest, activeGroup]);

  const showPlaceholders = !loading && !error && visible.length === 0;

  return (
    <section className="photo" aria-label="Photo">
      <header className="photoHeader">
        <h2 className="photoH2">Gallery</h2>
        <p className="photoLead">A curated set of photos.</p>

        {error && (
          <p className="photoNote" role="alert">
            <span className="photoCode">{error}</span>
          </p>
        )}

        <nav className="photoTabs" aria-label="Photo categories">
          {groups.map((g) => (
            <NavLink
              key={g.slug}
              to={g.slug === defaultGroup ? "/photo" : `/photo/${g.slug}`}
              end={g.slug === defaultGroup}
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
        {loading &&
          Array.from({ length: 8 }).map((_, idx) => (
            <PhotoCard
              key={`loading-${idx}`}
              src={""}
              alt="Loading"
              title={""}
              meta={""}
            />
          ))}

        {!loading &&
          !error &&
          visible.map((p, idx) => (
            <PhotoCard key={`${p.group}-${idx}`} {...p} />
          ))}

        {showPlaceholders &&
          Array.from({ length: 8 }).map((_, idx) => (
            <PhotoCard
              key={`empty-${idx}`}
              src={""}
              alt="Coming soon"
              title={""}
              meta={""}
            />
          ))}
      </div>
    </section>
  );
}
