import * as React from "react";

export interface IComponentSwitchState
{
    activeComponentIndex?: number;
}

export interface IComponentSwitchProps
{
    childTitles: string[];
}

export class ComponentSwitch extends React.Component<IComponentSwitchProps, IComponentSwitchState> 
{
    constructor(props: IComponentSwitchProps)
    {
        super(props);

        this.state = {
        };
    }

    private handlePageSelect(x: any): void
    {
        this.setState({
            ...this.state,
            activeComponentIndex: x.target.value
        });
    }

    public render(): any
    {
        const childArray = this.props.children as any[];

        return <div>
            <div>
            <span>Select page</span>
            <select value={this.state.activeComponentIndex} onChange={x => this.handlePageSelect(x)}>
            {
                this.props.childTitles.map((x, i) => {
                    return <option value={i}>{x}</option>
                })
            }
            </select>
            </div>
            <div>
                { this.state.activeComponentIndex != null && childArray[this.state.activeComponentIndex] }
            </div>
        </div>;
    }
}