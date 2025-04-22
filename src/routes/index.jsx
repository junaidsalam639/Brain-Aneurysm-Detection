import React, { Suspense } from "react";
import { Routes, Route } from "react-router";

const HomePage = React.lazy(() => import("../pages/home/HomePage"));
const ContactPage = React.lazy(() => import("../pages/contact/ContactPage"));
const LoginPage = React.lazy(() => import("../pages/auth/LoginPage"));
const SignupPage = React.lazy(() => import("../pages/auth/SingnupPage"));
const Dashboard = React.lazy(() => import("../pages/dashboard/Dashboard"));

const routeConfig = [
    { path: "/", component: HomePage },
    { path: "/contact", component: ContactPage },
    { path: "/login", component: LoginPage },
    { path: "/signup", component: SignupPage },
    { path: "/dashboard", component: Dashboard },
];

const AppRoutes = () => {
    return (
        <Suspense fallback={<>loading...</>}>
            <Routes>
                {routeConfig?.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={<route.component />}
                    />
                ))}
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;


