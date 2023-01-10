import getArgs from './helpers/args.js';
import process from 'node:process'
import logService from './services/log.service.js'
import storageService from './services/storage.js'
import http from 'node:http'

function initCLI() {
    const args = getArgs.getArgs(process.argv);
    if (args.h) {
        logService.printHelp();
        return;
    }
    if (args.s) {
        storageService.saveKeyValue('city', args.s)
        return;
    }
    if (args.t) {
        storageService.saveKeyValue('token', args.t);
        return;
    }
    printWeather();
}

async function printWeather() {
    
    // get the data from data.txt && if not exist printError()
    var data = await storageService.getData();
    if (!data){
        
        var errorStr = `the data was not exist
        cannot find token or city for weather
        type: weather -s [city] || weather -t [token]
        you will get token from https://openweathermap.org/api`;

        logService.printError(errorStr);
        return;
        
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${data.token}&q=${data.city}&aqi=no`;
    
    const request = http.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });
    
        response.on('end', () => {
            const body = JSON.parse(data);
            console.log( body.location.name + ' | ' + body.location.country );
                
            var daynight = 'Night';
            if(body.current.is_day) {
                daynight = 'Day';
            }
            console.log(daynight + ' | ' + body.location.localtime);
            console.log(body.current.temp_c + '°C | ' + body.current.condition.text);

        });
    })
    
    request.on('error', (error) => {
        console.log('An error', error);
    });
    
    request.end();
}

initCLI();