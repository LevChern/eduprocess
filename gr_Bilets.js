// раздать вариат
// В первой строке - ссылки на задания (таблицы или документы)
// Во второй - указание на распределение T или D, выбор 1-й не пустой
// после распределения указывается +T или +D
// Если вариантов (kV) меньше, чем студентов (kS), то студенты kV+1,kV+1... получают варианты 1,2... 
function _getRandomInt(min, max){ // случайное число в диапазоне [min,max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function _mix(m){ // перемешать m
	var k = m.length
	var m1 = m.slice(0)  // копиЯ
	for (var i=0;i<100;i++){
		var j1 = _getRandomInt(0, k-1)
		var j2 = _getRandomInt(0, k-1)
		if (j1!=j2){
			var x = m1[j1]; m1[j1] = m1[j2]; m1[j2] = x
		}
	}
	return m1
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

function distribVar() { // распределить варианты по студентам
  var alfa = "CDEF" // GHIJKLMNOPR"
  var ss = SpreadsheetApp.getActiveSpreadsheet(); // текущая таблица - студент
  var nst = ss.getLastRow()                  // число строк
  res = ""; href = ""; nLab = ""; iv0 = 0; 
  cLab=''  // колонка
  for (var i=0; i<alfa.length; i++){
     cLab = alfa.substr(i,1)
     var href = ss.getRange(cLab+'1').getFormula() // ссылка
     nLab = ss.getRange(cLab+'1').getValue() // ссылка
     var br = ss.getRange(cLab+'2').getValue()   // указание
//     Browser.msgBox('br='+br);
     if (br=='T' || br=='D'|| br=='B') {res = br; iv0 = i; break} 
  }   
  //Browser.msgBox('res='+res); return
  var mvar = []; iv = 0  // массив вариатов
  var cond = ""
  if (res=='T'){                                  // Таблица с вариантами 
      var idss = _ss_href(href)
      var svar =  SpreadsheetApp.openById(idss)
      var ns = svar.getLastRow()                  // число строк
      var bcond = true;
      var num=""; var str="" 
      for (var j=1; j<=ns; j++){
         num = ""+svar.getRange('A'+j).getValue() // номер варианта
         str = svar.getRange('B'+j).getValue()    // текст
         if (bcond){
            if (num.length==0) cond += ("|"+str)
            else {
                bcond = false
                mvar[iv] = str
             }  
         }else{
            if (num.length>0){
                iv++; //mvar.length=iv+1
                mvar[iv] = str  
            }else{
                mvar[iv] += ("|"+str)
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
      var iddoc = _id_doc(href)
      var doc = DocumentApp.openById(iddoc)
      var body1 = doc.getBody()
      var pars = body1.getParagraphs()
      var k = pars.length            // число абзацев
      //Browser.msgBox(k+'='+k); return
      var k0 = 2                    // число абзацев общей части
      var ms0 = []
      cond = pars[0].getText()      // общая часть - формулировка задания
      for (var i=1; i<k0; i++){
        cond += ("|" + pars[i].getText())
      }  
      for (var i=k0; i<k; i++){    // варианты. Каждый - один абзац 
        var sa = pars[i].getText()
        if (sa.length>0) mvar[iv] = sa   // пустые не в счет
        iv++
      }  
  }else if (res=='B'){ // Билеты раздать по номерам в колонке
     var idB = _id_href(href)  // 
     var folder = DriveApp.getFolderById(idB)  // Папка Билеты: Билет 1, Билет 2 ...
     var files = folder.getFiles()
     mb = []
     while (files.hasNext()) {
        var file = files.next()
        var  nf = file.getName()    // Билет n
        if (nf.substr(0,5)=='Билет'){
           var nb = 1*nf.substr(6) 
           //Browser.msgBox('nb='+nb)
           mb[nb] = file.getId()
        }
     }
    //for (var i=1; i<mb.length; i++){
    //   var ff = DriveApp.getFileById(mb[i])
    //   Browser.msgBox('i='+i+" ff="+ff.getName())
    //}  
    // return
     
     for (n = 3; n<=nst; n++){ // по студентам
        var hst = ss.getRange('B'+n).getFormula() // ссылка на папку студента
        var name = ss.getRange('A'+n).getValue()   // фио студента
        var nv = 1*("0"+ss.getRange(cLab + n).getValue())  // номер билета
        //Browser.msgBox(cLab+n+' '+nv)
        if (nv>0){ // номер задан - скопировать билет в папку студента
            //Browser.msgBox('nv='+nv+" mb="+mb[nv]+' '+name)
            var fb = DriveApp.getFileById(mb[nv])  // файл-билет
            var idSt = _id_href(hst)                  // ID папки студента
            var folSt = DriveApp.getFolderById(idSt)   // папка студента 
            //Browser.msgBox('nv='+nv+" ff="+folSt.getName())
            fb.makeCopy(folSt)
        } 
     }   
     return   
  }else{
      Browser.msgBox("Нет указаний")
      return
  }
  ss.getRange(cLab+'2').setValue(res+"+") // отметка, что варианты розданы
  nn = mvar.length
  //Browser.msgBox("nn="+nn); return
  var mv0 = []; for (var i=0;i<nn;i++)mv0[i] = i
  var mv1 = _mix(mv0) // перемешанные номера (0 ... nV-1)
  //for (var i=0;i<nn;i++) Browser.msgBox(i+')'+mvar[i])   // ;  return
  //раздать студентам  1) можно по папку Работа студентов
  //var whref = ss.getRange('A1').getFormula() // ссылка Работа студентов
  //var wid = _id_href(whref)
  //var foldw = DriveApp.getFolderById(wid)
  //var folders = foldw.getFolders() // папки студентов
  //while (folders.hasNext()) { // по папкам
  //  var fold = folders.next();
  //  Logger.log(fold.getName());
  //  Browser.msgBox(iv+')'+fold.getName())
  // 2) по ссылкам из текущей таблицы:  
  var ns = ss.getLastRow()
  //Browser.msgBox(' ns='+ns)
  
  i0 = 0;  
  for (n = 3; n<=ns; n++){ // по студентам
    iv = mv1[i0]           // номер варианта
    //Browser.msgBox(i0+' iv='+iv+' n='+n)
    var hst = ss.getRange('B'+n).getFormula() // ссылка на папку студента
    var nst = ss.getRange('A'+n).getValue()   // фио студента
    ss.getRange(cLab + n).setValue(iv+1)      // номер розданного вариата 
    var wid = _id_href(hst)
    var fold = DriveApp.getFolderById(wid)    // папка студента
    var mstr = mvar[iv].split('|')
    var doc = DocumentApp.create(nLab+" "+ nst);  // создание документа с вариантом
    var body = doc.getBody();
    var mconv = cond.split('|')
    body.appendParagraph('Задание')
    for (var k=0; k<mconv.length; k++)            // формулировка
      body.appendParagraph(mconv[k])
    var mv = mvar[iv].split('|')                  // вариант   
    for (var k=0; k<mv.length; k++)
      body.appendParagraph(mv[k])
    
    var file = DriveApp.getFileById(doc.getId());
    var parents = file.getParents();  // корневая папка
    parents.next().removeFile(file);  // удалить из корневой
    fold.addFile(file);               // добавить в папку студента
    i0++ // 1 2 
    if (i0>mv1.length-1) i0 = 0
  }
  
  
}
