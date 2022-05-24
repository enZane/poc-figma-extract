import minimist from 'minimist';
import util from 'util';

export const Debug = (object) => {
    console.log(util.inspect(object, {showHidden: false, depth: null, colors: true}))
}

export const findError = (element, errorName) => {
    const { [errorName]: error } = element;
    if (error) {
        throw new Error(error);
    }
}

export const getParameters = () => {
    const args = minimist(process.argv.slice(2));
    return {
        extend: !!args.extend || !!args.e,
    }
}