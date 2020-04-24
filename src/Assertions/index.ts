import is_true from './True';
import is_false from './False';

import is_null from './Null';
import not_null from './NotNull';

import equal from './Equal';
import not_equal from './NotEqual';

import empty from './Empty';
import not_empty from './NotEmpty';

import count from './Count';

import contains from './Contains';
import not_contains from './NotContains';

import string_contains from './StringContains';
import string_not_contains from './StringNotContains';

import instance_of from './InstanceOf';

export default class AssertionLibrary {
    true = is_true;
    false = is_false;

    null = is_null;
    notNull = not_null;

    equal = equal;
    notEqual = not_equal;

    empty = empty;
    notEmpty = not_empty;

    count = count;

    contains = contains;
    doesNotContain = not_contains;

    stringContains = string_contains;
    stringDoesNotContain = string_not_contains;

    instanceOf = instance_of;
}