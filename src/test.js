"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var datastructures_1 = require("./datastructures");
var test = new datastructures_1.maxHeapBased();
test.setTemp();
for (var i = 0; i < 10; i++) {
    console.log(test.peek());
    test.pop();
}
