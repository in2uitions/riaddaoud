import React from 'react';
import Link from 'next/link'

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            textarea:"",
            text:"",

        };
      }
       handleEmailChange =(e)=> {
        this.setState({email: e.target.value});
     }
      handletextChange =(e)=> {
        this.setState({text: e.target.value});
     }
      handletextareaChange =(e)=> {
        this.setState({textarea: e.target.value});
     }
     handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target)
        console.log("fettt")
      }
    render (){
        return(

    <form method="POST"  onSubmit={this.handleSubmit}>
        {console.log(this.state.text)}
        {console.log(this.state.email)}
        {console.log(this.state.textarea)}
      <label htmlFor="name">Name</label>
      <input type="text" name="name" onChange={this.handletextChange}/>
  
      <label htmlFor="email">Email</label>
      <input type="email" name="email" onChange={this.handleEmailChange}/>
  
      <label htmlFor="message">Message</label>
      <textarea name="message" rows="3"onChange={this.handletextareaChange}></textarea>
  
      <input type="submit" />
    </form>
)
}
}
  export default ContactForm;