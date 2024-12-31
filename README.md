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


Here's a **README** for your **String Compression** algorithm: 

---

# String Compression

A JavaScript implementation of a string compression algorithm that replaces sequences of repeated characters with the character followed by the count of repetitions. For example, the string `"aabcccccaaa"` would be compressed to `"a2b1c5a3"`. However, if the compressed string would not be smaller than the original, the function returns the original string.

---

## Features

- Compresses strings by counting consecutive repeated characters.
- Returns the original string if compression does not reduce its length.
- Optimized using a helper function to pre-calculate the compressed length.

---

## Example

### Input:
```
"aabcccccaaa"
```

### Output:
```
"a2b1c5a3"
```

### Input:
```
"abcdef"
```

### Output:
```
"abcdef" // Compression is not shorter
```

---

## Installation

1. Copy the implementation code into your project.
2. Call the function with your desired input string.

---

## Usage

### Function Signature:
```javascript
function stringCompression(str)
```

### Example Usage:
```javascript
const result1 = stringCompression("aabcccccaaa");
console.log(result1); // Output: "a2b1c5a3"

const result2 = stringCompression("abcdef");
console.log(result2); // Output: "abcdef"
```

---

## Implementation

### Main Code:
```javascript
function stringCompression(str) {
    // Helper function to calculate the compressed length
    function countCompression(s) {
        let compressedLength = 0;
        let countConsecutive = 0;

        for (let i = 0; i < s.length; i++) {
            countConsecutive++;

            // If the next character is different or we reach the end
            if (i + 1 >= s.length || s[i] !== s[i + 1]) {
                compressedLength += 1 + countConsecutive.toString().length;
                countConsecutive = 0;
            }
        }
        return compressedLength;
    }

    // Calculate the final length of the compressed string
    const finalLength = countCompression(str);
    if (finalLength >= str.length) {
        return str;
    }

    // Build the compressed string
    let compressed = [];
    let countConsecutive = 0;

    for (let i = 0; i < str.length; i++) {
        countConsecutive++;

        // If the next character is different or we reach the end
        if (i + 1 >= str.length || str[i] !== str[i + 1]) {
            compressed.push(str[i]);
            compressed.push(countConsecutive);
            countConsecutive = 0;
        }
    }

    return compressed.join('');
}
```

# String Compression Problem

## Question

Given an array of characters `chars`, compress it using the following algorithm:

1. Begin with an empty string `s`. For each group of consecutive repeating characters in `chars`:
   - If the group's length is 1, append the character to `s`.
   - Otherwise, append the character followed by the group's length.
2. The compressed string `s` should not be returned separately but instead stored in the input character array `chars`.
3. Group lengths that are 10 or longer will be split into multiple characters in `chars`.

After modifying the input array, return the **new length** of the array.

You must write an algorithm that uses only constant extra space.

### Examples

#### Example 1:
**Input**:  
`chars = ["a","a","b","b","c","c","c"]`  
**Output**:  
Return `6`, and the first 6 characters of the input array should be: `["a","2","b","2","c","3"]`  
**Explanation**:  
The groups are `"aa"`, `"bb"`, and `"ccc"`. This compresses to `"a2b2c3"`.

#### Example 2:
**Input**:  
`chars = ["a"]`  
**Output**:  
Return `1`, and the first character of the input array should be: `["a"]`  
**Explanation**:  
The only group is `"a"`, which remains uncompressed since it's a single character.

#### Example 3:
**Input**:  
`chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]`  
**Output**:  
Return `4`, and the first 4 characters of the input array should be: `["a","b","1","2"]`  
**Explanation**:  
The groups are `"a"` and `"bbbbbbbbbbbb"`. This compresses to `"ab12"`.

---

## Solution

Here is the JavaScript solution to the problem:

```javascript
/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function(chars) {
    let read = 0;
    let write = 0;

    while (read < chars.length) {
        let char = chars[read];
        let count = 0;

        // Count consecutive characters
        while (read < chars.length && chars[read] === char) {
            read++;
            count++;
        }

        // Write the character
        chars[write] = char;
        write++;

        // Write the count if greater than 1
        if (count > 1) {
            for (let digit of String(count)) {
                chars[write] = digit;
                write++;
            }
        }
    }

    return write;
};


---
```





