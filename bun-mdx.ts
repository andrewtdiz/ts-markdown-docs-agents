import fs from 'node:fs/promises';
import path from 'node:path';

const inputDir = path.resolve('content');
const outputDir = path.resolve('src/content');

await fs.mkdir(outputDir, { recursive: true });

for (const file of await fs.readdir(inputDir)) {
  if (!file.endsWith('.md')) continue;

  const raw = await fs.readFile(path.join(inputDir, file), 'utf8');
  const ts = `const markdown = ${JSON.stringify(raw)};\nexport default markdown;\n`;
  const outFile = path.join(outputDir, file.replace(/\.md$/, '.ts'));
  await fs.writeFile(outFile, ts, 'utf8');

  console.log(`✓ ${file} → ${outFile}`);
}