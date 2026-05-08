import { z } from "zod";

// ── Real equipment schema with refine ────────────────────────────
console.log("\n── Equipment with refine ──");

const VALID_TYPES = ["server", "switch", "router", "ups", "panel"] as const;
const VALID_MAKES = ["Dell", "Cisco", "HP", "APC", "Juniper"] as const;

const createEquipmentSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").max(255),
    type: z.enum(VALID_TYPES, {
      message: `Type must be one of: ${VALID_TYPES.join(", ")}`,
    }),
    make: z.enum(VALID_MAKES, {
      message: `Make must be one of: ${VALID_MAKES.join(", ")}`,
    }),
    model: z.string().trim().min(1, "Model is required").max(100),
    tag: z
      .string()
      .trim()
      .regex(/^ASSET-\d{3}$/, "Tag must be format ASSET-XXX (e.g. ASSET-001)"),
    location: z.string().trim().min(1, "Location is required"),
    status: z.enum(["active", "inactive", "maintenance"]).default("active"),
  })
  .superRefine((data, ctx) => {
    // business rule: APC equipment must be type "ups"
    if (data.make === "APC" && data.type !== "ups") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["type"],
        message: "APC equipment must be type 'ups'",
      });
    }

    // business rule: panel cannot be in Rack C
    if (data.type === "panel" && data.location.startsWith("Rack C")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["location"],
        message: "Patch panels cannot be installed in Rack C",
      });
    }
  });

// test business rules
console.log("\nAPC must be ups:");
const apcWrongType = createEquipmentSchema.safeParse({
  name: "APC Unit",
  type: "server", // wrong — APC must be ups
  make: "APC",
  model: "Smart-UPS 3000",
  tag: "ASSET-010",
  location: "Rack A1",
});
if (!apcWrongType.success) {
  apcWrongType.error.issues.forEach((err) => {
    console.log(`  [${err.path.join(".")}]: ${err.message}`);
  });
}

console.log("\nPatch panel in Rack C:");
const wrongLocation = createEquipmentSchema.safeParse({
  name: "Panel 1",
  type: "panel",
  make: "Dell",
  model: "PowerConnect 5548",
  tag: "ASSET-011",
  location: "Rack C1", // wrong — patch panels not allowed in Rack C
});
if (!wrongLocation.success) {
  wrongLocation.error.issues.forEach((err) => {
    console.log(`  [${err.path.join(".")}]: ${err.message}`);
  });
}
