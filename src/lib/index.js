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
    if (elapsed <= 18) //verde parpadeante
        return elapsed - 15;
    if (elapsed <= 21) // amarillo
        return elapsed - 18
    if (elapsed <= 46) //rojo todos
        return elapsed - 20
    if (elapsed <= 48)
        return elapsed - 46
    return 0
}

/* 16s verd (15 a 0)
    19s verd[]
    22s amar
    24s rojo
    40s verd (15 a 0)
    43s verd[]
    46s ama
    48s rojo
*/

export const showTimeRemainVer = (elapsed = 0) => {
    if (elapsed <= 23) //rojo
        return elapsed - 21
    if (elapsed <= 39) // verde
        return 15 - (elapsed - 24)
    if (elapsed <= 39 + 3) //verde parpadeante
        return elapsed - 39
    if (elapsed <= 39 + 6) // amarillo
        return elapsed - 42
    if (elapsed <= 39 + 8) // rojo Todos
        return elapsed - 45

    return 0
}