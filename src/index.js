const fetchData = require('./fetchData')
const login = require('./login')

const main = async _ => {
    let cookies = await login()
    if (!cookies) return console.log('[+] Lỗi!')
    await fetchData(cookies)
    console.log('[+] Done!')
}

main()