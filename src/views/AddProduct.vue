<template>
  <div class="py-4 px-5 container rounded-end">
    <!-- Modal -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف عکس محصول</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف عکس محصول اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no" >خیر</button>
            <button type="button" class="btn btn-primary" @click="deleteImage">بله</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <!--    modal for add model-->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">افزودن حالت محصول</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <div class="d-flex align-items-center">
                  <h6 class="mb-0 p-2">نام حالت :</h6>
                </div>
                <input type="text" class="form-control"  placeholder="نام حالت" v-model="newStateName">
              </div>
              <div class="mb-3">

                <div class="row py-2">
                  <div class="col-12" >
                    <div class="d-flex align-items-center">
                      <h6 class="mb-0 p-2">مشخصات فنی محصول :</h6>
                    </div>
                    <div class="example" >
                      <QuillEditor  id="product_create2"
                                    :options="editorOption"
                                    @blur="onEditorBlur($event)"
                                    :modules="modules"
                                    ref="myQuillEditor2"
                                    placeholder="مشخصات فنی محصول" class="editor" theme="snow" v-model="newStateDesc"/>
                    </div>
                  </div>
                </div>
              </div>
             </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="saveNewState">انصراف</button>
            <button type="button" class="btn btn-primary"  @click="addState" >ثبت</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal for add model-->
    <div class="row">
      <div class="col-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-lg-6">
                <div class="d-flex flex-row">
                  <h5 class="font-weight-bolder">عکس محصول :</h5>
                </div>
                <div class="d-flex flex-row  w-50 mt-5 me-5">
                  <vsud-button size="lg" color="success" variant="outline"
                               data-bs-toggle="modal" data-bs-target="#staticBackdrop" v-if="!upload">تغییر عکس محصول</vsud-button>
                </div>
              </div>
              <div class="col-lg-5 ms-auto text-center mt-5 mt-lg-0">

                <div class="border-radius-lg ">
                  <div class="position-relative d-flex align-items-center justify-content-center h-100">

                    <div class="mb-4 col-xl-6 col-md-12 mx-md-2 mb-xl-0" v-if="upload" @click="uploadFake">
                      <input type="file" id="img" name="img" accept="image/*" style="opacity: 0;" @change="loadFile">
                      <place-holder-card
                          :title="{ text: uploadImg ? 'لطفا شکیبا باشید.' :'بارگذاری عکس محصول', variant: 'h5' }"
                      />
                    </div>
                    <img v-else
                         width="500"
                         height="300"
                         class="w-100 position-relative z-index-2"
                         :src="'https://api.madein-iran.com/public'+product.image"
                         :alt="product.name"
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
          <h6 class="mb-0 p-2">نام محصول :</h6>
        </div>
        <input type="text" class="form-control " placeholder="نام محصول" v-model="product.name"
               title="نام محصول"/>

      </div>
      <div class="col-md-4 col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">دسته بندی محصول :</h6>
        </div>
        <select class="form-select text-start " aria-label="Default select example" v-model="category">
          <option v-for="(c,i) in categories" :key="i" :value="c.id">{{c.name}}</option>
        </select>
      </div>
      <div class="col-md-4 col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">تگ های محصول :</h6>
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
<!--    has model-->
    <hr>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" id="mySwitch" name="models"  @click="hasModels" >
      <label class="form-check-label" for="mySwitch"><b>این محصول دارای حالت های مختلف است.</b></label>
    </div>
    <hr>
