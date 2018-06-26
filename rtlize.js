module.exports = function(input){
	var lines = input.split('\n');
	var pattern = /(\D+)/g;
	lines = lines.map(line => {
		if(pattern.test(line) && (line.indexOf('-->') < 0)) {
			return `‫${line}‬`; // This line contains invisible unicode characters, which make all the magic happen.
		}
		return line;
	});
	
	return lines.join('\n');
}