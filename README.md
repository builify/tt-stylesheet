# TPStylesheet
[![Build Status](https://travis-ci.org/Trip-Trax/TPStylesheet.svg)](https://travis-ci.org/Trip-Trax/TPStylesheet)
[![Code Climate](https://codeclimate.com/github/Trip-Trax/TPStylesheet/badges/gpa.svg)](https://codeclimate.com/github/Trip-Trax/TPStylesheet)
[![npm version](https://badge.fury.io/js/tpstylesheet.svg)](https://badge.fury.io/js/tpstylesheet)

## Installation
Install with npm:
    npm install tpstylesheet

## What?
An ES6 npm library to create dynamic stylesheets and manipulate them by adding rules to them with JavaScript.

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
* add(...args)
* disable()
* enable()
* CSSText()

#### add
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

#### disable
Disables the stylesheet. This means that the styles, that the stylesheet has, will have no effect whatsoever on targeted elements.
```javascript
Stylesheet.disable();
```

#### enable
Enables the stylesheet. If the stylesheet has been disabled previously, the enabling will apply styles on targeted elements.
```javascript
Stylesheet.disable();
```

#### CSSText
Returns all style rules in CSS as you would find in a .CSS file.
```javascript
// Returns string
console.log(Stylesheet.CSSText())
```

## Contributions & Issues
Contributions are welcome. Please clearly explain the purpose of the PR and follow the current style.

Issues can be resolved quickest if they are descriptive and include both a reduced test case and a set of steps to reproduce.

## Run tests and create coverage
    git clone https://github.com/Trip-Trax/TPStylesheet.git
    cd TPStylesheet
    npm i
    npm run coverage

## Licence
Licensed under the [MIT License](LICENSE).
