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
    maxHeapBased.prototype.top = function () {
        var topCities = [];
        for (var i = 0; i < 15; i++) {
            topCities.push(this.mapNodes[i].data);
        }
        for (var i = 0; i < topCities.length; i++) {
            console.log(topCities[i]);
        }
        return topCities;
    };
    maxHeapBased.prototype.heapify = function (index) {
        var _a;
        var parent = Math.floor((index - 1) / 2);
        if (this.mapNodes[parent] && this.mapNodes[index].priority > this.mapNodes[parent].priority) {
            _a = [this.mapNodes[index], this.mapNodes[parent]], this.mapNodes[parent] = _a[0], this.mapNodes[index] = _a[1];
            this.heapify(parent);
        }
    };
    maxHeapBased.prototype.heapifyDown = function (index) {
        var _a;
        var left = 2 * index + 1;
        var right = 2 * index + 2;
        var largest = index;
        if (this.mapNodes[left] && this.mapNodes[left].priority > this.mapNodes[largest].priority) {
            largest = left;
        }
        if (this.mapNodes[right] && this.mapNodes[right].priority > this.mapNodes[largest].priority) {
            largest = right;
        }
        if (largest != index) {
            _a = [this.mapNodes[largest], this.mapNodes[index]], this.mapNodes[index] = _a[0], this.mapNodes[largest] = _a[1];
            this.heapifyDown(largest);
        }
    };
    return maxHeapBased;
}());
exports.maxHeapBased = maxHeapBased;
