import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Equipment } from "../types";
import { fetchEquipmentById } from "../api/equipment";

//detail row helper component
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
      <td
        style={{
          padding: "12px 16px",
          fontWeight: 600,
          color: "#666",
          width: 140,
          fontSize: 14,
        }}
      >
        {label}
      </td>
      <td style={{ padding: "12px 16px", fontSize: 14 }}>{value}</td>
    </tr>
  );
}

//main component
export default function EquipmentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [item, setItem] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    fetchEquipmentById(Number(id))
      .then((data) => setItem(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  //loading
  if (loading) {
    return (
      <div style={{ padding: 40, fontFamily: "sans-serif" }}>
        <p>Loading equipment details...</p>
      </div>
    );
  }

  //error
  if (error) {
    return (
      <div style={{ padding: 40, fontFamily: "sans-serif" }}>
        <button
          onClick={() => navigate("/")}
          style={{ marginBottom: 16, padding: "8px 16px", cursor: "pointer" }}
        >
          Back to list
        </button>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (!item) return null;

  const rows: [string, string][] = [
    ["Tag", item.tag],
    ["Type", item.type],
    ["Make", item.make],
    ["Model", item.model],
    ["Location", item.location],
    ["Status", item.status],
    [
      "Added",
      new Date(item.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    ],
  ];

  //detail view
  return (
    <div
      style={{
        maxWidth: 640,
        margin: "40px auto",
        fontFamily: "sans-serif",
        padding: "0 16px",
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: 24,
          padding: "8px 16px",
          cursor: "pointer",
          borderRadius: 4,
          border: "1px solid #ccc",
          background: "#f5f5f5",
        }}
      >
        Back to list
      </button>

      <h1 style={{ margin: "0 0 4px", fontSize: 22 }}>{item.name}</h1>
      <p style={{ margin: "0 0 24px", color: "#888", fontSize: 14 }}>
        Equipment ID: {item.id}
      </p>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {rows.map(([label, value]) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
