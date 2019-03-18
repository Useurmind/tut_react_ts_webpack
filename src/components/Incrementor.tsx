import * as React from "react";

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
    constructor(props: IIncrementorProps)
    {
        super(props);

        this.state = {
            currentCount: props.initialCount
        };
    }

    private handleIncrement(x: any): void
    {
        this.setState({
            ...this.state,
            currentCount: this.state.currentCount + 1
        });
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