import Head from "next/head";
import Router, { useRouter } from "next/router"
import React, { useEffect } from 'react'
import Navigation from "./NAVIGATION/nav.js";
import Footer from "./FOOTER/footer.js";
import Link from 'next/link'
import DirectusSDK from '@directus/sdk-js';
import Api from './api/Api.js';
const directus = new DirectusSDK(Api.baseUrl);
import axios from 'axios';
// import styles from './style3.module.css';
import i18n from '../i18n';
import { withTranslation } from "react-i18next";
import { useTranslation } from 'react-i18next';
function Back() {
    const { t, i18n } = useTranslation();

    return <span> {t('back')} </span>
}
function App() {
    const { t, i18n } = useTranslation();

    return <span> {t('application')} </span>
}
function Ing() {
    const { t, i18n } = useTranslation();

    return <span> {t('ingredients')} </span>
}
function Moreinfo() {
    const { t, i18n } = useTranslation();

    return <span> {t('formoreinfo')} </span>
}
function Contactus() {
    const { t, i18n } = useTranslation();

    return <span> {t('contactus')} </span>
}
class proddetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data_idd: 0,
            brand: 0,
            prod: [],
            ppp: [],

        };

        this.getData = this.getData.bind(this);
    }
    // static async getStaticProps({ query }) {
    //     console.log(query)
    //     return { query };
    // }

    async getData() {

        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('data_id');
        // console.log(myParam)
        var datadirect = await directus.items('products').read({
            filter: {
                id: {
                    _eq: myParam,
                },
            }
        });
        // var datadirectallprod=await directus.items('products').read();
        var datadirectallprod = await directus.items('products_directus_files_2').read({
            filter: {
                products_id: {
                    _eq: myParam,
                },
            }
        });
        // i18n.on('languageChanged',location.reload());
        // var datadirectallprod=await directus.items('products').read();
        var testarabicbrand = await directus.items('brands').read()


        this.setState({ data: datadirect.data, prod: datadirectallprod.data });
        var datadirectbrand = await directus.items('brands').read(this.state.data.map((key, value) => { return key.brand })[0]);
        this.setState({ brand: datadirectbrand.data });
        this.loadc();
    }
    loadc() {
        $(document).ready(function () {

            var sync1 = $("#sync1");
            var sync2 = $("#sync2");
            var slidesPerPage = 4; //globaly define number of elements per page
            var syncedSecondary = true;

            sync1.owlCarousel({
                items: 1,
                slideSpeed: 2000,
                nav: true,
                autoplay: false,
                // dots: true,
                loop: true,
                responsiveRefreshRate: 200,
                navText: ['<img src="./assets/images/leftcarousel.svg" className="img-fluid cover  " aria-hidden="true" />', '<img src="./assets/images/rightcarousel.svg" className="img-fluid cover  " aria-hidden="true" />'],
            }).on('changed.owl.carousel', syncPosition);

            sync2
                .on('initialized.owl.carousel', function () {
                    sync2.find(".owl-item").eq(0).addClass("current");
                })
                .owlCarousel({
                    items: slidesPerPage,
                    // dots: true,
                    // nav: true,
                    smartSpeed: 200,
                    slideSpeed: 500,
                    slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
                    responsiveRefreshRate: 100
                }).on('changed.owl.carousel', syncPosition2);

            function syncPosition(el) {
                //if you set loop to false, you have to restore this next line
                //var current = el.item.index;

                //if you disable loop you have to comment this block
                var count = el.item.count - 1;
                var current = Math.round(el.item.index - (el.item.count / 2) - .5);

                if (current < 0) {
                    current = count;
                }
                if (current > count) {
                    current = 0;
                }

                //end block

                sync2
                    .find(".owl-item")
                    .removeClass("current")
                    .eq(current)
                    .addClass("current");
                var onscreen = sync2.find('.owl-item.active').length - 1;
                var start = sync2.find('.owl-item.active').first().index();
                var end = sync2.find('.owl-item.active').last().index();

                if (current > end) {
                    sync2.data('owl.carousel').to(current, 100, true);
                }
                if (current < start) {
                    sync2.data('owl.carousel').to(current - onscreen, 100, true);
                }
            }

            function syncPosition2(el) {
                if (syncedSecondary) {
                    var number = el.item.index;
                    sync1.data('owl.carousel').to(number, 100, true);
                }
            }

            sync2.on("click", ".owl-item", function (e) {
                e.preventDefault();
                var number = $(this).index();
                sync1.data('owl.carousel').to(number, 300, true);
            });
        });
        onscroll = function () {
            myFunctionn()
        };

        function myFunctionn() {
            var scrollTop = window.pageYOffset
            if (scrollTop >= 80) {
                document.getElementById("header").style.backgroundColor = "white";
            } else {
                document.getElementById("header").style.backgroundColor = "transparent";
            }
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
    }

    componentDidMount() {
        this.getData();
        onscroll = function () {
            myFunctionn()
        };

        function myFunctionn() {
            var scrollTop = window.pageYOffset
            if (scrollTop >= 80) {
                document.getElementById("header").style.backgroundColor = "white";
            } else {
                document.getElementById("header").style.backgroundColor = "transparent";
            }
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

    }

    render() {
        if (this.state.brand.title_ar == null) { var title_ar = this.state.brand.title }
        else var title_ar = this.state.brand.title_ar
        const aaa=this.state.data.map((key, value) => {return key.application})
        const aaaa=this.state.data.map((key, value) => {return key.ingredients})
        // if(aaa=="")alert("yes")
        // if(a==null)alert("null")
        // console.log(a)
        return (
            <div>
                <Navigation current="products"></Navigation>
                <div className={[(i18n.language == "ar") ? "rtl " : ""] + "container-fluid  relative"}>
                    <div className="row  ">
                        <div className={[(i18n.language == "ar") ? "ltr " : ""] + "col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5 product2backg px-0 "}>
                            {/* <Link href="/products">
                                <a href="/products" className={(i18n.language == "ar") ? "backmediaar" : " backmediaproduct"}>
                                    <div className="row ">
                                        {(i18n.language == "ar") ?
                                            <div className="container-fluid p-0 py-2 link centeredpag">
                                                <span className="px-3 regular footertext color_pagination px-2"><Back /></span>
                                                <img src="./assets/images/smallrightfleche.svg" className="img-fluid cover backmediafleche" />
                                            </div> :
                                            <div className="container-fluid p-0 py-2 linkleft centeredpag">
                                                <img src='./assets/images/smallleftfleche.svg' className="img-fluid cover backmediafleche" />
                                                <span className="px-2 regular footertext color_pagination px-2"><Back /></span>
                                            </div>}
                                    </div>
                                </a>
                            </Link> */}
                            <div className={[(i18n.language == "ar") ? "flexreverse ":" "]+"container-fluid h-100   px-0 sidemenudropdown  "}>
                               {/*  <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 p-0 h-100">
                                        <Link href="/products">
                                        <a href="/products" className={(i18n.language == "ar") ? "backmediaar" : " backmediaproduct"}>
                                            <div className="row ">
                                                {(i18n.language == "ar") ?
                                                    <div className="container-fluid p-0 py-2 link ">
                                                        <span className= {[(i18n.language == "ar")?"DroidKufi ":"gill regular "]+"  footertext color_pagination px-md-2 px-1"}><Back /></span>
                                                        <img src="./assets/images/smallrightfleche.svg" className="img-fluid cover backmediafleche" />
                                                    </div> :
                                                    <div className="container-fluid p-0 py-2 linkleft centeredpag">
                                                        <img src='./assets/images/smallleftfleche.svg' className="img-fluid cover backmediafleche" />
                                                        <span className= {[(i18n.language == "ar")?"DroidKufi ":"gill regular "]+"  footertext color_pagination px-md-2 px-1"}><Back /></span>
                                                    </div>}
                                            </div>
                                        </a>
                                    </Link>
                                </div>  */}
                                <div className="col-12 h-100 py-md-0 ">
                                    <div className="row h-100 ">
                                        <div className="col-12  px-0 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <div id="sync1" className="owl-carousel h-100 productcarousel owl-theme w-100 p-0">

                                                {
                                                    this.state.data.map((key, value) => {
                                                        var startb_url = 'https://admin.riaddaoud.com/assets/';
                                                        var end_url = '?key=system-large-cover';
                                                        var valueimg = key.image;
                                                        const imageurl = startb_url + valueimg;
                                                        return (
                                                            <div key={['btn-3-'+value]} className="item w-100"> <div className="carouselcenteredprod" style={{ height: "100%" }}><img src={"" + imageurl + ""} className="imgprod  img-fluid" /></div></div>
                                                        )
                                                    })
                                                }
                                                {
                                                    this.state.prod.map((key, value) => {
                                                        var startb_url = 'https://admin.riaddaoud.com/assets/';
                                                        var end_url = '?key=system-large-cover';
                                                        var valueimg = key.directus_files_id;
                                                        const imageurl = startb_url + valueimg;
                                                        return (
                                                            <div key={['btn-2-'+value]} className="item w-100"><div className="carouselcenteredprod" style={{ height: "100%" }}><img src={"" + imageurl + ""} className="imgprod  img-fluid" /></div></div>
                                                        )
                                                    })
                                                }

                                            </div>


                                            <div id="sync2" className="owl-carousel displaycarouselnone productcarousel secondcarousel owl-theme webkitalign">
                                                {
                                                    this.state.data.map((key, value) => {
                                                        var startb_url = 'https://admin.riaddaoud.com/assets/';
                                                        var endb_url = '?key=system-large-cover';
                                                        var valueimg = key.image;
                                                        const imageurl = startb_url + valueimg;
                                                        return (
                                                            <div key={['btn-1-'+value]} className="item w-100"><img src={"" + imageurl + ""} className="imgprodmini  img-fluid" /></div>
                                                        )
                                                    })
                                                }
                                                {
                                                    this.state.prod.map((key, value) => {
                                                        var startb_url = 'https://admin.riaddaoud.com/assets/';
                                                        var endb_url = '?key=system-large-cover';
                                                        var valueimg = key.directus_files_id;
                                                        const imageurl = startb_url + valueimg;
                                                        return (
                                                            <div key={['btn-4-'+value]} className="item w-100"><img src={"" + imageurl + ""} className="imgprodmini  img-fluid" /></div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7 col-xxl-7 py-3 px-1 mt-3">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-11 col-xl-11 col-xxl-11 p-5">
                                {/* <Link href="/products" > */}
                                <Link href={{ pathname: '/products', as: "/productdetail/" + this.state.brand.id, query: { data: this.state.brand.title, brand_id: this.state.brand.id } }}>
                                    <a href={{ pathname: '/products', as: "/productdetail/" + this.state.brand.id, query: { data: this.state.brand.title, brand_id: this.state.brand.id } }}>
                                        <h2 className={[(i18n.language == "ar") ? "textalignright DroidKufi " : "gill "] + "regular titlemedia p-0 pointer"}>
                                       
                                            {(i18n.language == "ar") ? title_ar : this.state.brand.title}
                                        </h2>
                                    </a>
                                </Link>
                                <span className={[(i18n.language == "ar") ? "textalignright DroidKufi " : "gill "] + "fontsizetimelinedate  blue regular lineheight d-flex"}>
                                    {this.state.data.map((key, value) => {
                                        if (key.title_ar == null) { var title_ar = key.title }
                                        else var title_ar = key.title_ar
                                        return (i18n.language == "ar") ? title_ar : key.title
                                    })}
                                </span>
                                <div className={[(i18n.language == "ar") ? "textalignright DroidKufi " : "gill light "] + "footertext lineheight  texttitlemedia py-3 mb-3"}>
                                    <p>
                                        {this.state.data.map((key, value) => {
                                            if (key.description_ar == null) { var description_ar = key.description }
                                            else var description_ar = key.description_ar
                                            return (i18n.language == "ar") ? description_ar : key.description
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <div className={(aaa=="")?"displaynoneee ":""}>
                                        <div className="collapseapplication panel-heading">
                                            <button className={[(i18n.language == "ar") ? "panel-titlear " : "panel-title "] + "btn px-0 backwhite  w-100"} data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                <p className={[(i18n.language == "ar") ? "textalignright DroidKufi " : "textalignleft gill "] + " fontsizetimelinedate textblack smalllineheight "}>
                                                    <App /> 
                                                </p>
                                            </button>
                                        </div>

                                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div className="card-body px-0">
                                                <div className={[(i18n.language == "ar") ? "textalignright  DroidKufi " : "gill light "] + "footertext lineheight  texttitlemedia lineheight"}>
                                                    <div dangerouslySetInnerHTML={{
                                                        __html: this.state.data.map((key, value) => {
                                                            if (key.application_ar == null) { var application_ar = key.application }
                                                            else var application_ar = key.application_ar
                                                            return (i18n.language == "ar") ? application_ar : key.application
                                                        })
                                                    }}></div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={[(aaa=="")?"":"displaynoneee "]+"p-5"}></div>
                                    <div className={[(aaaa=="")?"displaynoneee ":""]+"mt-3"}>
                                        <div id="headingTwo" className="collapseapplication panel-heading">
                                            <button className={[(i18n.language == "ar") ? "panel-titlear " : "panel-title "] + "btn backwhite px-0 collapsed w-100"} data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                <p className={[(i18n.language == "ar") ? "textalignright DroidKufi " : "textalignleft gill "] + " fontsizetimelinedate textblack smalllineheight "} >
                                                    <Ing />
                                                </p>
                                            </button>
                                        </div>
                                        <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                                            <div className="card-body px-0">
                                                <div className={[(i18n.language == "ar") ? "textalignright DroidKufi " : "gill light"] + "footertext lineheight  texttitlemedia lineheight"}>
                                                    <div dangerouslySetInnerHTML={{
                                                        __html: this.state.data.map((key, value) => {
                                                            if (key.ingredients_ar == null) { var ingredients_ar = key.ingredients }
                                                            else var ingredients_ar = key.ingredients_ar
                                                            return (i18n.language == "ar") ? ingredients_ar : key.ingredients
                                                        })
                                                    }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12  p-4"></div>
                            <div className={[(i18n.language == "ar") ? "textalignleft col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 col-xxl-11 mt-5 px-5 mb-0" : "col-10 col-sm-10 col-md-9 col-lg-9 col-xl-7 col-xxl-7 mt-5 px-5 mb-0"]}>
                                <p className={[(i18n.language == "ar")?"DroidKufi ":"gill lightitalic "]+" footertext"}>
                                    <Link href="/contact">
                                        <a href="/contact" className={[(i18n.language == "ar")?"DroidKufi ":"gill "]+"blue underlinetext"}>
                                            <Contactus />
                                        </a>
                                    </Link>
                                    <span className={[(i18n.language == "ar")?"DroidKufi ":"gill "]+"timelinecolor"}><Moreinfo /></span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default withTranslation()(proddetail);
