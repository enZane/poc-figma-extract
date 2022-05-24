import dJSON from "dirty-json";

const getTailwindObject = (tailwindConfig) => {
    tailwindConfig = tailwindConfig.replace(/module.exports = /g, '');
    return dJSON.parse(tailwindConfig);
}

// This function add the tokens in the extend object to keep the original values
const addTailwindConfig = (tailwindObject, tokens) => {
    if (!tailwindObject.theme.extend) {
        tailwindObject.theme.extend = {};
    }
    if (!tailwindObject.theme.extend?.colors) {
        tailwindObject.theme.extend.colors = {};
    }

    delete tailwindObject.theme.colors;

    tokens.forEach(token => {
        const key = Object.keys(token)[0];
        tailwindObject.theme.extend.colors[key] = token[key];
    });

    return tailwindObject
}

const fixedTailwindConfig = (tailwindObject, tokens) => {    
    if (!tailwindObject.theme.colors) {
        tailwindObject.theme.colors = {};
    }

    delete tailwindObject.theme.extend;

    tokens.forEach(token => {
        const key = Object.keys(token)[0];
        tailwindObject.theme.colors[key] = token[key];
    });
    return tailwindObject
}

export const formatTailwindConfig = (tailwindConfig, tokens, extend) => {
    const tailwindObject = getTailwindObject(tailwindConfig);
    const modifiedTaildwindObject = extend ? addTailwindConfig(tailwindObject, tokens) : fixedTailwindConfig(tailwindObject, tokens);

    const editedTailwindFile = JSON.stringify(modifiedTaildwindObject, null, 2);

    console.log('✍️  Tailwind config file updated\n');
    return `module.exports = ${editedTailwindFile}`;
}