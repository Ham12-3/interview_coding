// 1.  Implement an algorithm to determine if a string has all unique characters. What if you 
// cannot use additional data structures? 

// @param {string} str
// @return {boolean}


// function isUniqueChars(str) {

// if(str.length > 128) return false
    
// let charSet = new Array(128).fill(false)
// for(let i=0; i<str.length;i++) {
// let val = str.charCodeAt(i)
// if(charSet[val]) {
// return false
// }
//     charSet[val] = true
// }
// return true
// }

// console.log(isUniqueChars("abcdef"))



// function isUniqueCharsBit(str) {

// let checker =0
// for(let i=0; i<str.length;i++) {
// let val =str.charCodeAt(i) - 'a'.charCodeAt(0)

// if((checker & (1 << val)) >0) {
// return false
// }
//     checker |= (1 << val)
// }
//     return true
// }


// console.log(isUniqueCharsBit("abdcef"))


// console.log(isUniqueCharsBit("hello"))


// 2 . Check Permutation: Given two strings, write a method to decide if one is a permutation of the 
// other.



// solution 1 

// using sorting

// function sortString(str) {
// return str.split('').sort().join('')


// }


// function arePermutationsUsingSort(s,t) {

//     if(s.length !== t.length) {

//         return false

//     }

//     return sortString(s) === sortString(t)

// }

// console.log(arePermutationUsingSort("listen", "silent"))

// console.log(arePermutationusingSort("apple", "pale"))



// Using character counts  


// function arePermutationsUsingCount(s,t) {
//     if(s.length !== t.length) {
//         return false
//     }

//     const letters = new Array(128).fill(0)


//     for(let char of s) {
//         letters[char.charCodeAt(0)]++
//     }

//     for (let char of t) {
//         letters[char.charCodeAt(0)]--

//         if (letters[char.charCodeAt(0)] < 0) {
//             return false
//         }
//     }

//     return true
// }



// console.log( arePermutationUsingConst("listen", "silent"))
// console.log(arePermutationUsingConst("apple", "pale"))



// URLify: Write a method to replace all spaces in a string with '%20'. You may assume that the string 
// has sufficient space at the end to hold the additional characters, and that you are given the "true" 
// length of the string. (Note: If implementing in Java, please use a character array so that you can 
// perform this operation in place.) 
// EXAMPLE 
// Input: "Mr John Smith ", 13 
// Output: "Mr%20John%20Smith" 
// Hints: #53, # 118



// function URLify(str, trueLength) {
//   // Convert the string to a character array (split into individual characters)
//   const charArray = str.split('');
  
//   let spaceCount = 0;

//   // Step 1: Count the number of spaces within the true length
//   for (let i = 0; i < trueLength; i++) {
//     if (charArray[i] === ' ') {
//       spaceCount++;
//     }
//   }

//   // Step 2: Calculate the new index based on the additional space needed
//   let index = trueLength + spaceCount * 2;

//   // If the array has extra space, mark the end of the true string
//   if (charArray.length > trueLength) charArray[trueLength] = '\0';

//   // Step 3: Traverse the string in reverse and replace spaces
//   for (let i = trueLength - 1; i >= 0; i--) {
//     if (charArray[i] === ' ') {
//       charArray[index - 1] = '0';
//       charArray[index - 2] = '2';
//       charArray[index - 3] = '%';
//       index -= 3; // Move the index back by 3 positions
//     } else {
//       charArray[index - 1] = charArray[i];
//       index--; // Move the index back by 1 position
//     }
//   }

//   // Join the modified array back into a string and return it
//   return charArray.join('').trim();
// }

// // Example Usage:
// const input = "Mr John Smith    "; // Extra space at the end
// const trueLength = 13;

// const output = URLify(input, trueLength);
// console.log(output); // Output: "Mr%20John%20Smith"












