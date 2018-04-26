import config from './../config';

export function isOwnSource(imgPath) {
    if (imgPath.indexOf(config.IMAGEBUCKETURL) >= 0)
        return true;
    return false;
}