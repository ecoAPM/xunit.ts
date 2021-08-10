## String Not Contains 

Asserts that a string does not contain a given substring 

### Example 

```ts 
this.assert.stringDoesNotContain(needle, haystack);
``` 

### Conditions 

Passes if `needle` is not a substring of `haystack`

Fails if `needle` is a substring of `haystack` 

### Parameters 

| Name | Description | 
|---|---| 
| `needle` | the substring to find |
| `haystack` | the string to search |
| `message` | (optional) message to display on failure |