# TPStylesheet
[![Build Status](https://travis-ci.org/Trip-Trax/TPStylesheet.svg)](https://travis-ci.org/Trip-Trax/TPStylesheet)
[![Code Climate](https://codeclimate.com/github/Trip-Trax/TPStylesheet/badges/gpa.svg)](https://codeclimate.com/github/Trip-Trax/TPStylesheet)
[![npm version](https://badge.fury.io/js/tpstylesheet.svg)](https://badge.fury.io/js/tpstylesheet)

## Installation with NPM
    npm install tpstylesheet

## What?
An ES6 (compiled via Babel to ES5) npm library to create dynamic stylesheets and manipulate them by adding CSS rules.

## Why?
This library was created in response to lack of libraries out there on dynamic stylesheets.

## Usage
Firstly, import the module and then create the instance of the module.
The instance will automatically create `<style>` element, that will be appened in the head.
```javascript
import TPStylesheet from 'TPStylesheet';

const Stylesheet = new TPStylesheet();
```

Having created `Stylesheet` object, you can now access such functions as:
* add
* disable
* enable
* CSSText

### add(...)
This function adds rule(s) to the mounted style element
```javascript
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

// or
Stylesheet.add([
  ['h2', // Also accepts a second argument as an array of arrays instead
    ['color', 'red'],
    ['backgroundColor', 'green', true] // 'true' for !important rules
  ],
  ['.myClass',
    ['backgroundColor', 'yellow'],
    ['userSelect', 'none']
  ]
]);
```

### disable()
Disables the stylesheet. This means that the styles, that the stylesheet has, will have no effect whatsoever on targeted elements.
```javascript
Stylesheet.disable();
```

### enable()
Enables the stylesheet. If the stylesheet has been disabled previously, the enabling will apply styles on targeted elements.
```javascript
Stylesheet.disable();
```

### CSSText()
Returns all style rules in CSS as you would find in a .CSS file.
```javascript
// Returns string
console.log(Stylesheet.CSSText())
```

## Contributions & Issues
Contributions are welcome. Please clearly explain the purpose of the PR and follow the current style.

Issues can be resolved quickest if they are descriptive and include both a reduced test case and a set of steps to reproduce.

## Licence
Licensed under the [MIT License](LICENSE).
