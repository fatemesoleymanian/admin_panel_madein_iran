<template>
  <div class="card mb-4 mt-5">
    <!-- Modal -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف کاربر</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف این محصول اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no" >خیر</button>
            <button type="button" class="btn btn-primary" @click="deleteProduct">بله</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <div class="card-header pb-0">
      <h6>جدول محصولات فروشگاه</h6>
    </div>
    <div class="col-6 text-start px-5 py-3 me-auto">
      <vsud-button color="dark" size="md" @click="$router.push('/product/new')">افزودن محصول</vsud-button>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              نام محصول
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              دسته بندی
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              ظرفیت ها
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
          <tr  v-for="(u, i) in products" :key="i" >
            <td>
              <div class="d-flex  py-1">
                <div >
                  <vsud-avatar
                      :img="'http://localhost:8000'+u.image"
                      size="sm"
                      border-radius="md"
                      class="mx-2"
                      :alt="u.name"
                  />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{u.name}}</h6>
                  <p class="text-xs text-secondary mb-0">
                    {{u.discount}}%
                  </p>
                </div>
              </div>
            </td>
            <td>
              <p class="text-xs font-weight-bold mb-0">{{u.category.name}}</p>
            </td>
            <td class="align-middle text-center text-sm " width="260px">
              <p class="text-s font-weight-bold mb-0" style="display: inline" v-for="s in u.state" :key="s">
                {{s.type}} - </p>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{u.created_at}}</span
                >
            </td>
            <td class="align-middle text-center text-sm">
              <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                          data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                          @click="productToDel=u;index=i;">حذف </vsud-badge>
              <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                          @click="$router.push(`/product/details${u.id}`)">
                جزئیات</vsud-badge>
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
import VsudButton from "../components/VsudButton";
import VsudAvatar from "../components/VsudAvatar";

export default {
  components: {VsudAvatar, VsudButton, VsudBadge},
  data()
  {
    return{
      products:[],
      productToDel:'',
      index:0
    }
  },
  async mounted(){
    const users = await HTTP.get('/products');
    this.products = users.data
  },
  methods:{
    async deleteProduct()
    {

      const delet = await HTTP.delete(`/products/${this.productToDel.id}`)
      if (delet.status === 200)
      {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات موفق!",
          text: "محصول با موفقیت حذف گردید!",
          type: 'success',
        });
    this.products.splice(this.index,1)
      }
      else {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات ناموفق!",
          text: "خطا در حذف محصول",
          type: 'error',
        });
      }
    }
  }
}
</script>
