const createColorBox = (token) => `    <ColorBox color="${Object.keys(token)}" />`;

export const fillStory = (story, tokens) => {
    const regex = /\{ COLORS \}/g;
    const colorBoxes = tokens.map(createColorBox).join('\n');
    const storyContent = story.replace(regex, colorBoxes);
    console.log('📚 Storybook story generated\n');
    return storyContent;
}

export const fillFundationComponents = (components, tokens, extend) => {
    let componentsContent = components;
    if (extend) {
        const regex = /tailwindConfig.theme.colors\[color\]/g;
        componentsContent = componentsContent.replace(regex, 'tailwindConfig.theme.extend.colors[color]')
    }
    const regex = /\{ COLORS \}/g;
    const colors = tokens.map(token => `'${Object.keys(token)}'`).join(',');
    componentsContent = componentsContent.replace(regex, colors);
    console.log('📚 Foundation components generated\n');
    return componentsContent;
}