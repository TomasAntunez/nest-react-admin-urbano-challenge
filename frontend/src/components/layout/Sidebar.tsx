import { CSSProperties } from 'react';
import { BookOpen, Home, LogOut, Users } from 'react-feather';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { sidemenuBgImage, urbanoLogoWhiteImage } from '../../assets/images';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/AuthService';
import { renderSidebarItem, SidebarItemConfig } from './SidebarItem';

interface SidebarProps {
  className: string;
  onNavItemClick?: () => void;
}

const sideBarItems: SidebarItemConfig[] = [
  { text: 'Dashboard', to: '/', icon: Home },
  { text: 'Courses', to: '/courses', icon: BookOpen },
  { text: 'Users', to: '/users', icon: Users, adminOnly: true },
];

const containerStyle: CSSProperties = {
  backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${sidemenuBgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

export function Sidebar({ className, onNavItemClick }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { authenticatedUser, setAuthenticatedUser } = useAuth();

  const handleLogout = async () => {
    await authService.logout();
    setAuthenticatedUser(null);
    navigate('/login');
  };

  return (
    <div className={'sidebar ' + className} style={containerStyle}>
      <Link to="/" className="flex justify-center">
        <img
          src={urbanoLogoWhiteImage}
          alt="Logo Urbano"
          className="w-52 h-auto"
        />
      </Link>

      <nav className="mt-14 flex flex-col gap-3 flex-grow">
        {sideBarItems.map((item) =>
          renderSidebarItem({
            item,
            userRole: authenticatedUser.role,
            currentPath: location.pathname,
            onNavItemClick,
          }),
        )}
      </nav>
      <button
        className="text-red-500 rounded-md p-3 transition-colors flex gap-3 justify-center items-center font-semibold focus:outline-none"
        onClick={handleLogout}
      >
        <LogOut /> Logout
      </button>
    </div>
  );
}
