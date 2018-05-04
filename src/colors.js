export const colors = ['Red','Green',"Yellow","Blue","Orange","Purple","Cyan","Magenta","Lime","Pink","Teal","Lavender","Brown","Grey","White","Maroon"]

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
export function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}
