function myFunction() {
  // получить список имеющих доступ к папке
  // var file = DriveApp.getFileById('1234567890abcdefghijklmnopqrstuvwxyz');
  var disc="__МАИ_маг1"
  var ifold = DriveApp.getFoldersByName(disc)  // дисциплина в корне
  if (!ifold.hasNext()) {Browser.msgBox(' 1.Нет папки '+ disc); return; }
  else var pd = ifold.next()    // папка в корне
  //Browser.msgBox(pd.getName()) окно с сообщением
  users = pd.getViewers()
  k = users.length
  var ss = SpreadsheetApp.getActiveSheet()
  for(var i=0; i<k; i++){
      var em = users[i].getEmail()
      var name = users[i].getName()
      //Logger.log(name + ' ' + em);  // просмотр Ctrl+Ввод или Вид-Журналы
      var i1 = i+2
      ss.getRange("A"+i1).setValue(i+1)
      ss.getRange("B"+i1).setValue(name)
      ss.getRange("C"+i1).setValue(name)
      ss.getRange("D"+i1).setValue(em)
  }
}