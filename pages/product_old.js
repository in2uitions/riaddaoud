import Head from "next/head";
// import Header from './HEAD/head.js';
import Router ,{ useRouter } from "next/router"
import React, { useEffect } from 'react'
import Navigation from "./NAVIGATION/nav.js";
import Footer from "./FOOTER/footer.js";
import Link from 'next/link'
import axios from 'axios';
import i18n from '../i18n';
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Translation } from 'react-i18next';
import DirectusSDK from '@directus/sdk-js';
import Api from './api/Api.js';
import { withTranslation } from "react-i18next";
const directus = new DirectusSDK(Api.baseUrl);
import { useTranslation } from 'react-i18next';

function Brand() {
    const { t } = useTranslation();

    return <span> {t('brand')} </span>
}
function Allcateg() {
    const { t } = useTranslation();

    return <span> {t('allcateg')} </span>
}
function Filter() {
    const { t } = useTranslation();

    return <span> {t('filter')} </span>
}
function Products() {
    const { t } = useTranslation();

    return <span> {t('products')} </span>
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
function Back() {
    const { t } = useTranslation();

    return <span> {t('back')} </span>
}
class product extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            categ: [],
            backg: [],
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
            paramss:0,
        };
        this.getData = this.getData.bind(this);
        this.afterclickingbrandfilter = this.afterclickingbrandfilter.bind(this);
        this.afterclickingcategfilter = this.afterclickingcategfilter.bind(this);
        this.clearfilter = this.clearfilter.bind(this);
        this.step_one_of_afficherpaginationfilter = this.step_one_of_afficherpaginationfilter.bind(this);
        this.step_two_of_afficherpaginationfilter = this.step_two_of_afficherpaginationfilter.bind(this);
        this.removecheckwhenclearfilter = this.removecheckwhenclearfilter.bind(this);
        this.ifcategandbrandclicked = this.ifcategandbrandclicked.bind(this);
        this.filter = this.filter.bind(this);
      }

    //   static async getInitialProps({ query }) {
    //     return { query };
    // }
      async getData() {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('data_id');
        this.setState({paramss:myParam});
        var datadirectbackg = await directus.items('backgrounds').read({
            filter: {
                target_page: {
                    "_contains": "products",
                },
                title: {
                    "_eq": "product",
                }
            }
        });
        var datadirectcateg = await directus.items('categories').read();
        var datadirectsubcateg = await directus.items('subcategories').read();
        var datadirectprod = await directus.items('products').read();
        var datadirectbrand = await directus.items('brands').read();
        var datadirectwebsetting = await directus.items('website_settings').read();


        this.setState({ categ: datadirectcateg.data, prod: datadirectprod.data, paginationarray: datadirectprod.data, brand: datadirectbrand.data, backg: datadirectbackg.data, subcateg: datadirectsubcateg.data, website_sett: datadirectwebsetting.data }, () => { this.setState({ lastnmbrofprod: this.state.website_sett.products_display_nb }) });
        this.loadAnim();
    }
    loadAnim() {
        $('#myModal').on('show.bs.modal', function(e) {
            window.location.hash = "modal";
        });
    
        $(window).on('hashchange', function (event) {
            if(window.location.hash != "#modal") {
                $('#myModal').modal('hide');
            }
        });
        $("#myModal .close").click();

        $("#myModal .close").trigger("click"); 
        window.onload=function(){

        
        }; 
        if(this.state.paramss){
            if (this.state.paramss == 4) {
                $("#jquery_box").val(4);
                $("[id='categ1']").hide();
                $("[id='categ2']").hide();
                $("[id='categ3']").hide();
                $("[id='categ4']").show();
                $("[id='categ_mini1']").hide();
                $("[id='categ_mini2']").hide();
                $("[id='categ_mini3']").hide();
                $("[id='categ_mini4']").show();
                document.getElementById("displaynoneee_mini").style.display="block"
                document.getElementById("displaynoneee").style.display="block"
            };
            if (this.state.paramss == 3) {
                $("#jquery_box").val(3);
                $("[id='categ1']").hide();
                $("[id='categ2']").hide();
                $("[id='categ3']").show();
                $("[id='categ4']").hide();
                $("[id='categ_mini1']").hide();
                $("[id='categ_mini2']").hide();
                $("[id='categ_mini3']").show();
                $("[id='categ_mini4']").hide();
                document.getElementById("displaynoneee_mini").style.display="block"
                document.getElementById("displaynoneee").style.display="block"
            };
            if (this.state.paramss == 2) {
                $("#jquery_box").val(2);
                $("[id='categ1']").hide();
                $("[id='categ2']").show();
                $("[id='categ3']").hide();
                $("[id='categ4']").hide();
                $("[id='categ_mini1']").hide();
                $("[id='categ_mini2']").show();
                $("[id='categ_mini3']").hide();
                $("[id='categ_mini4']").hide();
                document.getElementById("displaynoneee_mini").style.display="block"
                document.getElementById("displaynoneee").style.display="block"
            };
            if (this.state.paramss == 1) {
                // alert("yesss")
                $("#jquery_box").val(1);
                $("[id='categ1']").show();
                $("[id='categ2']").hide();
                $("[id='categ3']").hide();
                $("[id='categ4']").hide();
                $("[id='categ_mini1']").show();
                $("[id='categ_mini2']").hide();
                $("[id='categ_mini3']").hide();
                $("[id='categ_mini4']").hide();
                document.getElementById("displaynoneee_mini").style.display="block"
                document.getElementById("displaynoneee").style.display="block"
            };
        }
        else {
            // alert("yesy")
        $("[id='categ1']").hide();
        $("[id='categ2']").hide();
        $("[id='categ3']").hide();
        $("[id='categ4']").hide();
        $("[id='categ_mini1']").hide();
        $("[id='categ_mini2']").hide();
        $("[id='categ_mini3']").hide();
        $("[id='categ_mini4']").hide();}
        $("#jquery_box_mini").change(function () {
            if (this.value == "4") {
                $("[id='categ_mini1']").hide();
                $("[id='categ_mini2']").hide();
                $("[id='categ_mini3']").hide();
                $("[id='categ_mini4']").show();
                document.getElementById("displaynoneee_mini").style.display="block";
                document.getElementById("displaynoneee").style.display="block";
            };
            if (this.value == "3") {
                $("[id='categ_mini1']").hide();
                $("[id='categ_mini2']").hide();
                $("[id='categ_mini3']").show();
                $("[id='categ_mini4']").hide();
                document.getElementById("displaynoneee_mini").style.display="block";
                document.getElementById("displaynoneee").style.display="block";
            };
            if (this.value == "2") {
                $("[id='categ_mini1']").hide();
                $("[id='categ_mini2']").show();
                $("[id='categ_mini3']").hide();
                $("[id='categ_mini4']").hide();
                document.getElementById("displaynoneee_mini").style.display="block";
                document.getElementById("displaynoneee").style.display="block";
            };
            if (this.value == "1") {
                $("[id='categ_mini1']").show();
                $("[id='categ_mini2']").hide();
                $("[id='categ_mini3']").hide();
                $("[id='categ_mini4']").hide();
                document.getElementById("displaynoneee_mini").style.display="block";
                document.getElementById("displaynoneee").style.display="block";
            };
            if (this.value == "all") {
                $("[id='categ_mini1']").hide();
                $("[id='categ_mini2']").hide();
                $("[id='categ_mini3']").hide();
                $("[id='categ_mini4']").hide();
                document.getElementById("displaynoneee_mini").style.display="block";
                document.getElementById("displaynoneee").style.display="block";
            };
        })
        
        $("#jquery_box").change(function () {

            if (this.value == "4") {
                $("[id='categ1']").hide();
                $("[id='categ2']").hide();
                $("[id='categ3']").hide();
                $("[id='categ4']").show();
                document.getElementById("displaynoneee").style.display="block"
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
                $("[id='categ1']").hide();
                $("[id='categ2']").hide();
                $("[id='categ3']").hide();
                $("[id='categ4']").hide();
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

        $('div.modal').on('hide', function() {
            var hash = this.id;
            history.pushState('', document.title, window.location.pathname);
        });
        var coll = document.getElementsByClassName("collapsible");
        var i;
        $(".modal").on("shown.bs.modal", function()  { // any time a modal is shown
            var urlReplace = "#" + $(this).attr('id'); // make the hash the id of the modal shown
            history.pushState(null, null, urlReplace); // push state that hash into the url
          });
        
          // If a pushstate has previously happened and the back button is clicked, hide any modals.
          $(window).on('popstate', function() { 
            $(".modal").modal('hide');
          });
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
        var input = document.getElementById("search");
        input.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            // document.getElementById("search").click();
        }
        });
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
    removecheckwhenclearfilter = () => {
        //when clicked on clear filter =>removethe check from all the checkbox
        $("[id='myCheck']").prop('checked', false);
        $("[id='categCheck']").prop('checked', false);
    }
    step_two_of_afficherpaginationfilter = (page) => {
        const end = page * this.state.website_sett.products_display_nb
        const start = end - this.state.website_sett.products_display_nb
        var paging = this.state.paginationarray.slice(start, end)
        var pagingfilter = this.state.paginationfilterarray.slice(start, end)
        var pagingsearch = this.state.paginationsearcharray.slice(start, end)
        this.setState({ paginationarrayforprod: paging, paginationfilterarrayforprod: pagingfilter, paginationarrayforsearchedprod: pagingsearch, currentpage: page, lastnmbrofprod: end, firstnmbrofprod: start + 1 })


    }
    step_one_of_afficherpaginationfilter = (page) => {
        this.setState({ paginationarray: this.state.prod, paginationfilterarray: this.state.filtering, paginationsearcharray: this.state.searchedarray }, () => { this.step_two_of_afficherpaginationfilter(page) })
    }
    removefiltercateg = (idd) => {
        // alert("nchelet")
        if (this.state.arraycategid.length == 1) { (this.state.isbrandPress) ? this.setState({ isCategPress: false,arraycategid:[] }) : this.setState({ isFilterPress: false, isCategPress: false,arraycategid:[]  }) }
        else {
            var newarraycategid=this.state.arraycategid.filter(function(item) {
                return (item!=idd)})
            this.setState({
                arraycategid: newarraycategid, isCategPress: false
            }, () => { this.afterclickingcategfilter() })
        }
    }
    removefilterbrand = (idd) => {
        if (this.state.arrayid.length == 1) { (this.state.isCategPress) ? this.setState({ isbrandPress: false,arrayid:[] }) : this.setState({ isFilterPress: false, isbrandPress: false,arrayid:[] }) }
        else {
            // alert("ahahha")
            var newarrayid=this.state.arrayid.filter(function(item) {
                return (item!=idd)})
            this.setState({
                arrayid: newarrayid, isbrandPress: false
            }, () => { this.afterclickingbrandfilter() })
        }
    }
    afterclickingcategfilter = () => {
        //bjib el array li fiya categ id w bjib kel el prod taba3 hal brands w bkebon bel filter
        // this.setState({ filtering: [] })
        var filters = []
        for (const i in this.state.arraycategid) {
            for (const y in this.state.prod) {

                if (this.state.prod[y].subcategory == this.state.arraycategid[i]) {
                    filters = [...filters, this.state.prod[y]]
                }
            }
        }
        // var joinedwithcateg = filters.concat(this.state.arrayid);
        //         var result = joinedwithcateg.filter((item,index)=>{
        //             return (joinedwithcateg.indexOf(item) == index)
        //             })
        if (this.state.arraycategid.length < 1) { this.setState({ isFilterPress: false, filtering: filters, paginationfilterarray: filters, paginationfilterarrayforprod: filters }) }
        else this.setState({ isFilterPress: true, filtering: filters, paginationfilterarray: filters, paginationfilterarrayforprod: filters })

    }
    clickingcategfilter = (idd, check) => {
        // {console.log("what matterss "+ idd)}
        //3am bi zid el id taba3 el categ 3a arrayid w beb3abta 3al afterclickingcategfilter to get prod
        if (!check) {
            this.removefiltercateg(idd)
        }
        else {
            if (this.state.arraycategid.includes(idd)) { null }
            else {
                var joined = this.state.arraycategid.concat(idd);
                // var joinedwithcateg = joined.concat(this.state.arrayid);
                // var result = joinedwithcateg.filter((item,index)=>{
                //     return (joinedwithcateg.indexOf(item) == index)
                // })
                this.setState({ arraycategid: joined, isCategPress: true }, () => {
                    (this.state.isbrandPress) ? this.ifcategandbrandclicked() : this.afterclickingcategfilter()
                });
            }
        }


    }
    ifcategandbrandclicked = () => {
        var categ = []
        var brand = []
        var joinedarray = []
        // for (const i in this.state.arrayid) {
        for (const y in this.state.prod) {
            if (this.state.prod[y].brand == this.state.arrayid[y] || this.state.prod[y].subcategory == this.state.arraycategid[y]) {
                joinedarray.push(this.state.prod[y])
            }
        }
        // console.log(joinedarray)
        if (this.state.arrayid.length < 1) { this.setState({ isFilterPress: false, filtering: joinedarray, paginationfilterarray: joinedarray, paginationfilterarrayforprod: joinedarray }) }
        // else this.setState({ isFilterPress: true, filtering: array3, paginationfilterarray: array3, paginationfilterarrayforprod: array3 })
        else this.setState({ isFilterPress: true, filtering: joinedarray, paginationfilterarray: joinedarray, paginationfilterarrayforprod: joinedarray })
        // }
        // for (const i in this.state.arraycategid) {
        //     for (const y in this.state.prod) {
        //         if (this.state.prod[y].subcategory == this.state.arraycategid[i]) {
        //             categ = [...filters, this.state.prod[y]]
        //         }
        //     }
        // }
        // let array3 = brand.concat(categ);
        // array3 = array3.filter((item, index) => {
        //     return (array3.indexOf(item) == index)
        //     console.log("item"+item)
        // })
        // if (this.state.arrayid.length < 1) { this.setState({ isFilterPress: false, filtering: array3, paginationfilterarray: array3, paginationfilterarrayforprod: array3 }) }
        // else this.setState({ isFilterPress: true, filtering: array3, paginationfilterarray: array3, paginationfilterarrayforprod: array3 })
    }



    clearfilter = () => {
        //when clicked clear filter=>delete all data from arrays used in filtering
        this.setState({ filtering: [], isFilterPress: false,isbrandPress: false,isCategPress: false, arrayid: [], arraycategid: [],
            paginationfilterarray: [], paginationfilterarrayforprod: [],paginationarrayforprod:[]
        },()=>{ this.removecheckwhenclearfilter()})

    }

    afterclickingbrandfilter = () => {
        //bjib el array li fiya brands id w bjib kel el prod taba3 hal brands w bkebon bel filter
        // this.setState({ filtering: [] })
        var filters = []
        for (const i in this.state.arrayid) {
            for (const y in this.state.prod) {
                if (this.state.prod[y].brand == this.state.arrayid[i]) {
                    filters = [...filters, this.state.prod[y]]
                }
            }
        }
        if (this.state.arrayid.length < 1) { this.setState({ isFilterPress: false, filtering: filters, paginationfilterarray: filters, paginationfilterarrayforprod: filters }) }
        else this.setState({ isFilterPress: true, filtering: filters, paginationfilterarray: filters, paginationfilterarrayforprod: filters })
    }
    clickingbrandfilter = (idd, check) => {
        //3am bi zid el id taba3 el brand 3a arrayid w beb3abta 3al afterclickingbrandfilter to get prod
        if (!check) {
            this.removefilterbrand(idd)
        }
        else {
            if (this.state.arrayid.includes(idd)) { null }
            else {
                var joined = this.state.arrayid.concat(idd);
                // var joinedwithcateg = joined.concat(this.state.arraycategid);
                // var result = joinedwithcateg.filter((item,index)=>{
                //     return (joinedwithcateg.indexOf(item) == index)
                //     })
                this.setState({ arrayid: joined, isbrandPress: true }, () => {
                    (this.state.isCategPress) ? this.ifcategandbrandclicked() : this.afterclickingbrandfilter()
                });
            }
        }
    }
    knowthelastelementrightnow = () => {
        //help now men aya element la aya element 3am bi bayen be kel page
        var a = ((this.state.isFilterPress) ? this.state.filtering.length : this.state.prod.length) - this.state.firstnmbrofprod
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

  
render (){
    var startb_url = Api.baseUrl + 'assets/';
        var endb_url = '?key=system-large-cover';
        var valuebackimg = this.state.backg.map((key, value) => { return key.image });
        const imagbackeurl = startb_url + valuebackimg + endb_url;
        var a_back = [];
        for (const i in this.state.backg[0]) {
            a_back[i] = this.state.backg[0][i];
        }
        if (a_back.box_title_ar == null) { var box_title_ar = a_back.box_title }
        else var box_title_ar = a_back.box_title_ar
        if (a_back.box_description_ar == null) { var box_description_ar = a_back.box_description }
        else var box_description_ar = a_back.box_description_ar
        console.log(a_back)
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
        //get nmbr of pages for filtered items
        var lnfilters = this.state.filtering.length
        var pagesfiltering = lnfilters / this.state.website_sett.products_display_nb
        var totalfilter = pagesfiltering
        var totalpagesfiltering = 0
        if (pagesfiltering % 1 != 0) { totalpagesfiltering = Math.ceil(totalfilter) }
        else { totalpagesfiltering = Math.ceil(totalfilter); }
        var arrayfilterpages = [];
        var i = 0, len = totalpagesfiltering;
        while (++i <= len) arrayfilterpages.push(i);

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
        // if(this.state.isFilterPress==false && this.state.isSearchPress==false && this.state.paginationarrayforprod.length<this.state.website_sett.products_display_nb){
        //     this.setState({isvisible:false})
        // }
        // if (this.state.isFilterPress==true && this.state.isSearchPress==false && this.state.paginationfilterarrayforprod.length<this.state.website_sett.products_display_nb){
        //     this.setState({isvisible:false})
        // }
        // if (this.state.isSearchPress==true && this.state.paginationarrayforsearchedprod.length<this.state.website_sett.products_display_nb){
        //     this.setState({isvisible:false})
        // }
        //  this.setState({paginationarrayforsearchedprod:this.state})
        // if(arraysearchedpages<this.state.website_sett.products_display_nb || arrayfilterpages <this.state.website_sett.products_display_nb || arraypages<this.state.website_sett.products_display_nb ){
        //     this.setState({isvisible:false})
        // }
  return (
    <div >
                <Navigation current="products"></Navigation>
                <div >
                    <div className="container-fluid p-0 parallax " style={{ backgroundImage: 'url(' + imagbackeurl + ')' }}>
                        <div className={[(i18n.language=="ar")?"productnewbackar textalignright":"productnewback "]+" col-10 col-sm-10 col-md-10 col-lg-4 col-xl-4 col-xxl-4 p-0 "}>
                            {/* <p className={[(i18n.language=="ar")?"DroidKufi ":"gill meduim "]+"   bigtitleprod"}>
                                {this.state.backg.map((key, value) => {
                                     if (key.description_ar == null) { var description_ar = key.description }
                                     else var description_ar = key.description_ar
                                     return (i18n.language=="ar") ? description_ar : key.description  } )}
                            </p> */}
                        </div>
                    </div>
                    <div className="container-fluid ">
                        <div className="row">
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3"></div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 aboutheaderprodnew py-4 px-3">
                                <div className="container-fluid py-4 mb-4 ">
                                    <div className="row  py-4">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-3">
                                            <h1 className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+"meduim white  aligncenter"}>{(i18n.language=="ar") ? box_title_ar : a_back.box_title}</h1>
                                        </div>
                                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
                                        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10  py-3">
                                            <div className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+"light white footertext  lineheightbig  aligncenter"}>{(i18n.language=="ar") ? box_description_ar : a_back.box_description}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-md-5 p-0"></div>
                {/* <div className={[(i18n.language=="ar")?"rtl ":""]+"container-fluid py-4"} >
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
                        <div className="container-fluid p-0">
                            <div className="row ">
                                <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 mobilehidden  px-md-4 flexend">
                                    <h4 className={[(i18n.language=="ar")?"textalignright DroidKufi ":"light gill"]+" text-lightgrey  "}>{this.props.t("BrowseCategories")}</h4>
                                </div>
                                <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9  ">
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}


                <div className={[(i18n.language=="ar")?"rtl ":""]+"container-fluid px-4"}>
                    <div className="row ">
                        <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 py-0 px-4 show ">
                            <div className="panel-group borders" id="modal" role="tablist" aria-multiselectable="true">
                                <div className="panel">
                                    <div className="col-md-12 visible-sm">
                                        <div className="navbar-expand-md">
                                            {/* <button data-parent="#modal" className="navbar-toggler py-2  textaligncenter w-100" type="button" data-toggle="modal" data-target="#myModal" aria-expanded="false" aria-label="Toggle navigation" aria-controls="navbarSupportedContent"> */}
                                                {/* <span clasName="gill whitee">{this.props.t("filter")}</span> */}
                                                {/* <FontAwesomeIcon style={{ height: "12px" }} className="searchiconsecnewprod" icon={faFilter}/> */}
                                            {/* </button> */}
                                            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                                                <div className="modal-dialog " role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header ltr">
                                                            <p clasName="gill "><Filter /></p>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="container-fluid  p-0 div-collapse collapse colapse2" id="collapse1">

                                                                {/* <div className="container-fluid p-0 ">
                                                                    <div className="row">
                                                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 "> */}
                                                                            {/* <div > */}
                                                                            <select name="jquery_box_mini" id="jquery_box_mini" className={[(i18n.language=="ar")?"fleche_ar ":""]+"py-4 px-3 pointer w-100  backgroundblue"}>
                                                                                <option className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+"selectoption container-fluid px-2 textalignleft meduim  font_size"} value={"all"}>
                                                                                {  (i18n.language=="ar") ? "جميع الفئات" : "ALL CATEGORIES"}
                                                                                </option>
                                                                                {this.state.categ.map((key, value) => {
                                                                                    if (key.title_ar == null) { var title_ar = key.title }
                                                                                    else var title_ar = key.title_ar 

                                                                                    return (
                                                                                        <option key={['btn-4-'+value]} className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+"selectoption container-fluid px-2 textalignleft meduim  font_size"} value={"" + key.id + ""}>
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
                                                                <h3 className={[(i18n.language=="ar")?"textalignright DroidKufi ":"gill  "]+"blue meduim py-2"}><Subcateg /></h3>
                                                                {this.state.categ.map((key, value) => {
                                                                    let a = this.state.subcateg.filter(keyy => { return keyy.category == key.id })
                                                                    return (a.map((keys, value) => {
                                                                        if (keys.title_ar == null) { var title_ar = keys.title }
                                                                        else var title_ar = keys.title_ar 
                                                                        return (
                                                                            <div key={['btn-5-'+value]} className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-1" id={"categ_mini" + keys.category + ""}>
                                                                                <div className="container-fluid p-0">
                                                                                    <div className="row">
                                                                                        <div className={[(i18n.language=="ar")?"textalignright ":"mr-3 "]+"col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 p-0  "}>
                                                                                            <label className="checkbox h-100 w-100 p-0 " >
                                                                                                <input type="checkbox" id="categCheck" name={"" + key.title + ""} value={"" + key.title + ""} onChange={(e) => this.clickingcategfilter(keys.id, e.target.checked)} />
                                                                                            </label>
                                                                                        </div>
                                                                                        <div className={[(i18n.language=="ar")?"textalignright mr-3 ":""]+"col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 p-0 subtablinks "}>
                                                                                            <h3 className={[(i18n.language=="ar")?"textalignright DroidKufi mr-3 ":" gill light "]+" text-lightgrey contents "}>{  (i18n.language=="ar") ? title_ar : keys.title} </h3>
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
                                                            {this.state.brand.map((key, value) => {
                                                                if (key.title_ar == null) { var title_ar = key.title }
                                                                else var title_ar = key.title_ar 
                                                                return (
                                                                    <div key={['btn-6-'+value]} className={[(i18n.language=="ar")?"textalignright ":""]+"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-1 "}>
                                                                        <div className="container-fluid p-0">
                                                                            <div className="row">
                                                                                <div className={[(i18n.language=="ar")?"textalignright ml-3 ":"mr-3  "]+"col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 p-0 px-4"}>
                                                                                    <label className="checkbox h-100 w-100 p-0 " >
                                                                                        <input type="checkbox" id="myCheck" name={"" + key.title + ""} value={"" + key.title + ""} onChange={(e) => this.clickingbrandfilter(key.id, e.target.checked)} />
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
                                                                <button className="clearfilterbtn  px-5 py-2" onClick={() => this.clearfilter()}>
                                                                    <h3 className={[(i18n.language=="ar")?"textalignright DroidKufi ":"gill "]+" light safermarg text-lightgrey px-4"}><Clearfilters /></h3>
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
                                                        <select name="jquery_box" id="jquery_box" className={[(i18n.language=="ar")?"fleche_ar ":""]+"py-4 w-100 backgroundblue px-3 pointer "}>
                                                                     <option className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+" px-4 selectoption textaligncenter meduim  font_size"} value={"all"}>
                                                                     {(i18n.language=="ar") ? "جميع الفئات" : "ALL CATEGORIES"}
                                                                    </option>
                                                            {this.state.categ.map((key, value) => {
                                                                 if (key.title_ar == null) { var title_ar = key.title }
                                                                 else var title_ar = key.title_ar 

                                                                return (
                                                                    <option key={['btn-7-'+value]} className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+" px-4 selectoption textaligncenter meduim  font_size"} value={"" + key.id + ""}>
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
                                            <h3 className={[(i18n.language=="ar")?"textalignright DroidKufi ":"gill "]+"blue meduim  py-2"}><Subcateg /></h3>
                                            {this.state.categ.map((key, value) => {
                                                let a = this.state.subcateg.filter(keyy => { return keyy.category == key.id })
                                                
                                                return (a.map((keys, value) => {
                                                    if (keys.title_ar == null) { var title_ar = keys.title }
                                                    else var title_ar = keys.title_ar 
                                                    return (
                                                        <div key={['btn-8-'+value]} className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-1" id={"categ" + keys.category + ""} >
                                                            <div className="container-fluid p-0">
                                                                <div className="row">
                                                                    <div className={[(i18n.language=="ar")?"textalignright ":"mr-3 "]+"col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 p-0  "}>
                                                                        <label className="checkbox h-100 w-100 p-0 " >
                                                                            <input type="checkbox" id="categCheck" name={"" + key.title + ""} value={"" + key.title + ""} onChange={(e) => this.clickingcategfilter(keys.id, e.target.checked)} />
                                                                        </label>
                                                                    </div>
                                                                    <div className={[(i18n.language=="ar")?"textalignright mr-3 ":""]+"col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 p-0 subtablinks "}>
                                                                        <h3 className={[(i18n.language=="ar")?"textalignright DroidKufi mr-3 ":" gill light "]+" text-lightgrey contents "}>{  (i18n.language=="ar") ? title_ar : keys.title} </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }))
                                            })}
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12  mt-4 mb-4 px-4">
                                            <h3 className={[(i18n.language=="ar")?"textalignright DroidKufi ":" gill meduim "]+" blue"}><Brand /></h3>
                                        </div>
                                        {this.state.brand.map((key, value) => {
                                            if (key.title_ar == null) { var title_ar = key.title }
                                            else var title_ar = key.title_ar 
                                            return (
                                                <div key={['btn-9-'+value]} className={[(i18n.language=="ar")?"textalignright ":""]+"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-1 "}>
                                                    <div className="container-fluid p-0">
                                                        <div className="row">
                                                            <div className={[(i18n.language=="ar")?"textalignright ml-3 ":"mr-3 "]+"col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 p-0 px-4"}>
                                                                <label className="checkbox h-100 w-100 p-0 " >
                                                                    <input type="checkbox" id="myCheck" name={"" + key.title + ""} value={"" + key.title + ""} onChange={(e) => this.clickingbrandfilter(key.id, e.target.checked)} />
                                                                </label>
                                                            </div>
                                                            
                                                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-0 subtablinks">
                                                                <h3 className={[(i18n.language=="ar")?"textalignright DroidKufi ":""]+"light gill text-lightgrey contents "}>
                                                                {  (i18n.language=="ar") ? title_ar : key.title}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <div className="textaligncenter py-4 ">
                                            <button className="clearfilterbtn textaligncenter px-5 py-2" onClick={() => this.clearfilter()}>
                                                <h3 className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+" light safermarg text-lightgrey px-4"}><Clearfilters /></h3>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9 col-xxl-9 mt-2 ">
                            <div className="container-fluid productboxheight py-4">
                                        <div className="row ">
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-0 showingaligncenter flexend">
                                                <h4 className={[(i18n.language=="ar")?"textalignright DroidKufi ":"gill light "]+" text-lightgrey  "}>
                                                    <Showing />
                                                        {" " + (this.state.isFilterPress) ?
                                                    ( (this.state.filtering.length==0 && this.state.isFilterPress==true) ?0: (this.state.firstnmbrofprod))
                                                    :
                                                    (this.state.firstnmbrofprod)
                                                    
                                                    }
                                                    –
                                                    {
                                                                    " " + this.knowthelastelementrightnow() + " "

                                                                }
                                                    <Of />
                                                    {" " + ((this.state.isFilterPress) ? this.state.filtering.length : this.state.prod.length)}  <Products />
                                                </h4>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-0  ">
                                                <form action="" className="row relative ">
                                                    <div className="col-11 col-sm-11 col-md-12 col-lg-12 col-xl-12 col-xxl-12  w-100 ">
                                                        <div className={[(i18n.language=="ar")?"textalignright DroidKufi ":"light gill "]+"relative texttitlemedia  font_size   h-100"}>
                                                            {/* <input type="text" id='search-input' name="search1" placeholder="Search Products" className="pl-5  texttitlemedia footertext light gill w-100" /> */}
                                                            
                                                            <input type="text" id="search" placeholder={(i18n.language=="ar")?"البحث عن المنتجات":"Search Products"} className={[(i18n.language=="ar")?"pr-5 DroidKufi ":"pl-5 light gill "]+"   searchnewprodbordure mb-1 py-1 py-md-0 texttitlemedia footertext   w-100"}
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
                                    <div className="py-md-2 py-4"></div>
                            {/* <section> */}
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 ">
                                    <div className="container-fluid p-0 row">

                                        {(this.state.isSearchPress) ?
                                            (this.state.paginationarrayforsearchedprod.length == 0) ?
                                                this.state.searchedarray.slice(0, this.state.website_sett.products_display_nb).map((key, value) => {
                                                    var end_url = '?w=200&h=250 ';
                                                    var valueimg = key.image;
                                                    const imageurl = startb_url + valueimg + end_url;
                                                    if (key.title_ar == null) { var title_ar = key.title }
                                                    else var title_ar = key.title_ar
                                                    if (this.state.brand[key.brand - 1].title_ar == null) { var brandtitle_ar = this.state.brand[key.brand - 1].title }
                                                    else var brandtitle_ar = this.state.brand[key.brand - 1].title_ar
                                                    if (value < this.state.website_sett.products_display_nb) {
                                                        return (
                                                            <div key={['btn-10-'+value]} className={(key.singleplace_or_doubleplace == 1) ? ("col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 hoverbrandindex  py-3 js--fadeInb") : ("col-6 col-sm-6 col-md-6 col-lg-8 col-xl-8 col-xxl-8 hoverbrandindex  py-3 js--fadeInb")} data-id={"" + ""}>
                                                                {/* this.state.brand[key.brand].title+ */}
                                                                <div className='hiddenimg pointer'>
                                                                <Link href={{ pathname: '/productdetail', as: "/media1/" + key.id, query: { data: key.title, data_id: key.id } }}>
                                                                    <a href={{ pathname: '/productdetail', as: "/media1/" + key.id, query: { data: key.title, data_id: key.id } }}>
                                                                        <div className="container-fluid centereditems" >
                                                                            <img
                                                                                src={"" + imageurl + ""}
                                                                                className="img-fluid imgshake"
                                                                            />
                                                                        </div>
                                                                    </a>
                                                                </Link>
                                                                </div>
                                                                <div className={[(i18n.language=="ar")?"textalignright ":""]+"Products"}>
                                                                   
                                                                            <p className="footertext meduim prodbrandd">
                                                                                {/* {this.state.brand[key.brand - 1].title} */}
                                                                                {  (i18n.language=="ar") ? brandtitle_ar : this.state.brand[key.brand - 1].title}
                                                                                <br />
                                                                                <span className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+"font_size meduim blue"}>
                                                                                {  (i18n.language=="ar") ? title_ar : key.title}
                                                                                </span>
                                                                            </p>
                                                                      
                                                                    <FontAwesomeIcon style={{ height: "20px" }} className="fass" icon={faSearch} />
                                                                    {/* <p className="fas fa-search searchiconindex"></p> */}
                                                                </div>
                                                            </div>

                                                        )
                                                    }


                                                })
                                                :
                                                this.state.paginationarrayforsearchedprod.map((key, value) => {
                                                    var end_url = '?w=200&h=250 ';
                                                    var valueimg = key.image;
                                                    const imageurl = startb_url + valueimg + end_url;
                                                    if (key.title_ar == null) { var title_ar = key.title }
                                                    else var title_ar = key.title_ar
                                                    if (this.state.brand[key.brand - 1].title_ar == null) { var brandtitle_ar = this.state.brand[key.brand - 1].title }
                                                    else var brandtitle_ar = this.state.brand[key.brand - 1].title_ar
                                                    if (value < this.state.website_sett.products_display_nb) {
                                                        return (
                                                            <div key={['btn-11-'+value]} className={(key.singleplace_or_doubleplace == 1) ? ("col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 hoverbrandindex  py-3 js--fadeInb") : ("col-6 col-sm-6 col-md-6 col-lg-8 col-xl-8 col-xxl-8 hoverbrandindex  py-3 js--fadeInb")} data-id={"" + ""}>
                                                                {/* this.state.brand[key.brand].title+ */}
                                                                <div className='hiddenimg pointer'>
                                                                <Link href={{ pathname: '/productdetail', as: "/media1/" + key.id, query: { data: key.title, data_id: key.id } }}>
                                                                    <a href={{ pathname: '/productdetail', as: "/media1/" + key.id, query: { data: key.title, data_id: key.id } }}>
                                                                        <div className="container-fluid centereditems" >
                                                                            <img
                                                                                src={"" + imageurl + ""}
                                                                                className="img-fluid imgshake"
                                                                            />
                                                                        </div>
                                                                    </a>
                                                                </Link>
                                                                </div>
                                                                <div className={[(i18n.language=="ar")?"textalignright ":""]+"Products"}>
                                                                   
                                                                            <p className="footertext meduim prodbrandd">
                                                                            {  (i18n.language=="ar") ? brandtitle_ar : this.state.brand[key.brand - 1].title}
                                                                                <br />
                                                                                <span className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+"font_size meduim blue"}>
                                                                                {  (i18n.language=="ar") ? title_ar : key.title}
                                                                                </span>
                                                                            </p>
                                                                        
                                                                    <FontAwesomeIcon style={{ height: "20px" }} className="fass" icon={faSearch} />
                                                                    {/* <p className="fas fa-search searchiconindex"></p> */}
                                                                </div>
                                                            </div>

                                                        )
                                                    }


                                                })
                                            :
                                            (this.state.isFilterPress) ?
                                                this.state.paginationfilterarrayforprod.map((key, value) => {
                                                    var end_url = '?w=200&h=250 ';
                                                    var valueimg = key.image;
                                                    const imageurl = startb_url + valueimg + end_url;
                                                    if (key.title_ar == null) { var title_ar = key.title }
                                                    else var title_ar = key.title_ar
                                                    if (this.state.brand[key.brand - 1].title_ar == null) { var brandtitle_ar = this.state.brand[key.brand - 1].title }
                                                    else var brandtitle_ar = this.state.brand[key.brand - 1].title_ar
                                                    if (value < this.state.website_sett.products_display_nb) {
                                                        return (
                                                            <div key={['btn-12-'+value]} className={(key.singleplace_or_doubleplace == 1) ? ("col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 hoverbrandindex  py-3 js--fadeInb") : ("col-6 col-sm-6 col-md-6 col-lg-8 col-xl-8 col-xxl-8 hoverbrandindex  py-3 js--fadeInb")} data-id={"" + ""}>
                                                                {/* this.state.brand[key.brand].title+ */}
                                                                <div className='hiddenimg pointer'>
                                                                <Link href={{ pathname: '/productdetail', as: "/media1/" + key.id, query: { data: key.title, data_id: key.id } }}>
                                                                    <a href={{ pathname: '/productdetail', as: "/media1/" + key.id, query: { data: key.title, data_id: key.id } }}>
                                                                        <div className="container-fluid centereditems" >
                                                                            <img
                                                                                src={"" + imageurl + ""}
                                                                                className="img-fluid imgshake "
                                                                            />
                                                                        </div>
                                                                    </a>
                                                                </Link>
                                                                </div>
                                                                <div className={[(i18n.language=="ar")?"textalignright ":""]+"Products"}>
                                                                   
                                                                            <p className="footertext meduim prodbrandd">
                                                                            {  (i18n.language=="ar") ? brandtitle_ar : this.state.brand[key.brand - 1].title}
                                                                                <br />
                                                                                <span className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+"font_size  meduim blue"}>
                                                                                {  (i18n.language=="ar") ? title_ar : key.title}
                                                                                </span>
                                                                            </p>
                                                                        
                                                                    <FontAwesomeIcon style={{ height: "20px" }} className="fass" icon={faSearch} />
                                                                    {/* <p className="fas fa-search searchiconindex"></p> */}
                                                                </div>
                                                            </div>

                                                        )
                                                    }


                                                })
                                                :
                                                (this.state.paginationarrayforprod.length == 0) ?
                                                    this.state.paginationarray.map((key, value) => {
                                                        var end_url = '?w=200&h=250 ';
                                                        var valueimg = key.image;
                                                        const imageurl = startb_url + valueimg + end_url;
                                                        let nbr_of_place = value
                                                        if (key.singleplace_or_doubleplace == 2) {
                                                            nbr_of_place = value
                                                        }
                                                        if (key.title_ar == null) { var title_ar = key.title }
                                                        else var title_ar = key.title_ar
                                                        if (this.state.brand[key.brand - 1].title_ar == null) { var brandtitle_ar = this.state.brand[key.brand - 1].title }
                                                        else var brandtitle_ar = this.state.brand[key.brand - 1].title_ar

                                                        if (nbr_of_place < this.state.website_sett.products_display_nb) {
                                                            return (
                                                                <div key={['btn-13-'+value]} className={(key.singleplace_or_doubleplace == 1) ? ("col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 hoverbrandindex py-3 js--fadeInb") : ("col-6 col-sm-6 col-md-6 col-lg-8 col-xl-8 col-xxl-8 hoverbrandindex  py-3 js--fadeInb")} data-id={"" + ""}>
                                                                    <div className='hiddenimg pointer'>
                                                                    <Link href={{ pathname: '/productdetail', as: "/media1/" + key.id, query: { data: key.title, data_id: key.id } }}>
                                                                        <a href={{ pathname: '/productdetail', as: "/media1/" + key.id, query: { data: key.title, data_id: key.id } }}>
                                                                            <div className="container-fluid centereditems" >
                                                                                <img
                                                                                    src={"" + imageurl + ""}
                                                                                    className="img-fluid imgshake"
                                                                                />
                                                                            </div>
                                                                        </a>
                                                                    </Link>
                                                                    </div>
                                                                    <div className={[(i18n.language=="ar")?"textalignright ":""]+"Products"}>
                                                                       
                                                                                <p className="footertext meduim prodbrandd">
                                                                                {  (i18n.language=="ar") ? brandtitle_ar : this.state.brand[key.brand - 1].title}
                                                                                    <br />
                                                                                    <span className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+"font_size  meduim blue"}>
                                                                                    {  (i18n.language=="ar") ? title_ar : key.title}
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
                                                        if (key.title_ar == null) { var title_ar = key.title }
                                                        else var title_ar = key.title_ar
                                                        if (this.state.brand[key.brand - 1].title_ar == null) { var brandtitle_ar = this.state.brand[key.brand - 1].title }
                                                        else var brandtitle_ar = this.state.brand[key.brand - 1].title_ar

                                                        if (nbr_of_place < this.state.website_sett.products_display_nb) {
                                                            return (
                                                                <div key={['btn-14-'+value]} className={(key.singleplace_or_doubleplace == 1) ? ("col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 hoverbrandindex py-3 js--fadeInb") : ("col-6 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 hoverbrandindex py-3 js--fadeInb")} data-id={"" + ""}>
                                                                    <div className='hiddenimg pointer'>
                                                                        <Link href={{ pathname: '/productdetail', as: "/media1/" + key.id, query: { data: key.title, data_id: key.id } }}>
                                                                            <a href={{ pathname: '/productdetail', as: "/media1/" + key.id, query: { data: key.title, data_id: key.id } }}>
                                                                                <div className="container-fluid centereditems" >
                                                                                    <img
                                                                                        src={"" + imageurl + ""}
                                                                                        className="img-fluid imgshake"
                                                                                    />
                                                                                </div>
                                                                            </a>
                                                                        </Link>
                                                                    </div>
                                                                    <div className={[(i18n.language=="ar")?"textalignright ":""]+"Products"}>
                                                                       
                                                                                <p className="footertext meduim prodbrandd">
                                                                                {  (i18n.language=="ar") ? brandtitle_ar : this.state.brand[key.brand - 1].title}
                                                                                    <br />
                                                                                    <span className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+"font_size  meduim blue"}>
                                                                                    {  (i18n.language=="ar") ? title_ar : key.title}
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
                                  {/* {console.log(arraysearchedpages.length==0)} */}
                                   { 
                                   ((this.state.isFilterPress==true)?((arrayfilterpages.length<=1 )?"":
                                   <div className="col-12 col-sm-12 col-md-11 col-lg-11 col-xl-11 col-xxl-11 p-5 ">
                                        <div className="row">
                                            <div className="col-1 col-sm-1 col-md-8 col-lg-10 col-xl-10 col-xxl-10"></div>
                                            <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2 medianext paginnext container-fluid p-0 gill regular paddingrightnext " >
                                           { ((this.state.currentpage == 1 ) ?"":
                                                        <button className="blue pointer" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage - 1)}><Back /></button>)}
                                                {(this.state.isSearchPress) ?
                                                    arraysearchedpages.map((key, value) => {
                                                        return (
                                                            <button key={['btn-1-'+value]} className={[(this.state.currentpage==key)?" currentpage ":""]+"color_pagination pointer"} onClick={() => this.step_one_of_afficherpaginationfilter(key)} id={"page" + key}>{key}</button>
                                                        )
                                                    })
                                                    // style={(this.state.currentpage==key)?"color=red":"color=green"}
                                                    :
                                                    (this.state.isFilterPress) ?
                                                        arrayfilterpages.map((key, value) => {
                                                            return (
                                                                <button key={['btn-3-'+value]} className={[(this.state.currentpage==key)?" currentpage ":""]+"color_pagination pointer"} onClick={() => this.step_one_of_afficherpaginationfilter(key)} id={"page" + key}>{key}</button>
                                                            )
                                                        })
                                                        :
                                                        arraypages.map((key, value) => {
                                                            return (
                                                                <button key={['btn-2-'+value]} className={[(this.state.currentpage==key)?" currentpage ":""]+"color_pagination pointer"} onClick={() => this.step_one_of_afficherpaginationfilter(key)} id={"page" + key}>{key}</button>
                                                            )
                                                        })
                                                }
                                                {
                                                    (this.state.isSearchPress) ?
                                                        ((arraysearchedpages.length == this.state.currentpage) ? "" : <button className="blue pointer" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}><Next /></button>)
                                                            // && (arraysearchedpages.length != 1) ? <button className="blue" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}>Next</button> : null)
                                                        :
                                                        (this.state.isFilterPress) ?
                                                            ((arrayfilterpages.length == this.state.currentpage) ? "" : <button className="blue pointer" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}><Next /></button>)
                                                                // || (arrayfilterpages.length != 1) ? <button className="blue" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}>Next</button> : null
                                                            :
                                                            ((arraypages.length == this.state.currentpage ) ? "" : <button className="blue pointer" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}><Next /></button>)
                                                                // || (arraypages.length != 1) ? <button className="blue" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}>Next</button> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                   )
                                   :(this.state.isSearchPress==true)?(arraysearchedpages.length<=1)?"":
                                   <div className="col-12 col-sm-12 col-md-11 col-lg-11 col-xl-11 col-xxl-11 p-5  pr-4">
                                        <div className="row">
                                            <div className="col-1 col-sm-1 col-md-8 col-lg-10 col-xl-10 col-xxl-10"></div>
                                            <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2 medianext paginnext container-fluid p-0 gill regular paddingrightnext " >
                                            { (this.state.isSearchPress) ?
                                                        ((this.state.currentpage == 1 ) ?"":
                                                        <button className="blue pointer" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage - 1)}><Back /></button>)
                                                        :
                                                        ((this.state.currentpage == 1 ) ?"":
                                                        <button className="blue pointer" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage - 1)}><Back /></button>)
                                                    }
                                                
                                                {(this.state.isSearchPress) ?
                                                    arraysearchedpages.map((key, value) => {
                                                        return (
                                                            <button key={['btn-1-'+value]} className={[(this.state.currentpage==key)?" currentpage ":""]+"color_pagination pointer"} onClick={() => this.step_one_of_afficherpaginationfilter(key)} id={"page" + key}>{key}</button>
                                                        )
                                                    })
                                                    // style={(this.state.currentpage==key)?"color=red":"color=green"}
                                                    :
                                                    (this.state.isFilterPress) ?
                                                        arrayfilterpages.map((key, value) => {
                                                            return (
                                                                <button key={['btn-3-'+value]} className={[(this.state.currentpage==key)?" currentpage ":""]+"color_pagination pointer"} onClick={() => this.step_one_of_afficherpaginationfilter(key)} id={"page" + key}>{key}</button>
                                                            )
                                                        })
                                                        :
                                                        arraypages.map((key, value) => {
                                                            return (
                                                                <button key={['btn-2-'+value]} className={[(this.state.currentpage==key)?" currentpage ":""]+"color_pagination pointer"} onClick={() => this.step_one_of_afficherpaginationfilter(key)} id={"page" + key}>{key}</button>
                                                            )
                                                        })
                                                }
                                                {
                                                    (this.state.isSearchPress) ?
                                                        ((arraysearchedpages.length == this.state.currentpage) ? "" : <button className="blue pointer" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}><Next /></button>)
                                                            // && (arraysearchedpages.length != 1) ? <button className="blue" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}>Next</button> : null)
                                                        :
                                                        (this.state.isFilterPress) ?
                                                            ((arrayfilterpages.length == this.state.currentpage) ? "" : <button className="blue pointer" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}><Next /></button>)
                                                                // || (arrayfilterpages.length != 1) ? <button className="blue" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}>Next</button> : null
                                                            :
                                                            ((arraypages.length == this.state.currentpage ) ? "" : <button className="blue pointer" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}><Next /></button>)
                                                                // || (arraypages.length != 1) ? <button className="blue" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}>Next</button> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                   
                                   
                                   
                                   :(arraypages.length<=1)?"":
                                    <div className="col-12 col-sm-12 col-md-11 col-lg-11 col-xl-11 col-xxl-11 p-5 pr-0 pr-md-4">
                                        <div className="row">
                                            <div className="col-1 col-sm-1 col-md-8 col-lg-10 col-xl-10 col-xxl-10"></div>
                                            <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2 medianext paginnext container-fluid p-0 gill regular paddingrightnext " >
                                            { (this.state.isSearchPress) ?
                                                        ((this.state.currentpage == 1 ) ?"":
                                                        <button className="blue pointer" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage - 1)}><Back /></button>)
                                                        :
                                                        ((this.state.currentpage == 1 ) ?"":
                                                        <button className="blue pointer" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage - 1)}><Back /></button>)
                                                    }
                                                
                                                {(this.state.isSearchPress) ?
                                                    arraysearchedpages.map((key, value) => {
                                                        return (
                                                            <button key={['btn-1-'+value]} className={[(this.state.currentpage==key)?" currentpage ":""]+"color_pagination pointer"} onClick={() => this.step_one_of_afficherpaginationfilter(key)} id={"page" + key}>{key}</button>
                                                        )
                                                    })
                                                    // style={(this.state.currentpage==key)?"color=red":"color=green"}
                                                    :
                                                    (this.state.isFilterPress) ?
                                                        arrayfilterpages.map((key, value) => {
                                                            return (
                                                                <button key={['btn-3-'+value]} className={[(this.state.currentpage==key)?" currentpage ":""]+"color_pagination pointer"} onClick={() => this.step_one_of_afficherpaginationfilter(key)} id={"page" + key}>{key}</button>
                                                            )
                                                        })
                                                        :
                                                        arraypages.map((key, value) => {
                                                            return (
                                                                <button key={['btn-2-'+value]} className={[(this.state.currentpage==key)?" currentpage ":""]+"color_pagination pointer"} onClick={() => this.step_one_of_afficherpaginationfilter(key)} id={"page" + key}>{key}</button>
                                                            )
                                                        })
                                                }
                                                {
                                                    (this.state.isSearchPress) ?
                                                        ((arraysearchedpages.length == this.state.currentpage) ? "" : <button className="blue pointer" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}><Next /></button>)
                                                            // && (arraysearchedpages.length != 1) ? <button className="blue" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}>Next</button> : null)
                                                        :
                                                        (this.state.isFilterPress) ?
                                                            ((arrayfilterpages.length == this.state.currentpage) ? "" : <button className="blue pointer" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}><Next /></button>)
                                                                // || (arrayfilterpages.length != 1) ? <button className="blue" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}>Next</button> : null
                                                            :
                                                            ((arraypages.length == this.state.currentpage ) ? "" : <button className="blue pointer" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}><Next /></button>)
                                                                // || (arraypages.length != 1) ? <button className="blue" onClick={() => this.step_one_of_afficherpaginationfilter(this.state.currentpage + 1)}>Next</button> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    )
                                    }
                                </div>
                            {/* </section> */}
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
  );}
}
export default  withTranslation()(product);