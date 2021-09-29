import $, { Cash } from "cash-dom";
import { AttributeHelperContainerProps } from "../../typings/AttributeHelperProps";

const PROHIBITED_ATTRIBUTES = ["class", "style", "widgetid", "data-mendix-id"];

const handleParent = ($el: Cash, attributeName: string, attributeValue: string, parentSelector?: string): void => {
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
};

const handleSiblings = (
    $el: Cash,
    attributeName: string,
    attributeValue: string,
    siblingFilter?: string,
    siblingSubFilter?: string
): void => {
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
};

export const doTransformations = (
    $el: Cash,
    {
        transformations,
        selectorSiblingFilter,
        selectorSelection,
        selectorSiblingSubFilter,
        selectorParentsSelector
    }: AttributeHelperContainerProps
): void => {
    transformations.forEach(transformation => {
        const {
            transformAttribute,
            transformElement,
            transformSiblingFilter,
            transformTextTemplate,
            transformSiblingSubFilter,
            transformParentsSelector,
            transformRemoveSpaces,
            transformTextTransform
        } = transformation;
        if (transformTextTemplate.status !== "available") {
            return;
        }
        if (PROHIBITED_ATTRIBUTES.indexOf(transformAttribute) !== -1) {
            console.warn(`Widget tries to change ${transformAttribute} attribute, this is prohibited`);
            return;
        }

        let value = transformTextTemplate.value;

        if (transformRemoveSpaces) {
            value = value.replace(/\s/g, "");
        }

        if (transformTextTransform === "lowercase") {
            value = value.toLowerCase();
        } else if (transformTextTransform === "uppercase") {
            value = value.toUpperCase();
        }

        if ((transformElement === "general" && selectorSelection === "parent") || transformElement === "parent") {
            const selector = transformElement === "general" ? selectorParentsSelector : transformParentsSelector;
            handleParent($el, transformAttribute, value, selector);
        } else if (
            (transformElement === "general" && selectorSelection === "sibling") ||
            transformElement === "sibling"
        ) {
            handleSiblings(
                $el,
                transformAttribute,
                value,
                transformElement === "general" ? selectorSiblingFilter : transformSiblingFilter,
                transformElement === "general" ? selectorSiblingSubFilter : transformSiblingSubFilter
            );
        }
    });
};
