import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Profile from "@/views/Profile.vue";
import SignIn from "@/views/SignIn.vue";
import Products from "@/views/Products.vue";
import Users from "@/views/Users.vue";
import Orders from "@/views/Orders.vue";
import UserDetails from "../views/UserDetails";
import OrderDetails from "../views/OrderDetails";
import ProductDetails from "../views/ProductDetails";
import AddProduct from "../views/AddProduct";
import Sliders from "../views/Sliders";
import Comments from "../views/Comments";
import FAQs from "../views/FAQs";
import Testimonial from "../views/Testimonial";
import Forms from "../views/Forms";
import Departments from "../views/Departments";
import Tags from "../views/Tags";
import Categories from "../views/Categories";
import Blogs from "../views/Blogs";
import AddPost from "../views/AddPost";
import PostDetails from "../views/PostDetails";
import Admins from "../views/Admins";
import Roles from "../views/Roles";
import Transactions from "../views/Transactions";
import Newsletters from "../views/Newsletters";
import Customers from "../views/Customers";
import Campaigns from "../views/Campaigns";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/products",
    name: "محصولات",
    component: Products,
  },
  {
    path: "/posts",
    name: "پست ها",
    component: Blogs,
  },
  {
    path: "/departments",
    name: "دپارتمان ها",
    component: Departments,
  },
  {
    path: "/categories",
    name: "دسته بندی ها",
    component: Categories,
  },
  {
    path: "/tags",
    name: "تگ ها",
    component: Tags,
  },
  {
    path: "/product/new",
    name: "افزودن محصول جدید",
    component: AddProduct,
  },
  {
    path: "/product/details:id",
    name: "مشخصات محصول",
    component: ProductDetails,
  },
  {
    path: "/post/new",
    name: "افزودن پست جدید",
    component: AddPost,
  },
  {
    path: "/post/details:id",
    name: "جزئیات پست",
    component: PostDetails,
  },
  {
    path: "/users",
    name: "کاربران",
    component: Users,
  },
  {
    path: "/customers",
    name: "مشتریان",
    component: Customers,
  },
  {
    path: "/users/details:id",
    name: "جزئیات اطلاعات کاربر",
    component: UserDetails,
  },
  {
    path: "/slider",
    name: "اسلایدر",
    component: Sliders,
  },
  {
    path: "/orders/details:order",
    name: "جزئیات سفارش کاربر",
    component: OrderDetails,
  },
  {
    path: "/products/comments",
    name: "دیدگاه های محصولات",
    component: Comments,
  },
  {
    path: "/faqs",
    name: "پرسش های متداول",
    component: FAQs,
  },
  {
    path: "/opinions",
    name: "نظرات مشتریان",
    component: Testimonial,
  },
  {
    path: "/forms",
    name: "فرم ها",
    component: Forms,
  },
  {
    path: "/newsletters",
    name: "خبرنامه",
    component: Newsletters,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
  {
    path: "/profile",
    name: "پروفایل",
    component: Profile,
  },
  {
    path: "/admins",
    name: "ادمین ها",
    component: Admins,
  },
  {
    path: "/roles",
    name: "نقش ها",
    component: Roles,
  },
  {
    path: "/transactions",
    name: "تراکنش ها",
    component: Transactions,
  },
  {
    path: "/campaigns",
    name: "کمپین ها",
    component: Campaigns,
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});
// router.beforeEach((to, from, next) => {
//   if ( !localStorage.getItem('vqmgp')) {
//     next({ name : 'Sign In'});
//   }
// });
export default router;
