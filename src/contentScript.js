var phoneNumberId;
var phoneNumber;
var email;
var password;
var maleNames = ["أحمد", "محمد", "يوسف", "عمر", "علي"];
var femaleNames = ["سارة", "فاطمة", "أمينة", "ليلى", "خديجة"];
class SmsHubBot {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async getPhoneNumberFromSmsHub(service, country) {
        const urlGetNumber = `https://smshub.org/stubs/handler_api.php?api_key=${this.apiKey}&action=getNumber&service=${service}&country=${country}`;
        try {
            const response = await fetch(urlGetNumber);
            if (!response.ok) throw new Error('Error getting number');
            return await response.text();
        } catch (error) {
            console.error('Error in getPhoneNumberFromSmsHub:', error);
            return null;
        }
    }
}
function chooseRandomName(gender) {
    if (gender === 'male') {
        return maleNames[Math.floor(Math.random() * maleNames.length)];
    } else if (gender === 'female') {
        return femaleNames[Math.floor(Math.random() * femaleNames.length)];
    } else {
        var allNames = maleNames.concat(femaleNames);
        return allNames[Math.floor(Math.random() * allNames.length)];
    }
}
async function fill_name() {
    console.log("start")
    var input1 = document.getElementById("firstName");
    var input2 = document.getElementById("lastName");
    var gender = 'male'; // أو 'female'، حسب الحاجة

    if (input1 && input2) {
        var randomName = chooseRandomName(gender);
        input1.value = randomName;
        input2.value = "آل " + randomName;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    clickButton();
    await new Promise(resolve => setTimeout(resolve, 2000));
}
function generateRandomDate() {
    var start = new Date(1980, 0, 1);
    var end = new Date(2003, 11, 31);
    var randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    var day = randomDate.getDate();
    var month = randomDate.getMonth() + 1;
    var year = randomDate.getFullYear();

    return { day, month, year };
}
function fillDateFields() {
    return new Promise(resolve => {
        var randomDate = generateRandomDate();

        var dayField = document.getElementById("day");
        var monthField = document.getElementById("month");
        var yearField = document.getElementById("year");

        if (dayField) {
            dayField.value = randomDate.day;
        }
        if (monthField) {
            monthField.value = randomDate.month.toString();
        }
        if (yearField) {
            yearField.value = randomDate.year;
        }
        setGender();
        setTimeout(clickButton, 4000)
        setTimeout(resolve, 4000);
    });
}
function setGender() {
    return new Promise(resolve => {
        var genderField = document.getElementById("gender");
        if (genderField) {
            var genders = ["1", "2", "3"]; // قيم الجنس: 1 لذكر، 2 لأنثى، 3 و4 للخيارات الأخرى
            var randomGender = genders[Math.floor(Math.random() * genders.length)];
            genderField.value = randomGender;
        }
        resolve();
    });
}
function generateRandomString() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var result = '';
    for (var i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
function fillRandomString() {
    return new Promise(resolve => {
        setTimeout(() => {
            var elements = document.querySelector('[jsname="CeL6Qc"]')
            if (elements) {
                console.log("raido")
                var firstElementWithAriaCheckedFalse = document.querySelector('[aria-checked="false"]');
                if (firstElementWithAriaCheckedFalse) {
                    firstElementWithAriaCheckedFalse.setAttribute('aria-checked', 'true');
                    setTimeout(clickButton, 2000)
                }
            } else {
                console.log("username")
                setTimeout(() => {
                    var randomString = generateRandomString();
                    email = `${randomString}@gmail.com`; // تصحيح السطر
                    console.log(email)
                    var usernameField = document.querySelector('[name="Username"]');
                    if (usernameField) {
                        usernameField.value = randomString;
                        setTimeout(clickButton, 2000)
                    }
                    setTimeout(resolve, 3000);
                }, 2000)
            }
        }, 2000)
    });
}
function generateRandomPassword() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
function fillPassword() {
    return new Promise(resolve => {
        console.log("password")
        setTimeout(() => {
            password = "a7a@megalol"; // تعيين قيمة المتغير العام مباشرة
            console.log(password)
            var passwordField = document.querySelector('[name="Passwd"]');
            var passwordAgainField = document.querySelector('[name="PasswdAgain"]');

            if (passwordField && passwordAgainField) {
                passwordField.value = password;
                passwordAgainField.value = password;
                setTimeout(clickButton)
            }
            setTimeout(resolve, 4000);
        }, 3000)
    });
}
async function getPhoneNumber() {
    try {
        const smsHubBot = new SmsHubBot('194722U6b8fa6f37f9a2372e5655c5fe69d6b9d');
        const numberInfo = await smsHubBot.getPhoneNumberFromSmsHub('go', '16');
        console.log('Received number info:', numberInfo);
        phoneNumberId = numberInfo.split(':')[1]
        phoneNumber = numberInfo.split(':')[2]; // تأكد من أن هذا يعطي البيانات المتوقعة
        return phoneNumber;
    } catch (error) {
        console.error('Error in getPhoneNumber:', error);
        return null;
    }
}
async function fillPhone() {
    console.log('PhoneNumber');
    const phoneNumber = await getPhoneNumber();

    if (phoneNumber) {
        console.log('Phone Number:', phoneNumber);
        var inputPhone = document.getElementById("phoneNumberId");
        if (inputPhone) {
            inputPhone.value = "+" + phoneNumber;
            setTimeout(clickButton, 3000);
        }
    }
}
function selectedRaido() {
    var raido = document.querySelector('div[jsname="ornU0b"]')
    if (raido) {
        raido.setAttribute("aria-checked", "true")
        raido.click()
        setTimeout(clickButton, 1000)
    }
}
function clickButton() {
    return new Promise(resolve => {
        var buttons = document.querySelectorAll('button[type="button"]');
        if (buttons.length > 0) {
            buttons[0].click();
        }
        resolve();
    });
}
function buttonskip() {
    return new Promise(resolve => {
        setTimeout(() => {
            var divs = document.querySelectorAll('div[jsname="uRHG6"]');
            divs.forEach(div => {
                var button = div.querySelector("div").querySelector("button");
                button.click()
                setTimeout(clickButton, 2000)
                // هنا يمكنك التعامل مع الزر button كما تشاء
            });
            resolve();
        }, 2000)
    });
}
async function checkForErrors() {
    let retry = true;

    while (retry) {
        await new Promise(resolve => setTimeout(resolve, 8000));
        const ariaLiveElement = document.querySelector('[aria-live="polite"]');

        if (ariaLiveElement) {
            console.log('Aria-live polite element detected, retrying...');
            const smsHubBot = new SmsHubBot('194722U6b8fa6f37f9a2372e5655c5fe69d6b9d');
            smsHubBot.getPhoneNumberFromSmsHub('go', '16').then(numberInfo => {
                console.log('Received number info:', numberInfo);
                // تحليل معلومات الرقم لاستخراج الرقم الفعلي
                // تأكد من أن هذه المعلومات يتم تحليلها بشكل صحيح
                phoneNumberId = numberInfo.split(':')[1];
                const phoneNumber = numberInfo.split(':')[2]; // مثال لتحليل الرقم
                if (phoneNumber) {
                    console.log(phoneNumberId)
                    var inputPhone = document.getElementById("phoneNumberId");
                    if (inputPhone) {
                        inputPhone.value = "+" + phoneNumber;
                        setTimeout(clickButton, 3000)

                    }
                }
            });
        } else {
            console.log('No aria-live polite element found, stopping retries...');
            retry = false;
        }
    }
    return null;
}
async function getVerificationCode() {
    if (!phoneNumber) {
        console.log("No phone number provided");
        return;
    }

    const urlGetCode = `https://smshub.org/stubs/handler_api.php?api_key='194722U6b8fa6f37f9a2372e5655c5fe69d6b9d'&action=getStatus&id=${phoneNumberId}`;
    const startTime = new Date().getTime();
    const timeout = 180;

    while (new Date().getTime() - startTime < timeout * 1000) {
        try {
            const response = await fetch(urlGetCode);
            console.log(response)
            if (!response.ok) throw new Error('Error getting code');
            const codeInfo = await response.text();

            if (codeInfo.includes("STATUS_OK")) {
                const verificationCode = codeInfo.split(":")[1];
                console.log(`تم استلام رمز التحقق: ${verificationCode}`);
                var inputcode = document.getElementById("code")
                if (inputcode) {
                    inputcode.value = verificationCode
                    setTimeout(clickButton, 2000)
                }
                return verificationCode;
            } else if (codeInfo.includes("STATUS_WAIT_CODE")) {
                console.log('Waiting for code...');
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        } catch (error) {
            console.error('Error in getVerificationCode:', error);
            break;
        }
    }
    console.log("Timeout reached, no code received.");
    return null;
}
async function executeVerificationProcess() {
    const smsHubBot = new SmsHubBot('194722U6b8fa6f37f9a2372e5655c5fe69d6b9d');
    const phoneNumber = await checkForErrors();
    const verificationCode = await getVerificationCode(phoneNumber);

    if (verificationCode) {
        fillAgreements()
    }
}
function fillAgreements() {
    return new Promise(resolve => {
            alert(`${email} : ${password}`)
            setTimeout(()=>{
                console.log("Agree on harmonics")
                setTimeout(clickButton,2000)
                buttonskip()
                selectedRaido()
                buttonskip()
                resolve()
            },3000)
    }
    )
}

function main() {
    fill_name()
        .then(fillDateFields)
        .then(fillRandomString)
        .then(fillPassword)
        .then(fillPhone)
        .then(executeVerificationProcess)
        .then(fillAgreements)

    // ... باقي التدفق الخاص بك
}

window.onload = main;


