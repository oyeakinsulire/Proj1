const browserSync = require('browser-sync').create();

browserSync.init({
    server: './', // Set the root of your local server
    files: ['*.html', '*.css', '*.js', '*/*.js'], // Files to watch for changes
    // browser: 'google chrome', // Open in Google Chrome (you can change this)
});