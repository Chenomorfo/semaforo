import { derived, writable } from "svelte/store";

const model = {
    isPaused: false,
    isPreventive: false,
    elapsed: 0,
    estado: 0,
    estado2: 0,
    stopElapsed: 0,
}

const pray = {
    "Inicio": { state: 0, time: 4 },
    "Verde": { state: 1, time: 30 },
    "VerdePar": { state: 2, time: 6 },
    "apagao": { state: 3, time: 1 },
    "Amarellho": { state: 4, time: 6 },
    "Rojo": { state: 5, time: 42 },
    "apagao2": { state: 6, time: 1 },
}
const pray2 = {
    "Inicio": { state: 0, time: 4 },
    "Rojo": { state: 1, time: 42 },
    "apagao": { state: 2, time: 1 },
    "Verde": { state: 3, time: 30 },
    "VerdePar": { state: 4, time: 6 },
    "Amarellho": { state: 5, time: 6 },
    "apagao2": { state: 6, time: 1 },
}

function createState() {
    const { set, subscribe, update } = writable(model)

    return {
        subscribe,
        increment: () => update(n => ({
            ...n, elapsed: n.elapsed + 1 /* <= 50 ? n.elapsed + 1 : 0 */,
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
        const upgradeState = () => {
            $semaforo.elapsed = 0;
            if ($semaforo.estado == 7) $semaforo.estado = 1
            else $semaforo.estado += 1
        }
        if ($semaforo.isPreventive)
            return 0
        switch (($semaforo.estado)) {
            case (0):
                if ($semaforo.elapsed == pray["Inicio"].time)
                    upgradeState()
                break;
            case (1):
                if ($semaforo.elapsed == pray["Verde"].time)
                    upgradeState()
                break;
            case (2):
                if ($semaforo.elapsed == pray["VerdePar"].time)
                    upgradeState()
                break;
            case (3):
                if ($semaforo.elapsed == pray["apagao"].time)
                    upgradeState()
                break;
            case (4):
                if ($semaforo.elapsed == pray["Amarellho"].time)
                    upgradeState()
                break;
            case (5):
                if ($semaforo.elapsed == pray["apagao"].time)
                    upgradeState()
                break;
            case (6):
                if ($semaforo.elapsed == pray["Rojo"].time)
                    upgradeState()
                break;
            case (7):
                if ($semaforo.elapsed == pray["apagao"].time)
                    upgradeState()
                break;
            default:
                break;
        }
        /* if ($semaforo.elapsed <= 15) // verde
            return 1
        if ($semaforo.elapsed <= 18) //verde parpadeante
            return 2
        if ($semaforo.elapsed <= 21) // amarillo
            return 3
        if ($semaforo.elapsed <= 23 + 16 + 8) //rojo
            return 4 */
    }
)

export const reverseDerived = derived(
    semaforo,
    ($semaforo) => {
        const upgradeState = () => {
            $semaforo.stopElapsed = 0;

            if ($semaforo.estado2 == 0) $semaforo.estado2 = 5
            else if ($semaforo.estado2 == 7) $semaforo.estado2 = 1
            else $semaforo.estado2 += 1
        }
        if ($semaforo.isPreventive)
            return 0
        switch (($semaforo.estado2)) {
            case (0):
                if ($semaforo.stopElapsed == pray2["Inicio"].time)
                    upgradeState()
                break;
            case (1):
                if ($semaforo.stopElapsed == pray["Verde"].time)
                    upgradeState()
                break;
            case (2):
                if ($semaforo.stopElapsed == pray["VerdePar"].time)
                    upgradeState()
                break;
            case (3):
                if ($semaforo.stopElapsed == pray["apagao"].time)
                    upgradeState()
                break;
            case (4):
                if ($semaforo.stopElapsed == pray["Amarellho"].time)
                    upgradeState()
                break;
            case (5):
                if ($semaforo.stopElapsed == pray["apagao"].time)
                    upgradeState()
                break;
            case (6):
                if ($semaforo.stopElapsed == pray["Rojo"].time)
                    upgradeState()
                break;
            case (7):
                if ($semaforo.stopElapsed == pray["apagao"].time)
                    upgradeState()
                break;
            default:
                break;
        }
        /*         if ($semaforo.elapsed <= 23) //rojo
                    return 4
                if ($semaforo.elapsed <= 23 + 16) // verde
                    return 1
                if ($semaforo.elapsed <= 23 + 16 + 3) //verde parpadeante
                    return 2
                if ($semaforo.elapsed <= 23 + 16 + 6) // amarillo
                    return 3
                if ($semaforo.elapsed <= 23 + 16 + 8) // rojo todos
                    return 4 */
    }
)