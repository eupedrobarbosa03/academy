type AcademyRegex = "name" | "cpf" | "telephone" | "specialty"

export const academyRegex = {
    name: /^(\p{L} ?){5,40}$/giu,
    cpf: /(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{11}$)/gim,
    telephone: /^\d{11}$/gim,
    specialty: /^[a-z]{5,30}$/gim,
} satisfies Record<AcademyRegex, RegExp>

