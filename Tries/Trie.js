const TrieNode = require('./TrieNode');

class Trie {
    constructor(root) {
        this.root = new TrieNode(null);
    }
}

module.exports = Trie;