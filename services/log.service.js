
function printHelp() {
    console.log(
        `HELP
        Display weather without any param
        -s [city] set default place
        -t [TOKEN] set openweather token
        -h show this help
        `
    )
}

function printSuccess(message) {
    console.log(' SUCCESS ') + ' ' + message;
}

function printError(errorStr = "das") {
    console.log(' ERROR ' + ' ' + errorStr);
}

export default {printHelp, printSuccess, printError}