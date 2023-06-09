  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
  import { getFirestore, addDoc,collection,getDocs } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBGt4mFuBFAjnJuDjJakpVqqiJDMSniAx4",
    authDomain: "portfolio-vivek-pandey.firebaseapp.com",
    projectId: "portfolio-vivek-pandey",
    storageBucket: "portfolio-vivek-pandey.appspot.com",
    messagingSenderId: "380752158200",
    appId: "1:380752158200:web:427e3ba52ab488652f8a0d",
    measurementId: "G-VY0E3YEJJ5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);


  const db = getFirestore(app);
  




  //Reference messages Collection
//    var messagesRef = firebase.database().ref("messages");


window.addEventListener("load",function(){
    document.querySelector(".preloader").classList.add("opacity-0");
    setTimeout(function(){
        document.querySelector(".preloader").style.display = "none";
    },1000)
})


// Get Projects from Firebase Collection

let ProjectParentContainer = document.getElementById("ProjectsParentContainer")
let ProjectInnerDiv = ``
const querySnapshot = await getDocs(collection(db, "projects"));
let ProjectsData = []

querySnapshot.forEach(doc=>{
  ProjectsData.push(doc.data())
})


ProjectsData.reverse().forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
 

    // Creating Project Divs

    ProjectInnerDiv += `
    <div class="blog-item pad-15" >
      <div class="blog-item-inner shadow-dark">
        <div class="blog-image">
          <img src="${doc.ProjectImage}" alt="blog">
          
          <div class="blog-date" >
          
            <a href="${doc.ProjectLiveLink
            }" target="_blank">Visit Site</a>
          </div>
        </div>
        <div class="blog-info">
          <h4 class="blog-title">${doc.ProjectTitle}</h4>
          <p class="blog-description">${doc.ProjectDescription}</p>
          <p class="blog-description"><strong>Features</strong> : ${doc.Features}</p>
          <p class="blog-tag">Tags : ${getProjectTags(doc.Tags)} </p>
          <p class="blog-tag">Github :  <a href="${doc.ProjectGithubLink
          }" target="_blank">View Code</a> </p>
        </div>
      </div>
    </div>
    `

});

ProjectParentContainer.innerHTML = ProjectInnerDiv


function getProjectTags(arr){
  let tagsOutput = ''

  arr.forEach(tag=>{
    tagsOutput += `<a href="#" style="margin-right:10px;" >${tag}</a>`
  })

  return tagsOutput
}



//   Aside navbar

const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;

for(let i=0 ; i<totalNavList;i++){
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function(){
        // remove back section
        removeBackSectionClasss();

        for(let j=0;j<totalNavList;j++){
          if(navList[j].querySelector("a").classList.contains("active")){
            // add back section
            addBackSectionClasss(j);
          }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);

        if(window.innerWidth < 1200){
          asideSectionTogglerBtn();
        }
    })
}

function removeBackSectionClasss(){
    for(let i = 0 ; i<totalSection;i++){
        allSection[i].classList.remove("back-section");
      }
}
function addBackSectionClasss(num){

        allSection[num].classList.remove("back-section");
      
}

function showSection(e){
  for(let i = 0 ; i<totalSection;i++){
    allSection[i].classList.remove("active");
  }
  const target= e.getAttribute("href").split("#")[1];
  document.querySelector("#"+target).classList.add("active");
}

function updateNav(e){
    for(let i=0 ; i<totalNavList;i++){
        navList[i].querySelector("a").classList.remove("active");
        const target=e.getAttribute("href").split("#")[1];
        if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
            navList[i].querySelector("a").classList.add("active");
        }
    }
    
}
document.querySelector(".hire-me").addEventListener("click",function(){
    const sectionIndex =  this.getAttribute("data-section-index");
    // console.log(sectionIndex);
    showSection(this);
    updateNav(this);
    removeBackSectionClasss();
    addBackSectionClasss(sectionIndex);
})

const navTogglerBtn = document.querySelector(".nav-toggler"),
      aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click" , function(){
    asideSectionTogglerBtn();
})

function asideSectionTogglerBtn(){
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
  for(let i = 0 ; i<totalSection;i++){
    allSection[i].classList.toggle("open");
  }
}



//Contact Form

//Listen for form submit

document.getElementById("contactForm").addEventListener("submit" , submitForm);

async function submitForm(e){

    e.preventDefault();
   
    //get Values
    let name = getId("name");
    let email = getId("email");
    let subject = getId("subject");
    let message = getId("message");

        // let generateRandNumber = Math.floor(100000 + Math.random() * 900000)
        // console.log("number",generateRandNumber)

        const docRef = await addDoc(collection(db, "clientMessages"), {
        name: name,
        email: email,
        subject: subject,
        message:message
      });



      if(docRef.id){
        document.querySelector(".alert").style.display ="block";

        setTimeout(function(){
            document.querySelector(".alert").style.display ="none";
        },3000);
    
        //clear Form
        document.getElementById("contactForm").reset();
      }
    
   
}


// To get all Elements Id

function getId(id){
    return document.getElementById(id).value;
}




// const currrentDate = new Date();
// const dateOfBirth =  new Date(1997, 01, 13, 05);

// const ageValue = Math.floor((currrentDate - dateOfBirth)/31536000000);

// let age = document.querySelector("#age").innerHTML = ageValue;