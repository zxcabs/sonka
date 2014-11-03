/**
 * Created by user on 03.11.14.
 */

import doc from '../dom/document.es6.js';

class Canvas {
    constructor(opt = { width: 800, height: 800, background: 'white', fps: true }) {
        this.opt = opt;

        let
            el = this.el = doc.createElement('CANVAS');

        el.width = opt.width;
        el.height = opt.height;
        el.className = 'g-canvas';

        this.ctx = el.getContext('2d');
        this._drawCount = 0;
        this._dtSum = 0;
        this._fps = 0;
        this.map = null;

        this.renderLoop();
    }

    renderLoop(lastRender = 0) {
        let
            now = Date.now(),
            dt = now - lastRender,
            ctx = this.ctx;

        this._dtSum += dt;

        if ((this._drawCount += 1) > 4) {
            this._fps = (1000 / (this._dtSum / this._drawCount)) | 0;
            this._drawCount = 0;
            this._dtSum = 0;
        }


        this.clear(ctx);
        this.renderMap(ctx, dt);

        this.opt.fps && this.renderFps(ctx);
        requestAnimationFrame(() => {
            this.renderLoop(now);
        });
    }

    clear(ctx) {
        let
            opt = this.opt;

        ctx.save();
        ctx.fillStyle = opt.background;
        ctx.fillRect(0, 0, opt.width, opt.height);
        ctx.restore();
    }

    renderFps(ctx) {
        this.renderText(ctx, 'FPS: ' + this._fps)
    }

    renderText(ctx, str = '', pos = [5, 15], color = 'green') {
        ctx.save();
        ctx.fillStyle = color;
        ctx.font = '15px Arial';
        ctx.fillText(str, ...pos);
        ctx.restore();
    }

    addMap(map) {
        if (this.map) throw new Error('Map already set');
        this.map = map;
    }

    renderMap(ctx, dt) {
        let
            map = this.map;

        if (!map) return;

        let
            itemWidth = this.opt.width / map.size[0],
            itemHeight = this.opt.height / map.size[1];

        //render snakes
        for (let snake of map.snakes) {
            ctx.save();
            ctx.fillStyle = snake.color;

            for (let snakeNode of snake.body) {
                ctx.fillRect(snakeNode[0] * itemWidth, snakeNode[1] * itemHeight, itemWidth, itemHeight);
            }

            ctx.restore();
        }
    }
}


export default Canvas;