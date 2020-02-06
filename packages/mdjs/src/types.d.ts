import { File } from '@babel/types';
import { Node } from 'commonmark';

export interface MarkdownResult {
  mdAst?: Node;
  html?: string;
  jsCode?: string;
  jsAst?: File;
  stories?: Story[];
}

export interface Story {
  key: string;
  name: string;
  codeAst: File;
  codeString: string,
  displayedCode: string;
}
