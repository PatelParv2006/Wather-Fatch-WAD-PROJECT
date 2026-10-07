const UnitToggle = ({ unit, onToggle }) => {
  return (
    <div className="unit-toggle-group" title="Toggle temperature unit">
      <button
        type="button"
        className={`unit-btn ${unit === 'metric' ? 'active' : ''}`}
        onClick={() => onToggle('metric')}
      >
        °C
      </button>
      <button
        type="button"
        className={`unit-btn ${unit === 'imperial' ? 'active' : ''}`}
        onClick={() => onToggle('imperial')}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
