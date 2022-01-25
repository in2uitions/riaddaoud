import Head from 'next/head';

// import styles from '../style2.module.css'
function HEAD({ title, description }) {
  return (
    <div>
      <Head>
        {/* <title >{title}</title> */}
        <title>{'Riad Daoud'}</title>

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.css" rel="stylesheet" type='text/css' />
        <script src="https://code.jquery.com/jquery-3.5.0.js"></script>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js " integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN " crossOrigin="anonymous "></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js " integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q " crossOrigin="anonymous "></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js " integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl " crossOrigin="anonymous "></script>
        <script src="https://unpkg.com/scrollreveal@3.3.2/dist/scrollreveal.min.js"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css" rel="stylesheet" type='text/css' />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js" integrity="sha512-bPs7Ae6pVvhOSiIcyUClR7/q2OAsRiovw4vAkX+zJbw3ShAeeqezq50RIIcIURq7Oa20rW2n2q+fyXBNcU9lrw==" crossOrigin="anonymous"></script>
        <link rel="stylesheet" href="assets/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="assets/css/owl.theme.default.min.css" />
        <link rel="icon"
          type="image/png"
          href="/assets/images/logoname.png" />
        <script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>
        {/* <link rel= "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.0/owl.carousel.min.js"/> */}
        {/* <link rel= "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"/> */}




      </Head>
      {/* <p >{title}  And  {description}</p> */}
      {/* <p className={styles.p}>{description}</p> */}
    </div>
  )
}
export default HEAD;