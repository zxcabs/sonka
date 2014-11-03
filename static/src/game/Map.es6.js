/**
 * Created by user on 03.11.14.
 */



class Map {
    constructor(size = [1, 1]) {
        this.snakes = [];
        this.size = size;
    }

    addSnake(snake) {
        if (!~this.snakes.indexOf(snake)) {
            this.snakes.push(snake);
        }
    }

    update() {
        let
            size = this.size;

        for (let snake of this.snakes) {
            snake.move();

            let
                pos = snake.pos;

            if (pos[0] < 0) {
                pos[0] = size[0];
            } else if (pos[0] >= size[0]) {
                pos[0] = 0;
            } else if (pos[1] < 0) {
                pos[1] = size[1];
            } else if (pos[1] >= size[1]) {
                pos[1] = 0;
            }
        }
    }
}


export default Map;