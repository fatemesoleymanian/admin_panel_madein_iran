<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>جزئیات سفارش</h6>
      <h6 class="text-start">
      <span>مجموع : {{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}تومان</span>
      </h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
          <tr>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              نام محصول
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              ظرفیت
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              قیمت
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
              تعداد
            </th>
          </tr>
          </thead>
          <tbody>
          <tr  v-for="(u, i) in items" :key="i">
            <td>
              <router-link :to="`/product/details${u.product.id}`">
              <div class="d-flex ">
                <div>
                  <img
                      :src="'http://localhost:8000'+u.product.image"
                      class="avatar avatar-sm rounded-circle mx-2"
                      :alt="u.product.name"
                  />
                </div>
                <div class="my-auto">
                  <h6 class="mb-0 text-sm">{{ u.product.name }}</h6>
                  <p class="text-xs text-secondary mb-0">
                    {{u.product.discount}}%
                  </p>
                </div>
              </div>
              </router-link>
            </td>
            <td>
              <p class="text-sm font-weight-bold mb-0">{{ u.state.type}}</p>
            </td>
            <td width="150px">
              <span class="text-xs font-weight-bold">{{ u.state.discounted_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}تومان</span>
            </td>
            <td class="align-middle text-center">
              <div class="d-flex align-items-center justify-content-center">
                <span class="me-2 text-xs font-weight-bold">{{u.count}}</span>
              </div>
            </td>
<!--            <td class="align-middle">-->
<!--              <button class="btn btn-link text-secondary mb-0">-->
<!--                <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>-->
<!--              </button>-->
<!--            </td>-->
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {HTTP} from "../http-common";

export default {
  name: "OrderDetails",
  components:{
  },
  data()
  {
    return{
      order_id:this.$route.params.order,
      items:[],
      total:''
    }
  },
  async mounted() {
    const orders = await HTTP.get(`/order/items${this.order_id}`);
    this.items = orders.data.products
    this.total = orders.data.total_price
  }
}
</script>

<style scoped>

</style>
