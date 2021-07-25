<template>
  <div class="row mb-2">
    <div class="col-sm-6">
      <h1 class="m-0">{{headerObj.name}}</h1>
    </div>
    <!-- /.col -->
    <div class="col-sm-6">
      <ol class="breadcrumb float-sm-right">
        <li class="breadcrumb-item">
          <router-link to="/">Anasayfa</router-link>
        </li>
        <li class="breadcrumb-item active">{{headerObj.name}}</li>
      </ol>
    </div>
    <!-- /.col -->
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    headerObj : {
      required : true,
      type : Object
    }    
  }  
});
</script>

<style>
</style>