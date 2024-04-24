// place files you want to import through the `$lib` alias in this folder.

export const showLightState = (state = 0) => {
    if (state == 0) return "Preventivas"
    if (state == 1) return "Verde"
    if (state == 2) return "Verde"
    if (state == 3) return "Amarillo"
    if (state == 4) return "Rojo"

    return "Verde"
}
