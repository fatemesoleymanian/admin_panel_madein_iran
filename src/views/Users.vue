<template>
    <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <authors-table :users="users" />
      </div>
    </div>
    </div>
</template>
<script>
import AuthorsTable from "./components/AuthorsTable";
import {HTTP} from '../http-common'
export default {
      name: "users",
      data()
      {
        return{
          users:[]
        }
      },

     components: {
    AuthorsTable
     },
     async mounted(){
         const users = await HTTP.get('/users');
         this.users = users.data.users
         console.log(this.users)
     }

}
</script>
