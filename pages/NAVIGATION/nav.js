import Head from 'next/head';
import Link from 'next/link'
import React from 'react';
import { withTranslation } from "react-i18next";
import i18n from '../../i18n';
// const {t}=useTranslation();
const changeLanguage =(ln)=>{
    i18n.changeLanguage(ln);
    // console.log(ln);
}
class Nav extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          current:  this.props.current,
          issearchopen: false,
        };
        // const {t,i18n}=useTranslation();
    }
    componentDidMount () {
        // {console.log(this.state.current)}
        const menuBtn = document.querySelector(".menu-icon");
        const searchBtn = document.querySelector(".search-icon");
        const cancelBtn = document.querySelector(".cancel-icon");
        const items = document.querySelector(".nav-items");
        const form = document.querySelector("form");
        menuBtn.onclick = ()=>{
          items.classList.toggle("active");
          menuBtn.classList.toggle("hide");
        //   searchBtn.classList.toggle("hide");
        //   cancelBtn.classList.toggle("show");
        }
        cancelBtn.onclick = ()=>{
            // items.classList.toggle("active");
            // menuBtn.classList.add("hide");
            // searchBtn.classList.toggle("hide");
            // cancelBtn.classList.toggle("show");
            form.classList.toggle("active");
            // cancelBtn.style.color = "#ff3d00";
          }
        searchBtn.onclick = ()=>{
          form.classList.toggle("active");
        //   searchBtn.classList.toggle("hide");
        //   cancelBtn.classList.toggle("show");
        }
        $(document).ready(function() {
            var submitIcon = $('.searchbox-icon');
            var inputBox = $('.searchbox-input');
            var searchBox = $('.searchbox');
            var isOpen = false;
            $('.dropdown-toggle').dropdown()
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
                    // $('.searchbox-icon').css('display', 'block');
                    submitIcon.click();
                }
            });
        });
        onscroll = function () {
            myFunctionn();
          };
      
          function myFunctionn() {
            var scrollTop = window.pageYOffset;
            if (scrollTop >= 100) {
              document.getElementById("header").style.backgroundColor = "white";
            } else {
              document.getElementById("header").style.backgroundColor = "transparent";
            }
          }
          var current = this.state.current
          // console.log(this.state.current);
          if(current!="index"){
              document.getElementById(current).style.color = "#081D54";
              document.getElementById(current).style.fontWeight = "500";
              document.getElementById(current).style.fontSize = "1em";
              document.getElementById(current).style["boxShadow"] = "0px 25x 20px rgba(0,0,0,0.38)"
          }
        //   alert(document.getElementById("dropdown-menu").classList.value)
        
        $(document).ready(function(){
            $('.dropdown-toggle').dropdown()
        });
        $(function () {
            $(".dropdown-menu > li  a").click(function () {
                console.log("clicked");
                return false;
            });
        });
    }
    
handlefalse = () => {
    this.setState({ issearchopen: false })
  }
  
