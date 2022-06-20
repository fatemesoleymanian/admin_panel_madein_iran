<template>
  <div class="card mb-4 mt-5 mx-2">
    <!-- Modal to delete -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف عضو</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف این عضو اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no" >خیر</button>
            <button type="button" class="btn btn-primary" @click="deleteMember" v-if="remove">بله</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <!-- Modal to edit -->
<!--    <div class="modal fade"-->

<!--         id="editSlide" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">-->
<!--      <div class="modal-dialog">-->
<!--        <div class="modal-content">-->
<!--          <div class="modal-header">-->
<!--            <h5 class="modal-title" id="editSlideLabel">اقدام به ویرایش عضو</h5>-->
<!--            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
<!--          </div>-->
<!--          <div class="modal-body">-->
<!--            <div class="mb-3">-->
<!--              <div class="d-flex align-items-center">-->
<!--                <h6 class="mb-0 p-2"> ایمیل :</h6>-->
<!--              </div>-->
<!--              <input type="text" class="form-control"  placeholder="  ایمیل" v-model="email">-->
<!--            </div>-->
<!--            <div class="mb-3">-->
<!--              <div class="d-flex align-items-center">-->
<!--                <h6 class="mb-0 p-2">گذرواژه:</h6>-->
<!--              </div>-->
<!--              <input type="text" class="form-control"  placeholder=" گذرواژه" v-model="password">-->
<!--            </div>-->

<!--          </div>-->
<!--          <div class="modal-footer">-->
<!--            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noEdit" >انصراف</button>-->
<!--            <button type="button" class="btn btn-dark" @click="editMember">ثبت</button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <!--    modal-->
    <!-- Modal to add -->
    <div class="modal fade"

         id="addSlide" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addSlideLabel">اقدام به افزودن عضو</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2"> ایمیل :</h6>
              </div>
              <input type="email" class="form-control"  placeholder="  ایمیل" v-model="email">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2"> نام کاربری :</h6>
              </div>
              <input type="email" class="form-control"  placeholder="  نام  کاربری" v-model="username">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2"> شماره تماس :</h6>
              </div>
              <input type="email" class="form-control"  placeholder=" شماره تماس" v-model="phone_number">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2"> نشانی :</h6>
              </div>
              <input type="email" class="form-control"  placeholder=" نشانی" v-model="address">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">گذرواژه:</h6>
              </div>
              <input type="text" class="form-control"  placeholder=" گذرواژه" v-model="password">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">نقش:</h6>
              </div>
              <select class="form-select text-start " aria-label="Default select example" v-model="role_id">
                <option  v-for="(d,i) in roles" :value="d.id" :key="i">{{d.name}}</option>
              </select>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noAdd" >انصراف</button>
            <button type="button" class="btn btn-dark" @click="addMember">ثبت</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <div class="card-header pb-0">
      <h6>اعضا</h6>
    </div>
    <div class="col-6 text-start px-5 py-3 me-auto">
      <vsud-button color="dark" size="lg" data-bs-toggle="modal" data-bs-target="#addSlide"
      v-if="create">افزودن عضو</vsud-button>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              ایمیل
            </th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              نام کاربری
            </th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              نقش
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
          <tr  v-for="(u, i) in members" :key="i" >
            <td>
              <p class="text-xs font-weight-bold mb-0">{{u.email}}</p>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">
                  {{u.username}}
                </span>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">
                  {{u.role.name}}
                </span>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">
                  {{u.created_at}}
                </span>
            </td>
            <td class="align-middle text-center text-sm">
              <vsud-badge v-if="check !== u.email "
                  color="dark" variant="gradient" size="lg" style="cursor:pointer"
                          data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                          @click="memToDel=u;index=i;">
                حذف
              </vsud-badge>
