/**
 * 文字列のルールでエラーがないか確認するメソッド
 * 1. 空白/null/undefined -> 異常
 * 2. 引数「maxLen」より大きい場合 -> 異常
 * @param target 対象の値
 * @param maxLen 対象の最大の長さ
 * @return true:異常 false:正常
 */
export function hasTextRuleError(target, maxLen) {
  // 1...
  if (target === null || target === undefined || target.length === 0) {
    return true;
  }

  maxLen === undefined ? 0 : maxLen;

  // 2...
  if (maxLen < target.length) {
    return true;
  }

  return false;
}
