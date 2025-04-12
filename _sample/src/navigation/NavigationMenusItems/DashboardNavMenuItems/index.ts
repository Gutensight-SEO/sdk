import { NavigationItem } from './types.ts';

export const dashboardNavItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'dashboard'
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    icon: 'person'
  },
  {
    title: 'Settings',
    path: '#',
    icon: 'settings',
    dropdownItems: [
      {
        title: 'Update Profile',
        path: '/dashboard/setting/update-profile'
      },
    ]
  },
  {
    title: 'Subscriptions',
    path: '#',
    icon: 'subscription',
    dropdownItems: [
      {
        title: 'Choose a Plan',
        path: '/dashboard/subscription/list'
      },
      {
        title: 'Active Subscriptions',
        path: '/dashboard/subscription/active'
      },
      // {
      //   title: 'Payment',
      //   path: '/dashboard/subscription/payment'
      // },
    ]
  },
];
