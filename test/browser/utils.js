define(function() {

    'use strict';

    return {

        loadTestFiles: function(fileNameRegex) {

            var files = [];

            for (var file in window.__karma__.files) {
                if (window.__karma__.files.hasOwnProperty(file)) {
                    if (fileNameRegex.test(file)) {
                        files.push(file);
                    }
                }
            }

            return files;
        }
    };
});
