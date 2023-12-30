/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  let set1 = new Set(str1.toLowerCase().split(''));
  let set2 = new Set(str2.toLowerCase().split(''));
  let size=set1.size
  if(size!=set2.size){
    return false;
  }
  set2.forEach((i)=>{set1.add(i)})

  if(size!=set1.size){
    return false;
  }

  return true;
}

module.exports = isAnagram;
