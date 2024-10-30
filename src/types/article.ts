export type ArticleMeta = {
  link: `/${string}`;
  order: number;
  title: string;
  depth: number;
  children: ArticleMeta[];
};
