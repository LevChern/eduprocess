//------------------------------------- получить списки файлов в папках студентов
function getMAI(){ 
  getLR(bivMAILab) 
}
function getLR(gr){ // файлы в папках Работы студентов
   var foldGR = DriveApp.getFolderById(gr)
   mp = foldGR.getFolders()
   var ss = SpreadsheetApp.getActiveSpreadsheet();
   var ii=1
   while (mp.hasNext()){
     var fold = mp.next();
     var nfold = fold.getName()
     Logger.log(nfold)
     var foldSt = DriveApp.getFolderById(fold.getId())
     var mf = foldSt.getFiles()  
     ss.getRange('A'+ii).setValue(nfold)
     i = 1
     while (mf.hasNext()){
       var file = mf.next();
       var cell = 'ABCDEFGHIJKLMNOPQRST'.charAt(i+1)
       ss.getRange(cell+ii).setValue(file.getName())
       i++
     }  
     ii++
   }
}
