import { Router, Request, Response } from "express";
import pool from "../db";
import { validateRequest } from "../middleware/validateRequest";
import {
  createEquipmentSchema,
  updateEquipmentSchema,
  equipmentIdSchema,
  listEquipmentQuerySchema,
  type CreateEquipmentInput,
  type UpdateEquipmentInput,
  type EquipmentIdParam,
  type ListEquipmentQuery,
} from "./equipment.schemas";
import type { Equipment } from "../types";

const router = Router();

// GET /equipment
router.get(
  "/",
  validateRequest({ query: listEquipmentQuerySchema }),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { type, make, search, page, limit } = req.validated
        .query as ListEquipmentQuery;

      let query = "SELECT * FROM equipment WHERE 1=1";
      const params: (string | number)[] = [];
      let paramIndex = 1;

      if (type) {
        query += ` AND type = $${paramIndex}`;
        params.push(type);
        paramIndex++;
      }

      if (make) {
        query += ` AND make = $${paramIndex}`;
        params.push(make);
        paramIndex++;
      }

      if (search) {
        query += ` AND tag ILIKE $${paramIndex}`;
        params.push(`%${search}%`);
        paramIndex++;
      }

      // pagination
      const offset = (page - 1) * limit;
      query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
      params.push(limit, offset);

      const result = await pool.query(query, params);

      res.json({
        success: true,
        data: result.rows as Equipment[],
        count: result.rowCount ?? 0,
        page,
        limit,
      });
    } catch (err) {
      console.error("GET /equipment error:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

// GET /equipment/:id
router.get(
  "/:id",
  validateRequest({ params: equipmentIdSchema }),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.validated.params as EquipmentIdParam;

      const result = await pool.query("SELECT * FROM equipment WHERE id = $1", [
        id,
      ]);

      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: `Equipment with id ${id} not found`,
        });
        return;
      }

      res.json({
        success: true,
        data: result.rows[0] as Equipment,
      });
    } catch (err) {
      console.error("GET /equipment/:id error:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

// POST /equipment
router.post(
  "/",
  validateRequest({ body: createEquipmentSchema }),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.validated.body as CreateEquipmentInput;

      const result = await pool.query(
        `INSERT INTO equipment
           (name, type, make, model, tag, location, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [
          data.name,
          data.type,
          data.make,
          data.model,
          data.tag,
          data.location,
          data.status,
        ],
      );

      res.status(201).json({
        success: true,
        data: result.rows[0] as Equipment,
      });
    } catch (err) {
      console.error("POST /equipment error:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

// PATCH /equipment/:id
router.patch(
  "/:id",
  validateRequest({
    params: equipmentIdSchema,
    body: updateEquipmentSchema,
  }),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.validated.params as EquipmentIdParam;
      const updates = req.validated.body as UpdateEquipmentInput;

      const existing = await pool.query(
        "SELECT * FROM equipment WHERE id = $1",
        [id],
      );

      if (existing.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: `Equipment with id ${id} not found`,
        });
        return;
      }

      const fields = Object.keys(updates) as (keyof UpdateEquipmentInput)[];
      const values = fields.map((f) => updates[f]);
      const setClauses = fields.map(
        (field, index) => `${field} = $${index + 1}`,
      );

      const result = await pool.query(
        `UPDATE equipment
         SET ${setClauses.join(", ")}
         WHERE id = $${fields.length + 1}
         RETURNING *`,
        [...values, id],
      );

      res.json({
        success: true,
        data: result.rows[0] as Equipment,
      });
    } catch (err) {
      console.error("PATCH /equipment/:id error:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

// DELETE /equipment/:id
router.delete(
  "/:id",
  validateRequest({ params: equipmentIdSchema }),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.validated.params as EquipmentIdParam;

      const result = await pool.query(
        "DELETE FROM equipment WHERE id = $1 RETURNING id",
        [id],
      );

      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: `Equipment with id ${id} not found`,
        });
        return;
      }

      res.status(204).send();
    } catch (err) {
      console.error("DELETE /equipment/:id error:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

export default router;
