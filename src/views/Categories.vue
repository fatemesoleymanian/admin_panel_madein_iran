<template>
  <div class="py-4 container-fluid">
    <!-- Modal to delete -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف دسته بندی</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف این دسته بندی اطمینان دارید؟
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
            <h5 class="modal-title" id="editSlideLabel">اقدام به ویرایش دسته بندی</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="flag">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">آیکون دسته بندی</h6>
              </div>
              <div class="border-radius-lg ">
                <div class="position-relative d-flex align-items-center justify-content-center h-100">

                  <div class="mb-4 col-xl-6 col-md-12 mx-md-2 mb-xl-0" v-if="upload" @click="uploadFake">
                    <input type="file" id="img" name="img" accept="image/*" style="opacity: 0;" @change="loadFile">
                    <place-holder-card
                        :title="{ text: 'بارگذاری آیکون', variant: 'h5' }"
                    />
                  </div>
                  <img v-else
                       width="500"
                       height="300"
                       class="w-100 position-relative z-index-2"
                       :src="'http://localhost:8000'+product.iconImage"
                       :alt="product.name"
                  />
                </div>
              </div>
              <div class="d-flex flex-row  w-50 mt-2 text-center">
                <button type="button" class="btn btn-success float-start" v-if="!upload" @click="deleteOLD" >تغییر آیکون </button>
              </div>
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">عنوان دسته بندی :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="عنوان دسته بندی" v-model="product.name">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">دپارتمان :</h6>
              </div>
              <select class="form-select text-start " aria-label="Default select example" v-model="product.department_id">
                <option  v-for="(d,i) in departments" :value="d.id" :key="i">{{d.name}}</option>
              </select>
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">توضیحات متا دسته بندی :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="توضیحات متا دسته بندی" v-model="product.metaDescription">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">کلیدواژه متا دسته بندی :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="کلیدواژه متا دسته بندی" v-model="product.metaKeyword">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2"> عنوان صفحه دسته بندی :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="عنوان صفحه دسته بندی" v-model="product.pageTitle">
            </div>
          </div>
          <div class="modal-body" v-if="!flag">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">عنوان دسته بندی :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="عنوان دسته بندی" v-model="blog.name">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">توضیحات متا دسته بندی :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="توضیحات متا دسته بندی" v-model="blog.metaDescription">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">کلیدواژه متا دسته بندی :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="کلیدواژه متا دسته بندی" v-model="blog.metaKeyword">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2"> عنوان صفحه دسته بندی :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="عنوان صفحه دسته بندی" v-model="blog.pageTitle">
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
            <h5 class="modal-title" id="addSlideLabel">اقدام به افزودن دسته بندی</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="flag">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">آیکون دسته بندی</h6>
              </div>
              <div class="border-radius-lg ">
                <div class="position-relative d-flex align-items-center justify-content-center h-100">

                  <div class="mb-4 col-xl-6 col-md-12 mx-md-2 mb-xl-0" v-if="uploadNew" @click="uploadNewFake">
                    <input type="file" id="imgNew" name="img" accept="image/*" style="opacity: 0;" @change="loadNewFile">
                    <place-holder-card
                        :title="{ text: 'بارگذاری آیکون', variant: 'h5' }"
                    />
                  </div>
                  <img v-else
                       width="500"
                       height="300"
                       class="w-100 position-relative z-index-2"
                       :src="'http://localhost:8000'+product.iconImage"
                       :alt="product.name"
                  />
                </div>
              </div>

            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">عنوان دسته بندی :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="عنوان دسته بندی" v-model="product.name">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">دپارتمان :</h6>
              </div>
              <select class="form-select text-start " aria-label="Default select example" v-model="product.department_id">
                <option  v-for="(d,i) in departments" :value="d.id" :key="i">{{d.name}}</option>
              </select>
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">توضیحات متا دسته بندی :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="توضیحات متا دسته بندی" v-model="product.metaDescription">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">کلیدواژه متا دسته بندی :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="کلیدواژه متا دسته بندی" v-model="product.metaKeyword">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2"> عنوان صفحه دسته بندی :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="عنوان صفحه دسته بندی" v-model="product.pageTitle">
            </div>
          </div>
          <div class="modal-body" v-if="!flag">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">عنوان دسته بندی :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="عنوان دسته بندی" v-model="blog.name">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">توضیحات متا دسته بندی :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="توضیحات متا دسته بندی" v-model="blog.metaDescription">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">کلیدواژه متا دسته بندی :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="کلیدواژه متا دسته بندی" v-model="blog.metaKeyword">
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2"> عنوان صفحه دسته بندی :</h6>
              </div>
              <input type="text" class="form-control"  placeholder="عنوان صفحه دسته بندی" v-model="blog.pageTitle">
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
    <!--   product category-->

    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <div class="col-6 text-start px-5 py-3 me-auto">
              <vsud-button color="dark" size="md" data-bs-toggle="modal" data-bs-target="#addSlide"
              @click="flag=true" v-if="create">افزودن دسته بندی</vsud-button>
            </div>
            <h6>دسته بندی های محصولات</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                <tr>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                   آیکون
                  </th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                   عنوان
                  </th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    دپارتمان
                  </th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    محصولات
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
                <tr v-for="(u, i) in product_cat.data" :key="i">
                  <td>
                    <div class="d-flex  py-1">
                      <div >
                        <vsud-avatar
                            :img="'http://localhost:8000'+u.iconImage"
                            size="sm"
                            border-radius="md"
                            class="mx-2"
                            :alt="u.name"
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ u.name }}</p>
                  </td>
                  <td>
                    <router-link to="/departments">
                    <p class="text-xs font-weight-bold mb-0">{{ u.department.name }}</p>
                    </router-link>
                  </td>
                  <td>
                    <p class="text-sm font-weight-bold mb-0" v-for="(p,j) in u.product" :key="j" style="overflow-y: scroll">
                      <router-link :to="`/product/details${p.id}`">
                        {{ p.name }} ,
                      </router-link></p>
                  </td>
                  <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{ u.created_at }}</span>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                @click="pcatToDel=u;proIndex=i;flag=true" v-if="remove">حذف </vsud-badge>
                    <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                                @click="product.id=u.id;product.iconImage=u.iconImage;product.name=u.name;flag=true;
                                   product.department_id=u.department_id;product.metaKeyword=u.metaKeyword;product.metaDescription=u.metaDescription;
                                      product.pageTitle=u.pageTitle"
                                data-bs-toggle="modal" data-bs-target="#editSlide" v-if="update">
                      ویرایش</vsud-badge>
                  </td>
                </tr>
                </tbody>
              </table>

            </div>
            <vsud-pagination class="my-3 float-start  mx-5" color="success" size="sm">
              <vsud-pagination-item v-for="(e,i) in product_cat.links" :key="i" v-show="hide2"
                                    :label="checkLabel2(e.label)" :active="e.active" @click="updateCategory(e.label)"/>
            </vsud-pagination>
          </div>

        </div>
      </div>
    </div>
    <!--  blog category-->
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <div class="col-6 text-start px-5 py-3 me-auto">
              <vsud-button color="dark" size="md" data-bs-toggle="modal" data-bs-target="#addSlide"
              @click="flag=false" v-if="create">افزودن دسته بندی</vsud-button>
            </div>
            <h6>دسته بندیهای وبلاگ</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                <tr>
                  <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                   عنوان
                  </th>
                  <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                   پست ها
                  </th>
                  <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                    تاریخ ثبت
                  </th>
                  <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    اقدامات
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(idea,i) in blog_cat.data" :key="i" >
                  <td>
                    <p class="text-sm font-weight-bold mb-0">{{idea.name}}</p>
                  </td>
                  <td>
                    <p class="text-sm font-weight-bold mb-0" v-for="(p,j) in idea.blog"  :key="j">
                      <router-link :to="`/post/details${p.id}`">
                        {{p.title}}
                      </router-link>
                    </p>
                  </td>
                  <td class="align-middle text-center ">
                    <p class="text-sm font-weight-bold">{{idea.created_at}}</p>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                @click="bcatToDel=idea;blogIndex=i;flag=false;" v-if="remove">
                      حذف
                    </vsud-badge>
                    <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                                @click="blog.id=idea.id;blog.name=idea.name;blog.metaDescription=idea.metaDescription;
                                blog.metaKeyword=idea.metaKeyword;blog.pageTitle=idea.pageTitle;flag=false;"
                                data-bs-toggle="modal" data-bs-target="#editSlide" v-if="update">
                      ویرایش</vsud-badge>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <vsud-pagination class="my-3 float-start  mx-5" color="success" size="sm">
              <vsud-pagination-item v-for="(e,i) in blog_cat.links" :key="i" v-show="hide1"
                                    :label="checkLabel1(e.label)" :active="e.active" @click="updateBlogs(e.label)"/>
            </vsud-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {HTTP} from "../http-common";
