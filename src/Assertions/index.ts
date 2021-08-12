import is_true from './True';
import is_false from './False';

import is_undefined from './Undefined';
import is_defined from './Defined';

import is_null from './Null';
import not_null from './NotNull';

import equal from './Equal';
import not_equal from './NotEqual';

import empty from './Empty';
import not_empty from './NotEmpty';

import count from './Count';

import contains from './Contains';
import not_contains from './DoesNotContain';

import string_contains from './StringContains';
import string_not_contains from './StringDoesNotContain';

import string_starts from './StringStartsWith';
import string_not_starts from './StringDoesNotStartWith';

import string_ends from './StringEndsWith';
import string_not_ends from './StringDoesNotEndWith';

import instance_of from './InstanceOf';

import throws from './Throws';
import does_not_throw from './DoesNotThrow';

export default new class AssertionLibrary {
    true = is_true;
    false = is_false;

    undefined = is_undefined;
    defined = is_defined;

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

    stringStartsWith = string_starts;
    stringDoesNotStartWIth = string_not_starts;

    stringEndsWith = string_ends;
    stringDoesNotEndWith = string_not_ends;

    instanceOf = instance_of;

    throws = throws;
    doesNotThrow = does_not_throw;
}