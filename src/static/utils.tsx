import React from "react";
import { BaseIconProps } from "../components/Icons/Icon/BaseIcon";

export const sleep = (ms: number):Promise<number> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const defaultsToTrue = (expr?: boolean):boolean => {
    return (expr === undefined || expr === null || expr);
}

export type SimpleCallback = () => void;

export type OptionalString = string | null | undefined;

export const joinClassNames = (...args: OptionalString[]): string => {
    return args.filter(e => !!(e?.trim())).map(e => e?.replace(/\s+/g, "__")).join(" ");
}

export const appendClassNames = (current: OptionalString, ...args: OptionalString[]): string => {
    return `${current ?? ""} ${joinClassNames(...args)}`.trim();
}

export const wrapText = (text: string | null | undefined, tagName: string, props?: any): JSX.Element | null => {
    return !!(text?.trim()) ? React.createElement(tagName, props, text ) : null;
}

export type IconRenderer = {
    [key: string]   : (props?: BaseIconProps) => JSX.Element
}

export const renderIcons = (icons: IconRenderer, props?: BaseIconProps, mapper?: (name: string, icon: JSX.Element) => JSX.Element) => {
    return Object.entries(icons)
        .sort((a,b) => {
            const [ nameA ] = a;
            const [ nameB ] = b;
            return nameA.localeCompare(nameB);
        })
        .map(e => {
            const [ name, icon ] = e;
            const element = icon(props);
            return mapper?.call(this, name, element) ?? element;
        });
}

export const camelCaseToWords = (text: string): string => {
    text = text ?? "";
    return text
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, function(str){ return str.toUpperCase(); })
}