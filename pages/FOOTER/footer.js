import React from 'react';
import Link from 'next/link'
import DirectusSDK from '@directus/sdk-js';
const directus = new DirectusSDK('https://rdcms.businessexchange.me/')
import { withTranslation } from "react-i18next";
 class footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],

        };
    
        this.getData=this.getData.bind(this);
      }
      async getData() {
        var datadirect=await directus.items('website_settings').read();
    
        this.setState({ data: datadirect.data});

      }
      componentDidMount () {
        this.getData();}
    render(){
    return(
        <footer >
            <div className={[(this.props.i18n.language=="ar")?"rtl  ":" "]+"footermain "}>
                <div className="container-fluid px-4 py-1">
                    <div className="row ">
                        <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10 p-0 mt-5 ">
                            <div className="container-fluid p-0">
                                <div className="row ">
                                    <div className="col-12 col-sm-12 col-md-7 col-lg-4 col-xl-4 col-xxl-4  ">
                                        <div className="container-fluid ">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 d-flex Products footerheighttitile">
                                                <div className="container-fluid p-0 ">
                                                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10 p-0 d-flex ">
                                                        <img src="./assets/images/riad_daoud_logo.svg" alt="logo name" className="img-fluid cover" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 py-3">
                                                <div className="container-fluid p-0">
                                                    <div className={[(this.props.i18n.language=="ar")?"textalignright  ":" "]+"container-fluid p-0"}>
                                                        <p className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill "]+"footertext light text-lightgrey lineheight"}>{this.state.data.footer_brief}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 p-md-0 ">
                                        <div className="container-fluid p-md-0">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 Products d-flex p-0  footerheighttitile">
                                                <div className="container-fluid p-0">
                                                    <h3 className={[(this.props.i18n.language=="ar")?"textalignright DroidKufi  ":"gill "]+"meduim px-md-1  blue"}>{(this.props.i18n.language=="ar")?"اتصل بنا":"Contact Us"}</h3>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 py-3">
                                                <div className="container-fluid lineheight">
                                                    <div className="row">
                                                        <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 p-0 ">
                                                            <Link href={"mailto:"+this.state.data.contact_email+""}>
                                                                 <img src="./assets/images/email.svg" alt="email logo" className="img-fluid cover ml-1 pointer" />
                                                            </Link>
                                                        </div>
                                                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 p-0">
                                                            <Link href={"mailto:"+this.state.data.contact_email+""}>
                                                                <div className={[(this.props.i18n.language=="ar")?"textalignright  ":" "]+"container-fluid"}>
                                                                    <a href={"mailto:"+this.state.data.contact_email+""} className="footertext meduim textblack">{this.state.data.contact_email}</a>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 p-md-0">
                                        <div className="container-fluid p-md-0">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 Products d-flex p-0 footerheighttitile">
                                                <div className="container-fluid p-0">
                                                    <h3 className={[(this.props.i18n.language=="ar")?"textalignright DroidKufi ":"gill "]+"meduim px-md-1 blue"}>{(this.props.i18n.language=="ar")?"تابعنا":"Follow Us"}</h3>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 Products d-flex py-2 p-0">
                                                <div className="container-fluid ">
                                                    <div className="row ">
                                                        <div className="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2 col-xxl-2 p-0 px-md-2">
                                                        <Link href={""+this.state.data.facebook_link+""}>
                                                            <img src="./assets/images/facebook.svg" alt="socialmedia logo" className="img-fluid cover pointer  " />
                                                            </Link>
                                                        </div>
                                                        <div className="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2 col-xxl-2 p-0 px-2">
                                                        <Link href={""+this.state.data.twitter_link+""}>
                                                            <img src="./assets/images/twitter.svg" alt="socialmedia logo" className="img-fluid  cover pointer  " />
                                                            </Link>
                                                        </div>
                                                        <div className="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2 col-xxl-2 p-0 px-2">
                                                        <Link href={""+this.state.data.instagram_link+""}>
                                                            <img src="./assets/images/insta.svg" alt="socialmedia logo" className="img-fluid  cover pointer  " />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
                        <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1"></div>
                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10 p-0 mt-3">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className={[(this.props.i18n.language=="ar")?"textalignright  ":" "]+"col-12 col-sm-12 col-md-8 col-lg-4 col-xl-4 col-xxl-4"}>
                                        <p className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill light "]+"footerallright  font_size_small"}>
                                        {this.props.t("footersignature")}
                                            </p>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4"></div>
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4"></div>
                                                <div className="col-12 col-sm-12 col-md-10 col-lg-8 col-xl-8 col-xxl-8 row footerclaim">
                                                    <a href="#" className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill light "]+"footerallright   font_size_small"}>{this.props.t("Claim")}</a>
                                                    <a href="#" className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill light "]+"footerallright   font_size_small"}>{this.props.t("Privacy")}</a>
                                                    <a href="#" className={[(this.props.i18n.language=="ar")?"DroidKufi ":"gill light "]+"footerallright   font_size_small"}>{this.props.t("Terms")}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}}
export default withTranslation() (footer);