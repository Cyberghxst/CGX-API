const { APIFunction, Errors, ParamType } = require('easy-api.ts')

/**
 * The function executor of "$jsonJoinArray".
 * @param {import('easy-api.ts').Data<true>} d - The runtime data.
 * @param {[string, string]} param1 - The parameters of the function.
 * @returns {Promise<void>}
 */
async function run(d, [name, sep]) {
    /**
     * @type {unknown[]}
     */
    const values = d.getInternalVar(`jsonArray:${name}`)
    if (!values) throw new Errors.InvalidVariableName(Errors.VariableType.Array, name, d.function);

    return values.join(sep ?? ', ')
}

/**
 * Class that extends APIFunction to create "$jsonJoinArray".
 */
class JSONJoinArray extends APIFunction {
    name = '$jsonJoinArray'
    description = 'Joins a JSON array.'
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
            name: 'Separator',
            description: 'The element separator.',
            type: ParamType.String,
            required: false,
            rest: false,
            defaultValue: ', '
        }
    ]
    usage = '$jsonJoinArray[name;separator?]'
    returns = ParamType.String
    compile = true
    aliases = []
    run = run
}

exports.default = JSONJoinArray