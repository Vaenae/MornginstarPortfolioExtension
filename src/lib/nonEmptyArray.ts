export type NonEmptyArray<T> = [T, ...T[]]

export function isNonEmptyArray<T>(xs: T[]): xs is NonEmptyArray<T> {
  return xs.length > 0
}

export type ReadonlyNonEmptyArray<T> = readonly [T, ...T[]]

export function isReadonlyNonEmptyArray<T>(
  xs: readonly T[]
): xs is ReadonlyNonEmptyArray<T> {
  return xs.length > 0
}
