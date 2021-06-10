<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Sroll",
  props: {
    probeType: Number,
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      let nowTime,
        old = 0;
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        observeDOM: true,
        click: true,
        pullUpLoad: true,
      });

      this.scroll.on("scroll", (position) => {
        nowTime = new Date().valueOf();
        if (nowTime - old > 300) {
          this.$emit("scroll", position);
          old = nowTime;
        }
      });

      this.scroll.on("pullingUp", () => {
        console.log(998);
        this.$emit("pullUp");
      });
    });
  },
  methods: {
    scrollTo(x = 0, y = 0, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll.refresh();
    },
  },
};
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}
</style>
