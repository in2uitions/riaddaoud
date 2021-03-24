import Head from "next/head";
// import Header from './HEAD/head.js';
import React from 'react';
import Navigation from "./NAVIGATION/nav.js";
import Footer from "./FOOTER/footer.js";
import axios from 'axios';
// import {withTranslation,useTranslation} from 'react-i18next';
// import styles from './style3.module.css';
import DirectusSDK from '@directus/sdk-js';
const directus = new DirectusSDK('https://rdcms.businessexchange.me/')
import { withTranslation } from "react-i18next";
 class contact extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          data: 0,
          submit:[],
        };
    
        this.getData=this.getData.bind(this);
      }
    
      async getData() {
        var datadirect=await directus.items('backgrounds').read({
            filter:{
                target_page:{
                    "_contains":"contact",
                }
            }
        });
        var datadirectsubmit=await directus.items('website_settings').read();
        this.setState({ data: datadirect.data ,submit:datadirectsubmit.data});

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



  }

  
render (){

    // const {t}=this.props;
    var a=[];
    for(const i in this.state.data[0]){
        // if()
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
      <>
      <div className={[(this.props.i18n.language=="ar")?" direction: rtl ":" "]+"container-fluid p-0 relative"}>
        <div className="row  p-0 ">
            <div className={(this.props.i18n.language=="ar")?"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-5 col-xxl-5 parallaxx relative fliphorizontally":"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-5 col-xxl-5 parallaxx relative "}style={{backgroundImage:'url('+imageurl+')'}}>
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
                        <form className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12" action={"mailto:"+this.state.submit.contact_email+"" } data-rel="external" method="POST" >
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-2">
                                <div className="form-row">
                                    <div className="col">
                                        <input type="text" className={(this.props.i18n.language=="ar")?"form-control DroidKufi  textalignright  animation js--fadeInRight placeholder  bordernone":"form-control gill animation js--fadeInRight placeholder lightitalic bordernone "} placeholder={this.props.t("nameplaceholder")}/>
                                    </div>
                                    <div className="col">
                                        <input type="email" className={(this.props.i18n.language=="ar")?"form-control DroidKufi animation js--fadeInRight placeholder  bordernone textalignright":"form-control gill animation js--fadeInRight placeholder lightitalic bordernone"} placeholder={this.props.t("emailplaceholder")}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-2">
                                <div className="form-row">
                                    <div className="col">
                                        <input type="tel" pattern="[0-9]{2}-[0-9]{6}" className={(this.props.i18n.language=="ar")?"form-control DroidKufi placeholder  animation js--fadeInRight  bordernone textalignright":"form-control  gill placeholder  animation js--fadeInRight lightitalic bordernone "} placeholder={this.props.t("phonenbplaceholder")}/>
                                    </div>
                                    <div className="col">
                                        <input type="text" className={(this.props.i18n.language=="ar")?"form-control DroidKufi placeholder animation js--fadeInRight  bordernone textalignright":"form-control gill placeholder animation js--fadeInRight lightitalic bordernone "} placeholder={this.props.t("Subjectplaceholder")}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-2 ">
                                <div className="form-group  ">
                                    <textarea className={(this.props.i18n.language=="ar")?"form-control placeholder DroidKufi animation js--fadeInRight  bordernone resizeoff textalignright":"form-control placeholder gill animation js--fadeInRight lightitalic bordernone resizeoff"} id="exampleFormControlTextarea1 " rows="5 "  placeholder={this.props.t("textareaplaceholder")}></textarea>
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