export class maxHeapBased<T>{
    mapNodes: { priority: number;  data: T } [];
    
    constructor() {
        this.mapNodes = [];
    }
    
    push(node: any, priority: number) {
        this.mapNodes.push({priority: priority, data: node});
        this.heapify(this.mapNodes.length - 1);
    }

    pop(): T | undefined {
        if(this.mapNodes.length === 0) {
            return undefined;
        }
        const result = this.mapNodes[0].data;
        const end = this.mapNodes.pop();
        if(this.mapNodes.length > 0 && end) {
            this.mapNodes[0] = end;
            this.heapifyDown(0);
        }
        return result;
    }

    peek(): any {
        if(this.mapNodes.length === 0) {
            return undefined;
        }
        return this.mapNodes[0].data;
    }
    
    size(): number {
        return this.mapNodes.length;
    }

    isEmpty(): boolean {
        return this.mapNodes.length === 0;
    }

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

    heapify(index: number) {
        let parent = Math.floor((index) / 2);
        if (this.mapNodes[parent] && this.mapNodes[index].priority > this.mapNodes[parent].priority) {
            [this.mapNodes[parent], this.mapNodes[index]] = [this.mapNodes[index], this.mapNodes[parent]];
            this.heapify(parent);
        }
    }

    heapifyDown(index: number) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let largestIndex = index;

        if (leftChildIndex < this.mapNodes.length && this.mapNodes[leftChildIndex] > this.mapNodes[largestIndex]) {
        largestIndex = leftChildIndex;
        }

        if (rightChildIndex < this.mapNodes.length && this.mapNodes[rightChildIndex] > this.mapNodes[largestIndex]) {
        largestIndex = rightChildIndex;
        }

        if (largestIndex !== index) {
        [this.mapNodes[index], this.mapNodes[largestIndex]] = [this.mapNodes[largestIndex], this.mapNodes[index]];
        this.heapifyDown(largestIndex);
        }
    }
}
