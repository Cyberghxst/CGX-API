/**
 * @type {import('easy-api.ts').EATS_ROUTE}
 */
const route = {
    url: '/profilecard',
    method: 'post',
    extraData: {
        description: 'Generates a profile card.',
        parameters: {
            username: {
                type: 'string',
                description: 'The name of the user.',
                optional: false
            },
            avatar: {
                type: 'string',
                description: 'The URL of the avatar.',
                optional: false
            },
            displayName: {
                type: 'string',
                description: 'The display name of the user.',
                optional: true
            },
            color: {
                type: 'string',
                description: 'The color of the profile card.',
                optional: true
            },
            banner: {
                type: 'string',
                description: 'The URL of the banner.',
                optional: true
            }
        }
    },
    code: `
        $c[Import the "SEND_CALLBACK".]
        $eval[false;$import[$join[$cwd;utils/callbacks.js];SEND_CALLBACK]]

        $c[Parsing the parameters to get the keys.]
        $createObject[params;$routeData[/profilecard;parameters]]
        $log[$objectKeys[params]]

        $c[Sending the response.]
        $callback[send;200;json;{}]
    `
}

module.exports.route = route