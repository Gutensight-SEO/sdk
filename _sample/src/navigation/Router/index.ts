import { createElement, lazy } from "react";
import { RouteObject } from "react-router-dom";
import { Loadable } from "../../globals/index.ts";
import ActiveSubscriptions from "@/pages/Dashboard/Subscription/ActiveSubscriptions/index.tsx";
import ProtectedRoute from '@/components/ProtectedRoute';

// Layouts
const SessionLayout = Loadable(lazy(() => import("../../layouts/session/index.tsx")));
const DashboardLayout = Loadable(lazy(() => import("../../layouts/dashboard/index.tsx")));
const LandingPageLayout = Loadable(lazy(() => import("../../layouts/landingPage/index.tsx")));

// Landing
const Welcome = Loadable(lazy(() => import("@/pages/Landing/Welcome/index.tsx")));
const About = Loadable(lazy(() => import("@/pages/Landing/About/index.tsx")));
const Contact = Loadable(lazy(() => import("@/pages/Landing/Contact/index.tsx")));
const Documentation = Loadable(lazy(() => import("@/pages/Landing/Documentation/index.tsx")));

// Auth
const LoginPage = Loadable(lazy(() => import("../../pages/Authentication/Login/index.tsx")));
const RegisterPage = Loadable(lazy(() => import("../../pages/Authentication/Register/index.tsx")));

// Dashboard
const DashboardHome = Loadable(lazy(() => import("../../pages/Dashboard/Home/index.tsx")));
const ProfilePage = Loadable(lazy(() => import("../../pages/Dashboard/Profile/index.tsx")));
const UpdateProfilePage = Loadable(lazy(() => import("../../pages/Dashboard/Settings/UpdateProfile/index.tsx")));
const SubscriptionListPage = Loadable(lazy(() => import("../../pages/Dashboard/Subscription/SubscriptionList/index.tsx")));
const ApiKeysPage = Loadable(lazy(() => import("../../pages/Dashboard/Subscription/ApiKeys/index.tsx")));
// const PaymentPage = Loadable(lazy(() => import("../../pages/Dashboard/Subscription/Payment/index.tsx")));

type RouteObjectWithSEO = RouteObject & {
  seoExclude?: boolean;
  children?: RouteObjectWithSEO[];
};

const router: RouteObjectWithSEO[] = [
  {
    path: "/",
    // seoExclude: true,
    element: createElement(LandingPageLayout),
    children: [
      {
        path: "",
        element: createElement(Welcome)
      },
      {
        path: "about",
        element: createElement(About)
      },
      {
        path: "contact",
        element: createElement(Contact)
      },
      {
        path: "v1/documentation",
        element: createElement(Documentation)
      },
    ]
  },
  {
    path: "session",
    // seoExclude: true,
    element: createElement(SessionLayout),
    children: [
      {
        path: "login",
        element: createElement(LoginPage)
      },
      {
        path: "register",
        element: createElement(RegisterPage)
      }
    ]
  },
  {
    path: "dashboard",
    // seoExclude: true,
    element: createElement(ProtectedRoute, {
      children: createElement(DashboardLayout)
    }),
    children: [
      {
        path: "",
        element: createElement(DashboardHome)
      },
      {
        path: "profile",
        element: createElement(ProfilePage)
      },
      {
          path: "setting",
          // element: ,
          children: [
              {
                  path: "update-profile",
                  element: createElement(UpdateProfilePage)
              },
              // {
              //     path: "payment",
              //     element: createElement(PaymentPage)
              // }
          ]
      },
      {
        path: "subscription",
        children: [
          {
            path: "list",
            element: createElement(SubscriptionListPage)
          },
          {
            path: "active",
            element: createElement(ActiveSubscriptions)
          },
          {
            path: "api-keys",
            element: createElement(ApiKeysPage)
          },
          // {
          //   path: "payment",
          //   element: createElement(PaymentPage)
          // }
        ]
      }
    ]
  }
];

export default router;