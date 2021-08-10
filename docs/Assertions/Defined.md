## Defined 

Asserts that a value is defined (any value other than `undefined`) 

### Example 

```ts 
this.assert.defined(expression);
``` 

### Conditions 

Passes if `expression` does not evaluate to `undefined`

Fails if `expression` evaluates to `undefined` 

### Parameters 

| Name | Description | 
|---|---| 
| `expression` | the value to check |
| `message` | (optional) message to display on failure |