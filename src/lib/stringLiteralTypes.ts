type KeyGuard<T extends string> = {
  /** List of all the keys, for enumeration etc */
  keys: ReadonlyArray<T>
  /** A type guard for the type */
  typeGuard: (x: string) => x is T
}

/** Gets the string literal type from a keyguard */
export type Literal<T> = T extends KeyGuard<infer U> ? U : never

/** Helper for string literals, provides type guards & runtime keys. Example:
 *
 * ```
 * const someLiteralKeyGuard = keyGuard("one","two")
 * type SomeLiteral = Literal<typeof someLiteralKeyGuard>
 * ```
 */
export const keyGuard = <T extends string>(
  ...keys: ReadonlyArray<T>
): KeyGuard<T> => ({
  keys,
  typeGuard: (x: string): x is T => (keys as ReadonlyArray<string>).includes(x)
})

/** Joins existing keyguards */
export const joinGuards = <T extends string>(
  ...guards: ReadonlyArray<KeyGuard<T>>
): KeyGuard<T> => {
  const allKeys = guards.reduce((acc: T[], guard) => acc.concat(guard.keys), [])
  return {
    keys: allKeys,
    typeGuard: (x: string): x is T =>
      (allKeys as ReadonlyArray<string>).includes(x)
  }
}
