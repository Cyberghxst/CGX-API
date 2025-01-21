const { readdirSync } = require('fs')
const { join } = require('path')

/**
 * Load custom functions from the "functions" directory.
 * @this {import('easy-api.ts').API}
 * @returns {void}
 */
function loadFunctions() {
    const functions = readdirSync(join(process.cwd(), 'functions'))
    for (const fn of functions) {
        const data = require(join(process.cwd(), 'functions', fn))
        this.addFunction(data.default)
    }
}

module.exports = { loadFunctions }