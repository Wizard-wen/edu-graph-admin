<template>
  <div class="home">
    <div class="side">
      <router-link to="/domain/list">Domain list</router-link>
      <br/>
      <router-link to="/domainBaseType/list">Domain base type list</router-link>
      <br/>
      <router-link to="/user/list">User list</router-link>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home'
});
</script>
<style lang="scss">
.home {
  display: flex;

  .side {
    width: 280px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    border-right: 1px solid #ccc;
  }

  .content {
    flex: 1;
    min-height: 100vh;
    overflow: scroll;
  }
}
</style>
