import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CourseIntroduction from "../views/CourseIntroduction";
import CourseLearning from "../views/CourseLearning";
import AnnounceComponent from "../components/AnnounceComponent";
import ContentComponent from "../components/ContentComponent";
import VideoComponent from "../components/VideoComponent";
import ForumIndexComponent from "../components/ForumIndexComponent";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/introduction',
    name: 'CourseIntroduction',
    component: CourseIntroduction
  },
  {
    path: '/learn',
    component: CourseLearning,
    children: [
      {
        path: '',
        name: 'CourseLearning',
        redirect: 'content'
      },
      {
        path: 'announce',
        name: 'AnnounceComponent',
        component: AnnounceComponent
      },
      {
        path: 'content',
        name: 'ContentComponent',
        component: ContentComponent
      },
      {
        path: 'video',
        name: 'VideoComponent',
        component: VideoComponent
      },
      {
        path: 'forumindex',
        name: 'ForumIndexComponent',
        component: ForumIndexComponent
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
