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
function distribVar() { // распределить варианты по студентам
  // В первой строке - ссылки на задания (таблицы или документы)
  // Во второй - указание на распределение T или D, выбор 1-й не пустой
  // после распределения указывается +T или +D
  var alfa = "CDTFGHIJKLMNOPR"
  var ss = SpreadsheetApp.getActiveSpreadsheet(); // текущая таблица
  res = ""; href = ""; nLab = ""
  for (var i=0; i<alfa.length; i++){
     var href = ss.getRange(alfa.substr(i,1)+'1').getFormula() // ссылка
     nLab = ss.getRange(alfa.substr(i,1)+'1').getValue() // ссылка
     var br = ss.getRange(alfa.substr(i,1)+'2').getValue()   // указание
     if (br=='T' || br=='D') {res = br; break} 
  }   
  var mvar = []; iv = 0  // массив вариатов
  if (res=='T'){ // Таблица с вариантами 
      var idss = _ss_href(href)
      //Browser.msgBox(href)
      
      var svar =  SpreadsheetApp.openById(idss)
      var ns = svar.getLastRow()     // число строк
      var cond = "" // условие
      var bcond = true;
      var num=""; var str="" 
      for (var j=1; j<=ns; j++){
         num = ""+svar.getRange('A'+j).getValue() // номер варианта
         str = svar.getRange('B'+j).getValue() // текст
         if (bcond){
            if (num.length==0) cond += ("|"+str)
            else {
                bcond = false
                //iv++; mvar.length=iv+1
                mvar[iv] = str
             }  
         }else{
            //Browser.msgBox(j+'|'+iv+'|'+num+'---'+str+'|'+num.length) 
            if (num.length>0){
                iv++; //mvar.length=iv+1
                //Browser.msgBox(j+'|'+iv+'|'+num+'---'+str) 
                mvar[iv] = str  
            }else{
                mvar[iv] += ("|"+str)
                //Browser.msgBox(iv+'|'+mvar[iv])
            }
         }
      }
      //Browser.msgBox(cond)
      //for (var i=0; i<mvar.length; i++) Browser.msgBox(i+')'+mvar[i])
//   |
// ...
// 1 |
// ... 
// 2 |
      
      
      
  }else if (res=='D'){ // Документ
  
  
  }else{
    Browser.msgBox("Нет указаний")
  }
  
  nn = mvar.length
  // перемешать массив mvar
  
  //раздать студентам
  //var whref = ss.getRange('A1').getFormula() // ссылка Работа студентов
  //var wid = _id_href(whref)
  //var foldw = DriveApp.getFolderById(wid)
  //var folders = foldw.getFolders() // папки студентов
  iv = 1
  //while (folders.hasNext()) { // по папкам
  //  var fold = folders.next();
  //  Logger.log(fold.getName());
  //  Browser.msgBox(iv+')'+fold.getName())
    
  var ns = ss.getLastRow()
  for (n = 3; n<=ns; n++){
    var hst = ss.getRange('B'+n).getFormula() // ссылка на папку студента
    var nst = ss.getRange('A'+n).getValue() // фио студента
    var wid = _id_href(hst)
    var fold = DriveApp.getFolderById(wid) // папка студента
    var mstr = mvar[iv].split('|')
    var doc = DocumentApp.create(nLab+" "+ nst);  
    var body = doc.getBody();
    var mconv = cond.split('|')
    body.appendParagraph('Задание')
    for (var k=0; k<mconv.length; k++)
      body.appendParagraph(mconv[k])
    var mv = mvar[iv].split('|') 
    for (var k=0; k<mv.length; k++)
      body.appendParagraph(mv[k])
    
    var file = DriveApp.getFileById(doc.getId());
    var parents = file.getParents();  // корневая папка
    parents.next().removeFile(file);  // удалить из корневой
    fold.addFile(file);               // добавить в папку студентов
    iv++
    if (iv>mvar.length-1) iv=0
  }
  
  
}
