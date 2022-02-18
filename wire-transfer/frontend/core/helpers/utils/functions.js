/**
 * @function
 * truncates a string: helps shorten long strings.
 *
 * @param {string} str - the string.
 * @param {number} maxLength - the length to truncate from
 * @returns a `string`: the `truncated` string.
 *
 * @example
 * const description = truncate(data.desc, 30);
 */
export const truncate = (str, maxLength) => {
	if (!maxLength || str.length <= maxLength) {
		return str;
	}
	const truncate = `${str.slice(0, maxLength - 3)}...`;
	return truncate;
};


/**
 * @function
 * isEmpty: helps checkes if a variable is empty.
 *
 * @param {string || object} str - the string.
 * 
 * @returns a `boolean`: true or false.
 *
 * @example
 * const description = isEmpty(var);
 */


export const isEmpty = (fieldVar) =>{
	if(typeof fieldVar =='object'){
      if(fieldVar.length==0){
		  return false
	  }else{
		  return true
	  }
	}else{
		if(fieldVar.length ==0){
			return false
		}else{
			return true
		}
	}
	return false
}