import { createRouter, createWebHistory } from "vue-router";
import MainHome from "@/views/pages/home/MainHome.vue";
import CourseIndex from "@/views/pages/schooling/CourseIndex.vue";
import AdminIndex from "@/views/pages/admins/AdminIndex.vue";
import LearnMoreIndex from "@/views/pages/learnmore/LearnMore.vue";
import DestinationManager from "@/components/DestinationManager.vue";
import AccommodationManager from "@/components/AccommodationManager.vue";
import Login from "@/views/pages/auth/Login.vue";
import Settings from "@/components/Settings.vue";


const routes = [
    {
        path:'/',
        component:MainHome
    },
    {
        path:'/IATA',
        component:CourseIndex
    }
    ,
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
            {path:"settings",component:Settings}
        ]
    },
    {
        path:'/login',
        component:Login
    }
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