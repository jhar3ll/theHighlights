import "./Admin.css";
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react'
import { User } from "../../data/types";
import { AWS_Services, Icons, Library } from "../../lib/library";
import AdminTips from "../../ui/AdminTips/AdminTips";
import AdminSongs from "../../ui/AdminSongs/AdminSongs";
import AdminEvents from "../../ui/AdminEvents/AdminEvents";
import AlertMessage, { AlertMessageProps } from "../../ui/AlertMessage/AlertMessage";
import { AdminContext } from "../../contexts/contexts";
import AdminMessages from "../../ui/AdminMessages/AdminMessages";
const { Authenticator } = AWS_Services;
const { EventIcon, LibraryMusicIcon, MessageIcon, MonetizationOnIcon} = Icons;
const { BottomNavigation, BottomNavigationAction } = Library;

const Admin = ({ currentUser }: { currentUser: User|null }) => {
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps>({duration: 2500, message: "", open: false, severity: "success"});
  const [currentPage, setCurrentPage] = useState(0);
  
  const CurrentComponent = () => {
    const componentsMap:{[key:number]:React.JSX.Element} = {
      0: <AdminTips />,
      1: <AdminSongs />,
      2: <AdminEvents />,
      3: <AdminMessages />
    };
    return componentsMap[currentPage];
  }

  if (!currentUser) return <Authenticator />;
  return (
    <div className="adminMain">
      <div className="adminNavigationPanelContainer">

      <BottomNavigation
        className="adminNavigationPanelContainer"
        showLabels
        value={currentPage}
        onChange={(_event, newValue) => setCurrentPage(newValue)}
        >
        <BottomNavigationAction label="Tips" icon={<MonetizationOnIcon />} />
        <BottomNavigationAction label="Songs" icon={<LibraryMusicIcon />} />
        <BottomNavigationAction label="Events" icon={<EventIcon />} />
        <BottomNavigationAction label="Messages" icon={<MessageIcon />} />
      </BottomNavigation>
        </div>

      <AdminContext.Provider value={{ currentUser, setAlertMessage}}>
        <CurrentComponent />
      </AdminContext.Provider>

      <AlertMessage {...alertMessage} setShowAlert={setAlertMessage} />
    </div>
  )
}

export default Admin;