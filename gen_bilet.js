fso = WScript.CreateObject("Scripting.FileSystemObject")
// ...
ft = 'bilets_temp.txt' // шаблон
fout = 'bilets-Wpr.txt'     
f1 = fso.GetFile(ft)   //  входной файл
/*
1.  ’естирование по теме web-программирование. (30 баллов)
2.  Ќапишите код HTML-страницы с функциЯми на JavaScript. Ќа экранной форме располагаютсЯ 
	%k% элемента выбора (%pos%), поле ввода и поле-флажок (%pos%) и кнопка (%pos%). 
	‚ первом элементе выбираетсЯ %typ1%, во втором Р %typ2%. 
	Њассивы значений задаютсЯ в программе. „лЯ %typ3% %typ4%. 
	‚ поле ввода задаетсЯ %typ5% и по кнопке вычислЯетсЯ %typ6%. 
	‡начение флажка определЯет %out%. 
	€спользовать CSS и атрибут style.  (20 баллов)
3.  Ќапишите программу на PHP, котораЯ возвращает такую же HTML-страницу, как в п.2. 
	€сходные данные %data%. 
	‚ форму добавить кнопку, по которой результат сохранЯетсЯ на сервере %res%. (10 баллов) 

*/
mpos = ["в правом верхнем углу","в правом нижнем углу", "в левом нижнем углу","в левом верхнем углу"]
//        1           2                        3        4      5                   6   
mtyp = [
["тип товара","товары заданного типа","каждого товара","задана цена","количество товара","стоимость"],
["город","отели в городе","каждого отелЯ","задана сумма в день","число дней","общаЯ сумма"],
["страна","курорты в стране","каждого корорта","задана стоимость билета","число человек","общаЯ сумма"],
["банк","суммы вкладов","каждого вклада","задан годовой процент","число лет","общаЯ сумма процентов"],
["банк","суммы кредитов","каждого кредита","задан годовой процент","число лет","общаЯ сумма за кредит"],
["тип детали","детали заданного типа","каждой детали","задан вес","количество деталей","общий вес"]

]
//	["страна","город в этой стране","города", "число жителей","самый населенный город"],
//minp = ["в программе","непосредственно в элементе выбора"]
mout = ["способ вывода: в окне alert или вставка в документ","вывод в alert и сохранение в LocalStorage"]
mdata = ["задаютсЯ в виде массивов на PHP","загружаютсЯ из json-файла","загружаютсЯ из xml-файла"]
mres = ["в текстовом файле", "в json-файле","в xml-файле"]

function getRandomInt(min, max){ // случайное число в диапазоне [min,max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function get(m){ // случайное значение из m
	var k = m.length
	var i = getRandomInt(0, k-1)
	return m[i]
}
function mix(m){ // перемешать m
	var k = m.length
	var m1 = m.slice(0)  // копиЯ
	for (var i=0;i<100;i++){
		var j1 = getRandomInt(0, k-1)
		var j2 = getRandomInt(0, k-1)
		if (j1!=j2){
			var x = m1[j1]; m1[j1] = m1[j2]; m1[j2] = x
		}
	}
	return m1
}
//mm = ['1','2','3','4'];
//mm1 = mix(mpos)
//for (i=0; i<mm1.length; i++) WScript.Echo(mm1[i]);WScript.Quit()
WScript.Echo(fout)
f2 = fso.CreateTextFile(fout) // создать выхожной файл

for (j=0; j<10; j++){

	ts1 = f1.OpenAsTextStream(1)
	while (!ts1.AtEndOfStream) {
		s  = ts1.ReadLine()  // 1 
		ms = s.split("%") // текст % kod %  текст % kod %  текст
	//						 0       1      2       3      4         5    											
		k = ms.length
		if (k>1){ // есть %kod%
			WScript.Echo('k='+k)
			i0 = 0
			for (var i=1; i<k; i+=2){ // по кодам в строке
				if (ms[i]=='k')	ms[i]='2'
				else if	(ms[i]=='pos'){
					if (i0==0) m1 = mix(mpos)
					ms[i]= m1[i0];  //WScript.Echo('i='+i+" "+ms[i])
					i0++
				}else if (ms[i]=='typ1'){
					k1 = mtyp.length
					k2 = getRandomInt(0, k1-1)
					WScript.Echo('k2='+k2)
					ms[i] = mtyp[k2][0]
					ms[i+2] = mtyp[k2][1]
					ms[i+4] = mtyp[k2][2]
					ms[i+6] = mtyp[k2][3]
					ms[i+8] = mtyp[k2][4]
					ms[i+10] = mtyp[k2][5]
					
				}else if	(ms[i]=='out'){
					ms[i] = get(mout)
				}else if	(ms[i]=='data'){
					ms[i] = get(mdata)
				}else if	(ms[i]=='res'){
					ms[i] = get(mres)
				}	
			}
			ss = ""; for(i=0;i<k;i++) ss+=ms[i]
		}else ss =s
		f2.WriteLine(ss)
	}
	ts1.Close()
	f2.WriteLine("")
	f2.WriteLine("")
	f2.WriteLine("")
}
