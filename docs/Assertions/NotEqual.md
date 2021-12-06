---
title: Not Equal
---

## Assertion: Not Equal

Asserts that two values are not equal

### Example

```ts
this.assert.notEqual(expected, actual);
```

### Conditions

Passes if `actual` and `expected` do not evaluate to equal values

Fails if `actual` and `expected` evaluate to equal values

### Parameters

| Name | Description |
|---|---|
| `expected` | the expected value |
| `actual` | the actual value |
| `message` | (optional) message to display on failure |