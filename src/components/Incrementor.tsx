import * as React from "react";
import { ObservableFetcher, StoreSubscription } from "rfluxx";

import { CounterStore, ICounterStore, ICounterStoreState } from "../store/CounterStore";

import * as styles from "./Incrementor.css";

export interface IIncrementorState
{
    currentCount: number;
}

export interface IIncrementorProps
{
    store: ICounterStore;
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
            this.props.store,
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
        this.subscription.store.incrementCounter.trigger(null);
    }

    public render(): any
    {
        return <div className={styles.Incrementor}>
            <div className={styles.Counter}>Current count: {this.state.currentCount}</div>
            <div>
                <button className={styles.Button} onClick={x => this.handleIncrement(x)}>Increment</button>
            </div>
        </div>;
    }
}