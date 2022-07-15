<template>
  <div class="py-4 px-5 container rounded-end">
    <!-- Modal -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف عکس پست</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف عکس پست اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no" >خیر</button>
            <button type="button" class="btn btn-primary" @click="deleteImage">بله</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <div id="loading" v-if="loader"></div>
    <div class="row">
      <div class="col-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-lg-6">
                <div class="d-flex flex-row">
                  <h5 class="font-weight-bolder">عکس پست :</h5>
                </div>
                <div class="d-flex flex-row  w-50 mt-5 me-5">
                  <vsud-button size="lg" color="success" variant="outline"
                               data-bs-toggle="modal" data-bs-target="#staticBackdrop" v-if="!upload">تغییر عکس پست
                  </vsud-button>
                </div>
              </div>
              <div class="col-lg-5 ms-auto text-center mt-5 mt-lg-0">

                <div class="border-radius-lg ">
                  <div class="position-relative d-flex align-items-center justify-content-center h-100">

                    <div class="mb-4 col-xl-6 col-md-12 mx-md-2 mb-xl-0" v-if="upload" @click="uploadFake">
                      <input type="file" id="img" name="img" accept="image/*" style="opacity: 0;" @change="loadFile">
                      <place-holder-card
                          :title="{ text: uploadImg ? 'لطفا شکیبا باشید.' : 'بارگذاری عکس پست', variant: 'h5' }"
                      />
                    </div>
                    <img v-else
                         width="500"
                         height="300"
                         class="w-100 position-relative z-index-2"
                         :src="'https://apidemo.madein-iran.com/public'+product.featuredImage"
                         :alt="product.slug"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row py-5">
      <div class="col-md-4 col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2"> تیتر  :</h6>
        </div>
        <input type="text" class="form-control " placeholder="تیتر " v-model="product.title"
               title="تیتر"/>

      </div>
      <div class="col-md-4 col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">دسته بندی  :</h6>
        </div>
        <select class="form-select text-start " aria-label="Default select example" v-model="category">
          <option v-for="(c,i) in categories" :key="i" :value="c.id">{{c.name}}</option>
        </select>
      </div>
      <div class="col-md-4 col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">تگ ها :</h6>
        </div>
        <select class="form-select mb-3 text-start" aria-label="Default select example" v-model="tmp"
                @change="addTag">
          <option v-for="(c,i) in tags" :key="i" :value="c.id">{{c.name}}</option>
        </select>
        <div v-for="(t,i) in product.tag" :key="i"  style="display: inline" class="p-2">
          <vsud-badge color="dark" variant="gradient" size="lg"
                      @click="dropTag(t.id)" style="cursor: pointer;"
                      title="برای حذف تگ روی آن کیک کنید.">{{t.name}}
          </vsud-badge>
        </div>

      </div>
    </div>
    <div class="row py-2">
      <div class="col-12 ">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">پست :</h6>
        </div>
        <div class="example">
        <QuillEditor  id="post_create"
            :options="editorOption"
                      @blur="onEditorBlur($event)"
                      :modules="modules"
                      ref="myQuillEditor"
            placeholder="متن پست" class="editor" theme="snow" v-model="product.post"/>
        </div>
      </div>
      <div class="col-12 my-3 py-4 px-2 ">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2"> چکیده پست :</h6>
        </div>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"
                  v-model="product.post_excerpt"></textarea>
      </div>
    </div>
    <div class="row py-3 my-2 px-1">
      <div class="d-flex align-items-center">
        <h4 class="mb-0 p-2 font-weight-bolder">سئو</h4>
      </div>
      <hr class="bg-dark text-dark " style="width: 100%;height: 2px">
      <div class="col-md-6 col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">عنوان صفحه (page title):</h6>
        </div>
        <input type="text" class="form-control " placeholder="عنوان صفحه" v-model="product.pageTitle"
               maxlength="70" title="حداکثر تعداد کاراکتر 70"/>
      </div>
      <div class="col-md-6 col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">نشانک:</h6>
        </div>
        <input type="text" class="form-control " placeholder="عنوان صفحه به انگلیسی" v-model="product.slug"
               maxlength="80" title="حداکثر تعداد کاراکتر 80"/>
      </div>
      <div class="col-md-6 col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">توضیحات متا (meta description):</h6>
        </div>
        <textarea class="form-control " placeholder="توضیحات متا" v-model="product.metaDescription"
                  maxlength="160" title="حداکثر تعداد کاراکتر 160" rows="3"/>
      </div>

      <div class="col-md-6 col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">کلید واژه های متا (meta keywords):</h6>
        </div>
        <textarea  class="form-control " placeholder="کلید واژه های متا" v-model="product.metaKeyword"
                   maxlength="120" title="حداکثر تعداد عبارتها 10"  rows="3"/>
      </div>
    </div>

    <div class="row pt-5">
      <div class="d-flex justify-content-between">
        <div class="font-weight-bold">
          <vsud-button
              style="border: none;font-size: 16px"
              @click="$router.push('/posts')"
              size="lg"
              variant="outline"
              color="dark"> <i class="bi bi-arrow-return-right"></i>
            بازگشت به وبلاگ

          </vsud-button>

        </div>
        <div class="font-weight-bold">
          <vsud-button
              @click="update"
              style="font-size: 18px"
              size="lg"
              color="success"
              :disabled="isCreating" :loading="isCreating">
            {{isCreating ? 'در حال ثبت  ...' : 'ثبت '}}
          </vsud-button>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {HTTP} from "../http-common";
