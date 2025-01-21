const { APIFunction, ParamType, Errors } = require('easy-api.ts')

/**
 * The function executor of "$jsonArrayParse".
 * @param {import('easy-api.ts').Data<true>} d - The runtime data.
 * @param {[string, string]} param1 - The parameters of the function.
 * @returns {Promise<void>}
 */
async function run(d, [name, array]) {
    // Throw errors if an array isn't provided.
    if (!array.startsWith('[')) throw new Errors.InvalidField('array', d.function);
    if (!array.endsWith(']')) throw new Errors.InvalidField('array', d.function);

    try {
        d.setInternalVar(`jsonArray:${name}`, JSON.parse(array))
    } catch {
        throw new Errors.InvalidField('array', d.function)
    }
}

/**
 * Class that extends APIFunction to create "$jsonArrayParse".
 */
class JSONArrayParse extends APIFunction {
    name = '$jsonArrayParse'
    description = 'Parses a JSON array.'
    parameters = [
        {
            name: 'Name',
            description: 'The name of the JSON array.',
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null
        },
        {
            name: 'Array',
            description: 'The string JSON array to be parsed.',
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    usage = '$jsonArrayParse[name;array]'
    returns = ParamType.Unknown
    compile = true
    aliases = []
    run = run
}

exports.default = JSONArrayParse