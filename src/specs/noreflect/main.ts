interface Window {
    __karma__: any;
}

(function (): void {
    var allTestFiles: string[] = [];
    var TEST_REGEXP = /(NoReflect.*Spec)\.js$/i;

// Get a list of all the test files to include
    Object.keys(window.__karma__.files).forEach(function (file: string): void {
        if (TEST_REGEXP.test(file)) {

            // Normalize paths to RequireJS module names.
            // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
            // then do not normalize the paths
            var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
            allTestFiles.push(normalizedTestModule);
        }
    });

    require.config({
        // Karma serves files under /base, which is the basePath from your config file
        baseUrl: '/base',
        // we have to kickoff jasmine, as it is asynchronous
        callback: window.__karma__.start,
        // dynamically load all test files
        deps: allTestFiles,
        paths: {},
        shim: {},
        map: {},
        bundles: {}
    });
})();
