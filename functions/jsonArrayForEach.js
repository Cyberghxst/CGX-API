const { APIFunction, Errors, ParamType, Util } = require('easy-api.ts')

/**
 * The function executor of "$jsonArrayForEach".
 * @param {import('easy-api.ts').Data<true>} d - The runtime data.
 * @param {[string, string]} param1 - The parameters of the function.
 * @returns {Promise<void>}
 */
async function run(d, [name, code]) {
    // Resolving the array name.
    name = await Util.resolveCode(d, name)

    /**
     * @type {unknown[]}
     */
    const values = d.getInternalVar(`jsonArray:${name}`)
    if (!values) throw new Errors.InvalidVariableName(Errors.VariableType.Array, name, d.function);

    for (const value of values) {
        const currentCode = code.replace(/%element%/gi, value)
        await Util.resolveCode(d, currentCode)
    }
}

/**
 * Class that extends APIFunction to create "$jsonArrayForEach".
 */
class JSONArrayForEach extends APIFunction {
    name = '$jsonArrayForEach'
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
            name: 'Code',
            description: 'The code to be executed for each element.',
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    usage = '$jsonArrayForEach[name;code]'
    returns = ParamType.Unknown
    compile = false
    aliases = []
    run = run
}

exports.default = JSONArrayForEach