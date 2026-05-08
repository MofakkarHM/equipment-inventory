import { Router, Request, Response } from "express";
import pool from "../db";
import { Equipment, ApiResponse } from "../types";

const router = Router();

// GET /equipment
// Optional filters
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, make, search } = req.query;

    const typeParam = Array.isArray(type) ? type[0] : type;
    const makeParam = Array.isArray(make) ? make[0] : make;
    const searchParam = Array.isArray(search) ? search[0] : search;

    let query = "SELECT * FROM equipment WHERE 1=1";
    const params: string[] = [];
    let paramIndex = 1;

    if (typeParam) {
      query += ` AND type = $${paramIndex}`;
      params.push(typeParam as string);
      paramIndex++;
    }

    if (makeParam) {
      query += ` AND make = $${paramIndex}`;
      params.push(makeParam as string);
      paramIndex++;
    }

    if (searchParam) {
      query += ` AND tag ILIKE $${paramIndex}`;
      params.push(`%${searchParam as string}%`);
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

// DELETE /equipment/:id
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.status(400).json({
        success: false,
        message: "Invalid id — must be a number",
      });
      return;
    }

    // check it exists first
    const check = await pool.query("SELECT id FROM equipment WHERE id = $1", [
      id,
    ]);

    if (check.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: `Equipment with id ${id} not found`,
      });
      return;
    }

    await pool.query("DELETE FROM equipment WHERE id = $1", [id]);

    res.status(204).send();
  } catch (err) {
    console.error(`DELETE /equipment/${req.params.id} error:`, err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// POST /equipment
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, type, make, model, tag, location, status } = req.body as {
      name?: string;
      type?: string;
      make?: string;
      model?: string;
      tag?: string;
      location?: string;
      status?: string;
    };

    if (!name || !type || !make || !model || !tag || !location) {
      res.status(400).json({
        success: false,
        message: "name, type, make, model, tag and location are required",
      });
      return;
    }

    const result = await pool.query(
      `INSERT INTO equipment
           (name, type, make, model, tag, location, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
      [name, type, make, model, tag, location, status ?? "active"],
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
});

export default router;
