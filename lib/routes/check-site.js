'use strict';

const Boom = require('@hapi/boom')
const Joi = require('@hapi/joi')
const GreenHouseCheck = require('../greenhouse-check')


module.exports = {
    method: 'GET',
    path: '/{url}',
    options: {
        validate: {
            params: {
                // TODO we want to be able to pass real urls into the handler, and validate like this:
                // url: Joi.string().uri({
                //     scheme: [
                //         'http',
                //         'https'
                //     ]
                // }),
                // for the time being only accepts domain names
                url: Joi.string().hostname().min(3)
            }
        },

        handler: async (request, h) => {

            const { url } = request.params;
            console.log({ url });

            [report, stdout, stderr] = await GreenHouseCheck.checkUrl(url).catch(err => {
                console.log(err)
                throw Boom.badImplementation("Something went wrong with the lighthouse check")
            })

            return `${report}`
        }
    }
};
