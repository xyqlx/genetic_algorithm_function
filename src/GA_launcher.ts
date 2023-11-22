import GA from "./genetic_algorithm";

let key:number = 0

function launch(parameters:any, state:any) {
    state.generation_chart.clear()
    let solution = new GA.genetic_algorithm_solution(parameters)
    solution.init()
    ++key
    if (solution.info.max_generation >= 5) {
        setTimeout(step, 0, solution, state, key)
    }
    
}

function step(solution:any, state:any, work_key:number, cnt:number = 0){
    if (solution.current_generation < solution.info.max_generation) {
        solution.next()
        let gen = solution.current_generation
        let seg = gen < 10 ? 1: gen < 100 ? 10 : gen < 2000 ? 100 : 1000
        if(gen % seg == 0){
            if(work_key != key){
                return
            }
            state.result = solution.current_best_value - solution.info.fitness_offset
            state.generation_chart.add_point(gen, state.result)
        }
        setTimeout(step, 0, solution, state, work_key, cnt);
    }else{
        solution.init()
        state.generation_chart.add_line()
        if (solution.info.max_generation < 100){
            setTimeout(step, 200, solution, state, work_key, cnt + 1);
        }else{
            setTimeout(step, 0, solution, state, work_key, cnt + 1);
        }
    }
    
}

export default {
    launch
}
