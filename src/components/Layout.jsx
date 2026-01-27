import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="page">
      <header className="top">
        <div className="brand">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `brandTitle brandLink${isActive ? " navLinkActive" : ""}`
            }
            aria-label="Home"
          >
            KIAN GHOLI
          </NavLink>

          <nav className="nav" aria-label="Primary">
            <NavLink
              className={({ isActive }) =>
                `navLink${isActive ? " navLinkActive" : ""}`
              }
              to="/photo"
            >
              Gallery
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `navLink${isActive ? " navLinkActive" : ""}`
              }
              to="/film"
            >
              Film
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `navLink${isActive ? " navLinkActive" : ""}`
              }
              to="/about"
            >
              About
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
