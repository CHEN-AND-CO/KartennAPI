const { exec } = require("child_process");

class Generator {
    constructor(path){
        this._path = path
    }

    get path(){
        return this._path;
    }

    createMap(model, name, output){
        exec(`./"+${this._path} ${model} ${name} ${output}`, (error, stdout, stderr)=>{
            if(error){
                console.log(`error: ${error.message}`)
                return;
            }
            if(stderr){
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }
}

module.exports = Generator;