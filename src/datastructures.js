"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxHeapBased = void 0;
var maxHeapBased = /** @class */ (function () {
    function maxHeapBased() {
        this.mapNodes = [];
    }
    maxHeapBased.prototype.push = function (node, priority) {
        this.mapNodes.push({ priority: priority, data: node });
        this.heapify(this.mapNodes.length - 1);
    };
    maxHeapBased.prototype.pop = function () {
        if (this.mapNodes.length === 0) {
            return undefined;
        }
        var result = this.mapNodes[0].data;
        var end = this.mapNodes.pop();
        if (this.mapNodes.length > 0 && end) {
            this.mapNodes[0] = end;
            this.heapifyDown(0);
        }
        return result;
    };
    maxHeapBased.prototype.peek = function () {
        if (this.mapNodes.length === 0) {
            return undefined;
        }
        return this.mapNodes[0].data;
    };
    maxHeapBased.prototype.size = function () {
        return this.mapNodes.length;
    };
    maxHeapBased.prototype.isEmpty = function () {
        return this.mapNodes.length === 0;
    };
    // top(): T[] {
    //     let topCities: T[] = [];
    //     for (let i = 0; i < 10; i++) {
    //         topCities.push(this..pop().data);
    //     }
    //     for (let i = 0; i < 10; i++) {
    //         console.log(topCities[i]);
    //     }
    //     return topCities;
    // }
    maxHeapBased.prototype.heapify = function (index) {
        var _a;
        var parent = Math.floor((index) / 2);
        if (this.mapNodes[parent] && this.mapNodes[index].priority > this.mapNodes[parent].priority) {
            _a = [this.mapNodes[index], this.mapNodes[parent]], this.mapNodes[parent] = _a[0], this.mapNodes[index] = _a[1];
            this.heapify(parent);
        }
    };
    maxHeapBased.prototype.heapifyDown = function (index) {
        var _a;
        var leftChildIndex = 2 * index + 1;
        var rightChildIndex = 2 * index + 2;
        var largestIndex = index;
        if (leftChildIndex < this.mapNodes.length && this.mapNodes[leftChildIndex] > this.mapNodes[largestIndex]) {
            largestIndex = leftChildIndex;
        }
        if (rightChildIndex < this.mapNodes.length && this.mapNodes[rightChildIndex] > this.mapNodes[largestIndex]) {
            largestIndex = rightChildIndex;
        }
        if (largestIndex !== index) {
            _a = [this.mapNodes[largestIndex], this.mapNodes[index]], this.mapNodes[index] = _a[0], this.mapNodes[largestIndex] = _a[1];
            this.heapifyDown(largestIndex);
        }
    };
    return maxHeapBased;
}());
exports.maxHeapBased = maxHeapBased;
