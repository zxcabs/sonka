/**
 * Created by user on 03.11.14.
 */


let
    keys = {},
    [LEFT, UP, RIGHT, DOWN] = [37, 38, 39, 40];

window.addEventListener('keydown', (e) => {
    keys[e.keyCode] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.keyCode] = false;
});


function isDown(keyCode) {
    return keys[keyCode];
}


export { isDown, LEFT, UP, RIGHT, DOWN };