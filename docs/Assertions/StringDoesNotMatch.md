---
title: String Does Not Match 
---

## Assertion: String Does Not Match 

Asserts that a string does not match a given regular expression 

### Example 

```ts 
this.assert.stringDoesNotMatch(regex, haystack);
``` 

### Conditions 

Passes if `haystack` does not pass a `regex` test

Fails if `haystack` passes a `regex` test 

### Parameters 

| Name | Description | 
|---|---| 
| `regex` | the regular expression to test |
| `haystack` | the string to search |
| `message` | (optional) message to display on failure |