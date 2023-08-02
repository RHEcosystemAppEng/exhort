/**
 * WIP custom loader to replace freemarker strings with demo data for ease of development
 */

const urlToRequest = require("loader-utils").urlToRequest;

module.exports = function (source) {
  console.log("The request path", urlToRequest(this.resourcePath));
  
//   return source;

  return source
    .replaceAll(/\[=.*?\]/g, 12)
    .replaceAll(`[#if dependency.getHighestVulnerability()?? ]`, '{true && ')
    .replaceAll(/\[#if .*?\]/g, '{true ? ')
    .replaceAll(`[#else]`, ':')
    .replaceAll(`[/#if]`, '}')
    .replaceAll(/\[#.*?\]/g, '')
    .replaceAll(/\[\/#.*?\]/g, '');
};
