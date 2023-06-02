<template>
  <div class="card mb-4 mt-5 mx-2 bg-light">
<!--    modal-->
    <div class="modal fade"

         id="answer" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editSlideLabel">پاسخ به دیدگاه</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">متن پاسخ :</h6>
              </div>
              <textarea type="text" class="form-control"  placeholder="متن پاسخ" v-model="answer.comment" />
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noAnswer" >انصراف</button>
            <button type="button" class="btn btn-dark" @click="sendComment">ثبت</button>
          </div>
        </div>
      </div>
    </div>
<!--    modal-->
    <div id="loading" v-if="loader"></div>
    <div class="row my-5 ">
      <div class="col-12">
        <div class="card-header pb-0">
          <h6>دیدگاه کاربران درباره محصولات</h6>
        </div>

        <div class="card-body px-0 pt-0 pb-2" >
          <div class="table-responsive p-0" v-if="!loader">
            <table class="table align-items-center mb-0 bg-white">
              <thead>
              <tr>
                <th
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  متن دیدگاه
                </th>
                <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
                  کاربر
                </th>
                <th
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  محصول
                </th>
                <th
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  تاریخ ایجاد
                </th>
                <th
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  ثبت دیدگاه
                </th>
                <th
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  اقدامات
                </th>
              </tr>
              </thead>
              <tbody>
              <tr  v-for="(u, i) in getItems" :key="i" >
                <td>
                  <p class="text-xs font-weight-bold mb-0">{{u.comment}}</p>
                </td>
                <td class="align-middle text-center text-sm " width="260px">
                  <router-link :to="`/users/details${u.user.id}`">
                    <p class="text-s font-weight-bold mb-0" style="display: inline">
                      {{u.user.name}}  </p>
                  </router-link>
                </td>
                <td class="align-middle text-center text-sm " width="260px">
                  <router-link :to="`/product/details${u.product.id}`">
                    <p class="text-s font-weight-bold mb-0" style="display: inline">
                      {{u.product.name}} </p>
                  </router-link>
                </td>
                <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{u.created_at}}</span
                >
                </td>
                <td class="align-middle text-center text-sm">
                  <div class="form-check form-switch" v-if="update">
                    <input class="form-check-input" type="checkbox"
                           :checked="u.status === 1 ? true : false" @change="changeStatus(u.id)">
                  </div>
                </td>
                <td>
                  <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer" @click="answer.product_id=u.product.id"
                              data-bs-toggle="modal" data-bs-target="#answer" v-if="update">
                    پاسخ دادن</vsud-badge>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div v-if="getPaginateCount > 1 " class="px-4 py-3 d-flex float-start">
            <pagination class="pro-pagination-style shop-pagination mt-30 "
                        v-model="comment.currentPage" :per-page="comment.perPage"
                        :records="comments.length" @paginate="paginateClickCallback"
                        :page-count="getPaginateCount" />
          </div>
        </div>

      </div>
    </div>
<!--    <div class="row">-->
<!--      <div class="col-12">-->
<!--        <div class="card-header pb-0">-->
<!--          <h6>دیدگاه کاربران درباره پست های وبلاگ</h6>-->
<!--        </div>-->

<!--        <div class="card-body px-0 pt-0 pb-2" >-->
<!--          <div class="table-responsive p-0" v-if="!loader">-->
<!--            <table class="table align-items-center mb-0 bg-white">-->
<!--              <thead>-->
<!--              <tr>-->
<!--                <th-->
<!--                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">-->
<!--                  متن دیدگاه-->
<!--                </th>-->
<!--                <th-->
<!--                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">-->
<!--                  کاربر-->
<!--                </th>-->
<!--                <th-->
<!--                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">-->
<!--                  پست-->
<!--                </th>-->
<!--                <th-->
<!--                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">-->
<!--                  تاریخ ایجاد-->
<!--                </th>-->
<!--                <th-->
<!--                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">-->
<!--                  ثبت دیدگاه-->
<!--                </th>-->
<!--              </tr>-->
<!--              </thead>-->
<!--              <tbody>-->
<!--              <tr  v-for="(u, i) in getItemsForBlogComment" :key="i" >-->
<!--                <td>-->
<!--                  <p class="text-xs font-weight-bold mb-0">{{u.comment}}</p>-->
<!--                </td>-->
<!--                <td class="align-middle text-center text-sm " width="260px">-->
<!--                  <router-link :to="`/users/details${u.user.id}`">-->
<!--                    <p class="text-s font-weight-bold mb-0" style="display: inline">-->
<!--                      {{u.user.name}}  </p>-->
<!--                  </router-link>-->
<!--                </td>-->
<!--                <td class="align-middle text-center text-sm " width="260px">-->
<!--                  <router-link :to="`/post/details${u.blog.id}`">-->
<!--                    <p class="text-s font-weight-bold mb-0" style="display: inline">-->
<!--                      {{u.blog.title}} </p>-->
<!--                  </router-link>-->
<!--                </td>-->
<!--                <td class="align-middle text-center">-->
<!--                <span class="text-secondary text-xs font-weight-bold"-->
<!--                >{{u.created_at}}</span-->
<!--                >-->
<!--                </td>-->
<!--                <td class="align-middle text-center text-sm">-->
<!--                  <div class="form-check form-switch" v-if="update">-->
<!--                    <input class="form-check-input" type="checkbox"-->
<!--                           :checked="u.status === 1 ? true : false" @change="changeStatusForBlogComment(u.id)">-->
<!--                  </div>-->
<!--                </td>-->

