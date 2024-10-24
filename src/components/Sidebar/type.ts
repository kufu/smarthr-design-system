export type SidebarItem = {
  link: `/${string}`;
  order: number;
  title: string;
  depth: number;
  children: SidebarItem[];
};
