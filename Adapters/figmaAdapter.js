import fetch from 'node-fetch';
import 'dotenv/config'
import {
    GROUP,
    TEXT,
} from '../const.js';
import {
    findError
} from '../Domain/utils.js';

const fetchFigmaFile = async () => {
    console.log('⏳  Fetching Figma file...\n');
    const figmaFile = await fetch(`https://api.figma.com/v1/files/${process.env.FIGMA_UUID}`, {
        headers: {
            'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN
        }
    })
    
    return await figmaFile.json()
}

const getChildren = (figmaObject) => {
    const {
        children
    } = figmaObject;
    return children;
}

const getFigmaPage = (figmaFile, pageName) => {
    const pages = getChildren(figmaFile.document);
    return pages.find(page => page.name === pageName);
}

const getFigmaObject = (figmaPage, objectName) => {
    const objects = getChildren(figmaPage);
    return objects.find(object => object.name === objectName);
}

const filterByType = (figmaObject, typeName) => {
    const groups = getChildren(figmaObject);
    return groups.filter(group => group.type === typeName);
}

const groupsToTokens = (groups) => {
    const token = groups.map(groupToToken);
    return token;
}

const groupToToken = (group) => {
    const {
        children
    } = group;

    const texts = children.filter(child => child.type === TEXT);
    const characters = texts.map(text => text.characters);

    const regex = /^#/;
    const name = characters.find(character => !regex.test(character));
    const color = characters.find(character => regex.test(character));

    return {
        name,
        color
    };
}

export const getFigmaTokens = async () => {
    const [page, objectName] = process.env.COLORS_PAGE.split('-');

    const figmaFile = await fetchFigmaFile();

    findError(figmaFile, 'err');
    console.log('✅ Successfully fetched Figma file\n');
    
    const figmaPage = getFigmaPage(figmaFile, page);
    const figmaObject = getFigmaObject(figmaPage, objectName);
    const groups = filterByType(figmaObject, GROUP);

    const tokens = groupsToTokens(groups);

    return tokens;

}