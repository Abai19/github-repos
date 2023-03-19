export function changeDate (date: string) {
    return date.replace(/[a-zA-Zа-яА-Я]/g, " ")
}
