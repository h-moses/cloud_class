import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import CourseIntroduction from "../views/CourseIntroduction";
import CourseLearning from "../views/CourseLearning";
import ContentComponent from "../components/ContentComponent";
import VideoComponent from "../components/VideoComponent";
import ExamComponent from "../components/ExamComponent";
import UserInfoView from "../views/UserInfo";
import QuizComponent from "../components/QuizComponent";
import CommunicationCommunity from "../views/CommunicationCommunity";

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
    path: '/user',
    name: 'UserInfoView',
    component: UserInfoView
  },
  {
    path: '/community',
    name: 'CommunicationCommunity',
    component: CommunicationCommunity
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
        path: 'testlist',
        name: 'ExamComponent',
        component: ExamComponent
      },
      {
        path: 'quiz',
        name: 'QuizComponent',
        component: QuizComponent
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
