declare type NotesView = 'timeline' | 'tags' | 'category';

declare interface MarkdownMeta {
  link: string;
  date: string;
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  cover?: string[];
  draft?: boolean;
  lastUpdateTime?: string;
}

declare type MarkdownMetaArr = Array<MarkdownMeta>;
declare type MarkdownMetaOrderArr = Array<{
  label: string;
  items: MarkdownMetaArr;
}>;
