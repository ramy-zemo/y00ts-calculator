let allY00ts;

const init = async () => {
    let data = (await axios.get("https://api.y00ts-stats.tech/getY00ts")).data;
    allY00ts = data;
    let traitPrices = (await axios.get("https://api.y00ts-stats.tech/getTraitPrices")).data;

    let t00bsFP = (await axios.get("https://api.y00ts-stats.tech/getT00bsFP")).data;
    let y00tsFP = (await axios.get("https://api.y00ts-stats.tech/getY00tsFP")).data;

    let maxLoss = Math.round(t00bsFP - y00tsFP);
    
    let highestTraitPrice = 0;
    let highestTrait = "";

    for (category of Object.keys(traitPrices)) {
        let categoryTraits = traitPrices[category];

        if (category == "1/1") {
            continue;
        }

        for (trait of Object.keys(categoryTraits)) {
            let price = categoryTraits[trait];

            if (price > highestTraitPrice) {
                highestTraitPrice = price;
                highestTrait = trait;
            }
      }
    }

    let maxProfit = Math.round(highestTraitPrice - t00bsFP);
    let oneOfones = data.filter(y00t => y00t.isOneOne === true)

    $("#stats-list").append(`<li class="list-group-item">t00bs Floor Price: ${t00bsFP} SOL</li>`);
    $("#stats-list").append(`<li class="list-group-item">y00ts Floor Price: ${y00tsFP} SOL</li>`);
    $("#stats-list").append(`<li class="list-group-item">Max Profit: ${maxProfit} SOL (excluding the ${oneOfones.length} 1/1s)</li>`);
    $("#stats-list").append(`<li class="list-group-item">Max Loss: ${maxLoss} SOL</li>`);
    $("#stats-list").append(`<li class="list-group-item">Most valuable Trait: ${highestTrait.charAt(0).toUpperCase() + highestTrait.slice(1)} | Price: ${highestTraitPrice} SOL</li>`);

    let profitAmounts = {
        "1%": 0,
        "10%": 0,
        "25%": 0,
        "50%": 0,
        "100%": 0,
    }

    let profitableY00ts = 0;

    for (y00t of data) {
        if (y00t.isOneOne == true) {
            continue;
        }

        let y00tValue = y00t.highestTrait;
        let profit = y00tValue - t00bsFP;

        if (profit > 0) {
            profitableY00ts++;
        }

        if (profit > t00bsFP) {
            profitAmounts["100%"]++;
        } else if (profit > 0.5 * t00bsFP) {
            profitAmounts["50%"]++;
        } else if (profit > 0.25 * t00bsFP) {
            profitAmounts["25%"]++;
        } else if (profit > 0.1 * t00bsFP) {
            profitAmounts["10%"]++;
        }
        else if (profit > 0) {
            profitAmounts["1%"]++;
        }
    }

    $("#stats-list").append(`<li class="list-group-item">Unmited Y00ts: ${data.length} | Profitable Y00ts: ${profitableY00ts} | Profit probability: ${((profitableY00ts / data.length) * 100).toFixed(2)}%</li>`);
    $("#stats-list").append(`<li class="list-group-item">Y00ts with 0% - 10% profit: ${profitAmounts["1%"]} | Probability: ${((profitAmounts["1%"] / data.length) * 100).toFixed(2)}%</li>`);
    $("#stats-list").append(`<li class="list-group-item">Y00ts with 10% - 25% profit: ${profitAmounts["10%"]} | Probability: ${((profitAmounts["10%"] / data.length) * 100).toFixed(2)}%</li>`);
    $("#stats-list").append(`<li class="list-group-item">Y00ts with 25% - 50% profit: ${profitAmounts["25%"]} | Probability: ${((profitAmounts["25%"] / data.length) * 100).toFixed(2)}%</li>`);
    $("#stats-list").append(`<li class="list-group-item">Y00ts with 50% - 100% profit: ${profitAmounts["50%"]} | Probability: ${((profitAmounts["50%"] / data.length) * 100).toFixed(2)}%</li>`);
    $("#stats-list").append(`<li class="list-group-item">Y00ts with 100% or more profit: ${profitAmounts["100%"]} | Probability: ${((profitAmounts["100%"] / data.length) * 100).toFixed(2)}%</li>`);


    let oneOfoneProb = oneOfones.length / data.length;

    oneOfones.forEach(y00t => {
        $('#1of1-list').append(`<li class="list-group-item">Name: ${y00t.attributes.find(t => t.trait_type == "1/1").value} | Probability: ${oneOfoneProb.toFixed(4)}% | FP: 👑</li>`)
    })

    let traitCounts = {
        "fur": {
            "paradise_green": 0,
            "tumbleweed": 0,
            "eggnog": 0,
            "stone": 0,
            "bone": 0,
            "sand_dollar": 0,
            "pink_marshmallow": 0,
            "hazel": 0,
            "pewter": 0,
            "wheat": 0,
            "chestnut": 0
        },
        "face": {
            "wholesome": 0,
            "chill": 0,
            "smirk": 0,
            "smile": 0,
            "blasé": 0
        },
        "head": {
            "skinny_headband": 0,
            "w_visor": 0,
            "truck_trucker": 0,
            "down_bad_snapback": 0,
            "cool_beanie": 0,
            "minimalist_camo_cap": 0,
            "spiky_hair": 0,
            "champ_hat": 0,
            "chill_hat": 0,
            "helmet": 0,
            "banana_beanie": 0,
            "flame_hat": 0,
            "red_horns": 0,
            "rockstar_hair": 0,
            "backwards_snapback": 0,
            "orange_beanie": 0,
            "big_cowboy_hat": 0,
            "windswept_hair": 0,
            "happy_hat": 0,
            "skull_trucker_hat": 0,
            "undercut": 0,
            "fuzzy_banana_bucket_hat": 0,
            "bucket_hat": 0,
            "mullet": 0,
            "money_bands": 0,
            "beanie_(blackout)": 0,
            "headphones": 0,
            "none": 0,
            "free_snapback": 0,
            "24k_gold_shoey_guzzler": 0,
            "frank_headband": 0,
            "mcy00ts_visor": 0,
            "color_block_halo": 0,
            "pyrite_crown": 0
        },
        "clothes": {
            "mechanic": 0,
            "banana_puffer": 0,
            "baseball_hoodie": 0,
            "nice_overalls": 0,
            "sunday_shirt": 0,
            "rugby_shirt": 0,
            "summer_shirt": 0,
            "army_t-shirt": 0,
            "football_jersey": 0,
            "angler_vest": 0,
            "blob_suit": 0,
            "jacksonhole_jacket": 0,
            "windbreaker_(blackout)": 0,
            "black_puff_jacket": 0,
            "cherry_puffer": 0,
            "varsity_jacket": 0,
            "professor": 0,
            "blue_sky_hoodie": 0,
            "cashmere_turtleneck": 0,
            "cream_flannel": 0,
            "black_tracksuit": 0,
            "ace_cardigan": 0,
            "miracle_jersey": 0,
            "stolen_hotel_robe": 0,
            "marshmallow_puffer": 0,
            "rare_t-shirt": 0,
            "blue_headphones": 0,
            "happy_hoodie": 0,
            "thrifted_denim_jacket": 0,
            "basketball_jersey": 0,
            "c.r.e.a.m._hoodie": 0,
            "classic_suit": 0,
            "billionaire_zip-up": 0,
            "orange_hoodie": 0,
            "the_hoodie": 0,
            "banana_hazmat": 0,
            "bear_coat": 0,
            "none": 0,
            "mcy00ts_polo": 0,
            "fast_jacket": 0
        },
        "eyewear": {
            "win-win_shades": 0,
            "ive_unibody": 0,
            "last_supper_squares": 0,
            "pollocks": 0,
            "rembrandt_goggles": 0,
            "6d_glasses": 0,
            "radiohead_squares": 0,
            "mondrian_squares": 0,
            "rounded_squares_(blackout)": 0,
            "blue_light_glasses": 0,
            "abbey_roads": 0,
            "cobain_goggles": 0,
            "van_goghs": 0,
            "monet_squares": 0,
            "tints_(yellow)": 0,
            "dieter_rams": 0,
            "hockney_squares": 0,
            "heatwaves": 0,
            "sunflowers": 0,
            "melrose_bricks": 0,
            "matisse_frames": 0,
            "cali_sunset": 0,
            "grand_budapest_shades": 0,
            "windsors_(blackout)": 0,
            "green_bricks": 0,
            "banksy_goggles": 0,
            "orange_soda_shades": 0,
            "tints_(blue)": 0,
            "mona_lisas": 0,
            "golden_hour_frames": 0,
            "retro_apple": 0,
            "warhols": 0,
            "lensless_glasses": 0,
            "aviators_(blackout)": 0,
            "tints_(red)": 0,
            "trapezoids": 0,
            "wayfarers_(blackout)": 0,
            "24k_gold_blocks": 0,
            "none": 0,
            "nouns": 0
        },
        "background": {
            "marshmallow": 0,
            "cannoli_cream": 0,
            "antique_white": 0,
            "phantom_green": 0,
            "snow_white": 0,
            "solitary_star": 0,
            "buttercream": 0,
            "powder_puff": 0,
            "bit_of_blue": 0,
            "vanilla_ice": 0
        }
    }

    for (y00t of data) {
        for (trait of y00t.attributes) {
            let traitName = trait.value.toLowerCase().replaceAll(" ", "_")
            let traitCategory = trait.trait_type.toLowerCase().replaceAll(" ", "_")

            try {
                let foundTrait = traitCounts[traitCategory][traitName];

                if (foundTrait || foundTrait === 0) {
                    traitCounts[traitCategory][traitName] += 1;
                }
            }
            catch (e) {}

        
        }
    }            

    let traitCountsList = Object.keys(traitCounts).map(function(key) {
        return {
            name: key,
            counts: Object.keys(traitCounts[key]).map(function(key2) {
                return {
                    name: key2,
                    count: traitCounts[key][key2]
                }
            })
        }
    })

    // Sort all the traits by traitPrice

    traitCountsList.forEach(function(trait) {
        trait.counts.sort(
            function(a, b) {
                return traitPrices[trait.name][b.name] - traitPrices[trait.name][a.name];
            }
        )
    });

    for (trait of traitCountsList) {
        let sumOfCounts = trait.counts.reduce(function(a, b) {
            return a + b.count;
        }, 0);

        for (counts of trait.counts) {
            $(`#${trait.name}-list`).append(`<li class="list-group-item">Name: ${counts.name} | Count: ${counts.count} | Probability: ${((counts.count / sumOfCounts) * 100).toFixed(4)}% | FP: ${traitPrices[trait.name][counts.name].toFixed(2)}</li>`);
        }
    }
}

init();

const randomY00t = async function() {
    document.getElementById("y00t-image").src = "./y00ts.gif"

    await new Promise(r => setTimeout(r, 2000));

    let randomY00t = allY00ts[Math.floor(Math.random() * allY00ts.length)];

    document.getElementById("y00t-image").src = randomY00t.image;
}

