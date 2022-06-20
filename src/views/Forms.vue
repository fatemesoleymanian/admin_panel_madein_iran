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
                <tr v-for="(u, i) in emptyIdeas" :key="i">
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
            <vsud-pagination class="my-3 float-start  mx-5" v-if="emptyIdeas.length" color="success" size="sm">
              <vsud-pagination-item v-for="(e,i) in empties.data.users.links" :key="i"
                                    v-show="hide"
                                    :label="checkLabel(e.label)" :active="e.active" @click="updateEmpties(e.label)"
              />
            </vsud-pagination>
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
                    <tr v-for="(idea,i) in newIdeas" :key="i" >
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
                <vsud-pagination class="my-3 float-start  mx-5" v-if="newIdeas.length" color="success" size="sm">
                  <vsud-pagination-item v-for="(e,i) in ideas.data.users.links" :key="i"
                                        v-show="hide"
                                        :label="checkLabel(e.label)" :active="e.active" @click="updateIdeas(e.label)"/>
                </vsud-pagination>
              </div>
            </div>
          </div>
        </div>
  </div>

</template>

<script>
import {HTTP} from "../http-common";
import VsudButton from "../components/VsudButton";
import VsudPagination from "../components/VsudPagination";
import VsudPaginationItem from "../components/VsudPaginationItem";

export default {
  name: "Forms",
  components: {VsudPaginationItem, VsudPagination, VsudButton},
  data() {
    return {
      emptyIdeas: [],
      newIdeas: [],
      empties: {},
      ideas: {},
      flag1: true,
      flag2: true,
      hide:1
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
      this.emptyIdeas = this.empties.data.users.data;
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
      this.newIdeas = this.ideas.data.users.data;
      this.flag2 = false
    },
    async updateEmpties(page) {
      this.empties = await HTTP.get(`/job_production_empty?page=${page}`)
          .catch(() => {
            return this.$notify({
              title: "خطا!",
              text: "خطایی در نمایش اطلاعات جدول رخ داد!",
              type: 'error',
            });
          });
      this.emptyIdeas = this.empties.data.users.data;
    },
    async updateIdeas(page) {
      this.ideas = await HTTP.get(`/job_production_ideas?page=${page}`)
          .catch(() => {
            return this.$notify({
              title: "خطا!",
              text: "خطایی در نمایش اطلاعات جدول رخ داد!",
              type: 'error',
            });
          });
      this.newIdeas = this.ideas.data.users.data;
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
  }
}
</script>

<style scoped>

</style>
