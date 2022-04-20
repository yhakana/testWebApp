/***** 分派一個模組物件給exports-1 *****/

let myModule1 = {
    info: function(info) {
        console.log("info message: " + info);
    },
    warning: function(warning) {
        console.log("warning message: " + warning);
    },
    error: function(error) {
        console.log("error message: " + error);
    }
};

// exports = myModule;
// or
module.exports = myModule1;