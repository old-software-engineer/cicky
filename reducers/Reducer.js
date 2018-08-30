const initialStates = {
    msg: null,
    color: null,
    socket: null,
    name: null,
    winnerName: null,
    time: null,
    data: null,
    bgActiveColor: null,
    btc1: 'white', btc2: 'white', btc3: 'white', btc4: 'white', btc5: 'white', btc6: 'white',
    btc7: 'white', btc8: 'white', btc9: 'white', btc10: 'white', btc11: 'white', btc12: 'white',
    btc13: 'white', btc14: 'white', btc15: 'white', btc16: 'white', btc17: 'white', btc18: 'white',
    btc19: 'white', btc20: 'white', btc21: 'white', btc22: 'white', btc23: 'white', btc24: 'white',
}

export default function reducer(state, action) {
    if (typeof state === 'undefined') {
        return initialStates;
    }
    switch (action.type) {
        case 'SHOW':
            return Object.assign({}, state, {
                msg: action.message,
                color: action.colour,
            });

        case 'HIDE':
            return Object.assign({}, state, {
                msg: null,
                color: null,
            });

        case 'SOCKET':
            return Object.assign({}, state, {
                socket: action.status,
            });

        case 'NAME':
            return Object.assign({}, state, {
                name: action.status,
            });

        case 'TIME':
            return Object.assign({}, state, {
                time: action.status,
            });

        case 'DATA':
            return Object.assign({}, state, {
                data: action.status,
            });

        case 'BTNCOLOR':
        return Object.assign({}, state, {
            bgActiveColor: action.status,
        })
    }
}