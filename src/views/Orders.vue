<template>
  <div class="card mb-4 mt-5 mx-2">
    <div class="card-header pb-0">
      <h6>جدول سفارشات </h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              کاربر
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              مجموع
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
            >
              وضعیت
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              اقدامات
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              تاریخ ثبت سفارش
            </th>
          </tr>
          </thead>
          <tbody>
          <tr  v-for="(u, i) in orders.data" :key="i" >
            <td>
              <p class="text-xs font-weight-bold mb-0">
              <router-link :to="`/users/details${u.card.user_id}`">
                مشاهده
              </router-link>
              </p>
            </td>
            <td>
              <div class="d-flex px-2 py-1">
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{u.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}} تومان</h6>
                </div>
              </div>
            </td>
            <td>
              <p class="text-xs font-weight-bold mb-0">{{u.current_state}}</p>
            </td>
            <td class="align-middle text-center text-sm ">

              <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                          @click="$router.push(`/orders/details${u.card_id}`)">جزئیات</vsud-badge>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{u.created_at}}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <vsud-pagination class="my-3 float-start  mx-5" color="success" size="sm">
        <vsud-pagination-item v-for="(e,i) in orders.links" :key="i" v-show="hide"
                              :label="checkLabel(e.label)" :active="e.active" @click="updateOrder(e.label)"/>
      </vsud-pagination>
    </div>
  </div>
</template>
<script>
import {HTTP} from "../http-common";
import VsudBadge from "../components/VsudBadge";
import VsudPagination from "../components/VsudPagination";
import VsudPaginationItem from "../components/VsudPaginationItem";

export default {
  components: {VsudPaginationItem, VsudPagination, VsudBadge},
  data()
  {
    return {
       orders:[],
      index:'',
      orderToDel:'',
      hide:1
    }
  },
  async mounted()
  {
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions)
    {
      if (permissions[i].module.name === 'سفارشات'){
        if (permissions[i].read === 0) return window.location = '/';
      }
    }
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
     await HTTP.get('orders')
          .catch((e)=>{
            if(e.response.status ===500){
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              localStorage.removeItem('rgtokuukqp');
              window.location = '/sign-in'
            }
          })
          .then((order)=> {
            this.orders = order.data;
          });
    }
  },
  methods:{
    async updateOrder(page) {
      this.orders = await HTTP.get(`orders?page=${page}`)
          .catch(() => {
            return this.$notify({
              title: "خطا!",
              text: "خطایی در نمایش اطلاعات جدول رخ داد!",
              type: 'error',
            });
          });
      this.orders = this.orders.data;
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
