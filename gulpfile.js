var gulp = require("gulp");
var less = require("gulp-less");
var pug = require("gulp-pug");
var browserSync = require("browser-sync").create();
var header = require("gulp-header");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var pkg = require("./package.json");

// Set the banner content
var banner = [
  "/*!\n",
  " * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n",
  " * Copyright 2017 -" + new Date().getFullYear(),
  " <%= pkg.author %>\n",
  " * All rights reserved\n",
  " */\n",
  ""
].join("");

// Compile LESS files from /less into /css
gulp.task("less", function() {
  return gulp
    .src("less/main.less")
    .pipe(less())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest("css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("pug", function buildHTML() {
  return gulp
    .src(["*.pug"])
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("./"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// Minify compiled CSS
gulp.task(
  "minify-css",
  gulp.series("less", function() {
    return gulp
      .src("css/main.css")
      .pipe(cleanCSS({ compatibility: "ie8" }))
      .pipe(rename({ suffix: ".min" }))
      .pipe(gulp.dest("css"))
      .pipe(
        browserSync.reload({
          stream: true
        })
      );
  })
);

// Minify JS
gulp.task("minify-js", function() {
  return gulp
    .src("js/main.js")
    .pipe(uglify())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("js"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// Copy lib libraries from /node_modules into /lib
gulp.task("copy", function() {
  gulp
    .src([
      "node_modules/bootstrap/dist/**/*",
      "!**/npm.js",
      "!**/bootstrap-theme.*",
      "!**/*.map"
    ])
    .pipe(gulp.dest("lib/bootstrap"));

  gulp
    .src([
      "node_modules/jquery/dist/jquery.js",
      "node_modules/jquery/dist/jquery.min.js"
    ])
    .pipe(gulp.dest("lib/jquery"));

  gulp
    .src(["node_modules/simple-line-icons/*/*"])
    .pipe(gulp.dest("lib/simple-line-icons"));

  gulp
    .src([
      "node_modules/font-awesome/**",
      "!node_modules/font-awesome/**/*.map",
      "!node_modules/font-awesome/.npmignore",
      "!node_modules/font-awesome/*.txt",
      "!node_modules/font-awesome/*.md",
      "!node_modules/font-awesome/*.json"
    ])
    .pipe(gulp.dest("lib/font-awesome"));
});

// Run everything
gulp.task(
  "default",
  gulp.parallel("pug", "less", "minify-css", "minify-js", "copy")
);

// Configure the browserSync task
gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html",
      directory: false
    }
  });
});

// Dev task with browserSync
gulp.task(
  "dev",
  gulp.series(
    "pug",
    "less",
    "minify-css",
    "minify-js",
    gulp.parallel("browserSync", function() {
      gulp.watch(["*.pug", "pug/*.pug"], gulp.series("pug"));
      gulp.watch("less/*.less", gulp.series("less"));
      gulp.watch("less/components/*.less", gulp.series("less"));
      gulp.watch("css/*.css", gulp.series("minify-css"));
      gulp.watch("js/*.js", gulp.series("minify-js"));
      // Reloads the browser whenever HTML or JS files change
      gulp.watch("*.html", browserSync.reload);
      gulp.watch("js/**/*.js", browserSync.reload);
    })
  )
);

gulp.task("build", gulp.parallel("pug", "less", "minify-css", "minify-js"));
