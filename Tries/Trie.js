const TrieNode = require('./TrieNode');

class Trie {
    constructor(root) {
        this.root = new TrieNode(null);
    }

    insert(str) {
        var childNode = null;

        if (Object.keys(this.root.children).length === 0) {
            this.createNewBranch(this.root, str);
        }
        else {
            let strNode = this.getNodeMatch(this.root, str, 0);
            this.createNewBranch(strNode[1], strNode[0]);
        }
    }

    getNodeMatch (node, str, index) {
        if ((str[index] in node.children) && index < str.length) {
            return this.getNodeMatch(node.children[str[index]], str, (index + 1));
        }
        else {
            return [str.slice(index), node];
        }
    }

    createNewBranch (node, str) {
        var childNode = null;

        for(var i = (str.length - 1); i >= 0; i--) {
            var currentNode = null;
            if (i === (str.length - 1)) {
                currentNode = this.computeChild(str, i);
                childNode = currentNode;
            } else {
                currentNode = this.computeChild(str, i);
                currentNode.children = {[childNode.key] : childNode};
                childNode = currentNode;
                
                if (i === 0) {
                    node.children[currentNode.key] = currentNode;
                }
            }
        }

    }

    computeChild(str, childIndex) {
        var trieNode = new TrieNode(str[childIndex]);

        trieNode.isWord = this.isLastChild(str, childIndex);
        return trieNode;
    }

    isLastChild(str, index) {
        return index === str.length - 1;
    }

    contains(word) {
        let strArray = this.getNodeMatch(this.root, word, 0);
        let remainingStr = strArray[0];
        let nodeLeft = strArray[1];
        return !remainingStr && Object.keys(nodeLeft.children).length === 0
    }
}

module.exports = Trie;