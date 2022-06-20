<template>
<div></div>
</template>

<script>
import {HTTP} from "../http-common";

export default {
  name: "Transactions",
  mounted() {
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions)
    {
      if (permissions[i].module.name === 'تراکنش ها'){
        if (permissions[i].read === 0) return window.location = '/'
      }
    }
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';

  },
  methods:{
    async updateTransaction(page) {
      this.posts = await HTTP.get(`/blogs_page?page=${page}`)
          .catch(() => {
            return this.$notify({
              title: "خطا!",
              text: "خطایی در نمایش اطلاعات جدول رخ داد!",
              type: 'error',
            });
          });
      this.posts = this.posts.data;
    },
    checkLabel(label) {
      if (label === 'Next &raquo;') {
        return this.hide = 0
      }
      else if (label === '&laquo; Previous') {
        return this.hide= 0
      }
      else {
        this.hide = 1
        return label
      }
    }
  }
}
</script>

<style scoped>

</style>
