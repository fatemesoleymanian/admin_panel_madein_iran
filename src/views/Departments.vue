<template>
  <div class="card mb-4 mt-5 mx-2">
    <!-- Modal to delete -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف دپارتمان</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف این دپارتمان اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no" >خیر</button>
            <button type="button" class="btn btn-primary" @click="deleteDepa">بله</button>
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
            <h5 class="modal-title" id="editSlideLabel">اقدام به ویرایش دپارتمان</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">آیکون دپارتمان</h6>
              </div>
              <div class="border-radius-lg ">
                <div class="position-relative d-flex align-items-center justify-content-center h-100">

                  <div class="mb-4 col-xl-6 col-md-12 mx-md-2 mb-xl-0" v-if="upload" @click="uploadFake">
                    <input type="file" id="img" name="img" accept="image/*" style="opacity: 0;" @change="loadFile">
                    <place-holder-card
                        :title="{ text:uploadImg ? 'لطفا شکیبا باشد.' : 'بارگذاری آیکون', variant: 'h5' }"
                    />
                  </div>
                  <img v-else
                       width="500"
                       height="300"
                       class="w-100 position-relative z-index-2"
                       :src="'https://apidemo.madein-iran.com/public'+iconImage"
                       :alt="name"
                  />
                </div>
              </div>
              <div class="d-flex flex-row  w-50 mt-2 text-center">
                <button type="button" class="btn btn-success float-start" v-if="!upload" @click="deleteOLD" >تغییر آیکون </button>
              </div>
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">نام دپارتمان :</h6>
              </div>
              <input type="text" class="form-control"  placeholder=" نام دپارتمان" v-model="name">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">توضیحات متا:</h6>
              </div>
              <input type="text" class="form-control"  placeholder="توضیحات متا" v-model="metaDescription">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">کلید واژه های متا:</h6>
              </div>
              <input type="text" class="form-control"  placeholder="کلید واژه های متا" v-model="metaKeyword">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">عنوان صفحه :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="عنوان صفحه" v-model="pageTitle">
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noEdit" >انصراف</button>
            <button type="button" class="btn btn-dark" @click="editDepa">ثبت</button>
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
            <h5 class="modal-title" id="addSlideLabel">اقدام به افزودن دپارتمان</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">آیکون دپارتمان</h6>
              </div>
              <div class="border-radius-lg ">
                <div class="position-relative d-flex align-items-center justify-content-center h-100">

                  <div class="mb-4 col-xl-6 col-md-12 mx-md-2 mb-xl-0" v-if="uploadNew" @click="uploadNewFake">
                    <input type="file" id="imgNew" name="img" accept="image/*" style="opacity: 0;" @change="loadNewFile">
                    <place-holder-card
                        :title="{ text:uploadImg ? 'لطفا شکیبا باشید.' : 'بارگذاری آیکون', variant: 'h5' }"
                    />
                  </div>
                  <img v-else
                       width="500"
                       height="300"
                       class="w-100 position-relative z-index-2"
                       :src="'https://apidemo.madein-iran.com/public'+iconImage"
                       :alt="name"
                  />
                </div>
              </div>

            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">نام دپارتمان :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="نام دپارتمان" v-model="name">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">توضیحات متا :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="توضیحات متا" v-model="metaDescription">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">کلید واژه های متا :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="کلید واژه متا" v-model="metaKeyword">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">عنوان صفحه :</h6>
              </div>
              <input type="text" class="form-control"  placeholder=" عنوان صفحه" v-model="pageTitle">
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noAdd" >انصراف</button>
            <button type="button" class="btn btn-dark" @click="addDepa">ثبت</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <div class="card-header pb-0">
      <h6>دپارتمان ها</h6>
    </div>
    <div class="col-6 text-start px-5 py-3 me-auto">
      <vsud-button color="dark" size="lg" data-bs-toggle="modal" data-bs-target="#addSlide"
      v-if="create">افزودن دپارتمان</vsud-button>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              آیکون
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              نام
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              دسته بندی ها
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
          <tr  v-for="(u, i) in departments" :key="i" >
            <td>
              <div class="d-flex  py-1">
                <div v-if="u.iconImage">
                  <vsud-avatar
                      :img="'https://apidemo.madein-iran.com/public'+u.iconImage"
                      size="sm"
                      border-radius="md"
                      class="mx-2"
                      :alt="u.name"
                  />
                </div>
              </div>
            </td>
            <td>
              <p class="text-xs font-weight-bold mb-0">{{u.name}}</p>
            </td>
            <td>
              <router-link to="/categories">
              <p class="text-xs font-weight-bold mb-0" v-for="(c,i) in u.category" :key="i">
                {{c.name}},
              </p>
              </router-link>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{u.created_at}}</span
                >
            </td>
            <td class="align-middle text-center text-sm">
              <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                          data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                          @click="depToDel=u;index=i;"
              v-if="remove">حذف </vsud-badge>
              <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                          @click="id=u.id;name=u.name;iconImage=u.iconImage;metaDescription=u.metaDescription;metaKeyword=u.metaKeyword;
                          pageTitle=u.pageTitle"
                          data-bs-toggle="modal" data-bs-target="#editSlide" v-if="update">
                ویرایش</vsud-badge>
            </td>

          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import PlaceHolderCard from "../examples/Cards/PlaceHolderCard";
