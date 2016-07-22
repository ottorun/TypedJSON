"use strict";

module.exports = function (grunt) {

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({

        clean: {
            all: {
                src: [
                    "dist"
                ]
            }
        },

        tslint: {
            options: {
                configuration: "./tslint.json"
            },
            dev: {
                src: ["src/**/*.ts", "!src/typed-json.ts", "!**/*.d.ts"]
            }
        },

        jshint: {
            all: ["dist/**/*.js"],
            purejs: ["**/*.js", "!dist/**/*.js", "!node_modules/**/*.js"],
            options: {
                jshintrc: ".jshintrc",
                ignores: ["node_modules/"]
            }
        },

        run: {
            jasmine: {
                cmd: "node_modules/.bin/protractor",
                args: [
                    "test/protractorJasmine.conf.js"
                ]
            }
        },

        bump: {
            options: {
                files: ["package.json"],
                commit: true,
                commitMessage: "Release v%VERSION%",
                commitFiles: ["package.json", "changelog.md", "readme.md"],
                createTag: true,
                tagName: "v%VERSION%",
                tagMessage: "Version %VERSION%",
                push: false,
                pushTo: "origin"
            }
        },

        karma: {
            noreflect: {
                configFile: "karma/karma.noreflect.conf.js"
            },
            withreflect: {
                configFile: "karma/karma.withreflect.conf.js"
            },
        },

        ts: {
            default: {
                // This will run tsc twice.  The first time, the result of the "files1/**/*.ts" glob will be
                // passed to tsc with the --out switch as "out/ObjectStyle/1.js".
                // see https://github.com/gruntjs/grunt-docs/blob/master/Configuring-tasks.md#files-object-format
                files: {
                    "dist/tests": ["src/**/*.ts"]
                },
                options: {
                    module: "amd",
                    target: "es5",
                    comments: true,
                    noImplicitAny: false,
                    failOnTypeErrors: true,
                    experimentalDecorators: true,
                    sourceMap: false,
                    inlineSourcesMap: false,
                    inlineSources: false,
                    suppressImplicitAnyIndexErrors: true,
                    emitDecoratorMetadata: true
                }
            },
            lib: {
                // the result of the glob will be
                // passed to tsc with the --out switch as "dist/index.js".
                // see https://github.com/gruntjs/grunt-docs/blob/master/Configuring-tasks.md#files-object-format
                files: {
                    "dist/index.js": ["src/**/*.ts", "!src/specs/**/*.ts"]
                },
                options: {
                    module: "amd",
                    target: "es5",
                    comments: true,
                    noImplicitAny: false,
                    failOnTypeErrors: true,
                    experimentalDecorators: true,
                    sourceMap: false,
                    inlineSourcesMap: false,
                    inlineSources: false,
                    suppressImplicitAnyIndexErrors: true,
                    emitDecoratorMetadata: true,
                    declaration: true
                }
            }
        },

    });

    //tasks
    grunt.registerTask("build-ts", ["clean", "ts:default", "ts:lib"]);
    grunt.registerTask("tests", "Run Jasmine with karma", ["build-ts", "karma:noreflect", "karma:withreflect"]);
    grunt.registerTask("build", ["tests", "tslint", "jshint:purejs"]);
    grunt.registerTask("release", ["bump"]);
    grunt.registerTask("default", ["build"]);
};