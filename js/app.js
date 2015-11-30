var $ = require('jquery');
var query = require('dict-de/lib/query.js');
var parse = require('dict-de/lib/parse.js');
var print = require('dict-de/lib/print.js');

$('#query').click(function () {
    var text = $('#word').val();

    var $loading = $('.loading').show();
    var $queryResults = $('#query-results').html('');

    query(text).done(function (data) {
        $loading.hide();

        var word = parse(data);

        if (word === null || !word.valid) {
            alert('Invalid word.');
        } else {
            if (word.explanations.length > 0) {
                $queryResults.append('<h5>Bedeutungen:</h5>');

                for (i = 0, length = word.explanations.length; i < length; i++) {
                    $queryResults.append('<p>' + word.explanations[i] + '</p>');
                }
            }

            if (word.examples.length > 0) {
                $queryResults.append('<h5>Beispiele:</h5>');

                for (i = 0, length = word.examples.length; i < length; i++) {
                    $queryResults.append('<p>' + word.examples[i] + '</p>');
                }
            }
        }
    }, function (message) {
        $loading.hide();

        alert(message);
    });
});
