<template>
  <div class="card mb-4 mt-5 mx-2">
    <!-- Modal to delete -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف پرسش</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف این پرسش اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no">خیر</button>
            <button type="button" class="btn btn-primary" @click="deletee">بله</button>
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
            <h5 class="modal-title" id="editSlideLabel">اقدام به ویرایش پرسش</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">متن پرسش :</h6>
              </div>
              <input type="text" class="form-control" placeholder="متن پرسش" v-model="question">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">متن پاسخ :</h6>
              </div>
              <input type="text" class="form-control" placeholder=" متن پاسخ" v-model="answer">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">محصولات مرتبط :</h6>
              </div>

              <select class="form-select mb-3 text-start" aria-label="Default select example" v-model="tmp"
                      @change="addProduct">
                <option v-for="(p,i) in products" :key="i" :value="p">{{ p.name }}</option>
              </select>
              <div v-for="(t,i) in update.old" :key="i" style="display: inline" class="p-2">
                <vsud-badge color="dark" variant="gradient" size="lg"
                            @click="dropProduct(t)" style="cursor: pointer;"
                            title="برای حذف پرسش روی آن کیک کنید.">{{ t.name }}
                </vsud-badge>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noEdit">انصراف</button>
            <button type="button" class="btn btn-dark" @click="edit">ثبت</button>
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
            <h5 class="modal-title" id="addSlideLabel">اقدام به افزودن پرسش</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">متن پرسش :</h6>
              </div>
              <input type="text" class="form-control" placeholder=" متن پرسش" v-model="question">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">متن پاسخ :</h6>
              </div>
              <input type="text" class="form-control" placeholder=" متن پاسخ" v-model="answer">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">محصولات مرتبط :</h6>
              </div>

              <select class="form-select mb-3 text-start" aria-label="Default select example" v-model="tmp"
                      @change="addProductNew">
                <option v-for="(p,i) in products" :key="i" :value="p">{{ p.name }}</option>
              </select>
              <div v-for="(t,i) in create.new " :key="i" style="display: inline" class="p-2">
                <vsud-badge color="dark" variant="gradient" size="lg"
                            @click="dropProductNew(t)" style="cursor: pointer;"
                            title="برای حذف پرسش روی آن کیک کنید.">{{ t.name }}
                </vsud-badge>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noAdd">انصراف</button>
            <button type="button" class="btn btn-dark" @click="add">ثبت</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <div id="loading" v-if="loader"></div>
    <div class="card-header pb-0" v-if="!loader">
      <h6>پرسش های متدوال و پاسخ ها</h6>
    </div>
    <div class="col-6 text-start px-5 py-3 me-auto" v-if="!loader">
      <vsud-button color="dark" size="lg" data-bs-toggle="modal" data-bs-target="#addSlide" v-if="addFlag">افزودن پرسش
      </vsud-button>
    </div>
    <div class="card-body px-0 pt-0 pb-2 mb-5" v-if="!loader">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              پرسش
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
              پاسخ
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              محصولات مرتبط
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
          <tr v-for="(u, i) in getItemsFaq" :key="i" :id="u.id">
            <td>
              <p class="text-xs font-weight-bold mb-0">{{ u.question.substring(0, 15) }}...</p>
            </td>
            <td class="align-middle text-right text-sm " width="260px">
              <p class="text-s font-weight-bold mb-0" style="display: inline">
                {{ u.answer.substring(0, 15) }}... </p>
            </td>

            <td class="align-middle text-center text-sm " width="260px">
              <div v-for="(p,j) in u.product" :key="j">
                <router-link :to="`/product/details${p.id}`">
                  <p class="text-s font-weight-bold mb-0" style="display: inline">
                    {{ p.name.substring(0, 4) }}... -</p></router-link>
              </div>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{ u.created_at }}</span
                >
            </td>
            <td class="align-middle text-center text-sm">
              <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                          data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                          @click="faqToDel=u;index=i;" v-if="remove">حذف
              </vsud-badge>
              <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                          @click="question=u.question;answer=u.answer;update.old=u.product;id=u.id;"
                          data-bs-toggle="modal" data-bs-target="#editSlide" v-if="editFlag">
                ویرایش
              </vsud-badge>
            </td>

          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="getPaginateCountFaq > 1 " class="px-4 py-3 d-flex float-start">
        <pagination class="pro-pagination-style shop-pagination mt-30 "
                    v-model="faq.currentPage" :per-page="faq.perPage"
                    :records="faqs.length" @paginate="paginateClickCallbackFaq"
                    :page-count="getPaginateCountFaq"/>
      </div>
    </div>

    <div class="card mb-4 my-5 mx-4 bg-light" v-if="!loader">
      <div class="card-header pb-0 bg-light">
        <h6>فرم های ارسالی</h6>
      </div>
      <div class="px-4">
        <vue3-json-excel
            :json-data="forms"
            :fields="faq_form_fields"
            name=" خروجی فرم های ارسالی پرسش های متداول "
            class="cursor-pointer">
          <button class="btn btn-dark fa-pull-left" style="font-size: 0.9em">خروجی اکسل</button>
        </vue3-json-excel>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0 border">
          <table class="table align-items-center justify-content-center mb-0 bg-white">
            <thead>
            <tr>
              <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                نام و نام خانوادگی
              </th>
              <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                شماره تماس
              </th>
              <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                پرسش متداول
              </th>
              <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
              >
                تاریخ ارسال
              </th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(f,i) in getItemsForm" :key="i">
              <td>
                <div class="d-flex px-2">
                  <div class="my-auto">
                    <h6 class="mb-0 text-sm">{{ f.full_name }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-sm font-weight-bold mb-0">{{ f.phone_number }}</p>
              </td>
              <td>
                <span class="text-xs font-weight-bold">
                  <a :href="`#${f.faq.id}`">
                  {{ f.faq.question }}
                </a>
                  </span>
              </td>
              <td class="align-middle text-center">
                <div class="d-flex align-items-center justify-content-center">
                  <span class="me-2 text-xs font-weight-bold">{{ f.created_at }}</span>
                  <div>

                  </div>
                </div>
              </td>
              <td></td>
            </tr>
            </tbody>
          </table>
        </div>

        <div v-if="getPaginateCountForm > 1 " class="px-4 py-3 d-flex float-start">
          <pagination class="pro-pagination-style shop-pagination mt-30 "
                      v-model="form.currentPage" :per-page="form.perPage"
                      :records="forms.length" @paginate="paginateClickCallbackForm"
                      :page-count="getPaginateCountForm"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {HTTP} from "../http-common";
import VsudButton from "../components/VsudButton";
import VsudBadge from "../components/VsudBadge";

export default {
  name: "FAQs",
  components: {VsudBadge, VsudButton},
  data() {
    return {
      addFlag: 1,
      remove: 1,
      editFlag: 1,
      forms: [],
      faqs: [],
      faqToDel: '',
      index: 0,
      question: '',
      answer: '',
      id: '',
      products: [],
      update: {
        old: [],
        send: []
      },
      create: {
        new: [],
        send: []
      },
      tmp: '',
      hide1: 1,
      hide2: 1,
      form: {
        currentPage: 1,
        perPage: 10
      },
      faq: {
        currentPage: 1,
        perPage: 10
      },
      loader: false,
      faq_form_fields: {
        "آیدی": "id",
        "نام و نام خانوادگی": "full_name",
        "شماره تماس": "phone_number",
        "پرسش متداول مربوطه": "faq.question",
        "تاریخ ارسال": "created_at"
      },
    }
  },
  async mounted() {
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions) {
      if (permissions[i].module.name === 'پرسش های متداول') {
        if (permissions[i].read === 0) return window.location = '/';
        if (permissions[i].delete === 0) this.remove = 0;
        if (permissions[i].create === 0) this.addFlag = 0;
        if (permissions[i].update === 0) this.editFlag = 0;
      }
    }
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
      this.loader = true
      await Promise.all([
        HTTP.get('/faq'),
        HTTP.get('/products_totaly'),
        HTTP.get('/faq_form')
      ])
          .catch((e) => {
            if (e.response.status === 500) {
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              localStorage.removeItem('rgtokuukqp');
              window.location = '/sign-in'
            }
          })
          .then((res) => {
            this.faqs = res[0].data;
            this.products = res[1].data;
            this.forms = res[2].data;
            this.loader = false
          });
    }
  },
  methods: {
    async add() {
      if (this.question.trim() === '') return this.$notify({
        title: "خطا",
        text: "متن پرسش الزامیست!",
        type: 'error',
      });
      if (this.answer.trim() === '') return this.$notify({
        title: "خطا",
        text: "متن پاسخ الزامیست!",
        type: 'error',
      });
      if (this.create.new.length === 0) return this.$notify({
        title: "خطا",
        text: "حداقل یک محصول مرتبط با پرسش و پاسخ الزامیست!",
        type: 'error',
      });

      for (let i in this.create.new) {
        this.create.send.push(this.create.new[i].id)
      }
      const data = {
        question: this.question,
        answer: this.answer,
        product: this.create.send
      }

      const make = await HTTP.post('/faq', data)
          .catch(() => {
            return this.$notify({
              title: "خطا",
              text: "خطایی رخ داد!",
              type: 'error',
            });
          });
      this.$notify({
        title: "عملیات موفق",
        text: make.data.msg,
        type: 'success',
      });
      document.getElementById("noAdd").click()
      this.faqs.unshift(data);
      window.location = '/faqs'
    },
    async deletee() {
      const data = {id: this.faqToDel.id}
      const del = await HTTP.delete('/faq', {data})
          .catch(() => {
            return this.$notify({
              title: "عملیات ناموفق!",
              text: "خطا در حذف پرسش",
              type: 'error',
            });
          });
      document.getElementById('no').click();
      this.$notify({
        title: "عملیات موفق!",
        text: del.data.msg,
        type: 'success',
      });
      this.faqs.splice(this.index, 1)
    },
    async edit() {
      if (this.question.trim() === '') return this.$notify({
        title: "خطا",
        text: "متن پرسش الزامیست!",
        type: 'error',
      });
      if (this.answer.trim() === '') return this.$notify({
        title: "خطا",
        text: "متن پاسخ الزامیست!",
        type: 'error',
      });
      if (this.update.old.length === 0) return this.$notify({
        title: "خطا",
        text: "حداقل یک محصول مرتبط با پرسش و پاسخ الزامیست!",
        type: 'error',
      });
      for (let i in this.update.old) {
        this.update.send.push(this.update.old[i].id)
      }
      const data = {
        question: this.question,
        answer: this.answer,
        product: this.update.send
      }

      const updatee = await HTTP.put(`/faq${this.id}`, data)
          .catch(() => {
            return this.$notify({
              title: "خطا",
              text: "خطایی رخ داد!",
              type: 'error',
            });
          });
      this.$notify({
        title: "عملیات موفق",
        text: updatee.data.msg,
        type: 'success',
      });
      window.location = '/faqs'
    },
    dropProduct(product) {
      this.update.old = this.update.old.filter(function (ele) {
        return ele.id !== product.id
      });
    },
    addProduct() {
      let flag = false
      for (let i in this.update.old) {
        if (this.update.old[i].id === this.tmp.id) {
          flag = true;
          break;
        }
      }
      if (!flag) this.update.old.push(this.tmp);
    },
    dropProductNew(product) {
      this.create.new = this.create.new.filter(function (ele) {
        return ele.id !== product.id
      });
    },
    addProductNew() {
      let flag = false
      for (let i in this.create.new) {
        if (this.create.new[i].id === this.tmp.id) {
          flag = true;
          break;
        }
      }
      if (!flag) this.create.new.push(this.tmp);
    },
    paginateClickCallbackForm(page) {
      this.form.currentPage = Number(page);
    },
    paginateClickCallbackFaq(page) {
      this.faq.currentPage = Number(page);
    },
  },
  computed: {
    getPaginateCountForm() {
      return Math.ceil(this.forms.length / this.form.perPage);
    },
    getPaginateCountFaq() {
      return Math.ceil(this.faqs.length / this.faq.perPage);
    },
    getItemsForm() {
      let start = (this.form.currentPage - 1) * this.form.perPage;
      let end = this.form.currentPage * this.form.perPage;
      return this.forms.slice(start, end);
    },
    getItemsFaq() {
      let start = (this.faq.currentPage - 1) * this.faq.perPage;
      let end = this.faq.currentPage * this.faq.perPage;
      return this.faqs.slice(start, end);
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
