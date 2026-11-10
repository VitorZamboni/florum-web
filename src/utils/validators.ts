import type { Validator } from "@/commons/types"

export const requiredValidator: Validator = {
    message: " é requirido",
    uid: "required",
    validate: (value) => value.trim() !== ""
}

export const emailValidator: Validator = {
    message: " deve ser um email válido",
    uid: "email",
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}