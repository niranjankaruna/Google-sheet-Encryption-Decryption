function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [ {name: "Encrypt", functionName: "Encrypt"},
                      {name: "Decrypt", functionName: "Decrypt"} ];
  ss.addMenu("Reveal", menuEntries);
}

function Encrypt(){
  var ALGOS = ['AES','DES','Rabbit','TripleDES'];
  var ui = SpreadsheetApp.getUi();  
  var html = HtmlService.createHtmlOutput(getHtmlForDialogforEncryption()).setWidth(380).setHeight(150);
  ui.showModalDialog(html, "Encrypt with key");  
  return;
}

function Decrypt(){
  var ui = SpreadsheetApp.getUi();  
  var html = HtmlService.createHtmlOutput(getHtmlForDialogforDecryption()).setWidth(380).setHeight(150);
  ui.showModalDialog(html, "Decrypt with key");  
  return;
}


function doEncryption(theKey){
  
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var sheet=SpreadsheetApp.getActiveSheet();
  if(SpreadsheetApp.getActiveSheet().getName() =="Encrypted"){
    return;
  }
  var encSheet = ss.getSheetByName("Encrypted");
  if (encSheet != null){ss.deleteSheet(encSheet);}
  encSheet = ss.insertSheet();
  encSheet.setName("Encrypted");
    
 var cipher = new cCryptoGS.Cipher(theKey, 'Rabbit');

  var selection=sheet.getDataRange();
  var columns=selection.getNumColumns();
  var rows=selection.getNumRows();
  var newRange= encSheet.getRange(1,1,rows, columns);
  for (var column=1; column < columns+1; column++) {
    for (var row=1; row < rows+1; row++) { 
      var cell=selection.getCell(row,column);
      var newcell=newRange.getCell(row,column);
      newcell.setNumberFormat('@STRING@');
      cell.setNumberFormat('@STRING@');
        newcell.setValue(cipher.encrypt(cell.getValue()));   
    }
  }
  ss.deleteSheet(sheet);
}


function doDecryption(theKey) { 
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var sheet=SpreadsheetApp.getActiveSheet();
  if(SpreadsheetApp.getActiveSheet().getName() =="Decrypted"){
    return;
  }
  var encSheet = ss.getSheetByName("Decrypted");
  if (encSheet != null) {ss.deleteSheet(encSheet);}
  encSheet = ss.insertSheet();
  encSheet.setName("Decrypted");
  
    
 var cipher = new cCryptoGS.Cipher(theKey, 'Rabbit');

  var selection=sheet.getDataRange();
  var columns=selection.getNumColumns();
  var rows=selection.getNumRows();
  var newRange= encSheet.getRange(1,1,rows, columns);
  for (var column=1; column < columns+1; column++) {
    for (var row=1; row < rows+1; row++) { 
      var cell=selection.getCell(row,column);
      var newcell=newRange.getCell(row,column);
      newcell.setNumberFormat('@STRING@');
      cell.setNumberFormat('@STRING@');
        newcell.setValue(cipher.decrypt(cell.getValue()));   
    }
    
  }
  ss.deleteSheet(sheet);     
}


function getHtmlForDialogforEncryption(){
  return "<html><style>.column{float:left;width:50%}</style><div style='background-color:#4285F4 ;font-family:verdana;padding:10px;overflow:auto'> " +
	"<span class=column>Enter key:</span><input type=text id='txtKey' style='float:right'><br/><br/>" +
    "<div style='float:right'>" +
    "<input type=button id='cancelBtn' value='Cancel' onclick='google.script.host.close();'>&nbsp;<input type=button id='okBtn' value='OK' onclick='OKClicked();'>" +
    "</div></div><script>" +
	"function OKClicked(){" +
      "var keyTextbox = document.getElementById('txtKey');" +
        "var cancelBtn = document.getElementById('cancelBtn');" +
          "var okBtn = document.getElementById('okBtn');" +
		"var theKey = keyTextbox.value;" +
        "if(theKey.length == 0){alert('You must enter a key'); return;}" +
          "cancelBtn.disabled = true;"+
          "keyTextbox.disabled = true;"+
          "okBtn.disabled = true;"+
		"google.script.run.withSuccessHandler(onSuccess).doEncryption(theKey);" +
    "}" +
    "function onSuccess(){" +
		"google.script.host.close();" +
    "}" +
    "window.onload = function(){" +
		"document.getElementById('txtKey').focus();" +
         "document.getElementById('txtKey').addEventListener('keyup',function(event){"+
           "event.preventDefault();"+
             "if (event.keyCode === 13) {"+
        "document.getElementById('okBtn').click();"+
    "}"+
"});"+
    "}" +
	"</script>" +
    "</html>";    
}

function getHtmlForDialogforDecryption(){
  return "<html><style>.column{float:left;width:50%}</style><div style='background-color:#4285F4;font-family:verdana;padding:10px;overflow:auto'> " +
	"<span class=column>Enter key:</span><input type=text id='txtKey' style='float:right'><br/><br/>" +
    "<div style='float:right'>" +
    "<input type=button id='cancelBtn' value='Cancel' onclick='google.script.host.close();'>&nbsp;<input type=button id='okBtn' value='OK' onclick=OKClicked()>" +
    "</div></div><script>" +
	"function OKClicked(){" +
      "var keyTextbox = document.getElementById('txtKey');" +
        "var cancelBtn = document.getElementById('cancelBtn');" +
          "var okBtn = document.getElementById('okBtn');" +
		"var theKey = keyTextbox.value;" +
        "if(theKey.length == 0){alert('You must enter a key'); return;}" +
          "cancelBtn.disabled = true;"+
          "keyTextbox.disabled = true;"+
          "okBtn.disabled = true;"+
		"google.script.run.withSuccessHandler(onSuccess).doDecryption(theKey);" +
    "}" +
    "function onSuccess(){" +
		 "google.script.host.close();" +
    "}" +
    "window.onload = function(){" +
		"document.getElementById('txtKey').focus();" +
         "document.getElementById('txtKey').addEventListener('keyup',function(event){"+
           "event.preventDefault();"+
             "if (event.keyCode === 13) {"+
        "document.getElementById('okBtn').click();"+
    "}"+
"});"+
    "}" +
	"</script>" +
    "</html>";    
}


