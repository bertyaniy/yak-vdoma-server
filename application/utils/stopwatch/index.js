class Stopwatch {
    static getDuration(startedAt) {
        // Nanoseconds in one second
        const NS_PER_SEC = 1e9;
        // Nanoseconds in one milisecond
        const NS_TO_MS = 1e6;
        // Difference between current time and start time
        const diff = process.hrtime(startedAt);

        const result = (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
        return result.toFixed(2);
    }
}

module.exports = { Stopwatch };