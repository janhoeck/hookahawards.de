export type ConfigValue = string | number | boolean | null | Record<string, unknown> | unknown[]

export type Config = Record<string, ConfigValue>
