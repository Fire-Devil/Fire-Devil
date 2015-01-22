# The Fire-Devil Style Guide

The goal of this style manual is to help us write code that is readable - for ourselves and anyone else who may contribute to this project. In this case, being readable means being consistent, clear, and brief.

Note: This style guide borrows substantially from Hack Reactor's style guide.


### Indentation

When writing any block of code that is logically subordinate to the line immediately before and after it, that block should be indented two spaces more than the surrounding lines

* Indents are always to spaces.
* No two lines should ever have more or less than 2 spaces difference in their indentation.
* No tab characters anywhere in code.
* Increase the indent level for all blocks by two extra spaces.
    * When a line opens a block, the next line starts 2 spaces further in than the line that opened.

        ```javascript
        // good:
        if (condition) {
          action();
        }
        ```

    * When a line closes a block, that line starts at the same level as the line that opened the block.
        ```javascript
        // good:
        if (condition) {
          action();
        }
        ```


### Variable names

* A single descriptive word is best.

    ```javascript
    // good:
    var animals = ['cat', 'dog', 'fish'];

    // bad:
    var targetInputs = ['cat', 'dog', 'fish'];
    ```

* Collections such as arrays and maps should have plural noun variable names.

    ```javascript
    // good:
    var animals = ['cat', 'dog', 'fish'];

    // bad:
    var animalList = ['cat', 'dog', 'fish'];

    // bad:
    var animal = ['cat', 'dog', 'fish'];
    ```

* Name your variables after their purpose, not their structure.

    ```javascript
    // good:
    var animals = ['cat', 'dog', 'fish'];

    // bad:
    var array = ['cat', 'dog', 'fish'];
    ```


### Language constructs

* Do not use `for...in` statements with the intent of iterating over a list of numeric keys. Use a for-with-semicolons statement in stead.

  ```javascript
  // good:
  var list = ['a', 'b', 'c']
  for (var i = 0; i < list.length; i++) {
    alert(list[i]);
  }

  // bad:
  var list = ['a', 'b', 'c']
  for (var i in list) {
    alert(list[i]);
  }
  ```

* Never omit braces for statement blocks (although they are technically optional).
    ```javascript
    // good:
    for (key in object) {
      alert(key);
    }

    // bad:
    for (key in object)
      alert(key);
    ```

* Always use `===` and `!==`, since `==` and `!=` will automatically convert types in ways you're unlikely to expect.

* Always use 'var' to declare new functions. This improves readability and minimizes hoisting risks.

    ```javascript
    // good:
    var go = function () {...};

    // bad:
    function stop () {...};
    ```

### Semicolons

* Don't forget semicolons at the end of lines

  ```javascript
  // good:
  alert('hi');

  // bad:
  alert('hi')
  ```

* Don't put a semicolon at the end of a block that doesn't require one - an `if` / `for` / `while` block, etc.


### Code density

* Conserve line quantity by minimizing the number lines you write in. The more concisely your code is written, the more context can be seen in one screen.
* Conserve line length by minimizing the amount of complexity you put on each line. Long lines are difficult to read. Rather than a character count limit, I recommend limiting the amount of complexity you put on a single line. Try to make it easily read in one glance. This goal is in conflict with the line quantity goal, so you must do your best to balance them.


### Comments

* Provide comments any time you are confident it will make reading your code easier.
* Be aware that comments come at some cost. They make a file longer and can drift out of sync with the code they annotate.
* Comment on what code is attempting to do, not how it will achieve it.
* A good comment is often less effective than a good variable name.
* An out-of-date comment is far worse than no comment at all.


### Padding & additional whitespace

* Generally, we don't care where you put extra spaces, provided they are not distracting.
* Do not use extra spaces to align two similar lines. This pattern can lead to unnecessary edits of many lines in your code every time you change a variable name.

    ```javascript
    // bad:
    var firstItem  = getFirst();
    var secondItem = getSecond();
    ```

* Put `else` and `else if` statements on the same line as the ending curly brace for the preceding `if` block
    ```javascript
    // good:
    if (condition) {
      response();
    } else {
      otherResponse();
    }

    // bad:
    if (condition) {
      response();
    }
    else {
      otherResponse();
    }
    ```

