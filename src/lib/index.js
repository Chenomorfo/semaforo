// place files you want to import through the `$lib` alias in this folder.

const colors = [
    { key: "green", value: "Verde Fijo" },
    { key: "green", value: "Verde Parpadeante" },
    { key: "yellow", value: "Amarillo Fijo" },
    { key: "red", value: "Rojo Fijo" },
    { key: "yellow", value: "Preventivas" }
]

export const showLightState = (state = 0) => {
    if (state == 0) return colors[4]
    if (state == 1) return colors[0]
    if (state == 2) return colors[1]
    if (state == 3) return colors[2]
    if (state == 4) return colors[3]

    return colors[0]
}

export const showTimeRemainHor = (elapsed = 0) => {
    if (elapsed <= 15) // verde
        return 15 - elapsed
    if (elapsed <= 17) //verde parpadeante
        return elapsed - 15;
    if (elapsed <= 21) // amarillo
        return elapsed - 18
    if (elapsed <= 40) //rojo
        return elapsed - 21
}

export const showTimeRemainVer = (elapsed = 0) => {
    if (elapsed <= 21) //rojo
        return elapsed
    if (elapsed <= 34) // verde
        return 16 - (elapsed - 21)
    if (elapsed <= 37) //verde parpadeante
        return elapsed - 34
    if (elapsed <= 40) // amarillo
        return elapsed - 37
}