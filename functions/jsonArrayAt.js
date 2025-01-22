const { APIFunction, Errors, ParamType, Util } = require('easy-api.ts')

/**
 * The function executor of "$jsonArrayAt".
 * @param {import('easy-api.ts').Data<true>} d - The runtime data.
 * @param {[string, string]} param1 - The parameters of the function.
 * @returns {Promise<void>}
 */
async function run(d, [name, num]) {
    /**
     * @type {unknown[]}
     */
    const values = d.getInternalVar(`jsonArray:${name}`)
    if (!values) throw new Errors.InvalidVariableName(Errors.VariableType.Array, name, d.function);
    if (!Util.isNumber(num)) throw new Errors.InvalidFieldIndex(num, d.function, 'index');

    return values.at(parseInt(num))
}

/**
 * Class that extends APIFunction to create "$jsonArrayAt".
 */
class JSONArrayAt extends APIFunction {
    name = '$jsonArrayAt'
    description = 'Returns a value at the given JSON array.'
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
            name: 'Index',
            description: 'The index of the element to get.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    usage = '$jsonArrayAt[name;index]'
    returns = ParamType.Unknown
    compile = true
    aliases = []
    run = run
}

exports.default = JSONArrayAt