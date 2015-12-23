/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import './helpers/setup';

import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import async from 'async';
import autoprefixer from 'autoprefixer';
import globals from '../app_modules/global';
import gulp from 'gulp';
import gutil from 'gulp-util';
import gulpif from 'gulp-if';
import gulpinsert from 'gulp-insert';
import gulpzip from 'gulp-zip';
import gulprename from 'gulp-rename';
import { C_STYLE as license } from 'scripts/tasks/update-boilerplate';
import minimist from 'minimist';
import rimraf from 'rimraf';
import sass from 'node-sass';
import through from 'through2';
import postcss from 'postcss';

const argv = minimist(process.argv.slice(2));
const isNpm = argv.npm === true;

const MODULE_NAME = globals.moduleName;
const PRESERVE_COMMENTS_CONTAINING = /(normalize|http|https|license|flag)/ig;

const now = new Date();
const gitversion = process.env.GIT_VERSION;

///////////////////////////////////////////////////////////////
// Helpers
///////////////////////////////////////////////////////////////

const distPath = path.resolve.bind(path, __PATHS__.dist);

function copy(src, dest, options, done) {
  gulp.src(src, options)
    .pipe(gulp.dest(dest))
    .on('error', done)
    .on('finish', done);
}

///////////////////////////////////////////////////////////////
// Tasks
///////////////////////////////////////////////////////////////

async.series([

  /**
   * Clean the dist folder
   */
  (done) => rimraf(__PATHS__.dist, done),

  /**
   * Copy necessary root files to be included in the final module
   */
  (done) => {
    const src = [
      'README-dist.txt',
      '.npmignore',
      'package.json'
    ].map(function(file) {
      return path.resolve(__PATHS__.root, file);
    });
    copy(src, __PATHS__.dist, {}, done);
  },

  /**
   * Cleanup the package.json
   */
  (done) => {
    let packageJSON = JSON.parse(fs.readFileSync(distPath('package.json')).toString());
    packageJSON.name = 'design-system-facades';
    delete packageJSON.scripts;
    delete packageJSON.devDependencies;
    fs.writeFile(
      distPath('package.json'), 
      JSON.stringify(packageJSON, null, 2),
      done
    );
  },

  ////////////////////////////////////
  // Javascript
  ////////////////////////////////////

  /**
   * Move all the bundled script files to dist/scripts
   */
  (done) => {
    gulp.src([
      path.resolve(__PATHS__.build, '**/*.js')
    ], { base: __PATHS__.build })
      .pipe(gulprename(function (path) {
        path.basename = "design-system-facades." + path.basename;
      }))
      .pipe(gulprename(function (path) {
        path.basename = path.basename.replace('.bundle', '');
      }))
      // Not sure that we need the version number in each file.
      // Makes diffing versions kind of tedious
      //.pipe(gulpif(isNotVendorFile, gulpinsert.prepend(`/* ${globals.displayName} ${gitversion} */\n`)))
      .pipe(gulp.dest(path.resolve(__PATHS__.dist, 'assets/scripts')))
      .on('error', done)
      .on('finish', done);
  },

  /**
   * Add build date to README.txt
   */
  (done) => {
    gulp.src(distPath('README-dist.txt'))
      .pipe(gulprename('README.md'))
      .on('error', done)
      .pipe(gulpinsert.prepend(`# ${globals.displayName} \n# Version: ${gitversion} \n`))
      .on('error', done)
      .pipe(gulp.dest(distPath()))
      .on('error', done)
      .on('finish', done);
  },

  /**
   * Remove old README-dist
   */
  (done) => {
    rimraf(distPath('README-dist.txt'), done);
  },

  /**
   * Remove .dist node_modules directory
   */
  (done) => {
    rimraf(distPath('node_modules'), done);
  },

  /**
   * Remove npm related files
   */
  (done) => {
    if (isNpm) return done();
    const src = [
      '.npmignore',
      'package.json'
    ].map(file => distPath(file));
    async.each(src, rimraf, done)
  },

  /**
   * Zip everything up
   */
  (done) => {
    if (isNpm) return done();
    return gulp.src(distPath('**/*'))
      .pipe(gulpzip(globals.zipName(gitversion)))
      .on('error', done)
      .pipe(gulp.dest(distPath()))
      .on('error', done)
      .on('finish', done);
  }

], err => {
  if (err) throw err;
});
