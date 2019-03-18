import { IAction, IStoreOptions, Store, IStore, IInjectedStoreOptions } from "rfluxx";

export interface ICounterStoreState
{
    counter: number;
}

export interface ICounterStoreOptions extends IInjectedStoreOptions
{

}

export interface ICounterStore extends IStore<ICounterStoreState>
{
    incrementCounter: IAction<any>;
}

export class CounterStore extends Store<ICounterStoreState> implements ICounterStore
{
    public readonly incrementCounter: IAction<any>;

    constructor(private options: ICounterStoreOptions)
    {
        super({
            ...options,
            initialState: {
                counter: 0
            }
        });

        this.incrementCounter = this.createActionAndSubscribe<any>(x => this.onIncrementCounter());

        // load initial random value for counter
        this.fetch("https://www.random.org/integers/?num=1&min=1&max=50&col=1&base=10&format=plain&rnd=new")
            .subscribe(response => {
                response.json()
                        .then(json => {
                            this.setState({
                                ...this.state,
                                counter: json
                            })
                        });
            });
    }

    private onIncrementCounter(): void 
    {
        this.setState({
            ...this.state,
            counter: this.state.counter + 1
        })
    }
}
