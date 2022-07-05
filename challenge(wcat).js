let arr = process.argv.slice(2)
let path = require('path')
let fs = require('fs')


// console.log(arr)

let files =[]
let operations = []

for(let i = 0; i < arr.length; i++){

    let found = arr[i].includes('.')
    if(found){
        files.push(arr[i])
    }
    else{
        operations.push(arr[i])
    }
}


if(operations.includes('-s') && operations.includes('-n')){
    operations.pop('-n')
    operations.pop('-s')
    operations.push('trimAndnum');
}else if(operations.includes('-s') && operations.includes('-b')){
    operations.pop('-b')
    operations.pop('-s')
    operations.push('trimAndNonnum')
}

let answer = ''
switch(operations[0]){

    case '-s' : answer = trimFile()
                break


    case '-n' : answer = numbering()
                break


    case '-b' : answer = nonSpaceNum()
                break    


    case 'trimAndNonnum' : answer = trimAndNonnum()
                           break    


    case 'trimAndnum' : answer = trimAndnum()
                        break


}

console.log(answer)


function readFile(){
    let fileContent =''
    for(let i =0;i<files.length;i++){
        fileContent += fs.readFileSync(path.join('./challenge1',files[i]))+'\n'
    }
    
    return fileContent.trim()
}

function converIntoArr(fileContent){

    let arr
    arr = fileContent.trim().split('\n')
    return arr
}

function trimFile(){
    
    let fileContent = readFile()
    fileContent =  converIntoArr(fileContent)
    let content =''
    for(let i =0;i<fileContent.length;i++){
        if(fileContent[i]!='\r'){
            content += fileContent[i]+'\n\n'
        }
    }
    // console.log(content.trim())
    return content.trim()
}


function numbering(){

    let fileContent= readFile()
    fileContent = converIntoArr(fileContent) 
    let content = ''
    for(let i =0;i<fileContent.length;i++){
        content += i+1+'.  '+fileContent[i]+'\n'
    }
    // console.log(content.trim())
    return content.trim()
}


function nonSpaceNum(){

    let fileContent= readFile()
    fileContent = converIntoArr(fileContent) 
    let content =''
    let count = 1
    for(let i=0;i<fileContent.length;i++){
        if(fileContent[i]!='\r'){
            content += count +'.  '+ fileContent[i]+'\n\n'
        }
        count++
    }
    // console.log(content.trim())
    return content.trim()
}


function trimAndNonnum(){
    let fileContent = trimFile()
    fileContent = converIntoArr(fileContent)
    let content =''
    let count = 1
    for(let i=0;i<fileContent.length;i++){
        if(fileContent[i]!=''){
            content += count +'.  '+ fileContent[i]+'\n\n'
        }
        count++
    }
    // console.log(content.trim())
    return content.trim()
}

function trimAndnum(){
    let fileContent = trimFile()
    fileContent = converIntoArr(fileContent)
    let content =''
    for(let i=0;i<fileContent.length;i++){
        content += i+1 +'.  '+ fileContent[i]+'\n'
        
    }
    // console.log(content.trim())
    return content.trim()
}
