import "./Admin.css";
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react'
import { User } from "../../data/types";
import { AWS_Services, Icons, Library } from "../../lib/library";
import AdminTips from "../../ui/AdminTips/AdminTips";
import AdminSongs from "../../ui/AdminSongs/AdminSongs";
import AdminEvents from "../../ui/AdminEvents/AdminEvents";
const { Authenticator } = AWS_Services;
const { EventIcon, LibraryMusicIcon, MonetizationOnIcon} = Icons;
const { BottomNavigation, BottomNavigationAction } = Library;

const Admin = ({ currentUser }: { currentUser: User|null }) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const CurrentComponent = () => {
    const componentsMap:{[key:number]:React.JSX.Element} = {
      0: <AdminTips />,
      1: <AdminSongs />,
      2: <AdminEvents />
    };
    return componentsMap[currentPage];
  }

  if (!currentUser) return <Authenticator />;
  return (
    <div className="adminMain">
      <BottomNavigation
        className="adminNavigationPanelContainer"
        showLabels
        value={currentPage}
        onChange={(_event, newValue) => setCurrentPage(newValue)}
      >
        <BottomNavigationAction label="Tips" icon={<MonetizationOnIcon htmlColor="white"/>} />
        <BottomNavigationAction label="Songs List" icon={<LibraryMusicIcon htmlColor="white"/>} />
        <BottomNavigationAction label="Events" icon={<EventIcon htmlColor="white"/>} />
      </BottomNavigation>

      <CurrentComponent />
    </div>
  )
}

export default Admin;