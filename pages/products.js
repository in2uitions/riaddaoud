import React from 'react';
import Navigation from "./NAVIGATION/nav.js";
import Footer from "./FOOTER/footer.js";
import DirectusSDK from '@directus/sdk-js';
import { withTranslation } from "react-i18next";
import Api from './api/Api.js';
import i18n from '../i18n';
import { MDBDataTable } from 'mdbreact';
import Link from 'next/link'
import router from 'next/router'
import Head from "next/head";
import { useTranslation } from 'react-i18next';
function Back() {
    const { t } = useTranslation();

    return <span> {t('back')} </span>
}


const directus = new DirectusSDK(Api.baseUrl);
 
var image_url = Api.baseUrl + 'assets/';
var image_prefix = '?key=system-large-cover';
class Filter extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <>
             <Head>
                <title>{i18n.t('products')}</title>
              </Head>
                <select name="category" id="jquery_box" class="py-4 w-100 backgroundblue px-3 pointer " onChange={this.props.handleChange}  value={this.props.category}>
                    <option class="gill  px-4 selectoption textaligncenter meduim  font_size" value="0">ALL CATEGORIES</option>
                    {this.props.categories.map((item)=>(
                            <option class="gill  px-4 selectoption textaligncenter meduim  font_size" value={item.id} selected={this.props.category == item.id} >{item.title}</option>
                    ))}
                    <img src="./assets/images/productdropdown.svg" class="img-fluid cover" />
                </select>
                <div class="p-3 ">
                <h3 class=" gill meduim  blue"><span> {this.props.t('brand')} </span></h3>
                {this.props.brands.map((item)=>(
                <div class="col-12 px-0 py-2  d-flex align-items-center">
                        <div class="mr-3">
                        <label class="checkbox h-100 w-100 p-0 m-0 ">
                        <input type="checkbox" id="categCheck" name="brandsArr" value={item.id}  checked={this.props.brandsArr.get(item.id)} onChange={this.props.handleChangeChecbox}/></label>
                        </div>
                        <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 p-0 subtablinks ">
                            <h3 class=" gill light  text-lightgrey contents ">{[(i18n.language=="ar")?item.title_ar:item.title]}</h3>
                        </div>
                    </div>
                ))}
                {this.props.brands.length == 0?'No Brands':''}
                </div> 
                
                <div class="p-3 ">
                <h3 class=" gill meduim  blue"><span> {this.props.t('subcateg')} </span></h3>
                {this.props.subCategories.map((item)=>(
                    <div class="col-12 px-0 py-2  d-flex align-items-center">
                        <div class="mr-3">
                        <label class="checkbox h-100 w-100 p-0 m-0 ">
                        <input type="checkbox" id="categCheck" name="subcategories" value={item.id}  checked={this.props.subcategories.get(item.id)} onChange={this.props.handleChangeChecbox}/></label>
                        </div>
                        <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 p-0 subtablinks ">
                            <h3 class=" gill light  text-lightgrey contents ">{[(i18n.language=="ar")?item.title_ar:item.title]}</h3>
                        </div>
                    </div>
                ))}
                {this.props.subCategories.length == 0?'No Sub-Categories':''}
                </div>        
                <div class="textaligncenter py-4 " onClick={this.props.resetFilter}>
                    <button class="clearfilterbtn textaligncenter px-5 py-2">
                        <h3 class="gill  light safermarg text-lightgrey px-4"><span> Clear Filters </span></h3>
                    </button>
                </div>
            </>
        )
    }

}

 class products extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      boxArr:[],
      submit:[],
      categories:[],
      brands:[],
      brand:{},
      subCategories:[],
      category:0,
      tableRows:[],
      datatable:[],
      subcategories: new Map(),
      brandsArr: new Map(),
      language:''
      
    };

    this.getData=this.getData.bind(this);
    this.handleChangeChecbox = this.handleChangeChecbox.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
  }

  async getData() {
        var datadirect=await directus.items('backgrounds').read({
            filter: {
                target_page: {
                    "_contains": "products",
                },
                title: {
                    "_eq": "product",
                }
            }
        });

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('data_id');    
    var datadirectsubmit=await directus.items('website_settings').read();
    var categories=await directus.items('categories').read();
    var brand= {};

    if(router.query.brand_id)
    {
        const brandData=await directus.items('brands').read({
            filter: {
                id: {
                    "_eq": router.query.brand_id,
                }
            }
        });

        brand = brandData.data[0]
    }
    

    console.log(brand)
   


    if(myParam)
    {
        this.setState({category:myParam},()=>{
            this.getSubCategories();
        })
    }


    this.setState({ boxArr: datadirect.data[0] ,submit:datadirectsubmit.data,categories:categories.data,brand:brand});
    this.loadanim();
    this.getProducts();
    this.getSubCategories();
    
  }

  getSubCategories = async() =>
  {
    var subCategories = await directus.items('subcategories').read({
        filter: {
            category: {
                "_eq": this.state.category,
            },
        }
    });

     var query = {};


   
     var subcategoriesArr = Array.from(this.state.subcategories, ([name, value]) => ({ name, value }));
     var filteredSubCategory = subcategoriesArr.filter(function(item){
          return item.value == true;
      }).map(item => {
          return item.name
      })



     query['filter'] = {};
     if(this.state.category != 0){
         query['filter']['category'] = {
             "_eq": this.state.category,
          }
     }


     if(filteredSubCategory.length > 0)
     {
         query['filter']['subcategory'] = {
             "_in": filteredSubCategory,
          }  
     }
     query['fields'] = ['*','brand.*']

     
 
     let myData = await directus.items('products').read(query);
     let myDataSet = myData.data;

     let itemIds = [];

     for (var index = 0; index < myDataSet.length; index++) {
        itemIds[index] = myDataSet[index].brand.id;
     }


     var queryBrands = {};
     var brandsData = [];
     queryBrands['filter'] = {};

     if(router.query.brand_id)
     {
        itemIds = [router.query.brand_id];
     }
     if(itemIds.length > 0 ){
        queryBrands['filter']['id'] = {
             "_in": itemIds,
          }

          var brands=await directus.items('brands').read(queryBrands);
          brandsData = brands.data
     }
     else{
        brandsData = []
     }



    

   this.setState({subCategories:subCategories.data,brands:brandsData}); 
   this.getProducts()
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value },()=>{
        this.getSubCategories();
    });
  }

  getProducts = async() =>{ 

   var subcategoriesArr = Array.from(this.state.subcategories, ([name, value]) => ({ name, value }));
   var filteredSubCategory = subcategoriesArr.filter(function(item){
        return item.value == true;
    }).map(item => {
        return item.name
    })

   var brandsArr = Array.from(this.state.brandsArr, ([name, value]) => ({ name, value }));
   var filteredBrandsArr = brandsArr.filter(function(item){
        return item.value == true;
    }).map(item => {
        return item.name
    })


   
    let rowsData = []
    var query = {};
    query['filter'] = {};
    if(this.state.category != 0){
        query['filter']['category'] = {
            "_eq": this.state.category,
         }
    }
        
    if(filteredSubCategory.length > 0)
    {
        query['filter']['subcategory'] = {
            "_in": filteredSubCategory,
         }  
    }

    if(router.query.brand_id)
    {
        query['filter']['brand'] = {
            "_eq": router.query.brand_id,
         }  
        
    }

    if(router.query.search)
     {
        query['filter']['title'] = {
            "_contains": router.query.search,
         } 
     }
        

  

    if(filteredBrandsArr.length > 0)
    {
        query['filter']['brand'] = {
            "_in": filteredBrandsArr,
         }  
    }
          

    query['fields'] = ['*','brand.*']

    let myData = await directus.items('products').read(query);
    let myDataSet = myData.data;
    let itemIds = [];

    for (var index = 0; index < myDataSet.length; index++) {
        let rowItem = {}
 
        
        rowItem["name"] = (i18n.language=="ar")? myDataSet[index].title_ar : myDataSet[index].title
        rowItem["brand"] = (i18n.language=="ar")? myDataSet[index].brand?.title_ar : myDataSet[index].brand?.title
        rowItem["brief"] = myDataSet[index].brief
        var itemSpace = myDataSet[index].singleplace_or_doubleplace == 1 ?'single':'double'

        rowItem["title"] =  <div class={itemSpace+" hoverbrandindex p-4 js--fadeInb position-relative"}  >
                                <Link href={{ pathname: '/productdetail', as: "/media1/" + myDataSet[index].title, query: { data: myDataSet[index].title, data_id: myDataSet[index].id } }}>
                                    <a>
                                    <div class="hiddenimg pointer">
                                        <Link href={{ pathname: '/productdetail', as: "/media1/" + myDataSet[index].title, query: { data: myDataSet[index].title, data_id: myDataSet[index].id } }}>
                                            <div class="container-fluid centereditems"><img  src={ image_url+myDataSet[index].image}  class="img-fluid imgshake" /></div>
                                        </Link>
                                    </div>
                                    <div class="Products">
                                        <p class=" meduim prodbrandd">{rowItem.brand}<br /><span class="gill font_size  meduim blue">{rowItem.name}</span></p>
                                        <svg aria-hidden="true"  data-icon="search" class="svg-inline--fa fa-search fa-w-16 fass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{height: 20}}>
                                            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                        </svg>
                                     </div>
                                     </a>
                                </Link>
                            </div>
                            
        rowsData.push(rowItem)
    }

   

    this.setState({
        
        datatable:{
            columns: [
            {
            label: '',
            field: 'title',
            width: '100%',
            },
            
        ],
        rows: rowsData,
       },
       
        
    });
  }

  resetFilter(){
    this.setState({
        subcategories: new Map(),
      brandsArr: new Map(),
    },() =>{
        this.getData();
    })
    $("[id='myCheck']").prop('checked', false);
        $("[id='categCheck']").prop('checked', false);
  }
  loadanim(){
    $(function() {

      window.sr = ScrollReveal();
      if ($(window).width() < 768) {

          if ($('.animation').hasClass('js--fadeInb')) {
              $('.animation').removeClass('js--fadeInb').addClass('js--fadeInb');
          }


      } else {



      }



  });
  
  }
  

  handleChangeChecbox(e) {
    const item = e.target.name;
    const value = e.target.value;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ [item]: prevState.[item].set(value, isChecked) }),() => {
        this.getSubCategories();
        this.getProducts();
    });
    
  }

  componentDidMount () {
    
    this.getData();
  }
  componentDidUpdate(PrevProps, prevState){
      
      if(PrevProps.i18n.language != this.state.language){
          console.log(PrevProps.i18n.language);
          this.setState({
              language:i18n.language
          },()=>{
            this.getData();
          })
          
      }
  }


