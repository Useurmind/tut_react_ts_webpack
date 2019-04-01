import * as React from "react";
import { StoreSubscription, resolveStore, ObservableFetcher } from "rfluxx";

import { CounterStore, ICounterStore, ICounterStoreState } from "../store/CounterStore";

import * as styles from "./CounterPresentation.css";

export interface ICounterPresentationState
{
    currentCount?: number;
}

export interface ICounterPresentationProps
{
    store: ICounterStore;
}

export class CounterPresentation extends React.Component<ICounterPresentationProps, ICounterPresentationState> 
{
    private subscription: StoreSubscription<ICounterStore, ICounterStoreState> = new StoreSubscription();

    constructor(props: ICounterPresentationProps)
    {
        super(props);

        this.state = {
        };
    }

    public componentDidMount()
    {
        this.subscription.subscribeStore(
            this.props.store,
            storeState =>
            {
                this.setState({
                    ...this.state,
                    currentCount: storeState.counter
                });
            });
    }

    public componentWillUnmount()
    {
        this.subscription.unsubscribe();
    }

    public render(): any
    {
        return <div className={styles.CounterPresentation}>
            <div className={styles.Counter}>Current count: {this.state.currentCount}</div>
        </div>;
    }
}