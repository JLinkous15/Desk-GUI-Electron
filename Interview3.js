//Level One

const values = [52,48,55,55,56,48,48,101,101,102,98,48,51,98,54,52,53,101,98,102,56,57,102,51,52,55,98,56,101,55,49,98]

let optionOne = String.fromCharCode.apply(null, values)

let optionTwo = []

values.forEach((value, index) => (
	optionTwo.push(String.fromCharCode(value))
))

console.log(optionTwo.join(""))