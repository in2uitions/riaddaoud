import Head from "next/head";
// import Header from './HEAD/head.js';
import React from 'react';
import Link from 'next/link'
import Navigation from "./NAVIGATION/nav.js";
import Footer from "./FOOTER/footer.js";
import axios from 'axios';
// import styles from './style3.module.css';
import DirectusSDK from '@directus/sdk-js';
const directus = new DirectusSDK('https://rdcms.businessexchange.me/')
import { withTranslation } from "react-i18next";
class media extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            databox: [],
            currentpage: 1,
            paginationarray: [],
            paginationarrayforprod: [],

        };

        this.getData = this.getData.bind(this);
        this.step_one_of_afficherpaginationfilter = this.step_one_of_afficherpaginationfilter.bind(this);
        this.step_two_of_afficherpaginationfilter = this.step_two_of_afficherpaginationfilter.bind(this);
    }

    async getData() {
        var datadirect = await directus.items('articles').read();
        var datadirectbox = await directus.items('backgrounds').read({
            filter: {
                target_page: {
                    "_contains": "media",
                }
            }
        });





        this.setState({ data: datadirect.data, databox: datadirectbox.data, paginationarray: datadirect.data.reverse() });
        this.loadAnim();
    }
    loadAnim() {

        window.sr = ScrollReveal();

        if ($(window).width() < 768) {

        } else {

            sr.reveal('.js--fadeInTop', {
                origin: 'bottom',
                distance: '300px',
                easing: 'ease-in-out',
                duration: 800,
            });
        }

        sr.reveal('.js--fadeInTop', {
            origin: 'bottom',
            distance: '300px',
            easing: 'ease-in-out',
            duration: 800,
        });

    };


    componentDidMount() {
        this.getData();
        onscroll = function () {
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

        function myFunction() {
            document.getElementById("myDropdown").classList.toggle("show");
        }

        // Close the dropdown if the user clicks outside of it
        window.onclick = function (event) {
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
        $(document).ready(function () {
            var submitIcon = $('.searchbox-icon');
            var inputBox = $('.searchbox-input');
            var searchBox = $('.searchbox');
            var isOpen = false;
            submitIcon.click(function () {
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
            submitIcon.mouseup(function () {
                return false;
            });
            searchBox.mouseup(function () {
                return false;
            });
            $(document).mouseup(function () {
                if (isOpen == true) {
                    $('.searchbox-icon').css('display', 'block');
                    submitIcon.click();
                }
            });
        });

    }
    step_two_of_afficherpaginationfilter = (page) => {
        const end = page * 4
        const start = end - 4
        var paging = this.state.paginationarray.slice(start, end)
        this.setState({ paginationarrayforprod: paging, currentpage: page })


    }
    step_one_of_afficherpaginationfilter = (page) => {
        this.setState({ paginationarray: this.state.data }, () => { this.step_two_of_afficherpaginationfilter(page) })
    }
    render() {
        var ln = this.state.data.length;
        var pages = ln / 4;
        var total = pages;
        var totalpages = 0
        if (total % 1 != 0) { totalpages = Math.floor(total) + 1; }
        else { totalpages = Math.floor(total); }
        var arraypages = [];
        var i = 0, len = totalpages;
        while (++i <= len) arraypages.push(i);
        // console.log(this.state.paginationarray)
        // console.log(this.state.paginationarrayforprod)
        var a = [];
        for (const i in this.state.databox[0]) {
            a[i] = this.state.databox[0][i];
        }
        var startb_url = 'https://rdcms.businessexchange.me/assets/';
        var endb_url = '?key=system-large-cover';
        var valuebackimg = a.image;
        const imagbackeurl = startb_url + valuebackimg + endb_url;
        if (a.box_title_ar == null) { var box_title_ar = a.box_title }
        else var box_title_ar = a.box_title_ar
        if (a.box_description_ar == null) { var box_description_ar = a.box_description }
        else var box_description_ar = a.box_description_ar
        return (
            <div>
                <Navigation current="media"></Navigation>
                <div>
                    <div className="container-fluid p-0 parallax" style={{ backgroundImage: 'url(' + imagbackeurl + ')' }}>
                    </div>
                    <div className="container-fluid ">
                        <div className="row">
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3"></div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 aboutheader py-4 px-3">
                                <div className="container-fluid py-4 mb-4 ">
                                    <div className="row  py-4">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
                                            <h1 className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+"meduim white  aligncenter"}>{(this.props.i18n.language == "ar") ? box_title_ar : a.box_title}</h1>
                                        </div>
                                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
                                        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10  py-3">
                                            <div className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+"light white footertext  lineheightbig  gill  aligncenter"}>  {(this.props.i18n.language == "ar") ? box_description_ar : a.box_description}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-5"></div>
                <div className={[(this.props.i18n.language == "ar") ? " direction: rtl " : " "] + "container-fluid mt-5"}>
                    <div className="grid-container ">

                        {
                            (this.state.paginationarrayforprod.length == 0) ?
                                this.state.paginationarray.map((value, index) => {
                                    // console.log("fet")
                                    var start_url = 'https://rdcms.businessexchange.me/assets/';
                                    var end_url = '?key=system-large-cover';
                                    var valueimg = value.image;
                                    const imageurl = start_url + valueimg + end_url;
                                    if (value.author_ar == null) { var author_ar = value.author }
                                    else var author_ar = value.author_ar
                                    if (value.title_ar == null) { var title_ar = value.title }
                                    else var title_ar = value.title_ar
                                    if (value.brief_ar == null) { var brief_ar = value.brief }
                                    else var brief_ar = value.title_ar
                                    let nbr_of_place = index
                                    if (nbr_of_place < 4) {
                                        return (
                                            <div className="grid-item js--fadeInTop">
                                                <div className='container-fluid  '>
                                                    <div className='row '>
                                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0  '>
                                                            <div className='hiddenimg'>
                                                                <img src={"" + imageurl + ""} className='img-fluid img cover imgshake' />
                                                            </div>
                                                            <figcaption className={[(this.props.i18n.language == "ar") ? "textalignright " : ""] + 'mt-3'}>
                                                                <h3 className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+'proddatetitle  regular '}>
                                                                    <span className={[(this.props.i18n.language == "ar") ? "ml-2 DroidKufi " : "mr-2 gill "] + 'titlecolorprod  regular '}> {(this.props.i18n.language == "ar") ? author_ar : value.author}</span>
                                                                    <span className='blue gill regular '>{value.date}</span>
                                                                </h3>
                                                            </figcaption>
                                                        </div>
                                                        <div className={[(this.props.i18n.language == "ar") ? "textalignright " : ""] + 'row py-2 w-100'}>
                                                            <div className={[(this.props.i18n.language == "ar") ? "textalignright " : ""] + 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 w-100'}>
                                                                <h1 className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+'lineheight titlemedia meduim'}>{(this.props.i18n.language == "ar") ? title_ar : value.title}</h1>
                                                            </div>
                                                        </div>
                                                        <div className={[(this.props.i18n.language == "ar") ? "textalignright " : ""] + 'row py-2 w-100'}>
                                                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 h-100 w-100 '>
                                                                <p className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+'texttitlemedia lineheightbig footertext light w74 '}>
                                                                    {(this.props.i18n.language == "ar") ? brief_ar : value.brief}
                                                                </p>
                                                                <div className='container-fluid w-100'>
                                                                    <div className='row w-100'>
                                                                        <div className={(this.props.i18n.language == "ar") ? "" : 'col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 w-100'}>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={[(this.props.i18n.language == "ar") ? "textalignleft col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12  w-100" : " textalignright mediareadmore col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 w-100 "]}>
                                                            <Link href={{ pathname: '/media1', as: "/media1/", query: { data: value.slug, data_id: value.id } }}>
                                                                <a href={{ pathname: '/media1', as: "/media1/", query: { data: value.slug, data_id: value.id } }} className={[(this.props.i18n.language == "ar") ? " linkleft" : "link"]}>
                                                                    <div className='container-fluid p-0 w-100'>
                                                                        {(this.props.i18n.language == "ar") ?
                                                                            (<div className='row p-0 flexreverse '>
                                                                                <img src='./assets/images/smallleftfleche.svg' className='img-fluid contain' />
                                                                                <span className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+'px-2  footertext meditalic blue '}>{this.props.t("readmore")}</span>
                                                                            </div>)
                                                                            :
                                                                            (<div className='row p-0'>
                                                                                <span className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+'px-2  footertext meditalic blue '}>{this.props.t("readmore")}</span>
                                                                                <img src='./assets/images/smallrightfleche.svg' className='img-fluid contain' />
                                                                            </div>)}
                                                                    </div>
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    }

                                })
                                :
                                this.state.paginationarrayforprod.map((value, index) => {
                                    var start_url = 'https://rdcms.businessexchange.me/assets/';
                                    var end_url = '?key=system-large-cover';
                                    var valueimg = value.image;
                                    const imageurl = start_url + valueimg + end_url;
                                    if (value.author_ar == null) { var author_ar = value.author }
                                    else var author_ar = value.author_ar
                                    if (value.title_ar == null) { var title_ar = value.title }
                                    else var title_ar = value.title_ar
                                    if (value.brief_ar == null) { var brief_ar = value.brief }
                                    else var brief_ar = value.title_ar
                                    let nbr_of_place = index
                                    if (nbr_of_place < 4) {
                                        return (
                                            <div className="grid-item js--fadeInTop">
                                                <div className='container-fluid  '>
                                                    <div className='row '>
                                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0  '>
                                                            <div className='hiddenimg'>
                                                                <img src={"" + imageurl + ""} className='img-fluid img cover imgshake' />
                                                            </div>
                                                            <figcaption className={[(this.props.i18n.language == "ar") ? "textalignright " : ""] + 'mt-3'}>
                                                                <h3 className='proddatetitle gill regular '>
                                                                    <span className={[(this.props.i18n.language == "ar") ? "ml-2 DroidKufi " : "mr-2 gill "] + 'titlecolorprod gill regular '}> {(this.props.i18n.language == "ar") ? author_ar : value.author}</span>
                                                                    <span className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+'blue  regular '}>{value.date}</span>
                                                                </h3>
                                                            </figcaption>
                                                        </div>
                                                        <div className={[(this.props.i18n.language == "ar") ? "textalignright " : ""] + 'row py-2 w-100'}>
                                                            <div className={[(this.props.i18n.language == "ar") ? "textalignright " : ""] + 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 w-100'}>
                                                                <h1 className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+'lineheight titlemedia meduim'}>{(this.props.i18n.language == "ar") ? title_ar : value.title}</h1>
                                                            </div>
                                                        </div>
                                                        <div className={[(this.props.i18n.language == "ar") ? "textalignright " : ""] + 'row py-2 w-100'}>
                                                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 h-100 w-100'>
                                                                <p className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+'texttitlemedia lineheightbig footertext light w74 '}>
                                                                    {(this.props.i18n.language == "ar") ? brief_ar : value.brief}
                                                                </p>
                                                                <div className='container-fluid w-100'>
                                                                    <div className='row w-100'>
                                                                        <div className={(this.props.i18n.language == "ar") ? "" : 'col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 w-100'}>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className={[(this.props.i18n.language == "ar") ? "textalignleft col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12  w-100" : " textalignright mediareadmore col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12  w-100"]}>
                                                            <Link href={{ pathname: '/media1', as: "/media1/", query: { data: value.slug, data_id: value.id } }}>
                                                                <a href={{ pathname: '/media1', as: "/media1/", query: { data: value.slug, data_id: value.id } }} className={[(this.props.i18n.language == "ar") ? " linkleft" : "link"]}>
                                                                    <div className='container-fluid p-0 w-100'>
                                                                        {(this.props.i18n.language == "ar") ?
                                                                            (<div className='row p-0 flexreverse'>
                                                                                <img src='./assets/images/smallleftfleche.svg' className='img-fluid contain' />
                                                                                <span className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+'px-2 footertext meditalic blue '}>{this.props.t("readmore")}</span>
                                                                            </div>)
                                                                            :
                                                                            (<div className='row p-0'>
                                                                                <span className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+'px-2 footertext meditalic blue '}>{this.props.t("readmore")}</span>
                                                                                <img src='./assets/images/smallrightfleche.svg' className='img-fluid contain' />
                                                                            </div>)}
                                                                    </div>
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    }

                                })

                        }

                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-5 ">
                        <div className="row py-2">

                            <div className={[(this.props.i18n.language == "ar") ? "textalignleft flexreverse " : " textalignright "] + "col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 paginnext gill regular  "}>
                                {arraypages.map((key, value) => {
                                    return (
                                        <button className="color_pagination" onClick={() => this.step_one_of_afficherpaginationfilter(key)} id={"page" + key}>{key}</button>
                                    )
                                })}
                                {((arraypages.length == this.state.currentpage) ? <button className="blue" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage - 1)}>{this.props.t("back")}</button> : <button className="blue" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}>{this.props.t("next")}</button>)}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default withTranslation()(media);