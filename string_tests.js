
const test_string = "This is a string of text.";
const test_array = ['This', 'is', 'an', 'array', 'of', 'strings'];

var join_output = test_array.join(" ");
console.log(join_output);


function replaceText(arr) {

    for (i = 0; i < arr.length; i++) {
        if (arr[i] == 'is') {
            console.log("'is' was found")
            arr[i] = 'was';
        }
    }

    return arr.join(" ");
}

var replace_test = replaceText(test_array);
console.log(replace_test);
