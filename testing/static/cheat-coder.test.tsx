import 'jest-extended/all';
import * as cheatCoder from '../../src/static/cheatCoder';
import { SpecialKey } from '../../src/static/sniffKey';


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

describe("Cheat Coder Lib test",  () => {

    it ('should trigger an event', () => {

        let activated = false;

        const onActivate = () => {
            activated = true;
        }

        cheatCoder.cheatCoder({
            sequence    : [ 'Digit1', 'Digit3'],
            specialKeys : [ SpecialKey.Alt, SpecialKey.Control],
            onActivate
        });

        let keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "CtrlLeft",
            key     : "Ctrl",
            keyCode : 17,
            which   : 17
        });
        
        expect(activated).toBe(false);
        document.dispatchEvent(keyPressEvent);
        expect(activated).toBe(false);

        keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "AltLeft",
            key     : "Alt",
            keyCode : 18,
            which   : 18,
            ctrlKey : true
        });
        document.dispatchEvent(keyPressEvent);
        expect(activated).toBe(false);

        keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit1",
            key     : "¹",
            keyCode : 49,
            which   : 49,
            ctrlKey : true,
            altKey  : true
        });
        document.dispatchEvent(keyPressEvent);
        expect(activated).toBe(false);

        keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit3",
            key     : "³",
            keyCode : 51,
            which   : 51,
            ctrlKey : true,
            altKey  : true
        });
        document.dispatchEvent(keyPressEvent);
        expect(activated).toBe(true);

    })


    it ("should not trigger when there's a different key among the right ones", () => {
        
        let activated = false;

        const onActivate = () => {
            activated = true;
        }

        cheatCoder.cheatCoder({
            sequence    : [ 'Digit1', 'Digit3'],
            specialKeys : [ SpecialKey.Alt, SpecialKey.Control],
            onActivate
        });

        let keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "CtrlLeft",
            key     : "Ctrl",
            keyCode : 17,
            which   : 17
        });
        
        expect(activated).toBe(false);
        document.dispatchEvent(keyPressEvent);
        expect(activated).toBe(false);

        keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "AltLeft",
            key     : "Alt",
            keyCode : 18,
            which   : 18,
            ctrlKey : true
        });
        document.dispatchEvent(keyPressEvent);
        expect(activated).toBe(false);

        keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit1",
            key     : "¹",
            keyCode : 49,
            which   : 49,
            ctrlKey : true,
            altKey  : true
        });
        document.dispatchEvent(keyPressEvent);
        expect(activated).toBe(false);

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
        expect(activated).toBe(false);

        keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit3",
            key     : "³",
            keyCode : 51,
            which   : 51,
            ctrlKey : true,
            altKey  : true
        });
        document.dispatchEvent(keyPressEvent);
        expect(activated).toBe(false);

    });

    it ("should not trigger when ctrl key is released among the right ones", () => {
        
        let activated = false;

        const onActivate = () => {
            activated = true;
        }

        cheatCoder.cheatCoder({
            sequence    : [ 'Digit1', 'Digit3'],
            specialKeys : [ SpecialKey.Alt, SpecialKey.Control],
            onActivate
        });

        let keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "CtrlLeft",
            key     : "Ctrl",
            keyCode : 17,
            which   : 17
        });
        
        expect(activated).toBe(false);
        document.dispatchEvent(keyPressEvent);
        expect(activated).toBe(false);

        keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "AltLeft",
            key     : "Alt",
            keyCode : 18,
            which   : 18,
            ctrlKey : true
        });
        document.dispatchEvent(keyPressEvent);
        expect(activated).toBe(false);

        keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit1",
            key     : "¹",
            keyCode : 49,
            which   : 49,
            ctrlKey : true,
            altKey  : true
        });
        document.dispatchEvent(keyPressEvent);
        expect(activated).toBe(false);

        keyPressEvent = new KeyboardEvent('keyup', {
            ...defaultKeyPressEventData,
            code    : "CtrlLeft",
            key     : "Ctrl",
            keyCode : 17,
            which   : 17
        });
        
        document.dispatchEvent(keyPressEvent);
        expect(activated).toBe(false);

        keyPressEvent = new KeyboardEvent('keydown', {
            ...defaultKeyPressEventData,
            code    : "Digit3",
            key     : "³",
            keyCode : 51,
            which   : 51,
            ctrlKey : true,
            altKey  : true
        });
        document.dispatchEvent(keyPressEvent);
        expect(activated).toBe(false);

    });


});
