/**
 * Created by user on 03.11.14.
 */


import { rndInt } from '../utils/utils.es6.js';

class Snake {
    constructor(direction = Snake.UP, length = 3, pos = [0, 0], color = 'red') {
        this.direction = direction;
        this.pos = pos;
        this.color = color;
        this.body = [pos];

        while(--length) {
            this.increment();
        }
    }

    set direction(direction) {
        if (~[Snake.UP, Snake.LEFT, Snake.DOWN, Snake.RIGHT].indexOf(direction)) {

            if (Snake.UP === direction && this._direction === Snake.DOWN ||
                Snake.DOWN === direction && this._direction === Snake.UP ||
                Snake.LEFT === direction && this._direction === Snake.RIGHT ||
                Snake.RIGHT === direction && this._direction === Snake.LEFT) {
                this.body = this.body.reverse();
                this.pos = this.body[0];
            }

            this._direction = direction;
        }
    }

    get direction() {
        return this._direction;
    }

    get length() {
        return this.body.length;
    }

    move() {
        let
            direction = this.direction,
            body = this.body,
            length = this.length;

        while (length > 1) {
            length -= 1;
            let
                cur = body[length],
                next = body[length - 1];

            cur[0] = next[0];
            cur[1] = next[1];
        }

        if (direction === Snake.UP) {
            this.pos[1] -= 1;
        } else if (direction === Snake.LEFT) {
            this.pos[0] -= 1;
        } else if (direction === Snake.DOWN) {
            this.pos[1] += 1;
        } else if (direction === Snake.RIGHT) {
            this.pos[0] += 1;
        }
    }

    increment() {
        let
            body = this.body,
            length = this.length,
            lastIndex = length - 1,
            last = body[lastIndex],
            direction = this.directionForIndex(lastIndex);

        if (direction === Snake.UP) {
            body.push([last[0], last[1] + 1]);
        } else if (direction === Snake.DOWN) {
            body.push([last[0], last[1] - 1]);
        } else if (direction === Snake.LEFT) {
            body.push([last[0] + 1, last[1]]);
        } else if (direction === Snake.RIGHT) {
            body.push([last[0] - 1, last[1]]);
        }
    }

    directionForIndex(index) {
        if (index === 0) {
            return this.direction;
        } else {
            let
                cur = this.body[index],
                next = this.body[index - 1];

            if (cur[0] > next[0]) return Snake.LEFT;
            if (cur[0] < next[0]) return Snake.RIGHT;
            if (cur[1] > next[1]) return Snake.UP;
            if (cur[1] < next[1]) return Snake.DOWN;
        }
    }

    static rndDirection() {
        return [Snake.UP, Snake.DOWN, Snake.LEFT, Snake.RIGHT][rndInt(4)];
    }
}

Snake.UP = 1;
Snake.LEFT = 2;
Snake.DOWN = 3;
Snake.RIGHT = 4;

export default Snake;