import { Link } from 'react-router-dom';
import { BiHomeAlt, BiSearchAlt, BiMessageSquare} from 'react-icons/bi';
import { RiNotification2Line, RiBookmarkLine, RiSettingsLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';

export default function NavBar() {
  return <nav>
  <Link to="/"><BiHomeAlt /></Link>    
  <Link to="/explore"><BiSearchAlt /></Link>    
  <Link to="/notifications"><RiNotification2Line /></Link>    
  <Link to="/messages"><BiMessageSquare /></Link>    
  <Link to="/bookmarks"><RiBookmarkLine /></Link>    
  <Link to="/profile"><CgProfile /></Link>    
  <Link to="/settings"><RiSettingsLine /></Link>    
  </nav>
}