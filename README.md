# TTStylesheet
[![Build Status](https://img.shields.io/travis/Trip-Trax/tt-stylesheet.svg?style=flat-square)](https://travis-ci.org/Trip-Trax/tt-stylesheet)
[![Code Climate](https://codeclimate.com/github/Trip-Trax/tt-stylesheet/badges/gpa.svg)](https://codeclimate.com/github/Trip-Trax/tt-stylesheet)
[![NPM Version](https://badge.fury.io/js/tt-stylesheet.svg)](https://badge.fury.io/js/tt-stylesheet)

## What?
Create dynamic stylesheet and use JSON to add styles to it with this lightweight module.

## Why?
If you want to, for example, add client side style customization such as color-wheel for heading styles, then you can use this library to achieve. Obviously, this is limited to this only and therefore you can use it as you want.

## Installation
Install with npm:
```shell
npm install tt-stylesheet
```


## Usage
```javascript
import Stylesheet from 'tt-stylesheet';

// This will create <style> element in head, where all styles will be added.
const customStylesheet = new Stylesheet();
```

## API
- **add**

    The following example will add `#cont`, `h1` and `h2` selector styles to initialized stylesheet element.
    TTStylesheet will automatically take care of prefixing therefore when using `userSelect`, `backfaceVisibility` or any other property that requires prefixes for cross-browser support, do not add prefixes as the it will be taken care of.

    ```javascript
    customStylesheet.add({
      '#cont': {
        // Numbers will be automatically suffixed with 'px'.
        width: 350,
        margin: '0 auto',
        zIndex: 10,

        // Single-level nesting supported.
        h3: {
          color: 'blue'
        }
      },

      h1: {
        zIndex: 10,

        // Use & to reference top-level selector where it resides.
        '&:hover': {
          background: 'red'
        }
      },

      h2: {
        border: '1px solid #eee',
        margin: 0
      }
    });
    ```

- **disable**

    Disables the stylesheet. This means that the styles, the stylesheet has, will have no effect whatsoever on targeted elements.

    ```javascript
    customStylesheet.disable();
    ```

- **enable**

    Enables the stylesheet if the stylesheet had been disabled.

    ```javascript
    customStylesheet.enable();
    ```

- **initCSS**

    By default JavaScript, the css rules applied will be virtual that is you will not find them as text nodes in the stylesheet.
    In this case, use this function to initialize css rules as text nodes to the stylesheet element.

    ```javascript
    customStylesheet.initCSS();
    ```

## Contributions & Issues
Contributions are welcome. Please clearly explain the purpose of the PR and follow the current style.

Issues can be resolved quickest if they are descriptive and include both a reduced test case and a set of steps to reproduce.

## Licence
Licensed under the [MIT License](LICENSE) © Trip-Trax 2015 - present.
