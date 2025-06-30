
export type NonReadonly<T> = {
  -readonly [P in keyof T]: T[P];
}

export type OmitByType<T, V> = {
  [Key in keyof T as T[Key] extends V ? never : Key]: T[Key];
}
