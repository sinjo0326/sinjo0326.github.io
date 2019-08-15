var myImage = document.querySelector('img');

myImage.onclick = function () {
    var mySrc = myImage.getAttribute('src');
    if (mySrc === 'images/firefox-icon.png') {
        myImage.setAttribute('src', 'images/change-icon.png')
    } else {
        myImage.setAttribute('src', 'images/firefox-icon.png')
    }
}

var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');

function setUserName() {
    //2人組用、3人組用、4人組用の固定値リストを宣言する。36要素。AABBCC・・・
    const LIST_2PAIR = new Array("A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H", "I", "I", "J", "J", "K", "K", "L", "L", "M", "M", "N", "N", "O", "O", "P", "P", "Q", "Q", "R", "R");
    const LIST_3PAIR = new Array("A", "A", "A", "B", "B", "B", "C", "C", "C", "D", "D", "D", "E", "E", "E", "F", "F", "F", "G", "G", "G", "H", "H", "H", "I", "I", "I", "J", "J", "J", "K", "K", "K", "L", "L", "L");
    const LIST_4PAIR = new Array("A", "A", "A", "A", "B", "B", "B", "B", "C", "C", "C", "C", "D", "D", "D", "D", "E", "E", "E", "E", "F", "F", "F", "F", "G", "G", "G", "G", "H", "H", "H", "H", "I", "I", "I", "I");

	alert('aaa');
}

// 初期化コード
if (!localStorage.getItem('name')) {
    setUserName();
} else {
    var storedName = localStorage.getItem('name');
    myHeading.textContent = 'Mozilla はすばらしいよ、' + storedName;
}

// ボタンクリック時のイベントハンドラ
myButton.onclick = function() {
    setUserName();
}


//'*******************************
//' 座席グループ分けツール
//' ver           0.1.0
//' last update   2016/04/03
//' auther        o.shinjo
//' history       2016/04/03 新規作成
//'
//'*******************************
//Sub グループ分け(ByVal groupUnitNum As Integer)
//    '生徒用の表をクリア
//    Range(Cells(4, 2), Cells(9, 7)).ClearContents
//    
//    '2人組用、3人組用、4人組用の固定値リストを宣言する。36要素。AABBCC・・・
//    Dim LIST_2PAIR As Variant
//    Dim LIST_3PAIR As Variant
//    Dim LIST_4PAIR As Variant
//
//    LIST_2PAIR = Array("A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H", "I", "I", "J", "J", "K", "K", "L", "L", "M", "M", "N", "N", "O", "O", "P", "P", "Q", "Q", "R", "R")
//    LIST_3PAIR = Array("A", "A", "A", "B", "B", "B", "C", "C", "C", "D", "D", "D", "E", "E", "E", "F", "F", "F", "G", "G", "G", "H", "H", "H", "I", "I", "I", "J", "J", "J", "K", "K", "K", "L", "L", "L")
//    LIST_4PAIR = Array("A", "A", "A", "A", "B", "B", "B", "B", "C", "C", "C", "C", "D", "D", "D", "D", "E", "E", "E", "E", "F", "F", "F", "F", "G", "G", "G", "G", "H", "H", "H", "H", "I", "I", "I", "I")
//    
//    'シート名の先頭をとって2次元配列の要素数にするnew List(n-1,n-1)
//    Dim strSheetName As String
//    strSheetName = ActiveSheet.Name
//    Dim dimension As Integer
//    dimension = CInt(Left(strSheetName, 1))
//    
//    Dim arrayStudent() As String
//    ReDim arrayStudent(dimension - 1, dimension - 1)
//    
//    '出欠のリストを反転させつつ2次元配列化
//    '表示用の表の先頭B4列と欠席入力用の先頭B14列は固定
//    'B14列の値(Cell(14, 2))がMapの最大(dimension - 1, dimension - 1)に入る
//    Dim arrayStudentI As Integer
//    Dim arrayStudentJ As Integer
//    arrayStudentI = dimension - 1
//    arrayStudentJ = dimension - 1
//    
//    Dim intAbsenteeNum As Integer
//    intAbsenteeNum = 0
//    
//    For i = 14 To 14 + dimension
//        For j = 2 To 2 + dimension
//            If Cells(i, j).Value = "欠" Then
//                '欠席の生徒の場所に「欠」
//                '欠席の人数と位置を確認
//                arrayStudent(arrayStudentI, arrayStudentJ) = "欠"
//                intAbsenteeNum = intAbsenteeNum + 1
//            End If
//            arrayStudentJ = arrayStudentJ - 1
//        Next j
//        arrayStudentJ = dimension - 1
//        arrayStudentI = arrayStudentI - 1
//    Next i
//    
//    '列数の２乗 - 欠席者のリストを作成
//    Dim arrayInsert() As String
//    ReDim arrayInsert(dimension * dimension - intAbsenteeNum - 1)
//    
//    '2人組用、3人組用、4人組用の固定値リストから値をコピーし、できたリストの要素をシャッフル
//    Dim arrayTarget As Variant
//    Dim arrayCopy As Variant
//    ReDim arrayCopy(dimension * dimension - intAbsenteeNum - 1)
//    If groupUnitNum = 2 Then
//        arrayTarget = LIST_2PAIR
//    ElseIf groupUnitNum = 3 Then
//        arrayTarget = LIST_3PAIR
//    ElseIf groupUnitNum = 4 Then
//        arrayTarget = LIST_4PAIR
//    End If
//    
//    For i = 0 To dimension * dimension - intAbsenteeNum - 1
//        arrayCopy(i) = arrayTarget(i)
//    Next i
//    arrayCopy = Shuffle(arrayCopy)
//    
//    For i = 0 To dimension * dimension - intAbsenteeNum - 1
//        arrayInsert(i) = arrayCopy(i)
//    Next i
//    
//    '生徒目線のMapを作成new Map(n,n)
//    '生徒目線のMapに欠席者の値を入れる（反転して）。値は空文字。
//    '空いてるMapにシャッフルした値を入れる
//    'Mapの値を書き出し
//    Dim arrayInsertIndex As Integer
//    arrayInsertIndex = 0
//    arrayStudentI = 0
//    arrayStudentJ = 0
//    For i = 4 To 4 + dimension - 1
//        For j = 2 To 2 + dimension - 1
//            If arrayStudent(arrayStudentI, arrayStudentJ) = "欠" Then
//                '欠席の生徒の場所に「欠」
//                '欠席の人数と位置を確認
//                Cells(i, j).Value = ""
//            Else
//                Cells(i, j).Value = arrayInsert(arrayInsertIndex)
//                arrayInsertIndex = arrayInsertIndex + 1
//            End If
//            arrayStudentJ = arrayStudentJ + 1
//        Next j
//        arrayStudentJ = 0
//        arrayStudentI = arrayStudentI + 1
//    Next i
//End Sub
//
//' 配列をシャッフルする関数
//Private Function Shuffle(list)
//    For i = 0 To UBound(list)
//        Randomize
//        rn = Int(UBound(list) * Rnd)
//        tmp = list(i)
//        list(i) = list(rn)
//        list(rn) = tmp
//    Next
//    Shuffle = list
//End Function
//

