function delViewer(){                             // Удалить читателей из папок Работы студентов
  var folder = DriveApp.getFolderById(id_disc)    // папка дисциплины
  var ss = SpreadsheetApp.getActiveSpreadsheet(); // текущая таблица - Список групп
  for (var i=2; i<7; i++){                        // начиная со второй строки - название группы
     var sgr = ss.getRange('C'+i).getFormula()    // ссылка на Работы студентов  или пусто
     if (sgr.length==0) break
     var id = _id_href(sgr)

      var foldLab = DriveApp.getFolderById(id) // папка 
      Logger.log(foldLab.getName())
      var folders =  foldLab.getFolders()  // все подпапки
      while (folders.hasNext()) { 
         var folder = folders.next();
         var users = folder.getViewers()
         var sv = ""
         for (var i=0; i<users.length; i++){
            var u1 =  users[i].getEmail()
            sv += (" "+u1)
            folder.removeViewer(u1)
        }
        Logger.log(folder.getName()+" "+sv);
      }
  }    
}