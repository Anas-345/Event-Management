const inputBase =
    "w-full rounded-lg border bg-background/70 px-3.5 py-2.5 text-sm text-foreground shadow-sm outline-none transition placeholder:text-text-secondary/60 focus:bg-surface focus:ring-2"

const inputNormal =
    "border-black/10 hover:border-black/20 focus:border-primary focus:ring-primary/20 dark:border-white/10 dark:hover:border-white/20"

const inputError =
    "border-danger/70 focus:border-danger/70 focus:ring-danger/25"

const fieldClass = (hasError) =>
    `${inputBase} ${hasError ? inputError : inputNormal}`

export { fieldClass }