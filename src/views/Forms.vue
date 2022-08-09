<template>
  <div class="py-4 container-fluid">
    <!--    job production form with empty idea-->
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>خروجی فرم تقاضای خط تولید بدون ایده شخصی</h6>
          </div>
          <div class="col-6 text-start px-5 py-3 me-auto">
            <vsud-button color="dark" size="md" @click="showEmpty" v-if="flag1">نمایش جدول</vsud-button>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div id="loading" v-if="loader"></div>
            <div class="table-responsive p-0" v-if="!loader && emptyIdeas.length>0">
              <table class="table align-items-center mb-0">
                <thead>
                <tr>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    نام و نام خانوادگی
                  </th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    شماره تلفن همراه
                  </th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                   خط تولید
                  </th>
                  <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    تاریخ ارسال
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(u, i) in getItemsEmpty" :key="i">
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ u.full_name }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ u.phone_number }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ u.product }}</p>
                  </td>
                  <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{ u.created_at }}</span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <div v-if="getPaginateCountEmpty > 1 " class="px-4 py-3 d-flex float-start">
              <pagination class="pro-pagination-style shop-pagination mt-30 "
                          v-model="empty.currentPage" :per-page="empty.perPage"
                          :records="emptyIdeas.length" @paginate="paginateClickCallbackEmpty"
                          :page-count="getPaginateCountEmpty" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    job production form with ideas-->
        <div class="row">
          <div class="col-12">
            <div class="card mb-4">
              <div class="card-header pb-0">
                <h6>خروجی فرم تقاضای خط تولید شامل ایده شخصی</h6>
              </div>
              <div class="col-6 text-start px-5 py-3 me-auto">
                <vsud-button color="dark" size="md" @click="showIdeas" v-if="flag2" >نمایش جدول</vsud-button>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div id="loading2" v-if="loader"></div>
                <div class="table-responsive p-0" v-if="!loader && newIdeas.length>0">
                  <table class="table align-items-center justify-content-center mb-0">
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
                        ایده مدنظر یا درخواست ایده تولیدی
                      </th>
                      <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
                      >
                        تاریخ ازسال
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(idea,i) in getItemsIdea" :key="i" >
                      <td>
                        <p class="text-sm font-weight-bold mb-0">{{idea.full_name}}</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-bold mb-0">{{idea.phone_number}}</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-bold">{{idea.description}}</p>
                      </td>
                      <td class="align-middle text-center ">
                        <p class="text-sm font-weight-bold">{{idea.created_at}}</p>
                      </td>

                    </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="getPaginateCountIdea > 1 " class="px-4 py-3 d-flex float-start">
                  <pagination class="pro-pagination-style shop-pagination mt-30 "
                              v-model="idea.currentPage" :per-page="idea.perPage"
                              :records="newIdeas.length" @paginate="paginateClickCallbackIdea"
                              :page-count="getPaginateCountIdea" />
                </div>
              </div>
            </div>
          </div>
        </div>

<!--    request for representation-->
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>خروجی فرم درخواست نمایندگی خط تولید</h6>
          </div>
          <div class="col-6 text-start px-5 py-3 me-auto">
            <vsud-button color="dark" size="md" @click="showRepresentation" v-if="flag3" >نمایش جدول</vsud-button>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div id="loading3" v-if="loader"></div>
            <div class="table-responsive p-0" v-if="!loader && representations.length>0">
              <table class="table align-items-center justify-content-center mb-0">
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
                    ایده مدنظر یا درخواست ایده تولیدی
                  </th>
                  <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
                  >
                    تاریخ ارسال
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(rep,i) in getItemsRepresentation" :key="i" >
                  <td>
                    <p class="text-sm font-weight-bold mb-0">{{rep.full_name}}</p>
                  </td>
                  <td>
                    <p class="text-sm font-weight-bold mb-0">{{rep.phone_number}}</p>
                  </td>
                  <td>
                    <p class="text-sm font-weight-bold">{{rep.description}}</p>
                  </td>
                  <td class="align-middle text-center ">
                    <p class="text-sm font-weight-bold">{{rep.created_at}}</p>
                  </td>

                </tr>
                </tbody>
              </table>
            </div>
            <div v-if="getPaginateCountRepresentation > 1 " class="px-4 py-3 d-flex float-start">
              <pagination class="pro-pagination-style shop-pagination mt-30 "
                          v-model="representation.currentPage" :per-page="representation.perPage"
                          :records="representations.length" @paginate="paginateClickCallbackRepresentation"
                          :page-count="getPaginateCountRepresentation" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {HTTP} from "../http-common";
