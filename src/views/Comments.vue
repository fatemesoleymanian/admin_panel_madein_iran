<template>
  <div class="card mb-4 mt-5 mx-2">
    <!-- Modal to delete -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف اسلاید</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف این اسلاید اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no" >خیر</button>
            <button type="button" class="btn btn-primary" @click="deleteSlide">بله</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->

    <div class="card-header pb-0">
      <h6>دیدگاه کاربران درباره محصولات</h6>
    </div>

    <div class="card-body px-0 pt-0 pb-2" >
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
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
          </tr>
          </thead>
          <tbody>
          <tr  v-for="(u, i) in comments.data" :key="i" >
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
                <input class="form-check-input" type="checkbox" id="status"
                       :checked="u.status === 1 ? true : false" @change="changeStatus(u.id)">
              </div>
            </td>

          </tr>
          </tbody>
        </table>
      </div>
      <vsud-pagination class="my-3 float-start  mx-5" color="success" size="sm">
        <vsud-pagination-item v-for="(e,i) in comments.links" :key="i" v-show="hide"
                              :label="checkLabel(e.label)" :active="e.active" @click="updateComment(e.label)"/>
      </vsud-pagination>
    </div>

  </div>
</template>

<script>
import {HTTP} from "../http-common";
import VsudPagination from "../components/VsudPagination";
import VsudPaginationItem from "../components/VsudPaginationItem";
export default {
  name: "Comments",
  components: {VsudPaginationItem, VsudPagination},
  data()
  {
    return{
      comments:[],
      update:1,
      hide:1
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
       await HTTP.get('pcomment/all')
          .catch((e)=>{
            if(e.response.status ===500){
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              localStorage.removeItem('rgtokuukqp');
              window.location = '/sign-in'
            }
          })
          .then((comment)=> {
            this.comments = comment.data
            console.log(this.comments)
          });
    }
  },
  methods:{
    async changeStatus(id)
    {
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
    async updateComment(page) {
      this.comments = await HTTP.get(`/pcomment/all?page=${page}`)
          .catch(() => {
            return this.$notify({
              title: "خطا!",
              text: "خطایی در نمایش اطلاعات جدول رخ داد!",
              type: 'error',
            });
          });
      this.comments = this.comments.data;
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
