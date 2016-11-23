var fs = require('fs')
    , ini = require('ini')
    , path = require('path')
    , colors = require('colors')

let home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
let profilePath = path.resolve(home, '.aws/credentials');

function getProfiles() {
    var profiles = ini.parse(fs.readFileSync(profilePath, 'utf-8'))
    return profiles;
}

function saveProfiles(profiles) {
    let profileString = ini.stringify(profiles);
    fs.writeFileSync(profilePath, profileString)
}

function printProfile(profileName, profile, isHighlight, longestNameLength) {
    let color = isHighlight ? colors.yellow : colors.dim.yellow;
    let namePadding = ' '.repeat(longestNameLength);
    let name = color((namePadding + profileName).slice(-longestNameLength));
    let id = color(profile.aws_access_key_id);
    let key = color(profile.aws_secret_access_key);
    console.log(`${name}: id: ${id}, key: ${key}`);
}

function printProfiles() {
    var config = getProfiles();

    function getDefault(config) {
        let defaultAccessKeyId = config.default.aws_access_key_id;

        let longestNameLength = Object.keys(config).reduce(function (a, b) { return a.length > b.length ? a : b; }).length;
        let profile;
        for (let matchedProfile in config) {
            let matched = config[matchedProfile];
            if (matched.aws_access_key_id == defaultAccessKeyId && matchedProfile != 'default') {
                profile = matched;
                printProfile(matchedProfile, profile, true, longestNameLength)
                break;
            }
        }

        for (let matchedProfile in config)
            if (matchedProfile != 'default' && config[matchedProfile] != profile)
                printProfile(matchedProfile, config[matchedProfile], false, longestNameLength)
    }

    return getDefault(config);
}

function setProfile(name) {
    var config = getProfiles();

    for (let matchedProfile in config) {
        if (matchedProfile !== "default" && matchedProfile.substring(0, name.length) == name) {
            //console.log("assign " + matchedProfile)//, JSON.stringify(config[matchedProfile]));
            Object.assign(config.default, config[matchedProfile]);
            saveProfiles(config);
        }
    }
}

module.exports = { printProfiles, setProfile };