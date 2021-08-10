## Contains 

Asserts that an array contains a given element 

### Example 

```ts 
this.assert.contains(needle, haystack);
``` 

### Conditions 

Passes if array `haystack` contains an element with a value of `needle`

Fails if array `haystack` does not contain an element with a value of `needle` 

### Parameters 

| Name | Description | 
|---|---| 
| `needle` | the element to find |
| `haystack` | the array to search |
| `message` | (optional) message to display on failure |