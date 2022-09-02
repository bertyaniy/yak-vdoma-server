const chalk = require('chalk');

class Logger {
    constructor(name) {
        this.name = name;
    }
    
    info(message) {
        const resultMessage = this.buildMessage(message);
        console.log(chalk.cyan(resultMessage));

        return this;
    }

    success(message) {
        const resultMessage = this.buildMessage(message);
        console.log(chalk.green(resultMessage));

        return this;
    }

    error(message) {
        const resultMessage = this.buildMessage(message);
        console.log(chalk.red(resultMessage));

        return this;
    }

    gap() {
        console.log('');

        return this;
    }

    buildMessage(message) {
        const prefix = this.getLoggerPrefix();
        const time = this.getCurrentTime();

        return prefix + time + message.trim();
    }

    getLoggerPrefix() {
        return `[${this.name}] `;
    }

    getCurrentTime() {
        const time = new Date().toLocaleTimeString();

        return `[${time}] `;
    }
}

module.exports = { Logger };