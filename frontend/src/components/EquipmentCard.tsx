interface EquipmentCardProps {
  tag: string;
  name: string;
  type: string;
  make: string;
  location: string;
  status: "active" | "inactive" | "maintenance";
  onView: () => void;
  onDelete: () => void;
}

//Tailwind version
export function EquipmentCardTailwind({
  tag,
  name,
  type,
  make,
  location,
  status,
  onView,
  onDelete,
}: EquipmentCardProps) {
  const statusClass =
    status === "active"
      ? "badge-success"
      : status === "inactive"
        ? "badge-danger"
        : "badge-warning";

  return (
    <div
      className="bg-white dark:bg-gray-900
                    border border-gray-200 dark:border-gray-800
                    rounded-xl shadow-sm
                    hover:shadow-md hover:border-gray-300
                    dark:hover:border-gray-700
                    transition-all duration-200
                    p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="font-mono text-xs font-medium
                         text-gray-400 dark:text-gray-500
                         bg-gray-50 dark:bg-gray-800
                         px-2 py-1 rounded-md"
        >
          {tag}
        </span>
        <span className={statusClass}>{status}</span>
      </div>

      {/* name */}
      <h3
        className="text-base font-semibold
                     text-gray-900 dark:text-white
                     mb-1 leading-tight"
      >
        {name}
      </h3>

      {/* meta info */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="text-xs text-gray-500 dark:text-gray-400
                         bg-gray-100 dark:bg-gray-800
                         px-2 py-0.5 rounded-full"
        >
          {type}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">·</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{make}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500">·</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {location}
        </span>
      </div>

      {/* divider */}
      <div className="border-t border-gray-100 dark:border-gray-800 mb-4" />

      {/* actions */}
      <div className="flex gap-2">
        <button onClick={onView} className="flex-1 btn-primary btn-sm">
          View Details
        </button>
        <button onClick={onDelete} className="btn-danger btn-sm px-3">
          🗑
        </button>
      </div>
    </div>
  );
}

//Bootstrap version
export function EquipmentCardBootstrap({
  tag,
  name,
  type,
  make,
  location,
  status,
  onView,
  onDelete,
}: EquipmentCardProps) {
  const badgeClass =
    status === "active"
      ? "bg-success"
      : status === "inactive"
        ? "bg-danger"
        : "bg-warning text-dark";

  return (
    <div className="card h-100">
      <div className="card-body">
        {/* top row — tag + status */}
        <div
          className="d-flex justify-content-between
                        align-items-center mb-3"
        >
          <code className="text-muted small">{tag}</code>
          <span className={`badge ${badgeClass}`}>{status}</span>
        </div>

        {/* name */}
        <h5 className="card-title mb-1">{name}</h5>

        {/* meta info */}
        <p className="card-text text-muted small mb-3">
          {type} · {make} · {location}
        </p>

        {/* divider */}
        <hr className="my-3" />

        {/* actions */}
        <div className="d-flex gap-2">
          <button onClick={onView} className="btn btn-primary btn-sm flex-fill">
            View Details
          </button>
          <button onClick={onDelete} className="btn btn-outline-danger btn-sm">
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}
