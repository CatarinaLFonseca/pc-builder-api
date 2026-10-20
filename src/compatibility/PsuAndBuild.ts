export function checkPsuAndBuild(
    cpuTdp: number,
    gpuTdp: number,
    psuWattage: number
) {
    const estimatedConsumption = cpuTdp + gpuTdp + 100
    const recommendedWattage = estimatedConsumption * 1.3

    return {
        compatible: psuWattage >= recommendedWattage,
        estimatedConsumption,
        recommendedWattage
    }
}