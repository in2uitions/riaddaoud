import Head from "next/head";
import React from 'react';
// import Header from './HEAD/head.js';
import Navigation from "./NAVIGATION/nav.js";
import Footer from "./FOOTER/footer.js";
import DirectusSDK from '@directus/sdk-js';
import Swal from 'sweetalert2'
import { withTranslation } from "react-i18next";
import i18n from "../i18n.js";
import Api from './api/Api.js';
import axios from 'axios';
const directus = new DirectusSDK(Api.baseUrl);
 class blog extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: 0,
      submit:[],
      Email:"",
      Lastname:"",
      Phone:"",
      Text:"",
      Name:"",
      token:"",
      // file:[],
      file: null,
      base64URL: "",
      file_id:"",
    };

    this.getData=this.getData.bind(this);
  }

  async getData() {
    // var datadirect=await directus.items('static_pages').read(2);
    var datadirect=await directus.items('backgrounds').read({
      filter:{
        target_page:{
            "_contains":"careers",
        }
    }
  });
  var datadirectsubmit=await directus.items('website_settings').read();
    this.setState({ data: datadirect.data ,submit:datadirectsubmit.data });
this.loadanim();
  
  }
  loadanim(){
    $(function() {

      window.sr = ScrollReveal();

      if ($(window).width() < 768) {

          if ($('.animation').hasClass('js--fadeInb')) {
              $('.animation').removeClass('js--fadeInb').addClass('js--fadeInb');
          }


      } else {

          sr.reveal('.js--fadeInb', {
              origin: 'bottom',
              distance: '300px',
              easing: 'ease-in-out',
              duration: 850,
          });


      }

      sr.reveal('.js--fadeInb', {
          origin: 'bottom',
          distance: '300px',
          easing: 'ease-in-out',
          duration: 850,
      });


  });
  
  }
  
  componentDidMount () {

    this.getData();
    const fileSelector = document.getElementById('real-file');
    fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    });
    // const fileInput = document.querySelector('input[type="file"]');
    // const realFileBtnn = document.getElementById("real-file");
    // const formData = new FormData();

    // formData.append('title', 'My First File');
    // formData.append('file', realFileBtnn.files[0]);
    onscroll = function() {
          myFunctionn()
      };
    
      function myFunctionn() {
          var scrollTop = window.pageYOffset
          if (scrollTop >= 30) {
              document.getElementById("header").style.backgroundColor = "white";
          } else {
              document.getElementById("header").style.backgroundColor = "transparent";
          }
      }

 

    $(document).ready(function() {
      var submitIcon = $('.searchbox-icon');
      var inputBox = $('.searchbox-input');
      var searchBox = $('.searchbox');
      var isOpen = false;
      submitIcon.click(function() {
          if (isOpen == false) {
              searchBox.addClass('searchbox-open');
              inputBox.focus();
              isOpen = true;
          } else {
              searchBox.removeClass('searchbox-open');
              inputBox.focusout();
              isOpen = false;
          }
      });
      submitIcon.mouseup(function() {
          return false;
      });
      searchBox.mouseup(function() {
          return false;
      });
      $(document).mouseup(function() {
          if (isOpen == true) {
              $('.searchbox-icon').css('display', 'block');
              submitIcon.click();
          }
      });
  });

  // onscroll = function() {
  //     myFunctionn()
  // };

  // function myFunctionn() {
  //     var scrollTop = window.pageYOffset
  //     if (scrollTop >= 100) {
  //         document.getElementById("header").style.backgroundColor = "white";
  //     } else {
  //         document.getElementById("header").style.backgroundColor = "transparent";
  //     }
  // }
  
  // function myFunction() {
  //     document.getElementById("myDropdown").classList.toggle("show");
  // }

  // window.onclick = function(event) {
  //     if (!event.target.matches('.dropbtn')) {
  //         var dropdowns = document.getElementsByClassName("dropdown-content");
  //         var i;
  //         for (i = 0; i < dropdowns.length; i++) {
  //             var openDropdown = dropdowns[i];
  //             if (openDropdown.classList.contains('show')) {
  //                 openDropdown.classList.remove('show');
  //             }
  //         }
  //     }
  // };
  const realFileBtn = document.getElementById("real-file");
  const customBtn = document.getElementById("custom-button");
  const customTxt = document.getElementById("custom-text");

  customBtn.addEventListener("click", function() {
      realFileBtn.click();
  });
  realFileBtn.addEventListener("change", function() {
      if (realFileBtn.value) {
          customTxt.innerHTML = realFileBtn.value.match(
              /[\/\\]([\w\d\s\.\-\(\)]+)$/
          )[1];
      } else {
          customTxt.innerHTML = "No file chosen, yet. ";
          // alert("mop");
      }
  });


  }
  getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        // console.log("Called", reader);
        baseURL = reader.result;
        // console.log(baseURL);
        resolve(baseURL);
      };
      // console.log(fileInfo);
    });
  };

   handleFileInputChange =  (e) => {
    // console.log(e.target.files[0]);
    let { file } = this.state;

    file = e.target.files[0];

    this.getBase64(file)
      .then(async (result) => {
        file["base64"] = result;

        var myHeaders = new Headers();
        const fileInput = document.querySelector('input[type="file"]');
// myHeaders.append("Content-Type", "multipart/form-data; charset=utf-8; boundary=__X_BOUNDARY__");
// myHeaders.append("Content-Length", "3442422");

var formdata = new FormData();
// console.log(fileInput.files[0]);
// console.log("fileInput.files[0]");
formdata.append('title', 'My First File');
formdata.append("file", fileInput.files[0]);

var requestOptions = {
  method: 'POST',
  body: formdata
};

fetch(Api.baseUrl+"files", requestOptions)
  .then(response => response.json())
  .then(result => 
    this.setState({file_id:Api.baseUrl+"assets/"+result.data.id}))
  .catch(error => console.log('error', error));

        
      //   var formdata = new FormData();
      //   formdata.append("file",file);

      //   var requestOptions = {
      //     method: 'POST',
      //     body: formdata,
      //   };


      //  var files = await fetch('https://admin.riaddaoud.com/files', requestOptions);
      
      //  console.log("File Is", file);
        this.setState({
          base64URL: result,
          file
        });
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      file: e.target.files[0]
    });
  };

  handleFile =(e)=> {
    this.setState({ file: e.target.files[0] });
    // console.log(e.target.files[0])
    // console.log(e.target.files)
    // console.log(e.target.value)
 }
  handleEmailChange =(e)=> {
    this.setState({Email: e.target.value});
 }
 handleTextChange =(e)=> {
    this.setState({Text: e.target.value});
 }
 handleNameChange =(e)=> {
    this.setState({Name: e.target.value});
 }
 handleLastnameChange =(e)=> {
    this.setState({Lastname: e.target.value});
 }
 handlePhoneChange =(e)=> {
    this.setState({Phone: e.target.value});
 }
  handleLogin =(e)=> {
    e.preventDefault()
    var x = document.getElementById("name").value
    var y = document.getElementById("textarea").value
    var z = document.getElementById("last").value
    // var x = document.getElementById("name").value
    // console.log(x)
    if (x === null || x.trim() === "") {
        alert("you can't send empty fields !!");
        return false;
    }
    if (y === null || y.trim() === "") {
      alert("you can't send empty fields !!");
      return false;
    }
    if (z === null || z.trim() === "") {
      alert("you can't send empty fields !!");
      return false;
    }
    var formdata = new FormData();
    formdata.append("grant_type", "client_credentials");
    formdata.append("client_id", "abf00ccfee58b1f7d175588b9e9b8e60");
    formdata.append("client_secret", "c5c8c09549f7a5d67cd906dc686d515a");
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
    };
    
    fetch("https://api.sendpulse.com/oauth/access_token", requestOptions)
      .then(response =>response.json())
      .then(result =>{
        //   console.log(result)
        
        var tokenns = "Bearer "+(result.access_token).toString();
        // console.log(result.access_token)
        // alert(tokenns)
        var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", tokenns);
    var urlencoded = new URLSearchParams();
    var test = {
        
        "subject": "careers",
        "template": {
            "id": 74021,
            "variables": {
                "email": this.state.Email,
                "name": this.state.Name,
                "phone": this.state.Phone,
                "message": this.state.Text,
                "lastname": this.state.Lastname,
                "mailfile":this.state.file_id
            }
        },
        "from": {
            "name": this.state.Name,
            "email": "contact@in2uitions.com"
        },
        "to": [
            {
            "email": this.state.submit.careers_email,
            "name": "jj"
            }
        ]
    };
    urlencoded.append("email",JSON.stringify(test));
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,

    };
    // console.log(this.state.file_id)
    fetch("https://api.sendpulse.com/smtp/emails", requestOptions)
    .then(response => response.text())
    .then(result => Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Your message has been send',
      showConfirmButton: false,
      timer: 1000
    }))
    .catch(error => console.log('error', error)).then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        document.getElementById("name").value=""
        document.getElementById("textarea").value=""
        document.getElementById("last").value=""
        document.getElementById("email").value=""
        document.getElementById("phone").value=""
        document.getElementById("custom-text").innerHTML=this.props.t("attachresume")
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err.response);
      })

      })
      .catch(error => console.log(error.response));
}
render (){

  var a=[];
    for(const i in this.state.data[0]){
        // if()
        a[i]=this.state.data[0][i];

    }
    var start_url =  'https://admin.riaddaoud.com/assets/';
    var end_url='?key=system-large-cover';
    var valueimg=a.image;
    const imageurl=start_url+valueimg+end_url;
    if(a.subtitle_ar==null){ var subtitle_ar=a.subtitle}
    else var subtitle_ar=a.subtitle_ar
    if(a.box_title_ar==null){ var box_title_ar=a.box_title}
    else var box_title_ar=a.box_title_ar
    if(a.box_description_ar==null){ var box_description_ar=a.box_description}
    else var box_description_ar=a.box_description_ar
  return (
    <div >
      <Head>
          <title>{i18n.t('careers')}</title>
      </Head>
      <Navigation current="careers"></Navigation>
      < >
        <div>
          <div className="container-fluid p-0 parallax "style={{backgroundImage:'url('+imageurl+')'}}></div>
          <div className="container-fluid ">
            <div className="row">
              <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 "></div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 aboutheader py-4 px-3">
                <div className="container-fluid py-4 mb-4 ">
                  <div className="row py-4 ">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
                      <h1 className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+"meduim white aligncenter "}>
                        {(this.props.i18n.language=="ar")?box_title_ar:a.box_title}
                      </h1>
                    </div>
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 "></div>
                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10 py-3 ">
                      <p className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+"light white footertext aligncenter lineheightbig  "}>
                      {(this.props.i18n.language=="ar")?box_description_ar:a.box_description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid p-0 ">
          <div className="relative ">
            <hr className="hr my-5 " />
            <div className="thingonhr aligncenter">
              <h1 className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+"blue meduim biggersizefont"}>{(this.props.i18n.language=="ar")?subtitle_ar:a.subtitle}</h1>
            </div>
          </div>
          <div className="row px-md-5 ">
            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 p-md-5 "></div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8  ">
              <div className="row ">
                <form className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 "   onSubmit={this.handleLogin}>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-2 ">
                    <div className="form-row ">
                      <div className="col   ">
                        <input
                          type="text " onChange={this.handleNameChange}
                          className={[(this.props.i18n.language=="ar")?"textalignright DroidKufi ":"gill light "]+"form-control animation  placeholder  bordernone js--fadeInb"}
                          placeholder={this.props.t("firstname")} required maxlength="200"
                          id="name"
                        />
                      </div>
                      <div className="col ">
                        <input
                          type="text " onChange={this.handleLastnameChange}
                          className={[(this.props.i18n.language=="ar")?"textalignright DroidKufi ":"gill light "]+"form-control animation placeholder  bordernone js--fadeInb"}
                          placeholder={this.props.t("lastname")} required maxlength="200"  id="last"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-2 ">
                    <div className="form-row ">
                      <div className="col ">
                        <input
                          type="email" onChange={this.handleEmailChange}
                          // pattern=".+@gmail.com"
                          className={[(this.props.i18n.language=="ar")?"textalignright DroidKufi ":"gill light " ]+"form-control animation   placeholder bordernone js--fadeInb"}
                          placeholder={this.props.t("emailplaceholder")}
                          required maxlength="200" minlength="6"   id="email"
                        />
                      </div>
                      <div className="col ">
                        <input
                          type="tel" onChange={this.handlePhoneChange}
                          inputmode="numeric"
                          title="Format: ex: +86 800 555 1234 ( Country Code,Area Code, Exchange,Subscriber Number)"
                          pattern="^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$"
                          className={[(this.props.i18n.language=="ar")?"textalignright DroidKufi ":"gill light "]+"form-control animation   placeholder bordernone js--fadeInb"}
                          placeholder={this.props.t("phonenbplaceholder")}
                          required maxlength="200" minlength="8"   id="phone"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-2 mt-3">
                    <div className="form-group ">
                      <input type="file" id="real-file" hidden="hidden"  onChange={this.handleFileInputChange} />
                      <div className="container-fluid fileattach bordernone animation js--fadeInb">
                        <div className="row ">
                          <div className={[(this.props.i18n.language=="ar")?"textalignright DroidKufi ":"gill "]+"col-8 col-sm-8 col-md-8 col-lg-10 col-xl-10 col-xxl-10 px-0 my-auto "}>
                            <span
                              id="custom-text"
                              className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill light "]+" placeholder marginLeft"}
                            >
                            {this.props.t("attachresume")}
                            </span>
                          </div>
                          <div className="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2 col-xxl-2 p-0 ">
                            <button
                              type="button"
                              id="custom-button"
                              className=" button  submitbtn bordernone px-3 "
                            >
                              <div className="container-fluid p-2">
                                <div className="row">
                                  <div className="col-2 mr-2  p-0">
                                    <img
                                      src="./assets/images/paperclip.svg"
                                      className="img-fluid contain w-100 "
                                    />
                                  </div>
                                  <p className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill light "]+" footertext regular  dcontent "}>
                                  {this.props.t("choosefile")}
                                  </p>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 ">
                      <div className="form-group ">
                        <textarea onChange={this.handleTextChange}
                          className={[(this.props.i18n.language=="ar")?"textalignright DroidKufi ":"gill light "]+"form-control animation js--fadeInb  placeholder resizeoff bordernone"}
                          id="exampleFormControlTextarea1 "
                          rows="5"
                          placeholder={this.props.t("textareaplaceholder")}
                          required maxlength="200"  id="textarea"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-3 ">
                      <div className="row ">
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 "></div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-0">
                          <button
                            type="submit"
                            className=" button light font_size submitbtn bordernone px-4 animation js--fadeInb"
                          >
                            <div className="container-fluid px-4 py-2">
                              <div className="row">
                                <div className="submitpaperplace mr-3">
                                  <div className="container-fluid p-0 h-100">
                                    <div className="row p-0  textalignright h-100">
                                      <div className="col-2 p-0"></div>
                                      <div className="col-10 px-2 d-flex h-100">
                                        <img
                                          src="./assets/images/submit.svg"
                                          className="img-fluid contain"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <span className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill light"]+" footertext gill dcontent animation js--fadeInRight"}>
                                {this.props.t("submit")}
                                </span>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
      <Footer></Footer>
    </div>
  );}
}
export default  withTranslation() (blog);
