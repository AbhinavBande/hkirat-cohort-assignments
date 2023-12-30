/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/
function isAlphabet(str){
  return 'a' < str && str <'z' || 'A' < str && str <'Z';
}

function isPalindrome(str) {

  let start=0, end=str.length-1;
  str=str.toLowerCase();
  while(start<end){
    console.log(start, str[start], end,str[end])
    if(!isAlphabet(str[start])){
      start++;
      continue;
    }
    if(!isAlphabet(str[end])){
      end--;
      continue;
    }
    if(str[start]!=str[end]){
      return false;
    }
    start++;
    end--;
  }
  return true;

}

module.exports = isPalindrome;
