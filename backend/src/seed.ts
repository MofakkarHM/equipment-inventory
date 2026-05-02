import pool from "./db";

async function seed(): Promise<void> {
  console.log("Starting seed...");

  await pool.query(`
    CREATE TABLE IF NOT EXISTS equipment(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        type VARCHAR(30) NOT NULL,
        make VARCHAR(30) NOT NULL,
        model VARCHAR(30) NOT NULL,
        tag VARCHAR(30) NOT NULL UNIQUE,
        location VARCHAR(30) NOT NULL,
        status VARCHAR(15) NOT NULL DEFAULT 'active',
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
    `);
  console.log("Table ready");
}

const types = ["server", "switch", "router", "ups", "panel"];
const makes = ["Dell", "Cisco", "HP", "APC", "ASUS"];
const statuses = ["active", "inactive", "maintenance"];
const locations = [
  "Rack A1",
  "Rack A2",
  "Rack B1",
  "Rack B2",
  "Rack c1",
  "Rack C2",
];

const models: Record<string, string[]> = {
  Dell: ["PowerEdge R740", "PowerEdge R640", "PowerConnect 5548"],
  Cisco: ["Catalyst 9300", "ASR 1001", "Nexus 9000"],
  HP: ["ProLiant DL380", "ProLiant DL360", "FlexFabric 5700"],
  APC: ["Smart-UPS 3000", "Smart-UPS 1500", "Symmetra LX"],
  Juniper: ["EX4300", "SRX345", "QFX5100"],
};

let inserted = 0;
let skipped = 0;

for (let i = 1; i <= 55; i++) {
  const make = makes[i % makes.length];
  const model = models[make][i % models[make].length];
  const type = types[i % types.length];
  const location = locations[i % locations.length];
  const status = statuses[i % statuses.length];
  const tag = `ASSET-${model} #${i}`;

  const result = await pool.query(
    `
      INSERT INTO equipment (name, type,make, model, tag, location, status) 
      VALUES ($1, $2, $3, $4, $5, %6, %7)
      ON CONFLICT (tag) DO NOTHING
    `,
    [name, type, make, model, tag, location, status],
  );

  if (result.rowCount === 1) {
    inserted++;
  } else {
    skipped++;
  }

  console.log(
    `Done - ${inserted} inserted, ${skipped} skipped (already existed)`,
  );
  pool.end();
}

seed().catch((err: Error) => {
  console.log("Seed failed: ", err.message);
  process.exit(1);
});
