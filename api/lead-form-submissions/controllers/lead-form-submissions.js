'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */


 const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

 
 module.exports = {
   async create(ctx) {
     let entity;
     if (ctx.is('multipart')) {
       const { data, files } = parseMultipartData(ctx);
       entity = await strapi.services["lead-form-submissions"].create(data, { files });
     } else {
       entity = await strapi.services["lead-form-submissions"].create(ctx.request.body);
     }
 
     entity = sanitizeEntity(entity, { model: strapi.models["lead-form-submissions"] });
 
       // send an email by using the email plugin
       await strapi.plugins['email'].services.email.send({
         to: `${entity.email}`,
         from: 'zhongsh@gmail.com',
         subject: 'Newsletter',
         text: `
          newsletter for ${entity.email}
         `,
       });
 
 
     return entity;
   },
 };