<!--              <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"-->
<!--                          @click="id=u.id;name=u.name;iconImage=u.iconImage;metaDescription=u.metaDescription;metaKeyword=u.metaKeyword;-->
<!--                          pageTitle=u.pageTitle"-->
<!--                          data-bs-toggle="modal" data-bs-target="#editSlide">-->
<!--                ویرایش-->
<!--              </vsud-badge>-->
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
import {HTTP} from "../http-common";
import VsudBadge from "../components/VsudBadge";
export default {
  name: "Admins",
  components: {VsudBadge, VsudButton},
  data()
  {
    return{
      members:[],
      memToDel:'',
      index:0,
      id:'',
      email:'',
      username:'',
      password:'',
      phone_number:'',
      address:'',
      role_id:'',
      roles:[],
      check:'',
      create:1,
      remove:1
      }
  },
  async mounted(){
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions)
    {
      if (permissions[i].module.name === 'اعضا پنل کنترل'){

        if (permissions[i].read === 0) return window.location = '/';
        if (permissions[i].delete === 0) this.remove=0;
        if (permissions[i].create === 0) this.create=0;
      }
    }
    const user = JSON.parse(localStorage.getItem('wugt'));
    this.check = user.email;
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';

    else {
       await HTTP.get('admins/show')
          .catch((e)=>{
            if(e.response.status ===500){
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              localStorage.removeItem('rgtokuukqp');
              window.location = '/sign-in'
            }
          })
          .then((res)=>{
      this.members = res.data.admins});
    }
  },
  async created()
  {
    const role = await HTTP.get('admin/role')
    .catch(()=>{
       this.$notify({
        title: "خطا!",
        text: 'خطایی در ارتباط با سرور رخ داد.',
        type: 'error',
      });
    });
    this.roles = role.data.roles
  },
  methods:{
    async deleteMember()
    {
      const data = { id : this.memToDel.id}
      const delet = await HTTP.delete('admin/delete',{data})
          .catch(()=>
          {
            document.getElementById('no').click();
            return this.$notify({
              title: "عملیات ناموفق!",
              text: "خطا در حذف عضو",
              type: 'error',
            });
          });
      console.log(delet);
      document.getElementById('no').click();
      this.$notify({
        title: "عملیات موفق!",
        text: "عضو با موفقیت حذف گردید!",
        type: 'success',
      });
      this.members.splice(this.index,1)
    },
    // async editMember()
    // {
    //   if (this.email.trim() === '') return this.$notify({
    //     title: "عملیات ناموفق!",
    //     text: "ایمیل الزامیست.",
    //     type: 'error',
    //   });
    //   if (this.password.trim() === '') return this.$notify({
    //     title: "عملیات ناموفق!",
    //     text: " گذرواژه الزامیست.",
    //     type: 'error',
    //   });
    //   if (this.metaKeyword === '') return this.$notify({
    //     title: "عملیات ناموفق!",
    //     text: "کلید واژه ی متا الزامیست.",
    //     type: 'error',
    //   });
    //   if (this.pageTitle === '') return this.$notify({
    //     title: "عملیات ناموفق!",
    //     text: "عنوان صفحه الزامیست.",
    //     type: 'error',
    //   });
    //
    //   const data = {
    //     iconImage : this.iconImage,
    //     name : this.name,
    //     metaKeyword : this.metaKeyword,
    //     metaDescription : this.metaDescription,
    //     pageTitle : this.pageTitle,
    //   }
    //   const update = await  HTTP.put(`/departments/${this.id}`,data)
    //       .catch(()=>{
    //         document.getElementById("noEdit").click()
    //         return this.$notify({
    //           title: "عملیات ناموفق!",
    //           text: "خطا در ویرایش دپارتمان.",
    //           type: 'success',
    //         });
    //       });
    //   console.log(update)
    //
    //   document.getElementById("noEdit").click()
    //   this.$notify({
    //     title: "عملیات موفق!",
    //     text: "دپارتمان ویرایش شد.",
    //     type: 'success',
    //   });
    //
    //   this.departments[this.index].iconImage = this.iconImage
    //   this.departments[this.index].name = this.name
    // },
    async addMember()
    {
      if (this.email.trim() === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "ایمیل الزامیست.",
        type: 'error',
      });
      if (this.password.trim() === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: " گذرواژه الزامیست.",
        type: 'error',
      });
      if (this.password.length > 15 || this.password.length < 6) return this.$notify({
        title: "عملیات ناموفق!",
        text: "گذرواژه باید حداقا 6 کاراکتر و حداکثر 15 کاراکتر باشد.",
        type: 'error',
      });
      if (this.role_id === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: " نقش الزامیست.",
        type: 'error',
      });

      const data = {
        email : this.email,
        password : this.password,
        role : this.role_id,
        phone_number:this.phone_number,
        username:this.username,
        address:this.address,
      }
       await  HTTP.post('/admin/auth/register',data)
          .then(()=>{

            this.$notify({
              title: "عملیات موفق!",
              text: "عضو ایجاد شد.",
              type: 'success',
            });
            window.location = '/admins'
          })
          .catch((er)=>{
            document.getElementById("noAdd").click()
            return this.$notify({
              title: "عملیات ناموفق!",
              text: er.response.data.message,
              type: 'error',
            });
          });
      document.getElementById("noAdd").click();

    }
  }
}
</script>

<style scoped>

</style>
