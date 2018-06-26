const exec = require('child_process').exec;
const subsPath = '/Users/reuven/Downloads/ofri_youtube_subtitles.srt';
const perlCommand = "perl -pe 'BEGIN { undef $/; } s/(-->[^\n]*\n)/\1\xe2\x80\xab/g;s/(\r?\n\r?\n)/\xe2\x80\xac\1/g' " + subsPath;
const testscript = exec(perlCommand);

testscript.stdout.on('data', function(data){
    console.log(data);
    // sendBackInfo();
});

testscript.stderr.on('data', function(data){
    console.log(data);
    // triggerErrorStuff();
});
