const elasticsearch = require('elasticsearch');
const elasticsearchClient = new elasticsearch.Client( {
    node: process.env.DB_HOST
});
async function initializeIndex(indexName) {
    try {
        await elasticsearchClient.indices.get({
            index: indexName
        });
    } catch (e) {
        await elasticsearchClient.indices.create({
            index: indexName
        });
    }
}
const indexes = [
    "users"
]
indexes.forEach((index) => { initializeIndex(index) });

module.exports = elasticsearchClient;
