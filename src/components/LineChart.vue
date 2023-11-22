<script lang='ts'>
import { Line,mixins } from 'vue-chartjs'
import { Component, Vue, Mixins,Prop} from 'vue-property-decorator';
import VueCharts from 'vue-chartjs';

@Component({extends:Line})
export default class LineChart extends Vue {
    left_border : number = -1;
    right_border : number = 2;
    segments : number = 12;
    target_function = new Function('x', 'return x * Math.sin(10 * Math.PI + x) + 1.0')
    set_function(func:Function, left_border:number, right_border:number){
        this.target_function = func;
        this.left_border = left_border;
        this.right_border = right_border;
        this.run_render();
    }
    get points(){
        let points = [];
        let delta = (this.right_border - this.left_border)/this.segments;
        for (let i = this.left_border; i <= this.right_border; i += delta) {
            points.push({x:i, y:this.target_function(i)})
        }
        return points;
    }
    get labels(){
        let lbs = [];
        let delta = (this.right_border - this.left_border)/this.segments;
        for (let i = this.left_border; i <= this.right_border; i += delta) {
            lbs.push(i.toFixed(2).toString());
        }
        return lbs;
    }
    run_render(){
        // @ts-ignore
        this.renderChart({
            labels: this.labels,
            datasets: [
                {
                    label: this.target_function,
                    data: this.points,
                    backgroundColor: '#f87979',
                    borderColor: "rgba(128, 192, 0, 1)",
                    fill: false,
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    hitRadius: 0
                }
            ]
        })
    }
    mounted() {
        let delta = (this.right_border - this.left_border)/this.segments;
        this.run_render();
    }
}
</script>
