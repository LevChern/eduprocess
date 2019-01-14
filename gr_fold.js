function gr_fold(){  // Создать папки и файлы в группах
  var ss = SpreadsheetApp.getActiveSpreadsheet(); // текущая таблица
  for (var i=2; i<10; i++){ // по группам
     var ngr = ss.getRange('A'+i).getValue() // название группы
     if (ngr.length==0) break
     var hgr = ss.getRange('A'+i).getFormula()
     if (hgr.length==0) continue   // не ссылка
     var idgr = _id_href(hgr)       // id папки группы
     var hss = ss.getRange('B'+i).getFormula()
     //Browser.msgBox(hss)
     var idss = _ss_href(hss)       // id таблицы списка группы
     var sgr =  SpreadsheetApp.openById(idss)
     var ns = sgr.getLastRow()     // число строк - студентов
     if (ns==0) continue           // пустой список
          
     var fold1 = DriveApp.getFolderById(idgr)  // папка группы
     var foldLR = ""
     var hLR = ss.getRange('C'+i).getValue()
     if (hLR.length==0){                     // Нет папки Работы студентов - создать
       var fLR = "Работы студентов"
       foldLR = fold1.createFolder(fLR)      // папка Работы студентов
       var fref = '=HYPERLINK("https://drive.google.com/drive/folders/'+foldLR.getId()+'";"'+fLR+'")'
       ss.getRange('C'+i).setValue(fref)     // ссылка на папку Работы студентов
     }else{
       var fLR = ss.getRange('C'+i).getFormula()
       var id_disc = _id_href(fLR)
       foldLR = DriveApp.getFolderById(id_disc) 
     }
     mst = []
     for (var j=1; j<=ns; j++){ // по списку студентов
          var st = sgr.getRange('A'+j).getValue()  // фамилия
          mst.push(st)
          var em = sgr.getRange('B'+j).getValue()  // email
          var work = sgr.getRange('C'+j).getValue()  // Работа
          if (work.length==0){ // Нет папки в работах - создать
              //Browser.msgBox(j+' '+st+' '+em)
              fold1.addViewer(em)  // дать доступ к папке группы
              foldS = foldLR.createFolder(st)  // папка студента
              foldS.addEditor(em)  // дать доступ к папке студента
              var fs = "Работа"
              var fst = '=HYPERLINK("https://drive.google.com/drive/folders/'+foldS.getId()+'";"'+fs+'")'
              sgr.getRange('C'+j).setValue(fst)  // ссылка на папку студенты в Работы студентов
           }   
      }
      var sd = ss.getRange('D'+i).getValue()
      if (sd.length==0){
         var sd1 = _gr_ss(ngr,'посещение', mst,fold1)
        //Browser.msgBox('sd1= '+sd1)
         ss.getRange('D'+i).setValue(sd1)  // ссылка на таблицу группа-посещение
      }  
      sd = ss.getRange('E'+i).getValue()
      if (sd.length==0){
         var sd2 = _gr_ss(ngr,'оценки', mst,fold1)
         ss.getRange('E'+i).setValue(sd2)  // ссылка на таблицу группа-оценки
      }  
      sd = ss.getRange('F'+i).getValue()
      if (sd.length==0){
         var sd3 = _gr_ss(ngr,'варианты', mst,fold1)
         ss.getRange('F'+i).setValue(sd3)  // ссылка на таблицу группа-варианты
      }  
      sd = ss.getRange('G'+i).getValue()
      if (sd.length==0){
          var nf = "Вопросы и ответы"
          var d1 = DocumentApp.create(ngr+'-'+nf)
          var temp = DriveApp.getFileById(d1.getId());
          fold1.addFile(temp)
          DriveApp.getRootFolder().removeFile(temp)
          //var ss1 = '=HYPERLINK("https://docs.google.com/spreadsheets/d/'+ s1.getId() + '/edit#gid=0";"'+nf+'")'
          ss.getRange('G'+i).setValue("d1")  // ссылка на таблицу группа-варианты
      }  
  }
}