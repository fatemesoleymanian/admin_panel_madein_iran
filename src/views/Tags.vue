<template>
  <div class="card mb-4 mt-5 mx-2">
    <!-- Modal to delete -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف تگ</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف این تگ اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no" >خیر</button>
            <button type="button" class="btn btn-primary" @click="deleteSlide">بله</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <!-- Modal to edit -->
    <div class="modal fade"

         id="editSlide" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editSlideLabel">اقدام به ویرایش تگ</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">عنوان تگ :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="عنوان تگ" v-model="name">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">نوع تگ :</h6>
              </div>
              <select class="form-select text-start " aria-label="Default select example" v-model="type">
                <option value="0">وبلاگ</option>
                <option value="1">محصول</option>
              </select>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noEdit" >انصراف</button>
            <button type="button" class="btn btn-dark" @click="editSlide">ثبت</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <!-- Modal to add -->
    <div class="modal fade"

         id="addSlide" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addSlideLabel">اقدام به افزودن تگ</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">عنوان تگ :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="عنوان تگ" v-model="name">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">نوع تگ :</h6>
              </div>
              <select class="form-select text-start " aria-label="Default select example" v-model="type">
                <option value="0">وبلاگ</option>
                <option value="1">محصول</option>
              </select>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noAdd" >انصراف</button>
            <button type="button" class="btn btn-dark" @click="addSlide">ثبت</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <div class="card-header pb-0">
      <h6>تگ ها</h6>
    </div>
    <div class="col-6 text-start px-5 py-3 me-auto">
      <vsud-button color="dark" size="lg" data-bs-toggle="modal" data-bs-target="#addSlide" v-if="create" >افزودن تگ</vsud-button>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div id="loading" v-if="loader"></div>
      <div class="table-responsive p-0" v-if="!loader" >
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              عنوان
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              نوع
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              محصولات
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              پست ها
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
          <tr  v-for="(u, i) in getItems" :key="i" >
            <td>
              <p class="text-xs font-weight-bold mb-0">{{u.name}}</p>
            </td>
            <td class="align-middle text-center text-sm " width="260px">
              <p class="text-s font-weight-bold mb-0 " style="display: inline">
                {{u.type === 0 ? 'وبلاگ' : 'محصول'}}  </p>
            </td>
            <td class="align-middle text-center text-sm " width="260px">
              <p class="text-s font-weight-bold mb-0" style="display: inline" v-for="(p,j) in u.product" :key="j">
                <router-link :to="`/product/details${p.id}`">
                {{p.name.substring(0,6)}}...,
                </router-link>
              </p>
            </td>
            <td class="align-middle text-center text-sm " width="260px">
              <p class="text-s font-weight-bold mb-0" style="display: inline;min-height: 100px;" v-for="(b,k) in u.blog" :key="k">
                <router-link :to="`/post/details${b.id}`">
                  {{b.title.substring(0,6)}}... ,
                </router-link>
              </p>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{u.created_at}}</span
                >
            </td>
            <td class="align-middle text-center text-sm">
              <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                          data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                          @click="tagToDel=u;index=i;" v-if="remove">حذف </vsud-badge>
              <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                          @click="id=u.id;name=u.name;type=u.type;"
                          data-bs-toggle="modal" data-bs-target="#editSlide" v-if="update">
                ویرایش</vsud-badge>
            </td>

          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="getPaginateCount > 1 " class="px-4 py-3 d-flex float-start">
        <pagination class="pro-pagination-style shop-pagination mt-30 "
                    v-model="tag.currentPage" :per-page="tag.perPage"
                    :records="tags.length" @paginate="paginateClickCallback"
                    :page-count="getPaginateCount" />
      </div>
    </div>

  </div>
</template>

<script>
import {HTTP} from "../http-common";
import VsudButton from "../components/VsudButton";
import VsudBadge from "../components/VsudBadge";

export default {
  name: "Tags",
  components: { VsudBadge, VsudButton},
  data()
  {
    return{
      tags:[],
      tagToDel:'',
      index:0,
      id:'',
      name:'',
      type:'',
      remove:1,
      update:1,
      create:1,
      hide:1,
      tag:{
        currentPage: 1,
        perPage: 10
      },
      loader:false
    }
  },
  async mounted(){
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions)
    {
      if (permissions[i].module.name === 'تگ ها'){
        if (permissions[i].read === 0) return window.location = '/';
        if (permissions[i].delete === 0) this.remove=0;
        if (permissions[i].create === 0) this.create=0;
        if (permissions[i].update === 0) this.update=0;
      }
    }
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
      this.loader = true
      await HTTP.get('/tags_pagi')
          .catch((e)=>{
            if(e.response.status ===500){
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              localStorage.removeItem('rgtokuukqp');
              window.location = '/sign-in'
            }
          })
          .then((tag)=> {
            this.tags = tag.data;
            this.loader = false
          });
    }
  },
  methods:{
    async deleteSlide()
    {
      const data = { id : this.tagToDel.id}
       await HTTP.delete('/tags',{data})
      .catch(()=>{
        document.getElementById('no').click();
        return this.$notify({
          title: "عملیات ناموفق!",
          text: "خطا در حذف تگ",
          type: 'error',
        });
      });

        document.getElementById('no').click();
        this.$notify({
          title: "عملیات موفق!",
          text: "تگ با موفقیت حذف گردید!",
          type: 'success',
        });
        this.tags.splice(this.index,1)

    },
    async editSlide()
    {
      if (this.name === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "عنوان تگ الزامیست.",
        type: 'error',
      });
      if (this.type === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "نوع تگ الزامیست.",
        type: 'error',
      });

      const data = {
        name : this.name,
        id : this.id,
        type : this.type,
      }
       await  HTTP.put('/tags',data)
      .catch(()=>{
        document.getElementById("noEdit").click()
        return   this.$notify({
          title: "عملیات ناموفق!",
          text: "لطفا دوباره امتحان کنید.",
          type: 'error',
        });
      });
        document.getElementById("noEdit").click()

        this.$notify({
          title: "عملیات موفق!",
          text: "تگ ویرایش شد.",
          type: 'success',
        });
        this.tags[this.index].name = this.name
        this.tags[this.index].type = this.type
      window.location = '/tags'
    },
    async addSlide()
    {
      if (this.name === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "عنوان تگ الزامیست.",
        type: 'error',
      });
      if (this.type === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "نوع تگ الزامیست.",
        type: 'error',
      });

      const data = {
        name : this.name,
        type : this.type,
      }
      const update = await  HTTP.post('/tags',data)
      .catch(()=>{
        document.getElementById("noAdd").click()
        return this.$notify({
          title: "عملیات ناموفق!",
          text: "لطفا دوباره امتحان کنید.",
          type: 'error',
        });
      });
        document.getElementById("noAdd").click()
        this.$notify({
          title: "عملیات موفق!",
          text: "تگ ایجاد شد.",
          type: 'success',
        });
        this.tags.unshift(update.data.tag)
      window.location = '/tags'
    },
    paginateClickCallback(page) {
      this.tag.currentPage = Number(page);
    },
  },
  computed: {
    getPaginateCount() {
      return Math.ceil(this.tags.length / this.tag.perPage);
    },
    getItems() {
      let start = (this.tag.currentPage - 1) * this.tag.perPage;
      let end = this.tag.currentPage * this.tag.perPage;
      return this.tags.slice(start, end);
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
