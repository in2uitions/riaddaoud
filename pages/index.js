import Head from "next/head";
import React from "react";
// import Header from './HEAD/head.js';
import Navigation from "./NAVIGATION/nav.js";
import Footer from "./FOOTER/footer.js";
import Link from "next/link";
import '@fortawesome/fontawesome-free/js/fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {useTranslation} from 'react-i18next';
import { withTranslation } from "react-i18next";
import DirectusSDK from '@directus/sdk-js';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
const responsiveseconde = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
const directus = new DirectusSDK('https://rdcms.businessexchange.me/')
class index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      databox: 0,
      categ: [],
      brands: [],
      products: [],
      articles: [],
      currentslidecarousel: 1,
      oldSlide: 0,
      activeSlide: 0,
      activeSlide2: 0
    };

    this.getData = this.getData.bind(this);
  }

  async getData() {
    var datadirectbox = await directus.items('backgrounds').read({
      filter: {
        target_page: {
          "_contains": "home",
        }
      }
    });
    var datadirectbrand = await directus.items('brands').read();
    var datadirectproducts = await directus.items('products').read();
    var datadirectarticles = await directus.items('articles').read();




    this.setState({ databox: datadirectbox.data });
    var datadirectcateg = await directus.items('categories').read();
    this.setState({ categ: datadirectcateg.data, brands: datadirectbrand.data, products: datadirectproducts.data, articles: datadirectarticles.data });
    this.loadcarousel();
  }
  loadcarousel() {
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
  (function($, window, document, undefined) {
      /**
       * Creates the Linked plugin.
       * @class The Linked Plugin
       * @param {Owl} carousel - The Owl Carousel
       */
      var Linked = function(carousel) {
          /**
           * Reference to the core.
           * @protected
           * @type {Owl}
           */
          this._core = carousel;

          /**
           * All event handlers.
           * @protected
           * @type {Object}
           */
          this._handlers = {
              'dragged.owl.carousel changed.owl.carousel': $.proxy(function(e) {
                  if (e.namespace && this._core.settings.linked) {
                      this.update(e);
                  }
              }, this),
              'linked.to.owl.carousel': $.proxy(function(e, index, speed, standard, propagate) {
                  if (e.namespace && this._core.settings.linked) {
                      this.toSlide(index, speed, propagate);
                  }
              }, this)
          };

          // register event handlers
          this._core.$element.on(this._handlers);

          // set default options
          this._core.options = $.extend({}, Linked.Defaults, this._core.options);
      };

      /**
       * Default options.
       * @public
       */
      Linked.Defaults = {
          linked: false
      };

      /**
       * Updated linked instances
       */
      Linked.prototype.update = function(e) {
          this.toSlide(e.relatedTarget.relative(e.item.index));
      };

      /**
       * Carry out the to.owl.carousel proxy function
       * @param {int} index
       * @param {int} speed
       * @param {bool} propagate
       */
      Linked.prototype.toSlide = function(index, speed, propagate) {
          var id = this._core.$element.attr('id'),
              linked = typeof(this._core.settings.linked) === 'string' ? this._core.settings.linked.split(',') : this._core.settings.linked;

          if (typeof propagate == 'undefined') {
              propagate = true;
          }

          index = index || 0;

          if (propagate) {
              $.each(linked, function(i, el) {
                  $(el).trigger('linked.to.owl.carousel', [index, 300, true, false]);
              });
          } else {
              this._core.$element.trigger('to.owl.carousel', [index, 300, true]);

              if (this._core.settings.current) {
                  this._core._plugins.current.switchTo(index);
              }
          }
      };

      /**
       * Destroys the plugin.
       * @protected
       */
      Linked.prototype.destroy = function() {
          var handler, property;

          for (handler in this._handlers) {
              this.$element.off(handler, this._handlers[handler]);
          }
          for (property in Object.getOwnPropertyNames(this)) {
              typeof this[property] != 'function' && (this[property] = null);
          }
      };

      $.fn.owlCarousel.Constructor.Plugins.linked = Linked;
  })(window.Zepto || window.jQuery, window, document);

  var sync2 = $(".carousel_2");

  $(sync2).owlCarousel({
      nav: true,
      loop: true,
      items: 5,
      // margin: 2,
      center: true,
      dots: false,
      responsive: {
          700: {
              items: 3
          },
          500: {
              items: 2
          },
          200: {
              items: 2
          }
      },
      navText: ["<div class='nav-btn prevlogo-slide '><img src='./assets/images/bigleft.png' style='object-fit: contain;height: 20px' class='img-fluid ' /></div>", "<div class='nav-btn nextlogo-slide'><img src='./assets/images/bigright.png' style='object-fit: contain;height: 20px' class='img-fluid ' /></div>"],
      // slideSpeed: 300,
      // paginationSpeed: 400,

      linked: sync2.prev()
  }).on('initialized.owl.carousel linked.to.owl.carousel', function() {
      sync2.find('.owl-item.current').removeClass('current');
      var current = sync2.find('.owl-item.active.center').length ? sync2.find('.owl-item.active.center') : sync2.find('.owl-item.active').eq(0);
      current.addClass('current');

  });

  $(document).ready(function () {
    $(".item").addClass("animated slideInUp");
  });
  }

  componentDidMount() {
    this.getData();


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

    function myFunction() {
      document.getElementById("myDropdown").classList.toggle("show");
    }

    window.onclick = function (event) {
      if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };
    $(document).ready(function () {
      $(".bigslider").owlCarousel({
        loop: true,
        nav: true,
        items: 1,
        navText: [
          "<div class='nav-btn prev-slide '><img src='./assets/images/bigleft.png' style='object-fit: cover' class='img-fluid ' /></div>",
          "<div class='nav-btn next-slide'><img src='./assets/images/bigright.png' style='object-fit: cover' class='img-fluid ' /></div>",
        ],
        slideSpeed: 300,
        paginationSpeed: 400,
      });
    });
  }
  filter(current) {
   
    // document.getElementById(2).style.opacity = "0.5";
    // document.getElementById(4).style.transform ="0.5";
    // document.getElementById("3").style.transform ="0.5";
    // // alert(this.state.brands.length)
    // for(const i in this.state.brands){
    //   if(current==i)
    //     {document.getElementById(current).style.transform = "scale(2)";}
    //   else {
    //     document.getElementById(i).style.transform = "scale(1)";
    //   }
        
    // }
   
    // console.log("this is the current "+current)
}
  render() {
    // const {t,i18n}=useTranslation();
    var b = [];
    for (const i in this.state.databox[0]) {
      b[i] = this.state.databox[0][i];
    }
    var posts = [];
    for (const prod in this.state.products) {
      var k = this.state.products.length;
      var lastk = + k - 1;
      var firstk = + k - 4;
      if ((prod <= lastk) && (prod >= firstk)) { posts[prod] = this.state.products[prod] }
    }
    const lastposts = posts.filter((_, i) => i > 0);
    var brannnnds = [];
    for (const y in this.state.brands) {
      brannnnds[y] = this.state.brands[y];
    }
    var arrayofbrandsimages = brannnnds.map((key, value) => key.image);
    var startb_url = 'https://rdcms.businessexchange.me/assets/';
    var endb_url = '?key=system-large-contain';
    var valuebackimg = b.image;
    const imagbackeurl = startb_url + valuebackimg + endb_url;
    var categarray = [];
    for (const i in this.state.categ) {
      categarray[i] = this.state.categ[i];
    }
    var last3articles = []
    for (const y in this.state.articles) {
      if (this.state.articles[y].id == this.state.articles.length - 2) last3articles.push(this.state.articles[y])
      if (this.state.articles[y].id == this.state.articles.length - 1) last3articles.push(this.state.articles[y])
      if (this.state.articles[y].id == this.state.articles.length) last3articles.push(this.state.articles[y])
    }
    if (b.subtitle_ar == null) { var subtitle_ar = b.subtitle }
    else var subtitle_ar = b.subtitle_ar
    if (b.title_ar == null) { var title_ar = b.title }
    else var title_ar = b.title_ar
    if (b.description_ar == null) { var description_ar = b.description }
    else var description_ar = b.description_ar
    if (b.box_title_ar == null) { var box_title_ar = b.box_title }
    else var box_title_ar = b.box_title_ar
    if (b.box_description_ar == null) { var box_description_ar = b.box_description }
    else var box_description_ar = b.box_description_ar
    return (
      <div >
        <Navigation current="index"></Navigation>
        <div>
          <section className="video-wrapper videowrapperparallax ">
            <div
              id="owl-demo"
              className="owl-carousel owl-theme  bigslider relative "
            >
              <div className="item  p-0 relative ">
                <div className="container-fluid p-0">
                  <img
                    src={"" + imagbackeurl + ""}
                    alt="The Last of us"
                    className="img-fluid w-100 cover parallaxxi "
                  />
                  <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 p-0 boxtitle ">
                    <p className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "t"}>
                      {(this.props.i18n.language == "ar") ? title_ar : b.title}
                    </p>
                    <p className="boxetc mt-4">
                      <span className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "years regular"}>
                        {(this.props.i18n.language == "ar") ? subtitle_ar : b.subtitle}
                      </span>
                      <br />
                      <span className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "name lineheightbig  "}> {(this.props.i18n.language == "ar") ? description_ar : b.description}</span>
                    </p>
                  </div>
                  <div className="scroll">
                    <p className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "light scrolltoexp"}>
                      {this.props.t("scroll")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="item  p-0 relative ">
                <div className="container-fluid p-0">
                  <img
                    src={"" + imagbackeurl + ""}
                    alt="The Last of us"
                    className="img-fluid w-100 cover parallaxxi "
                  />
                  <div className="scroll">
                    <p className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "light scrolltoexp"}>
                      {this.props.t("scroll")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="item  p-0 relative ">
                <div className="container-fluid p-0">
                  <img
                    src={"" + imagbackeurl + ""}
                    alt="The Last of us"
                    className="img-fluid w-100 cover parallaxxi "
                  />
                  <div className="scroll">
                    <p className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "light scrolltoexp"}>
                      {this.props.t("scroll")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="scrollingg">
            <div className="container-fluid p-0 ">
              <div className="row mgb relative">
                <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 col-xxl-4 leftone p-0">
                  <div className="px-4 py-4  relative bluebox">
                    <h1 className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + " titlebox meduim"}>
                      {(this.props.i18n.language == "ar") ? box_title_ar : b.box_title}
                    </h1>
                    <h4 className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "etc py-4 mr-4 light"}>
                      {(this.props.i18n.language == "ar") ? box_description_ar : b.box_description}
                    </h4>
                  </div>
                </div>
                <div className="vr p-0">
                  <div className="vrr"></div>
                </div>
              </div>
              <div className="relative ">
                <hr className="hr my-5 " />
                <div className="thingonhr aligncenter">
                  <h1 className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "blue meduim biggersizefont"}>{this.props.t("indexcateg")}</h1>
                </div>
              </div>

              <div className="container-fluid  ">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 px-3 heightclip">
                  <div className="blocks "  >

                    {categarray.map((value, index) => {
                      //  var arrayofbrandsimages=brannnnds.map((key,value)=>key.image);
                      var startb_url = 'https://rdcms.businessexchange.me/assets/';
                      var endb_url = '?key=system-large-cover';
                      var valuebackimg = value.image;
                      const imagbackeurl = startb_url + valuebackimg + endb_url;
                      if (value.title_ar == null) { var title_ar = value.title }
                      else var title_ar = value.title_ar
                      if (value.id == 1) {
                        return (
                          <div key={['btn-4-'+index]} className="block  block--left clip406" style={{ backgroundImage: 'url(' + imagbackeurl + ')' }}>
                            <Link href="/product">
                              <a href="/product">
                                <h2 className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "white italic  textalign"}>{(this.props.i18n.language == "ar") ? title_ar : value.title}</h2>
                                <div className="overlayicateg"></div>
                              </a>
                            </Link>
                          </div>

                        )
                      }
                      if (value.id == categarray.length) {
                        return (
                          <div className="block  block--right clip406 " style={{ backgroundImage: 'url(' + imagbackeurl + ')' }}>
                            <Link href="/product">
                              <a href="/product">
                                <h2 className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "white italic  textalign"}>{(this.props.i18n.language == "ar") ? title_ar : value.title}</h2>
                                <div className="overlayicateg"></div>
                              </a>
                            </Link>
                          </div>

                        )
                      }
                      if (value.id == 2) {
                        return (
                          <div className="block  block_center clip406 " style={{ backgroundImage: 'url(' + imagbackeurl + ')' }}>
                            <Link href="/product">
                              <a href="/product">
                                <h2 className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "white italic  textalign"}>{(this.props.i18n.language == "ar") ? title_ar : value.title}</h2>
                                <div className="overlayicateg"></div>
                              </a>
                            </Link>
                          </div>

                        )
                      }
                      else {
                        return (
                          <div className="block   block_center1 clip406 " style={{ backgroundImage: 'url(' + imagbackeurl + ')' }}>
                            <Link href="/product">
                              <a href="/product">
                                <h2 className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "white italic  textalign"}>{(this.props.i18n.language == "ar") ? title_ar : value.title}</h2>
                                <div className="overlayicateg"></div>
                              </a>
                            </Link>
                          </div>

                        )
                      }

                    })}
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-3"></div>
              </div>

              <div className="relative ">
                <hr className="hr my-5 " />
                <div className="thingonhr aligncenter">
                  <h1 className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "blue meduim biggersizefont"}>{this.props.t("indexbrand")}</h1>
                </div>
              </div>
              <Carousel
              // centerMode={true}
              swipeable={true}
              draggable={false}
              showDots={false}
              ssr={false} 
              infinite={true}
              autoPlay={this.props.deviceType !== "mobile" ? true : true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
             
              transitionDuration={1000}
              containerclassName="carousel-container"
              deviceType={this.props.deviceType}
            
              beforeChange={ (current, next) =>
                      this.setState({ oldSlide: current, activeSlide: next 
                      })
                    
                    }
            afterChange= {current => 
                  this.setState({ activeSlide2: current })
               
                }
              responsive={responsive}>
              {brannnnds.map((value, index) => {
             
                //  var arrayofbrandsimages=brannnnds.map((key,value)=>key.image);
                var startb_url = 'https://rdcms.businessexchange.me/assets/';
                var endb_url = '?key=system-large-cover';
                var valuebackimg = value.image;
                const imagbackeurl = startb_url + valuebackimg + endb_url;

                return (
                <div key={['btn-5-'+index]} className={"textaligncenter "+index}>
                  <img
                    id={index}
                    src={"" + imagbackeurl + ""}
                    alt=""
                    className="img-fluid cover customimagecarousel" />
                    </div>

                )
              })}
            </Carousel>
            {/* {console.log(this.state.activeSlide)} */}
              {/* <div className="container-fluid  mb-5 py-5 py-md-2">
                <div className="owl-carousel1 owl-theme carousel_2 ">
                    {brannnnds.map((value, index) => {
                        //  var arrayofbrandsimages=brannnnds.map((key,value)=>key.image);
                        var startb_url =  'https://rdcms.businessexchange.me/assets/';
                        var endb_url='?key=system-large-cover';
                        var valuebackimg=value.image;
                        const imagbackeurl=startb_url+valuebackimg+endb_url;
                        
                          return (
                                  <img
                                      className="item"
                                      data-dots="1"
                                      src={""+imagbackeurl+""}
                                      alt=""
                                      className="img-fluid cover"/>
                                    
                          )
                          
                    })}
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-1 p-md-3"></div>
              </div> */}
              
              <div className="relative ">
                <hr className="hr my-5 " />
                <div className="thingonhr aligncenter">
                  <h1 className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "blue meduim biggersizefont"}>{this.props.t("indexnewestprod")}</h1>
                </div>
              </div>

              <div className="row px-md-5 px-5">
                <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
                <div className=" col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 col-xxl-10">
                <Carousel
              // centerMode={true}
              swipeable={false}
              draggable={false}
              showDots={false}
              ssr={false} 
              infinite={true}
              autoPlay={this.props.deviceType !== "mobile" ? true : true}
              autoPlaySpeed={1000}
              keyBoardControl={false}
              // removeArrowOnDeviceType={["superLargeDesktop", "desktop"]}
              transitionDuration={1000}
              containerclassName="carousel-container2"
              deviceType={this.props.deviceType}
            
              beforeChange={ (current, next) =>
                      this.setState({ oldSlide: current, activeSlide: next 
                      })
                    
                    }
            afterChange= {current => 
                  this.setState({ activeSlide2: current })
               
                }
              responsive={responsiveseconde}>
             {lastposts.map((key, value) => {
                        var startb_url = 'https://rdcms.businessexchange.me/assets/';
                        var endb_url = '?w=200&h=250 ';
                        var valuebackimg = key.image;
                        const imagbackeurl = startb_url + valuebackimg + endb_url;
                        if (key.title_ar == null) { var title_ar = key.title }
                        else var title_ar = key.title_ar
                        if (brannnnds[key.brand - 1].title_ar == null) { var brandstitle_ar = brannnnds[key.brand - 1].title }
                        else var brandstitle_ar = brannnnds[key.brand - 1].title_ar
                        return (
                          <div key={['btn-32-'+value]} className={[(this.props.i18n.language == "ar") ? "hoverbrandindexar " : "hoverbrandindex "] + " "}>
                            <Link href="/product">
                              <a href="/product">
                                <div className="container-fluid centereditems" >
                                  <div className='hiddenimg '>
                                    <img
                                      src={"" + imagbackeurl + ""}
                                      className="img-fluid imgshake "
                                    />
                                  </div>
                                </div>
                                <div className={[(this.props.i18n.language == "ar") ? "textalignright " : " "] + "Products d-flex w-100"}>
                                  <p className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "footertext meduim prodbrandd w-100"}>
                                    {(this.props.i18n.language == "ar") ? title_ar : key.title}
                                    <br />
                                    <span className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "font_size  meduim blue"}>
                                      {(this.props.i18n.language == "ar") ? brandstitle_ar : brannnnds[key.brand - 1].title}
                                    </span>
                                  </p>
                                  <FontAwesomeIcon style={{ height: "20px" }} className="fass" icon={faSearch} />
                                </div>
                              </a>
                            </Link>
                          </div>

                        )
                      })}
            </Carousel>
                      {(this.props.i18n.language == "ar") ? "" : <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 "></div>}
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
                        <div className="container-fluid py-3">
                          <div className="row">
                            <div className={[(this.props.i18n.language == "ar") ? " " : "text-right "] + "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12  py-3"}>
                              <Link href="/product">
                                {(this.props.i18n.language == "ar") ?
                                  <a
                                    href="/product"
                                    className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "font_size_med  blue linkleft meduim viewproducts"}
                                  >
                                    <img src="./assets/images/smallleftfleche.svg" />
                                    <span className="ml-2">{this.props.t("viewourprod")}</span>
                                  </a>
                                  :
                                  <a
                                    href="/product"
                                    className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill meduim"] +"font_size_med  blue link  viewproducts"}
                                  >
                                    <span className="mr-2">{this.props.t("viewourprod")}</span>
                                    <img src="./assets/images/smallrightfleche.svg" />
                                  </a>}
                              </Link>
                            </div>
                          </div>
                        </div>
                      {/* </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid  ">
              <div className="relative py-3 py-md-0">
                <hr className="hr my-5 " />
                <div className="thingonhr aligncenter">
                  <h1 className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "blue meduim biggersizefont"}>{this.props.t("latestnews")}</h1>
                </div>
              </div>
              <div className={[(this.props.i18n.language == "ar") ? "rtl " : " "] + "row p-0 mt-4"}>
                <div className="container-fluid ">
                  <div className="row ">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 w-100" >
                      <div
                        id="carouselExample"
                        className="carousel slide w-100"
                        data-ride="carousel"
                      >
                        <div className="row ">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 relative w-100">
                            <div className="carousel-inner w-100">
                              {last3articles.map((value, index) => {
                                var startb_url = 'https://rdcms.businessexchange.me/assets/';
                                var endb_url = '?key=system-large-contain';
                                var valuebackimg = value.image;
                                const imagbackeurl = startb_url + valuebackimg + endb_url;
                                var act = " carousel-item";
                                if (value.title_ar == null) { var title_ar = value.title }
                                else var title_ar = value.title_ar
                                if (value.brief_ar == null || value.brief_ar == '') { var brief_ar = value.brief }
                                else var brief_ar = value.brief_ar
                                if (value.author_ar == null) { var author_ar = value.author }
                                else var author_ar = value.author_ar
                                if (index == 1) { act = "carousel-item active" }
                                return (
                                  <div key={['btn-2-'+index]} className={act}  >
                                    <div className="row p-0"  >
                                      <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 p-0 " style={{ height: "400px" }}>
                                        <img
                                          src={"" + imagbackeurl + ""}
                                          className="img-fluid cover w-100 h-100 "
                                        />
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 greyback " style={{ height: "400px" }}>
                                        <div className="container-fluid">
                                          <div className="row">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 col-xxl-10">
                                              <div className={[(this.props.i18n.language == "ar") ? "textalignright " : ""] + "px-2 py-5 w-100 h-100 "}>
                                                <span className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "subtitlenews"}>
                                                  {(this.props.i18n.language == "ar") ? title_ar : value.title}
                                                </span>
                                                <br />
                                                <div className="row pt-2 ">
                                                  <div className="col-6 col-sm-6 col-md-5 col-lg-4 col-xl-3 col-xxl-3 ">
                                                    <p className={[(this.props.i18n.language == "ar") ? "textalignright DroidKufi " : "gill "] + " semisubtitlenews bold"}>
                                                      {(this.props.i18n.language == "ar") ? author_ar : value.author}
                                                    </p>
                                                  </div>
                                                  <div className="col-6 col-sm-6 col-md-6 col-lg-5 col-xl-4 col-xxl-4 w-100">
                                                    <p className={[(this.props.i18n.language == "ar") ? "textalignright DroidKufi " : "gill "] + "regular semisubtitlenews"}>
                                                      {value.date}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className={[(this.props.i18n.language == "ar") ? "textalignright DroidKufi " : "gill "] + "textnews col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 w74 "}>
                                                  <span >
                                                    {(this.props.i18n.language == "ar") ? brief_ar : value.brief}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        {(this.props.i18n.language == "ar") ? <div className="col-2 "></div> : ""}
                                        <div className={[(this.props.i18n.language == "ar") ? "aligncenter col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 readmoreindex p-0" : "text-right floatl col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10 readmoreindex p-0"]} >
                                          <Link href="/media">
                                            {(this.props.i18n.language == "ar") ?
                                              <a
                                                href="/media"
                                                className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "viewproducts meduim font_size link"}
                                              >
                                                <span className="ml-3">{this.props.t("readmore")}</span>
                                                <img src="./assets/images/smallleftfleche.svg" />
                                              </a>
                                              :
                                              <a
                                                href="/media"
                                                className="viewproducts meduim font_size link"
                                              >
                                                <span className={[(this.props.i18n.language == "ar") ? "DroidKufi " : "gill "] + "mr-2"}>{this.props.t("readmore")}</span>
                                                <img src="./assets/images/smallrightfleche.svg" />
                                              </a>
                                            }
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )

                              })}

                              <ol className="carousel-indicators">
                                <li
                                  data-target="#carouselExample"
                                  data-slide-to="0"
                                  className=""
                                ></li>

                                <li
                                  data-target="#carouselExample"
                                  data-slide-to="1"
                                  className="active"
                                ></li>

                                <li
                                  data-target="#carouselExample"
                                  data-slide-to="2"
                                  className=""
                                ></li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer ></Footer>
          </div>

        </div>

      </div>
    );
  }
}
export default withTranslation()(index) 