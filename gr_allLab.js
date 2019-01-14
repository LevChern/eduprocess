//--------------------------------------- Добавить файлы ЛР1-v Фамилия в папку "Все лабы"
function AddLabMAI(idL) {
  AddLab(MAILab)
}
function AddLab(idL) {
   var foldA = DriveApp.getFolderById(ALR)
   Logger.log(foldA.getName())
   var fold1 = DriveApp.getFolderById(idL)
   var mf = fold1.getFolders() // папки Работа студентов MAI
   while (mf.hasNext()){ // по студентам
     var fold = mf.next();
     Logger.log(fold.getName())
     var ms = fold.getFiles()
     while (ms.hasNext()){ //
         var fs = ms.next()
         var fn = fs.getName()
         if (fn.substr(0,3)=="ЛР1"){
           Logger.log(fold.getName()+" "+fn)
           foldA.addFile(fs)
           break
         }
     } 
   }
}
