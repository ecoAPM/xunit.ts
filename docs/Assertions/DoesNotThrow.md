---
title: Does Not Throw 
---

## Assertion: Does Not Throw 

Asserts that an expression does not throw an error/exception 

### Example 

```ts 
this.assert.doesNotThrow(() => expression);
``` 

### Conditions 

Passes if calling `expression` does not throw an error/exception

Fails if calling `expression` throws an error/exception 

### Parameters 

| Name | Description | 
|---|---| 
| `expression` | the expression to run |
| `message` | (optional) message to display on failure |