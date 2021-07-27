import {createRouter, createWebHistory} from 'vue-router';

import Main from '@/modules/main/main.vue';
import Login from '@/modules/login/login.vue';
import Register from '@/modules/register/register.vue';

import CreateGroupUsers from '@/pages/createGroupUsers/createGroupUsers.vue';
import CreateTemplate from '@/pages/createTemplate/createTemplate.vue';
import EditGroupUsers from "@/pages/editGroupUsers/editGroupUsers.vue";
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
                path: 'createGroupUsers',
                name: 'CreateGroupUsers',
                component: CreateGroupUsers
            },
            {
                path: 'profile',
                name: 'Profile',
                component: Profile
            },
            {
                path: 'createTemplate',
                name: 'CreateTemplate',
                component : CreateTemplate
            },
            {
                path: 'editGroupUsers',
                name: 'EditGroupUsers',
                component : EditGroupUsers
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

