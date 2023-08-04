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

    top(): T[] {
        let topCities: T[] = [];
        for (let i = 0; i < 15; i++) {
            topCities.push(this.mapNodes[i].data);
        }

        for (let i = 0; i < topCities.length; i++) {
            console.log(topCities[i]);
        }
        return topCities;
    }

    heapify(index: number) {
        let parent = Math.floor((index - 1) / 2);
        if (this.mapNodes[parent] && this.mapNodes[index].priority > this.mapNodes[parent].priority) {
            [this.mapNodes[parent], this.mapNodes[index]] = [this.mapNodes[index], this.mapNodes[parent]];
            this.heapify(parent);
        }
    }

    heapifyDown(index: number) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let largest = index;
        if (this.mapNodes[left] && this.mapNodes[left].priority > this.mapNodes[largest].priority) {
            largest = left;
        }
        if (this.mapNodes[right] && this.mapNodes[right].priority > this.mapNodes[largest].priority) {
            largest = right;
        }
        if (largest != index) {
            [this.mapNodes[index], this.mapNodes[largest]] = [this.mapNodes[largest], this.mapNodes[index]];
            this.heapifyDown(largest);
        }
    }
}

export class CustomSorting<T> {
    private  dataNodes: {priority: number; data: T} [] = [];
    sortedSinceLastPush: boolean = false;
    push(priority: number, data: T) {
        this.dataNodes.push({priority: priority, data: data});
        this.sortedSinceLastPush = false;
    }

    empty() {
        this.sortedSinceLastPush = false;
        this.dataNodes = [];
    }

    private partition(arr: {priority: number; data: T}[], left: number, right: number) {
        let mid = Math.floor((left + right)/2);
        let pivotPriority = arr[mid].priority;
        let i = left;
        let j = right;
        while(i <= j) {
            while(arr[i].priority > pivotPriority) {
                i++;
            }
            while(arr[j].priority < pivotPriority) {
                j--;
            }
            if(i <= j) {
                let t = arr[i];
                arr[i] = arr[j];
                arr[j] = t;
                i++;
                j--;
            }
        }
        return i;
    }

    private internalSort(dataNodes: {priority: number; data: T} [], left: number, right: number) {
        let splitIdx;
        if(dataNodes.length > 1) {
            splitIdx = this.partition(dataNodes, left, right);
            if(left < splitIdx - 1) {
                this.internalSort(dataNodes, left, splitIdx-1);
            }
            if(splitIdx < right) {
                this.internalSort(dataNodes, splitIdx, right);
            }
        }
        return dataNodes;
    }
    sort() {
        this.internalSort(this.dataNodes, 0, this.dataNodes.length-1);
        this.sortedSinceLastPush = true;
    }

    getAllWithPriority() {
        if(this.sortedSinceLastPush == false) {
            this.sort();
        }
        return this.dataNodes;
    }

    getAllNodesOnly() {
        if(this.sortedSinceLastPush == false) {
            this.sort();
        }
        let res: Array<T> = [];
        for(let i = 0; i < this.dataNodes.length; i++) {
            res.push(this.dataNodes[i].data);
        }
        return res;
    }


    getTopNWithPriority(n: number) {
        if(this.sortedSinceLastPush == false) {
            this.sort();
        }
        let res: {priority: number; data: T} [] = [];
        for(let i = 0; i < n; i++) {
            res.push(this.dataNodes[i]);
        }   
        return res;
    }

    getTopNNodesOnly(n : number) {
        if(this.sortedSinceLastPush == false) {
            this.sort();
        }
        let res: Array<T> = [];
        for(let i = 0; i < n; i++) {
            res.push(this.dataNodes[i].data);
        }
        return res;
    }
}