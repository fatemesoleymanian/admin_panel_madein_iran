import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Tables from "@/views/Tables.vue";
import Billing from "@/views/Billing.vue";
import VirtualReality from "@/views/VirtualReality.vue";
import Profile from "@/views/Profile.vue";
import Rtl from "@/views/Rtl.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
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
    path: "/users",
    name: "کاربران",
    component: Users,
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
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/rtl-page",
    name: "Rtl",
    component: Rtl,
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
