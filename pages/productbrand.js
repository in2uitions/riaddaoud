import Head from "next/head";
// import Header from './HEAD/head.js';
import Link from 'next/link'
import React from 'react';
import Navigation from "./NAVIGATION/nav.js";
import Footer from "./FOOTER/footer.js";
import '@fortawesome/fontawesome-free/js/fontawesome';
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DirectusSDK from '@directus/sdk-js';
import Api from './api/Api.js';
const directus = new DirectusSDK(Api.baseUrl);
import axios from 'axios';
import { withTranslation } from "react-i18next";
// import styles from './style3.module.css';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
function Back() {
    const { t } = useTranslation();

    return <span> {t('back')} </span>
}
function Allcateg() {
    const { t } = useTranslation();

    return <span> {t('allcateg')} </span>
}
function Brand() {
    const { t } = useTranslation();

    return <span> {t('brand')} </span>
}
function BrowseCategories() {
    const { t } = useTranslation();

    return <span> {t('BrowseCategories')} </span>
}

function Subcateg() {
    const { t } = useTranslation();

    return <span> {t('subcateg')} </span>
}
function Clearfilters() {
    const { t } = useTranslation();

    return <span> {t('clearfilters')} </span>
}
function Of() {
    const { t } = useTranslation();

    return <span> {t('of')} </span>
}
function Showing() {
    const { t } = useTranslation();

    return <span> {t('Showing')} </span>
}
function Next() {
    const { t } = useTranslation();

    return <span> {t('next')} </span>
}
class product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categ: [],
            backg: [],
            specificbrand:[],
            subcateg: [],
            prod: [],
            filtering: [],
            paginationarray: [],
            paginationfilterarray: [],
            paginationsearcharray: [],
            paginationarrayforprod: [],
            paginationfilterarrayforprod: [],
            paginationarrayforsearchedprod: [],
            arrayid: [],
            arraycategid: [],
            brand: [],
            website_sett: [],
            product_nb_display: 0,
            isFilterPress: false,
            isbrandPress: false,
            isCategPress: false,
            isSearchPress: false,
            counter: 0,
            pages: 0,
            currentpage: 1,
            lastnmbrofprod: 0,
            firstnmbrofprod: 1,
            inputsearch: '',
            isvisible:true,
            searchedarray: [],
        }
        this.getData = this.getData.bind(this);
       
        this.step_one_of_afficherpaginationfilter = this.step_one_of_afficherpaginationfilter.bind(this);
        this.step_two_of_afficherpaginationfilter = this.step_two_of_afficherpaginationfilter.bind(this);
        this.filter = this.filter.bind(this);
    }
    static async getInitialProps({ query }) {
        return { query };
    }

    async getData() {
        var datadirectbackg = await directus.items('backgrounds').read({
            filter: {
                target_page: {
                    "_contains": "products",
                },
                title: {
                    "_eq": "productbrand",
                }
            }
        });
        var datadirectcateg = await directus.items('categories').read();
        var datadirectsubcateg = await directus.items('subcategories').read();
        var datadirectprod = await directus.items('products').read();
        var datadirectbrand = await directus.items('brands').read();
        var datadirectwebsetting = await directus.items('website_settings').read();
        var datadirectusspecificbrand= await directus.items('products').read({
            filter:{
                brand:{
                    _eq:this.props.query.data_id
                }
            }
        })


        this.setState({ categ: datadirectcateg.data,specificbrand:datadirectusspecificbrand.data, prod: datadirectprod.data, paginationarray: datadirectusspecificbrand.data, brand: datadirectbrand.data, backg: datadirectbackg.data, subcateg: datadirectsubcateg.data, website_sett: datadirectwebsetting.data }, () => { this.setState({ lastnmbrofprod: this.state.website_sett.products_display_nb }) });
        this.loadAnim();
    }
    loadAnim() {
        // for(var i = 1; document.getElementById("myCheck" + i) !== this.props.query.data_id; i++) {
        //     document.getElementById("myCheck" + i).disabled = true;
        //     }
        // document.getElementById("myCheck"+2).disabled = false
        // $("[id="+"myCheck"+1+"]").prop('checked', false);
        // // $("[id="+"myCheck"+2+"]").prop('checked', false);
        // $("[id="+"myCheck"+3+"]").prop('checked', false);
        // $("[id="+"myCheck"+4+"]").prop('checked', false);
        // $("[id="+"myCheck"+5+"]").prop('checked', false);
        // $("[id="+"myCheck"+6+"]").prop('checked', false);
        var fff='myCheck'+this.props.query.data_id
        $("[id="+fff+"]").prop('checked', true);
        $("[id='categ1']").hide();
        $("[id='categ2']").hide();
        $("[id='categ3']").hide();
        $("[id='categ4']").hide();
        $("[id='categ_mini1']").hide();
        $("[id='categ_mini2']").hide();
        $("[id='categ_mini3']").hide();
        $("[id='categ_mini4']").hide();
        $("#jquery_box_mini").change(function () {
            if (this.value == "4") {
                $("[id='categ_mini1']").hide();
                $("[id='categ_mini2']").hide();
                $("[id='categ_mini3']").hide();
                $("[id='categ_mini4']").show();
                document.getElementById("displaynoneee_mini").style.display="block"
            };
            if (this.value == "3") {
                $("[id='categ_mini1']").hide();
                $("[id='categ_mini2']").hide();
                $("[id='categ_mini3']").show();
                $("[id='categ_mini4']").hide();
                document.getElementById("displaynoneee_mini").style.display="block"
            };
            if (this.value == "2") {
                $("[id='categ_mini1']").hide();
                $("[id='categ_mini2']").show();
                $("[id='categ_mini3']").hide();
                $("[id='categ_mini4']").hide();
                document.getElementById("displaynoneee_mini").style.display="block"
            };
            if (this.value == "1") {
                $("[id='categ_mini1']").show();
                $("[id='categ_mini2']").hide();
                $("[id='categ_mini3']").hide();
                $("[id='categ_mini4']").hide();
                document.getElementById("displaynoneee_mini").style.display="block"
            };
            if (this.value == "all") {
                $("[id='categ_mini1']").hide();
                $("[id='categ_mini2']").hide();
                $("[id='categ_mini3']").hide();
                $("[id='categ_mini4']").hide();
                document.getElementById("displaynoneee_mini").style.display="none"
            };
        })

        $("#jquery_box").change(function () {

            if (this.value == "4") {
                $("[id='categ1']").hide();
                $("[id='categ2']").hide();
                $("[id='categ3']").hide();
                $("[id='categ4']").show();
                document.getElementById("displaynoneee").style.display="block"
                // console.log(document.getElementById("displaynoneee"))
            }

            if (this.value == "3") {
                $("[id='categ1']").hide();
                $("[id='categ2']").hide();
                $("[id='categ3']").show();
                $("[id='categ4']").hide();
                document.getElementById("displaynoneee").style.display="block"
            }
            if (this.value == "2") {
                $("[id='categ1']").hide();
                $("[id='categ2']").show();
                $("[id='categ3']").hide();
                $("[id='categ4']").hide();
                document.getElementById("displaynoneee").style.display="block"
            }
            if (this.value == "1") {
                $("[id='categ1']").show();
                $("[id='categ2']").hide();
                $("[id='categ3']").hide();
                $("[id='categ4']").hide();
                document.getElementById("displaynoneee").style.display="block"
            }
            if (this.value == "all") {
                $("[id='categ_mini1']").hide();
                $("[id='categ_mini2']").hide();
                $("[id='categ_mini3']").hide();
                $("[id='categ_mini4']").hide();
                document.getElementById("displaynoneee").style.display="none"
            };

        }
        


        )
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
        function openproduct(evt, productName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(productName).style.display = "block";
            evt.currentTarget.className += " active";
        }

        function opensubproduct(evt, subproductName) {
            var i, tabcontent, tablinks;
            subtabcontent = document.getElementsByClassName("subtabcontent");
            for (i = 0; i < subtabcontent.length; i++) {
                subtabcontent[i].style.display = "none";
            }
            subtablinks = document.getElementsByClassName("subtablinks");
            for (i = 0; i < subtablinks.length; i++) {
                subtablinks[i].className = subtablinks[i].className.replace(" active", "");
            }
            document.getElementById(subproductName).style.display = "block";
            evt.currentTarget.className += " active";
        }

        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }
        $(function () {

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
        const buttons = document.querySelectorAll(".subtablinks");
        const section = document.querySelectorAll(".thumb");
        // buttons.forEach(item => {
        //     item.addEventListener('click', () => {
        //         buttons.forEach(item => {
        //             item.className = "";
        //         });
        //         item.className = "active";
        //         let values = item.textContent;
        //         document.getElementById("myCheck").checked = true;
        //         section.forEach(show => {
        //             show.style.display = "none";
        //             if (show.getAttribute("data-id") === values || values === "All products") {
        //                 show.style.display = "block";
        //             }
        //         });
        //     });
        // });
    }


    componentDidMount() {
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
        }
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
        function openproduct(evt, productName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(productName).style.display = "block";
            evt.currentTarget.className += " active";
        }

        function opensubproduct(evt, subproductName) {
            var i, tabcontent, tablinks;
            subtabcontent = document.getElementsByClassName("subtabcontent");
            for (i = 0; i < subtabcontent.length; i++) {
                subtabcontent[i].style.display = "none";
            }
            subtablinks = document.getElementsByClassName("subtablinks");
            for (i = 0; i < subtablinks.length; i++) {
                subtablinks[i].className = subtablinks[i].className.replace(" active", "");
            }
            document.getElementById(subproductName).style.display = "block";
            evt.currentTarget.className += " active";
        }

        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }




    }
    step_two_of_afficherpaginationfilter = (page) => {
        const end = page * 4
        const start = end - 4
        var paging = this.state.paginationarray.slice(start, end)
        this.setState({ paginationarrayforprod: paging, currentpage: page })

    }
    step_one_of_afficherpaginationfilter = (page) => {
        this.setState({ paginationarray: this.state.specificbrand }, () => { this.step_two_of_afficherpaginationfilter(page) })
    }
    knowthelastelementrightnow = () => {
        //help now men aya element la aya element 3am bi bayen be kel page
        var a = ( this.state.specificbrand.length) - this.state.firstnmbrofprod
        if (a < this.state.website_sett.products_display_nb) {
            var result = this.state.firstnmbrofprod + a
            return result
        }
        else return this.state.firstnmbrofprod + this.state.website_sett.products_display_nb - 1
    }
    filter(event) {
        if (event.target.value == '') { this.setState({ inputsearch: event.target.value, isSearchPress: false }) }
        else {
            this.setState({ inputsearch: event.target.value, isSearchPress: true }, () => {
                var a = [];
                for (const x in this.state.prod) {
                    if (this.state.prod[x].title.toLowerCase().match(this.state.inputsearch.toLowerCase())) {
                        a.push(this.state.prod[x])
                    }
                }
                this.setState({ searchedarray: a })
            });
        }

    }

    render() {
        var startb_url = Api.baseUrl + 'assets/';
        var endb_url = '?key=system-large-cover';
        var valuebackimg = this.state.backg.map((key, value) => { return key.image });
        const imagbackeurl = startb_url + valuebackimg + endb_url;

        //get nmbr of pages for all items
        var ln = this.state.paginationarray.length;
        var pages = ln / this.state.website_sett.products_display_nb;
        var total = pages;
        var totalpages = 0
        if (total % 1 != 0) { totalpages = Math.floor(total) + 1; }
        else { totalpages = Math.floor(total); }
        var arraypages = [];
        var i = 0, len = totalpages;
        while (++i <= len) arraypages.push(i);
        // console.log(arraypages)
        //get nmbr of pages for filtered items
       

        //get nmbr of pages for searched items
        var ln = this.state.searchedarray.length;
        var pages = ln / this.state.website_sett.products_display_nb;
        var total = pages;
        var totalpages = 0
        if (total % 1 != 0) { totalpages = Math.floor(total) + 1; }
        else { totalpages = Math.floor(total); }
        var arraysearchedpages = [];
        var i = 0, len = totalpages;
        while (++i <= len) arraysearchedpages.push(i);
        var brandfiltered=this.state.brand.filter(item =>item.id==this.props.query.data_id)
        var newbrandfiltered=[]
        for(const x in brandfiltered){
            newbrandfiltered[x]=brandfiltered[x]
        }
        var backg=[];
            for(const i in this.state.backg[0]){
                backg[i]=this.state.backg[0][i];
            }
      
        
        return (
            <div >
                <Navigation current="products"></Navigation>
                    <div className="container-fluid p-0 parallax " style={{ backgroundImage: 'url(' + imagbackeurl + ')' }}>
                    </div>
                    <div className="container-fluid px-5 py-0">
                            <div className="row">
                                <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 "></div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 aboutheader py-5 p-0">
                                    <div className="container-fluid p-0 py-1">
                                        <div className="row py-4 ">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
                                                <h1 className={[(i18n.language=="ar")?"DroidKufi ":"gill meduim "]+" white  aligncenter"}>{newbrandfiltered.map((key,value)=>key.title)}</h1>
                                            </div>
                                            <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 "></div>
                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10  py-5">
                                                <p className={[(i18n.language=="ar")?"DroidKufi ":"gill light "]+" white footertext  aligncenter lineheight"}>{newbrandfiltered.map((key,value)=>key.description)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                         
                        </div>
                    <div>

                </div>
                <div className={[(i18n.language=="ar")?"rtl ":""]+"container-fluid py-4"} >
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
                        <div className="container-fluid p-0">
                            <div className="row ">
                                {/* <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3   px-md-4">
                                    <h4 className={[(i18n.language=="ar")?"textalignright DroidKufi ":"gill light "]+" text-lightgrey  "}><BrowseCategories /></h4>
                                </div> */}
                                <div className="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 col-xxl-9  ">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={[(i18n.language=="ar")?"rtl ":""]+"container-fluid px-4"}>
                    <div className="row ">
                        <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 py-0 px-4 show ">
                            
                           <Link href="/products">
                                <a href="/products" className=" backmediaprod my-3" style={{position:'relative',top:0}}>
                                <div className="row ">
                                        <div className="container-fluid p-0 py-2 linkleft">
                                        <img src='./assets/images/smallleftfleche.svg' className="img-fluid cover backmediafleche" />
                                        <span className={[(i18n.language=="ar")?"DroidKufi ":"gill regular "]+"  footertext color_pagination px-2"}><Back /></span>
                                    </div>
                                    </div>
                                </a>
                            </Link>
                            <div className="panel-group borders" id="modal" role="tablist" aria-multiselectable="true">
                                <div className="panel">
                                    <div className="col-md-12 visible-xs">
                                        <div className="navbar-expand-lg">
                                            {/* <button data-parent="#modal" className="navbar-toggler textaligncenter w-100" type="button" data-toggle="modal" data-target="#myModal" aria-expanded="false" aria-label="Toggle navigation" aria-controls="navbarSupportedContent">
                                                <span>FILTER</span>
                                            </button> */}
                                            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                                                <div className="modal-dialog " role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <p>FILTER</p>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="container-fluid  p-0 div-collapse collapse colapse2" id="collapse1">

                                                                {/* <div className="container-fluid p-0 ">
                                                                    <div className="row">
                                                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 "> */}
                                                                            {/* <div > */}
                                                                            <select name="jquery_box_mini" id="jquery_box_mini" className="py-4 textaligncenter w-100  backgroundblue">
                                                                                <option className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+"selectoption container-fluid px-2 textalignleft  font_size"} value={"all"}>
                                                                                {  (i18n.language=="ar") ? "جميع الفئات" : "ALL CATEGORIES"}
                                                                                </option>
                                                                                {this.state.categ.map((key, value) => {
                                                                                    if (key.title_ar == null) { var title_ar = key.title }
                                                                                    else var title_ar = key.title_ar 

                                                                                    return (
                                                                                        <option key={['btn-1-'+value]} className={[(i18n.language=="ar")?"textalignright DroidKufi ":"meduim gill "]+"selectoption container-fluid px-2 textalignleft  font_size"} value={"" + key.id + ""}>
                                                                                            {  (i18n.language=="ar") ? title_ar : key.title}
                                                                                        </option>

                                                                                    )

                                                                                })}
                                                                                <img src="./assets/images/productdropdown.svg" className="img-fluid cover" />
                                                                            </select>
                                                                            {/* </div> */}
                                                                        </div>
                                                                    {/* </div>
                                                                </div>
                                                            </div> */}

                                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-2 mt-4 px-4 displaynoneee" id="displaynoneee_mini">
                                                                <h3 className={[(i18n.language=="ar")?"textalignright DroidKufi ":"gill  "]+"blue py-2"}><Subcateg /></h3>
                                                                {this.state.categ.map((key, value) => {
                                                                    let a = this.state.subcateg.filter(keyy => { return keyy.category == key.id })
                                                                    return (a.map((keys, value) => {
                                                                        if (keys.title_ar == null) { var title_ar = keys.title }
                                                                        else var title_ar = keys.title_ar 
                                                                        return (
                                                                            <div key={['btn-10-'+value]} className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-1" id={"categ_mini" + keys.category + ""} >
                                                                                <div className="container-fluid p-0">
                                                                                    <div className="row">
                                                                                        <div className={[(i18n.language=="ar")?"textalignright  ":"mr-3  "]+"col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 p-0 "}>
                                                                                            <label className="checkbox h-100 w-100 p-0 " >
                                                                                                <input type="checkbox" id="categCheck" name={"" + key.title + ""} value={"" + key.title + ""}  disabled={true} />
                                                                                            </label>
                                                                                        </div>
                                                                                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-0 subtablinks">
                                                                                            <h3 className={[(i18n.language=="ar")?"textalignright DroidKufi ":"gill light "]+" text-lightgrey contents "}>
                                                                                                {  (i18n.language=="ar") ? title_ar : keys.title}
                                                                                                {/* {"" + keys.category + ""} */}
                                                                                                 </h3>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }))
                                                                })}
                                                            </div>
                                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12  mt-4 mb-4 px-4">
                                                                <h3 className={[(i18n.language=="ar")?"textalignright DroidKufi ":"gill  meduim "]+" blue"}><Brand /></h3>
                                                            </div>
                                                            {newbrandfiltered.map((key, value) => {
                                                                if (key.title_ar == null) { var title_ar = key.title }
                                                                else var title_ar = key.title_ar 
                                                                return (
                                                                    <div key={['btn-9-'+value]} className={[(i18n.language=="ar")?"textalignright ":""]+"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-1 "}>
                                                                        <div className="container-fluid p-0">
                                                                            <div className="row">
                                                                                <div className={[(18n.language=="ar")?"textalignright ml-3 ":"mr-3  "]+"col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 p-0 px-4"}>
                                                                                    <label className="checkbox h-100 w-100 p-0 " >
                                                                                        <input type="checkbox" id={"myCheck"+key.id} name={"" + key.title + ""} value={"" + key.title + ""} disabled={true} />
                                                                                    </label>
                                                                                </div>

                                                                                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-0 subtablinks">
                                                                                    <h3 className={[(i18n.language=="ar")?"textalignright DroidKufi ":"gill light "]+" text-lightgrey contents "}>{  (i18n.language=="ar") ? title_ar : key.title}</h3>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                            <div className="textaligncenter py-4 ">
                                                                <button className="clearfilterbtn textaligncenter px-5 py-2" >
                                                                    <h3 className={[(i18n.language=="ar")?"textalignrightDroidKufi ":"gill "]+" light  text-lightgrey px-4"}><Clearfilters /></h3>
                                                                </button>
                                                            </div>

                                                        </div>

                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="container-fluid  p-0 div-collapse collapse" id="collapse1">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
                                            <div className="container-fluid p-0  ">
                                                <div className="row">
                                                    <div className={[(i18n.language=="ar")?"textalignright ":""]+"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 "}>
                                                        {/* <div > */}
                                                        <select name="jquery_box" id="jquery_box" className="py-4  w-100 backgroundblue px-3 pointer">
                                                            
                                                                <option className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+"px-4 selectoption textaligncenter meduim font_size"} value={"all"}>
                                                                {  (i18n.language=="ar") ? "جميع الفئات" : "ALL CATEGORIES"}
                                                                </option>
                                                            {this.state.categ.map((key, value) => {
                                                                 if (key.title_ar == null) { var title_ar = key.title }
                                                                 else var title_ar = key.title_ar 

                                                                return (
                                                                    <option key={['btn-8-'+value]} className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+" px-4 selectoption textaligncenter meduim font_size"} value={"" + key.id + ""}>
                                                                        {  (i18n.language=="ar") ? title_ar : key.title}
                                                                    </option>

                                                                )

                                                            })}
                                                            <img src="./assets/images/productdropdown.svg" className="img-fluid cover" />
                                                        </select>
                                                        {/* </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" displaynoneee col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-2 mt-4 px-4" id="displaynoneee">
                                            <h3 className={[(i18n.language=="ar")?"textalignright DroidKufi ":"meduim gill " ]+"blue  py-2"}><Subcateg /></h3>
                                            {this.state.categ.map((key, value) => {
                                                let a = this.state.subcateg.filter(keyy => { return keyy.category == key.id })
                                                
                                                return (a.map((keys, value) => {
                                                    if (keys.title_ar == null) { var title_ar = keys.title }
                                                    else var title_ar = keys.title_ar 
                                                    return (
                                                        <div key={['btn-7-'+value]} className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-1" id={"categ" + keys.category + ""} >
                                                            <div className="container-fluid p-0">
                                                                <div className="row">
                                                                    <div className={[(i18n.language=="ar")?" ":"mr-3 "]+"col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 p-0  "}>
                                                                        <label className="checkbox h-100 w-100 p-0 " >
                                                                            <input type="checkbox" id="categCheck" name={"" + key.title + ""} value={"" + key.title + ""}  disabled={true}/>
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-0 subtablinks">
                                                                        <h3 className={[(i18n.language=="ar")?"textalignright DroidKufi ":"light gill "]+" text-lightgrey contents "}>{  (i18n.language=="ar") ? title_ar : keys.title} </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }))
                                            })}
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12  mt-4 mb-4 px-4">
                                            <h3 className={[(i18n.language=="ar")?"textalignright ":""]+"meduim blue"}><Brand /></h3>
                                        </div>
                                       
                                        {newbrandfiltered.map((key, value) => {
                                            if (key.title_ar == null) { var title_ar = key.title }
                                            else var title_ar = key.title_ar 
                                            return (
                                                <div key={['btn-6-'+value]} className={[(i18n.language=="ar")?"textalignright ":""]+"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-1 "}>
                                                    <div className="container-fluid p-0">
                                                        <div className="row">
                                                            <div className={[(i18n.language=="ar")?"textalignright ml-3 ":"mr-3 "]+"col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 p-0 px-4"}>
                                                                <label className="checkbox h-100 w-100 p-0 " >
                                                                    <input type="checkbox"  id={"myCheck"+key.id} name={"" + key.title + ""} value={"" + key.title + ""} disabled={true} />
                                                                </label>
                                                            </div>

                                                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-0 subtablinks">
                                                                <h3 className={[(i18n.language=="ar")?"textalignright DroidKufi ":"light gill "]+" text-lightgrey contents "}>
                                                                {  (i18n.language=="ar") ? title_ar : key.title}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <div className="textaligncenter py-4 ">
                                            <button className="clearfilterbtn textaligncenter px-5 py-2" >
                                                <h3 className={[(i18n.language=="ar")?"DroidKufi ":"gill light "]+"   text-lightgrey px-4"}><Clearfilters /></h3>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9 col-xxl-9 mt-2 ">
                                <div className="container-fluid productboxheight py-4">
                                        <div className="row ">
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-0 showingaligncenter flexend ">
                                                <h4 className={[(i18n.language=="ar")?"textalignright DroidKufi ":"gill light "]+" text-lightgrey  "}>
                                               <Showing />
                                        {" " + 
                                        (this.state.firstnmbrofprod)
                                        
                                        }
                                        –
                                        {
                                                        " " + this.knowthelastelementrightnow() + " "

                                                    }
                                        <Of />
                                        {" " + (this.state.specificbrand.length)}  
                                    </h4>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-0 ">
                                                <form action="" className="row relative ">
                                                    <div className="col-11 col-sm-11 col-md-12 col-lg-12 col-xl-12 col-xxl-12  w-100 ">
                                                        <div className={[(i18n.language=="ar")?"textalignright DroidKufi ":"gill light "]+"relative texttitlemedia  font_size   h-100"}>
                                                            {/* <input type="text" id='search-input' name="search1" placeholder="Search Products" className="pl-5  texttitlemedia footertext light gill w-100" /> */}
                                                            
                                                            <input type="text" id="search "
                                                             placeholder={(i18n.language=="ar")?"البحث عن المنتجات":"SearchProducts"} className={[(i18n.language=="ar")?"pr-5 DroidKufi ":"pl-5 gill light "]+"   searchnewprodbordure mb-1 py-1 py-md-0 texttitlemedia footertext   w-100"}
                                                                value={this.state.inputsearch} onChange={this.filter} />
                                                            <FontAwesomeIcon style={{ height: "12px" }} className="searchiconnewprod" icon={faSearch} />
                                                             {/* <FontAwesomeIcon style={{ height: "12px" }} className="searchiconsecnewprod" icon={faFilter} /> */}
                                                        </div>
                                                    </div>
                                                    <div className="col-1 p-0 makeitdisapppp"><button data-parent="#modal" className="navbar-toggler py-2  textaligncenter w-100" type="button" data-toggle="modal" data-target="#myModal" aria-expanded="false" aria-label="Toggle navigation" aria-controls="navbarSupportedContent"><FontAwesomeIcon style={{ height: "12px" }} className="searchiconsecnewprod" icon={faFilter}/></button></div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                            <section className="mt-4 mt-md-2">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 ">
                                    <div className="container-fluid p-0 row">

                                    {   (this.state.paginationarrayforprod.length == 0) ?
                                                    this.state.paginationarray.map((key, value) => {
                                                        var end_url = '?w=200&h=250 ';
                                                        var valueimg = key.image;
                                                        const imageurl = startb_url + valueimg + end_url;
                                                        let nbr_of_place = value
                                                        if (key.singleplace_or_doubleplace == 2) {
                                                            nbr_of_place = value
                                                        }
                                                      

                                                        if (nbr_of_place < this.state.website_sett.products_display_nb) {
                                                            return (
                                                                <div key={['btn-5-'+value]} className={(key.singleplace_or_doubleplace == 1) ? ("col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 hoverbrandindex py-3 js--fadeInb") : ("col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 hoverbrandindex py-3 js--fadeInb")} data-id={"" + ""}>
                                                                    <div className='hiddenimg pointer'>
                                                                        <Link href={{ pathname: '/productdetail', as: "/media1/" + key.id, query: { data: key.title, data_id: key.id } }}>
                                                                            <a href={{ pathname: '/productdetail', as: "/media1/" + key.id, query: { data: key.title, data_id: key.id } }}>
                                                                                <div className="container-fluid centereditems" >
                                                                                    <img
                                                                                        src={"" + imageurl + ""}
                                                                                        className="img-fluid "
                                                                                    />
                                                                                </div>
                                                                            </a>
                                                                        </Link>
                                                                    </div>
                                                                    <div className={[(i18n.language=="ar")?"textalignright ":""]+"Products"}>
                                                                      
                                                                                <p className={[(i18n.language=="ar")?"DroidKufi ":"gill meduim "]+"footertext  prodbrandd"}>
                                                                                {this.state.brand[key.brand - 1].title}
                                                                                    <br />
                                                                                    <span className={[(i18n.language=="ar")?"DroidKufi ":"gill meduim "]+"font_size   blue"}>
                                                                                    {  (i18n.language=="ar") ? key.title_ar : key.title}
                                                                                    </span>
                                                                                </p>
                                                                            
                                                                        <FontAwesomeIcon style={{ height: "20px" }} className="fass" icon={faSearch} />

                                                                    </div>
                                                                </div>

                                                            )
                                                        }


                                                    })
                                                    :
                                                    this.state.paginationarrayforprod.map((key, value) => {
                                                        var end_url = '?w=200&h=250 ';
                                                        var valueimg = key.image;
                                                        const imageurl = startb_url + valueimg + end_url;
                                                        let nbr_of_place = value
                                                        if (key.singleplace_or_doubleplace == 2) {
                                                            nbr_of_place = value
                                                        }
                                                      

                                                        if (nbr_of_place < this.state.website_sett.products_display_nb) {
                                                            return (
                                                                <div key={['btn-3-'+value]} className={(key.singleplace_or_doubleplace == 1) ? ("col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 hoverbrandindex py-3 js--fadeInb") : ("col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 hoverbrandindex py-3 js--fadeInb")} data-id={"" + ""}>
                                                                    <div className='hiddenimg pointer'>
                                                                        <Link href={{ pathname: '/productdetail', as: "/media1/" + key.id, query: { data: key.title, data_id: key.id } }}>
                                                                            <a href={{ pathname: '/productdetail', as: "/media1/" + key.id, query: { data: key.title, data_id: key.id } }}>
                                                                                <div className="container-fluid centereditems" >
                                                                                    <img
                                                                                        src={"" + imageurl + ""}
                                                                                        className="img-fluid "
                                                                                    />
                                                                                </div>
                                                                            </a>
                                                                        </Link>
                                                                    </div>
                                                                    <div className={[(i18n.language=="ar")?"textalignright ":""]+"Products"}>
                                                                     
                                                                                <p className={[(i18n.language=="ar")?"DroidKufi ":"gill meduim "]+"footertext  prodbrandd"}>
                                                                                {  (i18n.language=="ar") ?  this.state.brand[key.brand - 1].title_ar : this.state.brand[key.brand - 1].title}
                                                                                    <br />
                                                                                    <span className={[(i18n.language=="ar")?"DroidKufi ":"gill meduim "]+"font_size  blue"}>
                                                                                    {  (i18n.language=="ar") ? key.title_ar : key.title}
                                                                                    </span>
                                                                                </p>
                                                                            
                                                                        <FontAwesomeIcon style={{ height: "20px" }} className="fass" icon={faSearch} />

                                                                    </div>
                                                                </div>

                                                            )
                                                        }


                                                    })

                                        }



                                    </div>
                                   { (arraysearchedpages.length<=1)?"":
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-5 ">
                                        <div className="row">
                                            <div className="col-6 col-sm-6 col-md-8 col-lg-10 col-xl-10 col-xxl-10"></div>
                                            <div className={[(this.state.isvisible)?"":"displaynone "]+"col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 col-xxl-2 medianext paginnext gill regular paddingrightnext "} >
                                                {(this.state.isSearchPress) ?
                                                    arraysearchedpages.map((key, value) => {
                                                        return (
                                                            <button key={['btn-1-'+value]} className={[(i18n.language=="ar")?"DroidKufi ":"gill  "]+"color_pagination"} onClick={() => this.step_one_of_afficherpaginationfilter(key)} id={"page" + key}>{key}</button>
                                                        )
                                                    })
                                                    :
                                                        arraypages.map((key, value) => {
                                                            return (
                                                                <button key={['btn-2-'+value]} className={[(i18n.language=="ar")?"DroidKufi ":"gill  "]+"color_pagination"} onClick={() => this.step_one_of_afficherpaginationfilter(key)} id={"page" + key}>{key}</button>
                                                            )
                                                        })
                                                }
                                                {
                                                    (this.state.isSearchPress) ?
                                                        ((arraysearchedpages.length == this.state.currentpage) ? <button className={[(i18n.language=="ar")?"DroidKufi ":"gill  "]+"blue"} onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage - 1)}><Back /></button> : <button className={[(i18n.language=="ar")?"DroidKufi ":"gill  "]+"blue"} onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}><Next /></button>)
                                                            // && (arraysearchedpages.length != 1) ? <button className="blue" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}><Next /></button> : null)
                                                        :
                                                            ((arraypages.length == this.state.currentpage ) ? <button className={[(i18n.language=="ar")?"DroidKufi ":"gill  "]+"blue"} onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage - 1)}><Back /></button> : <button className={[(i18n.language=="ar")?"DroidKufi ":"gill  "]+"blue"} onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}><Next /></button>)
                                                                // || (arraypages.length != 1) ? <button className="blue" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}>Next</button> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                 }
                                 {console.log(arraysearchedpages)}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>

        );
    }
}
export default product 
