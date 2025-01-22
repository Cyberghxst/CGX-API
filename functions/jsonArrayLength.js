const { APIFunction, Errors, ParamType } = require('easy-api.ts')

/**
 * The function executor of "$jsonArrayLength".
 * @param {import('easy-api.ts').Data<true>} d - The runtime data.
 * @param {[string, string]} param1 - The parameters of the function.
 * @returns {Promise<void>}
 */
async function run(d, [name]) {
    /**
     * @type {unknown[]}
     */
    const values = d.getInternalVar(`jsonArray:${name}`)
    if (!values) throw new Errors.InvalidVariableName(Errors.VariableType.Array, name, d.function);

    return String(values.length)
}

/**
 * Class that extends APIFunction to create "$jsonArrayLength".
 */
class JSONArrayLength extends APIFunction {
    name = '$jsonArrayLength'
    description = 'Returns the length of the given JSON array.'
    parameters = [
        {
            name: 'Name',
            description: 'The name of the JSON array.',
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    usage = '$jsonArrayLength[name]'
    returns = ParamType.Number
    compile = true
    aliases = []
    run = run
}

exports.default = JSONArrayLength