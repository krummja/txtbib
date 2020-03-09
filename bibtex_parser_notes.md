# BibTeX Parser

## In-Text Citations

- Borer (2005)
- Benedicto & Salomon (2014)
- Sebba (1987), Aikhenvald (2006), and Muysken (2006).
- Aikhenvald (2006, P 13)
- Larson (1991, p. 197)
- (see Larson 1991)


(\w*\sAUTHORSTRING\sYEARSTRING)


```javascript
// chunk
function chunk (arr, size) {
    Arr.from({ length: Math.ceil(arr.length / size) }, (v, i) => 
    arr.slice(i * size, i * size + size));
}
```

Given an input like: 

```javascript
const arr = ['this', 'is', 'some', 'text', 'by', 'Crum', '(2020)']
```

In this array, `arr[5]` and `arr[6]` match expected sequences.

Then I want a function that, upon finding a NAME, check if the following index is a YEAR or PAREN_YEAR. If it is, then kick those two indices to an output Dict. For the above, I want an output that looks like:

```javascript
var output = [
    1: ['Crum', '(2020)'],
    2: ['...', '...']
]
```

Actually, I don't need the CONTENT of the string. I just need to know (A) what CITEKEY it matches, and (B) what the CITE FORM is (i.e. author-year, author-paren-year, etc.).

```javascript
var output = [
    1: [['crum', '2020'], 'citep'],
    2: [...]
]
```

Then I can build the citekey:

```javascript
var citekey = [
    1: ['\citep{crum2020}'],
    2: [...]
]
```

And then it's just a matter of matching the index to its original position and replacing.

