## String Contains 

Asserts that a string contains a given substring 

### Example 

```ts 
this.assert.stringContains(needle, haystack);
``` 

### Conditions 

Passes if `needle` is a substring of `haystack`

Fails if `needle` is not a substring of `haystack` 

### Parameters 

| Name | Description | 
|---|---| 
| `needle` | the substring to find |
| `haystack` | the string to search |
| `message` | (optional) message to display on failure |