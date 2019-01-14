fso = WScript.CreateObject("Scripting.FileSystemObject")
// ...
ft = 'bilets_temp.txt' // ������
fout = 'bilets-Wpr.txt'     
f1 = fso.GetFile(ft)   //  ������� ����
/*
1.  ������������ �� ���� web-����������������. (30 ������)
2.  �������� ��� HTML-�������� � ��������� �� JavaScript. �� �������� ����� ������������� 
	%k% �������� ������ (%pos%), ���� ����� � ����-������ (%pos%) � ������ (%pos%). 
	� ������ �������� ���������� %typ1%, �� ������ � %typ2%. 
	������� �������� �������� � ���������. ��� %typ3% %typ4%. 
	� ���� ����� �������� %typ5% � �� ������ ����������� %typ6%. 
	�������� ������ ���������� %out%. 
	������������ CSS � ������� style.  (20 ������)
3.  �������� ��������� �� PHP, ������� ���������� ����� �� HTML-��������, ��� � �.2. 
	�������� ������ %data%. 
	� ����� �������� ������, �� ������� ��������� ����������� �� ������� %res%. (10 ������) 

*/
mpos = ["� ������ ������� ����","� ������ ������ ����", "� ����� ������ ����","� ����� ������� ����"]
//        1           2                        3        4      5                   6   
mtyp = [
["��� ������","������ ��������� ����","������� ������","������ ����","���������� ������","���������"],
["�����","����� � ������","������� �����","������ ����� � ����","����� ����","����� �����"],
["������","������� � ������","������� �������","������ ��������� ������","����� �������","����� �����"],
["����","����� �������","������� ������","����� ������� �������","����� ���","����� ����� ���������"],
["����","����� ��������","������� �������","����� ������� �������","����� ���","����� ����� �� ������"],
["��� ������","������ ��������� ����","������ ������","����� ���","���������� �������","����� ���"]

]
//	["������","����� � ���� ������","������", "����� �������","����� ���������� �����"],
//minp = ["� ���������","��������������� � �������� ������"]
mout = ["������ ������: � ���� alert ��� ������� � ��������","����� � alert � ���������� � LocalStorage"]
mdata = ["�������� � ���� �������� �� PHP","����������� �� json-�����","����������� �� xml-�����"]
mres = ["� ��������� �����", "� json-�����","� xml-�����"]

function getRandomInt(min, max){ // ��������� ����� � ��������� [min,max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function get(m){ // ��������� �������� �� m
	var k = m.length
	var i = getRandomInt(0, k-1)
	return m[i]
}
function mix(m){ // ���������� m
	var k = m.length
	var m1 = m.slice(0)  // �����
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
f2 = fso.CreateTextFile(fout) // ������� �������� ����

for (j=0; j<10; j++){

	ts1 = f1.OpenAsTextStream(1)
	while (!ts1.AtEndOfStream) {
		s  = ts1.ReadLine()  // 1 
		ms = s.split("%") // ����� % kod %  ����� % kod %  �����
	//						 0       1      2       3      4         5    											
		k = ms.length
		if (k>1){ // ���� %kod%
			WScript.Echo('k='+k)
			i0 = 0
			for (var i=1; i<k; i+=2){ // �� ����� � ������
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
