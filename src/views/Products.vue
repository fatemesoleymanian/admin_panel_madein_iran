<template>
  <!--    modal for add state-->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">افزودن ظرفیت محصول</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">نام ظرفیت :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="نام ظرفیت" v-model="newStateName">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">قیمت ظرفیت :</h6>
              </div>
              <input type="number" class="form-control"  placeholder="قیمت ظرفیت" v-model="newStateCost" @change="doNewOff">
            </div>
            <div class="mb-3" v-if="data.discount !== 0">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">قیمت تخفیفی ظرفیت :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="قیمت تخفیفی ظرفیت" v-model="newStateOff" readonly>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" data-bs-target="#exampleModal" id="saveNewState">انصراف</button>
          <button type="button" class="btn btn-primary"  @click="addState" >ثبت</button>
        </div>
      </div>
    </div>
  </div>
  <!--    modal for add state-->

  <div class="card mb-4 mt-5">
    <!-- Modal -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no">خیر</button>
            <button type="button" class="btn btn-primary" @click="deleteProduct">بله</button>
          </div>
        </div>
      </div>
    </div>

    <!--    modal for asking model-->
    <div class="modal fade"

         id="model-check" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="model-checkLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="model-checkLabel">انتخاب حالت خط تولید</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <select class="form-select text-start"
                    style="margin-top: 42px" aria-label="Default select example" v-model="data.model_id">
              <option v-for="(c,i) in models" :key="i" :value="c.id">{{c.name}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="makeStateForModel"  data-bs-dismiss="modal"> ایجاد ظرفیت ها برای این حالت</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >بستن</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal for asking states-->
    <div class="modal fade"

         id="state-check" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="state-checkLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="state-checkLabel">ایجاد و تغییر ظرفیت ها</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row py-5 "  id="states">
              <div class="d-flex flex-row">
                <h5 class="font-weight-bolder">ظرفیت های محصول :</h5>
                <div class="me-auto d-flex justify-content-between">
                  <label for="discount" class="form-label">درصد تخفیف محصول :</label>
                  <input type="number" class="form-control form-control-sm" id="discount" placeholder="درصد تخفیف محصول"
                         v-model="data.discount" @change="doOff" style="height:40px" title="پس از وارد کردن درصد تخفیف کلید Enter یا Done را فشار دهید.">
                </div>
              </div>
              <hr class="bg-dark text-dark " style="width: 100%;height: 2px">
              <div class=" d-flex justify-content-end my-4">
                <vsud-button color="dark" size="lg" variant="outline" @click="closeAndOpen">
                  افزودن ظرفیت
                  <i class="bi bi-plus-lg"></i>
                </vsud-button>
                <button hidden id="openNewStateModal" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
              </div>
              <div class="row"  v-for="(s,i) in states"  :key="i" >
                <i class="bi bi-x-circle-fill d-flex justify-content-end" style="cursor: pointer;margin-bottom: -10px;font-size: 23px"
                   @click="removeState(s)"></i>
                <div class="col-md-4 col-12  ">
                  <div class="d-flex align-items-center">
                    <h6 class="mb-0 p-2">نام ظرفیت :</h6>
                  </div>
                  <input type="text" class="form-control" id="state_type" placeholder="نام ظرفیت" v-model="s.type">
                </div>
                <div class="col-md-4 col-12">
                  <div class="d-flex align-items-center">
                    <h6 class="mb-0 p-2">قیمت به تومان :</h6>
                  </div>
                  <input type="text" class="form-control" id="state_price" placeholder="قیمت :" v-model="s.price">

                </div>
                <div class="col-md-4 col-12 " v-if="data.discount !== 0">
                  <div class="d-flex align-items-center">
                    <h6 class="mb-0 p-2">قیمت تخفیفی :</h6>
                  </div>
                  <input type="text" class="form-control" id="state_discounted_price" placeholder=" قیمت تخفیفی"
                         :value="s.discounted_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                  >

                </div>
              </div>

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="saveTheResultOfStates" >ثبت ظرفیت ها</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closeStates">بستن</button>
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
      <div id="loading" v-if="loader"></div>
      <div class="table-responsive p-0" v-if="!loader">
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
          <tr v-for="(u, i) in getItems" :key="i">
            <td>
              <div class="d-flex  py-1">
                <div>
                  <vsud-avatar
                      :img="'https://api.madein-iran.com/public'+u.image"
                      size="sm"
                      border-radius="md"
                      class="mx-2"
                      :alt="u.name"
                  />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ u.name }}</h6>
                  <p class="text-xs text-secondary mb-0">
                    {{ u.discount }}%
                  </p>
                </div>
              </div>
            </td>
            <td>
              <router-link to="/categories">
                <p class="text-xs font-weight-bold mb-0">{{ u.category.name }}</p>
              </router-link>
            </td>
            <td class="align-middle text-center text-sm " width="260px">
              <p class="text-s font-weight-bold mb-0" style="display: inline" v-for="s in u.state" :key="s">
                {{ s.type.substring(0, 4) }}... - </p>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{ u.created_at }}</span
                >
            </td>
            <td class="align-middle text-center text-sm">
              <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                          data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                          @click="productToDel=u;index=i;" v-if="remove">حذف
              </vsud-badge>
              <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                          @click="$router.push(`/product/details${u.slug}`)">
                جزئیات
              </vsud-badge>
              <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                          @click="checkForModels(u)" >
                افزودن ظرفیت
              </vsud-badge>
              <button hidden id="hiddenButtonForCheckModel" data-bs-target="#model-check" data-bs-toggle="modal">
              </button>
              <button hidden id="hiddenButtonForCheckState" data-bs-target="#state-check" data-bs-toggle="modal"></button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="getPaginateCount > 1 " class="px-4 py-3 d-flex float-start">
        <pagination class="pro-pagination-style shop-pagination mt-30 "
                    v-model="product.currentPage" :per-page="product.perPage"
                    :records="products.length" @paginate="paginateClickCallback"
                    :page-count="getPaginateCount"/>
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
  data() {
    return {
      remove: 1,
      products: [],
      productToDel: '',
      index: 0,
      hide: 1,
      product: {
        currentPage: 1,
        perPage: 10
      },
      loader: false,
      models: [],
      states: [],
      chosen_product:'',
      data: {
        model_id: '',
        product_id:'',
        discount:''
      },
      tmp:'',
      newStateName:'',
      newStateCost:'',
      newStateOff:'',
      costs:[],
      final_states:[],
      off:[],
      ids:[],
    }
  },
  async mounted() {
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions) {
      if (permissions[i].module.name === 'محصولات') {
        if (permissions[i].read === 0) return window.location = '/';
        if (permissions[i].delete === 0) this.remove = 0;
      }
    }
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
      this.loader = true
      await HTTP.get('/admin/products')
          .catch((e) => {
            if (e.response.status === 500) {
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              localStorage.removeItem('rgtokuukqp');
              window.location = '/sign-in'
            }
          })
          .then((users) => {
            this.products = users.data;
            this.loader = false
          });
    }
  },
  methods: {
    async deleteProduct() {

      const delet = await HTTP.delete(`/products/${this.productToDel.id}`)
      if (delet.status === 200) {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات موفق!",
          text: "محصول با موفقیت حذف گردید!",
          type: 'success',
        });
        this.products.splice(this.index, 1)
      } else {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات ناموفق!",
          text: "خطا در حذف محصول",
          type: 'error',
        });
      }
    },
    paginateClickCallback(page) {
      this.product.currentPage = Number(page);
    },
    checkForModels(product) {
      console.log(product)
      this.data.product_id = product.id;
      this.data.discount = product.discount;
      this.chosen_product = product
      if (product.model.length) {
        this.models = product.model;
        document.getElementById("hiddenButtonForCheckModel").click();
      }
      else {
        this.states = product.state;
        document.getElementById("hiddenButtonForCheckState").click();

      }
    },
    makeStateForModel() {
      console.log(this.chosen_product)
      if (this.chosen_product.state.length>0)
      {
        this.states.length = 0
        for (let i in this.chosen_product.state) {
          if (this.chosen_product.state[i].model_id === this.data.model_id) this.states.push(this.chosen_product.state[i])
        }
    }
    else this.states.length = 0;
    document.getElementById("hiddenButtonForCheckState").click();
    },
    closeAndOpen()
    {
      document.getElementById("closeStates").click();
      document.getElementById("openNewStateModal").click();
    },
    doOff()
    {
      const dis = this.data.discount

      for (let i in this.states)
      {
        this.states[i].discounted_price = this.states[i].price-((this.states[i].price*dis)/100)
      }
    },
    doNewOff()
    {
      if (this.data.discount === 0) return this.newStateOff = this.newStateCost
      return this.newStateOff = this.newStateCost - ((this.newStateCost*this.data.discount)/100)
    },
    addState()
    {

      if (this.data.discount === 0)  this.newStateOff = this.newStateCost;

      const arr = {
        'type': this.newStateName,
        'price': this.newStateCost.toString(),
        'discounted_price': this.newStateOff.toString()
      }
      this.states.push(arr)
      this.newStateName = '';
      this.newStateCost = '';
      this.newStateOff = '';
    document.getElementById("saveNewState").click();
    document.getElementById("hiddenButtonForCheckState").click();
    },
    removeState(state)
    {
      this.states = this.states.filter(function (e){
        return e.id !== state.id
      })

    },
   async saveTheResultOfStates() {

         this.final_states = [];
     this.costs = [];
     this.off = [];
     for (let i in this.states) {
       this.final_states.push(this.states[i].type)
       this.costs.push(this.states[i].price)
       if (this.data.discount !== 0) {
         this.off.push(this.states[i].discounted_price)
       } else {
         this.off.push((this.states[i].price))
       }
     }

     if (this.data.discount === '') this.data.discount = 0

     this.ids = [];
     for (let i in this.states) {
       this.ids.push(this.states[i].id)
     }
     this.data.states = this.final_states
     this.data.off = this.off
     this.data.costs = this.costs

     if (this.data.model_id === '')
     {
       delete this.data.model_id
     const res = await HTTP.post('/products/states', this.data);
     if (res.status === 200) {
       this.$notify({
         title: "عملیات موفق!",
         text: res.data.msg,
         type: 'success',
       });
     } else {
       this.$notify({
         title: "عملیات ناموفق!",
         text: "خطا در ایجاد ظرفیت",
         type: 'error',
       });
     }
   }
     else {
       const res = await HTTP.post('/products/states_to_models', this.data);
       if (res.status === 200) {
         this.$notify({
           title: "عملیات موفق!",
           text: res.data.msg,
           type: 'success',
         });
       } else {
         this.$notify({
           title: "عملیات ناموفق!",
           text: "خطا در ایجاد ظرفیت",
           type: 'error',
         });
       }
     }
    window.location = '/products';
    }
    },
    computed: {
      getPaginateCount() {
        return Math.ceil(this.products.length / this.product.perPage);
      },
      getItems() {
        let start = (this.product.currentPage - 1) * this.product.perPage;
        let end = this.product.currentPage * this.product.perPage;
        return this.products.slice(start, end);
      },
    },
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
