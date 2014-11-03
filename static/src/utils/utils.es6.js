/**
 * Created by user on 03.11.14.
 */


function rndInt(min = 0, max = 0) {
    if (max === 0) {
        max = min === 0? 1: min;
        min = 0;
    } else {
        max -= min;
    }

    return min + (Math.random() * max | 0);
}


export { rndInt };