import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Equipment } from "../types";
import EquipmentTable from "./EquipmentTable";

//mock data
const mockEquipment: Equipment[] = [
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

//tests
describe("EquipmentTable", () => {
  it("shows loading message when loading is true", () => {
    render(
      <EquipmentTable equipment={[]} loading={true} onRowClick={vi.fn()} />,
    );
    expect(screen.getByText("Loading equipment...")).toBeInTheDocument();
  });

  it("shows empty state when equipment array is empty", () => {
    render(
      <EquipmentTable equipment={[]} loading={false} onRowClick={vi.fn()} />,
    );
    expect(screen.getByText(/no equipment found/i)).toBeInTheDocument();
  });

  it("renders a row for each equipment item", () => {
    render(
      <EquipmentTable
        equipment={mockEquipment}
        loading={false}
        onRowClick={vi.fn()}
      />,
    );
    expect(screen.getByText("ASSET-001")).toBeInTheDocument();
    expect(screen.getByText("ASSET-002")).toBeInTheDocument();
    expect(screen.getByText("Dell PowerEdge R740 #1")).toBeInTheDocument();
    expect(screen.getByText("Cisco Catalyst 9300 #2")).toBeInTheDocument();
  });

  it("calls onRowClick with correct id when row is clicked", async () => {
    const handleClick = vi.fn();
    render(
      <EquipmentTable
        equipment={mockEquipment}
        loading={false}
        onRowClick={handleClick}
      />,
    );

    await userEvent.click(screen.getByText("ASSET-001"));
    expect(handleClick).toHaveBeenCalledWith(1);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders correct status badge for each status", () => {
    render(
      <EquipmentTable
        equipment={mockEquipment}
        loading={false}
        onRowClick={vi.fn()}
      />,
    );
    expect(screen.getByText("active")).toBeInTheDocument();
    expect(screen.getByText("inactive")).toBeInTheDocument();
  });
});
