export function convertToNodePairs(data, parent = null, pairs = []) {
    if (parent) {
      pairs.push([parent, data.mainKeyword]);
    }
  
    data.relatedKeyword.forEach((child) =>
      convertToNodePairs(child, data.mainKeyword, pairs)
    );
  
    return pairs;
  }