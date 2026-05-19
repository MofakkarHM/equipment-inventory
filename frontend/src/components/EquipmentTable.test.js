import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EquipmentTable from "./EquipmentTable";
const mockEquipment = [
    {
        id: 1,
        name: "Dell PowerEdge R740 #1",
        type: "server",
        make: "Dell",
        model: "PowerEdge R740",
        tag: "ASSET-001",
        location: "Rack A1",
        status: "active",
        created_at: "2024-01-01T00:00:00Z",
    },
    {
        id: 2,
        name: "Cisco Catalyst 9300 #2",
        type: "switch",
        make: "Cisco",
        model: "Catalyst 9300",
        tag: "ASSET-002",
        location: "Rack B1",
        status: "inactive",
        created_at: "2024-01-02T00:00:00Z",
    },
];
describe("EquipmentTable", () => {
    it("shows loading message when loading is true", () => {
        render(_jsx(EquipmentTable, { equipment: [], loading: true, onRowClick: vi.fn(), onDelete: vi.fn(), isDeleting: false }));
        expect(screen.getByText("Loading equipment...")).toBeInTheDocument();
    });
    it("shows empty state when equipment array is empty", () => {
        render(_jsx(EquipmentTable, { equipment: [], loading: false, onRowClick: vi.fn(), onDelete: vi.fn(), isDeleting: false }));
        expect(screen.getByText(/no equipment found/i)).toBeInTheDocument();
    });
    it("renders a row for each equipment item", () => {
        render(_jsx(EquipmentTable, { equipment: mockEquipment, loading: false, onRowClick: vi.fn(), onDelete: vi.fn(), isDeleting: false }));
        expect(screen.getByText("ASSET-001")).toBeInTheDocument();
        expect(screen.getByText("ASSET-002")).toBeInTheDocument();
        expect(screen.getByText("Dell PowerEdge R740 #1")).toBeInTheDocument();
    });
    it("calls onRowClick with correct id when tag is clicked", async () => {
        const handleClick = vi.fn();
        render(_jsx(EquipmentTable, { equipment: mockEquipment, loading: false, onRowClick: handleClick, onDelete: vi.fn(), isDeleting: false }));
        await userEvent.click(screen.getByText("ASSET-001"));
        expect(handleClick).toHaveBeenCalledWith(1);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    it("calls onDelete when delete button clicked", async () => {
        const handleDelete = vi.fn();
        render(_jsx(EquipmentTable, { equipment: mockEquipment, loading: false, onRowClick: vi.fn(), onDelete: handleDelete, isDeleting: false }));
        const deleteButtons = screen.getAllByText("Delete");
        await userEvent.click(deleteButtons[0]);
        expect(handleDelete).toHaveBeenCalledWith(1);
    });
    it("disables delete buttons when isDeleting is true", () => {
        render(_jsx(EquipmentTable, { equipment: mockEquipment, loading: false, onRowClick: vi.fn(), onDelete: vi.fn(), isDeleting: true }));
        const deleteButtons = screen.getAllByRole("button");
        deleteButtons.forEach((btn) => {
            expect(btn).toBeDisabled();
        });
    });
    it("renders correct status badge for each status", () => {
        render(_jsx(EquipmentTable, { equipment: mockEquipment, loading: false, onRowClick: vi.fn(), onDelete: vi.fn(), isDeleting: false }));
        expect(screen.getByText("active")).toBeInTheDocument();
        expect(screen.getByText("inactive")).toBeInTheDocument();
    });
});
