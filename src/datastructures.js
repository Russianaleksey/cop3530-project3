"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSorting = exports.maxHeapBased = void 0;
var maxHeapBased = /** @class */ (function () {
    function maxHeapBased() {
        this.mapNodes = [];
    }
    maxHeapBased.prototype.push = function (node, priority) {
        this.mapNodes.push({ data: node, priority: priority });
        this.heapify(this.mapNodes.length - 1);
    };
    maxHeapBased.prototype.pop = function () {
        if (this.mapNodes.length === 0) {
            return undefined;
        }
        var result = this.mapNodes[0].data;
        var end = this.mapNodes[this.mapNodes.length - 1];
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
    maxHeapBased.prototype.topNDataOnly = function (n) {
        var topCities = [];
        for (var i = 0; i < n; i++) {
            topCities.push(this.mapNodes[i].data);
        }
        return topCities;
    };
    maxHeapBased.prototype.topNWithPriority = function (n) {
        var topCities = [];
        for (var i = 0; i < n; i++) {
            topCities.push(this.mapNodes[i]);
        }
        return topCities;
    };
    maxHeapBased.prototype.heapify = function (index) {
        var _a;
        if (index === 0)
            return;
        var parent = Math.floor((index - 1) / 2);
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
        if (leftChildIndex < this.mapNodes.length && this.mapNodes[leftChildIndex].priority > this.mapNodes[largestIndex].priority) {
            largestIndex = leftChildIndex;
        }
        if (rightChildIndex < this.mapNodes.length && this.mapNodes[rightChildIndex].priority > this.mapNodes[largestIndex].priority) {
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
var CustomSorting = /** @class */ (function () {
    function CustomSorting() {
        this.dataNodes = [];
        this.sortedSinceLastPush = false;
    }
    CustomSorting.prototype.push = function (priority, data) {
        this.dataNodes.push({ priority: priority, data: data });
        this.sortedSinceLastPush = false;
    };
    CustomSorting.prototype.empty = function () {
        this.sortedSinceLastPush = false;
        this.dataNodes = [];
    };
    CustomSorting.prototype.partition = function (arr, left, right) {
        var mid = Math.floor((left + right) / 2);
        var pivotPriority = arr[mid].priority;
        var i = left;
        var j = right;
        while (i <= j) {
            while (arr[i].priority > pivotPriority) {
                i++;
            }
            while (arr[j].priority < pivotPriority) {
                j--;
            }
            if (i <= j) {
                var t = arr[i];
                arr[i] = arr[j];
                arr[j] = t;
                i++;
                j--;
            }
        }
        return i;
    };
    CustomSorting.prototype.internalSort = function (dataNodes, left, right) {
        var splitIdx;
        if (dataNodes.length > 1) {
            splitIdx = this.partition(dataNodes, left, right);
            if (left < splitIdx - 1) {
                this.internalSort(dataNodes, left, splitIdx - 1);
            }
            if (splitIdx < right) {
                this.internalSort(dataNodes, splitIdx, right);
            }
        }
        return dataNodes;
    };
    CustomSorting.prototype.sort = function () {
        this.internalSort(this.dataNodes, 0, this.dataNodes.length - 1);
        this.sortedSinceLastPush = true;
    };
    CustomSorting.prototype.getAllWithPriority = function () {
        if (this.sortedSinceLastPush == false) {
            this.sort();
        }
        return this.dataNodes;
    };
    CustomSorting.prototype.getAllNodesOnly = function () {
        if (this.sortedSinceLastPush == false) {
            this.sort();
        }
        var res = [];
        for (var i = 0; i < this.dataNodes.length; i++) {
            res.push(this.dataNodes[i].data);
        }
        return res;
    };
    CustomSorting.prototype.getTopNWithPriority = function (n) {
        if (this.sortedSinceLastPush == false) {
            this.sort();
        }
        var res = [];
        for (var i = 0; i < n; i++) {
            res.push(this.dataNodes[i]);
        }
        return res;
    };
    CustomSorting.prototype.getTopNNodesOnly = function (n) {
        if (this.sortedSinceLastPush == false) {
            this.sort();
        }
        var res = [];
        for (var i = 0; i < n; i++) {
            res.push(this.dataNodes[i].data);
        }
        return res;
    };
    return CustomSorting;
}());
exports.CustomSorting = CustomSorting;
