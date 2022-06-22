<template>
  <div
    class="w-auto h-auto collapse navbar-collapse  h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse navText="داشبورد" :to="{ name: 'Dashboard' }">
          <template #icon>
            <i class="bi bi-house-fill" style="color: #3A416F;font-size: 17px;"></i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" v-for="(item,i) in items" :key="i">
        <sidenav-collapse
            :navText="item.title"
            :to="{ name: item.route }"
        >
          <template #icon>
          <i :class="item.icon" style="color: #3A416F;font-size: 17px;"></i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="پروفایل" :to="{ name: 'پروفایل' }">
          <template #icon>
            <i class="bi bi-person-bounding-box" style="color: #3A416F;font-size: 17px;"></i>
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>

</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "کنترل پنل ساخت ایران",
      controls: "داشبورد",
      isActive: "فعال",
      permission:[],
      items:[
        {
          title:'کاربران',
          route:'کاربران',
          icon:'bi bi-people-fill',
        },
        {
          title:'محصولات',
          route:'محصولات',
          icon:'bi bi-basket-fill',
        },
        {
          title:'وبلاگ',
          route:'پست ها',
          icon:'bi bi-file-richtext-fill',
        },
        {
          title:'اسلایدر',
          route:'اسلایدر',
          icon:'bi bi-file-easel-fill',
        },
        {
          title:'دیدگاه ها',
          route:'دیدگاه های محصولات',
          icon:'bi bi-chat-text-fill',
        },
        {
          title:'پرسش های متداول',
          route:'پرسش های متداول',
          icon:'bi bi-patch-question-fill',
        },
        {
          title:'نظرات مشتریان',
          route:'نظرات مشتریان',
          icon:'bi bi-chat-right-quote-fill',
        },
        {
          title:'فرم ها',
          route:'فرم ها',
          icon:'bi bi-file-text-fill',
        },
        {
          title:'دپارتمان ها',
          route:'دپارتمان ها',
          icon:'bi bi-diagram-3-fill',
        },
        {
          title:'دسته بندی ها',
          route:'دسته بندی ها',
          icon:'bi bi-inboxes-fill',
        },
        {
          title:'تگ ها',
          route:'تگ ها',
          icon:'bi bi-tags-fill',
        },
        {
          title:'سفارشات',
          route:'Orders',
          icon:'bi bi-receipt-cutoff',
        },
        {
          title:'اعضا پنل کنترل',
          route:'ادمین ها',
          icon:'bi bi-person-circle',
        },
        {
          title:'نقش ها',
          route:'نقش ها',
          icon:'bi bi-signpost-split-fill',
        },
        {
          title:'تراکنش ها',
          route:'تراکنش ها',
          icon:'bi bi-credit-card-fill',
        },

      ]
    };
  },
  components: {
    SidenavCollapse,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
  mounted() {
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions)
    {
      if (permissions[i].read === 1) this.permission.push(permissions[i].module.name)
    }
    const items = this.items
    let list = [];
   for (let i in items)
   {
   this.permission.map(function (e){
     if ( e === items[i].title) list.push(items[i])
   });
   }
   this.items = list;
  }
};
</script>
<style scoped>
i{
  font-size: 20px;
}
</style>