* Put a space between `if` / `while` / `for` and the following paranethesis. (Unlike the paranthesis after a function declaration, which specifically takes parameters.)

    ```javascript
    // good:
    for (var i = 0; i < 10; i++) {...}

    if (present === true) {...}

    // bad:
    for(var i = 0; i < 10; i++) {...}

    if(present === true) {...}
    ```

* Put a space between close parentheses and a curly bracket: 

    ```javascript
    // good:
    countFn() {

    // bad:
    countFn(){

    // bad:
    if (count===0){
    ```

* Put a space after the comma between two variables / parameters:

    ```javascript
    countFn(val1, val2) {

    // bad:
    countFn(val1,val2){
    ```

* No spaces between parentheses and parameters: 

    ```javascript
    // good:
    countFn(val1, val2) {

    // bad:
    countFn( val1, val2 ){

    // bad:
    console.log( 'Check here.' ){
    ```


### End of (all) files

* Do not end a file with any character other than a newline.


### Opening or closing too many blocks at once

* The more blocks you open on a single line, the more your reader needs to remember about the context of what they are reading. Try to resolve your blocks early, and refactor. A good rule is to avoid closing more than two blocks on a single line--three in a pinch.

    ```javascript
    // avoid:
    _.ajax(url, { success: function () {
      // ...
    }});

    // prefer:
    _.ajax(url, {
      success: function () {
        // ...
      }
    });
    ```


### Variable declaration

* Use a new var statement for each line you declare a variable on.
* Do not break variable declarations onto mutiple lines.
* Use a new line for each variable declaration.
* See http://benalman.com/news/2012/05/multiple-var-statements-javascript/ for more details

    ```javascript
    // good:
    var ape;
    var bat;

    // bad:
    var cat,
        dog

    // use sparingly:
    var eel, fly;
    ```


### Capital letters in variable names

* Some people choose to use capitalization of the first letter in their variable names to indicate that they contain a [class](http://en.wikipedia.org/wiki/Class_(computer_programming)). This capitalized variable might contain a function, a prototype, or some other construct that acts as a representative for the whole class.
* Optionally, some people use a capital letter only on functions that are written to be run with the keyword `new`.
* Do not use all-caps for any variables. Some people use this pattern to indicate an intended "constant" variable, but the language does not offer true constants, only mutable variables.


### Minutiae

* Don't rely on JavaScripts implicit global variables. If you are intending to write to the global scope, export things to `window.*` explicitly instead.

    ```javascript
    // good:
    var overwriteNumber = function () {
      window.exported = Math.random();
    };

    // bad:
    var overwriteNumber = function () {
      exported = Math.random();
    };
    ```

* For lists, put commas at the end of each newline, not at the beginning of each item in a list

    ```javascript
    // good:
    var animals = [
      'ape',
      'bat',
      'cat'
    ];

    // bad:
    var animals = [
        'ape'
      , 'bat'
      , 'cat'
    ];
    ```

* Avoid use of `switch` statements altogether. They are hard to outdent using the standard whitespace rules above, and are prone to error due to missing `break` statements. See [this article](http://ericleads.com/2012/12/switch-case-considered-harmful/) for more detail.

* Prefer single quotes around JavaScript strings. Single quotes allow for easy embedding of HTML, which prefers double quotes around tag attributes.

    ```javascript
    // good:
    var dog = 'dog';
    var cat = 'cat';

    // acceptable:
    var userText = "I think this app's going to change how I use my phone.";

    // bad:
    var dog = 'dog';
    var cat = "cat";
    ```


### HTML

* Do not use ids for html elements. Use a class instead.

    ```html
    <!-- good -->
    <img class="lucy" />

    <!-- bad -->
    <img id="lucy" />
    ```

* Do not include a `type=text/javascript"` attribute on script tags.

    ```html
    <!-- good -->
    <script src="a.js"></script>

    <!-- bad -->
    <script src="a.js" type="text/javascript"></script>
    ```
