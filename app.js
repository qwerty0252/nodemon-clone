const fs =  require('fs')
const {spawn} =  require('child_process')

function run(file){
    const nodeExecutable = 'node'
    const targetFile = file
    const nodeInstance = spawn(nodeExecutable, [targetFile])

    nodeInstance.stdout.on('data', (data)=>{
        console.log(`Output: ${data}`)
    })

    nodeInstance.stderr.on('data', (data)=>{
        console.log(`Error: ${data}`)
    })

    nodeInstance.on('close', (data)=>{
        console.log(`Child process exited with  ${data}`)
    })
}

fs.watch('./test_dir', (eventType, filename)=>{
    console.log('changed')
    run('./test_dir/test.js')
})