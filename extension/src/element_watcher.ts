export function watchForElement(root: Element, selector: string, onFind: (e: Element) => boolean) {
    const interval = setInterval(() => {
        const el = root.querySelector(selector);
        if(el) {
            const findResult = onFind(el);

            if(findResult === true) {
                clearInterval(interval);
            }
        }
    }, 100);

    return () => clearInterval(interval);
}