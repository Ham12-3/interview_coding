# 🧩 String Manipulation Algorithms Collection

## 📘 Overview

This repository provides a comprehensive collection of string manipulation algorithms, covering various common interview and coding challenges. Each algorithm demonstrates different problem-solving approaches, focusing on efficiency, creativity, and code clarity.

## 🚀 Algorithms Catalog

### 1. Unique Characters Checker

#### Problem Statement
Determine if a string contains all unique characters.

#### Approaches

##### 1.1 Hash Set Method
```javascript
function isUniqueChars(str) {
    if(str.length > 128) return false
    
    let charSet = new Array(128).fill(false)
    for(let i = 0; i < str.length; i++) {
        let val = str.charCodeAt(i)
        if(charSet[val]) return false
        charSet[val] = true
    }
    return true
}
```

##### 1.2 Bit Manipulation Method
```javascript
function isUniqueCharsBit(str) {
    let checker = 0
    for(let i = 0; i < str.length; i++) {
        let val = str.charCodeAt(i) - 'a'.charCodeAt(0)

        if((checker & (1 << val)) > 0) return false
        checker |= (1 << val)
    }
    return true
}
```

#### Usage Examples
```javascript
console.log(isUniqueChars("abcdef"))    // true
console.log(isUniqueCharsBit("hello"))   // false
```

### 2. Permutation Checker

#### Problem Statement
Determine if one string is a permutation of another.

#### Approaches

##### 2.1 Sorting Method
```javascript
function sortString(str) {
    return str.split('').sort().join('')
}

function arePermutationsUsingSort(s, t) {
    if(s.length !== t.length) return false
    return sortString(s) === sortString(t)
}
```

##### 2.2 Character Count Method
```javascript
function arePermutationsUsingCount(s, t) {
    if(s.length !== t.length) return false

    const letters = new Array(128).fill(0)

    for(let char of s) {
        letters[char.charCodeAt(0)]++
    }

    for (let char of t) {
        letters[char.charCodeAt(0)]--

        if (letters[char.charCodeAt(0)] < 0) {
            return false
        }
    }

    return true
}
```

#### Usage Examples
```javascript
console.log(arePermutationsUsingSort("listen", "silent"))   // true
console.log(arePermutationsUsingCount("apple", "pale"))     // false
```

### 3. URLify - Space Replacement

#### Problem Statement
Replace all spaces in a string with '%20'.

#### Implementation
```javascript
function URLify(str, trueLength) {
    const charArray = str.split('');
    let spaceCount = 0;

    // Count spaces within true length
    for (let i = 0; i < trueLength; i++) {
        if (charArray[i] === ' ') {
            spaceCount++;
        }
    }

    // Calculate new index
    let index = trueLength + spaceCount * 2;

    // Traverse and replace spaces
    for (let i = trueLength - 1; i >= 0; i--) {
        if (charArray[i] === ' ') {
            charArray[index - 1] = '0';
            charArray[index - 2] = '2';
            charArray[index - 3] = '%';
            index -= 3;
        } else {
            charArray[index - 1] = charArray[i];
            index--;
        }
    }

    return charArray.join('').trim();
}
```

#### Usage Example
```javascript
const input = "Mr John Smith    ";
const trueLength = 13;
console.log(URLify(input, trueLength));  // "Mr%20John%20Smith"
```

### 4. Palindrome Permutation Checker

#### Problem Statement
Check if a string is a permutation of a palindrome.

#### Approaches

##### 4.1 Hash Table Method
```javascript
function isPermutationOfPalindrome1(phrase) {
    const table = buildCharFrequencyTable(phrase);
    return checkMaxOneOdd(table);
}

function buildCharFrequencyTable(phrase) {
    const table = {};
    for (let char of phrase.toLowerCase()) {
        if (char >= 'a' && char <= 'z') {
            table[char] = (table[char] || 0) + 1;
        }
    }
    return table;
}

function checkMaxOneOdd(table) {
    let foundOdd = false;
    for (let count of Object.values(table)) {
        if (count % 2 === 1) {
            if (foundOdd) return false;
            foundOdd = true;
        }
    }
    return true;
}
```