import VsudButton from "../components/VsudButton";
import PlaceHolderCard from "../examples/Cards/PlaceHolderCard";
import VsudBadge from "../components/VsudBadge";
import BlotFormatter from 'quill-blot-formatter'
export default {
  name: "AddPost",
  components: {VsudBadge, PlaceHolderCard, VsudButton },
  data()
  {
    return{
      uploadImg:false,
      editorOption: {
        // debug: 'info',
        readOnly: false,
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
            ['clean'],
            ['table', 'column-left', 'column-right', 'row-above', 'row-below', 'row-remove', 'column-remove'],
            ['link', 'image', 'video']
          ],
        },
      },
      module: BlotFormatter,
      isCreating:false,
      id:this.$route.params.id,
      product:{
        title:'',
        category_id:'',
        tag:[],
        featuredImage:'',
        post:'',
        post_excerpt:'',
        slug:'',
        metaKeyword:'',
        metaDescription:'',
        pageTitle:''
      },
      categories:[],
      tags:[],
      category:'',
      tag:[],
      upload:true,
      tmp:'',
    }
  },

  async created() {
    const [cat, tag] = await Promise.all([
      HTTP.get(`/blog_categories_list`),
      HTTP.get(`/tags_only_blog`)
    ]);
    this.categories = cat.data
    this.tags = tag.data
  },
  methods:{
    onEditorBlur(quill) {
      this.product.post = quill.value.innerHTML
    },

    async update(){
      this.isCreating = true
      this.product.post= this.$refs.myQuillEditor.getHTML()
//
// console.log(this.$refs.myQuillEditor.getQuill().container.outerHTML)
// console.log(this.$refs.myQuillEditor.getHTML())
      if(this.product.title.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: " تیتر الزامیست!",
          type: 'error',
        });

      }
      if(this.product.featuredImage.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "عکس الزامیست!",
          type: 'error',
        });

      }
      if(this.category === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "دسته بندی الزامیست!",
          type: 'error',
        });

      }
      if(this.tag.length === 0) {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "حداقل یک تگ برای پست الزامیست!",
          type: 'error',
        });

      }
      if (this.product.post.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "متن پست الزامیست!",
          type: 'error',
        });

      }
      if (this.product.post_excerpt.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: " چکیده پست الزامیست!",
          type: 'error',
        });

      }
      if (this.product.metaKeyword.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "حداقل یک کلیدواژه برای پست الزامیست!",
          type: 'error',
        });

      }
      if (this.product.pageTitle.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "عنوان صفحه پست الزامیست!",
          type: 'error',
        });

      }
      if (this.product.metaDescription.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "توضیحات متای پست الزامیست!",
          type: 'error',
        });

      }
      if (this.product.slug.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "نشانک پست الزامیست!",
          type: 'error',
        });

      }


      const data = {
        title:this.product.title,
        featuredImage:this.product.featuredImage,
        category_id : this.category,
        tag_id : this.tag,
        post:this.product.post,
        post_excerpt:this.product.post_excerpt,
        metaKeyword:this.product.metaKeyword,
        pageTitle:this.product.pageTitle,
        metaDescription:this.product.metaDescription,
        slug:this.product.slug
      }

      const res = await HTTP.post( '/blogs', data).catch(()=>{
        this.isCreating = false
        return this.$notify({
          title: "عملیات ناموفق!",
          text:"خطا در ایجاد محصول",
          type: 'error',
        });
      });
      if(res.status===200){
        this.$notify({
          title: "عملیات موفق!",
          text: res.data.msg,
          type: 'success',
        });
      }
      else {
        this.$notify({
          title: "عملیات ناموفق!",
          text:"خطا در ایجاد محصول",
          type: 'error',
        });
      }
      this.isCreating = false
    },
    async deleteImage()
    {
      this.isCreating = true
      const data = {
        imageName : this.product.featuredImage
      }
      const deleteUploaded = await HTTP.post('/remove_upload',data)
      .catch(()=>{
        this.$notify({
          title: "عملیات ناموفق!",
          text: deleteUploaded.data.msg,
          type: 'error',
        });
        this.isCreating = false
      });
      if (deleteUploaded.data.success === 1) {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات موفق!",
          text: deleteUploaded.data.msg,
          type: 'success',
        });
        this.upload = true
      }
      else {
        this.$notify({
          title: "عملیات ناموفق!",
          text: deleteUploaded.data.msg,
          type: 'error',
        });
      }
      this.isCreating = false
    },
    uploadFake()
    {
      document.getElementById('img').click()
    },
    async loadFile(event)
    {
      this.isCreating = true
      this.uploadImg =true
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      formData.append("location", 'img/blogs/post');
      const upload =  await HTTP.post('/upload',formData)
      .catch(()=>{
        this.$notify({
          title: "عملیات ناموفق!",
          text: 'خطایی رخ داد. ',
          type: 'error',
        });
        this.uploadImg = false
       this.isCreating = false
      });

      if (upload.data.success === 1)
      {
        this.product.featuredImage = upload.data.file.url
        this.$notify({
          title: "عملیات موفق!",
          text: "لطفا برای ثبت عکس روی ثبت تغییرات کلیک کنید. ",
          type: 'success',
        });
        this.upload = false
      }
      else {
        this.$notify({
          title: "عملیات ناموفق!",
          text: upload.data.errors.message,
          type: 'error',
        });

      }
      this.uploadImg = false
      this.isCreating = false
    },
    dropTag(id)
    {
      this.tag = this.tag.filter(function(ele){
        return ele !== id
      });
      this.product.tag = this.product.tag.filter(function (e){
        return e.id !== id
      });
    },
    addTag() {
      const tmp = this.tmp
      let flag = false

      for (let i in this.product.tag)
      {
        if (this.product.tag[i] === this.tmp) {
          flag=true;
          break;
        }
      }
      if (!flag)  {
        this.tag.push(tmp)
        const product = this.product.tag
        this.tags.map(function (e){
          if (e.id === tmp) product.push(e)
        });
      }
    },
  },
  mounted()
  {
    console.log('this is current quill instance object', this.editor)

    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions)
    {
      if (permissions[i].module.name === 'وبلاگ'){
        if (permissions[i].create === 0) return window.location = '/'
      }
    }
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
}
</script>
<style lang="scss" scoped>
.example {
  display: flex;
  flex-direction: column;
  background: white;

  .editor {
    height: 80rem;
    text-align: right;
    float: right;
    overflow: hidden;
  }

  .output {
    width: 100%;
    height: 20rem;
    margin: 0;
    border: 1px solid #ccc;
    overflow-y: auto;
    resize: vertical;

    &.code {
      padding: 1rem;
      height: 16rem;
    }

    &.ql-snow {
      border-top: none;
      height: 24rem;
    }
  }
}
</style>
