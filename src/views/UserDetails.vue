<template>
  <div class="py-4 container-fluid">
    <div class="row bg-white p-3 mb-5" style="border-radius: 0 0 1rem 1rem">
      <div class="card-header pb-0">
        <h6>اطلاعات و مشخصات کاربر</h6>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="name"
              type="text"
              placeholder="نام و نام خانوادگی"
              aria-label="name"
              :value="user.name"
              title="نام و نام خانوادگی"
          />
        </div>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="phone_number"
              type="tel"
              placeholder="شماره تماس"
              aria-label="phone_number"
              :value="user.phone_number"
              title="شماره تماس"
          />
        </div>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="email"
              type="email"
              placeholder="ایمیل"
              aria-label="email"
              title="ایمیل"
              :value="user.email"
          />
        </div>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="company"
              type="text"
              placeholder="نام شرکت"
              aria-label="company"
              title="نام شرکت"
              :value="user.company_name"
          />
        </div>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="job"
              type="text"
              placeholder="شغل"
              aria-label="job"
              title="شغل"
              :value="user.job"
          />
        </div>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="created_at"
              type="text"
              placeholder="تاریخ ساخت اکانت"
              aria-label="created_at"
              title="تاریخ ساخت اکانت"
              :value="user.created_at"
          />
        </div>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="national_id"
              type="text"
              placeholder="کدملی"
              aria-label="national_id"
              title="کدملی"
              :value="user.national_id"
          />
        </div>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="address"
              type="text"
              placeholder="آدرس"
              aria-label="address"
              title="آدرس"
              :value="user.address"
              :size="'lg'"
          />
        </div>
      </div>
    </div>
    <div class="row" v-if="orders.length">
      <div class="col-12">
        <div class="card mb-4">
          <!-- Modal -->
          <div class="modal fade"

               id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف  سفارش کاربر</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  آیا از حذف سفارش کاربر اطمینان دارید؟
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no" >خیر</button>
                  <button type="button" class="btn btn-primary" @click="deleteOrder">بله</button>
                </div>
              </div>
            </div>
          </div>
          <!--    modal-->
          <div class="card-header pb-0">
            <h6>جدول سفارشات کاربر</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                <tr>
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
                    <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                @click="orderToDel=u;index=i;"
                    >حذف </vsud-badge
                    >
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
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-12 bg-white text-center p-4" style="border-radius:  0 0 1rem 1rem">
        <h5 class="text-center">
          سفارشی توسط این کاربر ثبت نشده است.
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import VsudInput from  "../components/VsudInput"
import {HTTP} from '../http-common'
import VsudBadge from "@/components/VsudBadge.vue";

export default {
  name: "UserDetails",
  components: {
    VsudInput,
    VsudBadge
  },
  data()
  {
      return {
        id: this.$route.params.id,
        user:'',
        orders:[],
        orderToDel:'',
        index:0
      }
  },
  async mounted() {
 const orders = await HTTP.get(`/orders/${this.id}`)
 const user = await HTTP.get(`/show_acc/${this.id}`)
    this.orders = orders.data
    console.log(this.orders)
    this.user = user.data
  },
  methods:{
    async deleteOrder()
    {
      const data = {
        id : this.orderToDel.id
      }
      const delet = await HTTP.delete(`order/delete`,{data})
      if (delet.status === 200)
      {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات موفق!",
          text: "سفارش کاربر با موفقیت حذف گردید!",
          type: 'success',
        });
        this.orders.splice(this.index,1)
      }
      else {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات ناموفق!",
          text: "خطا در حذف سفارش کاربر",
          type: 'error',
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
