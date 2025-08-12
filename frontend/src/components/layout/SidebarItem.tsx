import { ChevronRight, Icon } from 'react-feather';
import { Link } from 'react-router-dom';

interface BaseProps {
  text: string;
  to: string;
  icon: Icon;
}

export interface SidebarItemConfig extends BaseProps {
  adminOnly?: boolean;
}

interface WithOnNavItemClick {
  onNavItemClick?: () => void;
}

interface SidebarItemProps extends BaseProps, WithOnNavItemClick {
  active?: boolean;
}

interface RenderSidebarItemProps extends WithOnNavItemClick {
  item: SidebarItemConfig;
  userRole: string;
  currentPath: string;
}

export const renderSidebarItem = ({
  item,
  userRole,
  currentPath,
  onNavItemClick,
}: RenderSidebarItemProps) => {
  if (item.adminOnly && userRole !== 'admin') {
    return null;
  }

  return (
    <SidebarItem
      key={item.to}
      {...item}
      active={currentPath === item.to}
      onNavItemClick={onNavItemClick}
    />
  );
};

function SidebarItem({
  text,
  icon: Icon,
  to,
  active = false,
  onNavItemClick,
}: SidebarItemProps) {
  return (
    <Link
      to={to}
      className="no-underline text-brand-white bg-brand-red hover:bg-brand-red-hover rounded-md p-3 transition-colors"
      onClick={onNavItemClick}
    >
      <span className="flex justify-center relative">
        <Icon className="absolute left-2" />

        {text}

        {active && <ChevronRight className="absolute right-2" />}
      </span>
    </Link>
  );
}
