---
title: Throws 
---

## Assertion: Throws 

Asserts that an expression throws an error/exception 

### Example 

```ts 
this.assert.throws(() => expression);
``` 

### Conditions 

Passes if calling `expression` throws an error/exception

Fails if calling `expression` does not throw an error/exception 

### Parameters 

| Name | Description | 
|---|---| 
| `expression` | the expression to run |
| `message` | (optional) message to display on failure |