<template>
  <div class="pageContent">
    <go-back color="black"><div class="text-primary-black text-xl font-bold">充值银币</div></go-back>
    <walletMoney></walletMoney>
    <el-form class="mt-5">
      <input-form title="请输入需要充值的数量" placeholder="请输入充值的数量" type="number" v-model="money"></input-form>
    </el-form>
    <div class="mt-5">
      <el-radio-group v-model="money" class="grid gap-5 grid-cols-2">
        <el-radio-button  v-for="(item, index) in selectType" :key="index" :label="item.money">
          <div class="">
            <div>银币</div>
            <div>{{ item.money }}</div>
          </div>
        </el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import inputForm from '@/components/input-form.vue';
import walletMoney from '@/components/wallet-money.vue';
import goBack from '@/components/go-back.vue';
export default {
  components: {
    inputForm,
    goBack,
    walletMoney
  },
  props: {},
  data() {
    return {
      money: "",
      selectType: [{ money: "10" }, { money: "20" }, { money: "50" }, { money: "100" }]
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() { },
  mounted() { }
};
</script>
<style lang="scss" scoped>
::v-deep .el-radio-button__inner{
  width:100%;
  border-radius: 16px !important;
  border: 2px solid $primary-color;
}

::v-deep .el-radio-button:first-child .el-radio-button__inner{
  border-left: 2px solid  $primary-color;
}
</style>
