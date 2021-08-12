## String Does Not Start With 

Asserts that a string does not begin with a given substring 

### Example 

```ts 
this.assert.stringDoesNotStartWith(needle, haystack);
``` 

### Conditions 

Passes if the first characters of `haystack` do not match `needle`

Fails if the first characters of `haystack` match `needle` 

### Parameters 

| Name | Description | 
|---|---| 
| `needle` | the substring to find |
| `haystack` | the string to search |
| `message` | (optional) message to display on failure |