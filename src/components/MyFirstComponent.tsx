import * as React from "react";

export interface IMyFirstComponentState
{

}

export interface IMyFirstComponentProps
{
    greeting: string;
}

export class MyFirstComponent extends React.Component<IMyFirstComponentProps, IMyFirstComponentState> 
{
    constructor(props: IMyFirstComponentProps)
    {
        super(props);

        this.state = {

        };
    }

    public render(): any
    {
        return <div>
            MyFirstComponent is here.
            {this.props.greeting}
        </div>;
    }
}