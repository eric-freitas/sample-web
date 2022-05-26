interface ConditionalRenderingProps {
    condition   : boolean,
    ifTrue?     : any,
    ifFalse?    : any
}

export default function  ConditionalRendering(props: ConditionalRenderingProps)  {
    const { condition, ifTrue, ifFalse } = props;

    return (condition ? (ifTrue ?? null) : (ifFalse ?? null));
}