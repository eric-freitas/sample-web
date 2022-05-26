import 'jest-extended/all';
import * as sniff from '../../src/static/sniffKey';


const  defaultKeyPressEventData = {
    altKey      : false,
    bubbles     : true,
    cancelable  : true,
    charCode    : 0,
    code        : "Digit1",
    composed    : true,
    ctrlKey     : false,
    detail      : 0,
    isComposing : false,
    key         : "1",
    keyCode     : 49,
    location    : 0,
    metaKey     : false,
    repeat      : false,
    shiftKey    : false,
    view        : window,
    which       : 49
};

describe("Sniff Key Lib test",  () => {

    it ("should result the same closure", () => {

        const functionA = sniff.sniffKey();
        const functionB = sniff.sniffKey();

        expect(functionA).toBe(functionB);
        
    });

    it ("should not trigger a simple key pressed event", () => {
        const sniffKey = sniff.sniffKey();

        let keyWasPressed : boolean = false;

        const onKeyPress = () => keyWasPressed = true;

        sniffKey.addKey({
            keyCode : "Digit2",
            onPress : onKeyPress
        });

        const keyPressEvent = new KeyboardEvent('keydown', {
                ...defaultKeyPressEventData,
                code    : "Digit1",
                key     : "1",
                keyCode : 49,
                which   : 49
            }
        );

        expect(keyWasPressed).toBe(false);
        document.dispatchEvent(keyPressEvent);
        expect(keyWasPressed).toBe(false);
    });

    it ("should trigger a simple key pressed event", () => {
        const sniffKey = sniff.sniffKey();

        let keyWasPressed : boolean = false;

        const onKeyPress = () => keyWasPressed = true;

        sniffKey.addKey({
            keyCode : "Digit1",
            onPress : onKeyPress
        });

        const keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit1",
            key     : "1",
            keyCode : 49,
            which   : 49
        });

        expect(keyWasPressed).toBe(false);
        document.dispatchEvent(keyPressEvent);
        expect(keyWasPressed).toBe(true);
    });

    it ("should not trigger a key pressed with shift event", () => {
        const sniffKey = sniff.sniffKey();

        let keyWasPressed : boolean = false;

        const onKeyPress = () => keyWasPressed = true;

        sniffKey.addKey({
            keyCode : "Digit1",
            onPress : onKeyPress
        });

        const keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit1",
            key     : "!",
            keyCode : 49,
            which   : 49,
            shiftKey: true
        });

        expect(keyWasPressed).toBe(false);
        document.dispatchEvent(keyPressEvent);
        expect(keyWasPressed).toBe(false);
    });

    it ("should trigger a key pressed with shift event", () => {
        const sniffKey = sniff.sniffKey();

        let keyWasPressed : boolean = false;

        const onKeyPress = () => keyWasPressed = true;

        sniffKey.addKey({
            keyCode     : "Digit1",
            specialKeys : [sniff.SpecialKey.Shift],
            onPress     : onKeyPress
        });

        const keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit1",
            key     : "!",
            keyCode : 49,
            which   : 49,
            shiftKey: true
        });

        expect(keyWasPressed).toBe(false);
        document.dispatchEvent(keyPressEvent);
        expect(keyWasPressed).toBe(true);
    });

    it ("should not trigger a key pressed with ctrl event", () => {
        const sniffKey = sniff.sniffKey();

        let keyWasPressed : boolean = false;

        const onKeyPress = () => keyWasPressed = true;

        sniffKey.addKey({
            keyCode : "Digit1",
            onPress : onKeyPress
        });

        const keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit1",
            key     : "1",
            keyCode : 49,
            which   : 49,
            ctrlKey : true
        });

        expect(keyWasPressed).toBe(false);
        document.dispatchEvent(keyPressEvent);
        expect(keyWasPressed).toBe(false);
    });

    it ("should trigger a key pressed with ctrl event", () => {
        const sniffKey = sniff.sniffKey();

        let keyWasPressed : boolean = false;

        const onKeyPress = () => keyWasPressed = true;

        sniffKey.addKey({
            keyCode     : "Digit1",
            specialKeys : [sniff.SpecialKey.Control],
            onPress     : onKeyPress
        });

        const keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit1",
            key     : "1",
            keyCode : 49,
            which   : 49,
            ctrlKey : true
        });

        expect(keyWasPressed).toBe(false);
        document.dispatchEvent(keyPressEvent);
        expect(keyWasPressed).toBe(true);
    });


    it ("should not trigger a key pressed with alt event", () => {
        const sniffKey = sniff.sniffKey();

        let keyWasPressed : boolean = false;

        const onKeyPress = () => keyWasPressed = true;

        sniffKey.addKey({
            keyCode : "Digit1",
            onPress : onKeyPress
        });

        const keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit1",
            key     : "1",
            keyCode : 49,
            which   : 49,
            altKey  : true
        });

        expect(keyWasPressed).toBe(false);
        document.dispatchEvent(keyPressEvent);
        expect(keyWasPressed).toBe(false);
    });

    it ("should trigger a key pressed with alt event", () => {
        const sniffKey = sniff.sniffKey();

        let keyWasPressed : boolean = false;

        const onKeyPress = () => keyWasPressed = true;

        sniffKey.addKey({
            keyCode : "Digit1",
            specialKeys : [sniff.SpecialKey.Alt],
            onPress : onKeyPress
        });

        const keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit1",
            key     : "1",
            keyCode : 49,
            which   : 49,
            altKey  : true
        });

        expect(keyWasPressed).toBe(false);
        document.dispatchEvent(keyPressEvent);
        expect(keyWasPressed).toBe(true);
    });


    it ("should not trigger a key pressed with cmd event", () => {
        const sniffKey = sniff.sniffKey();

        let keyWasPressed : boolean = false;

        const onKeyPress = () => keyWasPressed = true;

        sniffKey.addKey({
            keyCode : "Digit1",
            onPress : onKeyPress
        });

        const keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit1",
            key     : "1",
            keyCode : 49,
            which   : 49,
            metaKey : true
        });

        expect(keyWasPressed).toBe(false);
        document.dispatchEvent(keyPressEvent);
        expect(keyWasPressed).toBe(false);
    });

    it ("should trigger a key pressed with cmd event", () => {
        const sniffKey = sniff.sniffKey();

        let keyWasPressed : boolean = false;

        const onKeyPress = () => keyWasPressed = true;

        sniffKey.addKey({
            keyCode     : "Digit1",
            specialKeys : [sniff.SpecialKey.Cmd],
            onPress     : onKeyPress
        });

        const keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit1",
            key     : "1",
            keyCode : 49,
            which   : 49,
            metaKey : true
        });

        expect(keyWasPressed).toBe(false);
        document.dispatchEvent(keyPressEvent);
        expect(keyWasPressed).toBe(true);
    });


    it ("should not trigger a key pressed with ctrl alt event", () => {
        const sniffKey = sniff.sniffKey();

        let keyWasPressed : boolean = false;

        const onKeyPress = () => keyWasPressed = true;

        sniffKey.addKey({
            keyCode     : "Digit1",
            specialKeys : [sniff.SpecialKey.Alt],
            onPress     : onKeyPress
        });

        const keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit1",
            key     : "¹",
            keyCode : 49,
            which   : 49,
            altKey  : true,
            ctrlKey : true
        });

        expect(keyWasPressed).toBe(false);
        document.dispatchEvent(keyPressEvent);
        expect(keyWasPressed).toBe(false);
    });

    it ("should trigger a key pressed with ctrl alt event", () => {
        const sniffKey = sniff.sniffKey();

        let keyWasPressed : boolean = false;

        const onKeyPress = () => keyWasPressed = true;

        sniffKey.addKey({
            keyCode     : "Digit1",
            specialKeys : [sniff.SpecialKey.Alt, sniff.SpecialKey.Control],
            onPress     : onKeyPress
        });

        const keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit1",
            key     : "¹",
            keyCode : 49,
            which   : 49,
            altKey  : true,
            ctrlKey : true
        });


        expect(keyWasPressed).toBe(false);
        document.dispatchEvent(keyPressEvent);
        expect(keyWasPressed).toBe(true);
    });


    it ("should handle different key events", () => {
        const sniffKey = sniff.sniffKey();

        const keysPressed : string[] = [];

        const onKeyPress = (key: string) => keysPressed.push(key);

        sniffKey.addKey({
            keyCode : "Digit1",
            onPress : onKeyPress
        });

        sniffKey.addKey({
            keyCode     : "Digit2",
            specialKeys : [sniff.SpecialKey.Control, sniff.SpecialKey.Alt],
            onPress     : onKeyPress
        });


        expect(keysPressed.includes("Digit1")).toBe(false);
        expect(keysPressed.includes("Digit2")).toBe(false);
        
        // 1 pressed with ctrl + alt
        let keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit1",
            key     : "¹",
            keyCode : 49,
            which   : 49,
            ctrlKey : true,
            altKey  : true
        });
        document.dispatchEvent(keyPressEvent);
        expect(keysPressed.includes("Digit1")).toBe(false);

        // 2 pressed without ctrl + alt
        keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit2",
            key     : "2",
            keyCode : 50,
            which   : 50,
            ctrlKey : false,
            altKey  : false
        });
        document.dispatchEvent(keyPressEvent);
        expect(keysPressed.includes("Digit2")).toBe(false);

         // 1 pressed without ctrl + alt
         keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit1",
            key     : "1",
            keyCode : 49,
            which   : 49,
            ctrlKey : false,
            altKey  : false
        });
        document.dispatchEvent(keyPressEvent);
        expect(keysPressed.includes("Digit1")).toBe(true);

         // 2 pressed with ctrl + alt
         keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit2",
            key     : "²",
            keyCode : 50,
            which   : 50,
            ctrlKey : true,
            altKey  : true
        });
        document.dispatchEvent(keyPressEvent);
        expect(keysPressed.includes("Digit2")).toBe(true);

        expect(keysPressed).toStrictEqual(["Digit1", "Digit2"]);

    });

});
