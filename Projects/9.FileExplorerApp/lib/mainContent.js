const fs = require('fs');
const path = require('path');

const calculateSizeD = require('./calculateSizeD.js');
const calculateSizeF = require('./calculateSizeF.js');

const buildMainContent = (fullStaticPath, pathname) => {
    
    let mainContent = '';
    let items;
    
    try{
        items = fs.readdirSync(fullStaticPath);
        
    } catch(err){
        console.log(`readingSync error: ${err}`);
        return `<div class="alert alert-danger">Internal Server Error</div>`;
    }
    
    //remove .DS_Store
    items = items.filter(element => element !=='.DS_Store');
    if(pathname === '/'){
        items = items.filter(element => element !=='project_files');
//        items = items.filter(element => !['project_files', 'other_file_foder'].includes(element)); //remove more than one file or folder
    }
    
    items.forEach(item => {
        //store item details in an object
        let itemDetails = {};
        
        //name
        itemDetails.name = item;
        
        //link
        const link = path.join(pathname, item);
        
        const itemFullStaticPath = path.join(fullStaticPath, item);
        try{
            itemDetails.stats = fs.statSync(itemFullStaticPath);
        }catch(err){
            console.log(`statSync error: ${err}`);
            return `<div class="alert alert-danger">Internal Server Error</div>`;
        }
        
        if(itemDetails.stats.isDirectory()){
            itemDetails.icon = '<ion-icon name="folder"></ion-icon>';
            
            [itemDetails.size, itemDetails.sizeBytes] = calculateSizeD(itemFullStaticPath);
            
        } else if (itemDetails.stats.isFile()){
            itemDetails.icon = '<ion-icon name="document"></ion-icon>';
            
             [itemDetails.size, itemDetails.sizeBytes] = calculateSizeF(itemDetails.stats);
        }
        
        //when was the file last change (unix timestamp)
        itemDetails.timeStamp = parseInt(itemDetails.stats.mtimeMs);
        
        //convert timestamp to a date
        itemDetails.date = new Date(itemDetails.timeStamp);
        itemDetails.date = itemDetails.date.toLocaleString();
        
        
            mainContent += `
<tr data-name="${itemDetails.name}" data-size="${itemDetails.sizeBytes}" data-time="${itemDetails.timeStamp}">
    <td>${itemDetails.icon}<a href="${link}" target='${itemDetails.stats.isFile() ? "_blank" : ""}'>${item}</a></td>
    <td>${itemDetails.size}</td>
    <td>${itemDetails.date}</td>
</tr>`;
    });
    

    return mainContent;
};

module.exports = buildMainContent;