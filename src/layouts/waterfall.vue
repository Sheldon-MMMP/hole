<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-row w-full gap-4" ref="waterfallBox">
    <div class="box flex-1 flex flex-col gap-4">
      <clerk-info :clerk="item" v-for="(item, index) in leftList" :key="index"
        @click.native="onClerk(item.clerkId)"></clerk-info>
    </div>
    <div class="box flex-1 flex flex-col gap-4">
      <clerk-info :clerk="item" v-for="(item, index) in rightList" :key="index"
        @click.native="onClerk(item.clerkId)"></clerk-info>
    </div>
  </div>
</template>

<script>
import { clerkDetailPath } from '@/router/path';
import clerkInfo from '@/layouts/components/clerk-info.vue';
export default {
  components: {
    clerkInfo
  },
  props: {
    clerkList: {
      type: Array,
      default() {
        return []
      },
    },
    // 瀑布流是否需要重新加载，重新加载就变动一下将会从新加载
    isReload: {
      type: Boolean,
      default: true,
    }
  },
  mounted() {
    this.setWaterFall(this.clerkList);
  },
  watch: {
    isReload: {
      handler: function () {
        this.leftList = [];
        this.rightList = [];
        this.leftHight = 0;
        this.rightHight = 0;
      }
    },
    clerkList: {
      deep: true,
      handler: function (newValue) {
        this.setWaterFall(newValue)
      }
    }
  },
  data() {
    return {
      rightHight: 0,
      leftHight: 0,
      rightList: [],
      leftList: []
    }
  },
  methods: {
    transHeight(height, width) {
      var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const originalWidth = (this.$refs.waterfallBox.offsetWidth - rootFontSize) / 2;
      var scaleFactor = width / originalWidth;
      // 计算等比例变换后的高度
      var proportionalHeight = height * scaleFactor;
      return proportionalHeight;
    },
    setWaterFall(value) {
      value.forEach((el) => {
        const height = el.avatarHeight;
        const width = el.avatarWidth;
        if (this.rightHight > this.leftHight) {
          this.leftHight += this.transHeight(height, width);
          this.leftList.push(el)
        } else {
          this.rightHight += this.transHeight(height, width)
          this.rightList.push(el)
        }
        console.log(this.rightHight,this.leftHight);
      });
    },
    onClerk(clerkId) {
      this.$router.push({
        path: clerkDetailPath,
        query: {
          clerkId,
        }
      })
    }
  }
}

</script>

<style lang='scss' scoped>
.box {
  margin-bottom: 8px
}

.gutter-block-selector {
  margin-right: 20px;
}
</style>

