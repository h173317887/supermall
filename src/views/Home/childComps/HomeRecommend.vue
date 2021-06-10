<template>
  <div>
      <ul class="recommend">
          <li v-for="item in recommends" :key="item.title">
              <a :href="item.link" class="recommend-item">
                  <img :src="item.image" alt="">
                  <span>{{item.title}}</span>
              </a>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  props: {
      recommends: Array
  }
}
</script>

<style scoped>
  li {
      list-style:none;
  }
  .recommend {
      display: flex;
      font-size: 12px;
      border-bottom: 10px solid #eee;
      padding: 10px 0 30px;
      
  }
  .recommend li {
      flex: 1;
  }
  .recommend img {
      width: 70px;
      height: 70px;
      margin-bottom: 8px; 
  }
  .recommend-item {
      display: flex;
      flex-direction: column;
      align-items: center;
  }
</style>