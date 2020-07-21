// Types in JS

// 1. undefined
// (default value)

let x = 4;

let y;

console.log(x);

x = undefined;

console.log(x);

function printHi () {
  console.log('hi');
  // return
}

// either return `undefined` or a number
function example (input) {
  if (input === 0) return;
  
  return 100 / input;
}

let result = printHi();

console.log('RESULT:', result);

//-------------------------------

// 2. Numbers
// "IEEE 754 Floats"
// IEEE - standards body
// Document #754
// Explains how "floating point numbers" work

let small = 5;

let big = 1e6; // scientific notation = 1 * 10^6

console.log(small, big);

let float = 2.38945789;

// example: 2/10 + 1/10 = 0.30000000000000004

// internally: 101011000011101001010101

// moral of the story:
// DON'T DO FINANCIAL MATH APPS IN JS

let weird = NaN; // "Not-a-Number"
// too bad it's not "Non-usable-Number" (NuN)

//-------------------------------

// 3. String

let hello = "hello";

// 4. Bool

let bool = true;

// 5. Symbol ?????
// sort of like a unique ID or label…

let exampleSymbol = Symbol('hello');

// -----------------------------------

// Primitives compare by "value equality"

let a = 5;

let b = 5;

console.log('does a equal b?', a === b);

// -----------------------------------

// Object

// A labeled collection of values.
// Labels are called "keys"
// Key-value pairs are called "properties"

// let abeName = "Abe"
// let abeAge = 40
// let abeQuote = "..."

// "Object literal syntax"
// Loosely, "JSON" - JavaScript Object Notation
// let person = {
//   quote: "Four score and seven years ago…",
//   name: "Abe",
//   age: 40,
// };


// "Factory" function makes an object
// Goal: write a function which takes a name and age as input, and returns an object with a name, age, and also a random height.

function person2(n, a) {
  return {
    name: n,
    age: a,
    height: Math.random() * 100 + 100
  };
}

console.log(person2())