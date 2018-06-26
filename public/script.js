// Because we want to access DOM node,
// we initialize our script at page load.
var upload, file = {};
window.addEventListener('load', function () {
	// This will upload the file after having read it
	upload = function (form) {
		// If there is a selected file, wait it is read
		// If there is not, delay the execution of the function
		if (!file.binary) {
			alert('Please select a file first.');
			return false;
		}

		return fetch('/upload', { // Your POST endpoint
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'

			},
			body: JSON.stringify({
				subtitles: file.binary,
				name: file.dom.files[0].name
			})
		}).then(
			response => response.json() // if the response is a JSON object
		).then(
			success => {
				download(addRtlSuffix(file.dom.files[0].name), success);
			}
		).catch(
			error => console.log(error) // Handle the error response object
		);
	};

	addRtlSuffix = function (name, suffix = 'rtl') {
		var parts = name.split('.');
		parts[parts.length-2] += `_${suffix}`;
		return parts.join('.');
	}

	download = function(filename, text) {
		var pom = document.createElement('a');
		pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		pom.setAttribute('download', filename);

		if (document.createEvent) {
			var event = document.createEvent('MouseEvents');
			event.initEvent('click', true, true);
			pom.dispatchEvent(event);
		}
		else {
			pom.click();
		}
	}

	// These variables are used to store the form data
	file = {
		dom: document.getElementById("subtitleFile"),
		binary: null
	};

	// Use the FileReader API to access file content
	var reader = new FileReader();

	// Because FileReader is asynchronous, store its
	// result when it finishes to read the file
	reader.addEventListener("load", function () {
		file.binary = reader.result;
	});

	// At page load, if a file is already selected, read it.
	if (file.dom.files[0]) {
		reader.readAsText(file.dom.files[0], 'UTF-8');
	}

	// If not, read the file once the user selects it.
	file.dom.addEventListener("change", function () {
		if (reader.readyState === FileReader.LOADING) {
			reader.abort();
		}

		reader.readAsText(file.dom.files[0], 'UTF-8');
	});

});