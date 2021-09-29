import "mutationobserver-polyfill";
import { createElement, FC, useRef, useEffect, useCallback } from "react";
import $ from "cash-dom";

import { useMutationObserver, getRefElement } from "./hooks/mutationObserver";
import { AttributeHelperContainerProps } from "../typings/AttributeHelperProps";

import "./ui/AttributeHelper.css";

import { doTransformations } from "./transformer";

const AttributeHelper: FC<AttributeHelperContainerProps> = props => {
    const elRef = useRef<HTMLDivElement>(null);
    const bodyRef = getRefElement(document.body);

    const runTransformer = useCallback(() => {
        if (elRef.current) {
            const domNode = $(elRef.current);
            doTransformations(domNode, props);
        }
    }, [elRef.current, props]);

    const handleMutations = useCallback(() => {
        if (props.miscUseMutationObserver) {
            runTransformer();
        }
    }, []);

    useMutationObserver({
        target: bodyRef,
        options: { attributes: true, childList: true },
        callback: handleMutations
    });

    useEffect(() => {
        runTransformer();
    }, [elRef.current, props]);

    return <div ref={elRef} className={"attributeHelper"} />;
};

export default AttributeHelper;
