var consts = {
    host: "localhost",                      // MongoDB Hostname
    db: "kartenn_api",                      // Database name
    authSource: "admin",                    // Authentiction table
    user: "user",                           // User
    pass: "password",                       // Password
    // Certificates path
    SSLCertificateFile: "fullchain.pem",    
    SSLCertificateKeyFile: "privkey.pem",
    https: true,
    // Maps & Stuff
    outputDir: "/var/www/website/maps/",    // Maps output path     
    generatorPath: "./KartennGenerator",      // Generator path
    mapsUrl: "http://localhost:8080/maps/"  // Maps url
};

module.exports = consts;
