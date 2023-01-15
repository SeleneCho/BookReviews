import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AllPosts from "../views/posts/AllPosts.vue";
import CreatePost from "../views/posts/CreatePost.vue";
import PostDetails from "../views/posts/PostDetails.vue";
import UserPosts from "../views/posts/UserPosts.vue";
import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";
import PostUpdate from "../views/posts/PostUpdate.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/posts",
    name: "AllPosts",
    component: AllPosts,
  },
  {
    path: "/create",
    name: "CreatePost",
    component: CreatePost,
  },
  {
    path: "/posts/:id",
    name: "PostDetails",
    component: PostDetails,
    props: true,
  },
  {
    path: "/posts/update/:id",
    name: "PostUpdate",
    component: PostUpdate,
    props: true,
  },
  {
    path: "/posts/user",
    name: "UserPosts",
    component: UserPosts,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
