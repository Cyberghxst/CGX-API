/**
 * Callback to emulate the $send
 * function of ea.ts v2.
 */
const SEND_CALLBACK = `$createCallback[send;$reply[
    $setCode[%param_0%]
    $setType[%param_1%]
    $setBody[%param_2%]
]]`

// Export the module.
module.exports = {
    SEND_CALLBACK
}