import VsudAvatar from "../components/VsudAvatar";
import PlaceHolderCard from "../examples/Cards/PlaceHolderCard";
import VsudBadge from "../components/VsudBadge";
import VsudButton from "../components/VsudButton";
import VsudPagination from "../components/VsudPagination";
import VsudPaginationItem from "../components/VsudPaginationItem";

export default {
  name: "Categories",
  components: {VsudPaginationItem, VsudPagination, VsudButton, VsudBadge, PlaceHolderCard, VsudAvatar},
  data()
  {
    return{
      create:1,
      update:1,
      remove:1,
      proIndex:'',
      blogIndex:'',
      pcatToDel:'',
      bcatToDel:'',
      flag:false,
      upload:false,
      uploadNew:true,
      product:{
        name:'',
        iconImage:'',
        department_id:'',
        metaDescription:'',
        metaKeyword:'',
        pageTitle:'',
        id:''
      },
      blog:{
        name:'',
        metaDescription:'',
        metaKeyword:'',
        pageTitle:'',
        id:''
      },
      product_cat:[],
      blog_cat:[],
      departments:[],
      hide1:1,
      hide2:1,
    }
  },
   async mounted()
   {
     const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
     for (let i in permissions)
     {
       if (permissions[i].module.name === 'دسته بندی ها'){
         if (permissions[i].read === 0) return window.location = '/';
         if (permissions[i].delete === 0) this.remove=0;
         if (permissions[i].create === 0) this.create=0;
         if (permissions[i].update === 0) this.update=0;
       }
     }
     if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
     else {
       await Promise.all([
         HTTP.get('/categories_pagi'),
         HTTP.get('/blog_categories_pagi'),
       ]).catch((e)=>{
             if(e.response.status ===500){
               localStorage.removeItem('wugt');
               localStorage.removeItem('vqmgp');
               localStorage.removeItem('rgtokuukqp');
               window.location = '/sign-in'
             }
           })
           .then((res)=> {
             this.product_cat = res[0].data;
             this.blog_cat = res[1].data;
           });
     }
   },
  async created()
  {
    const deps = await HTTP.get('/departments');
    this.departments = deps.data;
  },
  methods:{
  async add() {

    if (this.flag){
     if (this.product.name.trim() === '') return this.$notify({
       title: "!خطا",
       text: "عنوان دسته بندی الزامیست! ",
       type: 'error',
     });
     if (this.product.department_id === '') return this.$notify({
       title: "!خطا",
       text: " دپارتمان الزامیست! ",
       type: 'error',
     });
     if (this.product.metaKeyword.trim() === '') return this.$notify({
       title: "!خطا",
       text: "کلیدواژه متای دسته بندی الزامیست! ",
       type: 'error',
     });
     if (this.product.metaDescription.trim() === '') return this.$notify({
       title: "!خطا",
       text: "توضیحات متای دسته بندی الزامیست! ",
       type: 'error',
     });
     if (this.product.pageTitle.trim() === '') return this.$notify({
       title: "!خطا",
       text: "عنوان صفحه دسته بندی الزامیست! ",
       type: 'error',
     });

     const addd = await HTTP.post('/categories',this.product)
      .catch(()=>{
        return this.$notify({
          title: "عملیات ناموفق!",
          text: addd.data.errors,
          type: 'error',
        });
      });
      document.getElementById("noAdd").click()
      this.$notify({
        title: "عملیات موفق!",
        text: "دسته بندی ایجاد شد.",
        type: 'success',
      });
    }
    else{
      if (this.blog.name.trim() === '') return this.$notify({
        title: "!خطا",
        text: "عنوان دسته بندی الزامیست! ",
        type: 'error',
      });
      if (this.blog.metaKeyword.trim() === '') return this.$notify({
        title: "!خطا",
        text: "کلیدواژه متای دسته بندی الزامیست! ",
        type: 'error',
      });
      if (this.blog.metaDescription.trim() === '') return this.$notify({
        title: "!خطا",
        text: "توضیحات متای دسته بندی الزامیست! ",
        type: 'error',
      });
      if (this.blog.pageTitle.trim() === '') return this.$notify({
        title: "!خطا",
        text: "عنوان صفحه دسته بندی الزامیست! ",
        type: 'error',
      });

      delete this.blog.id
      await HTTP.post('/blog_categories',this.blog)
          .catch(()=>{
            return this.$notify({
              title: "عملیات ناموفق!",
              text: 'خطا در افزودن دسته بندی.',
              type: 'error',
            });
          });
      document.getElementById("noAdd").click()
      this.$notify({
        title: "عملیات موفق!",
        text: "دسته بندی ایجاد شد.",
        type: 'success',
      });
    }
    window.location = '/categories'
  },
  async edit() {
    if (this.flag){
      if (this.product.name.trim() === '') return this.$notify({
        title: "!خطا",
        text: "عنوان دسته بندی الزامیست! ",
        type: 'error',
      });
      if (this.product.department_id === '') return this.$notify({
        title: "!خطا",
        text: " دپارتمان الزامیست! ",
        type: 'error',
      });
      if (this.product.metaKeyword.trim() === '') return this.$notify({
        title: "!خطا",
        text: "کلیدواژه متای دسته بندی الزامیست! ",
        type: 'error',
      });
      if (this.product.metaDescription.trim() === '') return this.$notify({
        title: "!خطا",
        text: "توضیحات متای دسته بندی الزامیست! ",
        type: 'error',
      });
      if (this.product.pageTitle.trim() === '') return this.$notify({
        title: "!خطا",
        text: "عنوان صفحه دسته بندی الزامیست! ",
        type: 'error',
      });

      const update = await HTTP.put('/categories',this.product)
          .catch(()=>{
            return this.$notify({
              title: "عملیات ناموفق!",
              text: update.data.errors,
              type: 'error',
            });
          });
      document.getElementById("noEdit").click()
      this.$notify({
        title: "عملیات موفق!",
        text: "دسته بندی تغییر داده شد.",
        type: 'success',
      });    }
    else{
      if (this.blog.name.trim() === '') return this.$notify({
        title: "!خطا",
        text: "عنوان دسته بندی الزامیست! ",
        type: 'error',
      });
      if (this.blog.metaKeyword.trim() === '') return this.$notify({
        title: "!خطا",
        text: "کلیدواژه متای دسته بندی الزامیست! ",
        type: 'error',
      });
      if (this.blog.metaDescription.trim() === '') return this.$notify({
        title: "!خطا",
        text: "توضیحات متای دسته بندی الزامیست! ",
        type: 'error',
      });
      if (this.blog.pageTitle.trim() === '') return this.$notify({
        title: "!خطا",
        text: "عنوان صفحه دسته بندی الزامیست! ",
        type: 'error',
      });

      await HTTP.put('/blog_categories',this.blog)
          .catch(()=>{
            return this.$notify({
              title: "عملیات ناموفق!",
              text: 'خطا در افزودن دسته بندی.',
              type: 'error',
            });
          });
      document.getElementById("noEdit").click()
      this.$notify({
        title: "عملیات موفق!",
        text: "دسته بندی تغییر داده شد.",
        type: 'success',
      });
    }
    window.location = '/categories'
  },
  async deletee() {
    if (this.flag){
      const data = { id : this.pcatToDel.id}
      await HTTP.delete('/categories',{data})
          .catch(()=>{
            document.getElementById('no').click();
            return this.$notify({
              title: "عملیات ناموفق!",
              text: "خطا در حذف دسته بندی",
              type: 'error',
            });
          });

      document.getElementById('no').click();
      this.$notify({
        title: "عملیات موفق!",
        text: "دسته بندی با موفقیت حذف گردید!",
        type: 'success',
      });
      this.product_cat.splice(this.proIndex,1)

    }
    else{
      const data = { id : this.bcatToDel.id}
      await HTTP.delete('/blog_categories',{data})
          .catch(()=>{
            document.getElementById('no').click();
            return this.$notify({
              title: "عملیات ناموفق!",
              text: "خطا در حذف دسته بندی",
              type: 'error',
            });
          });

      document.getElementById('no').click();
      this.$notify({
        title: "عملیات موفق!",
        text: "دسته بندی با موفقیت حذف گردید!",
        type: 'success',
      });
      this.blog_cat.splice(this.blogIndex,1)
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
      formData.append("location", 'img/categories/product');
      const upload =  await HTTP.post('/upload',formData)
          .catch(()=>{
            return this.$notify({
              title: "عملیات ناموفق!",
              text: 'لطفا آیکون با فرمت مناسب آپلود کنید. ',
              type: 'error',
            });
          });

      this.product.iconImage = upload.data.file.url
      this.$notify({
        title: "عملیات موفق!",
        text: "ایکون ویرایش شد.",
        type: 'success',
      });
      this.upload = false

    },
    async deleteOLD()
    {
      console.log('here')
      if (this.product.iconImage) {
        const data = {
          imageName: this.product.iconImage
        }
        const deleteUploaded = await HTTP.post('/remove_upload', data);
        if (deleteUploaded.data.success === 1) {
          this.product.iconImage = ''

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
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      formData.append("location", 'img/categories/product');
      const upload =  await HTTP.post('/upload',formData)
          .catch(()=>{
            return this.$notify({
              title: "عملیات ناموفق!",
              text: 'لطفا آیکون با فرمت مناسب آپلود کنید. ',
              type: 'error',
            });
          });

      this.product.iconImage = upload.data.file.url
      this.$notify({
        title: "عملیات موفق!",
        text: "آیکون ویرایش شد.",
        type: 'success',
      });
      this.uploadNew = false
    },
    async updateBlogs(page) {
      this.blog_cat = await HTTP.get(`/blog_categories_pagi?page=${page}`)
          .catch(() => {
            return this.$notify({
              title: "خطا!",
              text: "خطایی در نمایش اطلاعات جدول رخ داد!",
              type: 'error',
            });
          });
      this.blog_cat = this.blog_cat.data;
    },
    checkLabel1(label) {
      if (label === 'Next &raquo;') {
        return this.hide1 = 0
      }
      else if (label === '&laquo; Previous') {
        return this.hide1= 0
      }
      else {
        this.hide1 = 1
        return label
      }
    },
    async updateCategory(page) {
      this.product_cat = await HTTP.get(`/categories_pagi?page=${page}`)
          .catch(() => {
            return this.$notify({
              title: "خطا!",
              text: "خطایی در نمایش اطلاعات جدول رخ داد!",
              type: 'error',
            });
          });
      this.product_cat = this.product_cat.data;
    },
    checkLabel2(label) {
      if (label === 'Next &raquo;') {
        return this.hide2 = 0
      }
      else if (label === '&laquo; Previous') {
        return this.hide2= 0
      }
      else {
        this.hide2 = 1
        return label
      }
    }
  },
}
</script>

<style scoped>

</style>
