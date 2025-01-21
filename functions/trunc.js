const { APIFunction, ParamType } = require('easy-api.ts')

/**
 * The function executor of "$trunc".
 * @param {import('easy-api.ts').Data<true>} d - The runtime data.
 * @param {[string]} param1 - The parameters of the function.
 * @returns {Promise<void>}
 */
async function run(d, [num]) {
    return num.split('.')[0]
}

/**
 * Class that extends APIFunction to create "$trunc".
 */
class Trunc extends APIFunction {
    name = '$trunc'
    description = 'Removes the decimal places from a number.'
    parameters = [
        {
            name: 'Number',
            description: 'The number to truncate.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    usage = '$trunc[number]'
    returns = ParamType.Number
    compile = true
    aliases = []
    run = run
}

exports.default = Trunc