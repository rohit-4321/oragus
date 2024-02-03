export class SocketQueue<T> {
    private storage: T[] = [];

    constructor(initialElements: T[] = []) {
        this.storage = [...initialElements];
    }

    enqueue(item: T): void {
        this.storage.push(item);
    }

    dequeue(): T | undefined {
        return this.storage.shift();
    }

    peek(): T | undefined {
        return this.storage[0];
    }

    isEmpty(): boolean {
        return this.storage.length === 0;
    }

    size(): number {
        return this.storage.length;
    }
}