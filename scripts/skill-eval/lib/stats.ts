/** 数値配列の中央値。空配列は null。 */
export function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

/** 数値配列の平均。空配列は null。 */
export function mean(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/** 比率（true の割合）。空配列は null。 */
export function rate(values: boolean[]): number | null {
  if (values.length === 0) return null;
  return values.filter(Boolean).length / values.length;
}
