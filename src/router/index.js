import { createRouter, createWebHistory } from 'vue-router';

import Main from '@/modules/main/main.vue';
import Login from '@/modules/login/login.vue';
import Register from '@/modules/register/register.vue';

import CreateGroupPage from "@/pages/CreateGroupPage.vue"
import CreateGroupUsersPage from '@/pages/CreateGroupUsersPage.vue';
import CreateMeetingPage from "@/pages/CreateMeetingPage.vue";
import CreateMeetingTemplatePage from '@/pages/CreateMeetingTemplatePage.vue';
import EditMeetingTemplatePage from "@/pages/EditMeetingTemplatePage.vue";
import EditGroupUsersPage from "@/pages/EditGroupUsersPage.vue";
import Profile from '@/pages/profile/profile.vue';
import ForgotPassword from '@/modules/forgot-password/forgot-password.vue';

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        children: [
            {
                path: 'createGroup',
                name: 'CreateGroupPage',
                component: CreateGroupPage
            },
            {
                path: 'createGroupUsers',
                name: 'CreateGroupUsersPage',
                component: CreateGroupUsersPage
            },
            {
                path: 'createMeeting',
                name: 'CreateMeetingPage',
                component: CreateMeetingPage
            },
            {
                path: 'createMeetingTemplate',
                name: 'CreateMeetingTemplatePage',
                component: CreateMeetingTemplatePage
            },
            {
                path: 'editGroupUsers',
                name: 'EditGroupUsersPage',
                component: EditGroupUsersPage
            },
            {
                path: 'editMeetingTemplate',
                name: 'EditMeetingTemplatePage',
                component: EditMeetingTemplatePage
            },
            {
                path: 'profile',
                name: 'Profile',
                component: Profile
            },
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

