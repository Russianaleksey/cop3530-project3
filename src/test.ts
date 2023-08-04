import { maxHeapBased } from './datastructures';
const test = new maxHeapBased();

test.setTemp();



for (let i = 0; i < 10; i++) 
{
    console.log(test.peek());
    test.pop();
}
