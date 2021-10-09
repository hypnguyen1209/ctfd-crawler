const axios = require('axios')
const { url } = require('../config.json')
const { createFileDesc } = require('./utils')
const { createWriteStream } = require('fs')
const fetch = require('node-fetch')

let folderChallenge = (new URL(url)).hostname

const downloadFile = (cookies, downloadURL, challengeName) => {
    let fileName = downloadURL.match(/\/files\/[a-z0-9\/]+\/(.+?)\?token/)[1]
    return new Promise((resolve, reject) => {
        fetch(`${url}${downloadURL}`, {
            method: 'GET',
            headers: {
                'Cookie': `${cookies[0].name}=${cookies[0].value}`
            }
        })
            .then(res => {
                let fileStream = createWriteStream(__dirname + `/../${folderChallenge}/${challengeName}/${fileName}`)
                res.body.on('error', reject)
                fileStream.on('finish', resolve)
                res.body.pipe(fileStream)
            })
    })
}

module.exports = async (cookies, challenge) => {
    let resp = await axios.get(`${url}/api/v1/challenges/${challenge.id}`, {
        headers: {
            'Cookie': `${cookies[0].name}=${cookies[0].value}`
        }
    })
    let { id, name, value, description, category, files } = resp.data.data
    await createFileDesc(__dirname + `/../${folderChallenge}/${name}`, { id, name, value, description, category })
    if (files.length > 0) {
        console.log('[+] Downloading file....')
        await Promise.all([
            ...files.map(async file => {
                await downloadFile(cookies, file, name)
                await console.log('[+] Downloaded!')
                return true
            })
        ])
    }
    await true
}