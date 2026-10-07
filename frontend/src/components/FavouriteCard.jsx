import { MapPin, Trash2, ArrowUpRight, CloudSun } from 'lucide-react';

const FavouriteCard = ({
  favourite,
  onSelect,
  onDelete,
  deleteLoading
}) => {
  if (!favourite) return null;

  return (
    <div className="favourite-card">
      <div className="favourite-card-header">
        <div>
          <h3 className="favourite-city-name">
            <MapPin size={18} style={{ display: 'inline', marginRight: '6px', color: 'var(--accent-primary)', verticalAlign: 'text-bottom' }} />
            {favourite.cityName}
          </h3>
          <span className="favourite-country">
            {favourite.country ? favourite.country : 'Saved City'}
          </span>
        </div>
        <div style={{ color: 'var(--accent-secondary)' }}>
          <CloudSun size={28} />
        </div>
      </div>

      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        Added on {new Date(favourite.createdAt).toLocaleDateString()}
      </div>

      <div className="favourite-actions">
        <button
          type="button"
          onClick={() => onSelect(favourite.cityName)}
          className="btn btn-primary"
          style={{ flex: 1, padding: '8px 12px' }}
        >
          <ArrowUpRight size={16} />
          <span>View Weather</span>
        </button>
        <button
          type="button"
          onClick={() => onDelete(favourite._id)}
          disabled={deleteLoading}
          className="btn btn-danger btn-icon"
          title="Remove from favourites"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default FavouriteCard;
