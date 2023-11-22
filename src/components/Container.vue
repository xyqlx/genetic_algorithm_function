<template>
  <div class="container">
    <h1>遗传算法求解函数最大值</h1>
    <div class="data_container">
      <div class="parameter_container">
        <parameters
          ref="parameters_ref"
          v-on:function_changed="update_function"
          v-on:parameter_changed="update_parameter"
        ></parameters>
      </div>
    </div>
    <div class="chart_container">
      <div class="chart_list">
        <div class="chart">
          <h3>函数图像</h3>
          <line-example ref="function_chart_ref"></line-example>
        </div>
        <div class="chart">
          <h3>计算结果</h3>
          <generation-chart ref="generation_chart_ref"></generation-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LineExample from "./LineChart.vue";
import Parameters from "./Parameters.vue";
import GenerationChart from "./GenerationChart.vue";

@Component({
  components: {
    LineExample,
    Parameters,
    GenerationChart
  }
})
export default class Container extends Vue {
  update_function() {
    this.update_parameter();
    // @ts-ignore
    this.$refs.function_chart_ref.set_function(this.$refs.parameters_ref.target_function, this.$refs.parameters_ref.left_border,this.$refs.parameters_ref.right_border);
  }
  update_parameter() {
    // @ts-ignore
    this.$refs.parameters_ref.calc();
  }
  mounted() {
      //@ts-ignore
      this.$refs.parameters_ref.set_generation_chart(this.$refs.generation_chart_ref)
      this.update_parameter()
  }
}
</script>

<style>
h1 {
  text-align: center;
}
.data_container {
  float: left;
}
.chart_container {
  margin-left: 420px;
}
.chart {
  float: left;
  width: 500px;
}
</style>
