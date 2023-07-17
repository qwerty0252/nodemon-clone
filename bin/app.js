#! /usr/bin/env node

const fs =  require('fs')
const {spawn} =  require('child_process')
const path = require('path')
const args = process.argv


function run(file){
    const nodeExecutable = 'node'
    const targetFile = file
    const nodeInstance = spawn(nodeExecutable, [targetFile])

    nodeInstance.stdout.on('data', (data)=>{
        console.log(`${data}`)
    })

    nodeInstance.stderr.on('data', (data)=>{
        console.log(`Error: ${data}`)
    })

    nodeInstance.on('close', (data)=>{
        console.log(`Child process exited with  ${data}`)
    })
}

run(`${args[2]}.js`)
console.log(args)
console.log()

fs.watch(`${process.cwd()}`, (eventType, filename)=>{
    console.log(`Restarting`)
    run(`${process.cwd()}/${args}.js`)
})
