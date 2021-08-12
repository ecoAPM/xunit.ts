---
title: Not Null 
---

## Assertion: Not Null 

Asserts that a value is not `null` 

### Example 

```ts 
this.assert.notNull(expression);
``` 

### Conditions 

Passes if `expression` does not evaluate to `null`

Fails if `expression` evaluates to `null` 

### Parameters 

| Name | Description | 
|---|---| 
| `expression` | the value to check |
| `message` | (optional) message to display on failure |