#! /usr/bin/env node
const fs = require("fs");
const { spawn } = require("child_process");
const file = process.argv[2];
const pwd = process.cwd();
let pid;
console.log(process.argv);
function run(file) {
  const nodeExecutable = "node";
  const targetFile = file;
  const nodeInstance = spawn(nodeExecutable, [targetFile]);
  pid = nodeInstance.pid;
  nodeInstance.stdout.on("data", (data) => {
    console.log(`${data}`);
  });

  nodeInstance.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  nodeInstance.on("close", (data) => {
    // console.log(`Child process exited with  ${data}`);
  });
}

run(file.slice(file.length - 3) != ".js" ? `${file}.js` : `${file}`);
file.sp;

fs.watch(`${pwd}`, (eventType, filename) => {
  process.kill(pid, "SIGTERM");
  console.log(`Restarting`);
  run(
    `${pwd}/${file.slice(file.length - 3) != ".js" ? `${file}.js` : `${file}`}`
  );
});
