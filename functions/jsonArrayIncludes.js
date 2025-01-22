const { APIFunction, Errors, ParamType, Util } = require('easy-api.ts')

/**
 * The function executor of "$jsonArrayIncludes".
 * @param {import('easy-api.ts').Data<true>} d - The runtime data.
 * @param {[string, string]} param1 - The parameters of the function.
 * @returns {Promise<void>}
 */
async function run(d, [name, value]) {
    /**
     * @type {unknown[]}
     */
    const values = d.getInternalVar(`jsonArray:${name}`)
    if (!values) throw new Errors.InvalidVariableName(Errors.VariableType.Array, name, d.function);

    return String(values.includes(value))
}

/**
 * Class that extends APIFunction to create "$jsonArrayIncludes".
 */
class JSONArrayIncludes extends APIFunction {
    name = '$jsonArrayIncludes'
    description = 'Returns whether a value is in the given JSON array.'
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
            name: 'Match',
            description: 'The element value.',
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    usage = '$jsonArrayIncludes[name;match]'
    returns = ParamType.Boolean
    compile = true
    aliases = []
    run = run
}

exports.default = JSONArrayIncludes