import fs from 'fs';

export const getTailwindConfig = (path) => {
    console.log('🚀 Opening Tailwind config file\n');
    const tailwindConfig = fs.readFileSync(path, 'utf8');
    return tailwindConfig;
};

export const writeTailwindConfig = (path, content) => {
    fs.writeFileSync(path, content, 'utf8');
    console.log('📝 Tailwind config file written\n');
}

export const getStoryBookTemplate = () => {
    const template = fs.readFileSync('./Templates/Colors.stories.mdx', 'utf8');
    return template;
}

export const getFundationComponentsTemplate = () => {
    const template = fs.readFileSync('./Templates/FoundationComponents.jsx', 'utf8');
    return template;
}

export const ensureDirectoryExistence = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
}

export const writeFoundationComponents = (path, components) => {

    fs.writeFileSync(path, components);
    console.log('📝 Storybook components file written\n');
}

export const writeColorStory = (path, content) => {
    fs.writeFileSync(path, content, 'utf8');
    console.log('📝 Color story file written\n');
}