import VsudButton from "../components/VsudButton";

export default {
  name: "Forms",
  components: { VsudButton},
  data() {
    return {
      emptyIdeas: [],
      newIdeas: [],
      representations: [],
      empties: {},
      ideas: {},
      representing: {},
      flag1: true,
      flag2: true,
      flag3: true,
      hide:1,
      empty:{
        currentPage: 1,
        perPage: 10
      },
      idea:{
        currentPage: 1,
        perPage: 10
      },
      representation:{
        currentPage: 1,
        perPage: 10
      },
      loader:false
    }
  },
  methods: {
    async showEmpty() {
      this.loader = true
      this.empties = await HTTP.get('/job_production_empty')
          .catch(() => {
            return this.$notify({
              title: "خطا!",
              text: "خطایی در نمایش اطلاعات جدول رخ داد!",
              type: 'error',
            });
          });
      this.emptyIdeas = this.empties.data;
      this.flag1 = false;
      this.loader = false
    },
    async showIdeas() {
      this.loader = true
      this.ideas = await HTTP.get('/job_production_ideas')
          .catch(() => {
            return this.$notify({
              title: "خطا!",
              text: "خطایی در نمایش اطلاعات جدول رخ داد!",
              type: 'error',
            });
          });
      this.newIdeas = this.ideas.data;
      this.flag2 = false;
      this.loader = false
    },
    async showRepresentation() {
      this.loader = true
      this.representing = await HTTP.get('product_represent')
          .catch(() => {
            return this.$notify({
              title: "خطا!",
              text: "خطایی در نمایش اطلاعات جدول رخ داد!",
              type: 'error',
            });
          });
      this.representations = this.representing.data;
      this.flag3 = false;
      this.loader = false
    },
    paginateClickCallbackEmpty(page) {
      this.empty.currentPage = Number(page);
    },
    paginateClickCallbackIdea(page) {
      this.idea.currentPage = Number(page);
    },
    paginateClickCallbackRepresentation(page) {
      this.representation.currentPage = Number(page);
    },
  },
  mounted()
  {
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions)
    {
      if (permissions[i].module.name === 'فرم ها'){
        if (permissions[i].read === 0) return window.location = '/'
      }
    }
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
  },
  computed: {
    getPaginateCountEmpty() {
      return Math.ceil(this.emptyIdeas.length / this.empty.perPage);
    },
    getPaginateCountIdea() {
      return Math.ceil(this.newIdeas.length / this.idea.perPage);
    },
    getPaginateCountRepresentation() {
      return Math.ceil(this.representations.length / this.representation.perPage);
    },
    getItemsEmpty() {
      let start = (this.empty.currentPage - 1) * this.empty.perPage;
      let end = this.empty.currentPage * this.empty.perPage;
      return this.emptyIdeas.slice(start, end);
    },
    getItemsIdea() {
      let start = (this.idea.currentPage - 1) * this.idea.perPage;
      let end = this.idea.currentPage * this.idea.perPage;
      return this.newIdeas.slice(start, end);
    },
    getItemsRepresentation() {
      let start = (this.representation.currentPage - 1) * this.representation.perPage;
      let end = this.representation.currentPage * this.representation.perPage;
      return this.representations.slice(start, end);
    },
  },
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:100);
#loading,#loading2 ,#loading3{
  margin: 50px auto;
  width: 80px;
  height: 80px;
  border: 3px solid rgba(0,0,0,.5);
  border-radius: 50%;
  border-top-color: #000;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
</style>
