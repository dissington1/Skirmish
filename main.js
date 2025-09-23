const State = {
  MAIN_MENU: 0,
  COMPOSING: 1,
  LISTENING: 2
};

let currentState;
let measureSize;
let noteSize;

function setup() {
    currentState = State.COMPOSING;
    createCanvas(windowWidth, windowHeight);
    measureSize = {w: width * 0.25, h: height * 0.25};
    noteSize = {w: measureSize.w / 24, h: measureSize.h / 12}
}

function draw() {
    background(0);
    drawMeasures();
}

function drawGUI() {
    if (currentState == State.MAIN_MENU) {
        mainMenu();
        return;
    }
}

function drawMeasures() {
    for (let y = 0; y < height; y += measureSize.h) {
        for (let x = 0; x < width; x += measureSize.w) {
            drawMeasure(x, y);
        }
    }
    
}

function drawMeasure(x, y) {
    fill(100);
    rect(x, y, measureSize.w, measureSize.h);

    for (let i = 0; i < 12; i++) { // Notes
        let c;

        if ([0, 2, 4, 6, 7, 9, 11].includes(i)) { // Note is white
            c = 255;
        } else { // Note is black
            c = 0;
        }
        
        fill(c);
        rect(x, y + noteSize.h * i, noteSize.w, noteSize.h);
    }
}