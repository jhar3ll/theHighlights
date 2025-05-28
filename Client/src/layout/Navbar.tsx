import "./Navbar.css";
import { CSSProperties, useContext, useState } from 'react'
import { AWS_Services, Icons, Library } from "../lib/library";
import { ServiceContext } from "../contexts/contexts";
import Confirmation from "../ui/Confirmation/Confirmation";
const { Link, useLocation, useNavigate } = Library.Router;
const { IconButton } = Library;
const { FacebookIcon, InstagramIcon, LogoutIcon, YouTubeIcon } = Icons;

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
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
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
  
  async function handleSignOut(){
    setConfirm(false);
    try {
      await AWS_Services.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <div className="navbarMain">
      <Confirmation 
        confirmFunction={handleSignOut} 
        message="Are you sure you want to sign out?" 
        open={confirm}
        setOpen={setConfirm}
      />
      <nav className="navbarContainer">
        <Logo />
        <ul className="navbarListContainer">
          {currentUser && (
            <div className="navbarUserContainer">
              <li className="navbarListItem">
                <IconButton className="navbarListItemIcon" onClick={() => setConfirm(true)} size="large">
                  <LogoutIcon htmlColor="white" />
                </IconButton>
              </li>
              <li className="navbarListItem">
                <Link to="/admin" style={getCurrentPageStyle("/admin") as {}}>Admin</Link>
              </li>
            </div>
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