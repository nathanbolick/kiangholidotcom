const YT = [
  {
    id: "lXyTNaKFygY",
    title: "Crossroads",
    meta: "Short film • A7Siii",
  },
  {
    id: "aAngFqev9FE",
    title: "Peeking In",
    meta: "Silent Short Film",
  },
  {
    id: "m5VZLKN5h2Y",
    title: "On My Way!",
    meta: "Student Short Film",
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
  return (
    <section className="film" aria-label="Film">
      <header className="filmHeader">
        <h2 className="filmH2">Film</h2>
        <p className="filmLead">Selected film works</p>
      </header>

      <div className="filmGrid">
        {YT.map((v) => (
          <FilmCard key={v.id} {...v} />
        ))}
      </div>
    </section>
  );
}
