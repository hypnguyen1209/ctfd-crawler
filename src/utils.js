const { mkdir, writeFile, readdirSync, rmdirSync } = require('fs')

const createFolder = (dir, name) => {
    if (readdirSync(dir).includes(name)) {
        rmdirSync(dir + `/${name}`, { recursive: true })
    }
    return new Promise((resolve, reject) => {
        mkdir(dir + `/${name}`, err => {
            if (err) return reject(err)
            resolve(true)
        })
    })
}

const createFileDesc = (dir, data) => {
    const description = `id: ${data.id}` + '\n'
        + `name: ${data.name}` + '\n'
        + `point: ${data.value}` + '\n'
        + `category: ${data.category}` + '\n'
        + '\n' + data.description
    return new Promise((resolve, reject) => {
        writeFile(dir + '/description.txt', description, (err) => {
            if (err) return reject(err)
            resolve(true)
        })
    })
}

module.exports = { createFileDesc, createFolder }