import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import AddAdapter from "../pages/dashboard/AdapterPage/AddAdapter";
import EditAdapter from "../pages/dashboard/AdapterPage/EditAdapter";
import AddModel from "../pages/dashboard/ModelPage/AddModel";
import EditModel from "../pages/dashboard/ModelPage/EditModel";
import AddEnforcer from "../pages/dashboard/EnforcerPage/AddEnforcer";
import EditEnforcer from "../pages/dashboard/EnforcerPage/EditEnforcer";
import Home from "../pages/dashboard/Home";
import Policy from "../pages/dashboard/Policy";
import AddPolicyList from "../pages/dashboard/AddPolicyList";
import EditPolicyList from "../pages/dashboard/EditPolicyList";

export const mainRoutes = [{
    path: '/login',
    component: Login
},{
    path: "/404",
    component: PageNotFound
}]

export const dashboardRoutes = [{
    path: "/dashboard/home", 
    component: Home,
    isShow: true,
    title: "Home"
},{
    path: "/dashboard/adapters/add", 
    component: AddAdapter,
    isShow: false,
    title: "Add Adapter",
},{
    path: "/dashboard/adapters/edit/:id", 
    component: EditAdapter,
    isShow: false,
    title: "Edit Adapter",
},{
    path: "/dashboard/models/add", 
    component: AddModel,
    isShow: false,
    title: "Add Model",
},{
    path: "/dashboard/models/edit/:id", 
    component: EditModel,
    isShow: false,
    title: "Edit Model",
},{
    path: "/dashboard/enforcers/add", 
    component: AddEnforcer,
    isShow: false,
    title: "Add Enforcer",
},{
    path: "/dashboard/enforcers/edit/:id", 
    component: EditEnforcer,
    isShow: false,
    title: "Edit Enforcer",
},{
    path: "/dashboard/Policy", 
    component: Policy,
    isShow: true,
    title: "Policy",
},{
    path: "/dashboard/policyList/add", 
    component: AddPolicyList,
    isShow: false,
    title: "Add PolicyList",
},{
    path: "/dashboard/policyList/edit/:id", 
    component: EditPolicyList,
    isShow: false,
    title: "Edit PolicyList",
}]