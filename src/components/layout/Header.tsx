import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Building2, Heart, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { useTheme } from '@/hooks';
import { useFavoritesStore } from '@/store/favoritesStore';

/**
 * Header navigation component
 */
export function Header() {
  const location = useLocation();
  const { toggleTheme, isDark } = useTheme();
  const favoriteCount = useFavoritesStore((state) => state.favoriteIds.length);

  const navLinks = [
    { path: '/', label: 'Properties', icon: Building2 },
    { path: '/map', label: 'Map', icon: Map },
    { path: '/favorites', label: 'Favorites', icon: Heart, badge: favoriteCount },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl hidden sm:inline">UK Estates</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;

            return (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className={cn('gap-2 relative', isActive && 'pointer-events-none')}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                      {link.badge > 99 ? '99+' : link.badge}
                    </span>
                  )}
                </Button>
              </Link>
            );
          })}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="ml-2"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </nav>
      </div>
    </header>
  );
}
