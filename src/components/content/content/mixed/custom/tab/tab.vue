<template>
  <div class="card">
    <div class="card-header d-flex p-0">
        <slot name="tabLink"></slot>
    </div>
    <div class="card-body">
      <div class="tab-content">
        <slot name="tabContent"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({

});
</script>

<style>
</style>