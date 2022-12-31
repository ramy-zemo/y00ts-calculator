const axios = require('axios');


const getTraitPrices = async function () {
    try {
        let traitPrices = await axios.post("https://api.dustlabs.com/marketstats/attributes-fp", 
            {
                projectId: "A4FM6h8T5Fmh9z2g3fKUrKfZn6BNFEgByR8QGpdbQhk1"
            }
        )

        return traitPrices.data.attributesFP;
    }
    catch (err) {
        console.log(err);
    }

    return false;
}

module.exports = getTraitPrices; 