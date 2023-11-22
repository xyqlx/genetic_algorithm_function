class Chromosome {
    constructor(data: boolean[]) {
        this.data = data;
    }
    data: boolean[]
}

interface genetic_algorithm_parameters {
    group_population: number,
    chromosome_length: number,
    cross_number: number,
    max_generation: number,
    cross_probability: number,
    mutation_probability: number,
    left_border: number,
    right_border: number,
    fitness_offset: number,
    target_function: Function
}

class genetic_algorithm_solution {
    constructor(info: genetic_algorithm_parameters = {
        group_population: 200,
        chromosome_length: 15,
        cross_number: 4,
        max_generation: 2000,
        cross_probability: 0.85,
        mutation_probability: 0.15,
        left_border: -1,
        right_border: 2,
        fitness_offset: 1,
        target_function: (x: number) => x * Math.sin(10 * Math.PI + x) + 1.0
    }) {
        this.info = info;
    }
    info: genetic_algorithm_parameters;
    generate_random_chromosome = () =>
        new Chromosome(Array.from({ length: this.info.chromosome_length }, (_, __) => Math.random() * 2 < 1 ? true : false));

    copy_chromosome = (chromosome: Chromosome) => new Chromosome(Array.from(chromosome.data, x => x ? true : false));

    decode(chromosome: Chromosome) {
        let number = Math.pow(2, this.info.chromosome_length) / (this.info.right_border - this.info.left_border);
        let temp = 0;
        for (let i = this.info.chromosome_length - 1, q = 1; i >= 0; i--) {
            temp += chromosome.data[i] ? q : 0;
            q *= 2;
        }
        return this.info.left_border + temp / number;
    }

    fitness = (x: Chromosome) => this.info.target_function(this.decode(x)) + this.info.fitness_offset;

    select(group: Chromosome[]) {
        let fitness_values = Array.from(group, this.fitness);
        let sum = fitness_values.reduce((x, y) => x + y, 0);
        let select_proberbilitys = Array.from(fitness_values, x => x / sum);
        let selected_ids: number[] = Array.from({ length: this.info.group_population })
        for (let i = 0; i < this.info.group_population; ++i) {
            let random_number = Math.random();
            selected_ids[i] = this.info.group_population - 1;
            for (let j = 0; j < this.info.group_population - 1; ++j) {
                random_number -= select_proberbilitys[j];
                if (random_number < 0) {
                    selected_ids[i] = j;
                    break;
                }
            }
        }
        return Array.from(selected_ids, (id, _) => group[id]);
    }

    cross_over(lhs: Chromosome, rhs: Chromosome) {
        let cross_points = Array.from({ length: this.info.cross_number }, (_, __) => Math.floor(Math.random() * this.info.chromosome_length));
        cross_points.sort();
        let flag = false;
        for (let i = 0, j = 0; i < this.info.chromosome_length; ++i) {
            if (!flag) {
                [lhs.data[i], rhs.data[i]] = [rhs.data[i], lhs.data[i]];
            }
            if (i == cross_points[j]) {
                while (j < this.info.cross_number && i == cross_points[j]) {
                    ++j;
                    flag = !flag;
                }
            }
        }
    }

    mutate(chromosome: Chromosome) {
        let i = Math.floor(Math.random() * this.info.chromosome_length);
        chromosome.data[i] = !chromosome.data[i];
    }

    get_optimal_index(group: Chromosome[]) {
        let fitness_values = Array.from(group, this.fitness);
        return fitness_values.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    }

    group?:Chromosome[];
    current_best_value:number = 0;
    best_chromosome?:Chromosome;
    current_generation:number = 0;

    next(): Chromosome | void{
        if(this.current_generation >= this.info.max_generation){
            return
        }
        if(this.group == undefined || this.best_chromosome == undefined){
            return
        }
        this.current_generation++
        this.group = this.select(this.group);
        for (let i = 0, pre = -1; i < this.info.group_population; ++i) {
            if (Math.random() < this.info.cross_probability) {
                if (pre == -1) {
                    pre = i;
                }
                else {
                    this.cross_over(this.group[pre], this.group[i]);
                    pre = -1;
                }
            }
        }
        for (let i = 0; i < this.info.group_population; ++i) {
            if (Math.random() < this.info.mutation_probability) {
                this.mutate(this.group[i]);
            }
        }
        let best_index = this.get_optimal_index(this.group);
        if (this.fitness(this.group[best_index]) < this.current_best_value) {
            this.group[best_index] = this.copy_chromosome(this.best_chromosome);
        }
        else {
            this.best_chromosome = this.copy_chromosome(this.group[best_index]);
            this.current_best_value = this.fitness(this.best_chromosome);
        }
    }

    init(): void {
        this.group = Array.from({ length: this.info.group_population }, () => this.generate_random_chromosome());
        //console.log("group init finish");
        this.best_chromosome = this.copy_chromosome(this.group[this.get_optimal_index(this.group)]);
        this.current_best_value = this.fitness(this.best_chromosome);
        //console.log("best chromosome is " + this.info.target_function(this.decode(best_chromosome)).toString());
        this.current_generation = 0;
        // result = this.info.target_function(this.decode(best_chromosome))
    }
}

export default {
    genetic_algorithm_solution
}