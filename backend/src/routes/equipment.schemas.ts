import { z } from "zod";
import pool from "../db";

//Constants
const EQUIPMENT_TYPES = ["server", "switch", "router", "ups", "panel"] as const;

const EQUIPMENT_MAKES = [
  "Dell",
  "ASUS",
  "Cisco",
  "HP",
  "APC",
  "Juniper",
] as const;

//Reusable pieces
const equipmentTypeSchema = z.enum(EQUIPMENT_TYPES, {
  message: `Type must be one of: ${EQUIPMENT_TYPES.join(", ")}`,
});

const equipmentMakeSchema = z.enum(EQUIPMENT_MAKES, {
  message: `Make must be one of: ${EQUIPMENT_MAKES.join(", ")}`,
});

//Base equipment schema
const equipmentBaseSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255),
  type: equipmentTypeSchema,
  make: equipmentMakeSchema,
  model: z.string().trim().min(1, "Model is required").max(100),
  tag: z
    .string()
    .trim()
    .regex(/^ASSET-\d{3}$/, "Tag must be format ASSET-XXX (e.g. ASSET-001)"),
  location: z.string().trim().min(1, "Location is required"),
  status: z.enum(["active", "inactive", "maintenance"]).default("active"),
});

//CREATE schema
export const createEquipmentSchema = equipmentBaseSchema.superRefine(
  async (data, ctx) => {
    const result = await pool.query("SELECT id FROM equipment WHERE tag = $1", [
      data.tag,
    ]);

    if (result.rowCount && result.rowCount > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["tag"],
        message: `Tag ${data.tag} is already in use`,
      });
    }
  },
);

//UPDATE schema
export const updateEquipmentSchema = equipmentBaseSchema
  .partial()
  .omit({ tag: true })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

//ID param schema
export const equipmentIdSchema = z.object({
  id: z.coerce.number().int().positive("ID must be a positive integer"),
});

//LIST query schema
export const listEquipmentQuerySchema = z.object({
  type: equipmentTypeSchema.optional(),
  make: equipmentMakeSchema.optional(),
  search: z.string().trim().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

//Inferred types
export type CreateEquipmentInput = z.infer<typeof createEquipmentSchema>;
export type UpdateEquipmentInput = z.infer<typeof updateEquipmentSchema>;
export type EquipmentIdParam = z.infer<typeof equipmentIdSchema>;
export type ListEquipmentQuery = z.infer<typeof listEquipmentQuerySchema>;
