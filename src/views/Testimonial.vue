<template>
  <div class="card mb-4 mt-5 mx-2">
    <!-- Modal to delete -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف نظر</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف این نظر اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no" >خیر</button>
            <button type="button" class="btn btn-primary" @click="deleteOP">بله</button>
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
            <h5 class="modal-title" id="editSlideLabel">اقدام به ویرایش نظر</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">نام مشتری :</h6>
              </div>
              <input type="text" class="form-control"  placeholder=" نام مشتری" v-model="name">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">متن نظر :</h6>
              </div>
              <textarea class="form-control"  placeholder=" متن نظر" v-model="desc"/>
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">اطلاعات مشتری :</h6>
              </div>
              <textarea  class="form-control"  placeholder="اطلاعات مشتری" v-model="position" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noEdit" >انصراف</button>
            <button type="button" class="btn btn-dark" @click="editOP">ثبت</button>
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
            <h5 class="modal-title" id="addSlideLabel">اقدام به افزودن نظر</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">نام مشتری :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="نام مشتری " v-model="name">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">متن نظر :</h6>
              </div>
              <textarea class="form-control"  placeholder="متن نظر" v-model="desc"/>
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">اطلاعات مشتری :</h6>
              </div>
              <textarea class="form-control"  placeholder="اطلاعات مشتری" v-model="position"/>
            </div>


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noAdd" >انصراف</button>
            <button type="button" class="btn btn-dark" @click="addOp">ثبت</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <div class="card-header pb-0">
      <h6>نظرات کاربران فروشگاه</h6>
    </div>
    <div class="col-6 text-start px-5 py-3 me-auto">
      <vsud-button color="dark" size="lg" data-bs-toggle="modal" data-bs-target="#addSlide" >افزودن نظر</vsud-button>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              نام
            </th>
            <th
                class="text-uppercase text-secondary text-xxs text-center font-weight-bolder opacity-7 ps-2">
              اطلاعات مشتری
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              نظر
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
          <tr  v-for="(u, i) in opinions" :key="i" >
            <td>
              <p class="text-xs font-weight-bold mb-0">{{u.name}}</p>
            </td>
            <td class="align-middle text-center text-sm " width="260px">
              <p class="text-s font-weight-bold mb-0" style="display: inline">
                {{u.position}}  </p>
            </td>
            <td class="align-middle text-center text-sm " width="260px">
              <p class="text-s font-weight-bold mb-0" style="display: inline">
                {{u.desc}} </p>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{u.created_at}}</span
                >
            </td>
            <td class="align-middle text-center text-sm">
              <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                          data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                          @click="opToDel=u;index=i;" class="mx-3">حذف </vsud-badge>
              <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                          @click="id=u.id;name=u.name;desc=u.desc;position=u.position;"
                          data-bs-toggle="modal" data-bs-target="#editSlide">
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
import VsudButton from "../components/VsudButton";
import VsudBadge from "../components/VsudBadge";
import {HTTP} from "../http-common";
export default {
  name: "Testimonial",
  components: {VsudBadge, VsudButton},
  data()
  {
    return{
      opinions:[],
      index:'',
      name:'',
      desc:'',
      position:'',
      id:'',
      opToDel:''
    }
  },
  async mounted()
  {
    const testimonial = await HTTP.get('/testimonial');
    this.opinions = testimonial.data
  },
  methods:{
    async addOp()
    {
      if (this.name.trim() === '') return this.$notify({
        title: "خطا!",
        text: "نام مشتری الزامیست.",
        type: 'error',
      });
      if (this.desc.trim() === '') return this.$notify({
        title: "خطا!",
        text: "متن نظر الزامیست.",
        type: 'error',
      });
      if (this.position.trim() === '') return this.$notify({
        title: "خطا!",
        text: "اطلاعات مشتری الزامیست.",
        type: 'error',
      });

      const data = {
        name : this.name,
        desc : this.desc,
        position : this.position,
      }
      const add = await  HTTP.post('/testimonial',data)
      .catch(()=>{
         return this.$notify({
          title: " عملیات ناموفق!",
          text:add.data.msg,
          type: 'error',
        });
      });
      document.getElementById("noAdd").click()
      this.opinions.unshift(add.data.testimonial);
      this.name='';
      this.desc='';
      this.position='';
      return this.$notify({
        title: " عملیات موفق!",
        text:add.data.msg,
        type: 'success',
      });
    },
    async editOP()
    {
      if (this.name.trim() === '') return this.$notify({
        title: "خطا!",
        text: "نام مشتری الزامیست.",
        type: 'error',
      });
      if (this.desc.trim() === '') return this.$notify({
        title: "خطا!",
        text: "متن نظر الزامیست.",
        type: 'error',
      });
      if (this.position.trim() === '') return this.$notify({
        title: "خطا!",
        text: "اطلاعات مشتری الزامیست.",
        type: 'error',
      });

      const data = {
        name : this.name,
        desc : this.desc,
        position : this.position,
      }
      const add = await  HTTP.put(`/testimonial${this.id}`,data)
          .catch(()=>{
            return this.$notify({
              title: " عملیات ناموفق!",
              text:add.data.msg,
              type: 'error',
            });
          });
      document.getElementById("noEdit").click()
       this.$notify({
        title: " عملیات موفق!",
        text:add.data.msg,
        type: 'success',
      });
      window.location = '/opinions'
    },
    async deleteOP()
    {

      document.getElementById('no').click();
      const data = { id : this.opToDel.id}
      const delet = await HTTP.delete('/testimonial',{data})
          .catch(()=>{
            return this.$notify({
              title: "عملیات ناموفق!",
              text: "خطا در حذف نظر",
              type: 'error',
            });
          });
      console.log((delet))
      this.$notify({
        title: "عملیات موفق!",
        text: "نظر با موفقیت حذف گردید!",
        type: 'success',
      });
      this.opinions.splice(this.index,1);
    }
  }
}
</script>

<style scoped>

</style>
