import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const rootDir = process.cwd();
const envLocalPath = path.join(rootDir, ".env.local");

if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
}

console.log("====================================================");
console.log(" Milestone 0: Setup & Health Verification Script   ");
console.log("====================================================\n");

let passed = 0;
let warnings = 0;
let failed = 0;

function check(title, fn) {
  try {
    const res = fn();
    if (res === "warn") {
      warnings++;
      console.log(`⚠️  ${title}`);
    } else {
      passed++;
      console.log(`✅  ${title}`);
    }
  } catch (err) {
    failed++;
    console.log(`❌  ${title}`);
    console.log(`    Error: ${err.message}`);
  }
}

// 1. Tool checks
console.log("1. Development Tools Check:");
check("Node.js LTS installed (current: " + process.version + ")", () => {
  const major = parseInt(process.version.replace("v", "").split(".")[0], 10);
  if (major < 20) throw new Error("Node.js >= 20 required");
});

check("Git installed", () => {
  const gitVer = execSync("git --version", { encoding: "utf-8" }).trim();
  console.log(`    (${gitVer})`);
});

check("Docker Desktop (required for Milestone 4 grading runner)", () => {
  try {
    execSync("docker --version", { stdio: "ignore" });
    return "ok";
  } catch {
    console.log("    Notice: Docker is not currently installed on this Mac.");
    console.log("    Docker is needed in Milestone 4 for sandboxed grading containers.");
    return "warn";
  }
});

// 2. Git & Repo Layout
console.log("\n2. Repository & Repo Structure:");
check("Git repository initialized & remote configured", () => {
  const remote = execSync("git remote -v", { encoding: "utf-8" });
  if (!remote.includes("github.com")) throw new Error("No git remote detected");
});

check("README.md exists with stack and working rules", () => {
  if (!fs.existsSync(path.join(rootDir, "README.md"))) throw new Error("README.md missing");
});

check("DECISIONS.md exists with architectural trade-offs", () => {
  if (!fs.existsSync(path.join(rootDir, "DECISIONS.md"))) throw new Error("DECISIONS.md missing");
});

// 3. Next.js & UI Kit
console.log("\n3. Next.js & UI Components:");
check("App Router and page layout intact", () => {
  if (!fs.existsSync(path.join(rootDir, "app/page.tsx"))) throw new Error("app/page.tsx missing");
  if (!fs.existsSync(path.join(rootDir, "app/layout.tsx"))) throw new Error("app/layout.tsx missing");
});

check("shadcn/ui Button component configured", () => {
  if (!fs.existsSync(path.join(rootDir, "components.json"))) throw new Error("components.json missing");
  if (!fs.existsSync(path.join(rootDir, "components/ui/button.tsx"))) throw new Error("Button component missing");
});

// 4. Problem Template Layout
console.log("\n4. Problem Template Layout:");
check("problems/stale-timer/ directory structure (problem.md, starter, reference, tests)", () => {
  const base = path.join(rootDir, "problems/stale-timer");
  if (!fs.existsSync(path.join(base, "problem.md"))) throw new Error("problem.md missing");
  if (!fs.existsSync(path.join(base, "starter/App.js"))) throw new Error("starter/App.js missing");
  if (!fs.existsSync(path.join(base, "reference/App.js"))) throw new Error("reference/App.js missing");
  if (!fs.existsSync(path.join(base, "tests"))) throw new Error("tests/ folder missing");
});

// 5. Database & API Route
console.log("\n5. Database Migration & Health Endpoint:");
check("db/migrations/000_health.sql exists", () => {
  if (!fs.existsSync(path.join(rootDir, "db/migrations/000_health.sql"))) throw new Error("Migration SQL missing");
});

check("app/api/health/route.ts route handler exists", () => {
  if (!fs.existsSync(path.join(rootDir, "app/api/health/route.ts"))) throw new Error("Health route handler missing");
});

check("Supabase credentials in .env.local", () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  }
  if (url.includes("YOUR_PROJECT") || key.includes("your-service-role-key")) {
    console.log("    Notice: .env.local contains template placeholder values.");
    console.log("    To connect to a live database:");
    console.log("      1. Create a project at https://supabase.com");
    console.log("      2. Copy Project URL and service_role key to .env.local");
    console.log("      3. Run db/migrations/000_health.sql in Supabase SQL Editor");
    return "warn";
  }
  return "ok";
});

console.log("\n----------------------------------------------------");
console.log(`Results: ${passed} Passed | ${warnings} Warnings | ${failed} Failed`);
console.log("----------------------------------------------------\n");
