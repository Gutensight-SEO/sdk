export interface NavigationItem {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  dropdownItems?: NavigationItem[];
}