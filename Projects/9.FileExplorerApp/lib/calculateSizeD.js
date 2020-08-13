const {execSync}= require('child_process');

const calculateSizeD = itemFullStaticPath => {
    //escape spaces, tabs...
    const itemFullStaticPathCleaned = itemFullStaticPath.replace(/\s/g,'\ ');
    
    const commandOutput = execSync(`du -sh "${itemFullStaticPathCleaned}"`).toString();    
  
    //remove spaces, tabs, etc
    let filesize = commandOutput.replace(itemFullStaticPathCleaned, '');
    filesize = filesize.replace(/\s/g,'');
    
    //split filesize using the '/' separator
    filesize = filesize.split('/');
    
    //human size is the first item of the array
    filesize = filesize[0];
    
    //unit (M, K)
    const filesizeUnit = filesize.replace(/\d|\./g, '');
    
    //size number
    const filesizeNumber = parseFloat(filesize.replace(/[a-z]/i, ''));
    
    const units = "BKMGT";
    const filesizeBytes = filesizeNumber * Math.pow(1024, units.indexOf(filesizeUnit));
    
    return [filesize, filesizeBytes];
};

module.exports = calculateSizeD;