<!--has models    -->
    <div class="row py-5 " id="models" v-if="product.has_models === true">
      <div class="d-flex flex-row">
        <h5 class="font-weight-bolder">حالت های محصول :</h5>
      </div>
      <hr class="bg-dark text-dark " style="width: 100%;height: 2px">
      <div class=" d-flex justify-content-end my-4">
        <vsud-button color="dark" size="lg" variant="outline"
                     data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
          افزودن حالت
          <i class="bi bi-plus-lg"></i>
        </vsud-button>
      </div>
      <div class="row"  v-for="(s,i) in product.models"  :key="i" >
        <i class="bi bi-x-circle-fill d-flex justify-content-end" style="cursor: pointer;margin-bottom: -10px;font-size: 23px"
           @click="removeState(s)"></i>
        <div class="col-md-4 col-12  ">
          <div class="d-flex align-items-center">
            <h6 class="mb-0 p-2">نام حالت :</h6>
          </div>
          <input type="text" class="form-control" id="state_type" placeholder="نام حالت" v-model="s.name">
        </div>
        <div class="col-md-4 col-12">
          <div class="d-flex align-items-center">
            <h6 class="mb-0 p-2">مشخصات فنی  :</h6>
          </div>
          <textarea type="text" class="form-control" id="state_price" placeholder="مشخصات فنی :" v-model="s.description"/>

        </div>
        </div>

    </div>
    <div class="row py-2">
      <div class="col-12" v-if="product.has_models === false">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">مشخصات فنی محصول :</h6>
        </div>
        <div class="example" >
          <QuillEditor  id="product_create"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        :modules="modules"
                        ref="myQuillEditor"
                        placeholder="مشخصات فنی محصول" class="editor" theme="snow" v-model="product.description"/>
        </div>
      </div>
      <div class="col-12 my-3 py-4 px-2">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">توضیحات محصول :</h6>
        </div>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"
                  v-model="product.description_excerpt"></textarea>
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
        <input type="text" class="form-control " placeholder="عنوان صفحه" v-model="product.pageTitle"/>
      </div>
      <div class="col-md-6 col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">نشانک:</h6>
        </div>
        <input type="text" class="form-control " placeholder="عنوان صفحه به انگلیسی" v-model="product.slug"/>
      </div>
      <div class="col-md-6 col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">توضیحات متا (meta description):</h6>
        </div>
        <textarea class="form-control " placeholder="توضیحات متا" v-model="product.metaDescription"
                  rows="3"/>
      </div>

      <div class="col-md-6 col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">کلید واژه های متا (meta keywords):</h6>
        </div>
        <textarea  class="form-control " placeholder="کلید واژه های متا" v-model="product.metaKeyword"
                  rows="3"/>
      </div>
    </div>

    <div class="row pt-5">
      <div class="d-flex justify-content-between">
        <div class="font-weight-bold">
          <vsud-button
              style="border: none;font-size: 16px"
              @click="$router.push('/products')"
              size="lg"
              variant="outline"
              color="dark"> <i class="bi bi-arrow-return-right"></i>
            بازگشت به محصولات

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
import VsudBadge from "../components/VsudBadge";
import VsudButton from "../components/VsudButton";
import PlaceHolderCard from "../examples/Cards/PlaceHolderCard";
import BlotFormatter from "quill-blot-formatter";

