const axios = require('axios');


const getUnmitedY00ts = async function () {
    try {
        let allY00ts = [];
        let pageNumberLimit = 1;
        let startTime = new Date().getTime();

        for (let i = 1; i <= pageNumberLimit; i++) {
            console.log(`Getting page ${i} of ${pageNumberLimit}...`);
            let y00ts = await axios.post("https://api.y00ts.com/y00ts/getY00ts", 
                {
                    pageSize: 100,
                    pageNumber: i,
                    minted: false
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
                    }
                }
            )
            
            allY00ts.push(...y00ts.data.y00ts);
            
            console.log(`Got ${y00ts.data.y00ts.length} y00ts from page ${i} of ${pageNumberLimit}...`);

            if (i === 1) {
                pageNumberLimit = y00ts.data.pageNumberLimit;
            }
        }

        let endTime = new Date().getTime();
        let timeDiff = endTime - startTime;
        
        console.log(`Got ${allY00ts.length} y00ts in ${timeDiff / 1000}s`);

        return allY00ts;
    }
    catch (err) {
        console.log(err);
    }

    return [];
}

module.exports = getUnmitedY00ts;