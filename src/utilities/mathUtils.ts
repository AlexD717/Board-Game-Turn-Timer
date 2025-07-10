export function getNextAvailableNumber(existingNumbers: number[]): number {
    let nextNumber = 0
    while (existingNumbers.includes(nextNumber)) {
        nextNumber++
    }
    return nextNumber
}
