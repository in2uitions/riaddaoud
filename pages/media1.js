import Head from "next/head";
// import Header from './HEAD/head.js';
import Router ,{ useRouter } from "next/router"
import React, { useEffect } from 'react'
import Navigation from "./NAVIGATION/nav.js";
import Footer from "./FOOTER/footer.js";
import Link from 'next/link'
import axios from 'axios';
import i18n from '../i18n';
import { Translation } from 'react-i18next';
import DirectusSDK from '@directus/sdk-js';
import Api from './api/Api.js';
const directus = new DirectusSDK(Api.baseUrl);
import { useTranslation } from 'react-i18next';

function Prevarticle() {
    const { t, i18n } = useTranslation();
  
    return <span>{t('prevarticle')}</span>
  }
  function Back() {
    const { t, i18n } = useTranslation();
  
    return <span>{t('back')}</span>
  }
  function Nextarticle() {
    const { t, i18n } = useTranslation();
  
    return <span>{t('nextarticle')}</span>
  }
class media1 extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          datanext:[],
          dataprev:[],
          generaldata:[]

        };

    
        this.getData=this.getData.bind(this);
      }

      static async getInitialProps({query:query}) {
        var id=query.data_id
        var next=++id;
        var prev=0;
        if(id!=1)var prev=--id; 
        else var prev=1

      var datadirect=await directus.items('articles').read({filter: {
          id: {
              _eq: query.data_id,
            },
          }});
      var datadirectnext=await directus.items('articles').read({filter: {
           id: {
              _eq:next,
            },
       }});
    //    console.log("this is the prev id " +id)
       var datadirectprev=await directus.items('articles').read({filter: {
          id: {
             _eq: --prev,
           },
      }});
      var datadirectgeneral=await directus.items('articles').read();
  
      

        return { data: datadirect.data,datanext:datadirectnext.data,dataprev:datadirectprev.data,generaldata:datadirectgeneral.data}
      }
      async getData() {
         
        var datadirect=await directus.items('articles').read({filter: {
            id: {
                _eq: this.props.query.data_id,
              },
            }});
        var datadirectnext=await directus.items('articles').read({filter: {
             id: {
                _eq:next,
              },
         }});
        //  console.log("this is the prev id " +id)
         var datadirectprev=await directus.items('articles').read({filter: {
            id: {
               _eq: --prev,
             },
        }});
        var datadirectgeneral=await directus.items('articles').read();
    
        this.setState({ data: datadirect.data,datanext:datadirectnext.data,dataprev:datadirectprev.data,generaldata:datadirectgeneral.data});
        // Router.reload(window.location.pathname);
     
      }
      
    componentDidMount () {
     //   this.getData();
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
    var start_url =  'https://admin.riaddaoud.com/assets/';
    var end_url='?key=system-large-cover';
    var valueimg= this.props.data.map((value, index) => {return value.image});
    const imageurl=start_url+valueimg+end_url;
    const getnextslug=()=>{
        if(this.props.data.map((value, index) => {return value.id})==this.props.generaldata.length){return this.props.generaldata[this.props.generaldata.length-1].slug}
        return this.props.datanext.map((value, index) => {return value.slug})
   }
   const getprevslug=()=>{
    if(this.props.data.map((value, index) => {return value.id})==1){return this.props.generaldata[1].slug}
       return this.props.dataprev.map((value, index) => {return value.slug})
   }
   const getnextid=()=>{
    if(this.props.data.map((value, index) => {return value.id})==this.props.generaldata.length){return this.props.generaldata.length}
       return this.props.datanext.map((value, index) => {return value.id})
   }
   const getprevid=()=>{
    if(this.props.data.map((value, index) => {return value.id})==1){return 1}
    else return this.props.dataprev.map((value, index) => {return value.id})
   }  
//    if (value.author_ar == null) { var author_ar = value.author }
//    else var author_ar = value.author_ar
//    if (value.title_ar == null) { var title_ar = value.title }
//    else var title_ar = value.title_ar
//    if (value.brief_ar == null) { var brief_ar = value.brief }
//    else var brief_ar = value.title_ar
  return (
    <div>
      <Navigation current="media"></Navigation>
      <div className="container-fluid p-0 relative">
        <div className={[(i18n.language=="ar")?"rtl ":""]+"row  p-0 "}>
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5 p-0 relative">
                <img src={""+imageurl+""} className="img-fluid w-100 cover h-100" />
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 overlay"></div>
            </div>
            <Link href="/media">
            <a href="/media" className={(i18n.language=="ar")?"backmediaar":" backmedia"}>
                <div className="row ">
                    <div className="container-fluid p-0 py-2 linkleft centeredpag">
                        <img src={(i18n.language=="ar")?"./assets/images/smallrightfleche.svg":'./assets/images/smallleftfleche.svg'} className="img-fluid cover backmediafleche" />
                        <span className={[(i18n.language=="ar")?"px-3 DroidKufi":"px-2 gill "]+" regular footertext color_pagination px-2"}><Back /></span>
                </div>
                </div>
            </a>
            </Link>
            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 col-xxl-7 p-4 mt-5">
                <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 col-xxl-11 p-5">
                    <h1 className={[(i18n.language=="ar")?"textalignright DroidKufi ":" gill "]+"titlemedia lineheight meduim"}>{this.props.data.map((value, index) => {
                        if (value.title_ar == null) { var title_ar = value.title }
                        else var title_ar = value.title_ar
                        return  (i18n.language=="ar")?title_ar:value.title
                        })}
                    </h1>
                    <h3 className={[(i18n.language=="ar")?"textalignright DroidKufi ":"text-left gill "]+"footertext  blue mt-2 regular py-2 mb-3"}>{this.props.data.map((value, index) => {return value.date})}
                    </h3>
                    <div className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+"footertext light texttitlemedia lineheightmed"}>
                        <div className={[(i18n.language=="ar")?"textalignright ":""]+"light texttitlemedia lineheightmed w-100"}>
                        {this.props.data.map((value, index) => {
                            if (value.description_ar == null ||value.description_ar == '') { var description_ar = value.description }
                            else var description_ar = value.description_ar
                            return  (i18n.language=="ar")?(<div key={['btn-3-'+index]} className="w-100 w74" dangerouslySetInnerHTML={{__html:description_ar}}></div>):(<div key={['btn-5-'+index]} className="w-100 w74" dangerouslySetInnerHTML={{__html:value.description}}></div>)
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 px-4 py-2 mt-5 ">
                    <div className="container-fluid pt-4">
                        <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"></div>
                            <div className="medianext col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 ">
                                <Link href={{ pathname: '/media1' , as:"/media1/"+getprevid(), query: { data:getprevslug(),data_id:getprevid() }  }} >
                                {(i18n.language=="ar")?
                                    <a href={{ pathname: '/media1' , as:"/media1/"+getprevid(), query: { data:getprevslug(),data_id:getprevid() }  }} className='linkleft blue footertext italic centeredpag'>
                                        <img src='./assets/images/smallrightfleche.svg' />
                                        <span className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+'mr-3'}><Prevarticle /></span>
                                    </a>
                                    :
                                    <a href={{ pathname: '/media1' , as:"/media1/"+getprevid(), query: { data:getprevslug(),data_id:getprevid() }  }} className='linkleft blue footertext italic centeredpag'>
                                        <img src='./assets/images/smallleftfleche.svg' /><span className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+'ml-2'}>
                                        <Prevarticle /></span>
                                    </a>
                                }
                                </Link>
                                <Link href={{ pathname: '/media1' , as:"/media1/"+getnextid(), query: { data:getnextslug(),data_id:getnextid() }  }} >
                                {(i18n.language=="ar")?
                                    <a href={{ pathname: '/media1' , as:"/media1/"+getnextid(), query: { data:getnextslug(),data_id:getnextid() }  }} className='link blue footertext italic centeredpag'>
                                        <span  className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+'ml-2'}>
                                       <Nextarticle /></span>
                                        <img src='./assets/images/smallleftfleche.svg' />
                                    </a>
                                    :
                                     <a href={{ pathname: '/media1' , as:"/media1/"+getnextid(), query: { data:getnextslug(),data_id:getnextid() }  }} className='link blue footertext italic centeredpag'>
                                     <span  className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+'mr-2'}>
                                    <Nextarticle /></span>
                                     <img src='./assets/images/smallrightfleche.svg' />
                                 </a>
                                }
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      <Footer></Footer>
    </div>
  );}
}
export default media1;