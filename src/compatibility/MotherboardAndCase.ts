export function checkMotherboardAndCase(
    motherboardFormFactor: string,
    supportedFormFactors: string[]
): boolean {
    return supportedFormFactors.includes(motherboardFormFactor)
}