<template>
  <div class="home">
    <div class="side">
      <router-link to="/domain/list">Domain list</router-link>
      <br/>
      <router-link to="/domainBaseType/list">Domain base type list</router-link>
      <br/>
      <router-link to="/user/list">User list</router-link>
      <br/>
      <router-link to="/tag/list">Tag List</router-link>
    </div>
    <div class="right-content">
      <div class="header"></div>
      <div class="content">
        <router-view/>
      </div>
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
  overflow: hidden;
  display: flex;
  height: 100vh;
  width: 100vw;

  .side {
    width: 220px;
    height: 100vh;
    border-right: 1px solid #ccc;
  }

  .right-content {
    flex: 1;
    height: 100vh;
    width: calc(100% - 280px);
    .header {
      height: 55px;
      width: 100%;
      background: #f5f5f5;
      border-bottom: 1px solid #cccccc;
    }
    .content{
      padding: 20px;
      overflow-y: auto;
    }
  }
}
</style>
