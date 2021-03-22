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
          current: this.props.current,
          issearchopen: false,
        };
        // const {t,i18n}=useTranslation();
    }
    componentDidMount () {
        // {console.log(this.state.current)}
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
        
        
            var current = this.state.current
            // console.log(this.state.current);
            if(current!="index"){
                document.getElementById(current).style.color = "#081D54";
                document.getElementById(current).style.fontWeight = "500";
                document.getElementById(current).style.fontSize = "1em";
                document.getElementById(current).style["boxShadow"] = "0px 25x 20px rgba(0,0,0,0.38)"
            }
        
        $(document).ready(function(){
            $('.dropdown-toggle').dropdown()
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
        <div id="header" className={[(i18n.language=="ar")?"rtl direction:rtl ":" "]+"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-2 headermenu "}>
         <nav className={[(i18n.language=="ar")?"rtl  ":" "]+"navbar navbar-expand-lg navbar-light"}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5 ">
                    <li className="nav-item ">
                    <Link href="/about">
                        <a className="nav-link  headersubtitles px-3" href="/about">
                            <span id="about">{i18n.t("about")}</span>
                        </a>
                    </Link>
                    </li>
                    <li className="nav-item">
                         <Link href="/product">
                        <a className="nav-link  headersubtitles px-3" href="/product">
                            <span id="products">{i18n.t("products")}</span>
                        </a></Link>
                    </li>
                    <li className="nav-item">
                         <Link href="/media">
                        <a className="nav-link   headersubtitles px-3" href="/media">
                            <span id="media">{i18n.t("media")}</span>
                        </a></Link>
                    </li>
                    <li className="nav-item">
                         <Link href="/blog">
                        <a className="nav-link   px-3 headersubtitles" href="/blog">
                            <span id="careers">{i18n.t("careers")}</span>
                        </a></Link>
                    </li>
                    <li className="nav-item">
                         <Link href="/contact">
                        <a className="nav-link  headersubtitles px-3" href="/contact">
                            <span id="contact">{i18n.t("contact")}</span>
                        </a></Link>
                    </li>
                </ul>
                <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3"></div>
                <div className="searchgen col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 p-0">
                    <div className="container-fluid p-0">
                        <div className="row relative w-100 ">
                            <form className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10  jtfg">
                                <div className="container-fluid p-0 searchbox">
                                    <input type="search"   id="input" placeholder={i18n.t("search")} name="search" className={[(i18n.language=="ar")?"searchbox-inputleft ":"searchbox-input "]+" placeholder"}  required />
                                    {(this.state.issearchopen)? 
                                    <i  className="searchbox-icon fa fa-close " id="fa" onClick={this.handlefalse}></i>:
                                    <i  className="searchbox-icon fa fa-search " id="fa" onClick={this.handletrue}></i>}
                                </div>
                            </form>
                            <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 p-0 dropdown ">
                                <div className="container-fluid p-0">
                                    {(i18n.language=="ar")?
                                        <button class="dropbtn  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img src="./assets/images/dropdown.svg" class="img-fluid ml-2 cover"/>
                                            <span>{i18n.t("language")}</span>
                                        </button>
                                    :
                                        <button class="dropbtn  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span>LANGUAGE</span>
                                            <img src="./assets/images/dropdown.svg" class="img-fluid ml-2 cover"/>
                                        </button>
                                    }
                                    <div class="dropdown-menu dropdowncontent" id="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <p class="dropdown-item pointer"  onClick={()=>changeLanguage("ar")}>Arabic</p>
                                        <p class="dropdown-item pointer"  onClick={()=>changeLanguage("en")}>English</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div className=" col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 col-xxl-2 logowen">
            <Link href="/">
            <a href="index.html">
                <img src="./assets/images/riad_daoud_logo.svg" alt="logo name" className="img-fluid cover " />
            </a>
            </Link>
        </div>
    </div>
    )
}
}
 export default withTranslation()(Nav);