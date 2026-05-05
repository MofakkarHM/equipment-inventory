import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Equipment } from "../types";
import { fetchEquipment } from "../api/equipment";
import EquipmentFilters from "../components/EquipmentFilters";
import EquipmentTable from "../components/EquipmentTable";

export default function EquipmentListPage() {
  const navigate = useNavigate();

  //data state
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  //filter state
  const [type, setType] = useState<string>("");
  const [make, setMake] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  //fetch from API when type or make changes
  //search is handled client side with useMemo
  useEffect(() => {
    fetchEquipment({ type, make })
      .then((data) => setEquipment(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [type, make]);

  //filter by tag search client side
  //useMemo = only recalculate when equipment or search changes
  const filtered = useMemo(() => {
    if (!search) return equipment;
    return equipment.filter((e) =>
      e.tag.toLowerCase().includes(search.toLocaleLowerCase()),
    );
  }, [equipment, search]);

  //useCallback = stable function reference for child component
  const handleRowClick = useCallback(
    (id: number) => {
      navigate(`/equipment/${id}`);
    },
    [navigate],
  );

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "40px 16px",
        fontFamily: "sans-serif",
      }}
    >
      {/* header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: "0 0 4px" }}>Equipment Inventory</h1>
        <p style={{ margin: 0, color: "#666", fontSize: 14 }}>
          {loading
            ? "Loading..."
            : `${filtered.length} item${filtered.length !== 1 ? "s" : ""} found`}
        </p>
      </div>

      {/* filters */}
      <EquipmentFilters
        type={type}
        onType={setType}
        make={make}
        onMake={setMake}
        search={search}
        onSearch={setSearch}
      />

      {/* error */}
      {error && <p style={{ color: "red", marginBottom: 16 }}>❌ {error}</p>}

      {/* table */}
      <EquipmentTable
        equipment={filtered}
        loading={loading}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
