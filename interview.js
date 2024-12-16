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
















