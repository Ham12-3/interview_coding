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

// Palindrome Permutation: Given a string, write a function to check if it is a permutation of a palindrome. A palindrome is a word or phrase that is the same forwards and backwards. A permutation 
// is a rearrangement of letters. The palindrome does not need to be limited to just dictionary words. 
// 1.5 
// 1.6 
// EXAMPLE 
// Input: Tact Coa 
// Output: True (permutations: "taco cat", "atco eta", etc.) 
// Hints: #106, #121, #134, #136


// solution 1 using hash table 


/**
 * Check if a string is a permutation of a palindrome (Solution #1: Hash Table)
 * @param {string} phrase - Input string
 * @returns {boolean} - True if it is a permutation of a palindrome
 */
// function isPermutationOfPalindrome1(phrase) {
//   const table = buildCharFrequencyTable(phrase);
//   return checkMaxOneOdd(table);
// }

// /**
//  * Build a character frequency table for valid characters (ignores spaces, case insensitive)
//  * @param {string} phrase - Input string
//  * @returns {Object} - Character frequency table
//  */
// function buildCharFrequencyTable(phrase) {
//   const table = {};
//   for (let char of phrase.toLowerCase()) {
//     if (char >= 'a' && char <= 'z') {
//       table[char] = (table[char] || 0) + 1;
//     }
//   }
//   return table;
// }

// /**
//  * Check that no more than one character has an odd count
//  * @param {Object} table - Character frequency table
//  * @returns {boolean} - True if at most one character has an odd count
//  */
// function checkMaxOneOdd(table) {
//   let foundOdd = false;
//   for (let count of Object.values(table)) {
//     if (count % 2 === 1) {
//       if (foundOdd) return false; // More than one character with odd count
//       foundOdd = true;
//     }
//   }
//   return true;
// }

// // Example usage
// console.log(isPermutationOfPalindrome1("Tact Coa")); // Output: true




// Solution #2: Inline Odd Count Check 


/**
 * Check if a string is a permutation of a palindrome (Solution #2: Inline Check)
 * @param {string} phrase - Input string
 * @returns {boolean} - True if it is a permutation of a palindrome
 */
// function isPermutationOfPalindrome2(phrase) {
//   const charCounts = {};
//   let oddCount = 0;

//   for (let char of phrase.toLowerCase()) {
//     if (char >= 'a' && char <= 'z') {
//       charCounts[char] = (charCounts[char] || 0) + 1;

//       // Update the odd count in-place
//       if (charCounts[char] % 2 === 1) {
//         oddCount++;
//       } else {
//         oddCount--;
//       }
//     }
//   }

//   return oddCount <= 1;
// }

// // Example usage
// console.log(isPermutationOfPalindrome2("Tact Coa")); // Output: true




// Solution #3: Bit Manipulation 



/**
 * Check if a string is a permutation of a palindrome (Solution #3: Bit Manipulation)
 * @param {string} phrase - Input string
 * @returns {boolean} - True if it is a permutation of a palindrome
 */
// function isPermutationOfPalindrome3(phrase) {
//   const bitVector = createBitVector(phrase);
//   return bitVector === 0 || checkExactlyOneBitSet(bitVector);
// }

// /**
//  * Create a bit vector by toggling bits for each valid character
//  * @param {string} phrase - Input string
//  * @returns {number} - Bit vector representing character counts
//  */
// function createBitVector(phrase) {
//   let bitVector = 0;
//   for (let char of phrase.toLowerCase()) {
//     const index = getCharNumber(char);
//     if (index !== -1) {
//       bitVector = toggle(bitVector, index);
//     }
//   }
//   return bitVector;
// }

// /**
//  * Convert a character to a number between 0 and 25 (a -> 0, b -> 1, ..., z -> 25)
//  * @param {string} char - Input character
//  * @returns {number} - Character index or -1 for invalid characters
//  */
// function getCharNumber(char) {
//   const val = char.charCodeAt(0);
//   const a = 'a'.charCodeAt(0);
//   const z = 'z'.charCodeAt(0);
//   return val >= a && val <= z ? val - a : -1;
// }

// /**
//  * Toggle the ith bit in the bit vector
//  * @param {number} bitVector - Current bit vector
//  * @param {number} index - Index of the bit to toggle
//  * @returns {number} - Updated bit vector
//  */
// function toggle(bitVector, index) {
//   const mask = 1 << index;
//   return (bitVector & mask) === 0 ? (bitVector | mask) : (bitVector & ~mask);
// }

// /**
//  * Check if exactly one bit is set in the bit vector
//  * @param {number} bitVector - Bit vector to check
//  * @returns {boolean} - True if exactly one bit is set
//  */
// function checkExactlyOneBitSet(bitVector) {
//   return (bitVector & (bitVector - 1)) === 0;
// }

// // Example usage
// console.log(isPermutationOfPalindrome3("Tact Coa")); // Output: true





