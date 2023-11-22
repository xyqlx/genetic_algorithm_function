<template>
  <div class="parameters">
    <h2>参数</h2>
    <p>
      <label>种群数量</label>
      <input v-model.number="group_population" v-on:input="$emit('parameter_changed')" />
    </p>
    <p>
      <label>染色体长度</label>
      <input v-model.number="chromosome_length" v-on:input="$emit('parameter_changed')" />
    </p>
    <p>
      <label>遗传代数</label>
      <input v-model.number="max_generation" v-on:input="$emit('parameter_changed')" />
    </p>
    <p>
      <label>交叉数</label>
      <input v-model.number="cross_number" v-on:input="$emit('parameter_changed')" />
    </p>
    <p>
      <label>交叉概率</label>
      <input v-model.number="cross_probability" v-on:input="$emit('parameter_changed')" />
    </p>
    <p>
      <label>变异概率</label>
      <input v-model.number="mutation_probability" v-on:input="$emit('parameter_changed')" />
    </p>
    <p>
      <label>函数</label>
      <input size='32' v-model.number="target_function_string" v-on:input="$emit('function_changed')" />
    </p>
    <p>
      <label>定义域左边界</label>
      <input v-model.number="left_border" v-on:input="$emit('function_changed')" />
    </p>
    <p>
      <label>定义域右边界</label>
      <input v-model.number="right_border" v-on:input="$emit('function_changed')" />
    </p>
    <p>
      <label>适应度偏移量</label>
      <input v-model.number="fitness_offset" v-on:input="$emit('parameter_changed')"/>
    </p>
    <p>
      <label>最大值</label>
      <input v-model.number="result" />
    </p>
    <p><button v-on:click=calc>计算</button></p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GA from "../genetic_algorithm";
import launcher from "../GA_launcher";
import targetFunction from '../targetFunction';

@Component
export default class Parameters extends Vue {
  group_population = 200;
  chromosome_length = 15;
  cross_number = 4;
  max_generation = 2000;
  cross_probability = 0.85;
  mutation_probability = 0.15;
  left_border = -1;
  right_border = 2;
  fitness_offset = 1;
  result = NaN;
  current_promise = undefined;
  generation_chart = undefined;
  target_function_string = "x * Math.sin(10 * Math.PI + x) + 1.0"
  target_function = new Function('x', 'return x * Math.sin(10 * Math.PI + x) + 1.0')
  set_generation_chart(generation_chart_ref:any){
    this.generation_chart = generation_chart_ref
  }
  calc() {
    try{
      let func = new Function('x', 'return '.concat(this.target_function_string))
      func(1)
      this.target_function = func
      let parameters = {
        group_population: this.group_population,
        chromosome_length: this.chromosome_length,
        cross_number: this.cross_number,
        max_generation: this.max_generation,
        cross_probability: this.cross_probability,
        mutation_probability: this.mutation_probability,
        left_border: this.left_border,
        right_border: this.right_border,
        fitness_offset: this.fitness_offset,
        target_function: func
      };
      launcher.launch(parameters, this)
      }catch(error){
        console.log('the function is invalid')
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  text-align: right;
  width: 100px;
  display: inline-block;
  margin-right: 10px;
}
</style>
