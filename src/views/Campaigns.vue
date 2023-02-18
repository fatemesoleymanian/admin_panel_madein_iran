<template>
  <div class="py-4 container-fluid">
    <!--    Capmagin one-->
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>خروجی فرم کمپین سفره یکبار مصرف</h6>
          </div>
          <div class="px-4" v-if="!flag1">
            <vue3-json-excel
                :json-data="campaign1"
                :fields="campaign1_form_fields"
                name="خروجی فرم کمپین سفره یکبار مصرف"
                class="cursor-pointer">
              <button class="btn btn-dark fa-pull-left" style="font-size: 0.9em">خروجی اکسل</button>
            </vue3-json-excel>
          </div>
          <div class="col-6 text-start px-5 py-3 me-auto">
            <vsud-button color="dark" size="md" @click="showCamp1" v-if="flag1">نمایش جدول</vsud-button>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div id="loading" v-if="loader"></div>
            <div class="table-responsive p-0" v-if="!loader && campaign1.length>0">
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
                <tr v-for="(u, i) in getItemsCamp1" :key="i">
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

            <div v-if="getPaginateCountCamp1 > 1 " class="px-4 py-3 d-flex float-start">
              <pagination class="pro-pagination-style shop-pagination mt-30 "
                          v-model="campaign_pagination.currentPage" :per-page="campaign_pagination.perPage"
                          :records="campaign1.length" @paginate="paginateClickCallbackCamp1"
                          :page-count="getPaginateCountCamp1"/>
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
  components: {VsudButton},
  data() {
    return {
      campaign1: [],
      campaignone: {},
      flag1: true,
      campaign_pagination: {
        currentPage: 1,
        perPage: 10
      },
      loader: false,
      campaign1_form_fields: {
        "آیدی": "id",
        "نام و نام خانوادگی": "full_name",
        "شماره تماس": "phone_number",
        "تاریخ ارسال": "created_at"
      },
    }
  },
  methods: {
    async showCamp1() {
      this.loader = true
      this.campaignone = await HTTP.get('/campaign-one/form')
      .catch(()=>{
        return this.$notify({
          title: "خطا!",
          text: "خطایی در نمایش اطلاعات جدول رخ داد!",
          type: 'error',
        });
      })
        this.campaign1 = this.campaignone.data;
      this.flag1 = false;
      this.loader = false
    },
    paginateClickCallbackCamp1(page) {
      this.campaign_pagination.currentPage = Number(page);
    },
   },
  mounted() {
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    permissions.map((permission) => {
      if (permission.module.name === 'کمپین ها') {
        if (permission.read === 0) return window.location = '/'
      }
    });

    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
  },
  computed: {
    getPaginateCountCamp1() {
      return Math.ceil(this.campaign1.length / this.campaign_pagination.perPage);
    },
    getItemsCamp1() {
      let start = (this.campaign_pagination.currentPage - 1) * this.campaign_pagination.perPage;
      let end = this.campaign_pagination.currentPage * this.campaign_pagination.perPage;
      return this.campaign1.slice(start, end);
    },
   },
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:100);

#loading,{
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