# README: Matrix and String Problems in JavaScript

This document provides implementations of three classic problems related to matrices and strings in JavaScript. Each problem includes an explanation, code, and usage examples.

---

## 1. Rotate Matrix

### **Problem**
Given an NxN matrix, rotate it by 90 degrees in place.

### **Solution**
- Perform the rotation layer by layer.
- For each layer, swap elements in a circular manner.

### **Code**
```javascript
function rotateMatrix(matrix) {
  const n = matrix.length;
  if (n === 0 || n !== matrix[0].length) return false;

  for (let layer = 0; layer < Math.floor(n / 2); layer++) {
    const first = layer;
    const last = n - 1 - layer;

    for (let i = first; i < last; i++) {
      const offset = i - first;
      const top = matrix[first][i]; // save top

      // left -> top
      matrix[first][i] = matrix[last - offset][first];

      // bottom -> left
      matrix[last - offset][first] = matrix[last][last - offset];

      // right -> bottom
      matrix[last][last - offset] = matrix[i][last];

      // top -> right
      matrix[i][last] = top; // right <- saved top
    }
  }
  return true;
}
```

### **Usage**
```javascript
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
rotateMatrix(matrix);
console.log(matrix); // Rotated matrix
```

---

## 2. Zero Matrix

### **Problem**
Write an algorithm that, if an element in an MxN matrix is 0, sets its entire row and column to 0.

### **Solution**
1. Check the first row and column for zeros.
2. Use the first row and column as markers for rows and columns that need to be set to 0.
3. Nullify rows and columns based on these markers.

### **Code**
```javascript
function setZeroes(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let rowHasZero = false;
  let colHasZero = false;

  // Check first row for zeros
  for (let j = 0; j < cols; j++) {
    if (matrix[0][j] === 0) {
      rowHasZero = true;
      break;
    }
  }

  // Check first column for zeros
  for (let i = 0; i < rows; i++) {
    if (matrix[i][0] === 0) {
      colHasZero = true;
      break;
    }
  }

  // Check the rest of the matrix for zeros
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  // Nullify rows based on the first column
  for (let i = 1; i < rows; i++) {
    if (matrix[i][0] === 0) {
      for (let j = 0; j < cols; j++) {
        matrix[i][j] = 0;
      }
    }
  }

  // Nullify columns based on the first row
  for (let j = 1; j < cols; j++) {
    if (matrix[0][j] === 0) {
      for (let i = 0; i < rows; i++) {
        matrix[i][j] = 0;
      }
    }
  }

  // Nullify the first row if needed
  if (rowHasZero) {
    for (let j = 0; j < cols; j++) {
      matrix[0][j] = 0;
    }
  }

  // Nullify the first column if needed
  if (colHasZero) {
    for (let i = 0; i < rows; i++) {
      matrix[i][0] = 0;
    }
  }
}
```

### **Usage**
```javascript
const zeroMatrix = [
  [1, 2, 3],
  [4, 0, 6],
  [7, 8, 9],
];
setZeroes(zeroMatrix);
console.log(zeroMatrix); // Matrix with rows and columns set to zero
```

---

## 3. String Rotation

### **Problem**
Check if one string is a rotation of another using only one call to a substring check.

### **Solution**
- Concatenate the first string with itself.
- Check if the second string is a substring of the concatenated string.

### **Code**
```javascript
function isRotation(s1, s2) {
  const len = s1.length;
  if (len === s2.length && len > 0) {
    const s1s1 = s1 + s1;
    return s1s1.includes(s2);
  }
  return false;
}
```

### **Usage**
```javascript
console.log(isRotation("waterbottle", "erbottlewat")); // true
console.log(isRotation("hello", "lleho")); // false
```

---

## Complexity Analysis

| Problem          | Time Complexity | Space Complexity |
|-------------------|-----------------|------------------|
| Rotate Matrix     | \(O(N^2)\)      | \(O(1)\)         |
| Zero Matrix       | \(O(M \times N)\)| \(O(1)\)        |
| String Rotation   | \(O(N)\)        | \(O(N)\)         |

--- 

## Author
Developed by Abdulhamid Sonaike.