handletrue = () => {
    this.setState({ issearchopen: true })
  }
  
    render(){
 
    return(
        <div id="header" className={[(i18n.language=="ar")?"rtl direction:rtl ":" "]+"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-2 headermenu p-md-1 p-0"}>
        <nav  className={[(i18n.language=="ar")?"rtl direction:rtl ":" "]+"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12  py-2 px-0 "}>
            <div class={[(i18n.language=="ar")?"textalignright ":" "]+"menu-icon navbar-toggler  col-2 col-md-5"}>
                <span class="fas fa-bars"></span></div>
                <div class="nav-items col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <li className="py-1 py-md-0"><Link href="/about">
                        <a className={[(i18n.language=="ar")?"DroidKufi ":"gill  "]+"  headersubtitles px-lg-3 px-2 "} href="/about">
                            <span id="about">{i18n.t("about")}</span>
                        </a>
                    </Link></li>
                    <li className="py-1 py-md-0"><Link href="/product">
                    <a className={[(i18n.language=="ar")?"DroidKufi ":"gill  "]+"  headersubtitles px-lg-3 px-2"} href="/product">
                        <span id="products">{i18n.t("products")}</span>
                    </a></Link></li>
                    <li className="py-1 py-md-0"><Link href="/media">
                    <a className={[(i18n.language=="ar")?"DroidKufi ":"gill  "]+"  headersubtitles px-lg-3 px-2"} href="/media">
                        <span id="media">{i18n.t("media")}</span>
                    </a></Link></li>
                    <li className="py-1 py-md-0"><Link href="/blog">
                    <a className={[(i18n.language=="ar")?"DroidKufi ":"gill  "]+"   px-lg-3 px-2 headersubtitles"} href="/blog">
                        <span id="careers">{i18n.t("careers")}</span>
                    </a></Link></li>
                    <li className="py-1 py-md-0"><Link href="/contact">
                    <a className={[(i18n.language=="ar")?"DroidKufi ":"gill  "]+"  headersubtitles px-lg-3 px-2"} href="/contact">
                        <span id="contact">{i18n.t("contact")}</span>
                    </a></Link></li>
                    <div className="makeitdesp aligncenter">
                         <hr className="" />
                                <span className={[(i18n.language=="ar")?"DroidKufi ":"gill  "]+" "}>{i18n.t("language")}</span>
                        {/* <ul > */}
                        <p className={[(i18n.language=="ar")?"DroidKufi ":"gill  "]+"pointer  font_size_med mt-4"}  onClick={()=>changeLanguage("ar")}>{i18n.t("arabic")}</p>
                        <p className={[(i18n.language=="ar")?"DroidKufi ":"gill  "]+"pointer  font_size_med mt-2"}  onClick={()=>changeLanguage("en")}>{i18n.t("english")}</p>
                        {/* </ul> */}
                    </div>
                </div>
            <div class="logo col-8 col-md-4 textaligncenter">
            <Link href="/">
                <a href="index.html">
                    <img src="./assets/images/riad_daoud_logo.svg" alt="logo name" className="img-fluid contain logosheight" />
                </a>
                </Link>
            </div>
            
            {/* <div className="col-1"></div> */}
            <div class={[(i18n.language=="ar")?"textalignleftmenu ":" "]+"search-icon col-2 col-md-5"}>
            <span class="fas fa-search"></span></div>
            <div class="cancel-icon">
            <span class="fas fa-times"></span></div>
            <div className=" doneee col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                <div className={[(i18n.language=="ar")?"floatsearchleft ":"  "]+" container-fluid p-0 searchbox "}>
                    <input type="search"   id="input" placeholder={i18n.t("search")} name="search" className={[(i18n.language=="ar")?"searchbox-inputleft ":"searchbox-input "]+" placeholder"}  required />
                    {(this.state.issearchopen)? 
                    <i  className="searchbox-icon fa fa-close " id="fa" onClick={this.handlefalse}></i>:
                    <i  className="searchbox-icon fa fa-search " id="fa" onClick={this.handletrue}></i>}
                </div>
            </div>
            <form action="#" className={[(i18n.language=="ar")?"arabic ":""]+""}>
                    <input type="search" className="search-data" placeholder={i18n.t("search")} required/>
                    <button type="submit" className="fas fa-search"></button>
            </form>
            <div className="dropdown col-1 p-0 makeitapp  ">
                <button className="  dropdown-toggle p-0  headersubtitleslan" type="button" data-toggle="dropdown">
                        <span className={[(i18n.language=="ar")?"DroidKufi ":"gill  "]+" "}>{i18n.t("language")}<img src="./assets/images/dropdown.svg" className="img-fluid ml-1 verbaseline  cover"/></span>
                </button>
                <ul className="dropdown-menu">
                <p className={[(i18n.language=="ar")?"DroidKufi ":"gill  "]+"dropdown-item pointer  font_size_med"}  onClick={()=>changeLanguage("ar")}>{i18n.t("arabic")}</p>
                    <p className={[(i18n.language=="ar")?"DroidKufi ":"gill  "]+"dropdown-item pointer  font_size_med"}  onClick={()=>changeLanguage("en")}>{i18n.t("english")}</p>
                </ul>
            </div>
</nav>
</div>


    )
}
}
 export default withTranslation()(Nav);
