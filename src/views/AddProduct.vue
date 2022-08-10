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
    <!--    modal for add state-->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">افزودن ظرفیت محصول</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <div class="d-flex align-items-center">
                  <h6 class="mb-0 p-2">نام ظرفیت :</h6>
                </div>
                <input type="text" class="form-control"  placeholder="نام ظرفیت" v-model="newStateName">
              </div>
              <div class="mb-3">
                <div class="d-flex align-items-center">
                  <h6 class="mb-0 p-2">قیمت ظرفیت :</h6>
                </div>
                <input type="number" class="form-control"  placeholder="قیمت ظرفیت" v-model="newStateCost" @change="doNewOff">
              </div>
              <div class="mb-3" v-if="product.discount !== 0">
                <div class="d-flex align-items-center">
                  <h6 class="mb-0 p-2">قیمت تخفیفی ظرفیت :</h6>
                </div>
                <input type="text" class="form-control"  placeholder="قیمت تخفیفی ظرفیت" v-model="newStateOff"
                       readonly>
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
    <!--    modal for add state-->
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
    <div class="row py-5 " id="states">
      <div class="d-flex flex-row">
        <h5 class="font-weight-bolder">ظرفیت های محصول :</h5>
        <div class="me-auto d-flex justify-content-between">
          <label for="discount" class="form-label">درصد تخفیف محصول :</label>
          <input type="number" class="form-control form-control-sm" id="discount" placeholder="درصد تخفیف محصول"
                 v-model="product.discount" @change="doOff" style="height:40px" title="پس از وارد کردن درصد تخفیف کلید Enter یا Done را فشار دهید.">
        </div>
      </div>
      <hr class="bg-dark text-dark " style="width: 100%;height: 2px">
      <div class=" d-flex justify-content-end my-4">
        <vsud-button color="dark" size="lg" variant="outline"
                     data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
          افزودن ظرفیت
          <i class="bi bi-plus-lg"></i>
        </vsud-button>
      </div>
      <div class="row"  v-for="(s,i) in product.state"  :key="i" >
        <i class="bi bi-x-circle-fill d-flex justify-content-end" style="cursor: pointer;margin-bottom: -10px;font-size: 23px"
           @click="removeState(s)"></i>
        <div class="col-md-4 col-12  ">
          <div class="d-flex align-items-center">
            <h6 class="mb-0 p-2">نام ظرفیت :</h6>
          </div>
          <input type="text" class="form-control" id="state_type" placeholder="نام ظرفیت" v-model="s.type">
        </div>
        <div class="col-md-4 col-12">
          <div class="d-flex align-items-center">
            <h6 class="mb-0 p-2">قیمت به تومان :</h6>
          </div>
          <input type="text" class="form-control" id="state_price" placeholder="قیمت :" v-model="s.price">

        </div>
        <div class="col-md-4 col-12 " v-if="product.discount !== 0">
          <div class="d-flex align-items-center">
            <h6 class="mb-0 p-2">قیمت تخفیفی :</h6>
          </div>
          <input type="text" class="form-control" id="state_discounted_price" placeholder=" قیمت تخفیفی"
                 :value="s.discounted_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          >

        </div>
      </div>

    </div>
    <div class="row py-2">
      <div class="col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">مشخصات فنی محصول :</h6>
        </div>
        <div class="example">
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
        state:[],
        discount:0,
        description:'',
        description_excerpt:'',
        slug:'',
        metaKeyword:'',
        metaDescription:'',
        pageTitle:''
      },
      categories:[],
      tags:[],
      category:'',
      tag:[],
      costs:[],
      states:[],
      off:[],
      upload:true,
      tmp:'',
      newStateName:'',
      newStateCost:'',
      newStateOff:''
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
    onEditorBlur(quill) {
      this.product.description = quill.value.innerHTML
    },
    async update(){
      this.isCreating = true

      this.states = [];
      this.costs = [];
      this.off = [];
      for (let i in this.product.state){
        this.states.push(this.product.state[i].type)
        this.costs.push(this.product.state[i].price)
        if (this.product.discount !== 0) {
          this.off.push(this.product.state[i].discounted_price)
        }
        else {
          this.off.push((this.product.state[i].price))
        }
      }
      this.product.description= this.$refs.myQuillEditor.getHTML()

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
      if (this.product.discount === '') this.product.discount = 0
      if(this.states.length === 0 || this.costs.length === 0   ) {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "حداقل یک ظرفیت برای محصول الزامیست!",
          type: 'error',
        });

      }
      if(this.states.length !== this.costs.length  ) {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: " ظرفیت محصول الزامیست!",
          type: 'error',
        });

      }
      if (this.product.description.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "مشخصات فنی محصول الزامیست!",
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
        discount:this.product.discount,
        name:this.product.name,
        image:this.product.image,
        category_id : this.category,
        tags : this.tag,
        states:this.states,
        off:this.off,
        costs:this.costs,
        description:this.product.description,
        description_excerpt:this.product.description_excerpt,
        metaKeyword:this.product.metaKeyword,
        pageTitle:this.product.pageTitle,
        metaDescription:this.product.metaDescription,
        slug:this.product.slug

      }

      const res = await HTTP.post( '/products', data);
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
    doOff()
    {
      const dis = this.product.discount

      for (let i in this.product.state)
      {
        this.product.state[i].discounted_price = this.product.state[i].price-((this.product.state[i].price*dis)/100)
      }
    },
    doNewOff()
    {
      if (this.product.discount === 0) return this.newStateOff = this.newStateCost
      return this.newStateOff = this.newStateCost - ((this.newStateCost*this.product.discount)/100)
    },
    addState()
    {
      if (this.newStateName.trim() === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "نام ظرفیت الزامیست.",
        type: 'error',
      });
      if (this.newStateCost === '') return this.$notify({
        title: "عملیات ناموفق!",
        text: "قیمت ظرفیت الزامیست.",
        type: 'error',
      });

      if (this.product.discount === 0)  this.newStateOff = this.newStateCost;
      document.getElementById('saveNewState').click();

      const arr = {
        'type': this.newStateName,
        'price': this.newStateCost.toString(),
        'discounted_price': this.newStateOff.toString()
      }
      this.product.state.push(arr)
      this.newStateName = '';
      this.newStateCost = '';
      this.newStateOff = ''


    },
    removeState(state)
    {
      this.product.state = this.product.state.filter(function (e){
        return e.type !== state.type
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
