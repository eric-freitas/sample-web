import React from "react";

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