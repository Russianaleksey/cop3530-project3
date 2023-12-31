export class ShellSort<T> {
    mapNodes: { priority: number; data: T }[];

    constructor() {
        this.mapNodes = [];
    }

    //adds an element to the priority queue with a given priority
    push(node: any, priority: number) {
        this.mapNodes.push({ data: node, priority: priority });
    }

    //performs shell sort algorithm to sort elements based on their priorities
    sort() {
        const n = this.mapNodes.length;
        let gap = Math.floor(n / 2);
        while (gap > 0) {
            for (let i = gap; i < n; i++) {
                const temp = this.mapNodes[i];
                let j = i;
                while (j >= gap && this.mapNodes[j - gap].priority < temp.priority) {
                    this.mapNodes[j] = this.mapNodes[j - gap];
                    j -= gap;
                }
                this.mapNodes[j] = temp;
            }
            gap = Math.floor(gap / 2);
        }
    }

    //gets the top N elements in the priority queue, returning only the data portion of the objects
    topNDataOnly(n: number): T[] {
        this.sort();
        let topCities: T[] = [];
        for (let i = 0; i < n && i < this.mapNodes.length; i++) {
            topCities.push(this.mapNodes[i].data);
        }
        return topCities;
    }

    //gets the top N elements in the priority queue, returns both priorities and data
    topNWithPriority(n: number) {
        this.sort();
        return this.mapNodes.slice(0, n);
    }

    //gets all elements in the priority queue, returns both priorities and data
    getAllWithPriority() {
        this.sort();
        return this.mapNodes;
    }

    empty() {
        this.mapNodes = [];
    }
}

export class CustomSorting<T> {
    private  dataNodes: {priority: number; data: T} [] = [];
    sortedSinceLastPush: boolean = false;

    //adds element to the custom sorting queue with a given priority
    push(priority: number, data: T) {
        this.dataNodes.push({priority: priority, data: data});
        this.sortedSinceLastPush = false;
    }

    empty() {
        this.sortedSinceLastPush = false;
        this.dataNodes = [];
    }

    //partitioning step of the quicksort algorithm
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

    //internal recursive sorting function using quicksort
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

    //performs the custom sorting algorithm using quicksort
    sort() {
        this.internalSort(this.dataNodes, 0, this.dataNodes.length-1);
        this.sortedSinceLastPush = true;
    }

    //gets all elements in the custom sorting queue, returns both priorities and data
    getAllWithPriority() {
        if(this.sortedSinceLastPush == false) {
            this.sort();
        }
        return this.dataNodes;
    }

    //gets all elements in the custom sorting queue, returns only the data portion of the objects
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

    //get the top N elements in the custom sorting queue, returns both priorities and data
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

    //gets the top N elements in the custom sorting queue, returns only the data portion of the objects
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
