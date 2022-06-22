<template>
  <div class="py-4 container-fluid">
    <!-- Modal to delete -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف نقش</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف این نقش اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no" >خیر</button>
            <button type="button" class="btn btn-primary" @click="deletee">بله</button>
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
            <h5 class="modal-title" id="editSlideLabel">اقدام به ویرایش نقش </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">عنوان نقش</h6>
              </div>
              <input type="text" class="form-control"  placeholder="عنوان نقش" v-model="name">
            </div>
        </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noEdit" >انصراف</button>
            <button type="button" class="btn btn-dark" @click="edit">ثبت</button>
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
            <h5 class="modal-title" id="addSlideLabel">اقدام به افزودن نقش</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">عنوان نقش</h6>
              </div>
              <input type="text" class="form-control"  placeholder="عنوان نقش" v-model="name">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noAdd" >انصراف</button>
            <button type="button" class="btn btn-dark" @click="add">ثبت</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
<!--    modal for permissions-->
    <div class="modal fade"

         id="permissions" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="permissionsLabel">دسترسی های نقش</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                <tr>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    ماژول
                  </th>
                  <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                   مشاهده
                  </th>
                  <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    ویرایش
                  </th>
                  <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    ایجاد
                  </th>
                  <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    حذف
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(u, i) in permissions" :key="i">
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ u.created_at }}</p>
                  </td>
                  <td>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" :v-model="u.read" :checked="u.read"
                             @change="u.read=!u.read" >
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" :v-model="u.update" :checked="u.update"
                             @change="u.update=!u.update">
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" :checked="u.create" :v-model="u.create"
                             @change="u.create=!u.create">
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" :v-model="u.delete" :checked="u.delete"
                             @change="u.delete=!u.delete">
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="changePermission"
            v-if="check !== roleTmp">ثبت</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noShow" >بستن</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal for permissions-->

    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <div class="col-6 text-start px-5 py-3 me-auto">
              <vsud-button color="dark" size="md" data-bs-toggle="modal" data-bs-target="#addSlide" v-if="create">
                افزودن نقش</vsud-button>
            </div>
            <h6>نقش ها در پنل ادمین</h6>
          </div>
          <button  data-bs-toggle="modal" data-bs-target="#permissions" hidden id="hiddeibBtn"></button>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                <tr>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    عنوان
                  </th>
                  <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    تاریخ ثبت
                  </th>
                  <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    اقدامات
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(u, i) in roles" :key="i">
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ u.name }}</p>
                  </td>
                  <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{ u.created_at }}</span>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                @click="roleToDel=u;index=i;" v-if="remove && u.id !== check">حذف
                    </vsud-badge>
                    <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                                @click="name=u.name;id=u.id;"
                                data-bs-toggle="modal" data-bs-target="#editSlide" v-if="update && u.id !== check">
                      ویرایش
                    </vsud-badge>
                    <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                                @click="setTable(u)" v-if="update">
                      دسترسی
                    </vsud-badge>
                  </td>
                </tr>
                </tbody>
              </table>

            </div>
            <!--            <vsud-pagination class="my-3 float-start  mx-4" v-if="emptyIdeas.length" color="success" size="sm">-->
            <!--              <vsud-pagination-item v-for="(e,i) in empties.data.users.links" :key="i"-->
            <!--                                    :label="checkLabel(e.label)" :active="e.active" @click="updateEmpties(e.label)"-->
            <!--              />-->
            <!--            </vsud-pagination>-->
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {HTTP} from "../http-common";
import VsudButton from "../components/VsudButton";
import VsudBadge from "../components/VsudBadge";

export default {
  name: "Roles",
  components: {VsudBadge, VsudButton},
  data()
  {
    return{
      index:'',
      roleToDel:'',
        name:'',
      id:'',
      permissions:[],
       roles:[],
      modules:[],
      create:1,
      update:1,
      remove:1,
      check:'',
      roleTmp:''
    }
  },
  async mounted()
  {
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions)
    {
      if (permissions[i].module.name === 'نقش ها'){
        if (permissions[i].read === 0) return window.location = '/';
        if (permissions[i].delete === 0) this.remove=0;
        if (permissions[i].create === 0) this.create=0;
        if (permissions[i].update === 0) this.update=0;
      }
    }
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
       await Promise.all([
        HTTP.get('/admin/role'),
        HTTP.get('/modules'),
      ])
          .catch((e)=>{
            if(e.response.status ===500){
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              localStorage.removeItem('rgtokuukqp');
              window.location = '/sign-in'
            }
          })
          .then((res)=> {
            this.roles = res[0].data.roles;
            this.modules = res[1].data;
          });
      const user = JSON.parse(localStorage.getItem('wugt'));
      this.check = user.role_id;
    }
  },
  methods:{
    async changePermission()
    {
      await HTTP.put('/permission',{permissions:this.permissions})
      .catch(()=>{
        return this.$notify({
          title: "عملیات ناموفق!",
          text:'خطایی در ثبت تغییرات رخ داد!',
          type: 'error',
        });
      });
      document.getElementById("noShow").click()
      this.$notify({
        title: "عملیات موفق!",
        text: "تغییرات ثبت گردید.",
        type: 'success',
      });
    },
    async add() {

        if (this.name.trim() === '') return this.$notify({
          title: "!خطا",
          text: "عنوان  نقش الزامیست! ",
          type: 'error',
        });

       const name= await HTTP.post('/admin/role',{name:this.name})
            .catch(()=>{
              return this.$notify({
                title: "عملیات ناموفق!",
                text: 'خطا در افزودن نقش.',
                type: 'error',
              });
            });
        document.getElementById("noAdd").click()
        this.$notify({
          title: "عملیات موفق!",
          text: "نقش ایجاد شد.",
          type: 'success',
        });
        this.roles.unshift(name.data.role)
    },
    async edit() {
      if (this.name.trim() === '') return this.$notify({
        title: "!خطا",
        text: "عنوان  نقش الزامیست! ",
        type: 'error',
      });

      await HTTP.put('/admin/role',{name:this.name,id:this.id})
          .catch(()=>{
            return this.$notify({
              title: "عملیات ناموفق!",
              text: 'خطا در تغییر نقش.',
              type: 'error',
            });
          });
      document.getElementById("noEdit").click()
      this.$notify({
        title: "عملیات موفق!",
        text: "نقش تغییر داده شد.",
        type: 'success',
      });
      // window.location = '/roles'
    },
    async deletee() {

      const data= {id:this.roleToDel.id}
      await HTTP.delete('/admin/role',{data})
          .catch(()=>{
            return this.$notify({
              title: "عملیات ناموفق!",
              text: 'خطا در حذف نقش.',
              type: 'error',
            });
          });
      document.getElementById("no").click()
      this.$notify({
        title: "عملیات موفق!",
        text: "نقش حذف شد. لطفا نقش کاربران با این نقش را تغییر دهید.",
        type: 'success',
      });
      this.roles.splice(this.index,1)
    },
    setTable(p)
    {
      this.roleTmp = p.id
      this.permissions = ''
      for (let i in p.permission)
      {
        for (let j in this.modules)
        {
          if (p.permission[i].module_id === this.modules[j].id) p.permission[i].created_at=this.modules[j].name;
        }
      }
      this.permissions = p.permission
      document.getElementById("hiddeibBtn").click();
    }
  },
}
</script>

<style scoped>

</style>
