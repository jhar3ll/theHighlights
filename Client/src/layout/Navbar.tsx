import "./Navbar.css";
import { CSSProperties, useContext } from 'react'
import { Icons, Library } from "../lib/library";
import { ServiceContext } from "../contexts/contexts";
const { Link, useLocation } = Library.Router;
const { IconButton } = Library;
const { FacebookIcon, InstagramIcon, YouTubeIcon } = Icons;

const Logo = () => {
  return (
    <Link className="navbarLogoContainer" to="/">
      <div>The</div>
      <div>Highlights</div>
    </Link>
  )
}

const Navbar = () => {
  const { currentUser } = useContext(ServiceContext) || {};
  const { pathname } = useLocation();
  const pages = [
    {name: "Tip", path: "/tip"},
    {name: "Events", path: "/events"},
    {name: "About", path: "/about"},
    {name: "Contact Us", path: "/contact"}
  ];

  function getCurrentPageStyle(path: string): CSSProperties | undefined {
    if (pathname === path)
      return {
        textUnderlineOffset: "5px",
        textDecoration: "underline", 
        textDecorationThickness: "4px",
        textDecorationColor: "white", 
        pointerEvents: "none"
      };
  }
  
  return (
    <div className="navbarMain">
      <nav className="navbarContainer">
        <Logo />
        <ul className="navbarListContainer">
          {currentUser && (
            <li className="navbarListItem">
              <Link to="/admin" style={getCurrentPageStyle("/admin") as {}}>Admin</Link>
            </li>
          )}
          {pages.map((page, index) => (
            <li key={index} className="navbarListItem">
              <Link to={page.path} style={getCurrentPageStyle(page.path) as {}}>{page.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="navbarSocialMediaContainer">
        <IconButton className="navbarSocialMediaIcon" aria-label="facebook" size="large">
          <FacebookIcon fontSize="inherit" htmlColor="white" />
        </IconButton>
        <IconButton className="navbarSocialMediaIcon" aria-label="instagram" size="large">
          <InstagramIcon fontSize="inherit" htmlColor="white" />
        </IconButton>
        <IconButton className="navbarSocialMediaIcon" aria-label="youtube" size="large">
          <YouTubeIcon fontSize="inherit" htmlColor="white" />
        </IconButton>
      </div>
    </div>
  )
}

export default Navbar;