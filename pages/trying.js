import Head from "next/head";
// import Header from './HEAD/head.js';
import Link from 'next/link'
import React from 'react';
import Navigation from "./NAVIGATION/nav.js";
import Footer from "./FOOTER/footer.js";
import '@fortawesome/fontawesome-free/js/fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DirectusSDK from '@directus/sdk-js';
const directus = new DirectusSDK('https://rdcms.businessexchange.me/')

export default class contact extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            categ: 0,
          data: [],
          prod:[],
          brand:[],

        };
    
        this.getData=this.getData.bind(this);
      }
      async getData() {
        var datadirectcateg=await directus.items('categories').read();
        var datadirect=await directus.items('backgrounds').read({
            filter:{
                target_page:{
                    "_contains":"products",
                }
            }
        });
        var datadirectprod=await directus.items('products').read();
        var datadirectbrand=await directus.items('brands').read();
       
        this.setState({ data: datadirect.data,prod:datadirectprod.data,brand:datadirectbrand.data,categ: datadirectcateg.data});
        this.loadAnim();
    }
    loadAnim(){
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

        function myFunction() {
            document.getElementById("myDropdown").classList.toggle("show");
        }

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
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }
        $(function() {

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
      
                sr.reveal('.js--fadeInLeft', {
                    origin: 'left',
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
      
            sr.reveal('.js--fadeInLeft', {
                origin: 'left',
                distance: '300px',
                easing: 'ease-in-out',
                duration: 850,
            });
      
        });
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
    var products=[];
    for(const y in this.state.prod){
        products[y]=this.state.prod[y];
    }
    var brands=[];
    for(const y in this.state.brand){
        brands[y]=this.state.brand[y];
    }
    var categories=[]
    for(const i in this.state.categ){
        categories[i]=this.state.categ[i];
    }
  return (
<div>
      <Navigation current="products"></Navigation>
    <div>
        <div class="container-fluid p-0 parallax "style={{backgroundImage:'url('+imagbackeurl+')'}}>
        </div>
        <div class="container-fluid px-5 py-0">
            <div class="row">
                <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 "></div>
                <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 aboutheader py-5 p-0">
                    <div class="container-fluid p-0 py-1">
                        <div class="row py-4 ">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
                                <h1 class="meduim white  aligncenter">{a.box_title}</h1>
                            </div>
                            <div class="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 "></div>
                            <div class="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10  py-5">
                                <p class="light white footertext  aligncenter lineheight">{a.box_description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link href="/product">
            <a href="/product" class=" backmediaprod mt-3">
            <div class="row ">
                    <div class="container-fluid p-0 py-2 linkleft">
                    <img src='./assets/images/smallleftfleche.svg' class="img-fluid cover backmediafleche" />
                    <span class=" regular footertext color_pagination px-2">Back</span>
                </div>
                </div>
            </a>
            </Link>
        </div>
    </div>
    <div class="container-fluid p-3"></div>
    <div class="container-fluid px-4 mt-5">
        <div class="row ">
            <div class="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3 p-3 px-4 show js--fadeInLeft">
            <div className="panel-group" id="modal" role="tablist" aria-multiselectable="true">
                    <div className="panel">
                        <div className="col-md-12 visible-xs">
                        <div className="navbar-expand-lg">
                                <button data-parent="#modal" className="navbar-toggler" type="button"  data-toggle="modal" data-target="#myModal" aria-expanded="false" aria-label="Toggle navigation" aria-controls="navbarSupportedContent">
                                        <span>filter</span>
                                </button>
                                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                <div class="modal-dialog " role="document">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                    <p>FILTER</p>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    </div>
                                    <div class="modal-body">
                                    {categories.map((key,value)=>{
                                        return (
                                            <div>
                                                <button type="button" className="collapsible w-100 ">
                                                    <div className="container-fluid px-2 textalignleft">
                                                            <div className="row">
                                                                <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10 p-0  ">
                                                                    <h3 className="light text-lightgrey marginzero ">{key.title}</h3>
                                                                </div>
                                                                <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 p-0  aligncenter">
                                                                    <div className="container-fluid">
                                                                        <img src="./assets/images/productdropdown.svg" className="img-fluid cover" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </button>
                                                <div className="content">
                                                    {
                                                    (key.category>0)?(<p dangerouslySetInnerHTML={{__html:this.state.categ[key.category-1].title}} className="light text-lightgrey  "></p>):null
                                                    }
                                                </div>
                                             </div>
                                        )
                                         
                                         })}
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 mt-4 mb-4">
                                            <h3 className="light blue">Filter By Brand</h3>
                                        </div>
                                        <div className="row px-4">
                                        {brands.map((key,value)=>{
                                            return (
                                                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-1">
                                                    <div className="container-fluid p-0">
                                                        <div className="row">
                                                            <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 p-0 mr-3 ">
                                                                <label className="checkbox h-100 w-100 p-0 ">
                                                        <input type="checkbox" id="myCheck"  name={""+key.title+""} value={""+key.title+""}  />
                                                        </label>
                                                            </div>

                                                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-0 subtablinks">
                                                                <h3 className="light text-lightgrey contents ">{key.title}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                )
                                            })}
                                            </div>
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                        {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid product3dunno p-0 div-collapse collapse" id="collapse1">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 mb-3">
                                <h3 class="light blue">Browse Categories</h3>
                            </div>
                            {categories.map((key,value)=>{
                             return(
                                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-3 ">
                                    <div class="container-fluid p-0">
                                        <div class="row">
                                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 ">
                                                <button type="button" class="collapsible w-100 ">
                                            <div class="container-fluid px-2 textalignleft">
                                                <div class="row">
                                                    <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9 p-0  ">
                                                        <h3 class="light text-lightgrey marginzero ">{key.title}</h3>
                                                    </div>
                                                    <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 p-0  aligncenter">
                                                        <div class="container-fluid">
                                                            <img src="./assets/images/productdropdown.svg" class="img-fluid cover" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                                <div class="content">
                                                    
                                                    {
                                                        (key.category>0)?(<p dangerouslySetInnerHTML={{__html:this.state.categ[key.category-1].title}}></p>):null
                                                    }
                                                </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                             )
                             
                             })}
                          
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-2">
                            </div>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 mt-4 mb-4">
                                <h3 class="light blue">Filter By Brand</h3>
                            </div>
                            {brands.map((key,value)=>{
                                return (
                                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-1">
                                        <div class="container-fluid p-0">
                                            <div class="row">
                                                <div class="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 p-0 mr-3">
                                                    <label class="checkbox h-100 w-100 p-0">
                                            <input type="checkbox" id={""+key.title+""}  name={""+key.title+""} value={""+key.title+""}  />
                                            </label>
                                                </div>

                                                <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-0">
                                                    <h3 class="light text-lightgrey contents ">{key.title}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                                })}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 col-xxl-9 mt-2">
                <section>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 ">
                        <div class="container-fluid p-0 row">
                            {products.map((key,value)=>{
                                 var end_url='?w=200&h=250 ';
                                 var valueimg=key.image;
                                 const imageurl=startb_url+valueimg+end_url;
                                return (
                                    <div className={(key.singleplace_or_doubleplace == 1)?("col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 hoverbrandindex py-3 js--fadeInb"):("col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 hoverbrandindex py-3 js--fadeInb")} data-id="Antiseptic">
                                           <Link  href={{ pathname: '/productdetail' , as:"/media1/"+key.id, query: { data:key.title,data_id:key.id }  }}>
                                      <a href={{ pathname: '/productdetail' , as:"/media1/"+key.id, query: { data:key.title,data_id:key.id }  }}>
                                        <div class="container-fluid centereditems" >
                                          <img
                                            src={""+imageurl+""}
                                            className="img-fluid "
                                          />
                                        </div>
                                        <div className="Products">
                                          <p className="footertext meduim prodbrandd">
                                          {/* {brands[key.brand].title} */}
                                         { brands[key.brand-1].title}
                                            <br />
                                            <span className="font_size gill meduim blue">
                                            {key.title}
                                            </span>
                                          </p>
                                          <FontAwesomeIcon style={{height:"20px"}} className="fass" icon={faSearch} />
                                          {/* <p className="fas fa-search searchiconindex"></p> */}
                                        </div>
                                      </a>
                                    </Link>
                                </div>
                                )
                                
                                
                                })}
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-5 mb-5">
                        <div class="row">
                            <div class="col-6 col-sm-6 col-md-8 col-lg-10 col-xl-10 col-xxl-10"></div>
                            <div class="col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 col-xxl-2 medianext paginnext gill regular paddingrightnext ">
                            <Link href=""><a href="#" class="color_pagination">1</a></Link>
                                 <Link href=""><a href="#" class="color_pagination">2</a></Link>
                                 <Link href=""><a href="#" class="color_pagination">3</a></Link>
                                 <Link href=""><a href="#" class="blue">Next</a></Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
    <Footer></Footer>
</div>
  );}
}
