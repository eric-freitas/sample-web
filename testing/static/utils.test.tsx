import 'jest-extended/all';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { defaultsToTrue, wrapText, joinClassNames, sleep } from '../../src/static/utils';

describe("Utils Lib test",  () => {

    it ("should sleep for 2 secs", async() => {

        const before = Date.now();
        await sleep(2000);
        const elapsed = ((Date.now()) - before);

        const condition = elapsed >= 1997 && elapsed <= 2003;
        expect(condition).toBe(true);
        
    });

    it ("should default to true", () => {
        let data : boolean = false;
        expect(defaultsToTrue(data)).toBe(false);
        data = true;
        expect(defaultsToTrue(data)).toBe(true);
        data = null;
        expect(defaultsToTrue(data)).toBe(true);
        data = undefined;
        expect(defaultsToTrue(data)).toBe(true);

        expect(defaultsToTrue()).toBe(true);
    })

    it("should join a few class names", () => {
        expect(joinClassNames([])).toBe("");
        expect(joinClassNames(["only1"])).toBe("only1");
        expect(joinClassNames(["one", "two"])).toBe("one two");
        expect(joinClassNames(["this one", "and this too"])).toBe("this__one and__this__too");
        expect(joinClassNames(["", null, "a", "  ", "b"])).toBe("a b");
    })

    it ("should embed an element", () => {
        let text = "Texto";
        let el = wrapText(text, "span");
        expect(el).not.toBeNull();
        
        let container = document.createElement('div');
        document.body.appendChild(container);

        act(() => {
            ReactDOM.render(el, container);
        })

        const found = container.querySelector("span");
        expect(found).not.toBeNull();
        expect(found.textContent).toBe(text);

        expect(wrapText(null, "span")).toBeNull();
        expect(wrapText("", "span")).toBeNull();
        expect(wrapText(undefined, "span")).toBeNull();
        expect(wrapText("   ", "span")).toBeNull();
    })
})