const axios = require('axios')
const { url } = require('../config.json')
const { createFolder } = require('./utils')
const fetchChallenge = require('./fetchChallenge')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = async cookies => {
    let folderChallenge = (new URL(url)).hostname
    let resp = await axios.get(`${url}/api/v1/challenges`, {
        headers: {
            'Cookie': `${cookies[0].name}=${cookies[0].value}`
        }
    })
    let challenge = resp.data.data.map(e => {
        return {
            id: e.id,
            name: e.name
        }
    })
    for (let chall of challenge) {
        await createFolder(__dirname + `/../${folderChallenge}`, chall.name)
        await console.log(`[+] Created ${chall.name}`)
        await fetchChallenge(cookies, chall)
        await sleep(200)
    }
    return await true
}