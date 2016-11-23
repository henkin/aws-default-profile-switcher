# aws-default-profile-switcher
CLI aws default profile switcher tool. 

#### Install
`npm install -g aws-default-profile-switcher`

#### Usage
* `aps` show all profiles with the default profile selected
* `aps bob` or `aps b` switch to bob account (first beginning-of-string match)

This app makes the assumption that your default profile has another, named entry. So it will *replace* the default profile with a named profile. Please don't run this without making sure that your default profile has another, non-default entry as well.

*Please feel free to write test/improve*