render (){
  
  return (
    <div >
      <Navigation current="products"></Navigation>
                    <div className="container-fluid p-0 parallax " style={{ backgroundImage: 'url(' + image_url+this.state.boxArr.image+image_prefix + ')' }}>
                        <div className={[(i18n.language=="ar")?"productnewbackar textalignright":"productnewback "]+" col-10 col-sm-10 col-md-10 col-lg-4 col-xl-4 col-xxl-4 p-0 "}>
                        </div>
                    </div>
                    <div className="container-fluid ">
                        
                        <div className="row">
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3"></div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 aboutheaderprodnew py-4 px-3">
                                <div className="container-fluid py-4 mb-4 ">
                                    <div className="row  py-4">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 py-3">
                                            {(this.state.brand.id)?<h1 className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+"meduim white  aligncenter"}>{[(i18n.language=="ar")?this.state.brand.title_ar:this.state.brand.title]}</h1>:
                                            <h1 className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+"meduim white  aligncenter"}>{[(i18n.language=="ar")?this.state.boxArr.box_title_ar:this.state.boxArr.box_title]}</h1>}
                                        </div>
                                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
                                        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10  py-3">
                                          {(this.state.brand.id)?<div className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+"light white   lineheightbig  aligncenter"}>{[(i18n.language=="ar")?this.state.brand.description_ar:this.state.brand.description]}</div>
                                            :<div className={[(i18n.language=="ar")?"DroidKufi ":"gill "]+"light white   lineheightbig  aligncenter"}>{[(i18n.language=="ar")?this.state.boxArr.box_description_ar:this.state.boxArr.box_description]}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                   
                    

                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h2 class="modal-title" id="exampleModalLongTitle">{this.props.t('filter')}</h2>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <Filter handleChange={this.handleChange} handleChangeChecbox={this.handleChangeChecbox} resetFilter={this.resetFilter} t={this.props.t} {...this.state} />
                    
                                </div>
                            </div>
                        </div>
                    </div>
              
                <div class="container-fluid py-5">
                

                    <div class="row">
                        <div class="d-block d-md-none pl-4">
                                
                                    <a href="/products" className=" backmediaprod my-3" style={{position:'relative',top:0}}>
                                    <div className="row ">
                                            <div className="container-fluid p-0 py-2 linkleft">
                                            <img src='./assets/images/smallleftfleche.svg' className="img-fluid cover backmediafleche" />
                                            <span className={[(i18n.language=="ar")?"DroidKufi ":"gill regular "]+"   color_pagination px-2"}><Back /></span>
                                        </div>
                                        </div>
                                    </a>
                                
                                <button type="button" class="navbar-toggler py-2 textaligncenter w-100 position-relative" data-toggle="modal" data-target="#exampleModalCenter">
                        
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="filter" class="svg-inline--fa fa-filter fa-w-16 searchiconsecnewprod" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{height:15}}><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg>
                                </button>
                        </div>
                     
                        <div class="col-md-3 d-none d-md-block">
                       
                                <a href="/products" className=" backmediaprod my-3" style={{position:'relative',top:0}}>
                                <div className="row ">
                                        <div className="container-fluid p-0 py-2 linkleft">
                                        <img src='./assets/images/smallleftfleche.svg' className="img-fluid cover backmediafleche" />
                                        <span className={[(i18n.language=="ar")?"DroidKufi ":"gill regular "]+"   color_pagination px-2"}><Back /></span>
                                    </div>
                                    </div>
                                </a>
                            
                              <Filter handleChange={this.handleChange} handleChangeChecbox={this.handleChangeChecbox} resetFilter={this.resetFilter} t={this.props.t} {...this.state} />
                        </div>
                        <div class="col-md-9 ">
                             <MDBDataTable   
                                    class="cards"
                                    small 
                                    
                                    data={this.state.datatable} 
                                    onChangePage={()=>{alert();window.scrollTo(0, 0);}}
                                    
                             />
                            
                        </div>
                    </div>
                </div>
      <Footer></Footer>
    </div>
  );}
}
export default  withTranslation() (products);
