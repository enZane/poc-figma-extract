import {
    getFigmaTokens
} from './Adapters/figmaAdapter.js';
import {
    ensureDirectoryExistence,
    getFundationComponentsTemplate,
    getStoryBookTemplate,
    getTailwindConfig,
    writeColorStory,
    writeFoundationComponents,
    writeTailwindConfig
} from './Adapters/fileAdapter.js';
import {
    formatTailwindConfig
} from './Domain/configurationDomain.js';
import { fillFundationComponents, fillStory } from './Domain/storiesDomain.js';
import {
    normalizeTokens
} from './Domain/tokensDomain.js';
import { getParameters } from './Domain/utils.js';

const main = async () => {
    const { extend } = getParameters();
    const TAILWIND_CONFIG_PATH = `${process.env.PROJECT_SOURCE}/tailwind.config.js`

    try {
        const figmaTokens = await getFigmaTokens()
        const tokens = normalizeTokens(figmaTokens);
        
        const tailwindFile = getTailwindConfig(TAILWIND_CONFIG_PATH);
        const result = formatTailwindConfig(tailwindFile, tokens, extend);

        const storyBookTemplate = getStoryBookTemplate();
        const story =fillStory(storyBookTemplate, tokens);

        const fundationComponentsTemplate = getFundationComponentsTemplate();
        const fundationComponents = fillFundationComponents(fundationComponentsTemplate, tokens, extend);

        ensureDirectoryExistence(`${process.env.PROJECT_SOURCE}/src/stories/Fundations`);
        writeTailwindConfig(TAILWIND_CONFIG_PATH,result);
        writeFoundationComponents(`${process.env.PROJECT_SOURCE}/src/stories/Fundations/FoundationComponents.jsx`, fundationComponents);
        writeColorStory(`${process.env.PROJECT_SOURCE}/src/stories/Fundations/Colors.stories.mdx`, story);
    } catch (e) {
        console.error(e);
    }
}

main();