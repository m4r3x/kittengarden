const measurements = require('./measurements')
let receiveMessage

const waitForNextMessageList = async () => {
    return new Promise((resolve) => {
        receiveMessage = async (message) => {
            resolve(message)
        }
    })
}

async function* createMessageListStream() {
    while (true) {
        yield waitForNextMessageList()
    }
}

async function* createMessageStream() {
    for await (let messageList of createMessageListStream()) {
        yield messageList
    }
}

async function startConsumingMessageStream() {
    for await (let messages of createMessageStream()) {
        measurements.performance()
    }
}

const main = async () => {
    startConsumingMessageStream()

    while (true) {
        await receiveMessage(Math.random())
    }
}

main()


