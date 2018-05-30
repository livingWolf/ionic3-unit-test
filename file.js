const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");

fs.readFile("./tsconfig.json", "utf8", (err, data) => {
  if (err) console.error(err);
  let preData = JSON.parse(data);
  preData.typeRoots = ["node_modules/@types"];
  preData.types = ["jasmine"];
  let newData = JSON.stringify(test1, null, 2);
  fs.writeFileSync("./tsconfig.json", newData, "utf8");
});

fs.readFile("./package.json", "utf8", (err, data) => {
  if (err) console.error(err);
  let preData = JSON.parse(data);
  preData.scripts["add"] =
    "npm install --save-dev @angular/cli @angular/router @types/jasmine @types/node ionic-mocks jasmine-core jasmine-spec-reporter karma karma-chrome-launcher karma-cli karma-jasmine karma-jasmine-html-reporter karma-coverage-istanbul-reporter karma-junit-reporter";
  preData.scripts["test-coverage"] = "ng test --code-coverage";
  preData.scripts["test"] = "ng test";
  let newData = JSON.stringify(test1, null, 2);
  fs.writeFileSync("./package.json", newData, "utf8");
});

function copyfile(src, location = ".") {
  let aims = `${location}/${src}`;
  fs.copyFile(`./ionic3-unit-test/${src}`, aims, e => {
    if (e) console.error(e);
    fs.unlink(`./ionic3-unit-test/${src}`, e => {
      if (e) console.error(e);
    });
  });
}

copyfile(".angular-cli.json");
copyfile("karma.conf.js");
copyfile("tsconfig.ng-cli.json");

copyfile("polyfills.ts", "./src");
copyfile("test.ts", "./src");
copyfile("tsconfig.spec.json", "./src");

function removePromise(dir) {
  return new Promise(function(resolve, reject) {
    //先读文件夹
    fs.stat(dir, function(err, stat) {
      if (stat.isDirectory()) {
        fs.readdir(dir, function(err, files) {
          files = files.map(file => path.join(dir, file)); // a/b  a/m
          files = files.map(file => removePromise(file)); //这时候变成了promise
          Promise.all(files).then(function() {
            fs.rmdir(dir, resolve);
          });
        });
      } else {
        fs.unlink(dir, resolve);
      }
    });
  });
}
removePromise("./ionic3-unit-test").then(function() {
  console.log("删除成功");
});
