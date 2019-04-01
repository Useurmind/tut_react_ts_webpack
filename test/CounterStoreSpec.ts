import { CounterStore } from "../src/store/CounterStore";

describe("CounterStore", () => {
    let store: CounterStore = new CounterStore({});
    beforeEach(()=> {
        store = new CounterStore({
            turnOffInitOnStart: true
        });
    })    

    it("initial counter should be zero", () => {
        store.subscribe(x => {
            expect(x.counter).toEqual(0);
        });
    });

    it("after calling increment counter is one", () => {
        store.incrementCounter.trigger(null);
        store.subscribe(x => {
            expect(x.counter).toEqual(1);
        });
    });
});