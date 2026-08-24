import { cp, mkdir } from 'node:fs/promises';

const source = new URL('../src/generators/usecase/files', import.meta.url);
const destination = new URL('../dist/generators/usecase/files', import.meta.url);

await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });