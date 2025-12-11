import { createRouter, createWebHistory } from "vue-router";
import MainHome from "@/views/pages/home/MainHome.vue";
import CourseIndex from "@/views/pages/schooling/CourseIndex.vue";
import AdminIndex from "@/views/pages/admins/AdminIndex.vue";
import LearnMoreIndex from "@/views/pages/learnmore/LearnMore.vue";
import DestinationManager from "@/components/DestinationManager.vue";
import FlightsIndex from "@/views/pages/flights/FlightsIndex.vue";
import AccommodationManager from "@/components/AccommodationManager.vue";
import FlightsManager from "@/components/FlightsManager.vue";

import Login from "@/views/pages/auth/Login.vue";
import Settings from "@/components/Settings.vue";
import SearchFlights from "@/views/pages/flights/SearchFlights.vue";
import PreviewFlights from "@/views/pages/flights/PreviewFlights.vue";
import FlightsPayments from "@/views/pages/flights/FlightsPayments.vue";
import GenericGoogle from "@/views/pages/auth/GenericGoogle.vue";
import AuthCallback from "@/views/pages/auth/AuthCallback.vue";
import UserDashboard from "@/views/pages/dashboards/UserDashboard.vue";
import UserFlights from "@/views/pages/dashboards/UserFlights.vue";
import UserProfile from "@/views/pages/dashboards/UserProfile.vue";
import UserIndex from "@/views/pages/dashboards/UserIndex.vue";


const routes = [
    {
        path:'/',
        component:MainHome
    },
    {
        path:'/IATA',
        component:CourseIndex
    }
    ,{
        path:'/dashboard',
        component:UserIndex,
        children:[
            {path:'',redirect:'/dashboard/main'},
            {path:'main',component:UserDashboard},
            {path:'flights',component:UserFlights},
            {path:'profile',component:UserProfile}
        ]
    }
    ,
    
    {
        path:'/bookflight',
        component:FlightsIndex,
        children:[
            {path:'',redirect:'/bookflight/searchflight'},
            {path:'searchflight', component:SearchFlights},
            {path:'previewflight', component:PreviewFlights},
            {path:'payment', component:FlightsPayments}
        ]

    },
     {
        path:'/learnmore',
        component:LearnMoreIndex
    }
    ,
    {
        path:'/super-admin',
        component:AdminIndex,
        children:[
            {path:'/super-admin',redirect:'/super-admin/destinations'},
            {path:"destinations",component:DestinationManager},
            {path:"accommodations",component:AccommodationManager},
            {path:"flightsAdd",component:FlightsManager},
            {path:"settings",component:Settings}
        ]
    },
    {
        path:'/adminlogin',
        component:Login
    },
    {
        path:'/login',
        component:GenericGoogle
    },
    {
      path: '/auth/callback', // Must match the successURL from your Go handler
      name: 'auth-callback',
      component: AuthCallback
    },
]

export const router = createRouter({
    history:createWebHistory(),
    linkActiveClass:"active",
    routes
})

router.beforeEach((to,from,next)=>{
    //scroll to the top of the page
    window.scrollTo({top:0, behaviour: "smooth"})

    next()
})