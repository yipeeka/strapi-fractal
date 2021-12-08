'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

 
 module.exports = {
   async create(ctx) {
     let entity;
     if (ctx.is('multipart')) {
       const { data, files } = parseMultipartData(ctx);
       entity = await strapi.services["contact-form-submissions"].create(data, { files });
     } else {
       entity = await strapi.services["contact-form-submissions"].create(ctx.request.body);
     }
 
     entity = sanitizeEntity(entity, { model: strapi.models["contact-form-submissions"] });
 
       // send an email by using the email plugin
       await strapi.plugins['email'].services.email.send({
         to: `${entity.email}`,
         from: 'zhongsh@gmail.com',
         subject: 'We will reply your requirement soon',
         html: `
          <p>Dear ${entity.firstName} ${entity.lastName} </p>
          <p>Thank you for your requirement, We will reply you as soon as possible.</p>
          <p>Best regards,</p>
          <p>Fractal</p>
          <p>You write:</p>
          <blockquote><p>${entity.content}</p></blockquote>
         `,
       });
 
 
     return entity;
   },
 };


