# backup-directory-tree

Makes a copy of the directory tree when an external HDD is connected

When an external HDD is connected, an Automator workflow is trigger by a Folder action on '/Volumes' which runs this script to make a copy of the directory tree of the HDD.
Notifies the user on success or errors

## Prerequisites
+ macOS (Tested only on High Sierra)
+ node version 12.2.0 or higher
+ [terminal-notifier](https://github.com/julienXX/terminal-notifier) installed (temporary dependency)

## To-do
- [ ] Remove terminal-notifier as a dependency
- [ ] Add logic to check if terminal-notifier is installed (Optional if I can remove this dependency)
- [ ] Better logging for error messages
- [ ] Save the data to a DB
- [ ] Add automator workflow to source control
- [ ] Document/Automate the setup
- [ ] Make into terminal command and add it to npm


### References
+ https://apple.stackexchange.com/a/8092/55902