import { Component, ReactNode, createElement } from "react";
import { findDOMNode } from "react-dom";
import $, { Cash } from "cash-dom";
import { hot } from "react-hot-loader/root";
import { AttributeHelperContainerProps } from "../typings/AttributeHelperProps";

import "./ui/AttributeHelper.css";

const PROHIBITED_ATTRIBUTES = ["class", "style", "widgetid", "data-mendix-id"];

class AttributeHelper extends Component<AttributeHelperContainerProps> {
    domNode: HTMLElement | null = null;

    render(): ReactNode {
        // We'll render an element, as we are using the dom
        return <div className="attributeHelper" />;
    }

    componentDidUpdate(): void {
        const domNode = findDOMNode(this);

        if (domNode instanceof Element) {
            this.domNode = domNode as HTMLElement;
            this.doTransformations();
        }
    }

    private doTransformations(): void {
        const {
            transformations,
            selectorSiblingFilter,
            selectorSelection,
            selectorSiblingSubFilter,
            selectorParentsSelector
        } = this.props;
        if (this.domNode === null) {
            return;
        }
        const $el = $(this.domNode);

        transformations.forEach(transformation => {
            const {
                transformAttribute,
                transformElement,
                transformSiblingFilter,
                transformTextTemplate,
                transformSiblingSubFilter,
                transformParentsSelector
            } = transformation;
            if (transformTextTemplate.status !== "available") {
                return;
            }
            if (PROHIBITED_ATTRIBUTES.indexOf(transformAttribute) !== -1) {
                console.warn(`Widget tries to change ${transformAttribute} attribute, this is prohibited`);
                return;
            }
            if ((transformElement === "general" && selectorSelection === "parent") || transformElement === "parent") {
                const selector = transformElement === "general" ? selectorParentsSelector : transformParentsSelector;
                this.handleParent($el, transformAttribute, transformTextTemplate.value, selector);
            } else if (
                (transformElement === "general" && selectorSelection === "sibling") ||
                transformElement === "sibling"
            ) {
                this.handleSiblings(
                    $el,
                    transformAttribute,
                    transformTextTemplate.value,
                    transformElement === "general" ? selectorSiblingFilter : transformSiblingFilter,
                    transformElement === "general" ? selectorSiblingSubFilter : transformSiblingSubFilter
                );
            }
        });
    }

    private handleSiblings(
        $el: Cash,
        attributeName: string,
        attributeValue: string,
        siblingFilter?: string,
        siblingSubFilter?: string
    ): void {
        if (!$el) {
            return;
        }
        const $generalSiblings = $el.siblings(siblingFilter ? siblingFilter : undefined);
        if ($generalSiblings.length === 0) {
            return;
        }
        if (typeof siblingSubFilter === "undefined" || siblingSubFilter === "") {
            $generalSiblings.attr(attributeName, attributeValue);
        } else {
            $generalSiblings.each(function() {
                $(this)
                    .find(siblingSubFilter)
                    .attr(attributeName, attributeValue);
            });
        }
    }

    private handleParent($el: Cash, attributeName: string, attributeValue: string, parentSelector?: string): void {
        if (!$el) {
            return;
        }
        if (parentSelector) {
            const closestParent = $el.closest(parentSelector);
            if (closestParent.length === 1) {
                closestParent.attr(attributeName, attributeValue);
                return;
            }
        }
        $el.parent().attr(attributeName, attributeValue);
    }
}

export default hot(AttributeHelper);
