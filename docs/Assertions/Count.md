---
title: Count
---

## Assertion: Count

Asserts that an array contains a certain number of elements

### Example

```ts
this.assert.count(expected, array);
```

### Conditions

Passes if `array` contains `expected` number of elements

Fails if `array` does not contain `expected` number of elements

### Parameters

| Name | Description |
|---|---|
| `expected` | the number of array elements expected |
| `array` | the array to check the length of |
| `message` | (optional) message to display on failure |