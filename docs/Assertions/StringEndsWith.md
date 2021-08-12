---
title: String Ends With 
---

## Assertion: String Ends With 

Asserts that a string ends with a given substring 

### Example 

```ts 
this.assert.stringEndsWith(needle, haystack);
``` 

### Conditions 

Passes if the final characters of `haystack` match `needle`

Fails if the final characters of `haystack` do not match `needle` 

### Parameters 

| Name | Description | 
|---|---| 
| `needle` | the substring to find |
| `haystack` | the string to search |
| `message` | (optional) message to display on failure |