<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>اعلانات اخیر</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div id="loading" v-if="loader"></div>
            <div class="table-responsive p-0" v-if="!loader && notifications.length>0">
              <table class="table align-items-center mb-0">
                <thead>
                <tr>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    اعلان
                  </th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    خوانده شده
                  </th>
                  <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    تاریخ
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(notif, index) in getItemsOfNotificationsList" :key="index">
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ notif.data }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ notif.read_at === null ? 'no' : 'yes' }}</p>
                  </td>
                  <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{ notif.created_at }}</span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <div v-if="getPaginateCountForList > 1 " class="px-4 py-3 d-flex float-start">
              <pagination class="pro-pagination-style shop-pagination mt-30 "
                          v-model="paginationProperties.currentPage" :per-page="paginationProperties.perPage"
                          :records="notifications.length"
                          @paginate="paginateClickCallbackForNotificationList"
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
  name: "Notifications",
  data(){
    return{
    notifications:[]  ,
      loader:false,
      paginationProperties: {
        currentPage: 1,
        perPage: 15
      },
    }
  },
  async mounted() {
    this.loader = true;
    await HTTP.get('/admin/notifications')
        .then((response) => {
          this.notifications = response.data.notifications;

        })
        .catch(() => {
          return this.$notify({
            title: "خطا!",
            text: "خطایی در نمایش اطلاعات جدول رخ داد!",
            type: 'error',
          });
        });
    this.loader = false
  },
  methods: {
    paginateClickCallbackForNotificationList(page) {
      this.paginationProperties.currentPage = Number(page);
    },
  },
  computed: {
    getItemsOfNotificationsList() {
      let start = (this.paginationProperties.currentPage - 1) * this.paginationProperties.perPage;
      let end = this.paginationProperties.currentPage * this.paginationProperties.perPage;
      return this.notifications.slice(start, end);
    },
    getPaginateCountForList() {
      return Math.ceil(this.notifications.length / this.paginationProperties.perPage);
    },
  }
}
</script>

<style scoped>

</style>
