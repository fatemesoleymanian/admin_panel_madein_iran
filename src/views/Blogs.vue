<template>
  <div class="card mb-4 mt-5">
    <!-- Modal -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف پست</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف این پست اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no" >خیر</button>
            <button type="button" class="btn btn-primary" @click="deletePost">بله</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <div class="card-header pb-0">
      <h6>جدول پست های وبلاگ</h6>
    </div>
    <div class="col-6 text-start px-5 py-3 me-auto">
      <vsud-button color="dark" size="md" @click="$router.push('/post/new')" v-if="create">افزودن پست</vsud-button>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
             تیتر
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              دسته بندی
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              تگ ها
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              تاریخ ایجاد
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              اقدامات
            </th>
          </tr>
          </thead>
          <tbody>
          <tr  v-for="(u, i) in posts" :key="i" >
            <td>
              <div class="d-flex  py-1">
                <div >
                  <vsud-avatar
                      :img="'https://apidemo.madein-iran.com/public'+u.featuredImage"
                      size="sm"
                      border-radius="md"
                      class="mx-2"
                      :alt="u.slug"
                  />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{u.title}}</h6>
                </div>
              </div>
            </td>
            <td>
              <router-link to="/categories">
                <p class="text-xs font-weight-bold mb-0">{{u.category.name}}</p>
              </router-link>
            </td>
            <td class="align-middle text-center text-sm " width="260px">
              <router-link to="/tags">
              <p class="text-s font-weight-bold mb-0" style="display: inline" v-for="s in u.tag" :key="s">
                {{s.name}} - </p>
              </router-link>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{u.created_at}}</span
                >
            </td>
            <td class="align-middle text-center text-sm">
              <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                          data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                          @click="postToDel=u;index=i;"
              v-if="remove">حذف </vsud-badge>
              <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                          @click="$router.push(`/post/details${u.id}`)">
                جزئیات</vsud-badge>
            </td>

          </tr>
          </tbody>
        </table>
      </div>
<!--      <vsud-pagination class="my-3 float-start  mx-5" color="success" size="sm">-->
<!--        <vsud-pagination-item v-for="(e,i) in posts.links" :key="i" v-show="hide"-->
<!--                              :label="checkLabel(e.label)" :active="e.active" @click="updateBlogs(e.label)"/>-->
<!--      </vsud-pagination>-->

    </div>

  </div>
</template>

<script>
import {HTTP} from "../http-common";
import VsudButton from "../components/VsudButton";
import VsudAvatar from "../components/VsudAvatar";
import VsudBadge from "../components/VsudBadge";
// import VsudPagination from "../components/VsudPagination";
// import VsudPaginationItem from "../components/VsudPaginationItem";

export default {
  name: "Blogs",
  components: { VsudBadge, VsudAvatar, VsudButton},
  data()
  {
    return{
      posts:[],
      postToDel:'',
      index:0,
      remove:1,
      create:1,
      hide:1
    }
  },
  async mounted(){
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions)
    {
      if (permissions[i].module.name === 'وبلاگ'){
        if (permissions[i].read === 0) return window.location = '/';
        if (permissions[i].delete === 0) this.remove=0;
        if (permissions[i].create === 0) this.create=0;
      }
    }
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
      await HTTP.get('/blogs')
          .catch((e)=>{
            console.log(e)
            if(e.response.status ===500){
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              localStorage.removeItem('rgtokuukqp');
              window.location = '/sign-in'
            }
          })
          .then((resp)=> {
            this.posts = resp.data
          });
    }
  },
  methods:{
    async deletePost()
    {

       await HTTP.delete(`/blogs/${this.postToDel.id}`)
     .catch(()=>{
       document.getElementById('no').click();
       return this.$notify({
         title: "عملیات ناموفق!",
         text: "خطا در حذف پست",
         type: 'error',
       });
     });
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات موفق!",
          text: "پست با موفقیت حذف گردید!",
          type: 'success',
        });
        this.posts.splice(this.index,1)

    },
    async updateBlogs(page) {
      this.posts = await HTTP.get(`/blogs?page=${page}`)
          .catch(() => {
            return this.$notify({
              title: "خطا!",
              text: "خطایی در نمایش اطلاعات جدول رخ داد!",
              type: 'error',
            });
          });
      this.posts = this.posts.data;
    },
    checkLabel(label) {
      if (label === 'Next &raquo;') {
       return this.hide = 0
      }
      else if (label === '&laquo; Previous') {
        return this.hide= 0
      }
      else {
        this.hide = 1
        return label
      }
    }
  }
}
</script>

<style scoped>

</style>
