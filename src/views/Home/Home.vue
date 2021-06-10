<template>
  <div class="home-container">
    <nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>

    <scroll class="scroll" ref="scroll" :probeType="3" @scroll="contentScroll" @pullUp="loadMore">
      <!-- 轮播图区域 -->
      <swiper>
        <swiper-item v-for="item in banners" :key="item.title">
          <a :href="item.link">
            <img :src="item.image" alt="" />
          </a>
        </swiper-item>
      </swiper>
      <!-- 推荐列表区域 -->
      <home-recommend :recommends="recommends"> </home-recommend>

      <!-- 品类展示图片 -->
      <feature-view></feature-view>
      <!-- 类别标题选择 -->
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>

      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBack"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar/NavBar.vue";
import { Swiper, SwiperItem } from "@/components/common/Swiper";
import Scroll from "@/components/common/Scroll/Scroll.vue";
import TabControl from "@/components/content/TabControl/TabControl.vue";
import { GoodsList } from "@/components/content/Goods";
import BackTop from '@/components/content/BackTop/BackTop.vue'

import HomeRecommend from "./childComps/HomeRecommend.vue";
import FeatureView from "./childComps/FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "@/network/api/home.js";
export default {
  data() {
    return {
      scroll: {},
      banners: [],
      recommends: [],
      currentType: "pop",
      isShowBack: false,
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
    };
  },
  components: {
    NavBar,
    Swiper,
    TabControl,
    SwiperItem,
    Scroll,
    BackTop,
    HomeRecommend,
    FeatureView,
    GoodsList,
  },
  created() {
    this.getMultidata();
    this.getGoods("pop");
    this.getGoods("new");
    this.getGoods("sell");
  },
  mounted() {},
  methods: {
    getMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;
        this.$refs.scroll.finishPullUp();
        this.$refs.scroll.refresh();
      });
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
        this.$refs.scroll.scrollTo()
    },
    contentScroll(position) {
        this.isShowBack = (-position.y) > 1000
    },
    loadMore() {
        this.getGoods(this.currentType);
    }
  },
  computed: {

  }
};
</script>

<style scoped>
.tab-control {
  position: sticky;
  top: 45px;
  z-index: 5;
}
.home-nav {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  background-color: var(--color-tint);
  color: #fff;
}
.home-container {
  padding-top: 45px;
}
.scroll {
    height: calc(100vh - 94px);
}
</style>
