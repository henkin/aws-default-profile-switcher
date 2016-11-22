"use strict";

let profiles = require('./profiles')

let argv = process.argv[2];
if (argv)
    profiles.setProfile(argv);

console.log(profiles.profile());