const path = require('path');
const cmd = require('node-cmd');
const fs = require('fs');

let arr = [];

cmd.get(
    `
        cd
        cd Documents/drawbridge
        gfa
        git branch
    `,
    function(err, data, stderr){
        if(!err){
            arr = data.split('\n');
            for(let i in arr) {
                if(arr[i].indexOf('\*') != -1){
                    arr[i] = arr[i].replace(/\*/g,"");
                }
            }
            gco_branches(arr);
        } 
        else console.log("error!", err);
    }
)

gco_branches = arr => {

    let my_files_names = [];

    arr.forEach( element =>{
        cmd.get(
            `
                cd
                cd Documents/drawbridge/reports
                gfa
                gco ${element} -f
                find . *.org 
            `,
            function(err, data, sterr){
            my_files_names = data.split('\n')
            if(!err) get_path(my_files_names) ;
                else console.log(err);
            }
        )
    })
}

get_path = data => {
    let aux;
    let paths = [];
    for(let i in data){
        aux = data[i];
        if(aux[aux.length - 1] === 'g' && aux[aux.length - 2] === 'r' && aux[aux.length - 3] === 'o') 
            paths.push(aux);
    }
    let abs_path = [];
    let my_pc_path = '/home/lovato/Documents/drawbridge/reports/';

    paths.forEach( element => {
        if(element[0] === '.') {
            for(let i in element){
                if(i > 1){
                   my_pc_path += element[i] 
                }
            };
            abs_path.push( my_pc_path);
        }
        else {
            abs_path.push(my_pc_path + element);
        }
        my_pc_path =  '/home/lovato/Documents/drawbridge/reports/';
    })
    cp_files(abs_path);
}

cp_files = files_path => {
    let this_path = path.resolve() + '/ReportsOrg';
   files_path.forEach( element => {
       cmd.get(
           `
            cd
            cp -u ${element} ${this_path}
           `,
           function(err, data, stderr){
               if(!err) console.log(data);
               else console.log(err);
           }
       )
   })
   turning_into_html();
}

turning_into_html = () =>{
    let this_path = path.resolve() + '/HtmlFiles';
    
}