interface EquipmentFiltersProps {
  type: string;
  make: string;
  search: string;
  onType: (value: string) => void;
  onMake: (value: string) => void;
  onSearch: (value: string) => void;
}

const TYPES = ["", "server", "switch", "router", "ups", "panel"];
const MAKES = ["", "Dell", "Cisco", "HP", "APC", "ASUS"];

export default function EquipmentFilters({
  type,
  make,
  search,
  onType,
  onMake,
  onSearch,
}: EquipmentFiltersProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        marginBottom: 16,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {/*Type filter */}
      <select
        value={type}
        onChange={(e) => onType(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: 4,
          border: "1px solid #ccc",
        }}
      >
        {TYPES.map((t) => (
          <option key={t} value={t}>
            {t === "" ? "All Types" : t}
          </option>
        ))}
      </select>

      {/*Make filter */}
      <select
        value={make}
        onChange={(e) => onMake(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: 4,
          border: "1px solid #ccc",
        }}
      >
        {MAKES.map((m) => (
          <option key={m} value={m}>
            {m === "" ? "All Makes" : m}
          </option>
        ))}
      </select>

      {/*Tag search */}
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search by tag..."
        style={{
          padding: "8px 12px",
          borderRadius: 4,
          border: "1px solid #ccc",
          width: 200,
        }}
      />

      {/*Clear all filters */}
      {(type || make || search) && (
        <button
          onClick={() => {
            onType("");
            onMake("");
            onSearch("");
          }}
          style={{
            padding: "8px 12px",
            borderRadius: 4,
            border: "1px solid #ccc",
            cursor: "pointer",
            background: "#f5f5f5",
          }}
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
