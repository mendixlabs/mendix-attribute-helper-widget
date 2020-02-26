[![Apache License](https://img.shields.io/badge/license-Apache%202.0-orange.svg?style=flat-square)](http://www.apache.org/licenses/LICENSE-2.0)
[![Dependencies](https://david-dm.org/JelteMX/mendix-attribute-helper-widget.svg)]([https://david-dm.org/JelteMX/mendix-attribute-helper-widget](https://david-dm.org/JelteMX/mendix-attribute-helper-widget))
[![DevDependencies](https://david-dm.org/JelteMX/mendix-attribute-helper-widget/dev-status.svg)]([https://david-dm.org/JelteMX/mendix-attribute-helper-widget?type=dev](https://david-dm.org/JelteMX/mendix-attribute-helper-widget?type=dev))
[![Support](https://img.shields.io/badge/Support-Community%20(no%20active%20support)-orange.svg)](https://docs.mendix.com/developerportal/app-store/app-store-content-support)
[![Studio](https://img.shields.io/badge/Studio%20version-8.0%2B-blue.svg)](https://appstore.home.mendix.com/link/modeler/)
[![GitHub release](https://img.shields.io/github/release/JelteMX/mendix-attribute-helper-widget)](https://github.com/JelteMX/mendix-attribute-helper-widget/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/JelteMX/mendix-attribute-helper-widget)](https://github.com/JelteMX/mendix-attribute-helper-widget/issues)
[![DeepScan grade](https://deepscan.io/api/teams/7221/projects/9848/branches/130760/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=7221&pid=9848&bid=130760)

# Attribute Helper Widget

![AppStore](/assets/AppstoreIcon.png)

A widget that sets attributes on elements, based on your attribute values in your context object. This can be used to set extra HTML attributes on elements, useful for styling, accesibility etcetera.

## Features

- Select direct parent or a parent up in the DOM-tree.
- Select siblings, filter them based on a class name.
- Select children of the siblings.
- Set transformations on elements that either use the general selectors, or individually selected elements (using the same selector strategy).
- Transformations:
    - Select a (custom) HTML-attribute like `data-custom-attribute`
    - Select a text-value for this attribute, where you can use attribute values from you context object. For example `{1}`, where the first argument will be the String value `Name` in your Mendix object
    - The widget will set the following attribute on the selected element(s): `data-custom-attribute="Value"`. This can then be used in styling your application.
    - You can manipulate the value before you set it: Remove spaces, make it Uppercase/Lowercase

## Alternatives

The [Mendix AppStore](https://appstore.home.mendix.com/) provides a variety of widgets that do similar things. Most of them do DOM-manipulation on classes, but this is something that should be left to the Mendix Runtime as we're moving to React. The Attribute Helper Widget tries to combine the best of all alternatives, minus setting classes on HTML Elements. Feel free to use an alternative, or request a feature request on this widget.

- [Set Attribute](https://appstore.home.mendix.com/link/app/5958/)
    - Based on Dojo, which is not future proof. Only sets a single attribute on a selected item. Is useful when you don't need a context object (Attribute Helper Widget requires one), as well as support for Translatable strings.
- [CssClassSwitcher](https://appstore.home.mendix.com/link/app/109716/)
    - Dojo. Only apply to classes, which might not work in the future.
- [CSS selector helper widget](https://appstore.home.mendix.com/link/app/35039/)
    - Dojo. Only sets a single attribute (`cssselectorhelper`). Does provide the ability to select siblings (but no children of siblings) and the parent (but only direct parent, not a parent up in the tree)
- [EnumClass](https://appstore.home.mendix.com/link/app/2641/)
    - Dojo. Development seems stalled. Only applies to classes.

## Usage & Possible issues

The settings in the widget are straightforward. Do keep a few things in mind:

- This is not foolproof. Mendix (8.0.0+) relies heavily on React, and when re-rendering elements it might miss certain attributes. This is the case when you use conditional visibilty.
- Based on the fact that we are doing DOM-manipulation, results of this widget might vary between Mendix versions.
- You are prohibited to set the following attributes:
    - `class` (Mendix takes care of this by itself)
    - `style` (Same thing)
    - `data-mendix-id` and `widgetid` (Both are used by Mendix internally)
- When using Calculated Attributes in your Mendix object, it will only change the value of the HTML attribute when the Mendix Object is committed to the database.

## Demo project

To be determined...

## Issues, suggestions and feature requests

Please report your issues [here](https://github.com/JelteMX/mendix-attribute-helper-widget), but beware of the limitations that are described inn the **Usage** section.

## License

Apache 2
