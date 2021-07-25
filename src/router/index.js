import {createRouter, createWebHistory} from 'vue-router';

import Main from '@/modules/main/main.vue';
import Login from '@/modules/login/login.vue';
import Register from '@/modules/register/register.vue';

import Dashboard from '@/pages/dashboard/dashboard.vue';
import EditorTemplate from '@/pages/editorTemplate/editorTemplate.vue';
import DataTable from "@/pages/dataTable/dataTable.vue";
import CreateGroup from "@/pages/createGroup/createGroup.vue"
import Profile from '@/pages/profile/profile.vue';
import ForgotPassword from '@/modules/forgot-password/forgot-password.vue';

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        children: [
            {
                path: '',
                name: 'CreateGroup',
                component: CreateGroup
            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: 'profile',
                name: 'Profile',
                component: Profile
            },
            {
                path: 'editorTemplate',
                name: 'EditorTemplate',
                component : EditorTemplate
            },
            {
                path: 'dataTable',
                name: 'DataTable',
                component : DataTable
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;

