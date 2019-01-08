require('../style/style.scss');
require('../style/main.scss');
const React = require('react');
const ReactDOM = require('react-dom');
const {createStore, applyMiddleware} = require('redux');
const thunk = require('redux-thunk').default;
const {Provider} = require('react-redux');
const { GameCont } = require('./containers/GameCont.js');
const {initialState, reduce} = require('./reducer.js');

const NumbersApp = () => (
    <GameCont boardSize={9} />
);

const store = createStore(reduce, initialState, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <NumbersApp/>
    </Provider>,
    document.getElementById('boardDiv')
);

// // Adjust the board to the device's screen
// var rescale = function(screenHeight, screenWidth) {
//     var screenHeight = screen.height;
//     var screenWidth = screen.width;
//     // var screenHeight = window.innerHeight;
//     // var screenWidth = window.innerWidth;
//     // var screenHeight = window.innerHeight * window.devicePixelRatio;
//     // var screenWidth = window.innerWidth * window.devicePixelRatio;
//     var screenRatio = screenWidth / screenHeight;

//     // Scrolling on the following devices
//     // PIXEL 2XL landscape
//     // iPhone 5/SE landscape
//     // iPhone 6/7/8 landscape
//     // iPhone 6/7/8 plus landscape
//     // iPhone X landscape
//     // iPad landscape and portrait
//     // iPad Pro landscape and portrait
//     var antiScroll = 1.0;
//     var gameWidth = 450 * antiScroll;
//     var gameHeight = 733 * antiScroll;
//     var gameRatio = gameWidth / gameHeight;

//     //console.log("screen ratio: " + screenRatio + ", game ratio: " + gameRatio);
//     var scale = 1;

//     // gameHeight > gameWidth always
//     // The game has to fit the screen device always
//     //console.log("screenHeight: " + screenHeight);
//     //console.log("screenWidth:  " + screenWidth);
//     //console.log("gameHeight:   " + gameHeight);
//     //console.log("gameWidth:    " + gameWidth);
//     if (screenHeight >= screenWidth) {
//         if (screenHeight >= gameHeight && screenWidth >= gameWidth) { // Consider ratios
//             if (screenRatio >= gameRatio) { // Increase gameHeight
//                 scale = screenHeight / gameHeight;
//                 //console.log("case 1_1");
//             } else { // Increase gameWidth
//                 scale = screenWidth / gameWidth;
//                 //console.log("case 1_2"); // never happens
//             }
//         } else if (screenHeight >= gameHeight && screenWidth < gameWidth) { // Decrease the gameWidth
//             scale = screenWidth / gameWidth;
//             //console.log("case 2");
//         } else if (screenHeight < gameHeight && screenWidth >= gameWidth) { // Decrease the gameHeight
//             scale = screenHeight / gameHeight;
//             //console.log("case 3");
//         } else { // Consider ratios
//             if (screenRatio >= gameRatio) { // Decrease gameHeight
//                 scale = screenHeight / gameHeight;
//                 //console.log("case 4_1");
//             } else { // Decrease gameWidth
//                 scale = screenWidth / gameWidth;
//                 //console.log("case 4_2");
//             }
//         }
//     } else {
//         if (screenHeight >= gameHeight && screenWidth >= gameWidth) { // Consider ratios
//             if (screenRatio >= gameRatio) { // Increase gameHeight
//                 scale = screenHeight / gameHeight;
//                 //console.log("case 5_1");
//             } else { // Increase gameWidth
//                 scale = screenWidth / gameWidth;
//                 //console.log("case 5_2"); // never happens
//             }
//         } else if (screenHeight >= gameHeight && screenWidth < gameWidth) { // Decrease the gameWidth
//             scale = screenWidth / gameWidth;
//             //console.log("case 6"); // never happens
//         } else if (screenHeight < gameHeight && screenWidth >= gameWidth) { // Decrease the gameHeight
//             scale = screenHeight / gameHeight;
//             //console.log("case 7");
//         } else { // Consider ratios
//             if (screenRatio >= gameRatio) { // Decrease gameHeight
//                 scale = screenHeight / gameHeight;
//                 //console.log("case 8_1");
//             } else { // Decrease gameWidth
//                 scale = screenWidth / gameWidth;
//                 //console.log("case 8_2"); // never happens
//             }
//         }
//     }

//     var board = document.getElementById("boardDiv");
//     board.style.zoom = scale;
//     board.style.display = "block";
//     //console.log("scalew: " + scale);
// };
// rescale();
// window.setTimeout(rescale, 0);