export interface NavigationItem {
    title: string;
    path: string;
    icon: string;
    children?: NavigationItem[];  
}