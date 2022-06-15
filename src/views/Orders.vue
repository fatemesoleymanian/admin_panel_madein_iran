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
          <tr  v-for="(u, i) in orders" :key="i" >
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
    </div>
  </div>
</template>
<script>
import {HTTP} from "../http-common";
import VsudBadge from "../components/VsudBadge";

export default {
  components: {VsudBadge},
  data()
  {
    return {
       orders:[],
      index:'',
      orderToDel:''
    }
  },
  async mounted()
  {
    const order = await HTTP.get('orders')
    .catch(()=>{
      this.$notify({
        title: "خطا!",
        text: "مشکلی در ارتباط با سرور پیش آند",
        type: 'error',
      });
    });
    this.orders = order.data;
  },

}
</script>