##### 4.2 Inline Odd Count Method
```javascript
function isPermutationOfPalindrome2(phrase) {
    const charCounts = {};
    let oddCount = 0;

    for (let char of phrase.toLowerCase()) {
        if (char >= 'a' && char <= 'z') {
            charCounts[char] = (charCounts[char] || 0) + 1;

            oddCount += charCounts[char] % 2 === 1 ? 1 : -1;
        }
    }

    return oddCount <= 1;
}
```

##### 4.3 Bit Manipulation Method
```javascript
function isPermutationOfPalindrome3(phrase) {
    const bitVector = createBitVector(phrase);
    return bitVector === 0 || checkExactlyOneBitSet(bitVector);
}

function createBitVector(phrase) {
    let bitVector = 0;
    for (let char of phrase.toLowerCase()) {
        const index = getCharNumber(char);
        if (index !== -1) {
            bitVector = toggle(bitVector, index);
        }
    }
    return bitVector;
}

function toggle(bitVector, index) {
    const mask = 1 << index;
    return (bitVector & mask) === 0 ? 
           (bitVector | mask) : (bitVector & ~mask);
}

function checkExactlyOneBitSet(bitVector) {
    return (bitVector & (bitVector - 1)) === 0;
}
```

#### Usage Examples
```javascript
console.log(isPermutationOfPalindrome1("Tact Coa"));   // true
console.log(isPermutationOfPalindrome2("Tact Coa"));   // true
console.log(isPermutationOfPalindrome3("Tact Coa"));   // true
```

Here is the README formatted version of your content:

---

# One Edit Away Checker

## Description
This function checks if two strings are one edit (or zero edits) away from being identical. There are three types of edits that can be performed on strings:
1. Insert a character.
2. Remove a character.
3. Replace a character.

### Examples
| Input Strings      | Output  |
|--------------------|---------|
| `"pale", "ple"`    | `true`  |
| `"pales", "pale"`  | `true`  |
| `"pale", "bale"`   | `true`  |
| `"pale", "bae"`    | `false` |

---

## Usage

### Function Definition
```javascript
function oneEditAway(first, second) {
  // Check if the length difference is more than 1
  if (Math.abs(first.length - second.length) > 1) {
    return false;
  }

  // Determine the shorter and longer string
  const [shorter, longer] =
    first.length < second.length ? [first, second] : [second, first];

  let index1 = 0; // Pointer for shorter string
  let index2 = 0; // Pointer for longer string
  let foundDifference = false;

  while (index1 < shorter.length && index2 < longer.length) {
    if (shorter[index1] !== longer[index2]) {
      // If a difference is already found, return false
      if (foundDifference) {
        return false;
      }
      foundDifference = true;

      // If the strings are the same length, move the shorter pointer
      if (shorter.length === longer.length) {
        index1++;
      }
    } else {
      // If matching, move the shorter pointer
      index1++;
    }
    // Always move the longer pointer
    index2++;
  }

  return true;
}
```

---

### How to Run
1. Copy the code into a JavaScript environment, such as a browser console or Node.js.
2. Call the function with two string arguments to determine if they are one edit away.
3. Observe the result (`true` or `false`).

### Example
```javascript
console.log(oneEditAway("pale", "ple")); // true
console.log(oneEditAway("pales", "pale")); // true
console.log(oneEditAway("pale", "bale")); // true
console.log(oneEditAway("pale", "bae")); // false
```

---

## Complexity
- **Time Complexity:** \( O(n) \), where \( n \) is the length of the shorter string.
- **Space Complexity:** \( O(1) \), as no additional space proportional to the input size is used.

---

This README should provide all necessary information for understanding, using, and testing the `oneEditAway` function.

## 🔍 Complexity Analysis

### Time Complexity
- Unique Chars: O(n)
- Permutation Check: O(n) to O(n log n)
- URLify: O(n)
- Palindrome Permutation: O(n)

### Space Complexity
- Unique Chars: O(1)
- Permutation Check: O(1)
- URLify: O(1)
- Palindrome Permutation: O(1)

## 💡 Key Learning Points

- Multiple algorithmic approaches exist for the same problem
- Bitwise manipulation can provide memory-efficient solutions
- Always consider edge cases and input constraints
- Different methods have trade-offs between time and space complexity

## 🤝 Contribution

Contributions, optimizations, and additional approaches are welcome! Please open an issue or submit a pull request.

## 📜 License

[Specify Your License - e.g., MIT]
