<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
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
                  آیا از حذف کاربر اطمینان دارید؟
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no">خیر</button>
                  <button type="button" class="btn btn-primary" @click="deleteUser">بله</button>
                </div>
              </div>
            </div>
          </div>
          <!--    modal-->
          <div class="card-header pb-0">
            <h6>جدول کاربران فروشگاه</h6>
          </div>
          <div class="px-4">
            <vue3-json-excel
                :json-data="users"
                :fields="user_fields"
                name="کاربران ثبت نامی ساخت ایران"
                class="cursor-pointer">
              <button class="btn btn-dark fa-pull-left" style="font-size: 0.9em">خروجی اکسل</button>
            </vue3-json-excel>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div id="loading" v-if="loader"></div>
            <div class="table-responsive p-0" v-if="!loader">
              <table class="table align-items-center mb-0">
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
                    شماره تلفن همراه
                  </th>
                  <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    اقدامات
                  </th>
                  <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    تاریخ ساخت حساب
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(u, i) in getItems" :key="i">
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div>
                        <vsud-avatar
                            :img="img1"
                            size="sm"
                            border-radius="lg"
                            class="me-3"
                            :alt="u.name"
                        />
                        <i v-if="u.is_customer === 'بله'" class="bi bi-star-fill" style="font-size: 10px"
                           title="این کاربر از مشتریان ساخت ایران است و از ویدئوهای آموزشی دیدن کرده است."></i>
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">{{ u.name }}</h6>
                        <p class="text-xs text-secondary mb-0">
                          {{ u.email }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ u.phone_number }}</p>
                  </td>
                  <td class="align-middle text-center text-sm ">
                    <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                @click="userToDel=u" v-if="remove"
                    >حذف
                    </vsud-badge
                    >
                    <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                                @click="$router.push(`/users/details${u.id}`)"
                    >جزئیات
                    </vsud-badge
                    >
                  </td>
                  <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{ u.created_at }}</span
                >
                  </td>

                </tr>
                </tbody>
              </table>
            </div>
            <div v-if="getPaginateCount > 1 " class="px-4 py-3 d-flex float-start">
              <pagination class="pro-pagination-style shop-pagination mt-30 "
                          v-model="user.currentPage" :per-page="user.perPage"
                          :records="users.length" @paginate="paginateClickCallback"
                          :page-count="getPaginateCount"/>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {HTTP} from '../http-common'

import img1 from "../assets/img/team-2.jpg";
import VsudAvatar from "../components/VsudAvatar";
import VsudBadge from "../components/VsudBadge";

export default {
  name: "users",
  data() {
    return {
      user: {
        currentPage: 1,
        perPage: 10
      },
      users: [],
      paginate: {},
      remove: 1,
      img1,
      userToDel: '',
      hide: 1,
      user_fields: {
        "آیدی": "id",
        "نام و نام خانوادگی": "name",
        "شماره تلفن همراه": "phone_number",
        "نشانی": "address",
        "نام شرکت": "company_name",
        "ایمیل": "email",
        "تلفن ثابت": "home_number",
        "نماینده است": "is_customer",
        "شغل": "job",
        "کدملی": "national_id",
        "تاریخ ساخت اکانت": "created_at"
      },
      loader: false
    }
  },
  components: {
    VsudBadge,
    VsudAvatar
  },
  async mounted() {
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions) {
      if (permissions[i].module.name === 'کاربران') {
        if (permissions[i].read === 0) return window.location = '/';
        if (permissions[i].delete === 0) this.remove = 0;
      }
    }
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
      this.loader = true
      await HTTP.get('/users')
          .catch((e) => {
            if (e.response.status === 500) {
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              localStorage.removeItem('rgtokuukqp');
              window.location = '/sign-in'
            }
          })
          .then((users) => {
            this.users = users.data;
            for (let i in this.users)
            {
              this.users[i].is_customer = this.users[i].is_customer ? "بله" : "خیر"
            }
            this.loader = false
          });
    }
  },
  methods: {
    async deleteUser() {
      const data = {
        id: this.userToDel.id
      }
      const delet = await HTTP.delete('/delete_acc', {data})
      if (delet.status === 200) {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات موفق!",
          text: "کاربر با موفقیت حذف گردید!",
          type: 'success',
        });

        window.location = '/users'
      } else {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات ناموفق!",
          text: "خطا در حذف کاربر",
          type: 'error',
        });
      }
    },
    paginateClickCallback(page) {
      this.user.currentPage = Number(page);
    },
  },
  computed: {
    getPaginateCount() {
      return Math.ceil(this.users.length / this.user.perPage);
    },
    getItems() {
      let start = (this.user.currentPage - 1) * this.user.perPage;
      let end = this.user.currentPage * this.user.perPage;
      return this.users.slice(start, end);
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
