import * as React from "react";
import { ObservableFetcher, StoreSubscription } from "rfluxx";

import { CounterStore, ICounterStore, ICounterStoreState } from "../store/CounterStore";

const store = new CounterStore({
    fetcher: new ObservableFetcher()
});

export interface IIncrementorState
{
    currentCount: number;
}

export interface IIncrementorProps
{
    initialCount: number;
}

export class Incrementor extends React.Component<IIncrementorProps, IIncrementorState> 
{
    private subscription: StoreSubscription<ICounterStore, ICounterStoreState> = new StoreSubscription();

    constructor(props: IIncrementorProps)
    {
        super(props);

        this.state = {
            currentCount: props.initialCount
        };
    }

    public componentDidMount()
    {
        this.subscription.subscribeStore(
            store,
            state =>
            {
                this.setState({
                    ...this.state,
                    currentCount: state.counter
                });
            });
    }

    public componentWillUnmount()
    {
        this.subscription.unsubscribe();
    }

    private handleIncrement(x: any): void
    {
        store.incrementCounter.trigger(null);
    }

    public render(): any
    {
        return <div>
            <div>Current count: {this.state.currentCount}</div>
            <div>
                <button onClick={x => this.handleIncrement(x)}>Increment</button>
            </div>
        </div>;
    }
}