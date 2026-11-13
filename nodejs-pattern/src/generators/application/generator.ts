import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  Tree,
} from '@nx/devkit';
import * as path from 'node:path';
import { ApplicationGeneratorSchema } from './schema';

export default async function applicationGenerator(
  tree: Tree,
  options: ApplicationGeneratorSchema,
): Promise<void> {
  const projectName = names(options.name).fileName;
  const projectRoot = joinPathFragments('apps', projectName);

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    projectRoot,
    { projectName, template: '' },
  );

  addProjectConfiguration(tree, projectName, {
    root: projectRoot,
    sourceRoot: joinPathFragments(projectRoot, 'src'),
    projectType: 'application',
    targets: {
      build: {
        executor: 'nx:run-commands',
        outputs: [`{projectRoot}/dist`],
        options: {
          command: 'npm run build',
          cwd: projectRoot,
        },
      },
      serve: {
        executor: 'nx:run-commands',
        dependsOn: ['build'],
        options: {
          command: 'npm start',
          cwd: projectRoot,
        },
      },
    },
  });

  await formatFiles(tree);
}
