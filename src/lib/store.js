import { derived, writable } from "svelte/store";

const model = {
    isPaused: false,
    isPreventive: false,
    elapsed: 32,
    stopElapsed: 0,
    greenTime: 13,
    warnTime: 3,
    redTime: 19,
    lightStateHor: 0,
    lightStateVer: 3
}

function createState() {
    const { set, subscribe, update } = writable(model)

    return {
        subscribe,
        increment: () => update(n => ({
            ...n, elapsed: n.elapsed <= 50 ? n.elapsed + 1 : 0,
            stopElapsed: n.stopElapsed + 1
        })),
        changeLight: (green = false, red = false) => update(n => ({
            ...n,
            elapsed: green ? 0 : n.elapsed,
            stopElapsed: red ? 0 : n.stopElapsed
        })),
        pause: () => update(n => ({ ...n, isPaused: !n.isPaused })),
        preventive: () => update(n => ({ ...n, isPreventive: !n.isPreventive })),
        reset: () => set(model)
    }

}

export const semaforo = createState()

export const elapsedDerived = derived(
    semaforo,
    ($semaforo) => {
        if ($semaforo.isPreventive)
            return 0
        if ($semaforo.elapsed <= 15) // verde
            return 1
        if ($semaforo.elapsed <= 18) //verde parpadeante
            return 2
        if ($semaforo.elapsed <= 21) // amarillo
            return 3
        if ($semaforo.elapsed <= 23 + 16 + 8) //rojo
            return 4
    }
)

export const reverseDerived = derived(
    semaforo,
    ($semaforo) => {
        if ($semaforo.isPreventive)
            return 0
        if ($semaforo.elapsed <= 23) //rojo
            return 4
        if ($semaforo.elapsed <= 23 + 16) // verde
            return 1
        if ($semaforo.elapsed <= 23 + 16 + 3) //verde parpadeante
            return 2
        if ($semaforo.elapsed <= 23 + 16 + 6) // amarillo
            return 3
        if ($semaforo.elapsed <= 23 + 16 + 8) // rojo todos
            return 4
    }
)