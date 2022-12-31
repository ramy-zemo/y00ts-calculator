const sleep = async function (ms) {return new Promise(resolve => setTimeout(resolve, ms));}
const getUnmitedY00ts = require("../utils/getUnmitedY00ts");
const getTraitPrices = require("../utils/getTraitPrices");
const axios = require("axios");


let y00tsCron = async function (cache) {
    console.log("y00ts cron started...");
    
    while (true) {
        let traitPrices = await getTraitPrices();
        let unmitedY00ts = await getUnmitedY00ts();

        let t00bsStats = (await axios.get("https://api-mainnet.magiceden.dev/v2/collections/t00bs/stats")).data;
        let y00tsStats = (await axios.get("https://api-mainnet.magiceden.dev/v2/collections/y00ts/stats")).data;
    
        let t00bsFP = t00bsStats.floorPrice / 1000000000;
        let y00tsFP = y00tsStats.floorPrice / 1000000000;
        
        await cache.set("t00bsFP", t00bsFP);
        await cache.set("y00tsFP", y00tsFP);

        if (unmitedY00ts.length > 0 && traitPrices != false) {
            for (let i = 0; i < unmitedY00ts.length; i++) {
                let unmitedY00t = unmitedY00ts[i];
                let traits = unmitedY00t.attributes;
                let highestTrait = 0;

                if (traits.find(trait => trait.trait_type == "1/1" && trait.value != "None") != undefined) {
                    unmitedY00ts[i].highestTrait = 2000;
                }
                else {
                    for (trait of traits) {
                        let traitType = trait.trait_type;
                        let traitValue = trait.value;
    
                        let traitPrice = traitPrices[traitType.toLowerCase()][traitValue.toLowerCase().replaceAll(" ", "_")];
    
                        if (traitPrice > highestTrait) {
                            highestTrait = traitPrice;
                        }
                    }
    
                    unmitedY00ts[i].highestTrait = Math.round(highestTrait, 2);
                }
            }

            await cache.set("unmitedY00ts", JSON.stringify(unmitedY00ts));
            await cache.set("traitPrices", JSON.stringify(traitPrices));
        }

        await sleep(1000 * 60 * 15);
    }
}


module.exports = y00tsCron;