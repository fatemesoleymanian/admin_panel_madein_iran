<template>
  <nav
    class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl"
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
  >
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs :currentPage="currentRouteName" :textWhite="textWhite" />
      <div
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="this.$store.state.isRTL ? 'px-0' : 'me-sm-4'"
        id="navbar"
      >
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="this.$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'"
        >
          <div class="input-group">
            <span class="input-group-text text-body" @click="search"
              ><i class="fas fa-search" aria-hidden="true"></i></span>
            <input
              type="text"
              class="form-control"
              :placeholder="
                this.$store.state.isRTL ? 'جستجو...' : 'Type here...'"
              v-model="str"  @keyup.enter="search"
            />
            <ul :class="active ? ' suggestions clearfix active' : 'suggestions clearfix' " v-if="results.length"
            style=" margin: 50px 20px 0 0;">
              <li v-for="(r,i) in results" :key="i" >
                <span v-if="r.created_at === 'pro' " @click="$router.push(`/product/details${r.id}`);results=[];active=true">
                  {{r.name}}
                </span>
                <span v-if="r.created_at === 'blo' " @click="$router.push(`/post/details${r.id}`);results=[];active=true">
                  {{r.title}}
                </span>
                <span v-if="r.created_at === 'tag' " @click="$router.push(`/tags`);results=[];active=true">
                  {{r.name}}
                </span>
              </li>
            </ul>
            <div v-if="!active && !results.length"
                 :class="active ? ' suggestions clearfix active' : 'suggestions clearfix' "
            style="margin: 50px 20px ;text-align:center;padding:20px;font-weight: 500;font-size: 19px">
              <span>نتیجه ای یافت نشد!</span>
            </div>
          </div>
        </div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center">

              <i
                class="fa fa-user"
                :class="this.$store.state.isRTL ? 'ms-sm-2' : 'me-sm-1'"
              ></i>
              <span v-if="this.$store.state.isRTL" class="d-sm-inline d-none cursor-pointer"
               @click="logout" >خروج</span
              >
              <span v-else class="d-sm-inline d-none cursor-pointer" @click="logout">خروج</span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations, mapActions } from "vuex";
import {HTTP} from "../../http-common";

export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
      str:'',
      //type , id , title dare
      results:[],
      active:true
    };
  },
  props: ["minNav", "textWhite"],
  created() {
    this.minNav;
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),

    toggleSidebar() {
      this.toggleSidebarColor("bg-white");
      this.navbarMinimize();
    },
    async logout()
    {
      await HTTP.post('admin/logout')
      .then((res)=>{
        console.log(res.data)
        localStorage.removeItem('wugt');
        localStorage.removeItem('vqmgp');
        localStorage.removeItem('rgtokuukqp');
        this.$notify({
          title: "عملیات موفق!",
          text:res.data.message,
          type: 'success',
        });
        window.location = '/sign-in'
      })
      .catch((e)=>{
        return this.$notify({
          title: "عملیات ناموفق!",
          text:e.response.data.message,
          type: 'error',
        });
      });
    },
    async search()
    {
      if (this.str)
      {
        await HTTP.get(`/admin_search/${this.str}`)
        .then((resp)=>{
        for (let i in resp.data.products)
        {
          resp.data.products[i].created_at='pro';
          this.results.push(resp.data.products[i])
        }
          for (let i in resp.data.blogs)
          {
            resp.data.blogs[i].created_at='blo';
            this.results.push(resp.data.blogs[i])
          }
          for (let i in resp.data.tags)
          {
            resp.data.tags[i].created_at='tag';
            this.results.push(resp.data.tags[i])
          }
          this.active = false
        })
        .catch(()=>{
          this.active = false;
          return this.$notify({
            title:'خطا!',
            text:'مشکلی پیش آمد ، لطفا صفحه را ریلود کنید.',
            type:'error',
          })
        });
      }

    }
  },
  components: {
    Breadcrumbs,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  updated() {
    const navbar = document.getElementById("navbarBlur");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10 && this.$store.state.isNavFixed) {
        navbar.classList.add("blur");
        navbar.classList.add("position-sticky");
        navbar.classList.add("shadow-blur");
      } else {
        navbar.classList.remove("blur");
        navbar.classList.remove("position-sticky");
        navbar.classList.remove("shadow-blur");
      }
    });
  },
};
</script>
<style scoped>
.suggestions {
  background: #fff;
  position: fixed;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  padding: 0 15px;
  width: 12rem;
  list-style: none;
  border-radius:10px ;
}
.suggestions.active {
  border-top: 1px solid #007bff;
}
.suggestions li {
  margin: 18px 0;
  padding: 0;
  cursor: pointer;
}
.suggestions li:hover {
  color: #007bff;
}
b {
  font-weight: 600;
}
.clearfix::before,
.clearfix::after {
  content: " ";
  display: table;
}
.clearfix::after {
  clear: both;
}
.clearfix {
  *zoom: 1; /* Für den IE6 und IE7 */
}
</style>
