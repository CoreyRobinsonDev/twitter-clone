import { Link } from 'react-router-dom';
import { BiHomeAlt, BiSearchAlt, BiMessageSquare} from 'react-icons/bi';
import { RiNotification2Line, RiBookmarkLine, RiSettingsLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { useAppSelector } from '../util/hooks';

export default function NavBar() {
  const user = useAppSelector(state => state.user.user);

  return <nav>
    {user && <>
        <Link to="/home"><BiHomeAlt /></Link>    
        <Link to="/explore"><BiSearchAlt /></Link>    
        <Link to="/notifications"><RiNotification2Line /></Link>    
        <Link to="/messages"><BiMessageSquare /></Link>    
        <Link to="/bookmarks"><RiBookmarkLine /></Link>    
        <Link to={`/profile/${user.id}`}><CgProfile /></Link>    
        <Link to="/settings"><RiSettingsLine /></Link>    
      </>
      }
  </nav>
}