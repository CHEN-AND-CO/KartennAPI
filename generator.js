const { execSync } = require("child_process");
const fs = require("fs");

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

    createMap(model, name, output) {
        const stdout = execSync(`./${this._path} ${name} ${model} ${this._outputDir}${output}`);
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
}

module.exports = Generator;