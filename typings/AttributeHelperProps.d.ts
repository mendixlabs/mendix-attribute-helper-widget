/**
 * This file was generated from AttributeHelper.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ActionPreview } from "@mendix/pluggable-widgets-typing-generator/dist/typings";
import { DynamicValue } from "mendix";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export type TransformElementEnum = "general" | "parent" | "sibling";

export interface TransformationsType {
    transformAttribute: string;
    transformTextTemplate: DynamicValue<string>;
    transformElement: TransformElementEnum;
    transformSiblingFilter?: string;
    transformSiblingSubFilter?: string;
    transformParentsSelector?: string;
}

export type SelectorSelectionEnum = "parent" | "sibling";

export interface TransformationsPreviewType {
    transformAttribute: string;
    transformTextTemplate: string;
    transformElement: TransformElementEnum;
    transformSiblingFilter?: string;
    transformSiblingSubFilter?: string;
    transformParentsSelector?: string;
}

export interface TransformationsVisibilityType {
    transformAttribute: boolean;
    transformTextTemplate: boolean;
    transformElement: boolean;
    transformSiblingFilter: boolean;
    transformSiblingSubFilter: boolean;
    transformParentsSelector: boolean;
}

export interface AttributeHelperContainerProps extends CommonProps {
    transformations: TransformationsType[];
    selectorSelection: SelectorSelectionEnum;
    selectorSiblingFilter?: string;
    selectorSiblingSubFilter?: string;
    selectorParentsSelector?: string;
}

export interface AttributeHelperPreviewProps extends CommonProps {
    transformations: TransformationsPreviewType[];
    selectorSelection: SelectorSelectionEnum;
    selectorSiblingFilter?: string;
    selectorSiblingSubFilter?: string;
    selectorParentsSelector?: string;
}

export interface VisibilityMap {
    transformations: TransformationsVisibilityType[] | boolean;
    selectorSelection: boolean;
    selectorSiblingFilter: boolean;
    selectorSiblingSubFilter: boolean;
    selectorParentsSelector: boolean;
}
