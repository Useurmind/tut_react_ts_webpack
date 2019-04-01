import * as React from "react";

import { MyFirstComponent } from "./MyFirstComponent";
import { Incrementor } from "./Incrementor";
import { ComponentSwitch } from "./ComponentSwitch";
import { CounterPresentation } from "./CounterPresentation";
import { CounterStore } from "../store/CounterStore";
import { ObservableFetcher } from "rfluxx";

declare const require: any;
const styles = require("./App.css");

const store = new CounterStore({
    fetcher: new ObservableFetcher()
});

export interface IAppState
{
    
}

export interface IAppProps
{
    
}

export class App extends React.Component<IAppProps, IAppState> 
{
    constructor(props: IAppProps)
    {
        super(props);

        this.state = {
        };
    }

    public render(): any
    {
        const titles = [
            "My First Component",
            "Incrementor"
        ]

        return <div>
            <CounterPresentation store={store} />
            <ComponentSwitch childTitles={titles}>
                <MyFirstComponent greeting="Hello Team!" />
                <Incrementor initialCount={0} store={store} />
            </ComponentSwitch>
        </div>;
    }
}