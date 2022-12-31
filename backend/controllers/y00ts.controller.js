let getAllY00ts = async function (req, res) {
    let y00ts = await req.app.cache.get("unmitedY00ts");
    y00ts = JSON.parse(y00ts);

    if (!y00ts) {
        return res.status(404).json({ message: "No y00ts found" });
    }

    res.json(y00ts);
}


let getTraitPrices = async function (req, res) {
    let traitPrices = await req.app.cache.get("traitPrices");
    traitPrices = JSON.parse(traitPrices);

    if (!traitPrices) {
        return res.status(404).json({ message: "No trait prices found" });
    }

    res.json(traitPrices);
}

let getY00tsFP = async function (req, res) {
    let y00tsFP = await req.app.cache.get("y00tsFP");
    y00tsFP = JSON.parse(y00tsFP);

    if (!y00tsFP) {
        return res.status(404).json({ message: "No y00ts floor price found" });
    }

    res.json(y00tsFP);
}

let getT00bsFP = async function (req, res) {
    let t00bsFP = await req.app.cache.get("t00bsFP");
    t00bsFP = JSON.parse(t00bsFP);

    if (!t00bsFP) {
        return res.status(404).json({ message: "No t00bs floor price found" });
    }

    res.json(t00bsFP);
}


module.exports = {getAllY00ts, getTraitPrices, getY00tsFP, getT00bsFP};