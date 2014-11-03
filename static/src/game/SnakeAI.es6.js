/**
 * Created by user on 03.11.14.
 */

import Snake from './Snake.es6.js';
import { rndInt } from '../utils/utils.es6.js';

class SnakeAI extends Snake {
    constructor(...arg) {
        super(...arg);

        this.directionChange = 30;
    }
    move() {
        if (rndInt(100) < this.directionChange) {
            this.direction = Snake.rndDirection();
        }
        super.move();
    }
}

export default SnakeAI;