<template>
  <div class="goods-list">
      <goods-item v-for="item in goods" :key="item.showId" :goodsItem="item"></goods-item>
  </div>
</template>

<script>
import GoodsItem from './GoodsItem.vue';
export default {
    name: 'GoodsList',
    props: {
        goods: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        GoodsItem
    }
}
</script>

<style scoped>
 .goods-list {
     display: flex;
     justify-content:space-around;
     flex-wrap:wrap;
 }
 
</style>