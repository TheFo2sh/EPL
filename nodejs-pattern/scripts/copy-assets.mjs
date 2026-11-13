import { cp, mkdir } from 'node:fs/promises';

const source = new URL('../src/generators/application/files', import.meta.url);
const destination = new URL('../dist/generators/application/files', import.meta.url);

await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });
