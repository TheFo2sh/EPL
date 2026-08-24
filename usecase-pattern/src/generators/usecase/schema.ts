export interface UsecaseGeneratorSchema {
  name: string;
  project: string;
  namespace?: string;
  directory?: string;
  route?: string;
  method?: 'Delete' | 'Get' | 'Patch' | 'Post' | 'Put';
}