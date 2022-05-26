import React from "react";
import Icon from ".";
import SlashIcon from "./Sections/Slash";

export interface BaseIconProps {
    slashed?        : boolean,
    className?      : string,
    [key: string]   : any
}

export default abstract class BaseIcon extends React.Component<BaseIconProps> {

    abstract readonly width     : number;
    abstract readonly height    : number;
    abstract readonly content   : any;
    abstract readonly className : string;
    
    public render() {

        const { width, height, props } = this;

        const { slashed, className: classFromProps, ...otherProps} = props;
        const classToApply = `${(classFromProps ?? "")} ${(this.className ?? "")}`.trim();
        
        let { content } = this;
        if (slashed) {
            content = (
                <g mask="url(#slash-mask)" className="slashed">
                    {content}
                </g>
            )
        }

        return  (
            <Icon className={classToApply} {...otherProps}>
                <svg viewBox={`0 0 ${width} ${height}`}>
                    {content}
                    {slashed && <SlashIcon width={width} height={height} />}
                </svg>
            </Icon>
        );
    }
}