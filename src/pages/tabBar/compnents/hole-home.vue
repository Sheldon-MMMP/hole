<template>
  <div>
    <template v-if="loading">
      <el-skeleton :rows="10" animated class="mt-10" />
    </template>
    <template v-else="loading">
      <div class="flex justify-between items-center pt-4">
        <h1 class="text-3xl font-semibold text-primary-black">树洞</h1>
        <div class="border-solid border-2 rounded-full w-12 h-12 flex justify-center items-center border-primary-black">
          <img src="@/assets/icon/common/search.svg" @click="$router.push({ path: '/search' })">
        </div>
      </div>
      <!-- 新人推荐 -->
      <div class="new-people-list mt-5" v-if="clerkNewList.length">
        <better-scroll :clerkList="clerkNewList"></better-scroll>
      </div>

      <!-- 轮播图 -->
      <div class="Information" v-if="bookSwiper.length">
        <h2 class="m-1 text-primary-black text-2xl">资讯</h2>
        <el-carousel :interval="4000" type="card" height="100px" arrow="never" autoplay class="swiper-box">
          <el-carousel-item v-for="(item,index) in bookSwiper" :key="index">
            <el-image :src="$Url(item.imagePath)" fit="fill" class="w-full h-full"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="notification flex mt-5">
        <img src="../../../assets/icon/home/notification.svg" alt="">
        <div class="ml-3 opacity-60">消息通知</div>
      </div>
      <div class="clerkList mt-5">
        <div class="clerkFilter bg-primary-light rounded-full h-10 flex justify-around">
          <div class="flex-1 flex justify-center items-center text-primary-black" v-for="(item, index) in clerkFilter"
            :key="item.name">
            <el-dropdown @command="handleCommand" :hide-on-click="true" trigger="click">
              <span class="el-dropdown-link text-primary-black flex">
                {{ item.value ? item.value : item.name }}<img src="@/assets/icon/common/arrow/down_small_line.svg" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="[index, valItem]" v-for="valItem in item.list" :key="valItem.name">{{ valItem
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="list mt-4">
          <el-empty :image-size="200" v-if="!clerkList.length"></el-empty>
          <waterfall :pWidth="pWidth" :clerkList="clerkList" v-else></waterfall>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import waterfall from '@/layouts/waterfall.vue'

import betterScroll from '@/layouts/better-scroll.vue';
import { NEW_CLERK_LIST, SWIPER_HOME, CLERK_INFO } from '@/services/api';
import { homePath } from '@/router/path';
export default {
  name: homePath,
  mounted() {
    //请求页面的数据
    Promise.allSettled([NEW_CLERK_LIST(), SWIPER_HOME(), CLERK_INFO({ pageNum: ++this.pageNum, pageSize: this.pageSize })]).then(res => {
      if (res[0].value) {
        this.clerkNewList = res[0]?.value[0]?.data
      }
      if (res[1].value) {
        this.bookSwiper = res[1]?.value[0]?.data;
      }
      if (res[2].value) {
        this.clerkList = res[2]?.value[0]?.data
      }
    }).catch(err => {
      console.error(err);
    })
    setTimeout(() => {
      this.loading = false
    }, 500);
  },
  components: {
    betterScroll,
    waterfall
  },
  data() {
    return {
      // 加载动画
      loading: true,
      pageNum: 0,
      pageSize: 10,
      // 新人推荐
      clerkNewList: [],
      //页面统一的padding
      pWidth: 0,
      // 店员筛选列表
      clerkFilter: {
        gender: { name: "性别", list: ['不限', '男', '女'], value: '' },
        grade: { name: "等级", list: ['不限', 'Lv.01', 'Lv.02', 'Lv.03'], value: "" },
      },

      // 轮播图图片
      bookSwiper: [],
      // 店员列表
      clerkList: [],
      mySwiper: null,
    }
  },
  watch: {
    'clerkFilter.gender': {
      deep: true,
      handler: function () {
        this.getClerkList();
      }
    },
    'clerkFilter.grade': {
      deep: true,
      handler: function () {
        this.getClerkList();
      }
    }
  },
  methods: {
    handleCommand(value) {
      this.$set(this.clerkFilter[value[0]], 'value', value[1]);
    },
    async getClerkList() {
      const _this = this.clerkFilter
      const sex = _this.gender.value === '女' ? 8 : _this.gender.value === '男' ? 9 : undefined;
      const Level = _this.grade.value === "不限" ? undefined : _this.grade.value;
      const [val, err] = await CLERK_INFO({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sex,
        Level
      })
      if (err) {
        this.clerkList = []
        return console.warn(err)
      }
      this.$set(this, 'clerkList', val?.data ? val.data : [])
    }
  },
}

</script>

<style lang='scss' scoped>
.new-people-list {
  margin-right: -$pageMargins;
}
::v-deep .el-carousel__item{
  border-radius: 16px;
  overflow: hidden;
}

.swiper-box {
  margin-left: -$pageMargins;
  margin-right: -$pageMargins;
}
</style>
 