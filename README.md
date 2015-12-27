# TTStylesheet
[![Build Status](https://img.shields.io/travis/Trip-Trax/TTStylesheet.svg?style=flat-square)](https://travis-ci.org/Trip-Trax/TTStylesheet)
[![Dependency Status](https://david-dm.org/Trip-Trax/TTStylesheet.svg?style=flat-square)](https://david-dm.org/Trip-Trax/TTStylesheet)
[![Code Climate](https://codeclimate.com/github/Trip-Trax/TTStylesheet/badges/gpa.svg)](https://codeclimate.com/github/Trip-Trax/TTStylesheet)
[![NPM Version](https://badge.fury.io/js/ttstylesheet.svg)](https://badge.fury.io/js/ttstylesheet)

> Create dynamic stylessheet and use JSON to add styles to it with this lightweight module.

## Installation
Install with npm:
```shell
npm install ttstylesheet
```

## Usage
```javascript
import Stylesheet from 'ttstylesheet';

// This will create <style> element in head.
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
        zIndex: 10
      },
      h1: {
        zIndex: 10,
        // Single-level nesting supported. Use & to reference top-level selector where it resides.
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

## Contributions & Issues
Contributions are welcome. Please clearly explain the purpose of the PR and follow the current style.

Issues can be resolved quickest if they are descriptive and include both a reduced test case and a set of steps to reproduce.

## Licence
Licensed under the [MIT License](LICENSE) © Trip-Trax - 2015.
