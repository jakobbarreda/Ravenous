const apiKey =
  "QrR-aDdm53qo6RrGZJpM5-ifAZUUvTlUaRUm1UAUmsw80yFJAFdA9cwiX_pV2jwCZmq_KcUYs74O0zaMTBJfvN9MBkTbsOrlhe7hlUCEVnbPKkUM75Q3zpgsPV72Y3Yx";

const Yelp = {
  searchYelp(term, location, sortBy) {
    if (!term || !location) {
      throw new Error("No term or location entered");
    }
    // API request to yelp
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        // identification
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
      // convert returned response to JSON
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.businesses) {
          // if business exist then return an object
          return jsonResponse.businesses.map((business) => ({
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count,
          }));
        }
      });
  },
};

export default Yelp;
