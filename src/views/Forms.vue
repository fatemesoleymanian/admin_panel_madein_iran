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
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                <tr>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    نام و نام خانوادگی
                  </th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    شماره تلفن همراه
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
                <div class="table-responsive p-0">
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
      empties: {},
      ideas: {},
      flag1: true,
      flag2: true,
      hide:1,
      empty:{
        currentPage: 1,
        perPage: 10
      },
      idea:{
        currentPage: 1,
        perPage: 10
      },
    }
  },
  methods: {
    async showEmpty() {
      this.empties = await HTTP.get('/job_production_empty')
          .catch(() => {
            return this.$notify({
              title: "خطا!",
              text: "خطایی در نمایش اطلاعات جدول رخ داد!",
              type: 'error',
            });
          });
      this.emptyIdeas = this.empties.data;
      this.flag1 = false
    },
    async showIdeas() {
      this.ideas = await HTTP.get('/job_production_ideas')
          .catch(() => {
            return this.$notify({
              title: "خطا!",
              text: "خطایی در نمایش اطلاعات جدول رخ داد!",
              type: 'error',
            });
          });
      this.newIdeas = this.ideas.data;
      this.flag2 = false
    },
    paginateClickCallbackEmpty(page) {
      this.empty.currentPage = Number(page);
    },
    paginateClickCallbackIdea(page) {
      this.idea.currentPage = Number(page);
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
  },
}
</script>

<style scoped>

</style>
