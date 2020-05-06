const { exec } = require("child_process");
const fs = require("fs");

function execShellCommand(cmd) {
    return new Promise((resolve, reject) => {
     exec(cmd, (error, stdout, stderr) => {
      if (error) {
       console.warn(error);
      }
      resolve(stdout? stdout : stderr);
     });
    });
   }

class Generator {
    constructor(path, outputDir, mapsUrl) {
        this._path = path
        if (outputDir == undefined) {
            this._outputDir = "";
        } else {
            this._outputDir = outputDir;
        }

        if (mapsUrl == undefined) {
            this._mapsUrl = "";
        } else {
            this._mapsUrl = mapsUrl;
        }
    }

    get path() {
        return this._path;
    }

    async createMap(model, name, output) {
        const stdout = await execShellCommand(`${this._path} ${name} ${model} ${this._outputDir}${output}`);
        console.log(`${stdout}`);

        return this._mapsUrl + output;

        // try {
        //     const data = fs.readFileSync(`${this._outputDir}${output}`, 'utf8')
        //     return data;
        // } catch (error) {
        //     console.error(error);
        //     return;
        // }
    }

    async createPreview(input, output){
        const stdout = await execShellCommand(`convert ${this._outputDir}${input} -resize '600x400^' -gravity center -crop 500x300+0+0 +repage ${this._outputDir}thumbnails/${output}`);
        console.log(`${stdout}`);

        return this._mapsUrl + "/thumbnails/" + output;
    }
}

module.exports = Generator;