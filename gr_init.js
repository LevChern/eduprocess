function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  //..var menu = [{name: "Число файлов", functionName: "getFiles"}
  //];
  //ss.addMenu("Мои функции", menu);
  for (var i=2; i<7; i++){                        // начиная со второй строки - название группы
     var sdoc = ss.getRange('G'+i).getFormula()    // ссылка на вопросы
      // Browser.msgBox(sdoc)
     if (sdoc.length==0) continue
     var id = _id_doc(sdoc)
     var doc1 = DocumentApp.openById(id)
     var f1 =  DriveApp.getFileById(doc1.getId());
     var d1 = f1.getLastUpdated() 
     //Browser.msgBox(d1)
     ss.getRange('H'+i).setValue(d1)
  }   
}
//https://docs.google.com/document/d/1bWnWToUjK6BFp0DvXpbAmlXgb-HJxuSEJWUAoZD5FuU/edit
id_disc = "1eSkdsO7-0hpnRqgrGUiIqn9gCZKzILKW" // папка дисциплины

function _id_doc(hdoc){ // id по ссылке HYPERLINK 
//=HYPERLINK("https://docs.google.com/document/d/1bWnWToUjK6BFp0DvXpbAmlXgb-HJxuSEJWUAoZD5FuU/edit";"вопросы")
  var k = hdoc.indexOf('document/d/')
  var s1 = "";
  if (k>0){
    var s = hdoc.substr(k+11)
    var k1 = s.indexOf('/')
    s1 = s.substr(0,k1)
  }  
  return s1
}
function _id_href(href){ // id по ссылке HYPERLINK 
// =HYPERLINK("https://drive.google.com/drive/folders/1S1ZCQecEaA2mqZ2szHLh50SbTVihTzom";"ПИ4-1")
  var k = href.indexOf('folders/')
  var s1 = "";
  if (k>0){
    var s = href.substr(k+8)
    var k1 = s.indexOf('"')
    s1 = s.substr(0,k1)
  }  
  return s1
}

function _ss_href(href){ // id таблицы по ссылке HYPERLINK 
//=HYPERLINK("https://docs.google.com/spreadsheets/d/1mpMX87uEfzBYx19eNjvXL6ekFdqOkkYrTRNTqj8MW7Q/edit#gid=0";"список ПИ4-1")
  var k = href.indexOf('spreadsheets/d/')
  var s1 = "";
  if (k>0){
    var s = href.substr(k+15)
    var k1 = s.indexOf('/')
    s1 = s.substr(0,k1)
  }  
  return s1
}

function _test(){
  var folder = DriveApp.getFolderById(id_disc)
  var ss = SpreadsheetApp.create("SPREADSHEET_NAME")
  i=1
  ss.getRange('A'+i).setValue('sref')
  var temp = DriveApp.getFileById(ss.getId());
  folder.addFile(temp)
  DriveApp.getRootFolder().removeFile(temp)
  //var ss = SpreadsheetApp.getActiveSpreadsheet(); // текущая таблица
  //var s = ss.getRange('A5').getFormula() // название группы|ссылка на название
  //var s = '=HYPERLINK("https://drive.google.com/drive/folders/1S1ZCQecEaA2mqZ2szHLh50SbTVihTzom";"ПИ4-1")'
  //Browser.msgBox(s)
  //Browser.msgBox(_id_href(s))
}

function _gr_create(ngr){  // Создать пустую таблицу-список группы 
  var folder = DriveApp.getFolderById(id_disc)  // папка дисциплины
  var ssg = SpreadsheetApp.create(ngr)     // таблица с названием группы
  var temp = DriveApp.getFileById(ssg.getId());
  folder.addFile(temp)
  var id = temp.getId()
  DriveApp.getRootFolder().removeFile(temp) //
  return id
}

function gr_init(){  // Создать папки для групп 
  var folder = DriveApp.getFolderById(id_disc)  // папка дисциплины
  var ss = SpreadsheetApp.getActiveSpreadsheet(); // текущая таблица
  for (var i=2; i<7; i++){                        // начиная со второй строки - название группы
     var sgr = ss.getRange('A'+i).getFormula()    // ссылка или пусто, если только имя
     var ngr = ss.getRange('A'+i).getValue()     // название группы (ссылка или нет)   
     if (ngr.length==0) break
     if (sgr.length==0){ // не ссылка
         var ids = _gr_create(ngr)          // id пустого списка группы
//=HYPERLINK("https://docs.google.com/spreadsheets/d/1g8kIUP1OOQHm_uMPxjqTdsYOGvclfzzCFg9i3K77A3Y/edit#gid=0";"список ПИ4-2")         
         var sref = '=HYPERLINK("https://docs.google.com/spreadsheets/d/'+ ids + '/edit#gid=0";"список '+ngr+'")'       
         ss.getRange('B'+i).setValue(sref)  // ID списка группы
         fold1 = folder.createFolder(ngr)   // папка группы
         var fref = '=HYPERLINK("https://drive.google.com/drive/folders/'+fold1.getId()+'";"'+ngr+'")'
         ss.getRange('A'+i).setValue(fref)  // ссылка на папку группы 
         Logger.log(ngr)
     }
   }
}

function gr_del(){  // удалить все
  var folder = DriveApp.getFolderById(id_disc)  // папка дисциплины
  var files = folder.getFiles()
  while (files.hasNext()) {
    var file = files.next();
    Logger.log(file.getName());
    if (file.getName()!='Список групп'){
      folder.removeFile(file)
    }
  }
  var folders = folder.getFolders()
  while (folders.hasNext()) {
    var fold = folders.next();
    Logger.log(fold.getName());
    folder.removeFolder(fold)
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet(); // текущая таблица
  for (var i=2; i<30; i++){                       // начиная со второй строки - название группы
     var ngr = ss.getRange('A'+i).getValue()      // название группы (ссылка или нет)   
     if (ngr.length==0) break
     ss.getRange('A'+i).setValue(ngr)
     ss.getRange('B'+i).setValue("")
   }  
}
