<template>

  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>خروجی فرم ثبت نام خبر نامه</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div id="loading" v-if="loader"></div>
            <div class="table-responsive p-0" v-if="!loader && subscribersForNewsletters.length>0">
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
                <tr v-for="(subscriber, index) in getItemsOfSubscribersList" :key="index">
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ subscriber.full_name }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ subscriber.phone_number }}</p>
                  </td>
                  <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{ subscriber.created_at }}</span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <div v-if="getPaginateCountForList > 1 " class="px-4 py-3 d-flex float-start">
              <pagination class="pro-pagination-style shop-pagination mt-30 "
                          v-model="paginationProperties.currentPage" :per-page="paginationProperties.perPage"
                          :records="subscribersForNewsletters.length" @paginate="paginateClickCallbackForSubescribersList"
                          :page-count="getPaginateCountForList"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {HTTP} from "../http-common";

export default {
  name: "Newsletters",
  data() {
    return {
      subscribersForNewsletters: [],
      paginationProperties: {
        currentPage: 1,
        perPage: 15
      },
      loader: false
    }
  },
  async mounted() {
    this.loader = true;
    await HTTP.get('show_all_receivers')
        .then((response) => {
          this.subscribersForNewsletters = response.data
        })
        .catch(() => {
          return this.$notify({
            title: "خطا!",
            text: "خطایی در نمایش اطلاعات جدول رخ داد!",
            type: 'error',
          });
        });
    console.log(this.subscribersForNewsletters)
    this.loader = false
  },
  methods: {
    paginateClickCallbackForSubescribersList(page) {
      this.paginationProperties.currentPage = Number(page);
    },
  },
  computed:{
    getItemsOfSubscribersList() {
      let start = (this.paginationProperties.currentPage - 1) * this.paginationProperties.perPage;
      let end = this.paginationProperties.currentPage * this.paginationProperties.perPage;
      return this.subscribersForNewsletters.slice(start, end);
    },
    getPaginateCountForList() {
      return Math.ceil(this.subscribersForNewsletters.length / this.paginationProperties.perPage);
    },
  }
}
</script>

<style scoped>

</style>
