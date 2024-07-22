var displayInputAreaBtn = document.querySelector('displayInputAreaBtn');
var doSekigaeBtn = document.getElementById('doSekigaeBtn');

//最大要素数は6*6
var MAX_DIMENSION = 6;

function hideInputArea() {
	if (document.getElementById("inputArea").classList.contains("nodisplay")) {
		document.getElementById("inputArea").classList.remove("nodisplay");
		document.getElementById("displayArea").classList.add("nodisplay");
		document.getElementById("displayInputAreaBtn").classList.add("nodisplay");
	} else {
		document.getElementById("inputArea").classList.add("nodisplay");
		document.getElementById("displayArea").classList.remove("nodisplay");
		document.getElementById("displayInputAreaBtn").classList.remove("nodisplay");
	}
}

function doSekigae() {
	//2人組用、3人組用、4人組用の固定値リストを宣言する。36要素。AABBCC・・・
	var LIST_2PAIR = new Array("A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H", "I", "I", "J", "J", "K", "K", "L", "L", "M", "M", "N", "N", "O", "O", "P", "P", "Q", "Q", "R", "R");
	var LIST_3PAIR = new Array("A", "A", "A", "B", "B", "B", "C", "C", "C", "D", "D", "D", "E", "E", "E", "F", "F", "F", "G", "G", "G", "H", "H", "H", "I", "I", "I", "J", "J", "J", "K", "K", "K", "L", "L", "L");
	var LIST_4PAIR = new Array("A", "A", "A", "A", "B", "B", "B", "B", "C", "C", "C", "C", "D", "D", "D", "D", "E", "E", "E", "E", "F", "F", "F", "F", "G", "G", "G", "G", "H", "H", "H", "H", "I", "I", "I", "I");

    // 不要なセルは非表示にする
    hideUnnecessaryCells();

    // 2次元配列の要素数取得・設定
    const { firstValue: rowCount, secondValue: columnCount } = splitValues(document.getElementById('dimension').value);

	// 6*6の人数分に足りない分は欠席者として扱う(例：3次元の場合は36 - 3 * 3 = 27人は欠席扱い)
    var intAbsenteeNum = 36 - (rowCount * columnCount);

    var arrayStudent = new Array(rowCount)
    for(let y = 0; y < rowCount; y++) {
    	arrayStudent[y] = new Array(rowCount).fill(y);
    }

    // 出欠のリストを読み込みつつ設定
    for (var i = 0; i < rowCount; i++) {
    	for (var j = 0; j < columnCount; j++) {
			var id = "s" + String(i) + String(j);
			var selectedIndex = document.getElementById(id).selectedIndex;
    		if (selectedIndex == 1) {
    			arrayStudent[i][j] = "欠";
    			intAbsenteeNum++;
    		}
    	}
    }

    var targetArray;
	var pair = Number(document.getElementById('pair').value);
    if (pair == 2) {
    	targetArray = LIST_2PAIR;
    } else if (pair == 3) {
    	targetArray = LIST_3PAIR;
    } else {
    	targetArray = LIST_4PAIR;
    }

    // 欠席の人数分配列の末尾を削除
    for (var i = 0; i < intAbsenteeNum; i++) {
    	targetArray.pop();
    }

	// シャッフル
	targetArray = Shuffle(targetArray);
	targetIndex = 0;

    for (var i = 0; i < rowCount; i++) {
    	for (var j = 0; j < columnCount; j++) {
			var id = String(i) + String(j);
			var studentValue = arrayStudent[i][j];
    		if (studentValue != "欠") {
    			arrayStudent[i][j] = targetArray[targetIndex];
    			targetIndex++;
    		}
    		document.getElementById(id).innerHTML = arrayStudent[i][j];
    		document.getElementById(id).className = arrayStudent[i][j];
    		document.getElementById(id).classList.add("student");
    	}
    }

    // 入力欄は非表示にする
    hideInputArea();
}