import VsudButton from "../components/VsudButton";
import VsudAvatar from "../components/VsudAvatar";
import VsudBadge from "../components/VsudBadge";
import {HTTP} from "../http-common";
export default {
  name: "Departments",
  components: {VsudBadge, VsudAvatar, VsudButton, PlaceHolderCard},
  data()
  {
    return{
      uploadImg:false,
      remove:1,
      update:1,
      create:1,
      departments:[],
      depToDel:'',
      index:0,
      id:'',
      name:'',
      iconImage:'',
      metaDescription:'',
      pageTitle:'',
      metaKeyword:'',
      upload:false,
      uploadNew:true,
    }
  },
  async mounted(){
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions)
    {
      if (permissions[i].module.name === 'دپارتمان ها'){
        if (permissions[i].read === 0) return window.location = '/';
        if (permissions[i].delete === 0) this.remove=0;
        if (permissions[i].create === 0) this.create=0;
        if (permissions[i].update === 0) this.update=0;
      }
    }
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
     await HTTP.get('/departments_with_category')
          .catch((e)=>{
            if(e.response.status ===500){
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              localStorage.removeItem('rgtokuukqp');
              window.location = '/sign-in'
            }
          })
          .then((deps)=> {
            this.departments = deps.data
          });
    }
  },
  methods:{
    async deleteDepa()
    {
      const data = { id : this.depToDel.id}
       await HTTP.delete('/departments',{data})
     .catch(()=>
     {
       document.getElementById('no').click();
       return this.$notify({
         title: "عملیات ناموفق!",
         text: "خطا در حذف دپارتمان",
         type: 'error',
       });
     });
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات موفق!",
          text: "دپارتمان با موفقیت حذف گردید!",
          type: 'success',
        });
        this.departments.splice(this.index,1)
    },
    async editDepa()
    {
      if (this.name === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "نام الزامیست.",
        type: 'error',
      });
      if (this.metaDescription === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "توضیحات متا الزامیست.",
        type: 'error',
      });
      if (this.metaKeyword === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "کلید واژه ی متا الزامیست.",
        type: 'error',
      });
      if (this.pageTitle === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "عنوان صفحه الزامیست.",
        type: 'error',
      });

      const data = {
        iconImage : this.iconImage,
        name : this.name,
        metaKeyword : this.metaKeyword,
        metaDescription : this.metaDescription,
        pageTitle : this.pageTitle,
      }
      await  HTTP.put(`/departments/${this.id}`,data)
      .catch(()=>{
        document.getElementById("noEdit").click()
        return this.$notify({
          title: "عملیات ناموفق!",
          text: "خطا در ویرایش دپارتمان.",
          type: 'success',
        });
      });

        document.getElementById("noEdit").click()
        this.$notify({
          title: "عملیات موفق!",
          text: "دپارتمان ویرایش شد.",
          type: 'success',
        });

        this.departments[this.index].iconImage = this.iconImage
        this.departments[this.index].name = this.name
    },
    uploadFake()
    {
      document.getElementById('img').click()
    },
    async loadFile(event)
    {
      this.uploadImg = true
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      formData.append("location", 'img/departments');
      const upload =  await HTTP.post('/upload',formData)
          .catch(()=>{
            this.uploadImg = false
            return this.$notify({
              title: "عملیات ناموفق!",
              text: 'خطایی رخ داد. ',
              type: 'error',
            });
          });

      this.iconImage = upload.data.file.url
      this.$notify({
        title: "عملیات موفق!",
        text: "ایکون ویرایش شد.",
        type: 'success',
      });
      this.upload = false
      this.uploadImg = false

    },
    async deleteOLD()
    {
      if (this.iconImage) {
        const data = {
          imageName: this.iconImage
        }
        const deleteUploaded = await HTTP.post('/remove_upload', data);
        if (deleteUploaded.data.success === 1) {
          this.iconImage = ''

          this.$notify({
            title: "عملیات موفق!",
            text: deleteUploaded.data.msg,
            type: 'success',
          });
          this.upload = true
          this.uploadFake()
        }
      }
      this.upload = true

    },
    uploadNewFake()
    {
      document.getElementById('imgNew').click()
    },
    async loadNewFile(event)
    {
      this.uploadImg = true
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      formData.append("location", 'img/departments');
      const upload =  await HTTP.post('/upload',formData)
          .catch(()=>{
            this.uploadImg =false
            return this.$notify({
              title: "عملیات ناموفق!",
              text:'خطایی رخ داد. ',
              type: 'error',
            });
          });

      this.iconImage = upload.data.file.url
      this.$notify({
        title: "عملیات موفق!",
        text: "آیکون ویرایش شد.",
        type: 'success',
      });
      this.uploadNew = false
      this.uploadImg = false
    },
    async addDepa()
    {
      if (this.name === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "نام الزامیست.",
        type: 'error',
      });
      if (this.metaDescription === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "توضیحات متا الزامیست.",
        type: 'error',
      });
      if (this.metaKeyword === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "کلید واژه ی متا الزامیست.",
        type: 'error',
      });
      if (this.pageTitle === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "عنوان صفحه الزامیست.",
        type: 'error',
      });

      const data = {
        iconImage : this.iconImage,
        name : this.name,
        metaKeyword : this.metaKeyword,
        metaDescription : this.metaDescription,
        pageTitle : this.pageTitle,
      }
      const update = await  HTTP.post('/departments',data)
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
          text: "دپارتمان ایجاد شد.",
          type: 'success',
        });
        this.departments.unshift(update.data.department);
        this.name = ''
        this.iconImage = ''
        this.metaDescription = ''
        this.metaKeyword = ''
        this.pageTitle = ''
    }
  }
}
</script>

<style scoped>

</style>
