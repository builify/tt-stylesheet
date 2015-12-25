# TPStylesheet
[![Build Status](https://travis-ci.org/Trip-Trax/TPStylesheet.svg)](https://travis-ci.org/Trip-Trax/TPStylesheet)
[![Code Climate](https://codeclimate.com/github/Trip-Trax/TPStylesheet/badges/gpa.svg)](https://codeclimate.com/github/Trip-Trax/TPStylesheet)
[![npm version](https://badge.fury.io/js/tpstylesheet.svg)](https://badge.fury.io/js/tpstylesheet)

> Create dynamic stylesheets and add rules to them. You can also enable and disable the stylesheets.

## Installation
Install with npm:
`npm install tpstylesheet`

## Usage
```javascript
import TPStylesheet from 'TPStylesheet';

const Stylesheet = new TPStylesheet();
```

## Functions
- `add(...args)`
    This function adds rule(s) to the mounted style element
    ```javascript
    Stylesheet.add('h1', 'color: #333; font-size: 33px;');

    // or
    Stylesheet.add('h1', {
      color: '#333',
      fontSize: '33px'
    });

    // or
    Stylesheet.add({
      'h1': {
        color: '#333',
        fontSize: '33px',
        transform: 'scale(2)',
        userSelect: 'none'
      },
      'blockquote': {
        transform: 'rotate(45deg)',
        filter: 'blur(2px)'
      }
    });
    ```

- `disable()`
    Disables the stylesheet. This means that the styles, that the stylesheet has, will have no effect whatsoever on targeted elements.
    ```javascript
    Stylesheet.disable();
    ```

- `enable()`
    Enables the stylesheet. If the stylesheet has been disabled previously, the enabling will apply styles on targeted elements.
    ```javascript
    Stylesheet.enable();
    ```

- `CSSText()`
    Returns all style rules in CSS as you would find in a .CSS file.
    ```javascript
    Stylesheet.add('h1', 'color: #333; font-size: 33px;');

    // Logs 'h1{color:#333;font-size:33px;}'
    console.log(Stylesheet.CSSText())
    ```

## Contributions & Issues
Contributions are welcome. Please clearly explain the purpose of the PR and follow the current style.

Issues can be resolved quickest if they are descriptive and include both a reduced test case and a set of steps to reproduce.

## Run tests and create coverage
`git clone https://github.com/Trip-Trax/TPStylesheet.git
cd TPStylesheet
npm i
npm run coverage`

## Licence
Licensed under the [MIT License](LICENSE).
