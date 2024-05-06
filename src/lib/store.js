import { derived, writable } from "svelte/store";

const model = {
    isPaused: false,
    isPreventive: false,
    elapsed: 0,
    estado: 5,
    stopElapsed: 0,
    estado2: 1,
    isVertical: true,
    isWaiting: false,
    timeAction: 0,
    timeChange: new Date()
}
export const trafficLightDuration = {
    green: 15 * 1000,
    greenTz: 3 * 1000,
    yellow: 3 * 1000,
    red: 2 * 1000,
    wait: 500
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

function createState() {
    const { set, subscribe, update } = writable(model)

    return {
        subscribe,
        increment: () => update(n => ({
            ...n, elapsed: n.elapsed + 1,
            stopElapsed: n.stopElapsed + 1
        })),

        tickme: () => update(n => {
            if (n.isWaiting)
                return { ...n, isWaiting: false }
            //en caso de rojo
            if (n.timeAction == 3)
                return { ...n, isVertical: !n.isVertical, timeAction: 0, timeChange: new Date() }
            //en caso de verde
            if (![0, 1].includes(n.timeAction))
                return { ...n, timeAction: n.timeAction + 1, timeChange: new Date() }
            //en caso de cambio
            return { ...n, timeAction: n.timeAction + 1, isWaiting: true, timeChange: new Date() }
        }),
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

export const hope = derived(
    semaforo,
    ($semaforo) => {
        if ($semaforo.isWaiting) return "wait"
        if ($semaforo.timeAction == 0) return "green"
        if ($semaforo.timeAction == 1) return "greenTz"
        if ($semaforo.timeAction == 2) return "yellow"
        if ($semaforo.timeAction == 3) return "red"
        return "green"
    }
)

export const elapsedDerived = derived(
    semaforo,
    ($semaforo) => {
        const upgradeState = () => {
            $semaforo.elapsed = 0;
            if ($semaforo.estado == 7) $semaforo.estado = 1
            else $semaforo.estado += 1
        }
        if ($semaforo.isPreventive) {
            return
        }
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
                if ($semaforo.elapsed == pray["Rojo"].time) {
                    upgradeState()
                }

                break;
            case (7):
                if ($semaforo.elapsed == pray["apagao"].time)
                    upgradeState()
                break;
            default:
                break;
        }

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
            return

        switch (($semaforo.estado2)) {
            case (0):
                if ($semaforo.stopElapsed == pray["Inicio"].time)
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
                if ($semaforo.stopElapsed == pray["Rojo"].time) {
                    upgradeState()
                }
                break;
            case (7):
                if ($semaforo.stopElapsed == pray["apagao"].time)
                    upgradeState()
                break;
            default:
                break;
        }

    }
)

export const elapsedTime = derived(
    semaforo,
    ($semaforo) => Math.round(($semaforo.timeChange - new Date()) / 1000)
);