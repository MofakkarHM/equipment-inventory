import type { Equipment } from "../types";

interface EquipmentTableProps {
  equipment: Equipment[];
  loading: boolean;
  onRowClick: (id: number) => void;
}

// ── status badge colour helper ────────────────────────────────────
function getStatusStyle(status: string): React.CSSProperties {
  const base: React.CSSProperties = {
    padding: "2px 8px",
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "bold",
  };

  switch (status) {
    case "active":
      return { ...base, background: "#d4edda", color: "#155724" };
    case "maintenance":
      return { ...base, background: "#fff3cd", color: "#856404" };
    default:
      return { ...base, background: "#f8d7da", color: "#721c24" };
  }
}

const HEADERS = ["Tag", "Name", "Type", "Make", "Model", "Location", "Status"];

export default function EquipmentTable({
  equipment,
  loading,
  onRowClick,
}: EquipmentTableProps) {
  //loading state
  if (loading) {
    return (
      <p style={{ color: "#555", padding: "20px" }}>Loading equipment...</p>
    );
  }

  //empty state
  if (equipment.length === 0) {
    return (
      <div
        style={{
          padding: "40px 20px",
          textAlign: "center",
          color: "#888",
          border: "1px dashed #ccc",
          borderRadius: 8,
          marginTop: 16,
        }}
      >
        <p style={{ fontSize: 32, margin: "0 0 8px" }}>📭</p>
        <p style={{ margin: 0, fontSize: 16 }}>
          No equipment found matching your filters.
        </p>
        <p style={{ margin: "4px 0 0", fontSize: 13 }}>
          Try adjusting or clearing the filters above.
        </p>
      </div>
    );
  }

  //Table
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f8f9fa" }}>
            {HEADERS.map((header) => (
              <th
                key={header}
                style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  borderBottom: "2px solid #dee2e6",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#495057",
                  whiteSpace: "nowrap",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {equipment.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick(item.id)}
              style={{
                borderBottom: "1px solid #f0f0f0",
                cursor: "pointer",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f8f9fa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
              }}
            >
              <td
                style={{
                  padding: "12px 16px",
                  fontSize: 13,
                  fontFamily: "monospace",
                }}
              >
                {item.tag}
              </td>
              <td style={{ padding: "12px 16px", fontSize: 13 }}>
                {item.name}
              </td>
              <td style={{ padding: "12px 16px", fontSize: 13 }}>
                {item.type}
              </td>
              <td style={{ padding: "12px 16px", fontSize: 13 }}>
                {item.make}
              </td>
              <td style={{ padding: "12px 16px", fontSize: 13 }}>
                {item.model}
              </td>
              <td style={{ padding: "12px 16px", fontSize: 13 }}>
                {item.location}
              </td>
              <td style={{ padding: "12px 16px", fontSize: 13 }}>
                <span style={getStatusStyle(item.status)}>{item.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
