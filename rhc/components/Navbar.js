import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">Rent - House</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link active" aria-current="page">
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/search">
                <a className="nav-link">
                 Select Dreams 
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/offers">
                <a className="nav-link">
                 Dreams 
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/map">
                <a className="nav-link">
                 Map 
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/tour">
                <a className="nav-link">
                 Tour 
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
