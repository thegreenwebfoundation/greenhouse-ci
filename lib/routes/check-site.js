'use strict';

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Boom = require('@hapi/boom')

module.exports = {
    method: 'GET',
    path: '/{url}',
    options: {
        handler: async (request, h) => {

            const { url } = request.params;
            console.log({ url });
            async function greenhouseCheck(url) {
                let command = `npx lighthouse-ci https://${url} --plugins=lighthouse-plugin-greenhouse --report output`
                const { stdout, stderr } = await exec(command);
                console.log('stdout:', stdout);
                console.log('stderr:', stderr);
                return [stdout, stderr]
            }
            const [res, err] = await greenhouseCheck(url).catch(err => {
                console.log(err)
                throw Boom.badData("shit borked. Soz", err)
            })
            console.log({ res })
            return `${res}`
        }
    }
};
