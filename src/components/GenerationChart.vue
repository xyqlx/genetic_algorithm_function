<script lang='ts'>
import { Line,mixins } from 'vue-chartjs'
import { Component, Vue, Mixins,Prop} from 'vue-property-decorator';
import VueCharts from 'vue-chartjs';

@Component({extends:Line})
export default class GenerationChart extends Vue {
    add_point(generation:number, value:number){
        this.datasets[this.datasets.length-1].data.push({x:generation, y:value})
        if(this.datasets.length == 1){
            this.labels.push(generation.toString())
        }
        this.run_render();
    }
    add_line(){
        if(this.datasets.length != 0){
            this.datasets[this.datasets.length-1].borderColor = "rgba(75, 192, 192, 1)"
            this.datasets[this.datasets.length-1].borderWidth = 1
        }
        this.datasets.push({
            // label: 'function',
            data: Array.from({length:0}),
            backgroundColor: '#f87979',
            borderColor: "rgba(255, 0, 0, 1)",
            fill: false,
            pointRadius: 1,
            pointHoverRadius: 2,
            hitRadius: 2,
            borderWidth: 3
        })
    }
    clear(){
        this.datasets = []
        this.labels = []
        this.add_line()
    }
    datasets: any[] = [];
    labels:string[] = [];
    run_render(){
        try {
            // @ts-ignore
            this.renderChart({
                labels: this.labels,
                datasets: this.datasets
            },{
                animation:{duration:0},
                legend:{display:false}
            })
        } catch (error) {
            // donothing
            console.error('render failed')
        }
        
    }
    mounted() {
        this.clear()
        this.run_render();
    }
}
</script>
