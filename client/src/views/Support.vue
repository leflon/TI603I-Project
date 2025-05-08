  <template>
    <h1>Thanks for using our website!</h1>
    <img src="/img/banner.jpg" alt="Banner" class="banner-image" />
    <div id ="info">
      <section class="info-elt">
        <h2>Who are we ?</h2>
        <p>
          We are Adèle, Paul, Matteo and Iri - a group of students who want to offer the ability to enjoy life again without relying on your phones. 
        </p>
      </section>
      <section class="info-elt">
        <h2>Our Mission</h2>
        <p>
          At Mist, our mission is to make your online shopping as smooth and enjoyable as a walk through a cloud. 
          We strive for the opportunity of bringing back your childhood memories, while providing a satisfying experience.
        </p>
      </section>
      <section class="info-elt">
        <h2>Technologies We Use</h2>
        <ul>
          <li>Vue.js – for fast and reactive user interfaces</li>
          <li>Bun – a fast JavaScript bundler and runtime</li>
          <li>MySQL – for powerful and efficient database management</li>
          <li>Git – to collaborate and manage code efficiently</li>
        </ul>
      </section>
      
    </div>

    
    <section>
      <h2>Contact Us</h2>
      <p>
        Have feedback or need help? We’re here for you!<br>
        Email: <a href="mailto:support@mistshop.com">support@mistshop.com</a>
      </p>
    </section>

  </template>

  <style>
  h1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px;
  }
  .banner-image {
  width: 100%; 
  max-width: 1500px;
  max-height: 250px;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 10px;
  }

  #info{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin: 0 auto;
    justify-content: center;
  }

  .info-elt  {
    margin: 40px 0;
    padding: 0 20px;
    text-align: justify;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li::before{
    content: "✔";
    color: var(--color-accent, #f302aa);
    padding-inline: 5px;
  }

  p{
    max-width: 500px;
    margin: 0 auto;
  }


  </style>
