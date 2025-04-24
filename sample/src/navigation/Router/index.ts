import { createElement, lazy } from "react";
import { RouteObject } from "react-router-dom";
import { Loadable } from "../../globals";
import ActiveSubscriptions from "@/pages/Dashboard/Subscription/ActiveSubscriptions";
import ProtectedRoute from '@/components/ProtectedRoute';
// import Welcome from ";

// Layouts
const SessionLayout = Loadable(lazy(() => import("../../layouts/session")));
const DashboardLayout = Loadable(lazy(() => import("../../layouts/dashboard")));
const LandingPageLayout = Loadable(lazy(() => import("../../layouts/landingPage")));

// Landing
const Welcome = Loadable(lazy(() => import("@/pages/Landing/Welcome")));
const About = Loadable(lazy(() => import("@/pages/Landing/About")));
const Contact = Loadable(lazy(() => import("@/pages/Landing/Contact")));
const Documentation = Loadable(lazy(() => import("@/pages/Landing/Documentation")));

// Auth
const LoginPage = Loadable(lazy(() => import("../../pages/Authentication/Login")));
const RegisterPage = Loadable(lazy(() => import("../../pages/Authentication/Register")));

// Dashboard
const DashboardHome = Loadable(lazy(() => import("../../pages/Dashboard/Home")));
const ProfilePage = Loadable(lazy(() => import("../../pages/Dashboard/Profile")));
const UpdateProfilePage = Loadable(lazy(() => import("../../pages/Dashboard/Settings/UpdateProfile")));
const SubscriptionListPage = Loadable(lazy(() => import("../../pages/Dashboard/Subscription/SubscriptionList")));
const ApiKeysPage = Loadable(lazy(() => import("../../pages/Dashboard/Subscription/ApiKeys")));
// const PaymentPage = Loadable(lazy(() => import("../../pages/Dashboard/Subscription/Payment")));

const router: RouteObject[] = [
  {
    path: "/",
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
        path: "/v1/documentation",
        element: createElement(Documentation)
      },
    ]
  },
  {
    path: "session",
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