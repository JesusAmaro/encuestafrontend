import CreatePoll from "../pages/CreatePoll";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ReplyPoll from "../pages/ReplyPoll";
import User from "../pages/User";
import { Route } from "../types";

const routes: Route[] = [
    {
        path: '/',
        component: Login,
        routeType: "GUEST"
    },
    {
        path: '/login',
        component: Login,
        routeType: "GUEST"
    },
    {
        path: '/register',
        component: Register,
        routeType: "GUEST"
    },
    {
        path: '/user',
        component: User,
        routeType: "PRIVATE"
    },
    {
        path: '/createPoll',
        component: CreatePoll,
        routeType: "PRIVATE"
    },
    {
        path: '/replypoll/:id',
        component: ReplyPoll,
        routeType: "PUBLIC"
    },
];

export default routes;