# backup-directory-tree

Makes a copy of the directory tree when an external HDD is connected

When an external HDD is connected, an Automator workflow is trigger by a Folder action on '/Volumes' which runs this script to make a copy of the directory tree of the HDD.
Notifies the user on success or errors

## Prerequisites
+ macOS (Tested only on High Sierra)
+ node version 12.2.0 or higher
+ [terminal-notifier](https://github.com/julienXX/terminal-notifier) installed (temporary dependency)

## To-do
[Tasks](https://github.com/mrPrateek95/backup-directory-tree/projects/1)


### References
+ [[Stack Overflow Answer] How to run Applescript on Disk mount](https://apple.stackexchange.com/a/8092/55902)
+ [Git branching strategy](https://nvie.com/posts/a-successful-git-branching-model/)