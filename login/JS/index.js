console.log("hello");
var userName = document.getElementById("name");
var userPassword = document.getElementById("password");
var userEmail = document.getElementById("email");
var checkname = document.getElementById("checkname");
var checkpassword = document.getElementById("checkpassword");
var userContainer = [];

if (localStorage.getItem("User") !== null) {
  userContainer = JSON.parse(localStorage.getItem("User"));
}

function AddUser() {
  var Name = userName.value;
  var Password = userPassword.value;
  var Email = userEmail.value;
  if (Name === "" || Password === "" || Email === "") {
    alert("All fields are required!");
    return;
  }

  // التحقق من صحة الإدخالات
  if (validateInputs(Name, Password, Email)) {
    // التحقق من عدم وجود البريد الإلكتروني بالفعل
    if (userContainer.some((user) => user.useremail === Email)) {
      document.getElementById("result").innerHTML = "Email already exists!";
      return;
    }

    // إنشاء كائن المستخدم وإضافته إلى القائمة
    var user = {
      username: Name,
      userpassword: Password,
      useremail: Email,
    };

    userContainer.push(user);
    localStorage.setItem("User", JSON.stringify(userContainer));

    Clear();

    document.getElementById("result").innerHTML = "Success!";
    window.location.href = "login.html";
  } else {
    document.getElementById("result").innerHTML = "Invalid inputs!";
  }
}

// مسح الحقول
function Clear() {
  userName.value = "";
  userPassword.value = "";
  userEmail.value = "";
}

function validateInputs(Name, Password, Email) {
  var regex = {
    username: /^[a-zA-Z]{3,50}$/, // اسم يتكون من 3 إلى 50 حرفًا
    userpassword: /^[a-zA-Z0-9]{8,}$/, // كلمة مرور لا تقل عن 8 أحرف
    useremail: /^[a-zA-Z0-9._%+-]+@gmail\.com$/, // بريد إلكتروني صالح بنطاق Gmail
  };

  return (
    regex.username.test(Name) &&
    regex.userpassword.test(Password) &&
    regex.useremail.test(Email)
  );
}
function CheakUser() {
  var name = checkname.value;
  var password = checkpassword.value;

  var user = userContainer.find((user) => user.username === name);

  if (!user) {
    document.getElementById("res").innerHTML = "User Name is not valid!";
  } else if (user.userpassword !== password) {
    document.getElementById("res").innerHTML = "Password is not valid!";
  } else {
    document.getElementById("res").innerHTML = "Login successful!";
    localStorage.setItem("LoggedUser", JSON.stringify(user));
    window.location.href = "welcome.html";
  }

  checkname.value = "";
  checkpassword.value = "";
}

function logout() {
  // حذف بيانات المستخدم من localStorage
  localStorage.removeItem("LoggedUser");

  // إعادة التوجيه إلى صفحة تسجيل الدخول
  window.location.href = "login.html";
}
