import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEquipment, fetchEquipment } from "../api/equipment";
import EquipmentFilters from "../components/EquipmentFilters";
import EquipmentTable from "../components/EquipmentTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { equipmentKeys } from "../api/queryKeys";

export default function EquipmentListPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //data state
  // const [equipment, setEquipment] = useState<Equipment[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string>("");

  //filter state
  const [type, setType] = useState<string>("");
  const [make, setMake] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  //fetch from API when type or make changes
  //search is handled client side with useMemo
  // useEffect(() => {
  //   fetchEquipment({ type, make })
  //     .then((data) => setEquipment(data))
  //     .catch((err: Error) => setError(err.message))
  //     .finally(() => setLoading(false));
  // }, [type, make]);

  //TanStack Query
  const {
    data: equipment = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: equipmentKeys.list({ type, make }),
    queryFn: () => fetchEquipment({ type, make }),
  });

  //useMutation for delete
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteEquipment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: equipmentKeys.lists(),
      });
    },
    onError: (err: Error) => {
      alert(`Delete failed: ${err.message}`);
    },
  });

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

  const handleDelete = useCallback(
    (id: number) => {
      if (!confirm("Delete this equipment?")) return;
      deleteMutation.mutate(id);
    },
    [deleteMutation],
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
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: "0 0 4px" }}>Equipment Inventory</h1>
        <p style={{ margin: 0, color: "#666", fontSize: 14 }}>
          {loading
            ? "Loading..."
            : `${filtered.length} item${filtered.length !== 1 ? "s" : ""} found`}
        </p>
      </div>

      <EquipmentFilters
        type={type}
        onType={setType}
        make={make}
        onMake={setMake}
        search={search}
        onSearch={setSearch}
      />

      {isError && (
        <p style={{ color: "red", marginBottom: 16 }}>
          ❌ {(error as Error).message}
        </p>
      )}

      <EquipmentTable
        equipment={filtered}
        loading={loading}
        onRowClick={handleRowClick}
        onDelete={handleDelete}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
