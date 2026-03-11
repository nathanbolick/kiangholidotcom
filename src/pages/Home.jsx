import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import homeBackground from "../assets/2EFDF276-33C2-4DE6-92A6-423B951B9AF3.jpeg";

function getMediaApiUrl() {
  return (
    import.meta.env.VITE_MEDIA_API_URL ||
    import.meta.env.VITE_MEDIA_API ||
    "/api/media"
  );
}

function getFilmsApiUrl() {
  return (
    import.meta.env.VITE_FILMS_API_URL ||
    import.meta.env.VITE_FILMS_API ||
    "/api/films"
  );
}

function shuffleOnce(items) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.split("/").filter(Boolean)[0] || "";
    }
    const v = u.searchParams.get("v");
    if (v) return v;
    if (u.pathname.includes("/embed/")) {
      return u.pathname.split("/embed/")[1]?.split("/")?.[0] || "";
    }
    if (u.pathname.includes("/shorts/")) {
      return u.pathname.split("/shorts/")[1]?.split("/")?.[0] || "";
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
    const parts = u.pathname.split("/").filter(Boolean);
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

function HomeVideo({ url, title }) {
  const src = getEmbedSrc(url);

  if (!src) {
    return (
      <div className="homePlaceholder" aria-label="Video placeholder">
        <div className="homePlaceholderMark" aria-hidden="true">
          <div className="homePlaceholderMarkTop">REEL</div>
          <div className="homePlaceholderMarkBottom">COMING SOON</div>
        </div>
      </div>
    );
  }

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

function HomeCard({ kind, src, alt, title, meta, href, url }) {
  return (
    <article className="homeCard">
      <Link to={href} className="homeLink" aria-label={title}>
        <div className="homeFrame">
          {kind === "video" ? (
            <HomeVideo url={url} title={title} />
          ) : (
            <HomePhoto src={src} alt={alt} />
          )}
        </div>
      </Link>
    </article>
  );
}

function pickFirstN(arr, n) {
  if (!Array.isArray(arr)) return [];
  return arr.slice(0, n);
}

export default function HomePage() {
  const location = useLocation();
  const [media, setMedia] = useState(null);
  const [films, setFilms] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const [mediaRes, filmsRes] = await Promise.all([
          fetch(getMediaApiUrl(), {
            method: "GET",
            mode: "cors",
            headers: { Accept: "application/json" },
          }),
          fetch(getFilmsApiUrl(), {
            method: "GET",
            mode: "cors",
            headers: { Accept: "application/json" },
          }),
        ]);

        if (!mediaRes.ok) {
          const t = await mediaRes.text().catch(() => "");
          throw new Error(
            `Media API error (${mediaRes.status}): ${t || mediaRes.statusText}`
          );
        }

        if (!filmsRes.ok) {
          const t = await filmsRes.text().catch(() => "");
          throw new Error(
            `Films API error (${filmsRes.status}): ${t || filmsRes.statusText}`
          );
        }

        const [mediaJson, filmsJson] = await Promise.all([
          mediaRes.json(),
          filmsRes.json(),
        ]);

        if (!cancelled) {
          setMedia(mediaJson);
          setFilms(filmsJson);
        }
      } catch (e) {
        const msg = e?.message || String(e);
        const hint =
          msg.toLowerCase().includes("failed to fetch") ||
          msg.toLowerCase().includes("cors")
            ? "\n\nTip: If your APIs are on a different domain, ensure they return Access-Control-Allow-Origin (CORS)."
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

  useEffect(() => {
    const pageEl = document.querySelector(".page");
    const topEl = document.querySelector(".top");
    const stageEl = document.querySelector(".stage");

    const prevPageStyle = pageEl
      ? {
          background: pageEl.style.background,
          backgroundImage: pageEl.style.backgroundImage,
          backgroundSize: pageEl.style.backgroundSize,
          backgroundPosition: pageEl.style.backgroundPosition,
          backgroundRepeat: pageEl.style.backgroundRepeat,
          backgroundAttachment: pageEl.style.backgroundAttachment,
        }
      : null;

    const prevTopStyle = topEl
      ? {
          background: topEl.style.background,
          backgroundColor: topEl.style.backgroundColor,
        }
      : null;

    const prevStageStyle = stageEl
      ? {
          background: stageEl.style.background,
          backgroundColor: stageEl.style.backgroundColor,
        }
      : null;

    const isHomeRoute =
      location.pathname === "/" || location.pathname === "/home";

    if (!isHomeRoute) {
      return undefined;
    }

    if (pageEl) {
      pageEl.style.backgroundImage = `linear-gradient(rgba(11, 11, 16, 0.18), rgba(11, 11, 16, 0.18)), url(${homeBackground})`;
      pageEl.style.backgroundSize = "cover";
      pageEl.style.backgroundPosition = "center center";
      pageEl.style.backgroundRepeat = "no-repeat";
      pageEl.style.backgroundAttachment = "fixed";
    }

    if (pageEl) {
      pageEl.classList.add("home-page-active");
    }

    if (topEl) {
      topEl.style.background = "transparent";
      topEl.style.backgroundColor = "transparent";
    }

    if (stageEl) {
      stageEl.style.background = "transparent";
      stageEl.style.backgroundColor = "transparent";
    }

    return () => {
      if (pageEl && prevPageStyle) {
        pageEl.style.background = prevPageStyle.background;
        pageEl.style.backgroundImage = prevPageStyle.backgroundImage;
        pageEl.style.backgroundSize = prevPageStyle.backgroundSize;
        pageEl.style.backgroundPosition = prevPageStyle.backgroundPosition;
        pageEl.style.backgroundRepeat = prevPageStyle.backgroundRepeat;
        pageEl.style.backgroundAttachment = prevPageStyle.backgroundAttachment;
      }

      if (topEl && prevTopStyle) {
        topEl.style.background = prevTopStyle.background;
        topEl.style.backgroundColor = prevTopStyle.backgroundColor;
      }

      if (stageEl && prevStageStyle) {
        stageEl.style.background = prevStageStyle.background;
        stageEl.style.backgroundColor = prevStageStyle.backgroundColor;
      }
      if (pageEl) {
        pageEl.classList.remove("home-page-active");
      }
    };
  }, [location.pathname]);

  const mosaicItems = useMemo(() => {
    const pool = [];

    // Photos: prefer an explicit curated Home folder (group key: "home")
    const groups = media?.groups || {};
    const curatedHome = Array.isArray(groups.home) ? groups.home : [];

    if (curatedHome.length > 0) {
      // Use only Home-curated images for the home mosaic
      for (const it of pickFirstN(curatedHome, 24)) {
        pool.push({
          kind: "photo",
          src: it?.src || "",
          alt: it?.name ? `Home — ${it.name}` : "Home still",
          title: "Gallery",
          meta: it?.name ? it.name : "Selected still",
          href: "/photo",
        });
      }
    } else {
      // Fallback: sample a small, curated set from each group
      const groupKeys = Object.keys(groups).filter(
        (k) => k !== "about" && k !== "film" && k !== "home"
      );

      for (const g of groupKeys) {
        const items = pickFirstN(groups[g], 3);
        for (const it of items) {
          pool.push({
            kind: "photo",
            src: it?.src || "",
            alt: it?.name ? `${prettyLabel(g)} — ${it.name}` : prettyLabel(g),
            title: prettyLabel(g),
            meta: it?.name ? it.name : "Selected still",
            href: g === "shows" ? "/photo" : `/photo/${g}`,
          });
        }
      }
    }

    // If Home is curated, keep the mosaic photo-only (no videos)
    if (curatedHome.length > 0) {
      const shuffled = shuffleOnce(pool);
      return shuffled.slice(0, 6);
    }

    // Films: take a couple from each section (only those with URLs)
    const sections = Array.isArray(films?.sections) ? films.sections : [];
    for (const s of sections) {
      const slug = s?.slug;
      const title = s?.title || (slug ? prettyLabel(slug) : "Film");
      const items = (Array.isArray(s?.items) ? s.items : []).filter(
        (x) => x?.url
      );
      for (const it of pickFirstN(items, 2)) {
        pool.push({
          kind: "video",
          url: it.url,
          src: "",
          alt: "",
          title: it.title || title,
          meta: title,
          href: slug === "narrative-shorts" ? "/film" : `/film/${slug}`,
        });
      }
    }

    // Ensure at least one photo + one film when possible
    const shuffled = shuffleOnce(pool);

    const hasPhoto = shuffled.some((x) => x.kind === "photo");
    const hasVideo = shuffled.some((x) => x.kind === "video");

    if (!hasPhoto) {
      // add a placeholder photo card
      shuffled.unshift({
        kind: "photo",
        src: "",
        alt: "Selected still",
        title: "Photos",
        meta: "Selected still",
        href: "/photo",
      });
    }

    if (!hasVideo) {
      // If there are no videos in the pool (e.g., curated Home photos only), don't force one.
    }

    // Render 6 tiles for a fuller mosaic
    return shuffled.slice(0, 6);
  }, [media, films]);

  return (
    <section className="home" aria-label="Home">
      <div className="homeShell">
        <header className="homeHeader">
          <div className="homeTagline">Filmmaker, Editor, Photographer</div>

          {error && (
            <p className="homeNote" role="alert">
              <span className="homeCode">{error}</span>
            </p>
          )}
        </header>

        <footer className="homeFooter" aria-label="Contact">
          <div className="homeFooterInner">
            <div className="homeFooterTitle">Let’s Connect</div>
            <div className="homeFooterMeta">
              For projects, collaborations, and editing inquiries.
            </div>
            <a
              className="homeFooterLink"
              href="mailto:kianbaghshahi@gmail.com"
              aria-label="Email Kian Gholi"
            >
              kianbaghshahi@gmail.com
            </a>
          </div>
        </footer>
      </div>

      {/*
        <div
          className="homeMosaic"
          data-home-state={loading ? "loading" : "ready"}
        >
          {(loading ? Array.from({ length: 6 }) : mosaicItems).map(
            (item, idx) => (
              <div
                key={`${item?.kind || "tile"}-${idx}`}
                className="homeMosaicItem"
              >
                {loading ? (
                  <HomeCard
                    kind={idx % 3 === 0 ? "video" : "photo"}
                    src={""}
                    alt="Loading"
                    title="Loading"
                    meta=""
                    href={"/"}
                    url=""
                  />
                ) : (
                  <HomeCard {...item} />
                )}
              </div>
            )
          )}
        </div>
        */}
    </section>
  );
}
