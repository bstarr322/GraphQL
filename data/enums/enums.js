/**
 * List all enums for the whole project.
 * @link http://www.2ality.com/2016/01/enumify.html
 */
import {Enum} from 'enumify';

export class CpdoneApiEnum extends Enum {};
CpdoneApiEnum.initEnum(["GOAL", "LEGACY", "VIEWER"]);

export class HttpMethodEnum extends Enum {};
HttpMethodEnum.initEnum(["GET", "POST", "PATCH", "DELETE"]);