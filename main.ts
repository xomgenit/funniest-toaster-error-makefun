import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const errorMessage =
  "Toast ejected. It has chosen a new life on the floor. I will not be retrieving it.";

async function main(): Promise<void> {
  // Gate: the scorer wants UTF-8 text of 1 to 120 characters, one line.
  if (
    errorMessage.length < 1 ||
    errorMessage.length > 120 ||
    errorMessage.includes("\n")
  ) {
    throw new Error(
      `entry must be a single line of 1-120 characters, got ${errorMessage.length}`,
    );
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "entry.txt"), errorMessage, "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
