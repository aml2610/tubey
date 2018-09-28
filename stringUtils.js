const endMet = (str, i, end) => str.slice(i).startsWith(end);

const excludeMet = (str, i, exclude) => str.slice(0, i).endsWith(exclude);

const substringUpUntil = (str, i, end, exclude, keyLength) => {
    if (!isNaN(end)) {
        return str.slice(i + keyLength, i + keyLength + end);
    }

    let substrArr = [];
    let stop = false;

    while (!stop && i < str.length) {
        if(!endMet(str, i, end)) {
            substrArr.push(str.charAt(i));
        } else {
            if (!exclude || !excludeMet(str, i, exclude)) {
                stop = true;
            }
        }
        i++;
    }

    return substrArr.join('');
};

const allIndicesOf = (str, toSearch) => {
    let indices = [];

    for(let pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
        indices.push(pos);
    }

    return indices;
};

const stripKey = (key, keyAndVal, subtract) => keyAndVal.slice(key.length - subtract);

module.exports = {
    allIndicesOf,
    stripKey,
    substringUpUntil,
};
