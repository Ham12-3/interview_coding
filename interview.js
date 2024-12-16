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








