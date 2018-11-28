const p = {
    i: 0,
    lastTick: Date.now(),
    tickInterval: 50000
}

const performance = () => {
    if (++p.i % 50000 === 0) {
        const now = Date.now()
        process.stdout.write(`${p.tickInterval}req/${Math.abs(p.lastTick - now)}ms\n`)
        p.i = 0
        p.lastTick = now
    }
}

module.exports = {
    performance
}
