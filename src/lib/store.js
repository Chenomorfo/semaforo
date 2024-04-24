import { derived, writable } from "svelte/store";

const model = {
    isPaused: false,
    isPreventive: false,
    elapsed: 0,
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
            ...n, elapsed: n.elapsed < 38 ? n.elapsed + 1 : 0,
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
        if ($semaforo.elapsed <= 13) // verde
            return 1
        if ($semaforo.elapsed <= 16) //verde parpadeante
            return 2
        if ($semaforo.elapsed <= 19) // amarillo
            return 3
        if ($semaforo.elapsed <= 38) //rojo
            return 4
    }
)

export const reverseDerived = derived(
    semaforo,
    ($semaforo) => {
        if ($semaforo.isPreventive)
            return 0
        if ($semaforo.elapsed <= 19) //rojo
            return 4
        if ($semaforo.elapsed <= 32) // verde
            return 1
        if ($semaforo.elapsed <= 35) //verde parpadeante
            return 2
        if ($semaforo.elapsed <= 38) // amarillo
            return 3
    }
)