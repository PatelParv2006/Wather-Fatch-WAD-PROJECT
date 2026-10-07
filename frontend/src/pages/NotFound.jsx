import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="empty-state" style={{ margin: '60px auto', maxWidth: '500px' }}>
      <Compass size={56} style={{ color: 'var(--accent-primary)', marginBottom: '16px' }} />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '12px' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/dashboard" className="btn btn-primary">
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