// シャッフル処理
var Shuffle = function (arr) {
	  var i, j, temp;
	  arr = arr.slice();
	  i = arr.length;
	  if (i === 0) {
	    return arr;
	  }
	  while (--i) {
	    j = Math.floor(Math.random() * (i + 1));
	    temp = arr[i];
	    arr[i] = arr[j];
	    arr[j] = temp;
	  }
	  return arr;
	};

function hideUnnecessaryCells() {
	// 座席表をクリア
    for (var i = 0; i < 6; i++) {
    	for (var j = 0; j < 6; j++) {
			var id = String(i) + String(j);
    		document.getElementById(id).innerHTML = "";
    		document.getElementById(id).className = "";
    	}
    }

    // 2次元配列の要素数取得・設定
    const { firstValue: rowCount, secondValue: columnCount } = splitValues(document.getElementById('dimension').value);

    // 不要なセルは非表示にする
    for (var i = 0; i < MAX_DIMENSION; i++) {
    	for (var j = 0; j < MAX_DIMENSION; j++) {
			var id = String(i) + String(j);
			var tid = "t" + String(i) + String(j);
    		if ((i < rowCount) && (j < columnCount)) {
        		if (document.getElementById(id).classList.contains("nodisplay")) {
        			document.getElementById(id).classList.remove("nodisplay");
        		}
        		if (document.getElementById(tid).classList.contains("nodisplay")) {
        			document.getElementById(tid).classList.remove("nodisplay");
        		}
    		} else {
    			document.getElementById(id).classList.add("nodisplay");
    			document.getElementById(tid).classList.add("nodisplay");
    		}
    	}
    }
}

function splitValues(value) {
    let firstValue, secondValue;

    if (value.includes('_')) {
        const parts = value.split('_').map(Number);
        firstValue = parts[0];
        secondValue = parts[1];
    } else {
        // _が含まれていない場合は、両方の値を同じ数としてセットする
        const singleValue = Number(value);
        firstValue = singleValue;
        secondValue = singleValue;
    }

    return { firstValue, secondValue };
}

// 欠席者の選択状態が変更されたときに背景色を変更する関数
function changeBackgroundColor(selectId, tdId) {
    const selectElement = document.getElementById(selectId);
    const tdElement = document.getElementById(tdId);

    selectElement.addEventListener('change', function() {
        if (selectElement.value === 'absence') {
            // "absence" が選択された場合は背景色をグレーにする
            tdElement.style.backgroundColor = 'lightgrey';
        } else {
            // それ以外の場合は背景色をデフォルトに戻す
            tdElement.style.backgroundColor = '';
        }
    });
}

changeBackgroundColor('s00', 't00');
changeBackgroundColor('s01', 't01');
changeBackgroundColor('s02', 't02');
changeBackgroundColor('s03', 't03');
changeBackgroundColor('s04', 't04');
changeBackgroundColor('s05', 't05');
changeBackgroundColor('s10', 't10');
changeBackgroundColor('s11', 't11');
changeBackgroundColor('s12', 't12');
changeBackgroundColor('s13', 't13');
changeBackgroundColor('s14', 't14');
changeBackgroundColor('s15', 't15');
changeBackgroundColor('s20', 't20');
changeBackgroundColor('s21', 't21');
changeBackgroundColor('s22', 't22');
changeBackgroundColor('s23', 't23');
changeBackgroundColor('s24', 't24');
changeBackgroundColor('s25', 't25');
changeBackgroundColor('s30', 't30');
changeBackgroundColor('s31', 't31');
changeBackgroundColor('s32', 't32');
changeBackgroundColor('s33', 't33');
changeBackgroundColor('s34', 't34');
changeBackgroundColor('s35', 't35');
changeBackgroundColor('s40', 't40');
changeBackgroundColor('s41', 't41');
changeBackgroundColor('s42', 't42');
changeBackgroundColor('s43', 't43');
changeBackgroundColor('s44', 't44');
changeBackgroundColor('s45', 't45');
changeBackgroundColor('s50', 't50');
changeBackgroundColor('s51', 't51');
changeBackgroundColor('s52', 't52');
changeBackgroundColor('s53', 't53');
changeBackgroundColor('s54', 't54');
changeBackgroundColor('s55', 't55');



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

