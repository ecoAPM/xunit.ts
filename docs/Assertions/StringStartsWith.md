---
title: String Starts With 
---

## Assertion: String Starts With 

Asserts that a string begins with a given substring 

### Example 

```ts 
this.assert.stringStartsWith(needle, haystack);
``` 

### Conditions 

Passes if the first characters of `haystack` match `needle`

Fails if the first characters of `haystack` do not match `needle` 

### Parameters 

| Name | Description | 
|---|---| 
| `needle` | the substring to find |
| `haystack` | the string to search |
| `message` | (optional) message to display on failure |