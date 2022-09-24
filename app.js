const result = document.querySelector("#result-fetch")
const imgQrCode = document.querySelector("#result-fetch img")
const btnValidate = document.querySelector("#form")
const btnDownload = document.querySelector("#btn-download")
const svg = document.querySelector(".svg")
const errorUrl = document.querySelector("#errorUrl")
const regexUrl = /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,4}(\/[a-z0-9=&]+)*$/


btnValidate.addEventListener("submit", e => {
  e.preventDefault()
  const size =  e.target.size.value
  const url = e.target.url.value
  result.style.display = "none"
  
  if(url.match(regexUrl) == null){
    errorUrl.textContent = "Vous devez saisir un lien valide"
  }else{
    svg.style.display = "initial"
    errorUrl.textContent = ""
    setTimeout(() => qrCodeResult(size, encodeURI(url)), 2500)
  }
})

async function fetchQrCode(size, url){
  const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${url}`)
  const blob = await response.blob()
  return blob

}

async function qrCodeResult(size, url){
      svg.style.display = "none"
      const blob = await fetchQrCode(size, url)
      result.style.display = "initial"
      imgQrCode.src = URL.createObjectURL(blob)
      btnDownload.href = URL.createObjectURL(blob)
      btnDownload.download = "QR_Code"
}