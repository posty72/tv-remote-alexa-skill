
export const turnOn = () => ({
    command: 'ON_OFF',
    errorText: 'We could not talk to the remote',
    successText: 'Turning on the TV',
})

export const turnOff = () => ({
    command: 'ON_OFF',
    errorText: 'We could not talk to the remote',
    successText: 'Turning off the TV',
})

export const mute = () => ({
    command: 'MUTE',
    errorText: 'We could not talk to the remote',
    successText: 'Putting the TV on mute',
})

export const volumeUp = (amount: number) => ({
    command: 'VOLUME_UP',
    amount,
    errorText: 'We could not talk to the remote',
    successText: 'Turning up the TV',
})

export const volumeDown = (amount: number) => ({
    command: 'VOLUME_DOWN',
    amount,
    errorText: 'We could not talk to the remote',
    successText: 'Turning down the TV',
})

export const setChannel = (amount: number) => ({
    command: 'SET_CHANNEL',
    amount,
    errorText: 'We could not talk to the remote',
    successText: 'Changing the channel',
})

export const cycleInput = () => ({
    command: 'CYCLE_INPUT',
    errorText: 'We could not talk to the remote',
    successText: 'Switching to the next input',
})