<!--              </tr>-->
<!--              </tbody>-->
<!--            </table>-->
<!--          </div>-->
<!--          <div v-if="getPaginateCountForBlogComment > 1 " class="px-4 py-3 d-flex float-start">-->
<!--            <pagination class="pro-pagination-style shop-pagination mt-30 "-->
<!--                        v-model="blog_comment.currentPage" :per-page="blog_comment.perPage"-->
<!--                        :records="blog_comments.length" @paginate="paginateClickCallbackForBlogComment"-->
<!--                        :page-count="getPaginateCountForBlogComment" />-->
<!--          </div>-->
<!--        </div>-->

<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import {HTTP} from "../http-common";
import VsudBadge from "../components/VsudBadge";
export default {
  name: "Comments",
  components: {VsudBadge},
  data()
  {
    return{
      comments:[],
      blog_comments:[],
      update:1,
      hide:1,
      comment:{
        currentPage: 1,
        perPage: 10
      },
      blog_comment:{
        currentPage: 1,
        perPage: 10
      },
      loader:false,
      answer:{
        comment:'',
        user_id:23,
        product_id:'',
        status:1
      }
    }
  },
  async mounted() {
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions)
    {
      if (permissions[i].module.name === 'دیدگاه ها'){
        if (permissions[i].read === 0) return window.location = '/';
        if (permissions[i].update === 0) this.update=0;
      }
    }
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
      this.loader = true
       await Promise.all([
         HTTP.get('pcomment/all'),
         // HTTP.get('posts_comments'),
       ])
          .catch((e)=>{
            if(e.response.status ===500){
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              localStorage.removeItem('rgtokuukqp');
              window.location = '/sign-in'
            }
          })
          .then((comment)=> {
            this.comments = comment[0].data;
            // this.blog_comments = comment[1].data;
            this.loader = false
          });
      this.loader = false
    }
  },
  methods:{
    async sendComment(){
      if (this.answer.comment.trim() === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "متن پاسخ الزامیست.",
        type: 'error',
      });

      await  HTTP.post('admin/reply',this.answer)
          .catch(()=>{
            document.getElementById("noAnswer").click()
            return   this.$notify({
              title: "عملیات ناموفق!",
              text: "لطفا دوباره امتحان کنید.",
              type: 'error',
            });
          });
      document.getElementById("noAnswer").click()

      this.$notify({
        title: "عملیات موفق!",
        text: "پاسخ ثبت شد.",
        type: 'success',
      });
    },
    async changeStatus(id) {
      let status ;
      if (event.target.checked) status = 1
     else status = 0

      const change = { status : status}
      const comment = await HTTP.put(`pcomment/update${id}`,change)
      .catch(()=>{
      return this.$notify({title: 'مشکلی در عملیات ثبت دیدگاه پیش آمد!'})
    });
      return this.$notify({title: comment.data.msg})

    },
    // async changeStatusForBlogComment(id) {
    //   let status ;
    //   if (event.target.checked) status = 1
    //  else status = 0
    //
    //   const change = { status : status}
    //   const comment = await HTTP.put(`post_set_status${id}`,change)
    //   .catch(()=>{
    //   return this.$notify({title: 'مشکلی در عملیات ثبت دیدگاه پیش آمد!'})
    // });
    //   return this.$notify({title: comment.data.msg})
    //
    // },
    paginateClickCallback(page) {
      this.comment.currentPage = Number(page);
    },
    // paginateClickCallbackForBlogComment(page) {
    //   this.blog_comment.currentPage = Number(page);
    // },
  },
  computed: {
    getPaginateCount() {
      return Math.ceil(this.comments.length / this.comment.perPage);
    },
    // getPaginateCountForBlogComment() {
    //   return Math.ceil(this.blog_comments.length / this.blog_comments.perPage);
    // },
    getItems() {
      let start = (this.comment.currentPage - 1) * this.comment.perPage;
      let end = this.comment.currentPage * this.comment.perPage;
      return this.comments.slice(start, end);
    },
    // getItemsForBlogComment() {
    //   let start = (this.blog_comment.currentPage - 1) * this.blog_comment.perPage;
    //   let end = this.blog_comment.currentPage * this.blog_comment.perPage;
    //   return this.blog_comments.slice(start, end);
    // },
  },
}
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:100);
#loading {
  margin: 50px auto;
  width: 80px;
  height: 80px;
  border: 3px solid rgba(0,0,0,.5);
  border-radius: 50%;
  border-top-color: #000;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
</style>
