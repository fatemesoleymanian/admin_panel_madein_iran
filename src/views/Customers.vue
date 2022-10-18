<template>
  <div class="card mb-4 mt-5 mx-2">
    <!-- Modal to delete -->
    <div class="modal fade"
         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف مشتری</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف مشتری اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no">خیر</button>
            <button type="button" class="btn btn-primary" @click="deleteCustomer">بله</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <!-- Modal to edit -->
    <div class="modal fade"

         id="editSlide" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editSlideLabel">اقدام به ویرایش اطلاعات مشتری</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">نام و نام خانوادگی مشتری:</h6>
              </div>
              <input type="text" class="form-control" placeholder=" نام و نام خانوادگی مشتری" v-model="data.name">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">نام کاربری مشتری:</h6>
              </div>
              <input type="text" class="form-control" placeholder=" نام کاربری مشتری" v-model="data.user_name">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">رمز عبور مشتری :</h6>
              </div>
              <input type="text" class="form-control" placeholder=" رمز عبور مشتری" v-model="data.password">
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noEdit" >
              انصراف
            </button>
            <button type="button" class="btn btn-dark" @click="editCustomerInformation" >ثبت</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <!-- Modal to add -->
    <div class="modal fade"

         id="addSlide" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addSlideLabel">اقدام به افزودن مشتری</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">نام و نام خانوادگی مشتری :</h6>
              </div>
              <input type="text" class="form-control" placeholder="نام و نام خانوادگی مشتری" v-model="data.name">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">نام کاربری مشتری :</h6>
              </div>
              <input type="text" class="form-control" placeholder="نام کاربری مشتری" v-model="data.user_name">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">رمز عبور مشتری :</h6>
              </div>
              <input type="text" class="form-control" placeholder="رمز عبور مشتری" v-model="data.password">
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noAdd" >
              انصراف
            </button>
            <button type="button" class="btn btn-dark" @click="addCustomer">ثبت</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <div class="card-header pb-0">
      <h6>مشتریان فروشگاه</h6>
    </div>
    <div class="col-6 text-start px-5 py-3 me-auto">
      <vsud-button color="dark" size="lg" data-bs-toggle="modal" data-bs-target="#addSlide" v-if="create">
        افزودن مشتری
      </vsud-button>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div id="loading" v-if="loader"></div>
      <div class="table-responsive p-0" v-if="!loader">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              نام و نام خانوادگی
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              نام کاربری
            </th>
            <th
                class=" text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              تاریخ ایجاد
            </th>
            <th
                class=" text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              اقدامات
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(u, i) in customers" :key="i">
            <td class="align-middle">
                <span class="text-secondary text-xs font-weight-bold"
                >{{ u.name }}</span
                >
            </td>
            <td class="align-middle">
                <span class="text-secondary text-xs font-weight-bold"
                >{{ u.user_name }}</span
                >
            </td>
            <td class="align-middle ">
                <span class="text-secondary text-xs font-weight-bold"
                >{{ u.created_at }}</span
                >
            </td>
            <td class="align-middle  text-sm">

              <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                          @click="data.user_name=u.user_name;data.name=u.name;data.password=u.password;id=u.id"
                          data-bs-toggle="modal" data-bs-target="#editSlide" v-if="update">
                ویرایش
              </vsud-badge>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>
<script>
import VsudButton from "../components/VsudButton";
import VsudBadge from "../components/VsudBadge";
import {HTTP} from "../http-common";
export default {
  name: "Customers",
  components: {VsudBadge, VsudButton},
  data(){
    return{
      data:{
        user_name:'',
        password:'',
        name:''
      },
      id:'',
      remove: 1,
      update: 1,
      create: 1,
      customers: [],
      customerToDel: '',
      index: 0,
      loader: false
    }
  },
  async mounted() {
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions) {
      if (permissions[i].module.name === 'مشتریان') {
        if (permissions[i].read === 0) return window.location = '/';
        if (permissions[i].delete === 0) this.remove = 0;
        if (permissions[i].create === 0) this.create = 0;
        if (permissions[i].update === 0) this.update = 0;
      }
    }
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
      this.loader = true
      await HTTP.get('/customers/all')
          .catch((e) => {
            if (e.response.status === 500) {
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              localStorage.removeItem('rgtokuukqp');
              window.location = '/sign-in'
            }
          })
          .then((customers) => {
            this.customers = customers.data;
            this.loader = false
          });
    }
  },
  methods:{
    async deleteCustomer(){
      const delet = await HTTP.delete(`/customers/delete/${this.customerToDel.id}`)
      if (delet.status === 200) {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات موفق!",
          text: "مشتری با موفقیت حذف گردید!",
          type: 'success',
        });
        this.customers.splice(this.index, 1)
      } else {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات ناموفق!",
          text: "خطا در حذف مشتری",
          type: 'error',
        });
      }
    },
    async editCustomerInformation()
    {
      if (this.data.user_name.trim() === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "نام کاربری الزامیست.",
        type: 'error',
      });
      if (this.data.password.trim() === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "رمزعبور الزامیست.",
        type: 'error',
      });

      const update = await HTTP.put(`/customers/edit/${this.id}`, this.data)

      if (update.status === 200) {
        document.getElementById("noEdit").click()

        this.$notify({
          title: "عملیات موفق!",
          text: "اطلاعات مشتری ویرایش شد.",
          type: 'success',
        });
        this.customers[this.index].user_name = this.data.user_name
        this.customers[this.index].password = this.data.password
        this.customers[this.index].name = this.data.name
      } else {
        this.$notify({
          title: "عملیات ناموفق!",
          text: "لطفا دوباره امتحان کنید.",
          type: 'error',
        });
      }

    },
    async addCustomer()
    {
      if (this.data.user_name.trim() === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "نام کاربری مشتری الزامیست.",
        type: 'error',
      });
      if (this.data.password.trim() === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "رمز عبور مشتری الزامیست.",
        type: 'error',
      });

      const update = await HTTP.post('/customers/new', this.data)

      if (update.status === 200) {
        document.getElementById("noAdd").click()

        this.$notify({
          title: "عملیات موفق!",
          text: "مشتری ایجاد شد.",
          type: 'success',
        });
        this.customers.unshift(update.data.return)

      } else {
        this.$notify({
          title: "عملیات ناموفق!",
          text: "لطفا دوباره امتحان کنید.",
          type: 'error',
        });
      }
    }
  }
}
</script>


<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:100);

#loading {
  margin: 50px auto;
  width: 80px;
  height: 80px;
  border: 3px solid rgba(0, 0, 0, .5);
  border-radius: 50%;
  border-top-color: #000;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
