<template>
  <div class="card mb-4 mt-5 mx-2">

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
                <input class="form-check-input" type="checkbox" id="status"
                       :checked="u.status === 1 ? true : false" @change="changeStatus(u.id)">
              </div>
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
</template>

<script>
import {HTTP} from "../http-common";
export default {
  name: "Comments",
  data()
  {
    return{
      comments:[],
      update:1,
      hide:1,
      comment:{
        currentPage: 1,
        perPage: 10
      },
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
    paginateClickCallback(page) {
      this.comment.currentPage = Number(page);
    },
  },
  computed: {
    getPaginateCount() {
      return Math.ceil(this.comments.length / this.comment.perPage);
    },
    getItems() {
      let start = (this.comment.currentPage - 1) * this.comment.perPage;
      let end = this.comment.currentPage * this.comment.perPage;
      return this.comments.slice(start, end);
    },
  },
}
</script>

<style scoped>

</style>
