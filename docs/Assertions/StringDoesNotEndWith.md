---
title: String Does Not End With 
---

## Assertion: String Does Not End With 

Asserts that a string does not end with a given substring 

### Example 

```ts 
this.assert.stringDoesNotEndWith(needle, haystack);
``` 

### Conditions 

Passes if the final characters of `haystack` do not match `needle`

Fails if the final characters of `haystack` match `needle` 

### Parameters 

| Name | Description | 
|---|---| 
| `needle` | the substring to find |
| `haystack` | the string to search |
| `message` | (optional) message to display on failure |