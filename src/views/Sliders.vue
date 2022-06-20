<template>
  <div class="card mb-4 mt-5 mx-2">
    <!-- Modal to delete -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف اسلاید</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف این اسلاید اطمینان دارید؟
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
            <h5 class="modal-title" id="editSlideLabel">اقدام به ویرایش اسلاید</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <div class="mb-3">
                <div class="d-flex align-items-center">
                  <h6 class="mb-0 p-2">عکس اسلاید</h6>
                </div>
                <div class="border-radius-lg ">
                  <div class="position-relative d-flex align-items-center justify-content-center h-100">

                    <div class="mb-4 col-xl-6 col-md-12 mx-md-2 mb-xl-0" v-if="upload" @click="uploadFake">
                      <input type="file" id="img" name="img" accept="image/*" style="opacity: 0;" @change="loadFile">
                      <place-holder-card
                          :title="{ text: 'بارگذاری عکس اسلاید', variant: 'h5' }"
                      />
                    </div>
                    <img v-else
                         width="500"
                         height="300"
                         class="w-100 position-relative z-index-2"
                         :src="'http://localhost:8000'+image"
                         :alt="title"
                    />
                  </div>
                </div>
                <div class="d-flex flex-row  w-50 mt-2 text-center">
                  <button type="button" class="btn btn-success float-start" v-if="!upload" @click="deleteOLD" >تغییر عکس </button>
                </div>
              </div>
              <div class="mb-3">
                <div class="d-flex align-items-center">
                  <h6 class="mb-0 p-2">متن اسلاید :</h6>
                </div>
                <input type="text" class="form-control"  placeholder=" متن اسلاید" v-model="text">
              </div>
              <div class="mb-3">
                <div class="d-flex align-items-center">
                  <h6 class="mb-0 p-2">تیتر اسلاید :</h6>
                </div>
                <input type="text" class="form-control"  placeholder=" تیتر اسلاید" v-model="title">
              </div>
              <div class="mb-3">
                <div class="d-flex align-items-center">
                  <h6 class="mb-0 p-2">تیتر دوم اسلاید :</h6>
                </div>
                <input type="text" class="form-control"  placeholder=" تیتر دوم اسلاید" v-model="sub_title">
              </div>
              <div class="mb-3">
                <div class="d-flex align-items-center">
                  <h6 class="mb-0 p-2">لینک دکمه اسلاید :</h6>
                </div>
                <input type="text" class="form-control"  placeholder=" لینک دکمه اسلاید" v-model="link">
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
            <h5 class="modal-title" id="addSlideLabel">اقدام به افزودن اسلاید</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">عکس اسلاید</h6>
              </div>
              <div class="border-radius-lg ">
                <div class="position-relative d-flex align-items-center justify-content-center h-100">

                  <div class="mb-4 col-xl-6 col-md-12 mx-md-2 mb-xl-0" v-if="uploadNew" @click="uploadNewFake">
                    <input type="file" id="imgNew" name="img" accept="image/*" style="opacity: 0;" @change="loadNewFile">
                    <place-holder-card
                        :title="{ text: 'بارگذاری عکس اسلاید', variant: 'h5' }"
                    />
                  </div>
                  <img v-else
                       width="500"
                       height="300"
                       class="w-100 position-relative z-index-2"
                       :src="'http://localhost:8000'+image"
                       :alt="title"
                  />
                </div>
              </div>

            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">متن اسلاید :</h6>
              </div>
              <input type="text" class="form-control"  placeholder=" متن اسلاید" v-model="text">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">تیتر اسلاید :</h6>
              </div>
              <input type="text" class="form-control"  placeholder=" تیتر اسلاید" v-model="title">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">تیتر دوم اسلاید :</h6>
              </div>
              <input type="text" class="form-control"  placeholder=" تیتر دوم اسلاید" v-model="sub_title">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">لینک دکمه اسلاید :</h6>
              </div>
              <input type="text" class="form-control"  placeholder=" لینک دکمه اسلاید" v-model="link">
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
      <h6>اسلایدر صفحه اول فروشگاه</h6>
    </div>
    <div class="col-6 text-start px-5 py-3 me-auto">
      <vsud-button color="dark" size="lg" data-bs-toggle="modal" data-bs-target="#addSlide" v-if="create">افزودن اسلاید</vsud-button>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              عکس
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              تیتر
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              تیتر دوم
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              متن
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              لینک دکمه
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
          <tr  v-for="(u, i) in slides" :key="i" >
            <td>
              <div class="d-flex  py-1">
                <div >
                  <vsud-avatar
                      :img="'http://localhost:8000'+u.image"
                      size="sm"
                      border-radius="md"
                      class="mx-2"
                      :alt="u.title"
                  />
                </div>
              </div>
            </td>
            <td>
              <p class="text-xs font-weight-bold mb-0">{{u.title}}</p>
            </td>
            <td class="align-middle text-center text-sm " width="260px">
              <p class="text-s font-weight-bold mb-0" style="display: inline">
                {{u.sub_title}}  </p>
            </td>
            <td class="align-middle text-center text-sm " width="260px">
              <p class="text-s font-weight-bold mb-0" style="display: inline">
                {{u.text}} </p>
            </td>
            <td class="align-middle text-center text-sm " width="260px">
              <p class="text-s font-weight-bold mb-0" style="display: inline">
                {{u.link}} </p>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{u.created_at}}</span
                >
            </td>
            <td class="align-middle text-center text-sm">
              <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                          data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                          @click="slideToDel=u;index=i;" v-if="remove">حذف </vsud-badge>
              <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                          @click="id=u.id;title=u.title;sub_title=u.sub_title;text=u.text;link=u.link;image=u.image"
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
import VsudAvatar from "../components/VsudAvatar";
import VsudButton from "../components/VsudButton";
import VsudBadge from "../components/VsudBadge";
import {HTTP} from "../http-common";
import PlaceHolderCard from "../examples/Cards/PlaceHolderCard";

