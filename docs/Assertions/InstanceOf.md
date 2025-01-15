---
title: Instance Of 
---

## Assertion: Instance Of 

Asserts that a value is an instance of a certain type 

### Example 

```ts 
this.assert.instanceOf(type, object);
``` 

### Conditions 

Passes if `object`'s type matches `type`

Fails if `object`'s type does not match `type` 

### Parameters 

| Name | Description | 
|---|---| 
| `type` | the expected type of the value |
| `expression` | the value to check |
| `message` | (optional) message to display on failure |