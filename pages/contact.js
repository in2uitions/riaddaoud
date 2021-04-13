import Head from "next/head";
// import Header from './HEAD/head.js';
import React from 'react';
import Navigation from "./NAVIGATION/nav.js";
import Footer from "./FOOTER/footer.js";
import axios from 'axios';
import Swal from 'sweetalert2'
import sendpulse from "sendpulse-api";
// import {withTranslation,useTranslation} from 'react-i18next';
// import styles from './style3.module.css';
import DirectusSDK from '@directus/sdk-js';
import Api from './api/Api.js';
var API_USER_ID="abf00ccfee58b1f7d175588b9e9b8e60";
var API_SECRET="c5c8c09549f7a5d67cd906dc686d515a";
var TOKEN_STORAGE="/tmp/";

const directus = new DirectusSDK(Api.baseUrl);
import { withTranslation } from "react-i18next";
import { faYenSign } from "@fortawesome/free-solid-svg-icons";
 class contact extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          data: 0,
          submit:[],
          api:[],
          Email:"",
          Subject:"",
          Phone:"",
          Text:"",
          Name:"",
          token:"",
        
        };
    
        this.getData=this.getData.bind(this);
        this.handleLogin = this.handleLogin.bind(this)
      }
    
      async getData() {
        var datadirect=await directus.items('backgrounds').read({
            filter:{
                target_page:{
                    "_contains":"contact",
                }
            }
        });
    //   alert(this.state.token)
        var datadirectsubmit=await directus.items('website_settings').read();
        this.setState({ data: datadirect.data ,submit:datadirectsubmit.data});
        // axios.get('https://cors-anywhere.herokuapp.com/https://api.sendpulse.com/templates', {
        //     headers: {
        //         'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRkZjYxOGRkZGZkMmYwNzIwMjRjNmY4ZDQ5MGQzMDg1NmEwOGFiNjU1ODkxYjA1YmRhNzgzNTg5YzM4N2U4NzVhNmU2NzVkODdhNGI1MDliIn0.eyJhdWQiOiIwIiwianRpIjoiZGRmNjE4ZGRkZmQyZjA3MjAyNGM2ZjhkNDkwZDMwODU2YTA4YWI2NTU4OTFiMDViZGE3ODM1ODljMzg3ZTg3NWE2ZTY3NWQ4N2E0YjUwOWIiLCJpYXQiOjE2MTc2OTU1MjYsIm5iZiI6MTYxNzY5NTUyNiwiZXhwIjoxNjE3Njk5MTI2LCJzdWIiOiIiLCJzY29wZXMiOltdLCJ1c2VyIjp7ImlkIjo3NTUyMDM5LCJncm91cF9pZCI6bnVsbCwicGFyZW50X2lkIjpudWxsLCJhcmVhIjoicmVzdCJ9fQ.p9RyhAS-lS53AfctdH6Ybro7ENGTaa-OjSNmW-g7WkTt-VbM6ZlsEWduSgECfApGBXRDfPWzb45X2v7D3mQEpmsAsGG6t2r76FnDc0Us_QjvV9mEzaTcPLIEEbn9pqV2iwOPo_J0482lB1hN3-JeqQTcAQ-bIvxKedSYR9BZNIyd0SacestG_PHJNDu72cK9bZI0AzOFIjg3Kg77A5z9W8oSkOnlE0bAI-1TCbaSwDUalM3u5YjvkKxgxMdOUUb9R0mkHIpAM1gDa9U-y65c9Sf5-KbfyrMKY4AmqMzJXMu1Ff3-7-7pm3O0HQSrn9GMsvIIXJQomtxfZghD155xig`,
        //         "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Methods" : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        //     }
        //     })
        //     .then((res) => {
        //         const nameList = res.data;
        //         this.setState({ api:nameList });
        //     })
        //     .catch((error) => {
        //     console.error(error)
        //     })
      
        }
        
      
      
      componentDidMount () {
    
        this.getData();
        
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

        onscroll = function() {
            myFunctionn()
        };

        function myFunctionn() {
            var scrollTop = window.pageYOffset
            if (scrollTop >= 10) {
                document.getElementById("header").style.backgroundColor = "white";
            } else {
                document.getElementById("header").style.backgroundColor = "transparent";
            }
        }

        function myFunction() {
            document.getElementById("myDropdown").classList.toggle("show");
        }

        // Close the dropdown if the user clicks outside of it
        window.onclick = function(event) {
            if (!event.target.matches('.dropbtn')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        };
        $(function() {

            window.sr = ScrollReveal();

            if ($(window).width() < 768) {

                if ($('.animation').hasClass('js--fadeInLeft')) {
                    $('.animation').removeClass('js--fadeInLeft').addClass('js--fadeInRight');
                }

                sr.reveal('.js--fadeInRight', {
                    origin: 'right',
                    distance: '300px',
                    easing: 'ease-in-out',
                    duration: 850,
                });

            } else {

                sr.reveal('.js--fadeInLeft', {
                    origin: 'left',
                    distance: '300px',
                    easing: 'ease-in-out',
                    duration: 850,
                });

                sr.reveal('.js--fadeInRight', {
                    origin: 'right',
                    distance: '300px',
                    easing: 'ease-in-out',
                    duration: 850,
                });

            }

            sr.reveal('.js--fadeInLeft', {
                origin: 'left',
                distance: '300px',
                easing: 'ease-in-out',
                duration: 850,
            });

            sr.reveal('.js--fadeInRight', {
                origin: 'right',
                distance: '300px',
                easing: 'ease-in-out',
                duration: 850,
            });

        });
        // const config = {
        //     headers: { Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNkOWIxNDg5OTQyZWQ1OThlZDU0NzZhNDZiYWViNDgyY2NjYzgyOGRhNjgwOWZiOTliMWY2ZDRhYWMzNTk2YTZiZjE2OWZkNDY3ZDg0ZGM1In0.eyJhdWQiOiIwIiwianRpIjoiY2Q5YjE0ODk5NDJlZDU5OGVkNTQ3NmE0NmJhZWI0ODJjY2NjODI4ZGE2ODA5ZmI5OWIxZjZkNGFhYzM1OTZhNmJmMTY5ZmQ0NjdkODRkYzUiLCJpYXQiOjE2MTc2MTczNDIsIm5iZiI6MTYxNzYxNzM0MiwiZXhwIjoxNjE3NjIwOTQyLCJzdWIiOiIiLCJzY29wZXMiOltdLCJ1c2VyIjp7ImlkIjo3NTUyMDM5LCJncm91cF9pZCI6bnVsbCwicGFyZW50X2lkIjpudWxsLCJhcmVhIjoicmVzdCJ9fQ.oPnMY8mNUsqZ_z32FU7k76-b5c8yQ5ZAdut1yW0-xgPuVg3SqZ_dDDx1dWL4u6i_OrzGjZMNZkOHxqLO1m8Qw7gEUHlGMuncdZn0Ir3C--6CVvpojKm1NKhgEkHLg_ey5Ax513ntl0rkcKj_WZf6DPDBhMVMTxYNcCANqslg1ZvDUyOv0rFkdNYUf5ULxR5Frc7-X-PHRoz1xMuU_fMyK5nX7sQTFyb4yKJEbdr9KU-yYiTznyQU0HBXWo1i76NDdV52_u5n38PXA5Pq3z1cdueNUrktvqyTt-hRRuz-Usdmnv_a2hQYUaSvcpHv0tcKtH9_vjxXdaj7DZoH_LgS0Q` }
        // };
        
        // const bodyParameters = {
        //    key: "value"
        // };
        // axios.get(`https://api.sendpulse.com/templates`,
        // bodyParameters,
        // config)
        // .then(res => {
        //   const persons = res.data;
        //  console.log(persons)
        // })

  }

//   sendPulse() {
//     var API_USER_ID="USER_ID";
//     var API_SECRET="USER_SECRET";
    
//     var TOKEN_STORAGE="/tmp/";
//     axios.post('https://us-central1-journeylife-dev.cloudfunctions.net/sendPulse', {
//         pulseUrl: this.state.pulseUrl,
//         pulseTitle: this.state.pulseTitle,
//     }, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//         }).then(function () {
//             document.getElementById('sentPulse').style.display = 'block';
//         })
// }

handleEmailChange =(e)=> {
    this.setState({Email: e.target.value});
 }
 handleTextChange =(e)=> {
    this.setState({Text: e.target.value});
 }
 handleNameChange =(e)=> {
    this.setState({Name: e.target.value});
 }
 handleSubjectChange =(e)=> {
    this.setState({Subject: e.target.value});
 }
 handlePhoneChange =(e)=> {
    this.setState({Phone: e.target.value});
 }
 handleLogin =(e)=> {
    e.preventDefault()
  
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
        
        "subject": "contact",
        "template": {
            "id": 72113,
            "variables": {
                "email": this.state.Email,
                "name": this.state.Name,
                "phone": this.state.Phone,
                "message": this.state.Text,
                "subject": this.state.Subject
            }
        },
        "from": {
            "name": this.state.Name,
            "email": "contact@in2uitions.com"
        },
        "to": [
            {
            "email": this.state.submit.contact_email,
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

    fetch("https://api.sendpulse.com/smtp/emails", requestOptions)
    .then(response => response.text())
    .then(result =>Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Your message has been send',
        showConfirmButton: false,
        // timer: 10
      })
    //   text.value = ""

      
      )
    .catch(error => console.log('error', error)).then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err.response);
      })

      })
      .catch(error => console.log(error.response));
}
render (){

    console.log(this.state.yes)
    var a=[];
    for(const i in this.state.data[0]){
        a[i]=this.state.data[0][i];
    }

    var start_url =  'https://rdcms.businessexchange.me/assets/';
    var end_url='?key=system-large-cover';
    var valueimg=a.image;
    const imageurl=start_url+valueimg+end_url;
    if(a.subtitle_ar==null){ var subtitle_ar=a.subtitle}
    else var subtitle_ar=a.subtitle_ar
  return (
    <div>
      <Navigation current="contact"></Navigation>
      {/* {console.log(this.state.api)} */}
      <>
      <div className={[(this.props.i18n.language=="ar")?" direction: rtl ":" "]+"container-fluid p-0 relative"}>
        <div className="row  p-0 ">
            <div className={(this.props.i18n.language=="ar")?"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-5 col-xxl-5 parallaxx relative fliphorizontally":"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-5 col-xxl-5 parallaxx relative bckgcover"}style={{backgroundImage:'url('+imageurl+')'}}>
                <div className="col-12 overlay1"></div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-7 col-xxl-7 py-5 px-1 mt-4 ">
                <div className={(this.props.i18n.language=="ar")?"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 px-md-5 py-4 mt-4 textalignright":"col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 col-xxl-11 px-md-5 py-4 mt-4 "}>
                    <h1 className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+" meduim textblack"}>
                     {(this.props.i18n.language=="ar" )?subtitle_ar:a.subtitle}
                    </h1>

                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 px-md-5">
                    <div className="row  ">
                        {/* <form className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12" action={"mailto:"+this.state.submit.contact_email+"" } data-rel="external" method="POST" > */}
                        <form onSubmit={this.handleLogin} className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"  >
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-2">
                                <div className="form-row">
                                    <div className="col">
                                        <input type="text" name="text" onChange={this.handleNameChange} className={(this.props.i18n.language=="ar")?"form-control DroidKufi  textalignright  animation js--fadeInRight placeholder  bordernone":"form-control gill animation js--fadeInRight placeholder lightitalic bordernone "} placeholder={this.props.t("nameplaceholder")} required/>
                                    </div>
                                    <div className="col">
                                        <input type="email" name="text" onChange={this.handleEmailChange} className={(this.props.i18n.language=="ar")?"form-control DroidKufi animation js--fadeInRight placeholder  bordernone textalignright":"form-control gill animation js--fadeInRight placeholder lightitalic bordernone"} placeholder={this.props.t("emailplaceholder")} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-2">
                                <div className="form-row">
                                    <div className="col">
                                        <input type="tel" name="text" onChange={this.handlePhoneChange} className={(this.props.i18n.language=="ar")?"form-control DroidKufi placeholder  animation js--fadeInRight  bordernone textalignright":"form-control  gill placeholder  animation js--fadeInRight lightitalic bordernone "} placeholder={this.props.t("phonenbplaceholder")} required/>
                                    </div>
                                    <div className="col">
                                        <input type="text" name="text" onChange={this.handleSubjectChange} className={(this.props.i18n.language=="ar")?"form-control DroidKufi placeholder animation js--fadeInRight  bordernone textalignright":"form-control gill placeholder animation js--fadeInRight lightitalic bordernone "} placeholder={this.props.t("Subjectplaceholder")} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-2 ">
                                <div className="form-group  ">
                                    <textarea name="text" onChange={this.handleTextChange} className={(this.props.i18n.language=="ar")?"form-control placeholder DroidKufi animation js--fadeInRight  bordernone resizeoff textalignright":"form-control placeholder gill animation js--fadeInRight lightitalic bordernone resizeoff"} id="exampleFormControlTextarea1 " rows="5 "  placeholder={this.props.t("textareaplaceholder")}></textarea>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-2 ">
                                <div className="row mb-4">
                                    <div className={(this.props.i18n.language=="ar")?null:"col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 "}></div>
                                    <div className={(this.props.i18n.language=="ar")?"col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 d-flex textalignleft":"col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 "}>
                                        <button type="submit" className=" button light font_size submitbtn bordernone px-4 animation js--fadeInRight">
                                                <div className="container-fluid px-4 py-2">
                                                    <div className={[(this.props.i18n.language=="ar")?"flexreverse ":""]+"row "}>
                                                        <div className="submitpaperplace mr-3 ">
                                                            <div className="container-fluid p-0 h-100">
                                                                <div className="row p-0  textalignright h-100">
                                                                    <div className="col-2 p-0"></div>
                                                                    <div className="col-10 px-2 d-flex h-100">
                                                                        <img src="./assets/images/submit.svg" className="img-fluid contain"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div><span className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+"light footertext  dcontent animation js--fadeInRight"}>{this.props.t("submit")}</span></div>
                                                    </div>
                                                </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
      </>
      <Footer></Footer>
    </div>
  );}
}

export default withTranslation()(contact);