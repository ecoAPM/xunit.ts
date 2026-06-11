import contains from "./Contains";
import count from "./Count";
import is_defined from "./Defined";
import not_contains from "./DoesNotContain";
import does_not_throw from "./DoesNotThrow";
import empty from "./Empty";
import equal from "./Equal";
import is_false from "./False";
import instance_of from "./InstanceOf";
import not_empty from "./NotEmpty";
import not_equal from "./NotEqual";
import not_null from "./NotNull";
import is_null from "./Null";
import string_contains from "./StringContains";
import string_not_contains from "./StringDoesNotContain";
import string_not_ends from "./StringDoesNotEndWith";
import string_not_matches from "./StringDoesNotMatch";
import string_not_starts from "./StringDoesNotStartWith";
import string_ends from "./StringEndsWith";
import string_matches from "./StringMatches";
import string_starts from "./StringStartsWith";
import throws from "./Throws";
import is_true from "./True";
import is_undefined from "./Undefined";

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

	stringMatches = string_matches;
	stringDoesNotMatch = string_not_matches;

	instanceOf = instance_of;

	throws = throws;
	doesNotThrow = does_not_throw;
};