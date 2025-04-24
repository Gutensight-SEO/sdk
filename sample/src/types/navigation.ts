export interface NavigationItem {
  id: string;
  title: string;
  path?: string;
  icon?: React.ReactNode;
  dropdownItems?: NavigationItem[];
}
