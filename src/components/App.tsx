import * as React from "react";

import { MyFirstComponent } from "./MyFirstComponent";
import { Incrementor } from "./Incrementor";
import { ComponentSwitch } from "./ComponentSwitch";

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

        return <ComponentSwitch childTitles={titles}>
           <MyFirstComponent greeting="Hello Team!" />
           <Incrementor initialCount={0} />
        </ComponentSwitch>;
    }
}