export default {
  name: "Sliders",
  components: {PlaceHolderCard, VsudAvatar, VsudButton, VsudBadge},
  data()
  {
    return{
      remove:1,
      update:1,
      create:1,
      slides:[],
      slideToDel:'',
      index:0,
      id:'',
      title:'',
      sub_title:'',
      text:'',
      image:'',
      link:'',
      upload:false,
      uploadNew:true,
    }
  },
  async mounted(){
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions)
    {
      if (permissions[i].module.name === 'اسلایدر'){
        if (permissions[i].read === 0) return window.location = '/';
        if (permissions[i].delete === 0) this.remove=0;
        if (permissions[i].create === 0) this.create=0;
        if (permissions[i].update === 0) this.update=0;
      }
    }
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
       await HTTP.get('/slider')
          .catch((e)=>{
            if(e.response.status ===500){
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              localStorage.removeItem('rgtokuukqp');
              window.location = '/sign-in'
            }
          })
          .then((slides)=> {
            this.slides = slides.data
          });
    }
  },
  methods:{
    async deleteSlide()
    {
    const data = { id : this.slideToDel.id}
      const delet = await HTTP.delete('/slider',{data})
      if (delet.status === 200)
      {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات موفق!",
          text: "اسلاید با موفقیت حذف گردید!",
          type: 'success',
        });
        this.slides.splice(this.index,1)
      }
      else {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات ناموفق!",
          text: "خطا در حذف اسلاید",
          type: 'error',
        });
      }
    },
    async editSlide()
    {
      if (this.image === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "عکس اسلاید الزامیست.",
        type: 'error',
      });

      const data = {
        image : this.image,
        id : this.id,
        title : this.title,
        sub_title : this.sub_title,
        text : this.text,
        link : this.link,
      }
      const update = await  HTTP.put('/slider',data)

      if (update.status === 200) {
        document.getElementById("noEdit").click()

              this.$notify({
                title: "عملیات موفق!",
                text: "اسلاید ویرایش شد.",
                type: 'success',
              });
        this.slides[this.index].image = this.image
        this.slides[this.index].text = this.text
        this.slides[this.index].title = this.title
        this.slides[this.index].sub_title = this.sub_title
        this.slides[this.index].link = this.link
      }
      else {
          this.$notify({
            title: "عملیات ناموفق!",
            text: "لطفا دوباره امتحان کنید.",
            type: 'error',
          });
      }

    },
    uploadFake()
    {
      console.log('upload fake')
      document.getElementById('img').click()
    },
    async loadFile(event)
    {
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      formData.append("location", 'img/sliders/home');
      const upload =  await HTTP.post('/upload_slider',formData)
      .catch(()=>{
        return this.$notify({
          title: "عملیات ناموفق!",
          text: 'حداکثر ابعاد مورد قبول تصویر :800در 1920 ',
          type: 'error',
        });
      });

      this.image = upload.data.file.url
      this.$notify({
        title: "عملیات موفق!",
        text: "عکس ویرایش شد.",
        type: 'success',
      });
      this.upload = false

    },
    async deleteOLD()
    {
      console.log('here')
      const data = {
        imageName : this.image
      }
      const deleteUploaded = await HTTP.post('/remove_upload',data);
      if (deleteUploaded.data.success === 1) {
        this.image = ''

        this.$notify({
          title: "عملیات موفق!",
          text: deleteUploaded.data.msg,
          type: 'success',
        });
        this.upload = true
        this.uploadFake()
      }
      else {
        this.$notify({
          title: "عملیات ناموفق!",
          text: deleteUploaded.data.msg,
          type: 'error',
        });
      }
    },
    uploadNewFake()
    {
      document.getElementById('imgNew').click()
    },
    async loadNewFile(event)
    {
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      formData.append("location", 'img/sliders/home');
      const upload =  await HTTP.post('/upload_slider',formData)
          .catch(()=>{
            return this.$notify({
              title: "عملیات ناموفق!",
              text: 'حداکثر ابعاد مورد قبول تصویر :800در 1920 ',
              type: 'error',
            });
          });

      this.image = upload.data.file.url
      this.$notify({
        title: "عملیات موفق!",
        text: "عکس ویرایش شد.",
        type: 'success',
      });
      this.uploadNew = false
    },
    async addSlide()
    {
      if (this.image === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "عکس اسلاید الزامیست.",
        type: 'error',
      });

      const data = {
        image : this.image,
        title : this.title,
        sub_title : this.sub_title,
        text : this.text,
        link : this.link,
      }
      const update = await  HTTP.post('/slider',data)

      if (update.status === 200) {
        document.getElementById("noAdd").click()

        this.$notify({
          title: "عملیات موفق!",
          text: "اسلاید ایجاد شد.",
          type: 'success',
        });
        this.slides.unshift(update.data.slider)

      }
      else {
        this.$notify({
          title: "عملیات ناموفق!",
          text: "لطفا دوباره امتحان کنید.",
          type: 'error',
        });
      }

    }
  }
}
</script>

<style scoped>

</style>
