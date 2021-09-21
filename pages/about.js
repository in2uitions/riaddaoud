import Head from "next/head";
import React from 'react';
import {isIOS} from 'react-device-detect';
// import Header from './HEAD/head.js';
import Navigation from "./NAVIGATION/nav.js";
import Link from 'next/link'
import Footer from "./FOOTER/footer.js";
import { useRouter } from 'next/router'
import DirectusSDK from '@directus/sdk-js';
import Api from './api/Api.js';
const directus = new DirectusSDK(Api.baseUrl);
import { withTranslation } from "react-i18next";
// import styles from './style3.module.css';
class about extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          data: [],
          data_container:[],
          data_timeline:[],
        };
    
        this.getData=this.getData.bind(this);
      }
    
      async getData() {
        var datadirect=await directus.items('backgrounds').read({
            filter:{
                target_page:{
                    "_contains":"about",
                }
            }
        });
        var datadirectcontainer=await directus.items('static_page_container').read();
        var datadirecttimeline=await directus.items('history').read();
        


    
        this.setState({ data: datadirect.data,data_container:datadirectcontainer.data,data_timeline:datadirecttimeline.data },() => {
            this.loadAnim();
        });
      }

      loadAnim(){
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

      }
    

  componentDidMount () {
    this.getData();
    onscroll = function() {
        myFunctionn()
    };

    function myFunctionn() {
        var scrollTop = window.pageYOffset
        if (scrollTop >= 100) {
            document.getElementById("header").style.backgroundColor = "white";
        } else {
            document.getElementById("header").style.backgroundColor = "transparent";
        }
        // alert(scrollTop);
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



  }
render (){
    var a=[];
    for(const i in this.state.data[0]){
        a[i]=this.state.data[0][i];
    }

    var startb_url =  'https://rdcms.businessexchange.me/assets/';
    var endb_url='?key=system-large-cover';
    var valuebackimg=a.image;
    const imagbackeurl=startb_url+valuebackimg+endb_url;
    if(a.subtitle_ar==null){ var subtitle_ar=a.subtitle}
    else var subtitle_ar=a.subtitle_ar
    if(a.box_title_ar==null){ var box_title_ar=a.box_title}
    else var box_title_ar=a.box_title_ar
    if(a.box_description_ar==null){ var box_description_ar=a.box_description}
    else var box_description_ar=a.box_description_ar
  return (
    <div>
      <Navigation current="about"></Navigation>
    <div >
        <div className="container-fluid p-0 parallax"style={{backgroundImage:'url('+imagbackeurl+')'}}>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3"></div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6 aboutheader py-4 px-1">
                    <div className="container-fluid ">
                        <div className="row  py-4">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
                                <h1 className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+"meduim white  aligncenter"}> {(this.props.i18n.language=="ar")?box_title_ar:a.box_title}</h1>
                            </div>
                            <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10  py-4">
                                <p className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+"light white footertext  aligncenter lineheightbig py-1"}> {(this.props.i18n.language=="ar")?box_description_ar:a.box_description}</p>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
    <div >
    {this.state.data_container.map((value, index) => {
        var start_url =  'https://rdcms.businessexchange.me/assets/';
        var end_url='?key=system-large-cover';
        var valueimg=value.image;
        const imageurl=start_url+valueimg+end_url;
        if(value.description_ar==null){ var description_ar=value.description}
        else var description_ar=value.description_ar
        if(value.title_ar==null){ var title_ar=value.title}
        else var title_ar=value.title_ar
        if(index%2==0)
        {
            return (
                <div>
                    <div key={['btn-3-'+value]} className='container-fluid p-0' >
                       <div className='row relative' >
                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6 aboutmission px-3 py-5 js--fadeInLeft'>
                                <div className={[(this.props.i18n.language=="ar")?"textalignright  ":" "]+'col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12  aligncenter'}>
                                    <h1 className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+'regular blue'}>
                                        {(this.props.i18n.language=="ar")?title_ar:value.title}
                                        
                                        </h1>
                                </div>
                                <div className={[(this.props.i18n.language=="ar")?"textalignright DroidKufi  ":"gill "]+'mission light py-2 px-3 px-md-0 lineheightbig'}>
                                    <p>
                                    {(this.props.i18n.language=="ar")?description_ar:value.description}
                                    </p></div>
                                </div>
                                <div className={[(isIOS)?"backgnotfixedios ":""]+'col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6 p-0 parallax1'} style={{backgroundImage:'url('+imageurl+')'}}   ></div>
                        </div>
                    </div>
                    {(index==0)?<div className='parallaxgeneral'>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <div className=' col-1 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 '></div>
                                    <div className='d-flex justify-content-center col-10 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-5 px-0 '>
                                        <div className='align-self-lg-start quotesimg'><img src='./assets/images/quotes.png' className='img-fluid w-100 cover ' /></div>
                                        <p className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+'quotestext  aligncenter px-4'}>{this.state.data[0].quote}</p>
                                        <div className='secquotes pl-2 pl-sm-0 quotesimg'><img src='./assets/images/quotes.png' className='img-fluid w-100 cover' /></div>
                                    </div>
                                </div>
                            </div>
                        </div>:null}
                </div>
                    );
        }
        else{
            return(
                <div>
                <div className='container-fluid p-0' >
                     <div className='row relative' >
                        <div className={[(isIOS)?"backgnotfixedios ":""]+'col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6 p-0 parallax2'}style={{backgroundImage:'url('+imageurl+')'}}></div>
                        <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6 aboutvision px-3 py-5 js--fadeInRight'>
                            <div className={[(this.props.i18n.language=="ar")?"textalignright  ":" "]+'col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 aligncenter '}>
                                 <h1 className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+'regular blue'}>   {(this.props.i18n.language=="ar")?title_ar:value.title}</h1>
                            </div>
                            <div className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+'mission light py-2 px-3 px-md-0 lineheightbig'}><p>{(this.props.i18n.language=="ar")?description_ar:value.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {(index==1)?<div className='parallaxgeneral'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className=' col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3'></div> 
                            <div className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+' col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6 aligncenter py-5 quotesreply regular '}>
                                {this.props.t('aboutreplying')}
                                <div className='py-2 mt-4 '>
                                    <Link href='/contact'>
                                        <a href='contact'>
                                            <button type='button'  className={[(this.props.i18n.language=="ar")?" ":"mb-2 "]+' buttoncontact px-5 '}>
                                                <span className={[(this.props.i18n.language=="ar")?"DroidKufi vtmidddle ":"gill "]+'textcontact  light'}>{this.props.t("contactus")}</span>
                                            </button>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>:null}
                </div>
                    ) ;
            }
        
      })}
    </div>
        <div className="container-fluid py-md-0 py-sm-3 py-5">
            <div className="relative ">
                <hr className="hr my-5 "/>
                <div className="thingonhr aligncenter">
                    <h1 className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+"blue meduim"}>{this.props.t('riadovertheyear')}</h1>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row justifycenter">


                <section className="timeline py-4">
                    <div className="container" >
                        {/* <div dangerouslySetInnerHTML={{__html:timeline}}></div> */}
                    {this.state.data_timeline.map((value, index) => {
                        if(value.description_ar==null){ var description_ar=value.description}
                        else var description_ar=value.description_ar
                        var start_url =  'https://rdcms.businessexchange.me/assets/';
                        var end_url='?key=system-large-cover';
                        var valueimg=value.image;
                        const imageurl=start_url+valueimg+end_url;

                        if(index%2==0){
                            return(
                                    <div key={['btn-2-'+index]} className='timeline-item'>
                                        <div className='timeline-img'></div>

                                        <div className='timeline-content timeline-card js--fadeInLeft '>
                                          {(value.image!=null)?<div className="timeline-img-header">
                                                <img src={""+imageurl+""} className="img-fluid cover w-100 h-100"/>
                                            </div>:null}  
                                            <div className='timelinedate px-4 rightzero'>
                                                <p className=' regular white mt-2 px-2'>{value.year}</p>
                                            </div>
                                            <div className='container py-4 row '>
                                                <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2'></div>
                                                {(value.image!=null)?(<div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10 py-0 text-right regular timelinecolor '> <p className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+'py-1 mb-2'}>{value.description}</p>
                                                </div>):(<div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10 py-5 text-right regular timelinecolor '>
                                                    <p className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+'py-1 mb-2'}>{(this.props.i18n.language=="ar")?description_ar:value.description}</p>
                                                </div>)}
                                            </div>
                                        </div>
                                    </div>)
                                }
                        else{
                            return(
                                    <div className='timeline-item'>
                                        <div className='timeline-img'></div>

                                        <div className='timeline-content timeline-card js--fadeInRight '>
                                        {(value.image!=null)?<div className="timeline-img-header">
                                                <img src={""+imageurl+""} className="img-fluid cover w-100 h-100"/>
                                            </div>:null}
                                            <div className='timelinedate px-4 leftzero'>
                                                 <p className=' regular white mt-2 px-2'>{value.year}</p>
                                            </div>
                                            <div className='container py-4 row '>
                                                <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1'></div>
                                                <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10 py-5 text-left regular timelinecolor '>
                                                    <p className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+'py-1 mb-2'}>{(this.props.i18n.language=="ar")?description_ar:value.description}</p>
                                                 </div>
                                            </div>
                                        </div>
                                    </div>)
                            }


                    })}
                    </div>
                </section>
            </div>
        </div>
      <Footer></Footer>
    </div>
  );}
}
export default withTranslation() (about);