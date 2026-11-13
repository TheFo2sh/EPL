import { readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { describe, expect, it } from 'vitest';
import applicationGenerator from './generator';

describe('application generator', () => {
  it('generates a TypeScript Node.js app with a Hello World page', async () => {
    const tree = createTreeWithEmptyWorkspace();

    await applicationGenerator(tree, { name: 'hello-world' });

    const project = readProjectConfiguration(tree, 'hello-world');
    expect(project.root).toBe('apps/hello-world');
    expect(project.targets?.build?.options).toMatchObject({
      command: 'npm run build',
      cwd: 'apps/hello-world',
    });
    expect(project.targets?.serve?.options).toMatchObject({
      command: 'npm start',
      cwd: 'apps/hello-world',
    });
    expect(tree.read('apps/hello-world/package.json', 'utf-8')).toContain(
      '"typescript"',
    );
    expect(tree.read('apps/hello-world/src/pages/index.ts', 'utf-8')).toContain(
      '<h1>Hello, world!</h1>',
    );
    expect(tree.read('apps/hello-world/src/server.ts', 'utf-8')).toContain(
      "import { homePage } from './pages/index.js';",
    );
  });
});
