import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CloudSun, LogOut, Heart, LayoutDashboard, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand / Logo */}
        <Link to="/dashboard" className="brand">
          <div className="brand-icon">
            <CloudSun size={28} />
          </div>
          <span>Weather Dashboard</span>
        </Link>

        {/* Center / Navigation Links */}
        {isAuthenticated && (
          <nav className="nav-links">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <LayoutDashboard size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
              Dashboard
            </NavLink>
            <NavLink
              to="/favourites"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <Heart size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
              Favourites
            </NavLink>
          </nav>
        )}

        {/* Right side / Auth status */}
        <div className="nav-auth">
          {isAuthenticated && user ? (
            <>
              <div className="user-badge">
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-secondary"
                title="Logout"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
