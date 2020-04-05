var tag = require('osx-tag');

const GetOSXTags = function (p) {
    return new Promise((resolve, reject) => {
        try {
            tag.getTags(p, function (err, tags) {
                if (err) {
                    console.log(err)
                }
                resolve(tags)
            });
        } catch (error) {
            console.log(error)
        }
    })
}

GetOSXTags("/Volumes/Anime | Comics")
.then((osxTags) => {
    console.log(osxTags.includes('__hdd_backup_dirtree'))
});