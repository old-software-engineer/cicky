export function showDialog(message, colour) {
    return {
        type: 'SHOW',
        message,
        colour,
    }
}

export function hideDialog() {
    return {
        type: 'HIDE',
    }
}

export function showMessage(status) {
    return {
        type: 'MESSAGE',
        status
    }
}

export function setSocket(status) {
    return {
        type: 'SOCKET',
        status
    }
}

export function setName(status) {
    return {
        type: 'NAME',
        status
    }
}

export function setTime(status) {
    return {
        type: 'TIME',
        status
    }
}

export function showPLayers(status) {
    return {
        type: 'PLAYERS',
        status,
    }
}

export function setData(status) {
    return {
        type: 'DATA',
        status,
    }
}

export function setButtonColor(status) {
    return {
        type: 'BTNCOLOR',
        status,
    }
}