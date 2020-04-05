const fs = require('fs');
const path = require('path');

const dirTree = require('directory-tree');

const notify = require('./notify.js')

var tag = require('osx-tag');

const volumesPath = '/Volumes';
const flagToBackupTag = '__hdd_backup_dirtree';

const directoryTreeBackupSavePath = '/Users/prateek/Desktop/scripts/backup-directory-tree/dirTreeBackups/';
const errorLogSavePath = '/Users/prateek/Desktop/scripts/backup-directory-tree/errors';

SendNotification("Backup started", "Disk Connected: Running Directory backup script...");

fs.readdir(volumesPath, async (error, files) => {
    if (error) {
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
        const baseName = path.basename(p)
        const savePath = path.join(directoryTreeBackupSavePath, `${baseName}.json`);
        fs.writeFile(savePath, JSON.stringify(tree, null, 2), function (error) {
            if (error) {
                ErrorHandling(error);
            }
            SendNotification('Backup successful', `Directory Tree backup done for '${baseName}'`);
        });
    } catch (error) {
        ErrorHandling(error);
    }
}

const GetOSXTags = function (p) {
    return new Promise((resolve, reject) => {
        try {
            tag.getTags(p, function (error, tags) {
                if (error) {
                    ErrorHandling(error);
                }
                resolve(tags)
            });
        } catch (error) {
            ErrorHandling(error);
        }
    })
}

const ErrorHandling = function (error) {
    const errorNotiicationMessage = 'Error while backing up directory tree';
    SendNotification("Backup failed", errorNotiicationMessage);
    console.error(error);
    throw error
}

function SendNotification (subtitle, message) {
    const title = "Backup Directory Tree"
    notify(title, subtitle, message);
}