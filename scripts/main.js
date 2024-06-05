const DEFAULT_SKETCH_SIZE = 16;

const MAX_BOARD_SIZE = 800;

const DEFAULT_COLOR = 'rgb(255,255,255)'

var sketchGrid;

var randomRGBtoggle = true;
var gridBorder = true;

var btnResetGrid, btnRandomRGB, btnGridSize, btnGridBorder;

document.addEventListener('DOMContentLoaded', function() {
    sketchGrid = document.getElementById('sketch-grid');

    btnResetGrid = document.getElementById('btn-reset-grid');
    btnRandomRGB = document.getElementById('btn-random-RGB');
    btnGridSize = document.getElementById('btn-grid-size');
    btnGridBorder = document.getElementById('btn-grid-border');

    setGridSize(DEFAULT_SKETCH_SIZE);
    initBox();

    btnResetGrid.addEventListener('click', function() {
        let sketchBoxList = document.getElementsByClassName('sketch-box');
        for (let box of sketchBoxList) {
            box.style.backgroundColor = '';
        }
    });

    btnRandomRGB.addEventListener('click', function() {
        
        if (randomRGBtoggle) {
            randomRGBtoggle = false;
            btnRandomRGB.classList.remove('lightgreen');
        } else if (!randomRGBtoggle) {
            randomRGBtoggle = true;
            btnRandomRGB.classList.add('lightgreen');
        }
        
    })

    btnGridSize.addEventListener('click', function() {
        let newSize = parseInt(prompt('New size (1-100)'));
        if (newSize < 0 || newSize > 100) return;

        else if (newSize >= 1 && newSize <= 100) {
            setGridSize(newSize);
            initBox();
        }
    })

    btnGridBorder.addEventListener('click', function() {
        let sketchBoxList = document.getElementsByClassName('sketch-box');
        
        if (gridBorder) {
            for (let box of sketchBoxList) {
                box.style.border = 'none';
            }
            gridBorder = false;
            btnGridBorder.classList.remove('lightgreen');
        } else if (!gridBorder) {
            for (let box of sketchBoxList) {
                box.style.border = '1px solid black';
            }
            gridBorder = true;
            btnGridBorder.classList.add('lightgreen');
        }

    })
})


function setGridSize(gridSize) {
    sketchGrid.innerHTML = '';
    if (gridSize > 100) 
        gridSize = 100;

    for (let i = 0; i < Math.pow(gridSize, 2); i++) {
        sketchGrid.appendChild(createSketchBox(gridSize));
    }
}

function initBox() {
    let sketchBoxList = document.getElementsByClassName('sketch-box');
    for (let box of sketchBoxList) {
        if (gridBorder) {
            box.style.border = '1px solid black';
        }
        box.addEventListener('mouseover', function() {
            if (randomRGBtoggle) {
                if (box.style.backgroundColor === DEFAULT_COLOR || box.style.backgroundColor === "") {
                    box.style.backgroundColor = getRandomRGB();
                } else if (box.style.backgroundColor != null) {
                    box.style.backgroundColor = darkenRGB(box.style.backgroundColor);
                }
            }
            else {
                box.style.backgroundColor = 'black';
            }
        })
    }
}

function createSketchBox(gridSize) {
    const sketchBox = document.createElement("div");
    sketchBox.classList.add('sketch-box');

    sketchBox.style.setProperty('width', 'calc(100% /' + gridSize + ')');
    sketchBox.style.setProperty('height', 'calc(100% /' + gridSize + ')');

    return sketchBox;
}

function getRandomRGB() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256); 

    return `rgb(${r},${g},${b})`;
}

function darkenRGB(rgb) {

    var colors = rgb.match(/\d+/g);
    var r = parseInt(colors[0]);
    var g = parseInt(colors[1]);
    var b = parseInt(colors[2]);
  
    r = Math.max(0, Math.floor(r * 0.8));
    g = Math.max(0, Math.floor(g * 0.8));
    b = Math.max(0, Math.floor(b * 0.8));


    return `rgb(${r},${g},${b})`;
}