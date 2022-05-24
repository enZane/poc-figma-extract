const normalizeName = (name) => {
    const normalizedName = name
        .toLowerCase()
        .replace(/\s/g, '-');
    return normalizedName;
};

const normalizeToken = (token) => {    

    const { name, color } = token;
    const normalizedName = normalizeName(name);

    const normalizedToken = {
        [normalizedName]: color
    }

    return normalizedToken;
}

export const normalizeTokens = (tokens) => {
    const normalizedTokens = tokens.map(normalizeToken)
        .sort((a, b) => {
            const [aName] = Object.keys(a);
            const [bName] = Object.keys(b);
            return aName.localeCompare(bName);
        });

        console.log('👾 Tokens generated\n');

    return normalizedTokens;
}