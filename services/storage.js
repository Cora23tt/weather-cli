import fs from 'node:fs'
import { getEnvironmentData } from 'node:worker_threads';

const path = '/home/cora/Documents/coding_practise/weather_node_cli/data.txt'

async function saveKeyValue(key, value) {

    if (fs.existsSync(path)) {

        // reading all data from data.txt
        var arr = [];
        var CityStr = "";
        var TokenStr = "";
        try {
            var contents = await fs.promises.readFile(path, 'utf-8')
            arr = contents.split(/\r?\n/)
        } catch (err) {
            console.error(err)
        }
        
        // if data.txt is empty
        if(!arr){
            fs.writeFile(path, key+':'+value, err => {
                if (err) {
                  console.error(err);
                }
            });
            return;
        }

        // define old data if exist
        for(let i=0; i<arr.length; i++){
            if(arr[i].substring(0,4) == 'city'){
                CityStr = arr[i];
            }
            if(arr[i].substring(0,5) == 'token'){
                TokenStr = arr[i];
            }
        }

        // update data
        if(key=='city'){
            CityStr = "city:"+value;
        }
        if(key=="token"){
            TokenStr  = "token:"+value;
        }

        // write or update data
        fs.writeFile(path, TokenStr+'\n'+CityStr, err => {
            if (err) {
              console.error(err);
            }
        });

    } else {
        
        // create file & write data
        fs.writeFile(path, key+':'+value, err => {
            if (err) {
              console.error(err);
            }
        });

    }
}

async function getData() {
    
    var res = {};
    res['city'] = false;
    res['token'] = false;
    var arr = [];
    
    // read data into array
    try {
        var contents = await fs.promises.readFile(path, 'utf-8')
        arr = contents.split(/\r?\n/)
    } catch (err) {
        console.error(err)
    }

    // arrContent to structure
    for(let i=0; i<arr.length; i++){
        if(arr[i].substring(0,4) == 'city'){
            res.city = arr[i].substring(5,arr[i].length);
        }
        if(arr[i].substring(0,5) == 'token'){
            res.token = arr[i].substring(6,arr[i].length);
        }
    }

    if(!res.city || !res.token){``
        console.log(res);
        return;
    }

    return res;
}

export default {saveKeyValue, getData}