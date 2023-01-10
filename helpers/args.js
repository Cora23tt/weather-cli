function getArgs(argv = []) {
    const res = {};
    for(let i = 2; i<argv.length; i++) {
        if(argv[i].charAt(0) == '-') {
            if(i==argv.length-1){
                res[argv[i].charAt(1)] = true;
            } else if (argv[i+1].charAt(0) != '-') {
                res[argv[i].charAt(1)] = argv[i+1];
            } else {
                res[argv[i].charAt(1)] = true;
            }
        }
        
    }
    return res;
}

export default {getArgs}