import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, AlertCircle, CheckCircle2, CloudSun } from 'lucide-react';
import api from '../api/axios';
import FavouriteCard from '../components/FavouriteCard';
import Loading from '../components/Loading';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  // Load user's favourite cities from MongoDB backend
  const loadFavourites = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/favourites');
      if (res.data && res.data.data) {
        setFavourites(res.data.data);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to load your favourite cities.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavourites();
  }, []);

  // Handle Remove Favourite
  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      setError('');
      setSuccessMsg('');
      await api.delete(`/favourites/${id}`);
      setFavourites((prev) => prev.filter((item) => item._id !== id));
      setSuccessMsg('Favourite city removed successfully.');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to remove favourite city.';
      setError(msg);
    } finally {
      setDeletingId(null);
    }
  };

  // Handle clicking a favourite city to view its weather on dashboard
  const handleSelectCity = (cityName) => {
    navigate(`/dashboard?city=${encodeURIComponent(cityName)}`);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Heart size={26} color="var(--error)" fill="var(--error)" />
          Favourite Cities
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
          Quickly access real-time weather and forecasts for your saved locations.
        </p>
      </div>

      {successMsg && (
        <div className="alert alert-success">
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <Loading text="Loading your favourite cities..." />
      ) : favourites.length === 0 ? (
        <div className="empty-state">
          <CloudSun size={48} className="empty-state-icon" />
          <h3 className="empty-state-title">No favourite cities yet</h3>
          <p className="empty-state-desc">
            Add your favourite cities to quickly check their weather anytime.
          </p>
          <div style={{ marginTop: '18px' }}>
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard & Search
            </Link>
          </div>
        </div>
      ) : (
        <div className="favourites-grid">
          {favourites.map((fav) => (
            <FavouriteCard
              key={fav._id}
              favourite={fav}
              onSelect={handleSelectCity}
              onDelete={handleDelete}
              deleteLoading={deletingId === fav._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
