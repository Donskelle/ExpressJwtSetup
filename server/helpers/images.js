// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const Storage = require('@google-cloud/storage');
const config = require('../configuration');
const path = require('path');
const sharp = require('sharp');


const CLOUD_BUCKET = config.gcloud.bucket;

const storage = Storage({
    projectId: config.gcloud.project
});
const bucket = storage.bucket(CLOUD_BUCKET);

// Returns the public, anonymously accessable URL to a given Cloud Storage
// object.
// The object's ACL has to be set to public read.
function getPublicUrl(filename) {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

// Express middleware that will automatically pass uploads to Cloud Storage.
// req.file is processed and will have two new properties:
// * ``cloudStorageObject`` the object name in cloud storage.
// * ``cloudStoragePublicUrl`` the public url to the object.
function sendUploadToGCS(req, res, next) {
    if (!req.file) {
        console.log("no file");
        return next();
    }


    const filename = path.basename(req.file.originalname, path.extname(req.file.originalname))
    const gcsname = Date.now() + filename;

    const images = [
        {
            name: "",
        },
        {
            name: "sm",
            size: [200, 200],
        },
        {
            name: "md",
            size: [600, 600],
        },
        {
            name: "lg",
            size: [1200, 800],
        },
    ]

    let finishCount = 0;

    images.forEach(img => {
        let imageName = gcsname + '-' + img.name;
        let file = bucket.file(imageName);



        let stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        stream.on('error', (err) => {
            req.file.cloudStorageError = err;
            next(err);
        });

        stream.on('finish', () => {
            finishCount += 1;
            if (finishCount === 1) {
                req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
                console.log(req.file.cloudStoragePublicUrl);
                next();
            }
            file.makePublic();
        });


        if (img.size) {
            sharp(req.file.buffer)
                .resize(img.size[0], img.size[1])
                .toBuffer()
                .then(function (outputBuffer) {
                    stream.end(outputBuffer);
                });
        }
        else {
            stream.end(req.file.buffer);
        }

    });
    /*
    const file = bucket.file(gcsname);
    const fileSmall = bucket.file(gcsname + "-sm");
    const fileMedium = bucket.file(gcsname + "-md");
    const fileLarge = bucket.file(gcsname + "-lg");

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        file.makePublic().then(() => {
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
            console.log(req.file.cloudStoragePublicUrl);
            next();
        });
    });

    stream.end(req.file.buffer);*/
}

const Multer = require('multer');
const multer = Multer({
    storage: Multer.MemoryStorage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(null, false)
        }
        callback(null, true)
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 10mb
    }
});

module.exports = {
    getPublicUrl,
    sendUploadToGCS,
    multer
};