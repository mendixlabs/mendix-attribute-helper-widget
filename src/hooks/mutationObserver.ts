import { RefObject, useEffect, useMemo } from "react";
interface Props {
    target?: RefObject<Element> | Element | Node | null;
    options?: MutationObserverInit;
    callback?: MutationCallback;
}

export const getRefElement = <T>(element?: RefObject<Element> | T): Element | T | undefined | null => {
    if (element && "current" in element) {
        return element.current;
    }

    return element;
};

export const useMutationObserver = ({ target, options = {}, callback }: Props): void => {
    const observer = useMemo(
        () =>
            new MutationObserver((mutationRecord, mutationObserver) => {
                if (callback) {
                    callback(mutationRecord, mutationObserver);
                }
            }),
        [callback]
    );

    useEffect(() => {
        const element = getRefElement(target);

        if (observer && element) {
            observer.observe(element, options);
            return () => observer.disconnect();
        }
    }, [target, observer, options]);
};
