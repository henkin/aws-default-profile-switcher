"use strict";

let profiles = require('./profiles')

let nameArg = process.argv[2];
if (nameArg)
    profiles.setProfile(nameArg);

profiles.printProfiles();