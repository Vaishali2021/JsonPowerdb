function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}

function getRollNoAsJsonObj() {
    var RollNo = $("#RollNo").val();
    var jsonStr = {
        id: RollNo
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $("#Name").val(data.stdname);
    $("#Class").val(data.stdclass);
    $("#Birth_Date").val(data.stddob);
    $("#Address").val(data.addr);
    $("#Enroll_Date").val(data.enroll);
}

function resetForm() {
$("#RollNo").val("");
$("#Name").val("");
$("#Class").val("");
$("#Birth_Date").val("");
$("#Address").val("");
$("#Enroll_Date").val("");
$("#RollNo").prop("disabled",false);
$("#Save").prop("disabled",true);
$("#Update").prop("disabled",true);
$("#Reset").prop("disabled",false);
$("#RollNo").focus();
}


function validateData(){
var RollNo,Name,Class,Birth_Date,Address,Enroll_Date;
RollNo = $("#RollNo").val();
Name = $("#Name").val();
Class = $("#Class").val();
Birth_Date = $("#Birth_Date").val();
Address = $("#Address").val();
Enroll_Date = $("#Enroll_Date").val();


if (RollNo === ""){
    alert("Student roll number is missing");
    $("#RollNo").focus();
    return "";
}
if (Name === ""){
    alert("Student name is missing");
    $("#Name").focus();
    return "";
}
if (Class === ""){
    alert("Student class is missing");
    $("#Class").focus();
    return "";
}
if (Birth_Date=== ""){
    alert("Student birth date is missing");
    $("#Birth_Date").focus();
    return "";
}
if (Address  === ""){
    alert("Student address is missing");
    $("#Address ").focus();
    return "";
}
if (Enroll_Date === ""){
    alert("Student enroll date is missing");
    $("#Enroll_Date").focus();
    return "";
}
var jsonStrObj = {
stdrn: RollNo,
stdname: Name,
stdclass: Class,
stddob: Birth_Date,
addr: Address,
enroll: Enroll_Date
};
return JSON.stringify(jsonStrObj);
}

function getRollNo(){
    var RollNoJsonObj = getRollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest("90932983|-31949275716093268|90949427",
jsonStr, "SCHOOL-DB", "STUDENT-TABLE");
jQuery.ajaxSetup({async: false});
if(resultJsonObj.status === 400){
    $("#Save").prop("disabled",false);
    $("#Reset").prop("disabled",false);
    $("#RollNo").socus("");
}
else if(resultJsonObj.status === 200){
    $("#RollNo").prop("disabled",false);
    fillData(resultJsonObj);
        
    $("#Update").prop("disabled",false);
    $("#Reset").prop("disabled",false);
    $("#RollNo").focus("");
}
}

function saveData() {
var jsonStr = validateData();
if (jsonStr === "") {
return;
}
var putReqStr = createPUTRequest("90932983|-31949275716093268|90949427",
jsonStr, "SCHOOL-DB", "STUDENT-TABLE");
jQuery.ajaxSetup({async: false});
var resultJsonObj = executeCommandAtGivenBaseUrl(putReqStr,"http://api.login2explore.com:5577", "/api/iml");
alert(JSON.stringify(resultObj));
jQuery.ajaxSetup({async: true});
resetForm();
$("#RollNo").focus();
}

function updateData(){
$("#Update").prop("disabled",true);
jsonUpd = validateData();
var updateReqStr = createUPDATERequest("90932983|-31949275716093268|90949427",
jsonStr, "SCHOOL-DB", "STUDENT-TABLE");
jQuery.ajaxSetup({async: false});
var resultJsonObj = executeCommandAtGivenBaseUrl(putReqStr,"http://api.login2explore.com:5577", "/api/iml");
jQuery.ajaxSetup({async: true});
console.log(resultJsonObj);
resetForm();
$("#RollNo").focus();
}