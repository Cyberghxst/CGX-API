/**
 * @type {import('easy-api.ts').EATS_ROUTE}
 */
const route = {
    url: '/bdfd-utils/escape',
    method: 'get',
    code: `
        $c[Import the "SEND_CALLBACK".]
        $eval[false;$import[$join[$cwd;utils/callbacks.js];SEND_CALLBACK]]

        $c[Path to the HTML]
        $let[path;$join[$cwd;static;escaper.html]]

        $c[Sending the response.]
        $callback[send;200;file;$get[path]]
    `
}

module.exports.route = route