## Performance

- **Time Complexity:** \(O(n)\), where \(n\) is the length of the input string.
- **Space Complexity:** \(O(n)\) for storing the compressed string.

---

## License

This implementation is open-source and can be freely used and modified.

---



# Linked List Problems - JavaScript Solutions

## Table of Contents
1. [Node Class Implementation](#node-class-implementation)
2. [Remove Duplicates](#remove-duplicates)
3. [Return Kth to Last](#return-kth-to-last)
4. [Delete Middle Node](#delete-middle-node)
5. [Partition List](#partition-list)
6. [Sum Lists](#sum-lists)
7. [Palindrome](#palindrome)
8. [Intersection](#intersection)
9. [Loop Detection](#loop-detection)

## Node Class Implementation
```javascript
class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
```

## Remove Duplicates
Remove duplicates from an unsorted linked list.

### Solution 1: Using Hash Set
```javascript
function removeDups(head) {
    if (!head) return null;
    
    const seen = new Set();
    let current = head;
    seen.add(current.data);
    
    while (current.next) {
        if (seen.has(current.next.data)) {
            current.next = current.next.next;
        } else {
            seen.add(current.next.data);
            current = current.next;
        }
    }
    
    return head;
}
```

### Solution 2: No Buffer Allowed (Using Runner)
```javascript
function removeDupsNoBuffer(head) {
    if (!head) return null;
    
    let current = head;
    while (current) {
        let runner = current;
        while (runner.next) {
            if (runner.next.data === current.data) {
                runner.next = runner.next.next;
            } else {
                runner = runner.next;
            }
        }
        current = current.next;
    }
    
    return head;
}
```

## Return Kth to Last
Find the kth to last element in a singly linked list.

### Solution 1: Two Pointer Technique
```javascript
function kthToLast(head, k) {
    if (!head || k < 1) return null;
    
    let p1 = head;
    let p2 = head;
    
    // Move p1 k nodes ahead
    for (let i = 0; i < k; i++) {
        if (!p1) return null;
        p1 = p1.next;
    }
    
    // Move both pointers until p1 reaches the end
    while (p1) {
        p1 = p1.next;
        p2 = p2.next;
    }
    
    return p2;
}
```

## Delete Middle Node
Delete a node in the middle of a singly linked list, given only access to that node.

```javascript
function deleteMiddleNode(node) {
    if (!node || !node.next) return false;
    
    node.data = node.next.data;
    node.next = node.next.next;
    return true;
}
```

## Partition List
Partition a linked list around a value x.

```javascript
function partition(head, x) {
    if (!head) return null;
    
    let beforeStart = null;
    let beforeEnd = null;
    let afterStart = null;
    let afterEnd = null;
    
    // Partition list
    let current = head;
    while (current) {
        const next = current.next;
        current.next = null;
        
        if (current.data < x) {
            if (!beforeStart) {
                beforeStart = current;
                beforeEnd = beforeStart;
            } else {
                beforeEnd.next = current;
                beforeEnd = current;
            }
        } else {
            if (!afterStart) {
                afterStart = current;
                afterEnd = afterStart;
            } else {
                afterEnd.next = current;
                afterEnd = current;
            }
        }
        current = next;
    }
    
    if (!beforeStart) return afterStart;
    
    // Merge before and after lists
    beforeEnd.next = afterStart;
    return beforeStart;
}
```

## Sum Lists
Add two numbers represented by linked lists.

```javascript
function sumLists(l1, l2) {
    let dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 || l2 || carry) {
        const val1 = l1 ? l1.data : 0;
        const val2 = l2 ? l2.data : 0;
        
        const sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        
        current.next = new ListNode(sum % 10);
        current = current.next;
        
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    
    return dummy.next;
}
```

## Palindrome
Check if a linked list is a palindrome.

```javascript
function isPalindrome(head) {
    if (!head || !head.next) return true;
    
    // Find middle using slow/fast pointer
    let slow = head;
    let fast = head;
    const stack = [];
    
    while (fast && fast.next) {
        stack.push(slow.data);
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // If odd length, skip middle element
    if (fast) {
        slow = slow.next;
    }
    
    // Compare second half with stack
    while (slow) {
        if (slow.data !== stack.pop()) return false;
        slow = slow.next;
    }
    
    return true;
}
```

## Intersection
Find if two singly linked lists intersect.

```javascript
function findIntersection(list1, list2) {
    if (!list1 || !list2) return null;
    
    // Get lengths and tails
    const result1 = getTailAndSize(list1);
    const result2 = getTailAndSize(list2);
    
    // If different tails, no intersection
    if (result1.tail !== result2.tail) return null;
    
    // Set pointers to start of each list
    let shorter = result1.size < result2.size ? list1 : list2;
    let longer = result1.size < result2.size ? list2 : list1;
    
    // Advance longer pointer
    longer = getKthNode(longer, Math.abs(result1.size - result2.size));
    
    // Move both pointers until collision
    while (shorter !== longer) {
        shorter = shorter.next;
        longer = longer.next;
    }
    
    return longer;
}

function getTailAndSize(list) {
    if (!list) return null;
    
    let size = 1;
    let current = list;
    while (current.next) {
        size++;
        current = current.next;
    }
    
    return { tail: current, size };
}

function getKthNode(head, k) {
    let current = head;
    while (k > 0 && current) {
        current = current.next;
        k--;
    }
    return current;
}
```

## Loop Detection
Detect and find the start of a loop in a linked list.

```javascript
function findLoopStart(head) {
    if (!head || !head.next) return null;
    
    let slow = head;
    let fast = head;
    
    // Find meeting point
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) break;
    }
    
    // Check if no loop exists
    if (!fast || !fast.next) return null;
    
    // Move slow to head and keep fast at meeting point
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }
    
    return fast;
}
```

## Testing The Solutions
Here's a helper function to create and print linked lists for testing:

```javascript
function createLinkedList(arr) {
    if (!arr.length) return null;
    
    const head = new ListNode(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    
    return head;
}

function printList(head) {
    const values = [];
    let current = head;
    
    while (current) {
        values.push(current.data);
        current = current.next;
    }
    
    console.log(values.join(' -> '));
}
```

Example usage:
```javascript
// Create a linked list: 1 -> 2 -> 3 -> 2 -> 1
const list = createLinkedList([1, 2, 3, 2, 1]);
console.log('Original list:');
printList(list);

console.log('Is palindrome:', isPalindrome(list));

// Remove duplicates
removeDups(list);
console.log('After removing duplicates:');
printList(list);
```

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


# Stack and Queue Problems Implementation Guide

This guide provides JavaScript implementations for several stack and queue-related problems, including Three Stacks in One Array, Stack Min, Stack of Plates, Queue via Stacks, Sort Stack, and Animal Shelter.

## Table of Contents
1. [Three Stacks in One Array](#three-stacks-in-one-array)
2. [Stack Min](#stack-min)
3. [Stack of Plates](#stack-of-plates)
4. [Queue via Stacks](#queue-via-stacks)
5. [Sort Stack](#sort-stack)
6. [Animal Shelter](#animal-shelter)

## Three Stacks in One Array

Implementation of three stacks using a single array, with both fixed and flexible division approaches.

### Fixed Division Implementation

```javascript
class FixedMultiStack {
    constructor(stackSize) {
        this.numberOfStacks = 3;
        this.stackCapacity = stackSize;
        this.values = new Array(stackSize * this.numberOfStacks).fill(0);
        this.sizes = new Array(this.numberOfStacks).fill(0);
    }

    push(stackNum, value) {
        if (this.isFull(stackNum)) {
            throw new Error('Stack is full');
        }
        this.sizes[stackNum]++;
        this.values[this.indexOfTop(stackNum)] = value;
    }

    pop(stackNum) {
        if (this.isEmpty(stackNum)) {
            throw new Error('Stack is empty');
        }
        const topIndex = this.indexOfTop(stackNum);
        const value = this.values[topIndex];
        this.values[topIndex] = 0;
        this.sizes[stackNum]--;
        return value;
    }

    peek(stackNum) {
        if (this.isEmpty(stackNum)) {
            throw new Error('Stack is empty');
        }
        return this.values[this.indexOfTop(stackNum)];
    }

    isEmpty(stackNum) {
        return this.sizes[stackNum] === 0;
    }

    isFull(stackNum) {
        return this.sizes[stackNum] === this.stackCapacity;
    }

    indexOfTop(stackNum) {
        const offset = stackNum * this.stackCapacity;
        const size = this.sizes[stackNum];
        return offset + size - 1;
    }
}
```

## Stack Min

A stack that can keep track of the minimum element.

```javascript
class NodeWithMin {
    constructor(value, min) {
        this.value = value;
        this.min = min;
    }
}

class StackWithMin {
    constructor() {
        this.stack = [];
    }

    push(value) {
        const newMin = Math.min(value, this.min());
        this.stack.push(new NodeWithMin(value, newMin));
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        return this.stack.pop().value;
    }

    min() {
        if (this.isEmpty()) {
            return Number.MAX_VALUE;
        }
        return this.stack[this.stack.length - 1].min;
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        return this.stack[this.stack.length - 1].value;
    }

    isEmpty() {
        return this.stack.length === 0;
    }
}

// Alternative implementation using two stacks
class StackWithMin2 {
    constructor() {
        this.mainStack = [];
        this.minStack = [];
    }

    push(value) {
        if (value <= this.min()) {
            this.minStack.push(value);
        }
        this.mainStack.push(value);
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        const value = this.mainStack.pop();
        if (value === this.min()) {
            this.minStack.pop();
        }
        return value;
    }

    min() {
        if (this.minStack.length === 0) {
            return Number.MAX_VALUE;
        }
        return this.minStack[this.minStack.length - 1];
    }

    isEmpty() {
        return this.mainStack.length === 0;
    }
}
```

## Stack of Plates

Implementation of a set of stacks that creates a new stack when the previous one exceeds capacity.

```javascript
class SetOfStacks {
    constructor(capacity) {
        this.capacity = capacity;
        this.stacks = [];
    }

    getLastStack() {
        if (this.stacks.length === 0) return null;
        return this.stacks[this.stacks.length - 1];
    }

    push(value) {
        const last = this.getLastStack();
        if (last && last.length < this.capacity) {
            last.push(value);
        } else {
            const stack = [value];
            this.stacks.push(stack);
        }
    }

    pop() {
        if (this.stacks.length === 0) {
            throw new Error('Empty stack');
        }
        
        const last = this.getLastStack();
        const value = last.pop();
        
        if (last.length === 0) {
            this.stacks.pop();
        }
        
        return value;
    }

    popAt(index) {
        return this.leftShift(index, true);
    }

    leftShift(index, removeTop) {
        const stack = this.stacks[index];
        let removedItem;
        
        if (removeTop) {
            removedItem = stack.pop();
        } else {
            removedItem = stack.shift();
        }

        if (stack.length === 0) {
            this.stacks.splice(index, 1);
        } else if (this.stacks.length > index + 1) {
            const value = this.leftShift(index + 1, false);
            stack.push(value);
        }

        return removedItem;
    }

    isEmpty() {
        return this.stacks.length === 0;
    }
}
```

## Queue via Stacks

Implementation of a queue using two stacks.

```javascript
class MyQueue {
    constructor() {
        this.stackNewest = [];
        this.stackOldest = [];
    }

    size() {
        return this.stackNewest.length + this.stackOldest.length;
    }

    add(value) {
        this.stackNewest.push(value);
    }

    shiftStacks() {
        if (this.stackOldest.length === 0) {
            while (this.stackNewest.length > 0) {
                this.stackOldest.push(this.stackNewest.pop());
            }
        }
    }

    peek() {
        this.shiftStacks();
        if (this.stackOldest.length === 0) {
            throw new Error('Queue is empty');
        }
        return this.stackOldest[this.stackOldest.length - 1];
    }

    remove() {
        this.shiftStacks();
        if (this.stackOldest.length === 0) {
            throw new Error('Queue is empty');
        }
        return this.stackOldest.pop();
    }
}
```

## Sort Stack

Implementation of a stack sorter using only one additional stack.

```javascript
function sortStack(s) {
    const r = [];
    
    while (s.length > 0) {
        const tmp = s.pop();
        while (r.length > 0 && r[r.length - 1] > tmp) {
            s.push(r.pop());
        }
        r.push(tmp);
    }

    while (r.length > 0) {
        s.push(r.pop());
    }
}
```

## Animal Shelter

Implementation of an animal shelter that operates on a "first in, first out" basis.

```javascript
class Animal {
    constructor(name) {
        this.name = name;
        this.order = 0;
    }

    setOrder(ord) {
        this.order = ord;
    }

    getOrder() {
        return this.order;
    }

    isOlderThan(animal) {
        return this.order < animal.getOrder();
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name);
    }
}

class AnimalQueue {
    constructor() {
        this.dogs = [];
        this.cats = [];
        this.order = 0;
    }

    enqueue(animal) {
        animal.setOrder(this.order);
        this.order++;
        
        if (animal instanceof Dog) {
            this.dogs.push(animal);
        } else if (animal instanceof Cat) {
            this.cats.push(animal);
        }
    }

    dequeueAny() {
        if (this.dogs.length === 0) {
            return this.dequeueCats();
        } else if (this.cats.length === 0) {
            return this.dequeueDogs();
        }

        const dog = this.dogs[0];
        const cat = this.cats[0];

        if (dog.isOlderThan(cat)) {
            return this.dequeueDogs();
        } else {
            return this.dequeueCats();
        }
    }

    dequeueDogs() {
        if (this.dogs.length === 0) {
            throw new Error('No dogs available');
        }
        return this.dogs.shift();
    }

    dequeueCats() {
        if (this.cats.length === 0) {
            throw new Error('No cats available');
        }
        return this.cats.shift();
    }
}
```

## Testing the Implementations

Here's how to test each implementation:

```javascript
// Test Three Stacks
const threeStacks = new FixedMultiStack(3);
threeStacks.push(0, 1);
threeStacks.push(1, 2);
threeStacks.push(2, 3);
console.log(threeStacks.pop(0)); // Should print 1

// Test Stack Min
const minStack = new StackWithMin();
minStack.push(5);
minStack.push(6);
minStack.push(3);
console.log(minStack.min()); // Should print 3

// Test Stack of Plates
const setOfStacks = new SetOfStacks(3);
setOfStacks.push(1);
setOfStacks.push(2);
setOfStacks.push(3);
setOfStacks.push(4);
console.log(setOfStacks.pop()); // Should print 4

// Test Queue via Stacks
const queue = new MyQueue();
queue.add(1);
queue.add(2);
queue.add(3);
console.log(queue.remove()); // Should print 1

// Test Sort Stack
const stack = [4, 2, 1, 3];
sortStack(stack);
console.log(stack); // Should print [1, 2, 3, 4]

// Test Animal Shelter
const shelter = new AnimalQueue();
shelter.enqueue(new Dog("Rex"));
shelter.enqueue(new Cat("Whiskers"));
shelter.enqueue(new Dog("Buddy"));
console.log(shelter.dequeueAny().name); // Should print "Rex"
```

## Time Complexities

1. Three Stacks in One Array
   - Fixed Division: All operations O(1)
   - Flexible Division: Push/Pop O(n) worst case, O(1) average

2. Stack Min
   - All operations O(1)

3. Stack of Plates
   - Push/Pop: O(1)
   - PopAt: O(n)

4. Queue via Stacks
   - Add: O(1)
   - Remove: O(n) amortized

5. Sort Stack
   - Time Complexity: O(n²)
   - Space Complexity: O(n)

6. Animal Shelter
   - Enqueue: O(1)
   - Dequeue: O(1)

## Common Pitfalls and Edge Cases

1. Stack Operations
   - Empty stack operations
   - Full stack operations
   - Single element operations

2. Array Bounds
   - Array index out of bounds
   - Negative indices

3. Null/Undefined Handling
   - Null input values
   - Undefined stack numbers

4. Capacity Issues
   - Stack overflow
   - Stack underflow

## Best Practices

1. Error Handling
   - Always check for empty/full conditions
   - Validate input parameters
   - Use descriptive error messages

2. Code Organization
   - Keep methods small and focused
   - Use meaningful variable names
   - Add appropriate comments for complex logic

3. Testing
   - Test edge cases
   - Test normal operations
   - Test error conditions

## License

This project is licensed under the MIT License.
