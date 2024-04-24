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
