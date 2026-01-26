import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="page">
      <header className="top">
        <div className="brand">
          <h1 className="brandTitle">KIAN GHOLI</h1>

          <nav className="nav" aria-label="Primary">
            <NavLink
              className={({ isActive }) =>
                `navLink${isActive ? " navLinkActive" : ""}`
              }
              to="/photo"
            >
              PHOTO
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `navLink${isActive ? " navLinkActive" : ""}`
              }
              to="/film"
            >
              FILM
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `navLink${isActive ? " navLinkActive" : ""}`
              }
              to="/about"
            >
              ABOUT
            </NavLink>
          </nav>
        </div>
      </header>

      <main id="main" className="stage" role="main" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
