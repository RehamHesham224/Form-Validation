//selectors
const form =document.getElementById('form'),
    name =document.getElementById('name'),
    username =document.getElementById('username'),
    email =document.getElementById('email')?document.getElementById('email'):null,
    phone =document.getElementById('phone')?document.getElementById('phone'):null,
    password =document.getElementById('password')?document.getElementById('password'):null,
    password2 =document.getElementById('password2')?document.getElementById('password2'):null;
const formValidInput = {
    name: false,
    username: false,
    email: false,
    phone: false,
    password: false,
    password2: false,
    allValid() {
        return (
        this.name &&
        this.username &&
        this.email &&
        this.phone &&
        this.password &&
        this.password2
        );
    },
    };
    /*************************************************/
    //on blur functions
    /*************************************************/
    if(name){name.onblur=function(){checkName();}}
    if(username){username.onblur=function(){checkUsername();}}
    if(email){email.onblur=function(){checkEmail()}}
    if(phone){phone.onblur=function(){checkPhone();}}
    if(password){password.onblur=function(){checkPassword();}}
    if(password2){password2.onblur=function(){checkPassword2();}}

    function callAll(){
        checkName();
        checkUsername();
        checkEmail();
        checkPhone();
        checkPassword();
        checkPassword2();
    }
    /*************************************************/
    //event listener
    /*************************************************/
    form.addEventListener("submit",(e)=>{ 
        if (!formValidInput['allValid']()) {
        e.preventDefault();
        callAll();
        document.getElementById('submit').classList.add("disabled");
        console.log("disapled");
        }else{
        form.submit();
        }
        
    });
    /*************************************************/
    //check functions
    /*************************************************/
   
    function checkName(){
        if(checkRequired(name)){
            const nameValue=name.value.trim();
            if(nameValue === ""){
                setErrorFor(name,"name can't be empty");
            } else if(!isName(nameValue)){
                setErrorFor(name,"Name must be only letters");
            }else{
                setSuccessFor(name);
            }
        }
    }
    function checkUsername(){
        if(checkRequired(username)){
            const usernameValue=username.value.trim();
            if(usernameValue === ""){
                setErrorFor(username,"Username can't be empty");
                
            }else if(!isUsername(usernameValue)){
                setErrorFor(username,"Username at least 1 num,1 letter,6-15 char");
                
            }else{
                setSuccessFor(username);
            }
        }
    }
    function checkEmail(){
        if(checkRequired(email)){
        const emailValue=email.value.trim();
            if(emailValue === ""){
                setErrorFor(email,"Email can't be empty");
                
            }
            else if(!isEmail(emailValue)){
                setErrorFor(email,"Email isn't valid");
                
            }
            else{
                setSuccessFor(email);
            }
        }
    }
    function checkPhone(){
        if(checkRequired(phone)){
            const phoneValue=phone.value.trim();
            if(phoneValue === ""){
                setErrorFor(phone,"phone can't be empty");
            }
            else if(!isPhone(phoneValue)){
                setErrorFor(phone,"phone isn't valid");
            }
            else{
                setSuccessFor(phone);
            }
        }
    }
    function checkPassword(){
        if(checkRequired(password)){
            const passwordValue=password.value.trim();
            checkLength(password, 6, 20);
            if(passwordValue === ""){
                setErrorFor(password,"password can't be empty");
            }
            else if(!isPassword(passwordValue)){
                setErrorFor(password," Password must have at least one char,one num");
            }
            else{
                setSuccessFor(password);
            }
        }
    }
    function checkPassword2(){
        if(checkRequired(password2)){
            const password2Value=password2.value.trim();
            passwordValue=password.value.trim();
            if(password2Value === ""){
                setErrorFor(password2,"password2 can't be empty");
            }
            else if(passwordValue !== password2Value){
                setErrorFor(password2,"passwords doesn't match");
            }
            else{
                setSuccessFor(password2);
            }
        }
    }
    /*************************************************/
    //success and error functions
    /*************************************************/
    function setSuccessFor(input){
        const formControl=input.parentElement;
        formControl.className="form-control success";
        formValidInput[input.id] = true;
    }
    function setErrorFor(input,massage){
        const formControl=input.parentElement,
                small=formControl.querySelector("small");
        formControl.className="form-control error";
        small.innerHTML=massage;
    }
    /*************************************************/
    //validate functions
    /*************************************************/
    function isName(name){
        return /^[a-zA-Z]*.\s?[a-zA-Z]*.\s?[a-zA-Z]*.\s?[a-zA-Z]*$/.test(name);}
    function isUsername(username){
    return /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/.test(username);}
    function isEmail(email){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());}
    function isPhone(phone){
        const r=/^(\+20)([0-9]\d{8,9}$)/;
        return r.test(phone) || /^01[0-2]{1}[0-9]{8}/.test(phone);}
    function isPassword(password){return /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/.test(password);}
    function checkRequired(input){return (input != null && typeof(input) != undefined)}
    function checkLength(input , min, max){
        if(input.value.length < min){
            setErrorFor(input,`${input} can't be less than 6 character`);
        }
        else if(input.value.length > max){
            setErrorFor(input,`${input}t can't be more than 20 character`);
        }
        else{
            setSuccessFor(input);
        }
    }

