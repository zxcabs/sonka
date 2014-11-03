/**
 * Created by user on 31.10.14.
 */


import Canvas from './Canvas.es6.js';
import Map from './Map.es6.js';
import Snake from './Snake.es6.js';
import SnakeAI from './SnakeAI.es6.js';
import { isDown, LEFT, UP, RIGHT, DOWN } from './keyboard.es6.js';
import { rndInt } from '../utils/utils.es6.js';

require('./game.less');

class Game {
    constructor(containerSelector = 'body') {
        this.container = document.querySelector(containerSelector);
        this.canvas = new Canvas();

        this.loopInterval = 1000 / 5;
        this.enemyCount = 4;

        this.container.appendChild(this.canvas.el);

        this.map = new Map([50, 50]);
        this.player = new Snake(Snake.rndDirection(), 5, [25, 25], 'green');

        this.map.addSnake(this.player);
        this.canvas.addMap(this.map);
        this.addEnemy(this.enemyCount);

        this._dts = 0;
        this._loop();
    }

    loop(dt) {
        let
            player = this.player,
            direction;

        if (isDown(UP)) {
            direction = Snake.UP;
        } else if (isDown(LEFT)) {
            direction = Snake.LEFT;
        } else if (isDown(DOWN)) {
            direction = Snake.DOWN;
        } else if (isDown(RIGHT)) {
            direction = Snake.RIGHT;
        }

        if (direction) {
            player.direction = direction;
        }

        if ((this._dts += dt) < this.loopInterval) return;
        this._dts = 0;

        this.map.update();
    }

    _loop(prevTm = Date.now()) {
        let
            nowTm = Date.now(),
            dt = nowTm - prevTm;

        this.loop(dt);

        setTimeout(() => {
            this._loop(nowTm);
        }, 0);
    }

    addEnemy(count = 1) {
        let
            map = this.map;

        while (--count) {
            map.addSnake(
                new SnakeAI(
                    Snake.rndDirection(),
                    rndInt(5, 15),
                    [rndInt(map.size[0]), rndInt(map.size[1])],
                    'rgb(' + rndInt(255) + ',' + rndInt(255) + ',' + rndInt(255) + ')'
                ));
        }
    }
}


export default Game;