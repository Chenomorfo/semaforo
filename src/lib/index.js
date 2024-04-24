// place files you want to import through the `$lib` alias in this folder.

export const showLightState = (state = 0) => {
    if (state == 0) return "Preventivas"
    if (state == 1) return "Verde"
    if (state == 2) return "Verde"
    if (state == 3) return "Amarillo"
    if (state == 4) return "Rojo"

    return "Verde"
}

export const showTimeRemainHor = (elapsed = 0) => {
    if (elapsed <= 13) // verde
        return elapsed
    if (elapsed <= 16) //verde parpadeante
        return elapsed - 13;
    if (elapsed <= 19) // amarillo
        return elapsed - 16
    if (elapsed <= 38) //rojo
        return elapsed - 19
}

export const showTimeRemainVer = (elapsed = 0) => {
    if (elapsed <= 19) //rojo
        return elapsed
    if (elapsed <= 32) // verde
        return elapsed - 19
    if (elapsed <= 35) //verde parpadeante
        return elapsed - 32
    if (elapsed <= 38) // amarillo
        return elapsed - 35
}