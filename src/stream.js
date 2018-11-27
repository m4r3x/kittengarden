const Promise = require("bluebird")

let receiveMessage = () => {
}

function waitForNextMessageList() {
    let messageBuffer = new Set()
    return new Promise((resolve) => {
        receiveMessage = (message) => {
            messageBuffer.add(message)
            if (messageBuffer.size === 1) {
                resolve(messageBuffer)
            }
        }
    })
}

async function* createMessageListStream() {
    while (true) {
        yield waitForNextMessageList()
    }
}

async function* createMessageStream() {
    let messageListStream = createMessageListStream()
    for await (let messageList of messageListStream) {
        for (let message of messageList) {
            yield message
        }
    }
}


let i = 0
let lastTick = Date.now()
const tickInterval = 1000

async function startConsumingMessageStream() {
    let messageStream = createMessageStream()
    for await (let messages of messageStream) {
        ++i
        if (i % 1000 === 0) {
            const now = Date.now()
            process.stdout.write(`${tickInterval}req/${Math.abs(lastTick - now)}ms\n`)
            i = 0
            lastTick = now
        }
    }
}

startConsumingMessageStream()

setInterval(async () => {
    receiveMessage('.')
}, 0)

