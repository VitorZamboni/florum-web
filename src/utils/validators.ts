import type { Validator } from "@/commons/types"

export const requiredValidator: Validator = {
    message: "é obrigatório",
    uid: "required",
    validate: (value) => value.trim() !== ""
}

export const emailValidator: Validator = {
    message: "deve ser um email válido",
    uid: "email",
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
export const cepValidator: Validator = {
    message: "deve ter 8 dígitos",
    uid: "cep",
    validate: (value) => /^\d{8}$/.test(value)
}
