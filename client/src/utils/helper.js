import config from './../config';

export function isOwnSource(imgPath) {
    if (imgPath.indexOf(config.imageBucketUrl) >= 0)
        return true;
    return false;
}