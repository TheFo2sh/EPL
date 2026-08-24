import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  readProjectConfiguration,
  Tree,
} from '@nx/devkit';
import * as path from 'node:path';
import { UsecaseGeneratorSchema } from './schema';

export default async function usecaseGenerator(
  tree: Tree,
  options: UsecaseGeneratorSchema,
): Promise<void> {
  const project = readProjectConfiguration(tree, options.project);
  const usecaseNames = names(options.name);
  const directory = options.directory ?? 'Features';
  const className = usecaseNames.className;
  const featureNamespace = [
    names(options.project).className,
    ...directory.split(/[\\/]/).filter(Boolean).map((part) => names(part).className),
    className,
  ].join('.');
  const targetDirectory = joinPathFragments(project.root, directory, className);

  generateFiles(tree, path.join(__dirname, 'files'), targetDirectory, {
    className,
    method: options.method ?? 'Post',
    namespace: options.namespace ?? featureNamespace,
    route: options.route ?? `/api/${usecaseNames.fileName}`,
    template: '',
  });

  await formatFiles(tree);
}