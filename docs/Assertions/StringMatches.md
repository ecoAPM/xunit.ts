---
title: String Matches 
---

## Assertion: String Matches 

Asserts that a string matches a given regular expression 

### Example 

```ts 
this.assert.stringMatches(regex, haystack);
``` 

### Conditions 

Passes if `haystack` matches a `regex` test

Fails if `haystack` does not match a `regex` test 

### Parameters 

| Name | Description | 
|---|---| 
| `regex` | the regular expression to match |
| `haystack` | the string to search |
| `message` | (optional) message to display on failure |