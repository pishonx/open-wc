import { Visitor } from '@babel/core';
import { File } from '@babel/types';

export interface MarkdownResult {
  html: string;
  jsAst: File;
  stories: Story[];
}

export interface Story {
  key: string;
  name: string;
  codeAst: File;
  displayedCode: string;
}

export type MarkdownToMdxVisitor = Visitor<{
  opts: { jsAst: File; stories: Story[] };
}>;