export default {
  name: "AddProduct",
  components: {
    PlaceHolderCard,
    VsudButton,
    VsudBadge,
  },
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
        name:'',
        category_id:'',
        tag:[],
        image:'',
        description:'',
        description_excerpt:'',
        slug:'',
        models:[],
        metaKeyword:'',
        metaDescription:'',
        pageTitle:'',
        has_models:false
      },
      categories:[],
      tags:[],
      category:'',
      tag:[],
      descriptions:[],
      names:[],
      upload:true,
      tmp:'',
      newStateName:'',
      newStateDesc:'',
    }
  },
  async created() {
    const [cat, tag] = await Promise.all([
      HTTP.get(`/categories`),
      HTTP.get(`/tags_only_pro`)
    ]);
    this.categories = cat.data
    this.tags = tag.data
  },
  methods:{
    hasModels()
    {
       this.product.has_models = !this.product.has_models ;
    },
    onEditorBlur(quill) {
      this.product.description = quill.value.innerHTML
    },
    async update(){
      this.isCreating = true

      this.names = [];
      this.descriptions = [];
      for (let i in this.product.models){

        this.names.push(this.product.models[i].name)
        this.descriptions.push(this.product.models[i].description)

      }
      if (!this.product.has_models) this.product.description= this.$refs.myQuillEditor.getHTML()

      if(this.product.name.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "نام محصول الزامیست!",
          type: 'error',
        });

      }
      if(this.product.image.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "عکس محصول الزامیست!",
          type: 'error',
        });

      }
      if(this.category === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "دسته بندی محصول الزامیست!",
          type: 'error',
        });

      }
      if(this.tag.length === 0) {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "حداقل یک تگ برای محصول الزامیست!",
          type: 'error',
        });

      }
      if (this.product.description_excerpt.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "توضیحات محصول الزامیست!",
          type: 'error',
        });

      }
      if (this.product.metaKeyword.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "حداقل یک کلیدواژه برای محصول الزامیست!",
          type: 'error',
        });

      }
      if (this.product.pageTitle.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "عنوان صفحه محصول الزامیست!",
          type: 'error',
        });

      }
      if (this.product.metaDescription.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "توضیحات متای محصول الزامیست!",
          type: 'error',
        });

      }
      if (this.product.slug.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "نشانک محصول الزامیست!",
          type: 'error',
        });

      }

      const data = {
          name:this.product.name,
          image:this.product.image,
          category_id : this.category,
          tags : this.tag,
          names: this.product.has_models ? this.names : '',
          descriptions:this.product.has_models ? this.descriptions : '',
        description: this.product.has_models === true ? '' : this.product.description,
          description_excerpt:this.product.description_excerpt,
          metaKeyword:this.product.metaKeyword,
          pageTitle:this.product.pageTitle,
          metaDescription:this.product.metaDescription,
          slug:this.product.slug,
          has_models: this.product.has_models ? 1 : 0

      }
      const res = await HTTP.post( '/products', data);
      if(res.status===200){
        this.$notify({
          title: "عملیات موفق! " +
              "محصول ایجاد شد و ظرف مدت حدودا یک ساعت دیگر در سایت نمایش داده میشود.",
          text: res.data.msg,
          type: 'success',
        });
      }
      else {
        this.isCreating = false
        return this.$notify({
          title: "عملیات ناموفق!",
          text:"خطا در ایجاد محصول",
          type: 'error',
        });
      }
      this.isCreating = false
    },
    async deleteImage()
    {
      this.isCreating = true;
      const data = {
        imageName : this.product.image
      }
      const deleteUploaded = await HTTP.post('/remove_upload',data);
      if (deleteUploaded.data.success === 1) {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات موفق!",
          text: deleteUploaded.data.msg,
          type: 'success',
        });
        this.upload = true
        this.isCreating = false
      }
      else {
        this.$notify({
          title: "عملیات ناموفق!",
          text: deleteUploaded.data.msg,
          type: 'error',
        });
        this.isCreating = false
      }
    },
    uploadFake()
    {
      document.getElementById('img').click()
    },
    async loadFile(event)
    {
      this.isCreating = true;
      this.uploadImg = true
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      formData.append("location", 'img/products');
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
        this.product.image = upload.data.file.url
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
    addState()
    {
      this.newStateDesc = this.$refs.myQuillEditor2.getHTML()
      const arr = {
        'name': this.newStateName,
        'description': this.newStateDesc ,
      }
      this.product.models.push(arr)
      this.newStateName = '';
      this.newStateDesc = '';


    },
    removeState(state)
    {
      this.product.models = this.product.models.filter(function (e){
        return e.name !== state.name
      })

    }
  },
  mounted()
  {
    console.log('this is current quill instance object', this.editor)
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions)
    {
      if (permissions[i].module.name === 'محصولات'){
        if (permissions[i].create === 0) return window.location = '/'
      }
    }
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill && this.$refs.myQuillEditor2.quill;
    }
  },
}
</script>
<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #101010;
}

input:focus + .slider {
  box-shadow: 0 0 1px #101010;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
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
