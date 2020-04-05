const fs = require('fs');
const path = require('path');

const dirTree = require('directory-tree');

const notifier = require('node-notifier');

var tag = require('osx-tag');

const volumesPath = '/Volumes';
const flagToBackupTag = '__hdd_backup_dirtree';

const errorNotiicationMessage = 'Error while backing up directory tree';

fs.readdir(volumesPath, async (err, files) => {
    if (err) {
        ErrorHandling(error)
    }
    for (const file of files) {
        const fullPath = path.join(volumesPath, file);
        const osxTags = await GetOSXTags(fullPath)
        if(osxTags.includes(flagToBackupTag))
        {
            BackupDirectoryStructure(fullPath)
        }
    }
});

const BackupDirectoryStructure = function (p) {
    try {
        const tree = dirTree(p);
        fs.writeFile(`./dirTreeBackups/${path.basename(p)}.json`, JSON.stringify(tree, null, 2), function (err) {
            if (err) {
                ErrorHandling(error);
            }
            notifier.notify(`Directory Tree backup done for '${path.basename(p)}'`);
        });
    } catch (error) {
        ErrorHandling(error);
    }
}

const GetOSXTags = function (p) {
    return new Promise((resolve, reject) => {
        try {
            tag.getTags(p, function (err, tags) {
                if (err) {
                    ErrorHandling(error);
                }
                resolve(tags)
            });
        } catch (error) {
            ErrorHandling(error);
        }
    })
}

const ErrorHandling = function (err) {
    notifier.notify(errorNotiicationMessage);
    console.error(err);
    process.exit(1)
}