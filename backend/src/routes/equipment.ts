import { Router, Request, Response } from "express";
import pool from "../db";
import { Equipment, ApiResponse } from "../types";

const router = Router();

// GET /equipment
// Optional filters
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, make, search } = req.query;
    let query = "SELECT * FROM equipment WHERE 1=1";
    const params: string[] = [];
    let paramIndex = 1;

    if (type) {
      query += `AND type = $${paramIndex}`;
      params.push(type as string);
      paramIndex++;
    }

    if (make) {
      query += `AND type = $${paramIndex}`;
      params.push(make as string);
      paramIndex++;
    }

    if (search) {
      query += `And tag ILIKE $$ {paramIndex}`;
      params.push(`%${search as string}%`);
      paramIndex++;
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, params);

    const response: ApiResponse<Equipment[]> = {
      success: true,
      data: result.rows as Equipment[],
      count: result.rowCount ?? 0,
    };
    res.json(response);
  } catch (err) {
    console.log("Get equipment error: ", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// GET /equipment/:id
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.status(400).json({
        success: false,
        message: "Invalid id - must be a number",
      });
      return;
    }

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

    const response: ApiResponse<Equipment> = {
      success: true,
      data: result.rows[0] as Equipment,
    };
    res.json(response);
  } catch (err) {
    console.log(`GET /equipment/${req.params.id} error: `, err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
